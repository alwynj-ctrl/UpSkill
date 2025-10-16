import { type NextRequest, NextResponse } from "next/server"
import { PaytmChecksum } from "@/lib/paytm-checksum"
import { createClient } from "@/lib/supabase/server"

// Handle GET requests (for debugging)
export async function GET(request: NextRequest) {
  console.log("[Paytm Callback] GET request received")
  console.log("[Paytm Callback] URL:", request.url)
  console.log("[Paytm Callback] Params:", Object.fromEntries(request.nextUrl.searchParams))
  
  return NextResponse.redirect(new URL("/paytm/failure?error=Use POST method", request.url))
}

// Handle POST callback from Paytm
export async function POST(request: NextRequest) {
  console.log("[Paytm Callback] ===== POST CALLBACK RECEIVED =====")
  console.log("[Paytm Callback] URL:", request.url)
  
  try {
    const formData = await request.formData()
    const params: Record<string, string> = {}

    formData.forEach((value, key) => {
      params[key] = value.toString()
    })

    console.log("[Paytm Callback] Received params:", JSON.stringify(params, null, 2))

    // Hardcoded Paytm Production Merchant Key
    const merchantKey = "ycqMGlcTkfycGMps"

    const receivedChecksum = params.CHECKSUMHASH
    if (!receivedChecksum) {
      console.error("[Paytm Callback] No checksum received")
      return NextResponse.redirect(new URL("/paytm/failure?error=No checksum", request.url))
    }

    delete params.CHECKSUMHASH

    const isValidChecksum = await PaytmChecksum.verifySignature(params, merchantKey, receivedChecksum)

    if (!isValidChecksum) {
      console.error("[Paytm Callback] Invalid checksum")
      return NextResponse.redirect(new URL("/paytm/failure?error=Invalid checksum", request.url))
    }

    // Check payment status
    const status = params.STATUS
    const orderId = params.ORDERID
    const txnId = params.TXNID
    const amount = params.TXNAMOUNT

    console.log("[Paytm Callback] Payment status:", status, "Order:", orderId)

    if (status === "TXN_SUCCESS") {
      // Update purchase record in database
      const supabase = await createClient()

      // Extract purchase ID from order ID (format: ORDER_timestamp_purchaseId)
      const parts = orderId.split("_")
      const purchaseId = parts[parts.length - 1]

      console.log("[Paytm Callback] Updating purchase:", purchaseId)

      const { error } = await supabase
        .from("purchases")
        .update({
          payment_status: "completed",
          transaction_id: txnId,
          payment_method: "paytm",
        })
        .eq("id", purchaseId)

      if (error) {
        console.error("[Paytm Callback] Database update error:", error)
      }

      const successUrl = new URL("/paytm/success", request.url)
      successUrl.searchParams.set("orderId", orderId)
      successUrl.searchParams.set("txnId", txnId || "")
      successUrl.searchParams.set("amount", amount)
      console.log("[Paytm Callback] Redirecting to success:", successUrl.toString())
      return NextResponse.redirect(successUrl)
    } else {
      const failureUrl = new URL("/paytm/failure", request.url)
      failureUrl.searchParams.set("orderId", orderId || "N/A")
      failureUrl.searchParams.set("reason", params.RESPMSG || "Payment failed")
      console.log("[Paytm Callback] Redirecting to failure:", failureUrl.toString())
      return NextResponse.redirect(failureUrl)
    }
  } catch (error) {
    console.error("[Paytm Callback] ===== CRITICAL ERROR =====")
    console.error("[Paytm Callback] Error:", error)
    console.error("[Paytm Callback] Stack:", error instanceof Error ? error.stack : "No stack")
    
    const failureUrl = new URL("/paytm/failure", request.url)
    failureUrl.searchParams.set("error", "Processing error")
    failureUrl.searchParams.set("details", error instanceof Error ? error.message : "Unknown")
    return NextResponse.redirect(failureUrl)
  }
}


import { type NextRequest, NextResponse } from "next/server"
import { PaytmChecksum } from "@/lib/paytm-checksum"
import { createClient } from "@/lib/supabase/server"
import { getPaytmConfig } from "@/lib/paytm-config"

function maybeExpandUuid(compact: string): string {
  const value = compact.trim()
  if (value.includes("-")) return value
  if (!/^[0-9a-fA-F]{32}$/.test(value)) return value
  return `${value.slice(0, 8)}-${value.slice(8, 12)}-${value.slice(12, 16)}-${value.slice(16, 20)}-${value.slice(20)}`
}

// Handle GET requests (Paytm might use GET for some callbacks)
export async function GET(request: NextRequest) {
  console.log("[Paytm] ===== GET CALLBACK RECEIVED =====")
  console.log("[Paytm] URL:", request.url)
  console.log("[Paytm] Search params:", Object.fromEntries(request.nextUrl.searchParams))
  
  const failureUrl = new URL("/paytm/failure", request.url)
  failureUrl.searchParams.set("error", "GET request not supported")
  failureUrl.searchParams.set("details", "Paytm should POST to this endpoint")
  return NextResponse.redirect(failureUrl)
}

export async function POST(request: NextRequest) {
  console.log("[Paytm] ===== CALLBACK RECEIVED =====")
  console.log("[Paytm] Request method:", request.method)
  console.log("[Paytm] Request URL:", request.url)
  
  try {
    const formData = await request.formData()
    const params: Record<string, string> = {}

    formData.forEach((value, key) => {
      params[key] = value.toString()
    })

    console.log("[Paytm] Received callback params:", JSON.stringify(params, null, 2))

    const paytmConfig = getPaytmConfig(request.nextUrl.origin)

    const receivedChecksum = params.CHECKSUMHASH
    delete params.CHECKSUMHASH

    const isValidChecksum = await PaytmChecksum.verifySignature(params, paytmConfig.merchantKey, receivedChecksum)

    if (!isValidChecksum) {
      console.error("[Paytm] Invalid checksum")
      const redirectUrl = new URL("/paytm/failure", request.url)
      redirectUrl.searchParams.set("error", "Invalid checksum")
      return NextResponse.redirect(redirectUrl)
    }

    // Check payment status
    const status = params.STATUS
    const orderId = params.ORDERID
    const txnId = params.TXNID
    const amount = params.TXNAMOUNT

    console.log("[Paytm] Payment status:", status, "Order ID:", orderId)

    if (status === "TXN_SUCCESS") {
      // Update purchase record in database
      const supabase = await createClient()

      // Extract purchase ID from order ID (supports O_timestamp_compactUuid + older formats)
      const parts = orderId.split("_")
      const purchaseIdRaw = parts[parts.length - 1]
      const purchaseId = maybeExpandUuid(purchaseIdRaw)

      const { error } = await supabase
        .from("purchases")
        .update({
          payment_status: "completed",
          transaction_id: txnId,
          payment_method: "paytm",
        })
        .eq("id", purchaseId)

      if (error) {
        console.error("[Paytm] Database update error:", error)
      }

      const successUrl = new URL("/paytm/success", request.url)
      successUrl.searchParams.set("orderId", orderId)
      successUrl.searchParams.set("txnId", txnId || "")
      successUrl.searchParams.set("amount", amount)
      return NextResponse.redirect(successUrl)
    } else {
      const failureUrl = new URL("/paytm/failure", request.url)
      failureUrl.searchParams.set("orderId", orderId || "N/A")
      failureUrl.searchParams.set("reason", params.RESPMSG || "Payment failed")
      return NextResponse.redirect(failureUrl)
    }
  } catch (error) {
    console.error("[Paytm] ===== CRITICAL ERROR =====")
    console.error("[Paytm] Error details:", error)
    console.error("[Paytm] Error stack:", error instanceof Error ? error.stack : "No stack")
    
    const failureUrl = new URL("/paytm/failure", request.url)
    failureUrl.searchParams.set("error", "Processing error")
    failureUrl.searchParams.set("details", error instanceof Error ? error.message : "Unknown error")
    return NextResponse.redirect(failureUrl)
  }
}

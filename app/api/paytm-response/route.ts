import { type NextRequest, NextResponse } from "next/server"
import { PaytmChecksum } from "@/lib/paytm-checksum"
import { createClient } from "@/lib/supabase/server"

async function handlePaytmResponse(request: NextRequest) {
  console.log("[PayTM] Response received - Method:", request.method)
  
  try {
    let params: Record<string, string> = {}

    if (request.method === 'POST') {
      const formData = await request.formData()
      formData.forEach((value, key) => {
        if (typeof value === 'string') {
          params[key] = value
        } else if (value instanceof File) {
          params[key] = value.name
        } else {
          params[key] = String(value)
        }
      })
    } else if (request.method === 'GET') {
      const url = new URL(request.url)
      url.searchParams.forEach((value, key) => {
        params[key] = value
      })
    }

    console.log("[PayTM] Response parameters:", Object.keys(params))
    console.log("[PayTM] Status:", params.STATUS)
    console.log("[PayTM] Order ID:", params.ORDERID)
    console.log("[PayTM] Response Message:", params.RESPMSG)

    const merchantKey = process.env.PAYTM_MERCHANT_KEY

    if (!merchantKey) {
      console.error("[PayTM] Merchant key not configured")
      return NextResponse.redirect(new URL("/payment/failure?error=Configuration error", request.url))
    }

    const receivedChecksum = params.CHECKSUMHASH
    
    if (!receivedChecksum) {
      console.error("[PayTM] No checksum received")
      return NextResponse.redirect(new URL("/payment/failure?error=No checksum received", request.url))
    }

    // Create params for checksum verification (exclude CHECKSUMHASH)
    const paramsForVerification = { ...params }
    delete paramsForVerification.CHECKSUMHASH

    try {
      const isValidChecksum = await PaytmChecksum.verifySignature(paramsForVerification, merchantKey, receivedChecksum)
      
      if (!isValidChecksum) {
        console.error("[PayTM] Invalid checksum verification")
        return NextResponse.redirect(new URL("/payment/failure?error=Invalid checksum", request.url))
      }

      console.log("[PayTM] Checksum verification successful")
    } catch (checksumError) {
      console.error("[PayTM] Checksum verification error:", checksumError)
      return NextResponse.redirect(new URL("/payment/failure?error=Checksum verification failed", request.url))
    }

    // Check payment status
    const status = params.STATUS
    const orderId = params.ORDERID
    const txnId = params.TXNID || params.BANKTXNID
    const amount = params.TXNAMOUNT

    console.log("[PayTM] Payment details:", { status, orderId, txnId, amount })

    if (status === "TXN_SUCCESS") {
      try {
        // Update purchase record in database
        const supabase = await createClient()

        // Extract purchase ID from order ID
        const orderParts = orderId.split("_")
        const purchaseId = orderParts[orderParts.length - 1]

        console.log("[PayTM] Updating purchase ID:", purchaseId)

        const { error } = await supabase
          .from("purchases")
          .update({
            payment_status: "completed",
            transaction_id: txnId,
            payment_method: "paytm",
          })
          .eq("id", purchaseId)

        if (error) {
          console.error("[PayTM] Database update error:", error)
          // Continue to success page even if DB update fails
        } else {
          console.log("[PayTM] Database updated successfully")
        }

        return NextResponse.redirect(
          new URL(`/payment/success?orderId=${orderId}&txnId=${txnId}&amount=${amount}`, request.url),
        )
      } catch (dbError) {
        console.error("[PayTM] Database operation error:", dbError)
        // Still redirect to success since payment was successful
        return NextResponse.redirect(
          new URL(`/payment/success?orderId=${orderId}&txnId=${txnId}&amount=${amount}`, request.url),
        )
      }
    } else {
      console.log("[PayTM] Payment failed or pending:", { status, reason: params.RESPMSG })
      return NextResponse.redirect(
        new URL(`/payment/failure?orderId=${orderId}&reason=${encodeURIComponent(params.RESPMSG || "Payment failed")}&status=${status}`, request.url),
      )
    }
  } catch (error) {
    console.error("[PayTM] Response processing error:", error)
    console.error("[PayTM] Error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      requestUrl: request.url,
      method: request.method
    })
    
    return NextResponse.redirect(
      new URL(`/payment/failure?error=${encodeURIComponent("Processing error: " + (error instanceof Error ? error.message : "Unknown error"))}`, request.url)
    )
  }
}

export async function POST(request: NextRequest) {
  return handlePaytmResponse(request)
}

export async function GET(request: NextRequest) {
  return handlePaytmResponse(request)
}

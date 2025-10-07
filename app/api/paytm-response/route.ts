import { type NextRequest, NextResponse } from "next/server"
import { PaytmChecksum } from "@/lib/paytm-checksum"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const params: Record<string, string> = {}

    formData.forEach((value, key) => {
      params[key] = value.toString()
    })

    const merchantKey = process.env.PAYTM_MERCHANT_KEY

    if (!merchantKey) {
      return NextResponse.redirect(new URL("/payment/failure?error=Configuration error", request.url))
    }

    const receivedChecksum = params.CHECKSUMHASH
    delete params.CHECKSUMHASH

    const isValidChecksum = await PaytmChecksum.verifySignature(params, merchantKey, receivedChecksum)

    if (!isValidChecksum) {
      console.error("[v0] Invalid Paytm checksum")
      return NextResponse.redirect(new URL("/payment/failure?error=Invalid checksum", request.url))
    }

    // Check payment status
    const status = params.STATUS
    const orderId = params.ORDERID
    const txnId = params.TXNID
    const amount = params.TXNAMOUNT

    console.log("[v0] Paytm payment status:", status, "Order ID:", orderId)

    if (status === "TXN_SUCCESS") {
      // Update purchase record in database
      const supabase = createClient()

      // Extract purchase ID from order ID
      const purchaseId = orderId.split("_")[2]

      const { error } = await supabase
        .from("purchases")
        .update({
          payment_status: "completed",
          transaction_id: txnId,
          payment_method: "paytm",
        })
        .eq("id", purchaseId)

      if (error) {
        console.error("[v0] Database update error:", error)
      }

      return NextResponse.redirect(
        new URL(`/payment/success?orderId=${orderId}&txnId=${txnId}&amount=${amount}`, request.url),
      )
    } else {
      return NextResponse.redirect(
        new URL(`/payment/failure?orderId=${orderId}&reason=${params.RESPMSG || "Payment failed"}`, request.url),
      )
    }
  } catch (error) {
    console.error("[v0] Paytm response error:", error)
    return NextResponse.redirect(new URL("/payment/failure?error=Processing error", request.url))
  }
}

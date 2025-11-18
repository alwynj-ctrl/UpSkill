import { type NextRequest, NextResponse } from "next/server"
import { createClient as createSupabaseServerClient } from "@/lib/supabase/server"
import { verifyRazorpaySignature } from "@/lib/razorpay"

export async function POST(request: NextRequest) {
  try {
    const { orderId, paymentId, signature, purchaseId } = await request.json()

    if (!orderId || !paymentId || !signature) {
      return NextResponse.json({ success: false, error: "Missing payment verification fields" }, { status: 400 })
    }

    if (!verifyRazorpaySignature({ orderId, paymentId, signature })) {
      return NextResponse.json({ success: false, error: "Invalid Razorpay signature" }, { status: 400 })
    }

    if (purchaseId) {
      try {
        const supabase = await createSupabaseServerClient()
        const { error } = await supabase
          .from("purchases")
          .update({
            payment_status: "completed",
            payment_id: paymentId,
          })
          .eq("id", purchaseId)

        if (error) {
          console.error("[Razorpay] Failed to update purchase status:", error.message)
        }
      } catch (dbError) {
        console.error("[Razorpay] Supabase update error:", dbError)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[Razorpay] Verification error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unable to verify Razorpay payment",
      },
      { status: 500 }
    )
  }
}



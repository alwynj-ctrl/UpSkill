import { type NextRequest, NextResponse } from "next/server"
import { createRazorpayOrder, getRazorpayKeyId } from "@/lib/razorpay"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      amount,
      purchaseId,
      courseId,
      courseName,
      userId,
      email,
      phone,
      allowPartial = false,
      firstPaymentMinAmount,
    } = body

    if (!purchaseId) {
      return NextResponse.json({ success: false, error: "Missing purchaseId" }, { status: 400 })
    }

    const amountNumber = Number(amount)
    if (!Number.isFinite(amountNumber) || amountNumber <= 0) {
      return NextResponse.json({ success: false, error: "Invalid amount" }, { status: 400 })
    }

    const receipt = `purchase_${purchaseId}`.slice(0, 40)

    const order = await createRazorpayOrder({
      amount: amountNumber,
      receipt,
      allowPartial: Boolean(allowPartial),
      firstPaymentMinAmount: allowPartial ? Number(firstPaymentMinAmount) : undefined,
      notes: {
        purchaseId,
        courseId: courseId ?? "",
        courseName: courseName ?? "",
        userId: userId ?? "",
        customerEmail: email ?? "",
        customerPhone: phone ?? "",
      },
    })

    return NextResponse.json({
      success: true,
      keyId: getRazorpayKeyId(),
      order,
    })
  } catch (error) {
    console.error("[Razorpay] Order creation error:", error)

    const message =
      error && typeof error === "object" && "error" in error
        ? (error as { error?: { description?: string } }).error?.description ?? "Unable to create Razorpay order"
        : error instanceof Error
          ? error.message
          : "Unable to create Razorpay order"

    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 502 }
    )
  }
}


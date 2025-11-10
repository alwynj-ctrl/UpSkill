import { type NextRequest, NextResponse } from "next/server"
import { prepareAirpayPayment } from "@/lib/airpay"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      amount,
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      state,
      pincode,
      country,
      purchaseId,
      customField,
      uid,
      vpa,
      kitType,
    } = body

    if (!purchaseId) {
      return NextResponse.json({ success: false, error: "Missing purchaseId" }, { status: 400 })
    }

    const amountNumber = Number(amount)

    if (!Number.isFinite(amountNumber) || amountNumber <= 0) {
      return NextResponse.json({ success: false, error: "Invalid amount" }, { status: 400 })
    }

    const initResult = prepareAirpayPayment({
      buyerEmail: email,
      buyerFirstName: firstName,
      buyerLastName: lastName,
      buyerPhone: phone,
      buyerAddress: address,
      buyerCity: city,
      buyerState: state,
      buyerCountry: country,
      buyerPinCode: pincode,
      amount: amountNumber,
      purchaseId,
      customField,
      uid,
      vpa,
      kitType,
    })

    // Log payment data and checksum for comparison
    console.log("[Airpay API] Payment Data being sent to Airpay:")
    console.log("  orderid:", initResult.paymentData.orderid)
    console.log("  amount:", initResult.paymentData.amount)
    console.log("  buyerEmail:", initResult.paymentData.buyerEmail)
    console.log("  buyerFirstName:", initResult.paymentData.buyerFirstName)
    console.log("  buyerLastName:", initResult.paymentData.buyerLastName)
    console.log("  UID:", initResult.paymentData.UID)
    console.log("  mercid:", initResult.paymentData.mercid)
    console.log("  privatekey:", initResult.paymentData.privatekey ? initResult.paymentData.privatekey.substring(0, 20) + "..." : "NOT PRESENT")
    console.log("  checksum:", initResult.paymentData.checksum)
    console.log("  checksumLength:", initResult.paymentData.checksum?.length)
    console.log("  Total fields:", Object.keys(initResult.paymentData).length)
    console.log("  Fields:", Object.keys(initResult.paymentData).join(", "))
    console.log("[Airpay API] Full paymentData (cleaned):", JSON.stringify(initResult.paymentData, null, 2))
    console.log("[Airpay API] ✓ privatekey included (required by original kit):", "privatekey" in initResult.paymentData)
    console.log("[Airpay API] ✓ Empty optional fields filtered out")

    return NextResponse.json({
      success: true,
      orderId: initResult.orderId,
      paymentUrl: initResult.paymentUrl,
      paymentData: initResult.paymentData,
    })
  } catch (error) {
    console.error("[Airpay] Payment initialization error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to initialize Airpay payment",
      },
      { status: 500 }
    )
  }
}


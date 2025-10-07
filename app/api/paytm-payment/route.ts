import { type NextRequest, NextResponse } from "next/server"
import { PaytmChecksum } from "@/lib/paytm-checksum"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      amount,
      firstName,
      lastName,
      email,
      phone,
      productInfo,
      address,
      city,
      state,
      pincode,
      purchaseId,
      returnUrl,
    } = body

    const merchantId = process.env.PAYTM_MERCHANT_ID
    const merchantKey = process.env.PAYTM_MERCHANT_KEY
    const website = process.env.PAYTM_WEBSITE || "DEFAULT"
    const industryType = process.env.PAYTM_INDUSTRY_TYPE || "Retail"
    const channelId = process.env.PAYTM_CHANNEL_ID || "WEB"

    if (!merchantId || !merchantKey) {
      return NextResponse.json({ success: false, error: "Paytm credentials not configured" }, { status: 500 })
    }

    // Generate unique order ID
    const orderId = `ORDER_${Date.now()}_${purchaseId}`

    const paytmParams: Record<string, string> = {
      MID: merchantId,
      WEBSITE: website,
      INDUSTRY_TYPE_ID: industryType,
      CHANNEL_ID: channelId,
      ORDER_ID: orderId,
      CUST_ID: email,
      TXN_AMOUNT: amount.toString(),
      CALLBACK_URL: `${process.env.NEXT_PUBLIC_SITE_URL}/api/paytm-response`,
      EMAIL: email,
      MOBILE_NO: phone,
    }

    const checksum = await PaytmChecksum.generateSignature(paytmParams, merchantKey)

    // Paytm payment URL (use staging for testing, production for live)
    const paytmUrl =
      process.env.PAYTM_ENVIRONMENT === "production"
        ? "https://securegw.paytm.in/order/process"
        : "https://securegw-stage.paytm.in/order/process"

    return NextResponse.json({
      success: true,
      actionUrl: paytmUrl,
      paymentData: {
        ...paytmParams,
        CHECKSUMHASH: checksum,
      },
    })
  } catch (error) {
    console.error("[v0] Paytm payment error:", error)
    return NextResponse.json({ success: false, error: "Failed to initialize Paytm payment" }, { status: 500 })
  }
}

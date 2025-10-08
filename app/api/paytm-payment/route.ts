import { type NextRequest, NextResponse } from "next/server"
import { PaytmChecksum } from "@/lib/paytm-checksum"

// Legacy form-based Paytm payment endpoint (maintained for backward compatibility)
// New implementations should use /api/paytm-js-initiate for JS Checkout

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      amount,
      email,
      phone,
      purchaseId,
    } = body

    console.log("[Paytm Legacy] Received form-based payment request:", {
      amount,
      email,
      phone,
      purchaseId
    })

    const merchantId = process.env.PAYTM_MERCHANT_ID
    const merchantKey = process.env.PAYTM_MERCHANT_KEY
    const website = process.env.PAYTM_WEBSITE || "DEFAULT"
    const industryType = process.env.PAYTM_INDUSTRY_TYPE || "Retail"
    const channelId = process.env.PAYTM_CHANNEL_ID || "WEB"

    if (!merchantId || !merchantKey) {
      console.error("[Paytm Legacy] Missing credentials:", { 
        merchantId: !!merchantId, 
        merchantKey: !!merchantKey 
      })
      return NextResponse.json({ 
        success: false, 
        error: "Paytm credentials not configured" 
      }, { status: 500 })
    }

    // Validate required fields
    if (!amount || !email || !phone || !purchaseId) {
      return NextResponse.json({ 
        success: false, 
        error: "Missing required fields: amount, email, phone, purchaseId" 
      }, { status: 400 })
    }

    // Validate amount format
    const numericAmount = parseFloat(amount)
    if (isNaN(numericAmount) || numericAmount <= 0) {
      return NextResponse.json({ 
        success: false, 
        error: "Invalid amount format" 
      }, { status: 400 })
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
      TXN_AMOUNT: numericAmount.toFixed(2),
      CALLBACK_URL: process.env.NODE_ENV === 'development' 
        ? `https://www.upskillworkforce.co/api/paytm-response`  // Use production for testing
        : `${process.env.NEXT_PUBLIC_SITE_URL}/api/paytm-response`,
      EMAIL: email,
      MOBILE_NO: phone.toString(),
    }

    console.log("[Paytm Legacy] Parameters before checksum:", {
      ...paytmParams,
      EMAIL: `${email.slice(0, 3)}***@${email.split('@')[1]}`,
      MOBILE_NO: `${phone.toString().slice(0, 3)}***${phone.toString().slice(-3)}`
    })

    try {
      const checksum = PaytmChecksum.generateSignature(paytmParams, merchantKey)
      console.log("[Paytm Legacy] Checksum generated successfully")

      // Paytm payment URL (legacy form-based flow)
      const paytmUrl = process.env.PAYTM_ENVIRONMENT === "production"
        ? "https://securegw.paytm.in/order/process"
        : "https://securegw-stage.paytm.in/order/process"

      console.log("[Paytm Legacy] Using form-based URL:", paytmUrl)

      return NextResponse.json({
        success: true,
        actionUrl: paytmUrl,
        paymentData: {
          ...paytmParams,
          CHECKSUMHASH: checksum,
        },
      })
    } catch (checksumError) {
      console.error("[Paytm Legacy] Checksum generation error:", checksumError)
      return NextResponse.json({ 
        success: false, 
        error: "Checksum generation failed" 
      }, { status: 500 })
    }
  } catch (error) {
    console.error("[Paytm Legacy] Payment initialization error:", error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to initialize Paytm payment" 
    }, { status: 500 })
  }
}

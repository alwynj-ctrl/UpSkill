import { NextResponse } from "next/server"
import { PaytmChecksum } from "@/lib/paytm-checksum"

export async function GET() {
  try {
    console.log("[PayTM Test] Starting configuration test")

    const merchantId = process.env.PAYTM_MERCHANT_ID
    const merchantKey = process.env.PAYTM_MERCHANT_KEY
    const website = process.env.PAYTM_WEBSITE
    const industryType = process.env.PAYTM_INDUSTRY_TYPE
    const channelId = process.env.PAYTM_CHANNEL_ID
    const environment = process.env.PAYTM_ENVIRONMENT

    const config = {
      merchantId: merchantId ? `${merchantId.substring(0, 4)}****${merchantId.substring(merchantId.length - 4)}` : "Not set",
      merchantKey: merchantKey ? `${merchantKey.substring(0, 2)}****${merchantKey.substring(merchantKey.length - 2)}` : "Not set",
      website,
      industryType,
      channelId,
      environment,
      siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
    }

    console.log("[PayTM Test] Configuration:", config)

    if (!merchantId || !merchantKey) {
      return NextResponse.json({ 
        success: false, 
        error: "Missing PayTM credentials",
        config 
      }, { status: 400 })
    }

    // Test checksum generation
    const testParams = {
      MID: merchantId,
      WEBSITE: website || "DEFAULT",
      INDUSTRY_TYPE_ID: industryType || "Retail",
      CHANNEL_ID: channelId || "WEB",
      ORDER_ID: "TEST_ORDER_123",
      CUST_ID: "test@example.com",
      TXN_AMOUNT: "100.00",
      CALLBACK_URL: `${process.env.NEXT_PUBLIC_SITE_URL}/api/paytm-response`,
      EMAIL: "test@example.com",
      MOBILE_NO: "9999999999",
    }

    try {
      const checksum = await PaytmChecksum.generateSignature(testParams, merchantKey)
      console.log("[PayTM Test] Checksum generated successfully")

      return NextResponse.json({
        success: true,
        message: "PayTM configuration is valid",
        config,
        checksumTest: "SUCCESS",
        paymentUrl: environment === "production" 
          ? "https://securegw.paytm.in/order/process"
          : "https://securegw-stage.paytm.in/order/process"
      })
    } catch (checksumError) {
      console.error("[PayTM Test] Checksum error:", checksumError)
      return NextResponse.json({
        success: false,
        error: "Checksum generation failed",
        config,
        checksumError: checksumError instanceof Error ? checksumError.message : "Unknown error"
      }, { status: 500 })
    }

  } catch (error) {
    console.error("[PayTM Test] Configuration test error:", error)
    return NextResponse.json({
      success: false,
      error: "Configuration test failed",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}
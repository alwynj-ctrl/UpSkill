import { NextResponse } from "next/server"
import { PaytmChecksum } from "@/lib/paytm-checksum"

export async function GET() {
  try {
    const merchantId = process.env.PAYTM_MERCHANT_ID
    const merchantKey = process.env.PAYTM_MERCHANT_KEY
    const website = process.env.PAYTM_WEBSITE
    const environment = process.env.PAYTM_ENVIRONMENT

    console.log("[Paytm Config Test] Configuration check:", {
      merchantId: merchantId,
      website: website,
      environment: environment,
      hasKey: !!merchantKey
    })

    if (!merchantId || !merchantKey) {
      return NextResponse.json({
        success: false,
        error: "Missing Paytm credentials"
      })
    }

    // Test checksum generation
    const testParams = {
      mid: merchantId,
      orderId: "TEST_ORDER_123",
      amount: "100.00",
      websiteName: website
    }

    const checksum = PaytmChecksum.generateSignature(testParams, merchantKey)
    
    return NextResponse.json({
      success: true,
      config: {
        merchantId: merchantId,
        website: website,
        environment: environment
      },
      checksumTest: {
        generated: true,
        checksumLength: checksum.length
      },
      recommendations: {
        commonWebsiteNames: {
          production: ["DEFAULT", "WEBPROD", merchantId],
          staging: ["WEBSTAGING", "DEFAULT"]
        },
        note: "If getting 501 error, try different website names from your Paytm merchant dashboard"
      }
    })

  } catch (error) {
    console.error("[Paytm Config Test] Error:", error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Configuration test failed"
    })
  }
}
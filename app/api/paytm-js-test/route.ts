import { NextResponse } from "next/server"
import { PaytmChecksum } from "@/lib/paytm-checksum"

export async function GET() {
  try {
    // Get Paytm configuration
    const merchantId = process.env.PAYTM_MERCHANT_ID
    const merchantKey = process.env.PAYTM_MERCHANT_KEY
    const environment = process.env.PAYTM_ENVIRONMENT
    const website = process.env.PAYTM_WEBSITE

    console.log("Testing Paytm JS Checkout Configuration...")

    if (!merchantId || !merchantKey || !environment || !website) {
      return NextResponse.json({
        success: false,
        error: "Paytm configuration missing",
        config: { merchantId, environment, website }
      }, { status: 500 })
    }

    // Test checksum generation
    const testData = {
      orderId: "TEST_ORDER_123",
      amount: "100.00",
      custId: "CUST_001"
    }

    try {
      const checksum = await PaytmChecksum.generateSignature(
        JSON.stringify(testData), 
        merchantKey
      )

      const apiUrl = environment === 'production' 
        ? 'https://secure.paytmpayments.com/theia/api/v1/initiateTransaction'
        : 'https://securestage.paytmpayments.com/theia/api/v1/initiateTransaction'

      const jsCheckoutHost = environment === 'production' 
        ? 'https://secure.paytmpayments.com' 
        : 'https://securestage.paytmpayments.com'

      return NextResponse.json({
        success: true,
        message: "Paytm JS Checkout configuration is valid",
        config: {
          merchantId,
          environment,
          website,
          apiUrl,
          jsCheckoutHost,
          jsScriptUrl: `${jsCheckoutHost}/merchantpgpui/checkoutjs/merchants/${merchantId}.js`
        },
        testData: {
          ...testData,
          checksum: checksum.substring(0, 20) + "..." // Show partial checksum for security
        }
      })

    } catch (checksumError) {
      return NextResponse.json({
        success: false,
        error: "Checksum generation failed",
        details: checksumError instanceof Error ? checksumError.message : "Unknown error"
      }, { status: 500 })
    }

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Configuration test failed",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}
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

    // Hardcoded Paytm Production Credentials
    const merchantId = "uYTkMQ79093638871742"
    const merchantKey = "ycqMGlcTkfycGMps"
    const website = "DEFAULT"
    
    // Check if we should use staging or production
    const isProduction = true // Set to false for staging/testing
    const paytmBaseUrl = isProduction 
      ? "https://securegw.paytm.in" 
      : "https://securestage.paytm.in"

    // Generate unique order ID
    const orderId = `ORDER_${Date.now()}_${purchaseId}`

    console.log("[Paytm] Step 1: Initiating transaction for order:", orderId)

    // Step 1: Prepare request body for Initiate Transaction API
    const paytmParams = {
      body: {
        requestType: "Payment",
        mid: merchantId,
        websiteName: website,
        orderId: orderId,
        callbackUrl: "https://www.upskillworkforce.co/api/paytm-callback",
        txnAmount: {
          value: amount.toString(),
          currency: "INR",
        },
        userInfo: {
          custId: email,
          mobile: phone,
          email: email,
          firstName: firstName,
          lastName: lastName,
        },
      },
    }

    // Generate checksum for the request body
    const checksum = await PaytmChecksum.generateSignature(
      JSON.stringify(paytmParams.body),
      merchantKey
    )

    const requestBody = {
      head: {
        signature: checksum,
      },
      body: paytmParams.body,
    }

    console.log("[Paytm] Calling Initiate Transaction API...")
    console.log("[Paytm] Request URL:", `https://securegw.paytm.in/theia/api/v1/initiateTransaction?mid=${merchantId}&orderId=${orderId}`)
    console.log("[Paytm] Request Body:", JSON.stringify(requestBody, null, 2))

    // Step 2: Call Initiate Transaction API
    const initiateResponse = await fetch(
      `${paytmBaseUrl}/theia/api/v1/initiateTransaction?mid=${merchantId}&orderId=${orderId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    )

    const initiateResult = await initiateResponse.json()

    console.log("[Paytm] Initiate API response:", JSON.stringify(initiateResult, null, 2))

    if (
      !initiateResult.body ||
      initiateResult.body.resultInfo?.resultStatus !== "S" ||
      !initiateResult.body.txnToken
    ) {
      console.error("[Paytm] Failed to initiate transaction:", initiateResult)
      return NextResponse.json({
        success: false,
        error: initiateResult.body?.resultInfo?.resultMsg || "Failed to initiate payment",
      })
    }

    const txnToken = initiateResult.body.txnToken

    console.log("[Paytm] Transaction initiated successfully, txnToken:", txnToken)

    // Step 3: Return data for frontend to show Paytm checkout
    return NextResponse.json({
      success: true,
      txnToken: txnToken,
      orderId: orderId,
      mid: merchantId,
      amount: amount.toString(),
      isProduction: isProduction,
    })
  } catch (error) {
    console.error("[Paytm] Payment error:", error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to initialize Paytm payment",
    }, { status: 500 })
  }
}

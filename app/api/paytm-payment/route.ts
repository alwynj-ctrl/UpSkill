import { type NextRequest, NextResponse } from "next/server"
import { PaytmChecksum } from "@/lib/paytm-checksum"
import { getPaytmConfig } from "@/lib/paytm-config"

function compactUuid(uuid: string): string {
  return uuid.replace(/-/g, "")
}

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
    } = body

    const paytmConfig = getPaytmConfig(request.nextUrl.origin)
    const isProduction = paytmConfig.environment === "production"

    const amountNumber = Number(amount)
    if (!Number.isFinite(amountNumber) || amountNumber <= 0) {
      return NextResponse.json({ success: false, error: "Invalid amount" }, { status: 400 })
    }

    // Generate unique order ID
    // Keep orderId short & Paytm-safe while still reversible to purchaseId.
    // Format: O_<timestamp>_<purchaseIdWithoutHyphens>  (typically 48 chars)
    const orderId = `O_${Date.now()}_${compactUuid(String(purchaseId))}`

    // Keep custId simple/minimal; Paytm samples typically require only custId.
    const custId = `CUST_${compactUuid(String(purchaseId)).slice(0, 28)}`

    console.log("[Paytm] Step 1: Initiating transaction for order:", orderId)

    // Step 1: Prepare request body for Initiate Transaction API
    const paytmParams = {
      body: {
        requestType: "Payment",
        mid: paytmConfig.mid,
        websiteName: paytmConfig.website,
        orderId: orderId,
        callbackUrl: paytmConfig.callbackUrl,
        txnAmount: {
          value: amountNumber.toFixed(2),
          currency: "INR",
        },
        userInfo: {
          custId,
        },
      },
    }

    // Generate checksum for the request body
    const checksum = await PaytmChecksum.generateSignature(
      JSON.stringify(paytmParams.body),
      paytmConfig.merchantKey
    )

    const requestBody = {
      head: {
        signature: checksum,
      },
      body: paytmParams.body,
    }

    console.log("[Paytm] Calling Initiate Transaction API...")
    console.log(
      "[Paytm] Request URL:",
      `${paytmConfig.baseUrl}/theia/api/v1/initiateTransaction?mid=${paytmConfig.mid}&orderId=${orderId}`
    )
    console.log("[Paytm] Request Body:", JSON.stringify(requestBody, null, 2))

    // Step 2: Call Initiate Transaction API
    const initiateResponse = await fetch(
      `${paytmConfig.baseUrl}/theia/api/v1/initiateTransaction?mid=${paytmConfig.mid}&orderId=${orderId}`,
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
      return NextResponse.json(
        {
          success: false,
          error: initiateResult.body?.resultInfo?.resultMsg || "Failed to initiate payment",
          resultCode: initiateResult.body?.resultInfo?.resultCode,
        },
        { status: 502 }
      )
    }

    const txnToken = initiateResult.body.txnToken

    console.log("[Paytm] Transaction initiated successfully, txnToken:", txnToken)

    // Step 3: Return data for frontend to show Paytm checkout
    return NextResponse.json({
      success: true,
      txnToken: txnToken,
      orderId: orderId,
      mid: paytmConfig.mid,
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

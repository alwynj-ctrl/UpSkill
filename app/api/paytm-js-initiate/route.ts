import { type NextRequest, NextResponse } from "next/server"
import { PaytmChecksum } from "@/lib/paytm-checksum"

// Official Paytm JS Checkout Initiate Transaction API
// Based on Paytm documentation: https://www.paytmpayments.com/docs/jscheckout-initiate-payment

interface InitiateTransactionRequest {
  orderId: string
  amount: string | number
  userInfo: {
    custId: string
    mobile?: string
    email?: string
  }
}

interface PaytmInitiateRequest {
  mid: string
  orderId: string
  amount: string
  websiteName: string
  userInfo: {
    custId: string
    mobile?: string
    email?: string
  }
  callbackUrl: string
  txnDate?: string
  enablePaymentMode?: {
    mode: string[]
  }[]
}

interface PaytmInitiateResponse {
  body: {
    resultInfo: {
      resultStatus: string
      resultCode: string
      resultMsg: string
    }
    orderId: string
    mid: string
    txnToken?: string
    amount?: string
    callbackUrl?: string
  }
  head: {
    responseTimestamp: string
    version: string
    signature: string
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderId, amount, userInfo } = body as InitiateTransactionRequest

    console.log("[Paytm JS Checkout] Raw request body:", {
      orderId,
      amount,
      userInfo
    })

    // Validate that userInfo exists and has required fields
    if (!userInfo || !userInfo.custId) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Missing userInfo or custId in userInfo" 
        }, 
        { status: 400 }
      )
    }

    const { custId, mobile, email } = userInfo

    console.log("[Paytm JS Checkout] Initiate transaction request:", {
      orderId,
      amount,
      custId,
      mobile: mobile ? `${mobile.slice(0, 3)}***${mobile.slice(-3)}` : undefined,
      email: email ? `${email.slice(0, 3)}***@${email.split('@')[1]}` : undefined
    })

    // Get Paytm configuration from environment
    const merchantId = process.env.PAYTM_MERCHANT_ID
    const merchantKey = process.env.PAYTM_MERCHANT_KEY
    const website = process.env.PAYTM_WEBSITE || "DEFAULT"
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || "https://www.upskillworkforce.co"
    const callbackUrl = `${siteUrl}/api/paytm-response`

    // Validate environment variables
    if (!merchantId || !merchantKey) {
      console.error("[Paytm JS Checkout] Missing credentials:", { 
        merchantId: !!merchantId, 
        merchantKey: !!merchantKey 
      })
      return NextResponse.json(
        { 
          success: false, 
          error: "Paytm credentials not configured" 
        }, 
        { status: 500 }
      )
    }

    // Validate required request parameters
    if (!orderId || !amount || !custId) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Missing required parameters: orderId, amount, custId" 
        }, 
        { status: 400 }
      )
    }

    // Validate amount format
    const numericAmount = parseFloat(amount.toString())
    if (isNaN(numericAmount) || numericAmount <= 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Invalid amount format" 
        }, 
        { status: 400 }
      )
    }

    // Prepare request body for Paytm Initiate Transaction API (official format)
    const initiateRequestBody = {
      body: {
        requestType: "Payment",
        mid: merchantId,
        websiteName: website,
        orderId: orderId,
        txnAmount: {
          value: numericAmount.toFixed(2),
          currency: "INR"
        },
        userInfo: {
          custId: custId,
          ...(mobile && { mobile: mobile }),
          ...(email && { email: email })
        },
        callbackUrl: callbackUrl
      }
    }

    console.log("[Paytm JS Checkout] Request body prepared:", {
      ...initiateRequestBody.body,
      userInfo: {
        ...initiateRequestBody.body.userInfo,
        mobile: mobile ? `${mobile.slice(0, 3)}***${mobile.slice(-3)}` : undefined
      }
    })

    // Generate checksum for the request body
    const requestBodyString = JSON.stringify(initiateRequestBody.body)
    const checksum = PaytmChecksum.generateSignatureByString(requestBodyString, merchantKey)

    console.log("[Paytm JS Checkout] Checksum generated successfully")

    // Add checksum to request
    const finalRequestBody = {
      ...initiateRequestBody,
      head: {
        signature: checksum
      }
    }

    // Determine Paytm API URL based on environment
    const paytmApiUrl = process.env.PAYTM_ENVIRONMENT === "production"
      ? "https://securegw.paytm.in/theia/api/v1/initiateTransaction"
      : "https://securegw-stage.paytm.in/theia/api/v1/initiateTransaction"

    console.log("[Paytm JS Checkout] Using API URL:", paytmApiUrl)
    console.log("[Paytm JS Checkout] Final request body:", {
      body: {
        ...finalRequestBody.body,
        userInfo: {
          ...finalRequestBody.body.userInfo,
          mobile: mobile ? `${mobile.slice(0, 3)}***${mobile.slice(-3)}` : undefined
        }
      },
      head: { signature: checksum.substring(0, 20) + "..." }
    })

    // Make request to Paytm Initiate Transaction API
    const paytmResponse = await fetch(`${paytmApiUrl}?mid=${merchantId}&orderId=${orderId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(finalRequestBody)
    })

    if (!paytmResponse.ok) {
      const errorText = await paytmResponse.text()
      console.error("[Paytm JS Checkout] API request failed:", {
        status: paytmResponse.status,
        statusText: paytmResponse.statusText,
        error: errorText
      })
      
      return NextResponse.json(
        { 
          success: false, 
          error: `Paytm API request failed: ${paytmResponse.status} ${paytmResponse.statusText}`,
          details: errorText
        }, 
        { status: 500 }
      )
    }

    const paytmResult = await paytmResponse.json()
    
    console.log("[Paytm JS Checkout] Full API response:", paytmResult)

    // Handle different response formats - Paytm can return responses in different structures
    let resultInfo, responseOrderId, responseTxnToken, responseMid, responseAmount, responseCallbackUrl

    if (paytmResult.body && paytmResult.body.resultInfo) {
      // Standard response format
      resultInfo = paytmResult.body.resultInfo
      responseOrderId = paytmResult.body.orderId
      responseTxnToken = paytmResult.body.txnToken
      responseMid = paytmResult.body.mid
      responseAmount = paytmResult.body.amount
      responseCallbackUrl = paytmResult.body.callbackUrl
    } else if (paytmResult.resultInfo) {
      // Direct response format (sometimes Paytm returns this)
      resultInfo = paytmResult.resultInfo
      responseOrderId = paytmResult.orderId
      responseTxnToken = paytmResult.txnToken
      responseMid = paytmResult.mid
      responseAmount = paytmResult.amount
      responseCallbackUrl = paytmResult.callbackUrl
    } else {
      console.error("[Paytm JS Checkout] Unexpected response format:", paytmResult)
      return NextResponse.json(
        { 
          success: false, 
          error: "Unexpected response format from Paytm" 
        }, 
        { status: 500 }
      )
    }

    console.log("[Paytm JS Checkout] Parsed response:", {
      resultStatus: resultInfo.resultStatus,
      resultCode: resultInfo.resultCode,
      resultMsg: resultInfo.resultMsg,
      orderId: responseOrderId,
      hasTxnToken: !!responseTxnToken
    })

    // Only verify signature if we have the signature in response and it's a success
    if (paytmResult.head && paytmResult.head.signature && resultInfo.resultStatus === "S") {
      try {
        const responseBodyString = JSON.stringify(paytmResult.body || paytmResult)
        const isValidSignature = PaytmChecksum.verifySignatureByString(
          responseBodyString, 
          merchantKey, 
          paytmResult.head.signature
        )

        if (!isValidSignature) {
          console.error("[Paytm JS Checkout] Invalid response signature")
          return NextResponse.json(
            { 
              success: false, 
              error: "Invalid response signature from Paytm" 
            }, 
            { status: 500 }
          )
        }
        
        console.log("[Paytm JS Checkout] Signature verification successful")
      } catch (signatureError) {
        console.error("[Paytm JS Checkout] Signature verification error:", signatureError)
        // Continue without signature verification for now
      }
    }

    // Check if transaction initiation was successful
    if (resultInfo.resultStatus !== "S") {
      console.error("[Paytm JS Checkout] Transaction initiation failed:", {
        resultCode: resultInfo.resultCode,
        resultMsg: resultInfo.resultMsg,
        merchantId: merchantId,
        website: website,
        environment: process.env.PAYTM_ENVIRONMENT
      })
      
      // Provide more specific error messages based on error codes
      let errorMessage = resultInfo.resultMsg || "Transaction initiation failed"
      if (resultInfo.resultCode === "501") {
        errorMessage = "Paytm configuration error. Please check merchant settings and website name."
      } else if (resultInfo.resultCode === "00000900") {
        errorMessage = "System error from Paytm. Please try again or contact support."
      }
      
      return NextResponse.json(
        { 
          success: false, 
          error: errorMessage,
          resultCode: resultInfo.resultCode,
          debug: {
            merchantId: merchantId,
            website: website,
            environment: process.env.PAYTM_ENVIRONMENT
          }
        }, 
        { status: 400 }
      )
    }

    // Return successful response with transaction token
    return NextResponse.json({
      success: true,
      txnToken: responseTxnToken,
      orderId: responseOrderId,
      amount: responseAmount,
      mid: responseMid,
      callbackUrl: responseCallbackUrl,
      resultInfo: resultInfo
    })

  } catch (error) {
    console.error("[Paytm JS Checkout] Initiate transaction error:", error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : "Failed to initiate Paytm transaction" 
      }, 
      { status: 500 }
    )
  }
}
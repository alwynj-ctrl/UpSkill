import { NextRequest, NextResponse } from 'next/server'
import { PAYTM_CONFIG, generateSignatureForBody, generateOrderId } from '@/lib/paytm-checksum'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, courseId, userId, userInfo } = body

    // Validate required fields
    if (!amount || !courseId || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields: amount, courseId, userId' },
        { status: 400 }
      )
    }

    // Generate unique order ID
    const orderId = generateOrderId()

    // Build callback URL (absolute)
    const origin = request.headers.get('origin') || request.nextUrl.origin
    const callbackUrl = PAYTM_CONFIG.CALLBACK_URL // Use configured HTTPS URL

    // Prepare request body for Paytm
    const paytmBody = {
      requestType: 'Payment',
      mid: PAYTM_CONFIG.MID,
      websiteName: PAYTM_CONFIG.WEBSITE,
      orderId: orderId,
      txnAmount: {
        value: amount.toString(),
        currency: 'INR'
      },
      userInfo: {
        custId: userId,
        mobile: userInfo.phone || '',
        email: userInfo.email || '',
        firstName: userInfo.firstName || '',
        lastName: userInfo.lastName || ''
      },
      callbackUrl: callbackUrl
    }

    // Generate signature as per Paytm spec (base64 HMAC-SHA256 over JSON body)
    const signature = generateSignatureForBody(paytmBody, PAYTM_CONFIG.MERCHANT_KEY)

    // Debug logging
    console.log('Paytm Body for Signature:', paytmBody)
    console.log('Generated Signature:', signature)

    // Prepare request headers
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }

    // Prepare request payload EXACTLY as per Paytm docs
    const requestPayload = {
      body: paytmBody,
      head: {
        signature: signature
      }
    }

    // Call Paytm Initiate Transaction API
    const paytmUrl = `${PAYTM_CONFIG.BASE_URL}/theia/api/v1/initiateTransaction?mid=${PAYTM_CONFIG.MID}&orderId=${orderId}`
    
    const response = await fetch(paytmUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(requestPayload)
    })

    const responseData = await response.json()

    if (!response.ok) {
      console.error('Paytm API Error:', responseData)
      return NextResponse.json(
        { error: 'Failed to initiate transaction with Paytm' },
        { status: 500 }
      )
    }

    // Check if transaction was initiated successfully
    if (responseData.body?.resultInfo?.resultStatus === 'S') {
      return NextResponse.json({
        success: true,
        orderId: orderId,
        txnToken: responseData.body.txnToken,
        amount: amount,
        courseId: courseId,
        userId: userId
      })
    } else {
      console.error('Paytm Transaction Initiation Failed:', responseData.body?.resultInfo)
      return NextResponse.json(
        { 
          error: 'Transaction initiation failed',
          details: responseData.body?.resultInfo?.resultMsg || 'Unknown error'
        },
        { status: 400 }
      )
    }

  } catch (error) {
    console.error('Error initiating Paytm transaction:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

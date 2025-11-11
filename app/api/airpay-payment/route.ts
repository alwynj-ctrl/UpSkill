import { type NextRequest, NextResponse } from "next/server"
import { prepareAirpaySeamlessPayload } from "@/lib/airpay"

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
      uid,
      channel,
      mode,
      chmod,
      cashPincode,
      txnSubtype,
      vpa,
      apiName,
      currency,
      isoCurrency,
      domainUrl,
      merchantDomain,
      upiTpvAccount,
      upiTpvIfsc,
    } = body

    if (!purchaseId) {
      return NextResponse.json({ success: false, error: "Missing purchaseId" }, { status: 400 })
    }

    const amountNumber = Number(amount)

    if (!Number.isFinite(amountNumber) || amountNumber <= 0) {
      return NextResponse.json({ success: false, error: "Invalid amount" }, { status: 400 })
    }

    const preparation = prepareAirpaySeamlessPayload({
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
      uid,
      channel,
      mode,
      chmod,
      cashPincode,
      txnSubtype,
      vpa,
      apiName,
      currency,
      isoCurrency,
      domainUrl,
      merchantDomain,
      upiTpvAccount,
      upiTpvIfsc,
    })

    console.log("[Airpay API] Seamless request payload:", JSON.stringify(preparation.payload, null, 2))

    const searchParams = new URLSearchParams()
    Object.entries(preparation.payload).forEach(([key, value]) => {
      searchParams.append(key, value)
    })

    const airpayResponse = await fetch(preparation.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: searchParams,
    })

    const rawResponse = await airpayResponse.text()
    let parsedResponse: unknown = rawResponse
    try {
      parsedResponse = JSON.parse(rawResponse)
    } catch {
      // keep raw text (Airpay may respond with XML or plain text)
    }

    console.log("[Airpay API] Seamless response status:", airpayResponse.status)
    console.log("[Airpay API] Seamless raw response:", rawResponse)

    if (!airpayResponse.ok) {
      return NextResponse.json(
        {
          success: false,
          orderId: preparation.orderId,
          payload: preparation.payload,
          response: parsedResponse,
        },
        { status: airpayResponse.status }
      )
    }

    return NextResponse.json({
      success: true,
      orderId: preparation.orderId,
      payload: preparation.payload,
      response: parsedResponse,
    })
  } catch (error) {
    console.error("[Airpay] Seamless payment error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to process Airpay seamless payment",
      },
      { status: 500 }
    )
  }
}

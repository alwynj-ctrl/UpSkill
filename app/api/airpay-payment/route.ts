import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required environment variables
    const merchantId = process.env.AIRPAY_MERCHANT_ID
    const username = process.env.AIRPAY_USERNAME
    const password = process.env.AIRPAY_PASSWORD
    const secretKey = process.env.AIRPAY_SECRET_KEY

    if (!merchantId || !username || !password || !secretKey) {
      return NextResponse.json(
        { error: "Payment configuration is incomplete. Please contact support." },
        { status: 500 },
      )
    }

    // Extract payment data from request
    const { amount, firstName, lastName, email, phone, productInfo, address, city, state, pincode } = body

    // Generate unique transaction ID
    const txnId = `TXN${Date.now()}${Math.random().toString(36).substr(2, 9)}`

    const baseUrl = request.headers.get("origin") || "https://your-domain.com"
    const returnUrl = `${baseUrl}/api/airpay-response`
    const cancelUrl = `${baseUrl}/api/airpay-response`

    const paymentParams = {
      // Core merchant details
      merchantid: merchantId, // Changed from merchantId to merchantid
      username: username,
      password: password,
      secret: secretKey, // Changed from secretKey to secret

      // Buyer information
      buyeremail: email, // Changed from buyerEmail to buyeremail
      buyerphone: phone, // Changed from buyerPhone to buyerphone
      buyerfirstname: firstName, // Changed from buyerFirstName to buyerfirstname
      buyerlastname: lastName, // Changed from buyerLastName to buyerlastname
      buyeraddress: address, // Changed from buyerAddress to buyeraddress
      buyercity: city, // Changed from buyerCity to buyercity
      buyerstate: state, // Changed from buyerState to buyerstate
      buyercountry: "India", // Changed from buyerCountry to buyercountry
      buyerpincode: pincode, // Changed from buyerPinCode to buyerpincode

      // Transaction details
      orderamount: amount, // Changed from orderAmount to orderamount
      currency: "356", // INR currency code
      orderid: txnId,

      // Additional parameters
      redirect: "Y",
      mode: "LIVE", // Change to TEST for testing
      customvar: productInfo,

      // Return URLs
      returnurl: returnUrl, // Changed from returnUrl to returnurl
      cancelurl: cancelUrl, // Changed from cancelUrl to cancelurl
    }

    const checksumString = `${paymentParams.merchantid}${paymentParams.buyeremail}${paymentParams.buyerphone}${paymentParams.orderamount}${paymentParams.orderid}${secretKey}`
    const checksum = crypto.createHash("sha256").update(checksumString).digest("hex")

    // Add checksum to payment data
    const finalPaymentData = {
      ...paymentParams,
      checksum: checksum,
    }

    console.log("[v0] Using corrected parameter names for Airpay")
    console.log("[v0] Generated checksum with proper format:", checksum)

    // Return the payment data to be used for form submission
    return NextResponse.json({
      success: true,
      paymentData: finalPaymentData,
      actionUrl: "https://payments.airpay.co.in/pay/index.php",
    })
  } catch (error) {
    console.error("Airpay payment API error:", error)
    return NextResponse.json({ error: "Payment initialization failed. Please try again." }, { status: 500 })
  }
}

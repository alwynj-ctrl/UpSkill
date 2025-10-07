import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    // Extract response parameters from Airpay
    const transactionId = formData.get("TRANSACTIONID")?.toString()
    const amount = formData.get("AMOUNT")?.toString()
    const orderId = formData.get("ORDERID")?.toString()
    const status = formData.get("STATUS")?.toString()
    const message = formData.get("MESSAGE")?.toString()
    const receivedChecksum = formData.get("CHECKSUM")?.toString()

    const secretKey = process.env.AIRPAY_SECRET_KEY

    if (!secretKey) {
      console.error("[v0] Airpay secret key not configured")
      return NextResponse.redirect(new URL("/payment/failure?error=configuration", request.url))
    }

    // Validate checksum according to Airpay documentation
    const checksumString = `${transactionId}${amount}${orderId}${status}${secretKey}`
    const calculatedChecksum = crypto.createHash("sha256").update(checksumString).digest("hex")

    console.log("[v0] Validating Airpay response:", {
      transactionId,
      amount,
      orderId,
      status,
      checksumValid: calculatedChecksum === receivedChecksum,
    })

    // Verify checksum for security
    if (calculatedChecksum !== receivedChecksum) {
      console.error("[v0] Checksum validation failed")
      return NextResponse.redirect(new URL("/payment/failure?error=invalid_checksum", request.url))
    }

    // Redirect based on payment status
    if (status === "SUCCESS" || status === "APPROVED") {
      const successUrl = new URL("/payment/success", request.url)
      successUrl.searchParams.set("TRANSACTIONID", transactionId || "")
      successUrl.searchParams.set("AMOUNT", amount || "")
      successUrl.searchParams.set("ORDERID", orderId || "")
      successUrl.searchParams.set("STATUS", status || "")

      return NextResponse.redirect(successUrl)
    } else {
      const failureUrl = new URL("/payment/failure", request.url)
      failureUrl.searchParams.set("TRANSACTIONID", transactionId || "")
      failureUrl.searchParams.set("AMOUNT", amount || "")
      failureUrl.searchParams.set("ORDERID", orderId || "")
      failureUrl.searchParams.set("STATUS", status || "")
      failureUrl.searchParams.set("MESSAGE", message || "")

      return NextResponse.redirect(failureUrl)
    }
  } catch (error) {
    console.error("[v0] Airpay response handler error:", error)
    return NextResponse.redirect(new URL("/payment/failure?error=processing", request.url))
  }
}

// Handle GET requests (in case Airpay sends GET instead of POST)
export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const transactionId = url.searchParams.get("TRANSACTIONID")
  const amount = url.searchParams.get("AMOUNT")
  const orderId = url.searchParams.get("ORDERID")
  const status = url.searchParams.get("STATUS")
  const message = url.searchParams.get("MESSAGE")
  const receivedChecksum = url.searchParams.get("CHECKSUM")

  const secretKey = process.env.AIRPAY_SECRET_KEY

  if (!secretKey) {
    return NextResponse.redirect(new URL("/payment/failure?error=configuration", request.url))
  }

  // Validate checksum
  const checksumString = `${transactionId}${amount}${orderId}${status}${secretKey}`
  const calculatedChecksum = crypto.createHash("sha256").update(checksumString).digest("hex")

  if (calculatedChecksum !== receivedChecksum) {
    return NextResponse.redirect(new URL("/payment/failure?error=invalid_checksum", request.url))
  }

  // Redirect based on status
  if (status === "SUCCESS" || status === "APPROVED") {
    const successUrl = new URL("/payment/success", request.url)
    successUrl.searchParams.set("TRANSACTIONID", transactionId || "")
    successUrl.searchParams.set("AMOUNT", amount || "")
    successUrl.searchParams.set("ORDERID", orderId || "")
    successUrl.searchParams.set("STATUS", status || "")

    return NextResponse.redirect(successUrl)
  } else {
    const failureUrl = new URL("/payment/failure", request.url)
    failureUrl.searchParams.set("TRANSACTIONID", transactionId || "")
    failureUrl.searchParams.set("AMOUNT", amount || "")
    failureUrl.searchParams.set("ORDERID", orderId || "")
    failureUrl.searchParams.set("STATUS", status || "")
    failureUrl.searchParams.set("MESSAGE", message || "")

    return NextResponse.redirect(failureUrl)
  }
}

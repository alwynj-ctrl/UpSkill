import Razorpay from "razorpay"
import crypto from "crypto"

const RAZORPAY_KEY_ID = "rzp_live_RhAomknCi1cKEB"
const RAZORPAY_KEY_SECRET = "FZJsEy7EeMtqE8LmvrprDfjF"

let razorpayClient: Razorpay | null = null

function assertConfig() {
  if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
    console.error("[Razorpay Config] Missing credentials:")
    console.error("  RAZORPAY_KEY_ID:", RAZORPAY_KEY_ID ? "✓ Present" : "✗ Missing")
    console.error("  RAZORPAY_KEY_SECRET:", RAZORPAY_KEY_SECRET ? "✓ Present" : "✗ Missing")
    throw new Error("Missing Razorpay configuration. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env file.")
  }
  
  // Log key format for debugging (first 10 chars only for security)
  console.log("[Razorpay Config] Credentials loaded:")
  console.log("  Key ID format:", RAZORPAY_KEY_ID.substring(0, 10) + "...")
  console.log("  Key Secret format:", RAZORPAY_KEY_SECRET.substring(0, 10) + "...")
}

function getClient(): Razorpay {
  assertConfig()
  if (!razorpayClient) {
    razorpayClient = new Razorpay({
      key_id: RAZORPAY_KEY_ID!,
      key_secret: RAZORPAY_KEY_SECRET!,
    })
  }
  return razorpayClient
}

export type CreateOrderInput = {
  amount: number
  currency?: string
  receipt?: string
  notes?: Record<string, string>
  allowPartial?: boolean
  firstPaymentMinAmount?: number
}

export async function createRazorpayOrder(input: CreateOrderInput) {
  const { amount, currency = "INR", receipt, notes, allowPartial = false, firstPaymentMinAmount } = input

  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error("Invalid amount for Razorpay order")
  }

  const normalizedAmount = Math.round(amount * 100)

  return getClient().orders.create({
    amount: normalizedAmount,
    currency,
    receipt,
    notes,
    partial_payment: allowPartial,
    first_payment_min_amount: allowPartial ? firstPaymentMinAmount : undefined,
    payment_capture: 1,
  })
}

export function verifyRazorpaySignature({
  orderId,
  paymentId,
  signature,
}: {
  orderId: string
  paymentId: string
  signature: string
}) {
  assertConfig()

  const expected = crypto.createHmac("sha256", RAZORPAY_KEY_SECRET!).update(`${orderId}|${paymentId}`).digest("hex")
  return expected === signature
}

export function getRazorpayKeyId() {
  assertConfig()
  return RAZORPAY_KEY_ID!
}



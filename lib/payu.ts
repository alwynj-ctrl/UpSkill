import crypto from "crypto"

// PayU Configuration
export const PAYU_CONFIG = {
  TEST: {
    key: "t7sCrz",
    salt: "QKXlKoQ0Sg47VvHS6e2CO9MLee8LmkYw", // 32-bit salt
    paymentUrl: "https://test.payu.in/_payment",
  },
  PRODUCTION: {
    key: "3c9ZFo",
    salt: "HZRPEBWpW9S45kcJDw8rurBS1XWsZn0U", // Production 32-bit salt
    paymentUrl: "https://secure.payu.in/_payment",
  },
}

// Set environment
export const PAYU_ENV = process.env.PAYU_ENVIRONMENT === "production" ? "PRODUCTION" : "TEST"

export const getPayUConfig = () => PAYU_CONFIG[PAYU_ENV]

/**
 * Generate PayU Hash (Nonseamless Flow - Standard Hash Type)
 * Formula: sha512(key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||SALT)
 * Matches PayU Payment Hub generated code format
 */
export function generatePayUHash(params: {
  key: string
  txnid: string
  amount: string
  productinfo: string
  firstname: string
  email: string
  udf1?: string
  udf2?: string
  udf3?: string
  udf4?: string
  udf5?: string
  salt: string
}): string {
  const {
    key,
    txnid,
    amount,
    productinfo,
    firstname,
    email,
    udf1 = "",
    udf2 = "",
    udf3 = "",
    udf4 = "",
    udf5 = "",
    salt,
  } = params

  // Build hash string in PayU format for Nonseamless flow (using array join like reference)
  const hashString = [
    key,
    txnid,
    amount,
    productinfo,
    firstname,
    email,
    udf1,
    udf2,
    udf3,
    udf4,
    udf5,
    "", // Empty field 6
    "", // Empty field 7
    "", // Empty field 8
    "", // Empty field 9
    "", // Empty field 10
    salt,
  ].join("|")

  return crypto.createHash("sha512").update(hashString).digest("hex")
}

/**
 * Verify PayU Response Hash (Reverse Hash)
 * Formula: sha512(SALT|status||||||udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid|key)
 */
export function verifyPayUResponseHash(params: {
  status: string
  txnid: string
  amount: string
  productinfo: string
  firstname: string
  email: string
  udf1?: string
  udf2?: string
  udf3?: string
  udf4?: string
  udf5?: string
  key: string
  salt: string
  receivedHash: string
}): boolean {
  const {
    status,
    txnid,
    amount,
    productinfo,
    firstname,
    email,
    udf1 = "",
    udf2 = "",
    udf3 = "",
    udf4 = "",
    udf5 = "",
    key,
    salt,
    receivedHash,
  } = params

  // Hash sequence for response (reverse order)
  const hashString = `${salt}|${status}||||||${udf5}|${udf4}|${udf3}|${udf2}|${udf1}|${email}|${firstname}|${productinfo}|${amount}|${txnid}|${key}`

  const calculatedHash = crypto.createHash("sha512").update(hashString).digest("hex")

  return calculatedHash.toLowerCase() === receivedHash.toLowerCase()
}

/**
 * Generate unique transaction ID with random component
 * Format: TXN{timestamp}{random} (matches PayU Payment Hub format)
 */
export function generateTxnId(prefix: string = "TXN"): string {
  const timestamp = Date.now()
  const random = Math.floor(Math.random() * 10000)
  return `${prefix}${timestamp}${random}`
}


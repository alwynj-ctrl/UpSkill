import { generateAirpayChecksum } from "./airpay-checksum"

const AIRPAY_PAYMENT_URL = process.env.AIRPAY_PAYMENT_URL || "https://payments.airpay.co.in/pay/index.php"
const AIRPAY_MERCHANT_ID = process.env.AIRPAY_MERCHANT_ID
const AIRPAY_USERNAME = process.env.AIRPAY_USERNAME
const AIRPAY_PASSWORD = process.env.AIRPAY_PASSWORD
const AIRPAY_SECRET_KEY = process.env.AIRPAY_SECRET_KEY
const AIRPAY_CHMOD = process.env.AIRPAY_CHMOD || ""
const AIRPAY_KITTYPE = process.env.AIRPAY_KITTYPE || "server_side_sdk"

export type AirpayInitParams = {
  buyerEmail: string
  buyerPhone: string
  buyerFirstName: string
  buyerLastName: string
  amount: number
  purchaseId: string
  uid?: string
  customField?: string
  buyerAddress?: string
  buyerCity?: string
  buyerState?: string
  buyerCountry?: string
  buyerPinCode?: string
  txnSubtype?: string
  token?: string
  wallet?: string
  currency?: string
  isoCurrency?: string
  vpa?: string
  kitType?: string
  subscription?: {
    nextRunDate: string // Format: mm/dd/yyyy (e.g., "03/08/2022") - must be current date + 1 (t+1)
    frequency: string // Numeric (1-999)
    period: string // D|W|M|Y|A (Day/Week/Month/Year/Adhoc)
    amount: number // Subscription amount
    isRecurring: string | number // 1 for recurring, 0 for non-recurring
    recurringCount: string | number // 1-999 (999 = never ending)
    retryAttempts: string | number // 1-999
    maxAmount?: number // Maximum amount that can be charged (>= amount)
  }
}

export type AirpayInitResult = {
  orderId: string
  paymentUrl: string
  paymentData: Record<string, string>
}

function assertConfig() {
  if (!AIRPAY_MERCHANT_ID || !AIRPAY_USERNAME || !AIRPAY_PASSWORD || !AIRPAY_SECRET_KEY) {
    throw new Error("Missing Airpay configuration. Please set AIRPAY_MERCHANT_ID, AIRPAY_USERNAME, AIRPAY_PASSWORD and AIRPAY_SECRET_KEY environment variables.")
  }
}

function sanitiseOrderId(source: string) {
  const cleaned = source.replace(/[^A-Za-z0-9]/g, "").toUpperCase()
  const suffix = cleaned || `AIRPAY${Date.now()}`
  return suffix.length > 24 ? suffix.substring(0, 24) : suffix
}

function normaliseAmount(amount: number) {
  return amount.toFixed(2)
}

export function prepareAirpayPayment(params: AirpayInitParams): AirpayInitResult {
  assertConfig()

  const {
    buyerEmail,
    buyerPhone,
    buyerFirstName,
    buyerLastName,
    amount,
    purchaseId,
    uid,
    customField = "",
    buyerAddress = "",
    buyerCity = "",
    buyerState = "",
    buyerCountry = "India",
    buyerPinCode = "",
    txnSubtype = "",
    token = "",
    wallet = "0",
    currency = "356",
    isoCurrency = "INR",
    vpa = "",
    kitType,
    subscription,
  } = params

  if (!buyerEmail || !buyerFirstName || !buyerLastName || !buyerPhone) {
    throw new Error("Missing required buyer fields for Airpay payment.")
  }

  // Use raw values (with whitespace/newline stripping) exactly as required for checksum concatenation
  
  // Use raw values exactly as they come (empty string if undefined/null)
  // CRITICAL: Remove any newlines, carriage returns, or extra whitespace that could break checksum
  const email = String(buyerEmail || "").replace(/[\r\n]/g, "").trim()
  const fname = String(buyerFirstName || "").replace(/[\r\n]/g, "").trim()
  const lname = String(buyerLastName || "").replace(/[\r\n]/g, "").trim()
  const addr = String(buyerAddress || "").replace(/[\r\n]/g, "").trim()
  const cityVal = String(buyerCity || "").replace(/[\r\n]/g, "").trim()
  const stateVal = String(buyerState || "").replace(/[\r\n]/g, "").trim()
  const countryVal = String(buyerCountry || "").replace(/[\r\n]/g, "").trim()
  
  // Sanitize orderId to alphanumeric only (required by Airpay validation: /^[A-Za-z\d]+$/)
  // Remove all non-alphanumeric characters (hyphens, spaces, etc.)
  // Length must be 1-25 characters (per documentation)
  // This is critical - use the SAME sanitized value in both checksum and form data
  // NOTE: Keep original casing - checksum is case sensitive
  const rawOrderId = String(purchaseId || "")
  let orderId = rawOrderId.replace(/[^A-Za-z0-9]/g, "")
  
  // If sanitization removed everything or no purchaseId provided, generate a new one
  // Format: ORDER + timestamp (last 20 chars to stay within 25 char limit)
  if (!orderId || orderId.length === 0) {
    const timestamp = Date.now().toString()
    orderId = `ORDER${timestamp}`.substring(0, 25)
  }
  
  // Ensure length is between 1-25 characters (per documentation)
  if (orderId.length > 25) {
    orderId = orderId.substring(0, 25)
  }
  
  // Final validation - must be at least 1 character
  if (orderId.length === 0) {
    orderId = "ORDER1"
  }
  
  // Amount must be formatted with 2 decimals (e.g., "1.00")
  const amountStr = amount.toFixed(2)
  
  // Date in YYYY-MM-DD format (per Sanctum docs: date.toISOString().split('T')[0])
  const datePortion = new Date().toISOString().split("T")[0]
  
  // Prepare UID and subscription index (exact order per docs)
  const uidValue = String(uid ?? purchaseId ?? "")
  let subscriptionIndex = ""
  if (subscription) {
    const {
      nextRunDate = "",
      frequency = "",
      period = "",
      amount: subscriptionAmount = 0,
      isRecurring = "",
      recurringCount = "",
      retryAttempts = "",
    } = subscription

    subscriptionIndex = `${String(nextRunDate)}${String(frequency)}${String(period)}${normaliseAmount(
      Number(subscriptionAmount || 0)
    )}${String(isRecurring)}${String(recurringCount)}${String(retryAttempts)}`
  }
  
  // Generate checksum using the official Sanctum v3 formula
  // alldata = buyerEmail + buyerFirstName + buyerLastName + buyerAddress + buyerCity + buyerState + buyerCountry + amount + orderid + UID + siindexvar + date
  // key = sha256(username + ":" + password)
  // checksum = sha256(key + "@" + alldata)
  const mercidStr = String(AIRPAY_MERCHANT_ID || "")
  
  const checksumResult = generateAirpayChecksum({
    username: AIRPAY_USERNAME!,
    password: AIRPAY_PASSWORD!,
    secretKey: AIRPAY_SECRET_KEY!,
    buyerEmail: email,
    buyerFirstName: fname,
    buyerLastName: lname,
    buyerAddress: addr,
    buyerCity: cityVal,
    buyerState: stateVal,
    buyerCountry: countryVal,
    amount: amountStr,
    orderId: orderId,
    uid: uidValue,
    subscriptionIndex,
    date: datePortion,
  })

  const { privateKey, key, checksum, alldata } = checksumResult

  // Debug logging - print FULL values for verification
  console.log("[Airpay] Debug checksum calculation (Sanctum v3):")
  console.log("  orderId:", orderId)
  console.log("  amountStr:", amountStr)
  console.log("  datePortion:", datePortion)
  console.log("  alldata (FULL):", alldata)
  console.log("  alldataLength:", alldata.length)
  console.log("  privateKey (FULL):", privateKey)
  console.log("  key (FULL):", key)
  console.log("  checksumInput:", checksumResult.checksumInput)
  console.log("  checksum (FULL):", checksum)
  console.log("  checksumLength:", checksum.length)
  
  // Log individual alldata components for verification
  console.log("[Airpay] Alldata components breakdown (Sanctum v3 order):")
  console.log("  email:", email, "(length:", email.length, ")")
  console.log("  fname:", fname, "(length:", fname.length, ")")
  console.log("  lname:", lname, "(length:", lname.length, ")")
  console.log("  addr:", addr, "(length:", addr.length, ")")
  console.log("  city:", cityVal, "(length:", cityVal.length, ")")
  console.log("  state:", stateVal, "(length:", stateVal.length, ")")
  console.log("  country:", countryVal, "(length:", countryVal.length, ")")
  console.log("  amountStr:", amountStr, "(length:", amountStr.length, ")")
  console.log("  orderId:", orderId, "(length:", orderId.length, ")")
  console.log("  uidValue:", uidValue, "(length:", uidValue.length, ")")
  console.log("  subscriptionIndex:", subscriptionIndex, "(length:", subscriptionIndex.length, ")")
  console.log("  datePortion:", datePortion, "(length:", datePortion.length, ")")
  console.log("  NOTE: mercid is NOT part of alldata per Sanctum docs")

  // Prepare other form fields
  const safeCustomField = (customField || orderId).replace(/[^A-Za-z0-9\s=|]/g, "")
  const customvar = `${safeCustomField}|${AIRPAY_USERNAME}|${AIRPAY_MERCHANT_ID}`
  // uidValue already defined above for checksum calculation
  const walletValue = String(wallet ?? "0")
  const currencyCode = String(currency ?? "356")
  const isoCurrencyCode = String(isoCurrency ?? "INR").toUpperCase()
  const kitTypeValue = String(kitType || AIRPAY_KITTYPE)

  // CRITICAL: Use the EXACT same values in paymentData as used in checksum calculation
  // This ensures the checksum validates correctly
  const paymentData: Record<string, string> = {
    buyerEmail: email, // Same as in alldata
    buyerPhone: String(buyerPhone || ""),
    buyerFirstName: fname, // Same as in alldata
    buyerLastName: lname, // Same as in alldata
    buyerAddress: addr, // Same as in alldata
    buyerCity: cityVal, // Same as in alldata
    buyerState: stateVal, // Same as in alldata
    buyerCountry: countryVal, // Same as in alldata
    buyerPinCode: String(buyerPinCode || ""),
    orderid: orderId, // EXACT same orderId as in alldata checksum calculation
    amount: amountStr, // EXACT same amountStr as in alldata checksum calculation
    UID: uidValue,
    customvar,
    txnsubtype: String(txnSubtype || ""),
    token: String(token || ""),
    wallet: walletValue,
    currency: currencyCode,
    isocurrency: isoCurrencyCode,
    vpa: String(vpa || ""),
    kittype: kitTypeValue,
    privatekey: privateKey,
    checksum,
    mercid: String(AIRPAY_MERCHANT_ID || ""),
    chmod: String(AIRPAY_CHMOD || ""),
  }

  // Add subscription fields if subscription is provided
  if (subscription) {
    const {
      nextRunDate = "",
      period = "",
      frequency = "",
      amount: subscriptionAmount = 0,
      isRecurring = "",
      recurringCount = "",
      retryAttempts = "",
      maxAmount,
    } = subscription

    paymentData.sb_nextrundate = String(nextRunDate)
    paymentData.sb_period = String(period)
    paymentData.sb_frequency = String(frequency)
    paymentData.sb_amount = normaliseAmount(Number(subscriptionAmount || 0))
    paymentData.sb_isrecurring = String(isRecurring)
    paymentData.sb_recurringcount = String(recurringCount)
    paymentData.sb_retryattempts = String(retryAttempts)
    if (maxAmount !== undefined) {
      paymentData.sb_maxamount = normaliseAmount(Number(maxAmount))
    }
  }

  // Compare checksum calculation values with payment data being sent
  console.log("[Airpay] Comparison: Checksum inputs vs Payment Data")
  console.log("  ✓ orderid - checksum:", orderId, "| paymentData:", paymentData.orderid, "| match:", orderId === paymentData.orderid)
  console.log("  ✓ amount - checksum:", amountStr, "| paymentData:", paymentData.amount, "| match:", amountStr === paymentData.amount)
  console.log("  ✓ buyerEmail - checksum:", email, "| paymentData:", paymentData.buyerEmail, "| match:", email === paymentData.buyerEmail)
  console.log("  ✓ buyerFirstName - checksum:", fname, "| paymentData:", paymentData.buyerFirstName, "| match:", fname === paymentData.buyerFirstName)
  console.log("  ✓ buyerLastName - checksum:", lname, "| paymentData:", paymentData.buyerLastName, "| match:", lname === paymentData.buyerLastName)
  console.log("  ✓ buyerAddress - checksum:", addr, "| paymentData:", paymentData.buyerAddress, "| match:", addr === paymentData.buyerAddress)
  console.log("  ✓ buyerCity - checksum:", cityVal, "| paymentData:", paymentData.buyerCity, "| match:", cityVal === paymentData.buyerCity)
  console.log("  ✓ buyerState - checksum:", stateVal, "| paymentData:", paymentData.buyerState, "| match:", stateVal === paymentData.buyerState)
  console.log("  ✓ buyerCountry - checksum:", countryVal, "| paymentData:", paymentData.buyerCountry, "| match:", countryVal === paymentData.buyerCountry)
  console.log("  ✓ UID - checksum:", uidValue, "| paymentData:", paymentData.UID, "| match:", uidValue === paymentData.UID)
  console.log("  ✓ subscriptionIndex (if any) - checksum:", subscriptionIndex, "| match:", subscription ? "included" : "not applicable")
  console.log("  ✓ checksum - calculated:", checksum, "| paymentData:", paymentData.checksum, "| match:", checksum === paymentData.checksum)
  console.log("  NOTE: mercid is NOT part of checksum, but is sent in paymentData")
  console.log("[Airpay] Final paymentData object (before cleaning):", JSON.stringify(paymentData, null, 2))

  // CRITICAL: Airpay expects privatekey in payload for simple transaction redirect
  
  // Filter out empty strings (optional fields that are empty should be omitted)
  // Note: Original kit sends all fields including empty ones, but Airpay may expect them omitted
  // Let's be conservative and only filter truly optional empty fields
  const cleanPaymentData = Object.fromEntries(
    Object.entries(paymentData).filter(([key, v]) => {
      // Required fields: always keep even if empty (let Airpay validate)
      const requiredFields = [
        "buyerEmail", "buyerPhone", "buyerFirstName", "buyerLastName",
        "orderid", "amount", "UID", "mercid", "privatekey", "checksum", "kittype"
      ]
      
      if (requiredFields.includes(key)) {
        return true // Always keep required fields
      }
      
      // For optional fields, filter out empty strings
      // Note: "0" is a valid value (e.g., wallet), so keep it
      return v !== "" && v !== null && v !== undefined
    })
  ) as Record<string, string>

  // Calculate which fields were removed
  const removedFields = Object.keys(paymentData).filter(k => !(k in cleanPaymentData))
  
  console.log("[Airpay] Cleaned paymentData (after removing empty optional fields):")
  console.log("  Original field count:", Object.keys(paymentData).length)
  console.log("  Cleaned field count:", Object.keys(cleanPaymentData).length)
  if (removedFields.length > 0) {
    console.log("  Optional fields removed (empty):", removedFields.join(", "))
    removedFields.forEach(field => {
      console.log(`    - ${field}:`, paymentData[field] === "" ? "(empty string)" : paymentData[field])
    })
  }
  console.log("  Fields being sent:", Object.keys(cleanPaymentData).join(", "))
  console.log("  Cleaned payload:", JSON.stringify(cleanPaymentData, null, 2))
  console.log("  ✓ privatekey included (required by Airpay):", "privatekey" in cleanPaymentData)
  console.log("  ✓ checksum included:", "checksum" in cleanPaymentData, "=", cleanPaymentData.checksum)
  console.log("  ✓ mercid included:", "mercid" in cleanPaymentData, "=", cleanPaymentData.mercid)

  return {
    orderId,
    paymentUrl: AIRPAY_PAYMENT_URL,
    paymentData: cleanPaymentData,
  }
}


import { generateAirpayChecksum } from "./airpay-checksum"

const AIRPAY_SEAMLESS_URL =
  process.env.AIRPAY_SEAMLESS_URL || "https://kraken.airpay.co.in/airpay/pay/payindexapi.php"
const AIRPAY_MERCHANT_ID = process.env.AIRPAY_MERCHANT_ID
const AIRPAY_USERNAME = process.env.AIRPAY_USERNAME
const AIRPAY_PASSWORD = process.env.AIRPAY_PASSWORD
const AIRPAY_SECRET_KEY = process.env.AIRPAY_SECRET_KEY
const AIRPAY_CHANNEL = process.env.AIRPAY_CHANNEL || "upi"
const AIRPAY_MODE = process.env.AIRPAY_MODE || "vpa"
const AIRPAY_CHMOD = process.env.AIRPAY_CHMOD || "upi"
const AIRPAY_CASH_PINCODE = process.env.AIRPAY_CASH_PINCODE || ""
const AIRPAY_DOMAIN_URL = process.env.AIRPAY_DOMAIN_URL || "https://www.upskillworkforce.co"
const AIRPAY_MER_DOM = process.env.AIRPAY_MER_DOM || ""
const AIRPAY_CURRENCY = process.env.AIRPAY_CURRENCY || "356"
const AIRPAY_ISO_CURRENCY = process.env.AIRPAY_ISO_CURRENCY || "INR"

export type AirpaySeamlessParams = {
  buyerEmail: string
  buyerPhone: string
  buyerFirstName: string
  buyerLastName: string
  buyerAddress: string
  buyerCity: string
  buyerState: string
  buyerCountry: string
  buyerPinCode: string
  amount: number
  purchaseId: string
  uid?: string
  channel?: string
  mode?: string
  chmod?: string
  cashPincode?: string
  txnSubtype?: string
  vpa?: string
  apiName?: string
  currency?: string
  isoCurrency?: string
  domainUrl?: string
  merchantDomain?: string // will be base64 encoded if raw domain provided
  upiTpvAccount?: string
  upiTpvIfsc?: string
}

export type AirpaySeamlessResult = {
  orderId: string
  endpoint: string
  payload: Record<string, string>
  debug: {
    checksum: string
    alldata: string
    checksumInput: string
    privateKey: string
    key: string
    date: string
  }
}

function assertConfig() {
  if (!AIRPAY_MERCHANT_ID || !AIRPAY_USERNAME || !AIRPAY_PASSWORD || !AIRPAY_SECRET_KEY) {
    throw new Error(
      "Missing Airpay configuration. Please set AIRPAY_MERCHANT_ID, AIRPAY_USERNAME, AIRPAY_PASSWORD and AIRPAY_SECRET_KEY environment variables."
    )
  }
}

function sanitiseOrderId(source: string) {
  const cleaned = source.replace(/[^A-Za-z0-9]/g, "")
  const suffix = cleaned || `AIRPAY${Date.now()}`
  return suffix.length > 25 ? suffix.substring(0, 25) : suffix
}

function normaliseAmount(amount: number) {
  return amount.toFixed(2)
}

function encodeDomain(domain?: string) {
  const trimmed = (domain || "").trim()
  if (!trimmed) return ""
  return Buffer.from(trimmed, "utf8").toString("base64")
}

export function prepareAirpaySeamlessPayload(params: AirpaySeamlessParams): AirpaySeamlessResult {
  assertConfig()

  const {
    buyerEmail,
    buyerPhone,
    buyerFirstName,
    buyerLastName,
    buyerAddress,
    buyerCity,
    buyerState,
    buyerCountry,
    buyerPinCode,
    amount,
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
  } = params

  const requiredFields = [
    buyerEmail,
    buyerPhone,
    buyerFirstName,
    buyerLastName,
    buyerAddress,
    buyerCity,
    buyerState,
    buyerCountry,
    buyerPinCode,
  ]
  if (requiredFields.some((value) => !value || `${value}`.trim().length === 0)) {
    throw new Error("Missing required buyer fields for Airpay seamless payment.")
  }

  const email = buyerEmail.replace(/[\r\n]/g, "").trim()
  const phone = buyerPhone.replace(/[\r\n]/g, "").trim()
  const fname = buyerFirstName.replace(/[\r\n]/g, "").trim()
  const lname = buyerLastName.replace(/[\r\n]/g, "").trim()
  const addr = buyerAddress.replace(/[\r\n]/g, "").trim()
  const city = buyerCity.replace(/[\r\n]/g, "").trim()
  const state = buyerState.replace(/[\r\n]/g, "").trim()
  const country = buyerCountry.replace(/[\r\n]/g, "").trim()
  const pin = buyerPinCode.replace(/[\r\n]/g, "").trim()

  let orderId = sanitiseOrderId(purchaseId)
  if (!orderId) {
    orderId = sanitiseOrderId(`ORDER${Date.now()}`)
  }

  const amountStr = normaliseAmount(amount)
  const uidValue = (uid || purchaseId || "").replace(/[\r\n]/g, "").trim()
  const merchId = String(AIRPAY_MERCHANT_ID)
  const channelValue = (channel || AIRPAY_CHANNEL).trim()
  const modeValue = (mode || AIRPAY_MODE).trim()
  const chmodValue = (chmod || AIRPAY_CHMOD).trim()
  const cashPinValue = (cashPincode || AIRPAY_CASH_PINCODE || pin).trim()
  const currencyCode = String(currency || AIRPAY_CURRENCY).trim()
  const isoCurrencyCode = String(isoCurrency || AIRPAY_ISO_CURRENCY).trim().toUpperCase()
  const domainUrlValue = (domainUrl || AIRPAY_DOMAIN_URL).trim()
  const merDomValue =
    merchantDomain?.trim() ||
    (AIRPAY_MER_DOM ? AIRPAY_MER_DOM.trim() : encodeDomain(domainUrlValue || "http://localhost"))

  const datePortion = new Date().toISOString().split("T")[0]

  const checksumResult = generateAirpayChecksum({
    username: AIRPAY_USERNAME!,
    password: AIRPAY_PASSWORD!,
    secretKey: AIRPAY_SECRET_KEY!,
    buyerEmail: email,
    buyerFirstName: fname,
    buyerLastName: lname,
    buyerAddress: addr,
    buyerCity: city,
    buyerState: state,
    buyerCountry: country,
    amount: amountStr,
    orderId,
    uid: uidValue,
    date: datePortion,
  })

  const { privateKey, key, checksum, alldata, checksumInput, date } = checksumResult

  console.log("[Airpay] Seamless checksum debug:")
  console.log("  orderId:", orderId)
  console.log("  amount:", amountStr)
  console.log("  date:", date)
  console.log("  alldata:", alldata)
  console.log("  privateKey:", privateKey)
  console.log("  key:", key)
  console.log("  checksumInput:", checksumInput)
  console.log("  checksum:", checksum)

  const payload: Record<string, string> = {
    buyer_email: email,
    buyer_phone: phone,
    buyer_first_name: fname,
    buyer_last_name: lname,
    buyer_address: addr,
    buyer_city: city,
    buyer_state: state,
    buyer_country: country,
    buyer_pincode: pin,
    order_id: orderId,
    amount: amountStr,
    UID: uidValue,
    channel: channelValue,
    mode: modeValue,
    private_key: privateKey,
    cash_pincode: cashPinValue,
    merchant_id: merchId,
    chmod: chmodValue,
    checksum,
    mer_dom: merDomValue,
    currency: currencyCode,
    isocurrency: isoCurrencyCode,
  }

  if (txnSubtype) payload.txnsubtype = String(txnSubtype).trim()
  if (vpa) payload.vpa = vpa.trim()
  if (apiName) payload.apiName = apiName.trim()
  if (domainUrlValue) payload.domain_url = domainUrlValue
  if (upiTpvAccount) payload.upi_tpv_account = String(upiTpvAccount).trim()
  if (upiTpvIfsc) payload.upi_tpv_ifsc = upiTpvIfsc.trim()

  // Remove empty optional fields
  Object.entries(payload).forEach(([key, value]) => {
    if (value === "" || value === undefined || value === null) {
      delete payload[key]
    }
  })

  console.log("[Airpay] Seamless payload (sanitized):", JSON.stringify(payload, null, 2))

  return {
    orderId,
    endpoint: AIRPAY_SEAMLESS_URL,
    payload,
    debug: {
      checksum,
      alldata,
      checksumInput,
      privateKey,
      key,
      date,
    },
  }
}


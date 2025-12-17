export type PaytmEnvironment = "production" | "staging"

export type PaytmConfig = {
  mid: string
  merchantKey: string
  website: string
  environment: PaytmEnvironment
  baseUrl: string
  callbackUrl: string
}

function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

function stripTrailingSlashes(input: string): string {
  return input.replace(/\/+$/, "")
}

function stripLeadingSlashes(input: string): string {
  return input.replace(/^\/+/, "")
}

export function getPaytmConfig(origin?: string): PaytmConfig {
  const environmentRaw = (process.env.PAYTM_ENVIRONMENT ?? "production").toLowerCase()
  const environment: PaytmEnvironment = environmentRaw === "staging" ? "staging" : "production"

  const baseUrl = environment === "production" ? "https://securegw.paytm.in" : "https://securestage.paytm.in"
  const website = process.env.PAYTM_WEBSITE ?? "DEFAULT"

  const mid = requireEnv("PAYTM_MERCHANT_ID")
  const merchantKey = requireEnv("PAYTM_MERCHANT_KEY")

  const siteUrlRaw = process.env.NEXT_PUBLIC_SITE_URL ?? origin
  const siteUrl = siteUrlRaw ? stripTrailingSlashes(siteUrlRaw) : undefined
  const callbackUrlFromEnv = process.env.PAYTM_CALLBACK_URL
  const callbackUrl = callbackUrlFromEnv
    ? callbackUrlFromEnv
    : siteUrl
      ? `${siteUrl}/${stripLeadingSlashes("api/paytm-callback")}`
      : ""
  if (!callbackUrl) {
    throw new Error(
      "Missing PAYTM_CALLBACK_URL (or NEXT_PUBLIC_SITE_URL/origin) - unable to determine Paytm callback URL."
    )
  }

  return { mid, merchantKey, website, environment, baseUrl, callbackUrl }
}



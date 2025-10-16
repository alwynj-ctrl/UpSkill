export const SABPAISA_CONFIG = {
  CLIENT_CODE: 'KART95',
  USERNAME: 'banking@upskillworkforce.co',
  PASSWORD: 'KART95_SP21020',
  // Production uses 128-bit keys (16 chars) - use them directly without base64
  AUTH_KEY: 'h5GiFG9f6aVVuHcK',
  AUTH_IV: 'd8SjH0NlK6TVmHzw',
  INIT_URL: 'https://securepay.sabpaisa.in/SabPaisa/sabPaisaInit?v=1',
  RETURN_URL: 'https://www.upskillworkforce.co/payment/success',
  FAILURE_URL: 'https://www.upskillworkforce.co/payment/failure',
}

// Staging credentials from vendor sample (for localhost testing only)
export const SABPAISA_STAGING = {
  CLIENT_CODE: 'DJ020',
  USERNAME: 'DJL754@sp',
  PASSWORD: '4q3qhgmJNM4m',
  AUTH_KEY: 'ISTrmmDC2bTvkxzlDRrVguVwetGS8xC/UFPsp6w+Itg=',
  AUTH_IV: 'M+aUFgRMPq7ci+Cmoytp3KJ2GPBOwO72Z2Cjbr55zY7++pT9mLES2M5cIblnBtaX',
}

export function generateSabPaisaOrderId(): string {
  const ts = Date.now()
  const rand = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `SP_${ts}_${rand}`
}



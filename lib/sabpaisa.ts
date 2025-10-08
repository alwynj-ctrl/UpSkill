export const SABPAISA_CONFIG = {
  CLIENT_CODE: 'KART95',
  USERNAME: 'banking@upskillworkforce.co',
  PASSWORD: 'KART95_SP21020',
  AUTH_KEY: 'h5GiFG9f6aVVuHcK',
  AUTH_IV: 'd8SjH0NlK6TVmHzw',
  INIT_URL: 'https://securepay.sabpaisa.in/SabPaisa/sabPaisaInit?v=1',
  RETURN_URL: 'https://www.upskillworkforce.co/payment/success',
  FAILURE_URL: 'https://www.upskillworkforce.co/payment/failure',
}

export function generateSabPaisaOrderId(): string {
  const ts = Date.now()
  const rand = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `SP_${ts}_${rand}`
}



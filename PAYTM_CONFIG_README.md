# Paytm Payment Gateway Configuration

## ✅ FIXED - Credentials Hardcoded

Paytm production credentials are now **hardcoded** in the API routes:
- Merchant ID: `uYTkMQ79093638871742`
- Merchant Key: `ycqMGlcTkfycGMps`
- Environment: **PRODUCTION**
- Callback URL: `https://www.upskillworkforce.co/api/paytm-response`

## What's Happening

1. User clicks "Pay with Paytm"
2. Backend tries to generate payment checksum **without valid credentials**
3. Paytm gateway receives invalid/incomplete data
4. Paytm **immediately rejects** the payment
5. Paytm redirects back to your failure page

## Required Environment Variables

Create a `.env.local` file in your project root with these variables:

```env
# Supabase (you already have these)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
# Change to https://www.upskillworkforce.co in production

# Paytm Credentials (REQUIRED - GET THESE FROM PAYTM)
PAYTM_MERCHANT_ID=your_merchant_id_here
PAYTM_MERCHANT_KEY=your_merchant_key_here
PAYTM_WEBSITE=DEFAULT
PAYTM_INDUSTRY_TYPE=Retail
PAYTM_CHANNEL_ID=WEB
PAYTM_ENVIRONMENT=staging
```

## How to Get Paytm Credentials

1. **Sign up for Paytm Business**: https://business.paytm.com/
2. **Complete KYC** and merchant verification
3. **Access your Merchant Dashboard**
4. **Navigate to**: Developer Settings / API Keys
5. **Get your credentials**:
   - Merchant ID (MID)
   - Merchant Key
   - Website name (usually "DEFAULT" for production, "WEBSTAGING" for testing)

## Testing with Staging

For testing, Paytm provides staging credentials. You need to:
1. Request staging/test credentials from Paytm support
2. Set `PAYTM_ENVIRONMENT=staging`
3. Use staging credentials in your `.env.local`

## Production Configuration

When going live:
1. Use your **production** Merchant ID and Key
2. Set `PAYTM_ENVIRONMENT=production`
3. Set `NEXT_PUBLIC_SITE_URL=https://www.upskillworkforce.co`
4. Set `PAYTM_WEBSITE=DEFAULT` (or as provided by Paytm)

## After Adding Credentials

1. Create `.env.local` file with the above variables
2. **Restart your development server** (`npm run dev`)
3. Try the payment again
4. Check the browser console and server logs for any errors

## Current Code Status

✅ Payment form is working
✅ SabPaisa integration is working
✅ Paytm integration code is implemented
❌ **Paytm credentials are missing** (this is why it fails)
✅ Middleware updated to allow payment callbacks
✅ Proper error handling and logging added

## Next Steps

1. **Get Paytm credentials** from your Paytm merchant dashboard
2. **Create `.env.local`** with the credentials
3. **Restart the server**
4. **Test the payment flow**

If you don't have Paytm credentials yet, you should:
- Contact Paytm support to set up a merchant account
- Or disable the Paytm payment option until credentials are obtained
- Or use only SabPaisa for now (which is working)


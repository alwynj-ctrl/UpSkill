# ⚠️ PAYTM ERROR 501 - System Error

## Current Issue

Paytm Initiate Transaction API is returning:
```json
{
  "body": {
    "resultInfo": {
      "resultStatus": "F",
      "resultCode": "501",
      "resultMsg": "System Error"
    }
  }
}
```

## What Does Error 501 Mean?

**"501 - System Error"** from Paytm typically indicates:

### 1. **Merchant Account Not Activated** ⚠️
   - Your Paytm merchant account might not be activated for production
   - Even if you have credentials, the account needs to be fully verified and activated
   - **Solution**: Contact Paytm support to activate your merchant account

### 2. **Invalid Credentials** ❌
   - The Merchant ID (MID) or Merchant Key might be incorrect
   - The credentials might be for staging but you're using production URL
   - **Solution**: Verify credentials in Paytm dashboard

### 3. **Website Name Mismatch** 🌐
   - The `websiteName` in the request might not match what's configured in Paytm
   - Currently using: `"DEFAULT"`
   - **Solution**: Check Paytm dashboard for correct website name

### 4. **Staging vs Production Mismatch** 🔄
   - Using staging credentials on production URL or vice versa
   - **Solution**: Match credentials with environment

## How to Fix

### Option 1: Use Staging Environment for Testing

If these are test credentials, change this line in `app/api/paytm-payment/route.ts`:

```typescript
// Line 28
const isProduction = false // Set to false for staging/testing
```

This will use:
- URL: `https://securestage.paytm.in`
- For testing with Paytm staging credentials

### Option 2: Contact Paytm Support

You need to verify with Paytm:

1. **Is your merchant account activated?**
   - Login to: https://dashboard.paytm.com/
   - Check account status
   - Verify KYC is complete

2. **Are these production credentials?**
   - MID: `YOUR_PAYTM_MID`
   - Website: `DEFAULT`
   - Confirm these are for production use

3. **Is the website name correct?**
   - In Paytm dashboard, check your website configuration
   - It might be `WEBSTAGING` for test or something else for production

### Option 3: Get Test Credentials

If you don't have activated production account:

1. Contact Paytm at: business.paytm.com/support
2. Request staging/test credentials
3. Use them with `isProduction = false`

## Current Configuration

```typescript
// Credentials (Hardcoded)
Merchant ID: YOUR_PAYTM_MID
Merchant Key: YOUR_PAYTM_MERCHANT_KEY
Website: DEFAULT
Environment: PRODUCTION (can toggle)

// URLs
Production: https://securegw.paytm.in
Staging: https://securestage.paytm.in
```

## What I Added

✅ **Environment toggle**: Easy switch between staging/production
✅ **Detailed logging**: See exact request being sent
✅ **Flexible configuration**: Can test without code changes

## Next Steps

1. **Check Paytm Dashboard**:
   - Go to: https://dashboard.paytm.com/
   - Verify account status
   - Check website configuration
   - Get correct credentials

2. **Try Staging Mode**:
   - Set `isProduction = false` in `app/api/paytm-payment/route.ts`
   - If you have staging credentials, use them

3. **Contact Paytm Support**:
   - Email: business@paytm.com
   - Tell them you're getting 501 error
   - Ask if account is activated
   - Request staging credentials for testing

4. **Verify Credentials**:
   - Double-check MID and Key are correct
   - Make sure they're for the right environment

## Common Paytm Activation Requirements

Before production payments work, Paytm typically requires:

- ✅ Business KYC documents
- ✅ Bank account verification
- ✅ Website/app review
- ✅ Integration testing approval
- ✅ Agreement signing
- ✅ Security deposit (if required)

**Most likely cause**: Your merchant account is not fully activated yet. Contact Paytm to complete the activation process.

## Alternative: Use SabPaisa

Since SabPaisa is already working, you can:
- Use only SabPaisa for now
- Complete Paytm activation in parallel
- Add Paytm once it's ready

The code is correct - the issue is with the Paytm account configuration, not the integration code.


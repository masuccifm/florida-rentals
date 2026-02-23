# Booking Notifications Setup Guide

Your booking system is now configured to send both email and SMS notifications to:
- **Email:** Leslie.Masucci@gmail.com
- **SMS:** +1 (704) 724-9478

## Step 1: Set Up Resend (Email Service)

### 1.1 Create a Resend Account
1. Go to [https://resend.com](https://resend.com)
2. Click "Sign Up" (it's FREE for up to 3,000 emails/month)
3. Sign up with your email (Leslie.Masucci@gmail.com recommended)
4. Verify your email address

### 1.2 Get Your API Key
1. After signing in, go to [https://resend.com/api-keys](https://resend.com/api-keys)
2. Click "Create API Key"
3. Give it a name like "Florida Rentals Production"
4. Select "Full Access" permissions
5. Click "Create"
6. **IMPORTANT:** Copy the API key (starts with `re_`) - you won't see it again!

### 1.3 Add to Your .env.local
Open `.env.local` and replace:
```
RESEND_API_KEY=re_your-api-key-here
```
with your actual key:
```
RESEND_API_KEY=re_abc123xyz...
```

### 1.4 Verify Domain (Optional but Recommended)
For production, verify your domain:
1. In Resend dashboard, go to "Domains"
2. Click "Add Domain"
3. Enter your domain (e.g., `floridarentals.com`)
4. Add the DNS records they provide to your domain registrar
5. Once verified, update the `from` address in `src/lib/email.ts` to use your domain

For now, Resend will send from their shared domain (emails may go to spam).

---

## Step 2: Set Up Twilio (SMS Service)

### 2.1 Create a Twilio Account
1. Go to [https://www.twilio.com/try-twilio](https://www.twilio.com/try-twilio)
2. Sign up for a FREE trial account
3. Verify your email and phone number

### 2.2 Get a Phone Number
1. After signing in, you'll be prompted to get a trial phone number
2. Click "Get a Trial Number"
3. Accept the number they assign (or choose a different one)
4. **Copy this number** - you'll need it for .env.local

### 2.3 Get Your Credentials
1. Go to your [Twilio Console Dashboard](https://console.twilio.com/)
2. You'll see:
   - **Account SID** (starts with `AC`)
   - **Auth Token** (click to reveal)
3. Copy both of these

### 2.4 Add to Your .env.local
Open `.env.local` and replace:
```
TWILIO_ACCOUNT_SID=your-account-sid-here
TWILIO_AUTH_TOKEN=your-auth-token-here
TWILIO_PHONE_NUMBER=your-twilio-phone-number
```
with your actual credentials:
```
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your-auth-token
TWILIO_PHONE_NUMBER=+1234567890
```

### 2.5 Verify Your Recipient Number (Trial Only)
**IMPORTANT:** Twilio trial accounts can only send SMS to verified numbers.

1. In Twilio Console, go to "Phone Numbers" → "Verified Caller IDs"
2. Click "Add a new Caller ID"
3. Enter: `+17047249478`
4. Choose "SMS"
5. Twilio will send a verification code to that number
6. Enter the code to verify

### 2.6 Upgrade for Production (When Ready)
Trial account limitations:
- Can only send to verified numbers
- Messages include "Sent from your Twilio trial account"
- Limited messages

To upgrade:
1. Go to "Billing" in Twilio Console
2. Add payment method
3. Upgrade to paid account (pay-as-you-go, ~$0.0075 per SMS)

---

## Step 3: Restart Your Development Server

After adding the API keys to `.env.local`:

1. Stop the current dev server (Ctrl+C or close terminal)
2. Restart it:
   ```bash
   npm run dev
   ```

---

## Step 4: Test the Booking System

1. Open [http://localhost:3000](http://localhost:3000)
2. Click on any property
3. Click "Request to Book"
4. Fill out the form with test data
5. Submit the request

You should receive:
- ✅ An email to Leslie.Masucci@gmail.com with full booking details
- ✅ An SMS to 704-724-9478 with a quick notification

---

## Troubleshooting

### Email not sending?
- Check that your Resend API key is correct in `.env.local`
- Check the terminal/console for error messages
- Verify Resend account is active at [https://resend.com](https://resend.com)

### SMS not sending?
- If using Twilio trial, make sure +17047249478 is verified
- Check that all 3 Twilio credentials are correct in `.env.local`
- Check Twilio Console for error logs
- Verify you have SMS credits (trial starts with credits)

### Both working but going to spam?
- For email: Verify your domain in Resend
- For SMS: Upgrade Twilio account to remove trial message

---

## Production Checklist

Before going live:
- [ ] Verify your domain in Resend
- [ ] Update email `from` address to use your domain
- [ ] Upgrade Twilio account (remove trial limitations)
- [ ] Test from different devices/browsers
- [ ] Set up email templates for guest confirmations (optional)
- [ ] Add booking management dashboard (optional)

---

## Cost Estimates

- **Resend:** FREE up to 3,000 emails/month, then $20/month for 50,000 emails
- **Twilio:** ~$0.0075 per SMS (about $7.50 for 1,000 SMS messages)

For a rental business with ~50 bookings/month:
- Email: FREE
- SMS: ~$0.38/month
- **Total: Less than $1/month** 🎉

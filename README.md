# AI Attachment Test

A mobile-first Next.js MVP for a TikTok traffic funnel:

1. Landing page
2. 5-question attachment style test
3. Free short result
4. Stripe Checkout unlock
5. AI-generated full report
6. TikTok marketing copy page

The first version uses `localStorage` for quiz answers and also stores compact answer codes in Stripe Checkout metadata. This makes the paid report more resilient after TikTok in-app browser and Stripe redirects. There is no database, user account system, email capture, or webhook flow yet.

## Tech Stack

- Next.js App Router
- Tailwind CSS
- Stripe Checkout
- OpenAI API
- TypeScript
- Localized UI shell with browser-language detection
- Generated hero image asset in `public/images/attachment-hero.png`

## Install

```bash
npm install
```

Or, if you prefer pnpm:

```bash
pnpm install
```

## Start Local Development

```bash
npm run dev
```

Or:

```bash
pnpm dev
```

Open `http://localhost:3000`.

If your local machine shows file watcher warnings, start dev mode with:

```bash
WATCHPACK_POLLING=true npm run dev
```

## Local Demo Checkout

In local development, if Stripe environment variables are not set, clicking `Unlock Full Report - CAD 9.99` returns a demo URL:

```text
/report?demo=1
```

This lets you test the full product flow without a real payment. In production, missing Stripe configuration returns an error instead.

## Configure Environment Variables

Copy the example file:

```bash
cp .env.example .env.local
```

Then fill in:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
OPENAI_API_KEY=sk-your_openai_api_key
OPENAI_MODEL=gpt-4o-mini
```

## Configure OpenAI

1. Create an API key in your OpenAI dashboard.
2. Add it to `.env.local` as `OPENAI_API_KEY`.
3. Optional: change `OPENAI_MODEL` if you want to use a different model.

If `OPENAI_API_KEY` is missing, the app returns a built-in fallback report so the MVP can still be tested locally.

## Configure Stripe

1. Create or log in to your Stripe account.
2. Copy your test publishable key and test secret key.
3. Add them to `.env.local` as `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` and `STRIPE_SECRET_KEY`.
4. Use Stripe test card `4242 4242 4242 4242` with any future expiry date and any CVC.

Checkout price is defined in `app/api/checkout/route.ts`:

- Currency: CAD
- Amount: `CAD 9.99`
- Success URL: `/success?session_id={CHECKOUT_SESSION_ID}`
- Cancel URL: `/cancel`

When `STRIPE_SECRET_KEY` is set, `/api/report` verifies that the Checkout Session is paid before generating the full report.

For TikTok traffic:

1. Put your site URL in the TikTok bio link.
2. Users complete the quiz inside TikTok's in-app browser.
3. Stripe Checkout opens securely.
4. Stripe redirects back to `/success?session_id=...`.
5. The success page links to `/report?session_id=...`.
6. The report API verifies payment and can rebuild quiz answers from Stripe metadata if browser storage is missing.

## Multilingual Behavior

The UI detects the browser language and supports:

- English
- Chinese
- Spanish
- Portuguese
- French
- German
- Japanese
- Korean

Users can also switch languages manually. The OpenAI report prompt includes the user's locale so the full report can be generated in the user's language when possible.

## Pages

- `/` - Landing page
- `/test` - 5-question test
- `/result` - Free result and unlock offer
- `/report` - Paid full report
- `/marketing` - TikTok hooks, script, cover text, and pinned comment

## Deploy to Vercel

1. Push this project to GitHub.
2. Import the repository into Vercel.
3. Add these environment variables in Vercel Project Settings:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_or_test_key
STRIPE_SECRET_KEY=sk_live_or_test_key
OPENAI_API_KEY=sk-your_openai_api_key
OPENAI_MODEL=gpt-4o-mini
```

4. Deploy.
5. In Stripe, make sure your account is ready for live payments before switching from test keys to live keys.

## Legal Disclaimer

The site includes this disclaimer in the footer:

> This test is for self-reflection and entertainment purposes only. It is not medical, psychological, or professional advice.

The report prompt also avoids medical diagnosis and professional advice claims.

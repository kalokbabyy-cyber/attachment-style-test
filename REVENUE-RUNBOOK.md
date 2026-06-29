# Revenue Runbook

This project can sell the full AI attachment report through Stripe Checkout.

## Current hard requirement

Create `.env.local` with real keys:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
STRIPE_SECRET_KEY=sk_test_...
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o-mini
```

Do not paste secret keys into chat. Add them directly on this machine.

## Verify checkout creation

```bash
npm run monetization:smoke
```

Passing revenue states:

- `ready_for_manual_test_payment`: Stripe Checkout URL was created and OpenAI is configured.
- `checkout_ready_openai_fallback`: Stripe Checkout URL was created, but reports use fallback content until OpenAI is configured.

The latest result is written to:

```text
.monetization-smoke-last.json
```

When Stripe is configured, that file includes `checkoutUrl`.

## Manual test payment

Use Stripe test mode first:

```text
4242 4242 4242 4242
```

Use any future expiry date and any CVC. A successful payment should redirect to:

```text
/report?session_id=...
```

The report API then verifies the Checkout Session is paid before generating the full report.

## Go live

1. Deploy to Vercel.
2. Set production environment variables in Vercel.
3. Use a real domain in `NEXT_PUBLIC_SITE_URL`.
4. Switch Stripe from test key to live key after the account is approved for live payments.
5. Put the deployed URL in the TikTok bio link.

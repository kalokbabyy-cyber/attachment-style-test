import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function GET() {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

    console.log("STRIPE_SECRET_KEY exists:", !!stripeSecretKey);

    if (!stripeSecretKey) {
      return NextResponse.json(
        { error: "STRIPE_SECRET_KEY is missing." },
        { status: 500 }
      );
    }

    const stripe = new Stripe(stripeSecretKey);
    const accounts = await stripe.accounts.list({ limit: 1 });
    const account = accounts.data[0];

    return NextResponse.json({
      ok: true,
      accountFound: Boolean(account),
      id: account?.id,
      country: account?.country,
      defaultCurrency: account?.default_currency,
      chargesEnabled: account?.charges_enabled,
      payoutsEnabled: account?.payouts_enabled
    });
  } catch (error) {
    console.error("Stripe debug error:", error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.stack : JSON.stringify(error)
      },
      { status: 500 }
    );
  }
}

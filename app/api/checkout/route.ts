import { NextResponse } from "next/server";
import Stripe from "stripe";
import { STYLE_LABELS, serializeAnswerCodes, type StoredQuizResult } from "@/lib/quiz";
import { getBaseUrl } from "@/lib/site";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<StoredQuizResult>;

    if (!body.style || !body.answers?.length) {
      return NextResponse.json({ error: "Quiz result is missing." }, { status: 400 });
    }

    const origin = request.headers.get("origin");
    const configuredBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_BASE_URL;
    const baseUrl = (configuredBaseUrl || getBaseUrl(origin)).replace(/\/$/, "");
    const answerCodes = serializeAnswerCodes(body.answers);
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

    console.log("STRIPE_SECRET_KEY exists:", !!process.env.STRIPE_SECRET_KEY);
    console.log("NEXT_PUBLIC_BASE_URL:", process.env.NEXT_PUBLIC_BASE_URL);
    console.log("NEXT_PUBLIC_SITE_URL:", process.env.NEXT_PUBLIC_SITE_URL);

    if (!stripeSecretKey) {
      if (process.env.NODE_ENV === "production") {
        return NextResponse.json(
          { error: "Stripe is not configured. Add STRIPE_SECRET_KEY to your environment." },
          { status: 500 }
        );
      }

      return NextResponse.json({
        url: `${baseUrl}/report?demo=1`,
        demo: true
      });
    }

    const stripe = new Stripe(stripeSecretKey);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "cad",
            unit_amount: 999,
            product_data: {
              name: "AI Attachment Test - Full Report",
              description: "Personalized AI attachment style report"
            }
          }
        }
      ],
      metadata: {
        attachmentStyle: STYLE_LABELS[body.style],
        attachmentStyleKey: body.style,
        answerCount: String(body.answers.length),
        answerCodes,
        locale: body.locale || "en"
      },
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cancel`
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.stack : JSON.stringify(error)
      },
      { status: 500 }
    );
  }
}

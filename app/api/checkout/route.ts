import { NextResponse } from "next/server";
import Stripe from "stripe";
import { STYLE_LABELS, serializeAnswerCodes, type StoredQuizResult } from "@/lib/quiz";
import { getBaseUrl } from "@/lib/site";

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<StoredQuizResult>;

  if (!body.style || !body.answers?.length) {
    return NextResponse.json({ error: "Quiz result is missing." }, { status: 400 });
  }

  const origin = request.headers.get("origin");
  const baseUrl = getBaseUrl(origin);
  const answerCodes = serializeAnswerCodes(body.answers);

  if (!process.env.STRIPE_SECRET_KEY) {
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

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: 499,
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
    success_url: `${baseUrl}/report?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/result`
  });

  return NextResponse.json({ url: session.url });
}

import { NextResponse } from "next/server";
import OpenAI from "openai";
import Stripe from "stripe";
import { createFallbackReport } from "@/lib/reportFallback";
import {
  answersFromCodes,
  STYLE_LABELS,
  formatAnswersForPrompt,
  type AttachmentStyle,
  type QuizAnswer
} from "@/lib/quiz";

type ReportRequest = {
  style?: AttachmentStyle;
  answers?: QuizAnswer[];
  sessionId?: string | null;
  locale?: string | null;
};

const sectionTitles = [
  "Your Attachment Style",
  "Why You Love This Way",
  "Your Emotional Triggers",
  "Your Dating Blind Spots",
  "How Others Experience You",
  "What You Need in Love",
  "Personalized Healing Plan",
  "Communication Advice",
  "Compatibility Insights",
  "Daily Affirmation"
];

export async function POST(request: Request) {
  const body = (await request.json()) as ReportRequest;

  const resolved = await resolvePaidReportInput(body);
  if (resolved.error) {
    return resolved.error;
  }

  const { style, answers, locale } = resolved;

  if (!style || !answers.length) {
    return NextResponse.json({ error: "Quiz result is missing." }, { status: 400 });
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ ...createFallbackReport(style, locale), generatedBy: "fallback" });
  }

  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      temperature: 0.8,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You write premium, emotionally intelligent relationship reports. Avoid medical diagnosis. Use simple language. Be warm, specific, supportive, and TikTok-friendly."
        },
        {
          role: "user",
          content: buildPrompt(style, answers, locale)
        }
      ]
    });

    const raw = completion.choices[0]?.message.content;
    if (!raw) {
      throw new Error("OpenAI returned an empty response.");
    }

    const parsed = JSON.parse(raw);
    return NextResponse.json(normalizeReport(parsed, style));
  } catch (error) {
    console.error("Report generation failed", error);
    return NextResponse.json({ ...createFallbackReport(style, locale), generatedBy: "fallback" });
  }
}

async function resolvePaidReportInput(body: ReportRequest): Promise<{
  style?: AttachmentStyle;
  answers: QuizAnswer[];
  locale?: string | null;
  error?: NextResponse;
}> {
  if (!process.env.STRIPE_SECRET_KEY) {
    return {
      style: body.style,
      answers: body.answers || [],
      locale: body.locale
    };
  }

  if (!body.sessionId) {
    return { answers: [], error: NextResponse.json({ error: "Payment confirmation is missing." }, { status: 402 }) };
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const session = await stripe.checkout.sessions.retrieve(body.sessionId);

  if (session.payment_status !== "paid") {
    return { answers: [], error: NextResponse.json({ error: "Payment has not been completed." }, { status: 402 }) };
  }

  return {
    style: (body.style || session.metadata?.attachmentStyleKey) as AttachmentStyle | undefined,
    answers: body.answers?.length ? body.answers : answersFromCodes(session.metadata?.answerCodes),
    locale: body.locale || session.metadata?.locale || "en"
  };
}

function buildPrompt(style: AttachmentStyle, answers: QuizAnswer[], locale?: string | null) {
  return `
Generate a warm, emotionally intelligent, personalized relationship report based on the user's attachment style and quiz answers.

Attachment style: ${STYLE_LABELS[style]}
User language / locale: ${locale || "en"}

Quiz answers:
${formatAnswersForPrompt(answers)}

Tone:
- Insightful, supportive, premium, and TikTok-friendly
- Avoid medical diagnosis
- Simple language
- Make it feel accurate and valuable
- Do not claim certainty about childhood trauma or mental illness
- Write the report in the user's language/locale when possible
- Include concrete correction strategies for their attachment style
- Add light TikTok-friendly humor without being cruel

Return valid JSON only with this shape:
{
  "title": "Your AI Attachment Report",
  "styleLabel": "${STYLE_LABELS[style]}",
  "sections": [
    { "title": "Your Attachment Style", "body": "..." },
    { "title": "Why You Love This Way", "body": "..." },
    { "title": "Your Emotional Triggers", "body": "..." },
    { "title": "Your Dating Blind Spots", "body": "..." },
    { "title": "How Others Experience You", "body": "..." },
    { "title": "What You Need in Love", "body": "..." },
    { "title": "Personalized Healing Plan", "body": "..." },
    { "title": "Communication Advice", "body": "..." },
    { "title": "Compatibility Insights", "body": "..." },
    { "title": "Daily Affirmation", "body": "..." }
  ]
}
`;
}

function normalizeReport(report: unknown, style: AttachmentStyle) {
  const fallback = createFallbackReport(style);

  if (!report || typeof report !== "object") {
    return { ...fallback, generatedBy: "fallback" as const };
  }

  const candidate = report as {
    title?: string;
    styleLabel?: string;
    sections?: Array<{ title?: string; body?: string }>;
  };

  const sections = sectionTitles.map((title, index) => {
    const match = candidate.sections?.find((section) => section.title === title) || candidate.sections?.[index];
    return {
      title,
      body: match?.body || fallback.sections[index].body
    };
  });

  return {
    title: candidate.title || fallback.title,
    styleLabel: candidate.styleLabel || STYLE_LABELS[style],
    sections,
    generatedBy: "openai" as const
  };
}

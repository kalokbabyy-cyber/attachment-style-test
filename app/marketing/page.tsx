import { BadgeDollarSign, Copy, MessageCircle, PlaySquare, Sparkles } from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { SiteFooter } from "@/components/SiteFooter";

const hooks = [
  "Why do you always fall for emotionally unavailable people?",
  "Your attachment style explains everything.",
  "This 2-minute test reveals how you love.",
  "Stop guessing why dating feels so hard.",
  "Your childhood may still be controlling your relationships.",
  "Only a few people are truly secure in love.",
  "This AI test told me exactly why I overthink.",
  "If their text ruined your whole day, run this test.",
  "POV: your situationship was not chemistry, it was your attachment style.",
  "Are you in love, or just activated?"
];

const trendHooks = [
  "Delulu or attachment issue? Let's investigate.",
  "Your dating pattern is not random. The receipts are loud.",
  "If you call it 'just vibing' but check their active status, this is for you.",
  "Canon event: realizing your type is emotionally unavailable.",
  "Soft launch your healing era with a 2-minute test.",
  "That 'spark' might be your nervous system doing parkour.",
  "You are not crazy. You may just be anxiously attached."
];

const coverTexts = [
  "Why do people leave you?",
  "Discover your attachment style",
  "This explains your dating pattern",
  "Are you anxious or avoidant?",
  "Take the free test",
  "Your texting anxiety has a name",
  "Emotionally unavailable again?",
  "Stop dating your trigger"
];

const styleScripts = [
  {
    title: "Anxious Attachment Angle",
    script:
      "If one unanswered text can ruin your mood, you may not be dramatic. Your attachment system may be activated. Take the AI Attachment Test and find out what you need before your brain starts writing season two of a story that has not happened."
  },
  {
    title: "Avoidant Attachment Angle",
    script:
      "If you like someone until they like you back, this might be your sign. Avoidant attachment can make closeness feel like pressure. This test shows your pattern and gives you a plan that does not involve disappearing."
  },
  {
    title: "Fearful Avoidant Angle",
    script:
      "Do you crave love and then panic when it gets real? That push-pull pattern is exhausting, but it is not random. This 2-minute AI test explains what is happening and what to do next."
  },
  {
    title: "Secure Attachment Angle",
    script:
      "Secure attachment is not boring. It is peace without the plot twists. Take the test to see whether you are secure, anxious, avoidant, or somewhere in between."
  }
];

const funnelChecklist = [
  "TikTok bio link goes straight to /",
  "User taps Start Free Test inside TikTok browser",
  "Answers are saved locally and also attached to Stripe Checkout metadata",
  "Stripe success returns to /report?session_id=...",
  "Report can be generated even if localStorage is lost after payment",
  "OpenAI report uses the user's browser language when possible"
];

export default function MarketingPage() {
  return (
    <main className="min-h-screen bg-[#f7f7f5]">
      <section className="mx-auto w-full max-w-5xl px-5 py-8 sm:py-12">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-neutral-500">TikTok Content</p>
          <LanguageSwitcher compact />
        </div>

        <div className="mt-5 grid gap-7 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <h1 className="text-4xl font-semibold leading-tight tracking-normal text-neutral-950 sm:text-6xl">
              Viral Copy Library
            </h1>
            <p className="mt-5 text-lg leading-8 text-neutral-700">
              Hooks, scripts, cover text, comment bait, and conversion notes for launching the AI Attachment Test directly from TikTok.
            </p>
          </div>
          <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-soft">
            <img
              alt="AI attachment test marketing visual"
              className="aspect-[16/10] w-full object-cover"
              src="/images/attachment-hero.png"
            />
          </div>
        </div>

        <div className="mt-9 grid gap-5">
          <CopyBlock title="TikTok Hook Ideas" items={hooks} />
          <CopyBlock title="Hot Creator Slang Hooks" items={trendHooks} />

          <section className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm sm:p-6">
            <SectionTitle icon={PlaySquare} title="Video Script Example" />
            <p className="mt-4 whitespace-pre-line text-base leading-8 text-neutral-700">
              Stop scrolling.{"\n"}
              If you always overthink texts, fear people leaving, or fall for emotionally unavailable people, your attachment style may explain everything.{"\n"}
              Take this 2-minute AI test and discover how you love, why you love this way, and what you actually need in a relationship.{"\n"}
              Link in bio.
            </p>
          </section>

          <section className="grid gap-4 md:grid-cols-2">
            {styleScripts.map((item) => (
              <article className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm" key={item.title}>
                <SectionTitle icon={Sparkles} title={item.title} />
                <p className="mt-4 text-sm font-medium leading-7 text-neutral-700">{item.script}</p>
              </article>
            ))}
          </section>

          <CopyBlock title="Cover Text Ideas" items={coverTexts} />

          <section className="grid gap-4 md:grid-cols-2">
            <article className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm sm:p-6">
              <SectionTitle icon={MessageCircle} title="Pinned Comment" />
              <p className="mt-4 text-base leading-8 text-neutral-700">Mine was painfully accurate. Take yours here 👇</p>
            </article>

            <article className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm sm:p-6">
              <SectionTitle icon={BadgeDollarSign} title="Payment Funnel Notes" />
              <ul className="mt-4 grid gap-3">
                {funnelChecklist.map((item) => (
                  <li className="rounded-lg bg-neutral-100 px-4 py-3 text-sm font-medium leading-6 text-neutral-800" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </section>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

function CopyBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm sm:p-6">
      <SectionTitle icon={Copy} title={title} />
      <ul className="mt-4 grid gap-3 md:grid-cols-2">
        {items.map((item) => (
          <li className="rounded-lg border border-neutral-200 px-4 py-3 text-sm font-medium leading-6 text-neutral-800" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

function SectionTitle({ icon: Icon, title }: { icon: typeof Copy; title: string }) {
  return (
    <div className="flex items-center gap-2">
      <Icon aria-hidden="true" className="h-4 w-4 text-neutral-500" />
      <h2 className="text-xl font-semibold tracking-normal text-neutral-950">{title}</h2>
    </div>
  );
}

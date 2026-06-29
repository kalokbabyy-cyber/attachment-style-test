import { CheckCircle2, FileText } from "lucide-react";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";

type SuccessPageProps = {
  searchParams: Promise<{
    session_id?: string;
  }>;
};

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const { session_id: sessionId } = await searchParams;
  const reportHref = sessionId ? `/report?session_id=${encodeURIComponent(sessionId)}` : "/report";

  return (
    <main className="flex min-h-screen flex-col bg-[#f7f7f5]">
      <section className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center px-5 py-10 text-center">
        <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-soft sm:p-8">
          <CheckCircle2 aria-hidden="true" className="mx-auto h-12 w-12 text-neutral-950" />
          <h1 className="mt-7 text-3xl font-semibold tracking-normal text-neutral-950">Payment successful</h1>
          <p className="mt-4 leading-7 text-neutral-600">
            Your full AI attachment report is unlocked. Continue to generate and view the premium report.
          </p>
          <Link
            className="mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
            href={reportHref}
          >
            <span>View Full Report</span>
            <FileText aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

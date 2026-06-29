import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  href?: string;
  icon?: ReactNode;
};

export function PrimaryButton({ children, href, icon, className = "", ...props }: PrimaryButtonProps) {
  const classes = `inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 active:scale-[0.99] sm:w-auto ${className}`;
  const content = (
    <>
      <span>{children}</span>
      {icon ?? <ArrowRight aria-hidden="true" className="h-4 w-4" />}
    </>
  );

  if (href) {
    return (
      <Link className={classes} href={href}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
}

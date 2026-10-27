import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This address is not a public Two5 page.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-black px-6 text-center text-[#F4F1E8]">
      <div>
        <p className="font-mono text-[11px] tracking-[0.16em] text-white/40 uppercase">404</p>
        <h1 className="section-heading mt-4">This page is not on Two5.</h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-white/55">
          The address does not match a public page. Head home, or join the waitlist from there.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex h-11 items-center rounded-[4px] bg-[#f0c020] px-5 text-sm font-semibold text-[#050505]"
        >
          Back to Two5
        </Link>
      </div>
    </main>
  );
}

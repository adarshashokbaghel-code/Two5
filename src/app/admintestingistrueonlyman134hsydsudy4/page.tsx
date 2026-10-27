import type { Metadata } from "next";
import { Suspense } from "react";

import { WaitlistBoard } from "@/components/admin/waitlist-board";
import { loadWaitlistBoard, type WaitlistRecord } from "@/lib/waitlist-admin";

export const metadata: Metadata = {
  title: { absolute: "Waitlist" },
  robots: { index: false, follow: false, nocache: true },
};

export default function WaitlistAdminPage() {
  return (
    <Suspense fallback={<p className="min-h-screen bg-ink px-6 py-10 text-sm text-paper/50">Loading waitlist…</p>}>
      <WaitlistAdmin />
    </Suspense>
  );
}

async function WaitlistAdmin() {
  let records: WaitlistRecord[] = [];
  let error: string | null = null;

  try {
    records = await loadWaitlistBoard();
  } catch (caught) {
    console.error(caught);
    error =
      caught instanceof Error && caught.message === "MongoDB is not configured."
        ? "The database is not configured."
        : "Could not read the waitlist.";
  }

  return <WaitlistBoard records={records} error={error} />;
}

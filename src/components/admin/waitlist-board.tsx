"use client";

import { useMemo, useState } from "react";

import { BrandLogo } from "@/components/brand/logo";
import type { WaitlistRecord } from "@/lib/waitlist-admin";
import { cn } from "@/lib/utils";

const DAY_FORMAT = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  day: "numeric",
  month: "short",
});

const DAY_KEY = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Kolkata",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

type Filter = "all" | "verified" | "pending";

function dayKey(iso: string) {
  return DAY_KEY.format(new Date(iso));
}

function buildTrend(records: WaitlistRecord[]) {
  const dated = records.filter((record) => record.createdAt);
  if (dated.length === 0) return [];

  const counts = new Map<string, { total: number; verified: number }>();
  for (const record of dated) {
    const key = dayKey(record.createdAt!);
    const current = counts.get(key) ?? { total: 0, verified: 0 };
    current.total += 1;
    if (record.verified) current.verified += 1;
    counts.set(key, current);
  }

  const today = new Date(`${dayKey(new Date().toISOString())}T00:00:00+05:30`);
  const earliest = new Date(`${[...counts.keys()].sort()[0]}T00:00:00+05:30`);
  const windowStart = new Date(today.getTime() - 59 * 86_400_000);
  const start = earliest > windowStart ? earliest : windowStart;
  const days: { key: string; label: string; total: number; verified: number }[] = [];

  for (let cursor = start; cursor <= today; cursor = new Date(cursor.getTime() + 86_400_000)) {
    const key = dayKey(cursor.toISOString());
    const count = counts.get(key) ?? { total: 0, verified: 0 };
    days.push({
      key,
      label: DAY_FORMAT.format(cursor),
      total: count.total,
      verified: count.verified,
    });
  }

  return days;
}

export function WaitlistBoard({
  records,
  error,
}: {
  records: WaitlistRecord[];
  error: string | null;
}) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedId, setSelectedId] = useState<string | null>(records[0]?.id ?? null);
  const [copied, setCopied] = useState(false);

  const trend = useMemo(() => buildTrend(records), [records]);
  const peak = Math.max(1, ...trend.map((day) => day.total));
  const last7 = trend.slice(-7).reduce((sum, day) => sum + day.total, 0);
  const prev7 = trend.slice(-14, -7).reduce((sum, day) => sum + day.total, 0);
  const verifiedCount = records.filter((record) => record.verified).length;

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return records.filter((record) => {
      if (filter === "verified" && !record.verified) return false;
      if (filter === "pending" && record.verified) return false;
      if (!needle) return true;
      return [record.name, record.email, record.accountId, record.age?.toString() ?? ""]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [filter, query, records]);

  const selected = records.find((record) => record.id === selectedId) ?? visible[0] ?? null;

  async function copyEmail(email: string) {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  }

  return (
    <main className="min-h-screen bg-ink text-paper">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <BrandLogo priority className="h-7" />
            <h1 className="mt-4 font-display text-3xl tracking-tight sm:text-4xl">Waitlist</h1>
            <p className="mt-1 text-sm text-paper/55">People who started or finished signup. Times are IST.</p>
          </div>
          <p className="text-sm text-paper/45">{records.length} records</p>
        </header>

        {error ? (
          <p className="rounded-[4px] border border-ember/40 bg-ember/10 px-4 py-3 text-sm text-paper">{error}</p>
        ) : null}

        <section className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Stat label="Signed up" value={records.length} />
          <Stat label="Verified" value={verifiedCount} tone="green" />
          <Stat label="Still verifying" value={records.length - verifiedCount} tone="signal" />
          <Stat label="Last 7 days" value={last7} hint={prev7 ? `Previous 7 days: ${prev7}` : undefined} />
        </section>

        <section className="rounded-[4px] border border-white/10 bg-white/[0.03] p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 className="text-sm font-medium">Signups by day</h2>
            <p className="flex items-center gap-3 text-[11px] text-paper/50">
              <span className="inline-flex items-center gap-1.5">
                <span className="size-2 rounded-[2px] bg-signal" /> Joined
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="size-2 rounded-[2px] bg-[#22C55E]" /> Verified
              </span>
            </p>
          </div>
          {trend.length === 0 ? (
            <p className="py-10 text-center text-sm text-paper/45">No signups yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <svg
                role="img"
                aria-label="Daily waitlist signups"
                viewBox={`0 0 ${Math.max(trend.length * 18, 320)} 140`}
                className="h-36 min-w-full"
              >
                {trend.map((day, index) => {
                  const x = index * 18 + 4;
                  const totalH = (day.total / peak) * 100;
                  const verifiedH = (day.verified / peak) * 100;
                  return (
                    <g key={day.key}>
                      <title>
                        {day.label}: {day.total} joined, {day.verified} verified
                      </title>
                      <rect x={x} y={112 - totalH} width={8} height={totalH} fill="#f0c020" rx="1" />
                      <rect x={x + 8} y={112 - verifiedH} width={5} height={verifiedH} fill="#22C55E" rx="1" />
                    </g>
                  );
                })}
              </svg>
              <div className="mt-1 flex justify-between text-[11px] text-paper/40">
                <span>{trend[0]?.label}</span>
                <span>{trend[trend.length - 1]?.label}</span>
              </div>
            </div>
          )}
        </section>

        <section className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(16rem,0.8fr)]">
          <div className="min-w-0">
            <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center">
              <label className="sr-only" htmlFor="waitlist-search">
                Search waitlist
              </label>
              <input
                id="waitlist-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search name, email, or account ID"
                className="h-10 w-full rounded-[4px] border border-white/15 bg-transparent px-3 text-sm outline-none placeholder:text-paper/35 focus:border-signal"
              />
              <div className="flex shrink-0 gap-1">
                {(
                  [
                    ["all", "All"],
                    ["verified", "Verified"],
                    ["pending", "Pending"],
                  ] as const
                ).map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setFilter(id)}
                    className={cn(
                      "h-10 rounded-[4px] px-3 text-xs font-medium",
                      filter === id ? "bg-signal text-ink" : "border border-white/15 text-paper/70",
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto rounded-[4px] border border-white/10">
              <table className="w-full min-w-[36rem] text-left text-sm">
                <thead className="text-[11px] tracking-wide text-paper/45 uppercase">
                  <tr className="border-b border-white/10">
                    <th className="px-3 py-2 font-medium">Name</th>
                    <th className="px-3 py-2 font-medium">Email</th>
                    <th className="px-3 py-2 font-medium">Age</th>
                    <th className="px-3 py-2 font-medium">Status</th>
                    <th className="px-3 py-2 font-medium">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {visible.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-3 py-8 text-center text-paper/45">
                        No matching people.
                      </td>
                    </tr>
                  ) : (
                    visible.map((record) => {
                      const active = selected?.id === record.id;
                      return (
                        <tr
                          key={record.id}
                          className={cn("border-b border-white/8 last:border-0", active && "bg-white/[0.05]")}
                        >
                          <td className="px-3 py-2">
                            <button
                              type="button"
                              onClick={() => setSelectedId(record.id)}
                              className="text-left font-medium hover:text-signal"
                            >
                              {record.name}
                            </button>
                          </td>
                          <td className="px-3 py-2 text-paper/75">{record.email || "—"}</td>
                          <td className="px-3 py-2 text-paper/75">{record.age ?? "—"}</td>
                          <td className="px-3 py-2">
                            <span className={record.verified ? "text-[#22C55E]" : "text-signal"}>
                              {record.verified ? "Verified" : "Pending"}
                            </span>
                          </td>
                          <td className="px-3 py-2 text-paper/55">
                            {record.createdAt ? DAY_FORMAT.format(new Date(record.createdAt)) : "—"}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <aside className="h-fit rounded-[4px] border border-white/10 bg-white/[0.03] p-4 lg:sticky lg:top-4">
            {selected ? (
              <>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] tracking-wide text-paper/45 uppercase">Account</p>
                    <h2 className="mt-1 text-xl font-medium">{selected.name}</h2>
                    <p className={cn("mt-1 text-sm", selected.verified ? "text-[#22C55E]" : "text-signal")}>
                      {selected.verified ? "Verified" : "Pending verification"}
                    </p>
                  </div>
                  {selected.email ? (
                    <button
                      type="button"
                      onClick={() => copyEmail(selected.email)}
                      className="h-8 shrink-0 rounded-[4px] border border-white/15 px-2.5 text-xs text-paper/75"
                    >
                      {copied ? "Copied" : "Copy email"}
                    </button>
                  ) : null}
                </div>
                <dl className="mt-4 divide-y divide-white/10">
                  {selected.fields.map((field) => (
                    <div key={field.label} className="grid grid-cols-[7.5rem_minmax(0,1fr)] gap-3 py-2 text-sm">
                      <dt className="text-paper/45">{field.label}</dt>
                      <dd className="break-all text-paper">{field.value}</dd>
                    </div>
                  ))}
                </dl>
              </>
            ) : (
              <p className="text-sm text-paper/45">Select a person to see their details.</p>
            )}
          </aside>
        </section>
      </div>
    </main>
  );
}

function Stat({
  label,
  value,
  hint,
  tone = "paper",
}: {
  label: string;
  value: number;
  hint?: string;
  tone?: "paper" | "green" | "signal";
}) {
  return (
    <div className="rounded-[4px] border border-white/10 px-3 py-3">
      <p className="text-[11px] tracking-wide text-paper/45 uppercase">{label}</p>
      <p
        className={cn(
          "mt-1 font-display text-2xl",
          tone === "green" && "text-[#22C55E]",
          tone === "signal" && "text-signal",
        )}
      >
        {value}
      </p>
      {hint ? <p className="mt-1 text-[11px] text-paper/40">{hint}</p> : null}
    </div>
  );
}

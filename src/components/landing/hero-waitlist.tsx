"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type KeyboardEvent } from "react";

import { track } from "@/lib/analytics";
import { validateWaitlist } from "@/lib/waitlist";

const CODE_LENGTH = 6;
const STEPS = ["Details", "Code", "Account"] as const;

type Step = "details" | "code" | "verified";

const STEP_INDEX: Record<Step, number> = {
  details: 0,
  code: 1,
  verified: 2,
};

function AdmitPass({ name, accountId }: { name: string; accountId: string }) {
  const bars = Array.from(accountId || "TW", (char, index) => (char.charCodeAt(0) + index) % 3);

  return (
    <div className="relative mt-6 overflow-hidden rounded-xl border border-ink/10 bg-paper text-ink">
      <div className="flex items-center justify-between bg-signal px-4 py-2.5 font-mono text-[11px] tracking-[0.08em] uppercase">
        <span>Two5</span>
        <span>You&apos;re in</span>
      </div>
      <div className="flex items-start gap-3 px-4 pt-4">
        <span
          className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-[#1fa85a]"
          aria-hidden="true"
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <path
              d="M3.2 7.6 6.1 10.5 11.8 4.4"
              stroke="#f5f2ea"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <div className="min-w-0">
          <h2 className="font-display text-2xl leading-none font-normal tracking-[0.02em]">
            Account created successfully.
          </h2>
          <p className="mt-3 text-sm leading-6 text-ink/70">
            {name}, you&apos;re on the list. We&apos;ll keep you posted on early access, the
            first round, and what opens next.
          </p>
          <p className="mt-3 text-xl leading-snug font-medium">
            The website is grayscale. Your experience isn&apos;t.
          </p>
        </div>
      </div>
      <div className="relative mt-4">
        <span className="absolute top-0 -left-2 size-4 -translate-y-1/2 rounded-full bg-white" aria-hidden="true" />
        <span className="absolute top-0 -right-2 size-4 -translate-y-1/2 rounded-full bg-white" aria-hidden="true" />
        <div className="mx-4 border-t border-dashed border-ink/30" />
        <div className="flex items-end justify-between gap-4 px-4 py-4">
          <div className="min-w-0">
            <p className="font-mono text-[10px] tracking-[0.16em] text-ink/50 uppercase">Account ID</p>
            <p className="mt-1 font-mono text-2xl tracking-[0.08em]">{accountId}</p>
          </div>
          <span className="flex h-8 shrink-0 items-end gap-0.5" aria-hidden="true">
            {bars.map((weight, index) => (
              <span
                key={index}
                className="w-1 rounded-full bg-ink"
                style={{ height: weight === 2 ? "100%" : weight === 1 ? "72%" : "48%" }}
              />
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}

function Stepper({ step }: { step: Step }) {
  const current = STEP_INDEX[step];

  return (
    <ol className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-semibold">
      {STEPS.map((label, index) => {
        const on = index === current;
        const done = index < current;
        return (
          <li key={label} className="flex items-center gap-3">
            <span className={on ? "text-ink" : done ? "text-ink/70" : "text-ink/35"}>
              {index + 1}. {label}
            </span>
            {index < STEPS.length - 1 ? <span className="h-px w-5 bg-ink/15" aria-hidden="true" /> : null}
          </li>
        );
      })}
    </ol>
  );
}

export function HeroWaitlist() {
  const nameId = useId();
  const emailId = useId();
  const ageId = useId();
  const errorId = useId();
  const codeRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [step, setStep] = useState<Step>("details");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [code, setCode] = useState<string[]>(() => Array(CODE_LENGTH).fill(""));
  const [accountId, setAccountId] = useState("");
  const [message, setMessage] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState<"send" | "verify" | "resend" | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/auth/session")
      .then((response) => (response.ok ? response.json() : null))
      .then((payload: { user?: { accountId: string; email: string; name: string } | null }) => {
        if (cancelled || !payload?.user) return;
        setAccountId(payload.user.accountId);
        setEmail(payload.user.email);
        setName(payload.user.name);
        setStep("verified");
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, []);

  const postAuth = async (url: string, body: unknown) => {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const payload = (await response.json().catch(() => ({}))) as { error?: string };
    if (!response.ok) throw new Error(payload.error || "Something went wrong.");
    return payload as { accountId?: string; name?: string; email?: string; created?: boolean };
  };

  const continueToCode = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = validateWaitlist({ name, email, age });

    if (!parsed.ok) {
      setMessage(parsed.error);
      track("waitlist_signup_error", { reason: "invalid" });
      return;
    }

    setBusy("send");
    setMessage("");
    setNotice("");
    try {
      await postAuth("/api/auth/otp", parsed.data);
      setName(parsed.data.name);
      setEmail(parsed.data.email);
      setAge(String(parsed.data.age));
      setCode(Array(CODE_LENGTH).fill(""));
      setStep("code");
      track("waitlist_signup_started");
      window.setTimeout(() => codeRefs.current[0]?.focus(), 0);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not send the code.");
      track("waitlist_signup_error", { reason: "server" });
    } finally {
      setBusy(null);
    }
  };

  const writeCode = (index: number, raw: string) => {
    const digits = raw.replace(/\D/g, "");
    if (!digits) {
      setCode((current) => {
        const next = [...current];
        next[index] = "";
        return next;
      });
      return;
    }

    setMessage("");
    setCode((current) => {
      const next = [...current];
      digits.split("").forEach((digit, offset) => {
        if (index + offset < CODE_LENGTH) next[index + offset] = digit;
      });
      return next;
    });
    const focusAt = Math.min(index + digits.length, CODE_LENGTH - 1);
    codeRefs.current[focusAt]?.focus();
  };

  const onCodeKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !code[index] && index > 0) {
      codeRefs.current[index - 1]?.focus();
    }
  };

  const verify = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const joined = code.join("");
    if (joined.length < CODE_LENGTH) {
      setMessage("Enter the 6-digit code.");
      return;
    }

    setBusy("verify");
    setMessage("");
    try {
      const payload = await postAuth("/api/auth/verify", { email, code: joined });
      setAccountId(payload.accountId ?? "");
      if (payload.name) setName(payload.name);
      setStep("verified");
      track("waitlist_signup_success");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not verify the code.");
      track("waitlist_signup_error", { reason: "server" });
    } finally {
      setBusy(null);
    }
  };

  const resend = async () => {
    setBusy("resend");
    setMessage("");
    setNotice("");
    try {
      await postAuth("/api/auth/otp/resend", { email });
      setCode(Array(CODE_LENGTH).fill(""));
      setNotice("A new code is on its way.");
      codeRefs.current[0]?.focus();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not resend the code.");
    } finally {
      setBusy(null);
    }
  };

  return (
    <aside id="waitlist" aria-label="Join the Two5 waitlist">
      <Stepper step={step} />

      {step === "details" ? (
        <form onSubmit={continueToCode} noValidate className="mt-6">
          <h2 className="font-sans text-[1.65rem] leading-tight font-bold tracking-tight text-ink">
            Leave the grind. <span className="underline decoration-signal decoration-[3px] underline-offset-[5px]">Play a round.</span>
          </h2>
          <p className="mt-2 text-sm leading-6 text-ink/65">
            Numbers and logic, scored like a match. No forty-minute bullet for
            three points. We&apos;ll write when your seat is open.
          </p>

          <label htmlFor={nameId} className="mt-5 block text-sm font-medium text-ink/80">
            Name
          </label>
          <input
            id={nameId}
            type="text"
            name="name"
            autoComplete="name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            aria-invalid={Boolean(message)}
            aria-describedby={message ? errorId : undefined}
            placeholder="Your name"
            className="mt-1.5 h-11 w-full rounded-lg border border-ink/15 bg-paper px-3 text-base text-ink outline-none placeholder:text-ink/35 focus-visible:border-ink"
          />

          <label htmlFor={emailId} className="mt-4 block text-sm font-medium text-ink/80">
            Email address
          </label>
          <input
            id={emailId}
            type="email"
            name="email"
            autoComplete="email"
            inputMode="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            aria-invalid={Boolean(message)}
            aria-describedby={message ? errorId : undefined}
            placeholder="you@email.com"
            className="mt-1.5 h-11 w-full rounded-lg border border-ink/15 bg-paper px-3 text-base text-ink outline-none placeholder:text-ink/35 focus-visible:border-ink"
          />

          <label htmlFor={ageId} className="mt-4 block text-sm font-medium text-ink/80">
            Age
          </label>
          <input
            id={ageId}
            type="text"
            name="age"
            inputMode="numeric"
            required
            value={age}
            onChange={(event) => setAge(event.target.value.replace(/[^\d]/g, "").slice(0, 3))}
            aria-invalid={Boolean(message)}
            aria-describedby={message ? errorId : undefined}
            placeholder="18"
            className="mt-1.5 h-11 w-full rounded-lg border border-ink/15 bg-paper px-3 text-base text-ink outline-none placeholder:text-ink/35 focus-visible:border-ink"
          />

          <button
            type="submit"
            onClick={() => track("waitlist_cta_click", { source: "hero-form" })}
            disabled={busy === "send"}
            className="mt-5 flex h-11 w-full items-center justify-center rounded-lg bg-ink text-[15px] font-semibold text-paper disabled:opacity-60"
          >
            {busy === "send" ? "Sending…" : "Continue"}
          </button>

          {message ? (
            <p id={errorId} role="alert" className="mt-3 text-sm text-ember">
              {message}
            </p>
          ) : null}
        </form>
      ) : null}

      {step === "code" ? (
        <form onSubmit={verify} className="mt-6 min-w-0">
          <h2 className="font-sans text-[1.65rem] leading-tight font-bold tracking-tight text-ink">
            Enter the code.
          </h2>
          <p className="mt-2 text-sm leading-6 text-ink/65">
            We sent a 6-digit code to {email}. It expires in 10 minutes.
          </p>

          <fieldset className="mt-5 w-full min-w-0">
            <legend className="text-sm font-medium text-ink/80">
              One-time code
            </legend>
            <div className="mt-2 grid w-full grid-cols-6 gap-1.5 sm:gap-2">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(node) => {
                    codeRefs.current[index] = node;
                  }}
                  inputMode="numeric"
                  autoComplete={index === 0 ? "one-time-code" : "off"}
                  aria-label={`Digit ${index + 1}`}
                  maxLength={index === 0 ? CODE_LENGTH : 1}
                  value={digit}
                  onChange={(event) => writeCode(index, event.target.value)}
                  onKeyDown={(event) => onCodeKeyDown(index, event)}
                  className="h-11 w-full min-w-0 rounded-lg border border-ink/15 bg-paper px-0 text-center font-mono text-base text-ink outline-none focus-visible:border-ink"
                />
              ))}
            </div>
          </fieldset>

          <button
            type="submit"
            disabled={busy !== null}
            className="mt-5 flex h-11 w-full items-center justify-center rounded-lg bg-ink text-[15px] font-semibold text-paper disabled:opacity-60"
          >
            {busy === "verify" ? "Verifying…" : "Verify"}
          </button>
          <div className="mt-3 flex items-center justify-between gap-3 text-sm">
            <button
              type="button"
              onClick={() => {
                setMessage("");
                setNotice("");
                setStep("details");
              }}
              className="font-medium text-ink/60 underline-offset-4 hover:text-ink hover:underline"
            >
              Edit details
            </button>
            <button
              type="button"
              onClick={resend}
              disabled={busy !== null}
              className="font-medium text-ink/60 underline-offset-4 hover:text-ink hover:underline disabled:opacity-60"
            >
              {busy === "resend" ? "Sending…" : "Resend code"}
            </button>
          </div>
          {notice ? <p className="mt-3 text-sm text-ink/70">{notice}</p> : null}

          {message ? (
            <p role="alert" className="mt-3 text-sm text-ember">
              {message}
            </p>
          ) : null}
        </form>
      ) : null}

      {step === "verified" ? <AdmitPass name={name} accountId={accountId} /> : null}
    </aside>
  );
}

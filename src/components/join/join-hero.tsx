"use client";

import { useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { ArrowRight } from "lucide-react";

import { reservedPrices, type ReservedCurrency } from "@/content/reserved-price";
import { track } from "@/lib/analytics";
import { validateWaitlist } from "@/lib/waitlist";

type RazorpaySuccess = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

type RazorpayCheckout = {
  open: () => void;
};

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => RazorpayCheckout;
  }
}

const CODE_LENGTH = 6;

type Mode = "free" | "paid";
type Step = "details" | "code" | "done";

const fieldClass =
  "h-11 w-full rounded-[4px] border border-white/15 bg-white/[0.04] px-3 text-sm text-paper outline-none placeholder:text-white/30 focus:border-signal";

function loadRazorpay() {
  if (window.Razorpay) return Promise.resolve(true);
  return new Promise<boolean>((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export function JoinHero() {
  const [mode, setMode] = useState<Mode>("paid");
  const [currency, setCurrency] = useState<ReservedCurrency>("USD");
  const [submittedAs, setSubmittedAs] = useState<Mode>("free");
  const [step, setStep] = useState<Step>("details");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [message, setMessage] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState<"send" | "verify" | "resend" | null>(null);
  const codeRefs = useRef<Array<HTMLInputElement | null>>([]);
  const formRef = useRef<HTMLFormElement>(null);

  function choose(next: Mode) {
    setMode(next);
    setMessage("");
    if (step === "details") {
      window.requestAnimationFrame(() => {
        formRef.current?.querySelector<HTMLInputElement>("input[name='name']")?.focus();
      });
    }
  }

  async function postAuth(url: string, body: unknown) {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const payload = (await response.json().catch(() => ({}))) as {
      error?: string;
      accountId?: string;
      created?: boolean;
    };
    if (!response.ok) throw new Error(payload.error || "Something went wrong.");
    return payload;
  }

  async function submitDetails(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = validateWaitlist({ name, email, age });
    if (!parsed.ok) {
      setMessage(parsed.error);
      track("waitlist_form_error", { reason: "invalid", page_path: "/joinwaitlist", mode });
      return;
    }

    setBusy("send");
    setMessage("");
    setNotice("");
    try {
      const params = new URLSearchParams(window.location.search);
      await postAuth("/api/auth/otp", {
        ...parsed.data,
        source: params.get("utm_source") || (mode === "paid" ? "join-paid" : "join-free"),
        campaign: params.get("utm_campaign") || mode,
      });
      setSubmittedAs(mode);
      setCode(Array(CODE_LENGTH).fill(""));
      setStep("code");
      track("waitlist_signup_started", { mode, page_path: "/joinwaitlist" });
      window.setTimeout(() => codeRefs.current[0]?.focus(), 0);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "We couldn't send the code. Please try again.");
      track("waitlist_signup_error", { reason: "server", page_path: "/joinwaitlist", mode });
    } finally {
      setBusy(null);
    }
  }

  function updateCode(index: number, raw: string) {
    const digits = raw.replace(/\D/g, "");
    if (!digits) {
      setCode((current) => {
        const next = [...current];
        next[index] = "";
        return next;
      });
      return;
    }
    setCode((current) => {
      const next = [...current];
      digits.split("").forEach((digit, offset) => {
        if (index + offset < CODE_LENGTH) next[index + offset] = digit;
      });
      return next;
    });
    codeRefs.current[Math.min(index + digits.length, CODE_LENGTH - 1)]?.focus();
  }

  function handleCodeKeyDown(index: number, event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace" && !code[index] && index > 0) {
      codeRefs.current[index - 1]?.focus();
    }
  }

  async function verifyCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const joined = code.join("");
    if (joined.length !== CODE_LENGTH) {
      setMessage("Enter the 6-digit code.");
      return;
    }
    setBusy("verify");
    setMessage("");
    try {
      const payload = await postAuth("/api/auth/verify", { email, code: joined });
      track("waitlist_signup_success", {
        source: submittedAs === "paid" ? "join-paid" : "join-free",
        page_path: "/joinwaitlist",
        new_account: payload.created === false ? "false" : "true",
      });
      if (submittedAs === "paid") {
        await openCheckout();
      } else {
        setStep("done");
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "We couldn't verify that code.");
      track("waitlist_signup_error", { reason: "verify", page_path: "/joinwaitlist" });
    } finally {
      setBusy(null);
    }
  }

  async function openCheckout() {
    setBusy("send");
    setMessage("");
    try {
      const response = await fetch("/api/payments/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currency }),
      });
      const order = (await response.json()) as {
        error?: string;
        orderId?: string;
        amountMinor?: number;
        currency?: ReservedCurrency;
        keyId?: string;
        label?: string;
      };
      if (!response.ok || !order.orderId || !order.keyId || !order.amountMinor || !order.currency) {
        throw new Error(order.error || "Could not start checkout.");
      }
      const loaded = await loadRazorpay();
      if (!loaded || !window.Razorpay) throw new Error("Payment window could not load.");
      const checkout = new window.Razorpay({
        key: order.keyId,
        amount: order.amountMinor,
        currency: order.currency,
        name: "Two5",
        description: `Reserved place · ${order.label}`,
        order_id: order.orderId,
        prefill: { name, email },
        theme: { color: "#f0c020" },
        modal: {
          ondismiss: () => {
            setBusy(null);
            setStep("details");
            setMessage("Payment was not completed. You have not been charged.");
          },
        },
        handler: async (response: RazorpaySuccess) => {
          try {
            const confirmed = await fetch("/api/payments/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });
            const payload = (await confirmed.json()) as { error?: string };
            if (!confirmed.ok) throw new Error(payload.error || "Payment could not be confirmed.");
            setStep("done");
            setMessage("");
          } catch (error) {
            setStep("details");
            setMessage(error instanceof Error ? error.message : "Payment could not be confirmed.");
          } finally {
            setBusy(null);
          }
        },
      });
      checkout.open();
      setBusy(null);
    } catch (error) {
      setStep("details");
      setMessage(error instanceof Error ? error.message : "Could not start checkout.");
      setBusy(null);
    }
  }

  async function resendCode() {
    setBusy("resend");
    setMessage("");
    setNotice("");
    try {
      await postAuth("/api/auth/otp/resend", { email });
      setCode(Array(CODE_LENGTH).fill(""));
      setNotice("New code sent.");
      codeRefs.current[0]?.focus();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not resend the code.");
    } finally {
      setBusy(null);
    }
  }

  return (
    <section className="relative overflow-hidden bg-black text-paper">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="join-orb absolute -top-24 left-[8%] h-[28rem] w-[28rem] rounded-full bg-signal/30 blur-[110px]" />
        <div className="join-orb-alt absolute right-[-6%] bottom-[-8rem] h-[24rem] w-[24rem] rounded-full bg-volt/25 blur-[120px]" />
      </div>
      <div className="relative mx-auto grid w-full max-w-6xl items-start gap-10 px-5 pt-28 pb-16 sm:px-8 sm:pt-32 sm:pb-20 lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-14">
        <div>
          <p className="font-mono text-[11px] tracking-[0.16em] text-signal uppercase">Two ways in</p>
          <h1 className="section-heading mt-5 max-w-3xl text-paper">Join Two5.</h1>
          <p className="mt-5 max-w-xl font-display text-3xl leading-none font-normal tracking-[0.02em] text-signal">
            A free shortlist, or a reserved place at $299.
          </p>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/70">
            Two5 is a brain-training game in development: mental math, logic, and visual challenges. Rounds are not
            open on this website yet. Pay $299 to reserve a place, or join the free shortlist. The free list does not
            guarantee a place. Razorpay charges only after you confirm payment.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => choose("paid")}
              className="inline-flex h-12 items-center justify-center rounded-[4px] bg-signal px-5 text-base font-medium text-ink"
            >
              Reserve for $299
            </button>
            <button
              type="button"
              onClick={() => choose("free")}
              className="inline-flex h-12 items-center justify-center rounded-[4px] px-5 text-base font-medium text-paper ring-1 ring-white/30"
            >
              Join the free list
            </button>
          </div>
        </div>

        <div id="join-form" className="scroll-mt-24 border border-signal/50 bg-[#101010] p-5 text-paper shadow-[0_24px_80px_rgba(0,0,0,0.35)] sm:p-6">
          <div className="grid grid-cols-2 gap-1 bg-white/[0.04] p-1" role="tablist" aria-label="How to join">
            <button
              type="button"
              role="tab"
              aria-selected={mode === "paid"}
              onClick={() => choose("paid")}
              className={`h-10 text-sm font-medium ${mode === "paid" ? "bg-signal text-ink" : "text-white/55"}`}
            >
              $299
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === "free"}
              onClick={() => choose("free")}
              className={`h-10 text-sm font-medium ${mode === "free" ? "bg-white text-ink" : "text-white/55"}`}
            >
              Free
            </button>
          </div>

          {mode === "paid" ? (
            <div className="mt-5">
              <p className="font-display text-5xl leading-none text-signal">{reservedPrices[currency].label}</p>
              <p className="mt-2 text-sm text-white/60">{reservedPrices[currency].detail}</p>
              <div className="mt-4 grid grid-cols-2 gap-2" role="group" aria-label="Payment currency">
                {(Object.keys(reservedPrices) as ReservedCurrency[]).map((item) => (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={currency === item}
                    onClick={() => setCurrency(item)}
                    className={`h-10 text-sm font-medium ${currency === item ? "bg-signal text-ink" : "border border-white/15 text-white/70"}`}
                  >
                    {item === "USD" ? "$299" : "₹26,850"}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <p className="mt-4 text-sm leading-6 text-white/70">Join the shortlist. A place is not guaranteed.</p>
          )}

          {step === "details" ? (
            <form ref={formRef} onSubmit={submitDetails} noValidate className="mt-4">
              <div className="space-y-3">
                <label className="block text-sm">
                  <span className="mb-1.5 block text-white/60">Name</span>
                  <input name="name" autoComplete="name" required value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" className={fieldClass} />
                </label>
                <label className="block text-sm">
                  <span className="mb-1.5 block text-white/60">Email</span>
                  <input name="email" type="email" autoComplete="email" inputMode="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@email.com" className={fieldClass} />
                </label>
                <label className="block text-sm">
                  <span className="mb-1.5 block text-white/60">Age</span>
                  <input name="age" inputMode="numeric" required value={age} onChange={(event) => setAge(event.target.value.replace(/\D/g, "").slice(0, 3))} placeholder="Your age" className={fieldClass} />
                </label>
              </div>
              <button
                type="submit"
                disabled={busy !== null}
                className={`mt-4 flex h-12 w-full items-center justify-center gap-2 text-sm font-semibold disabled:opacity-50 ${mode === "paid" ? "bg-signal text-ink" : "bg-ink text-paper"}`}
              >
                {busy === "send" ? "Sending code..." : mode === "paid" ? `Pay ${reservedPrices[currency].label}` : "Join the free list"}
                {busy !== "send" ? <ArrowRight size={16} /> : null}
              </button>
              <p className="mt-3 text-[11px] leading-5 text-white/45">
                You must be at least 13. By joining you agree to the{" "}
                <a href="/terms" className="underline underline-offset-2">Terms</a> and{" "}
                <a href="/privacy" className="underline underline-offset-2">Privacy Policy</a>.
              </p>
            </form>
          ) : null}

          {step === "code" ? (
            <form onSubmit={verifyCode} className="mt-4">
              <p className="text-sm text-white/70">Enter the 6-digit code sent to {email}.</p>
              <div className="mt-3 grid grid-cols-6 gap-1.5">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    ref={(node) => {
                      codeRefs.current[index] = node;
                    }}
                    aria-label={`Code digit ${index + 1}`}
                    autoComplete={index === 0 ? "one-time-code" : "off"}
                    inputMode="numeric"
                    maxLength={index === 0 ? CODE_LENGTH : 1}
                    value={digit}
                    onChange={(event) => updateCode(index, event.target.value)}
                    onKeyDown={(event) => handleCodeKeyDown(index, event)}
                    className="h-11 min-w-0 rounded-[4px] border border-white/15 bg-white/[0.04] text-center font-mono text-lg text-paper outline-none focus:border-signal"
                  />
                ))}
              </div>
              <button type="submit" disabled={busy !== null} className="mt-4 h-12 w-full bg-signal text-sm font-semibold text-ink disabled:opacity-50">
                {busy === "verify" ? "Verifying..." : "Verify email"}
              </button>
              <div className="mt-3 flex items-center justify-between text-sm">
                <button type="button" disabled={busy !== null} onClick={() => { setMessage(""); setStep("details"); }} className="text-white/55">
                  Edit details
                </button>
                <button type="button" disabled={busy !== null} onClick={resendCode} className="text-volt">
                  {busy === "resend" ? "Resending..." : "Resend code"}
                </button>
              </div>
            </form>
          ) : null}

          {step === "done" ? (
            <p className="mt-4 text-sm leading-6 text-white/75" role="status">
              {submittedAs === "paid"
                ? "Payment captured. This account is a premium user, and the place is reserved."
                : "You're on the free list. On 1 December 2026, 200 people are shortlisted. Joining does not guarantee a place."}
            </p>
          ) : null}

          {message ? (
            <p role="alert" className="mt-3 text-sm text-ember">
              {message}
            </p>
          ) : null}
          {notice ? (
            <p role="status" className="mt-3 text-sm text-signal">
              {notice}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}

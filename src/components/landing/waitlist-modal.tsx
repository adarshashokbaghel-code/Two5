
"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import Image from "next/image";
import { X, ArrowRight, Check } from "lucide-react";

import { validateWaitlist } from "@/lib/waitlist";
import { track } from "@/lib/analytics";

const CODE_LENGTH = 6;

type Step = "details" | "code" | "verified";

const inputClass =
  "h-11 w-full rounded-lg border border-white/10 bg-[#111] px-3.5 text-sm text-[#F4F1E8] outline-none transition placeholder:text-white/30 focus:border-[#E9F078]/70";

export function WaitlistModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("details");

  const nameId = useId();
  const emailId = useId();
  const ageId = useId();
  const codeRefs = useRef<Array<HTMLInputElement | null>>([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [accountId, setAccountId] = useState("");
  const [message, setMessage] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState<
    "send" | "verify" | "resend" | null
  >(null);
  const openRef = useRef(false);
  const openWaitlistRef = useRef<(source: string) => void>(() => undefined);

  const attribution = useCallback(() => {
    const params = new URLSearchParams(window.location.search);
    return {
      source: params.get("utm_source") ?? "",
      campaign: params.get("utm_campaign") ?? "",
      page_path: window.location.pathname,
    };
  }, []);

  const openWaitlist = useCallback((source: string) => {
    if (!openRef.current) {
      const { page_path } = attribution();
      track("waitlist_cta_click", { source, page_path });
      track("waitlist_form_started", { source, page_path });
    }
    setMessage("");
    setNotice("");
    setOpen(true);
  }, [attribution]);

  useEffect(() => {
    openRef.current = open;
    openWaitlistRef.current = openWaitlist;
  }, [open, openWaitlist]);

  // Open from any waitlist link or marked CTA button.
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const button = target.closest("button[data-waitlist-trigger]");
      if (button) {
        event.preventDefault();
        openWaitlistRef.current(button.getAttribute("data-waitlist-source") || "waitlist-trigger");
        return;
      }

      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const href = anchor.getAttribute("href") ?? "";
      const isWaitlist =
        href === "#waitlist" ||
        href === "/#waitlist" ||
        href.endsWith("/#waitlist") ||
        (() => {
          try {
            return new URL(href, window.location.href).hash === "#waitlist";
          } catch {
            return false;
          }
        })();

      if (!isWaitlist) return;

      event.preventDefault();
      openWaitlistRef.current(anchor.getAttribute("data-waitlist-source") || "waitlist-link");
    };

    // Hash is client-only, so open after paint instead of during render.
    if (window.location.hash === "#waitlist") {
      window.setTimeout(() => openWaitlistRef.current("hash"), 0);
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  // Restore an existing session.
  useEffect(() => {
    let cancelled = false;

    fetch("/api/auth/session")
      .then((response) => (response.ok ? response.json() : null))
      .then(
        (payload: {
          user?: {
            accountId: string;
            email: string;
            name: string;
          } | null;
        }) => {
          if (cancelled || !payload?.user) return;

          setAccountId(payload.user.accountId);
          setEmail(payload.user.email);
          setName(payload.user.name);
          setStep("verified");
        },
      )
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  // Lock background scrolling and support Escape.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape" && busy === null) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, busy]);

  async function postAuth(url: string, body: unknown) {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const payload = (await response.json().catch(() => ({}))) as {
      error?: string;
      accountId?: string;
      name?: string;
      email?: string;
      created?: boolean;
    };

    if (!response.ok) {
      throw new Error(payload.error || "Something went wrong.");
    }

    return payload;
  }

  async function submitDetails(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const parsed = validateWaitlist({ name, email, age });

    if (!parsed.ok) {
      setMessage(parsed.error);
      track("waitlist_signup_error", { reason: "invalid", page_path: window.location.pathname });
      track("waitlist_form_error", { reason: "invalid", page_path: window.location.pathname });
      return;
    }

    setBusy("send");
    setMessage("");
    setNotice("");

    try {
      const { source, campaign } = attribution();
      await postAuth("/api/auth/otp", { ...parsed.data, source, campaign });

      setName(parsed.data.name);
      setEmail(parsed.data.email);
      setAge(String(parsed.data.age));
      setCode(Array(CODE_LENGTH).fill(""));
      setStep("code");

      track("waitlist_signup_started");
      window.setTimeout(() => codeRefs.current[0]?.focus(), 0);
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "We couldn't complete your registration. Please try again.",
      );
      track("waitlist_signup_error", { reason: "server", page_path: window.location.pathname });
      track("waitlist_form_error", { reason: "server", page_path: window.location.pathname });
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

    setMessage("");

    setCode((current) => {
      const next = [...current];

      digits.split("").forEach((digit, offset) => {
        if (index + offset < CODE_LENGTH) {
          next[index + offset] = digit;
        }
      });

      return next;
    });

    codeRefs.current[
      Math.min(index + digits.length, CODE_LENGTH - 1)
    ]?.focus();
  }

  function handleCodeKeyDown(
    index: number,
    event: KeyboardEvent<HTMLInputElement>,
  ) {
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
      const payload = await postAuth("/api/auth/verify", {
        email,
        code: joined,
      });

      setAccountId(payload.accountId ?? "");
      if (payload.name) setName(payload.name);

      setStep("verified");
      const touch = attribution();
      track("waitlist_signup_success", {
        source: touch.source || "direct",
        campaign: touch.campaign || "none",
        page_path: touch.page_path,
        new_account: payload.created === false ? "false" : "true",
      });
      if (payload.created !== false) {
        track("waitlist_joined", {
          source: touch.source || "direct",
          campaign: touch.campaign || "none",
          page_path: touch.page_path,
        });
      }
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "We couldn't complete your registration. Please try again.",
      );
      track("waitlist_signup_error", { reason: "verify", page_path: window.location.pathname });
      track("waitlist_form_error", { reason: "verify", page_path: window.location.pathname });
    } finally {
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
      setMessage(
        error instanceof Error ? error.message : "Could not resend the code.",
      );
    } finally {
      setBusy(null);
    }
  }

  if (!open) return null;

  const stepIndex =
    step === "details" ? 0 : step === "code" ? 1 : 2;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-[6px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && busy === null) {
          setOpen(false);
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="waitlist-title"
        className="relative my-auto w-full max-w-[390px] overflow-hidden rounded-xl bg-[#090909] text-[#F4F1E8] shadow-[0_24px_100px_rgba(0,0,0,0.65)]"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.09] px-5 py-4">
          <div className="flex items-center gap-2.5">
            <Image
              src="/brand/logo-mark.png"
              alt=""
              width={1600}
              height={867}
              className="h-6 w-auto"
            />
            <p className="font-display text-sm tracking-[0.12em]">TWO5</p>
          </div>

          <button
            type="button"
            aria-label="Close popup"
            disabled={busy !== null}
            onClick={() => setOpen(false)}
            className="flex size-8 items-center justify-center rounded-md text-white/50 transition hover:bg-white/[0.07] hover:text-white disabled:opacity-40"
          >
            <X size={17} />
          </button>
        </div>

        <div className="px-5 pb-5 pt-5">
          {/* Compact title */}
          <div className="mb-5">
            <h2
              id="waitlist-title"
              className="text-[30px] font-display leading-tight tracking-[-0.045em]"
            >
              {step === "details"
                ? "Get early access"
                : step === "code"
                  ? "Check your email"
                  : "You're on the list"}
              {step !== "code" && (
                <span className="text-[#E9F078]">.</span>
              )}
            </h2>

         
          </div>

          {/* Progress */}
          <div className="mb-5 flex gap-1.5">
            {["Details", "Verify", "Done"].map((label, index) => (
              <div key={label} className="flex-1">
                <div
                  className={`mb-2 h-[3px] rounded-full ${
                    index <= stepIndex
                      ? "bg-green-500"
                      : "bg-white/[0.12]"
                  }`}
                />
                <p
                  className={`text-[10px] ${
                    index === stepIndex
                      ? "font-medium text-white"
                      : "text-white/35"
                  }`}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>

          {/* Details */}
          {step === "details" && (
            <form onSubmit={submitDetails} noValidate>
              <div className="space-y-3.5">
                <div>
                  <label
                    htmlFor={nameId}
                    className="mb-1.5 block text-sm text-white/65 font-display"
                  >
                    Name
                  </label>
                  <input
                    id={nameId}
                    name="name"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Your name"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor={emailId}
                    className="mb-1.5 block text-sm font-display text-white/65"
                  >
                    Email address
                  </label>
                  <input
                    id={emailId}
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@email.com"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor={ageId}
                    className="mb-1.5 block font-display text-sm text-white/65"
                  >
                    Age
                  </label>
                  <input
                    id={ageId}
                    name="age"
                    inputMode="numeric"
                    required
                    value={age}
                    onChange={(event) =>
                      setAge(event.target.value.replace(/\D/g, "").slice(0, 3))
                    }
                    placeholder="Your age"
                    className={inputClass}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={busy !== null}
                onClick={() =>
                  track("waitlist_cta_click", {
                    source: "waitlist-modal",
                  })
                }
                className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-[4px] bg-green-500 text-sm font-semibold text-black transition hover:bg-green-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {busy === "send" ? "Sending code..." : "Join the waitlist"}
                {busy !== "send" && <ArrowRight size={16} />}
              </button>
              <p className="mt-3 text-center text-[11px] leading-5 text-white/40">
                Join for launch updates. Selection is not guaranteed. By joining you agree to our{" "}
                <a href="/terms" className="text-white/70 underline-offset-2 hover:text-white hover:underline">
                  Terms
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-white/70 underline-offset-2 hover:text-white hover:underline">
                  Privacy Policy
                </a>
                .
              </p>
            </form>
          )}

          {/* OTP */}
          {step === "code" && (
            <form onSubmit={verifyCode}>
              <p className="mb-2 text-sm text-white/60">
                6-digit verification code
              </p>

              <div className="grid grid-cols-6 gap-1.5 sm:gap-2">
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
                    onChange={(event) =>
                      updateCode(index, event.target.value)
                    }
                    onKeyDown={(event) =>
                      handleCodeKeyDown(index, event)
                    }
                    className="h-11 min-w-0 rounded-lg border border-white/10 bg-[#111] text-center font-mono text-lg outline-none focus:border-[#E9F078]/70"
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={busy !== null}
                className="mt-5 flex h-11 w-full items-center justify-center rounded-[4px] bg-[#E9F078] text-sm font-semibold text-black transition hover:bg-[#F0F69B] disabled:opacity-50"
              >
                {busy === "verify" ? "Verifying..." : "Verify email"}
              </button>

              <div className="mt-4 flex items-center justify-between text-sm">
                <button
                  type="button"
                  disabled={busy !== null}
                  onClick={() => {
                    setMessage("");
                    setStep("details");
                  }}
                  className="text-white/45 transition hover:text-white"
                >
                  Edit details
                </button>

                <button
                  type="button"
                  disabled={busy !== null}
                  onClick={resendCode}
                  className="text-[#E9F078] transition hover:text-white"
                >
                  {busy === "resend" ? "Resending..." : "Resend code"}
                </button>
              </div>
            </form>
          )}

          {/* Success */}
          {step === "verified" && (
            <div>
                <div className="flex flex-row gap-4">
              <div className="flex size-10 items-center justify-center rounded-lg bg-green-500 text-black">
                <Check size={22} strokeWidth={2.5} />
              </div>

              <p className="mt-1 text-sm leading-6 text-white/70">
                The waitlist stays open through November 30. On December 1, 200 people are selected and sent a WhatsApp
                invite. The product launches for them on December 12.
              </p>

              </div>

           

              {accountId && (
                <p className="mt-4 border-t border-white/10 pt-3 font-mono text-sm text-white/40">
                  ID: <span className="text-[#E9F078]">{accountId}</span>
                </p>
              )}

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mt-5 h-11 w-full rounded-[4px] border border-white/10 text-sm transition hover:bg-white/[0.05]"
              >
                Done
              </button>
            </div>
          )}

          {message && (
            <p
              role="alert"
              className="mt-3 rounded-md border border-red-400/20 bg-red-400/[0.06] px-3 py-2 text-sm text-red-300"
            >
              {message}
            </p>
          )}

          {notice && (
            <p role="status" className="mt-3 text-sm text-[#E9F078]">
              {notice}
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

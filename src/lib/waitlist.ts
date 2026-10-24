export type WaitlistPayload = {
  name: string;
  email: string;
  age: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function validateWaitlist(input: WaitlistPayload) {
  const name = input.name?.trim() ?? "";
  const email = normalizeEmail(input.email ?? "");
  const ageValue = input.age?.trim() ?? "";
  const age = Number(ageValue);

  if (!name) {
    return { ok: false as const, error: "Enter your name." };
  }

  if (!email) {
    return { ok: false as const, error: "Enter your email address." };
  }

  if (!emailPattern.test(email)) {
    return { ok: false as const, error: "That email does not look valid." };
  }

  if (!ageValue || !Number.isInteger(age) || age < 1 || age > 120) {
    return { ok: false as const, error: "Enter a valid age." };
  }

  return {
    ok: true as const,
    data: {
      name,
      email,
      age,
    },
  };
}

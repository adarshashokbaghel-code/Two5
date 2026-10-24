import nodemailer from "nodemailer";

function transport() {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  if (!user || !pass) throw new Error("Email is not configured.");

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtpout.secureserver.net",
    port: Number(process.env.SMTP_PORT || 465),
    secure: process.env.SMTP_SECURE !== "false",
    auth: { user, pass },
  });
}

export async function sendOtpEmail(input: { to: string; name: string; code: string }) {
  const from = process.env.EMAIL_USER;
  if (!from) throw new Error("Email is not configured.");

  await transport().sendMail({
    from: `Two5 <${from}>`,
    to: input.to,
    subject: "Your Two5 verification code",
    text: `Hi ${input.name},\n\nYour Two5 verification code is ${input.code}.\n\nIt expires in 10 minutes. If you did not request this, you can ignore this email.\n`,
    html: `<p>Hi ${escapeHtml(input.name)},</p><p>Your Two5 verification code is</p><p style="font-size:28px;letter-spacing:0.18em;font-weight:700">${input.code}</p><p>It expires in 10 minutes. If you did not request this, you can ignore this email.</p>`,
  });
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

"use server";

import { z } from "zod";
import { Resend } from "resend";

const schema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email").max(200),
  phone: z
    .string()
    .trim()
    .min(7, "Mobile number is required")
    .max(20, "Mobile number is too long")
    .regex(/^[+\d][\d\s\-()]{6,18}$/, "Use digits only (e.g. 09638296973 or +639638296973)"),
  message: z.string().trim().min(20, "Message must be at least 20 characters").max(2000),
  website: z.string().max(0), // honeypot — must be empty
});

export type ContactState =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };

async function notifyWhatsApp(payload: {
  name: string;
  email: string;
  phone: string;
  message: string;
}): Promise<void> {
  const apiKey = process.env.CALLMEBOT_API_KEY;
  const phone = process.env.CALLMEBOT_PHONE; // international format, e.g. 639638296973
  if (!apiKey || !phone) return;

  const summary = payload.message.length > 200
    ? payload.message.slice(0, 200) + "..."
    : payload.message;
  const text =
    `📩 New portfolio inquiry\n\n` +
    `From: ${payload.name}\n` +
    `Email: ${payload.email}\n` +
    `Mobile: ${payload.phone}\n\n` +
    `${summary}`;

  try {
    const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(phone)}&text=${encodeURIComponent(text)}&apikey=${encodeURIComponent(apiKey)}`;
    await fetch(url, { method: "GET" });
  } catch (err) {
    console.error("WhatsApp notify failed", err);
  }
}

export async function submitContact(
  _prev: ContactState | null,
  formData: FormData,
): Promise<ContactState> {
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    const flat = parsed.error.flatten();
    if (flat.fieldErrors.website) {
      // Honeypot triggered — return success to fool bots
      return { ok: true };
    }
    return {
      ok: false,
      error: "Please check the form and try again.",
      fieldErrors: flat.fieldErrors as Record<string, string[]>,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY not set — contact form is in dry-run mode");
    return { ok: false, error: "Contact form is not yet configured. Please email directly." };
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: process.env.RESEND_FROM ?? "onboarding@resend.dev",
      to: "justene.dev@gmail.com",
      replyTo: parsed.data.email,
      subject: `Portfolio inquiry from ${parsed.data.name}`,
      text:
        `From: ${parsed.data.name} <${parsed.data.email}>\n` +
        `Mobile: ${parsed.data.phone}\n\n` +
        `${parsed.data.message}`,
    });

    // Fire-and-forget WhatsApp notify — never fails the submission
    void notifyWhatsApp(parsed.data);

    return { ok: true };
  } catch (err) {
    console.error("contact submit failed", err);
    return { ok: false, error: "Could not send message. Please email directly." };
  }
}

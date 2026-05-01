"use server";

import { z } from "zod";
import { Resend } from "resend";

const schema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email").max(200),
  message: z.string().trim().min(20, "Message must be at least 20 characters").max(2000),
  website: z.string().max(0), // honeypot — must be empty
});

export type ContactState =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };

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
      text: `From: ${parsed.data.name} <${parsed.data.email}>\n\n${parsed.data.message}`,
    });
    return { ok: true };
  } catch (err) {
    console.error("contact submit failed", err);
    return { ok: false, error: "Could not send message. Please email directly." };
  }
}

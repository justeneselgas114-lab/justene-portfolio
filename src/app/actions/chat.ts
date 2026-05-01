"use server";

import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";

const SYSTEM_PROMPT = `You are Justene's AI assistant on his portfolio website. Justene Selgas is a Claude Code AI Specialist and Automation Engineer based in Davao City, Philippines.

Justene's services:
- AI workflow automation with n8n (lead capture, scoring, follow-up, voice AI, receipt OCR)
- AI agents using Claude Code, MCP servers, OpenAI, Google Gemini
- GoHighLevel and Make automations
- Modern web development with Next.js, React, TypeScript, Tailwind CSS
- End-to-end project delivery: design, build, deploy, optimize

Past clients include OrquestraPH (AI agency), Ally's Buffet & Grill (restaurant), NAPMI (Pilates institute). 12 production projects shipped.

Real outcomes:
- 200% more discovery calls (OrquestraPH)
- 60% restaurant reservations through site (Ally's Buffet)
- 150% more inquiries (NAPMI)
- 45% higher lead conversion (AI Receptionist)

Currently available — 2 slots open this quarter.

Contact:
- Email: justene.dev@gmail.com
- WhatsApp: 09638296973 (PH local) / wa.me/639638296973 (international)
- Facebook: facebook.com/Just10AiAutomation
- LinkedIn: linkedin.com/in/justene-selgas-152052377
- Instagram: coming soon
- Direct booking: scroll to Contact section on the site

Your job:
- Answer questions about Justene's skills, projects, services, availability, and contact info
- Be concise (2-3 sentences usually)
- Friendly but professional, like a helpful colleague
- If asked about pricing — say it depends on scope and to book a free audit call via the Contact form
- If asked something you don't know — be honest and direct them to email/WhatsApp Justene directly
- Never invent project details or fake testimonials
- Don't pretend to be Justene himself — you are his assistant`;

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(2000),
});

const requestSchema = z.object({
  history: z.array(messageSchema).max(20),
  message: z.string().trim().min(1).max(1000),
});

export type ChatMessage = z.infer<typeof messageSchema>;

export type ChatResult =
  | { ok: true; reply: string }
  | { ok: false; error: string };

export async function chat(
  history: ChatMessage[],
  message: string,
): Promise<ChatResult> {
  const parsed = requestSchema.safeParse({ history, message });
  if (!parsed.success) {
    return { ok: false, error: "Invalid input. Please try a shorter message." };
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return {
      ok: false,
      error: "AI assistant not yet configured. For now, please email justene.dev@gmail.com or use the contact form below.",
    };
  }

  try {
    const client = new Anthropic({ apiKey });
    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 400,
      system: SYSTEM_PROMPT,
      messages: [
        ...parsed.data.history.map((m) => ({ role: m.role, content: m.content })),
        { role: "user" as const, content: parsed.data.message },
      ],
    });

    const text = response.content
      .filter((block) => block.type === "text")
      .map((block) => (block as { text: string }).text)
      .join("\n")
      .trim();

    if (!text) {
      return { ok: false, error: "Empty response. Try rephrasing." };
    }

    return { ok: true, reply: text };
  } catch (err) {
    console.error("chat action failed", err);
    return {
      ok: false,
      error: "Something went wrong. Please email justene.dev@gmail.com directly.",
    };
  }
}

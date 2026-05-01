import { z } from "zod";

const envSchema = z.object({
  RESEND_API_KEY: z.string().min(1).optional(),
  RESEND_FROM: z.string().email().optional(),
  ANTHROPIC_API_KEY: z.string().min(1).optional(),
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
});

const parsed = envSchema.safeParse({
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  RESEND_FROM: process.env.RESEND_FROM,
  ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
});

if (!parsed.success) {
  console.error("Invalid environment variables:", parsed.error.flatten().fieldErrors);
  throw new Error("Invalid environment variables");
}

/**
 * Validated environment variables.
 *
 * - Throws at module load if env is invalid (fail-fast — intentional).
 * - Server-only. `NEXT_PUBLIC_*` values read through this object are NOT
 *   inlined by Next.js's bundler. In client components, read
 *   `process.env.NEXT_PUBLIC_X` literally so the value is statically
 *   replaced at build time.
 */
export const env = parsed.data;

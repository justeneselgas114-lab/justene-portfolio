"use client";

import { useActionState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { submitContact, type ContactState } from "@/app/actions/contact";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const initial: ContactState | null = null;

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initial);

  if (state?.ok) {
    return (
      <div className="rounded-2xl border border-border bg-bg-elevated p-8 text-center">
        <CheckCircle2 size={36} className="mx-auto text-accent mb-3" />
        <h3 className="font-serif text-2xl text-fg font-medium mb-2">Thank you!</h3>
        <p className="font-sans text-base text-fg-muted">
          I&apos;ll get back to you within 24 hours.
        </p>
      </div>
    );
  }

  const errors = state?.ok === false ? state.fieldErrors ?? {} : {};

  return (
    <form action={formAction} className="space-y-4">
      <Field
        label="Name"
        name="name"
        type="text"
        required
        error={errors.name?.[0]}
      />
      <Field
        label="Email"
        name="email"
        type="email"
        required
        error={errors.email?.[0]}
      />
      <Field
        label="Mobile number"
        name="phone"
        type="tel"
        placeholder="09638296973 or +639638296973"
        required
        error={errors.phone?.[0]}
      />
      <Field
        label="Message"
        name="message"
        as="textarea"
        rows={5}
        required
        error={errors.message?.[0]}
      />
      {/* honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px]"
      />
      {state?.ok === false && state.error && !state.fieldErrors && (
        <p className="text-sm text-red-700 bg-red-50 dark:bg-red-950/40 dark:text-red-300 rounded-lg px-3 py-2">
          {state.error}
        </p>
      )}
      <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
        {pending ? "Sending..." : "Send Message"}
        <ArrowRight size={16} />
      </Button>
    </form>
  );
}

interface FieldProps {
  label: string;
  name: string;
  type?: string;
  rows?: number;
  required?: boolean;
  error?: string;
  placeholder?: string;
  as?: "input" | "textarea";
}

function Field({ label, name, type = "text", rows, required, error, placeholder, as = "input" }: FieldProps) {
  const Input = as === "textarea" ? "textarea" : "input";
  return (
    <label className="block">
      <span className="block font-sans text-sm font-medium text-fg mb-1.5">
        {label}
        {required && <span className="text-accent ml-0.5">*</span>}
      </span>
      <Input
        name={name}
        type={as === "input" ? type : undefined}
        rows={as === "textarea" ? rows : undefined}
        required={required}
        placeholder={placeholder}
        className={cn(
          "w-full bg-bg-elevated border rounded-lg px-3 py-2.5 font-sans text-base text-fg placeholder-fg-subtle",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:border-accent",
          error ? "border-red-500" : "border-border"
        )}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </label>
  );
}

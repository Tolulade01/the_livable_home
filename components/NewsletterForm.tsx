"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/site";

interface NewsletterFormProps {
  variant?: "card" | "inline" | "footer";
  headline?: string;
  subtext?: string;
}

export default function NewsletterForm({
  variant = "card",
  headline = "Get the free room-planning checklist",
  subtext = "One email a week. New posts, real budgets, no fluff.",
}: NewsletterFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [email, setEmail] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setStatus("submitting");

    // Wire this up to MailerLite / ConvertKit's API route or embed action.
    // siteConfig.newsletter.formAction holds the configured endpoint.
    await new Promise((resolve) => setTimeout(resolve, 500));
    setStatus("success");
  }

  if (variant === "footer") {
    return (
      <form onSubmit={handleSubmit} className="flex w-full max-w-sm flex-col gap-2 sm:flex-row">
        <label htmlFor="footer-email" className="sr-only">
          Email address
        </label>
        <input
          id="footer-email"
          type="email"
          required
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded border border-sage-600 bg-sage-800 px-4 py-2.5 text-sm text-cream placeholder:text-sage-300 focus:border-clay-400"
        />
        <button type="submit" className="rounded bg-clay-400 px-4 py-2.5 text-sm font-semibold text-sage-900 transition-colors hover:bg-clay-500">
          {status === "success" ? "You're in" : "Subscribe"}
        </button>
      </form>
    );
  }

  return (
    <div
      className={
        variant === "card"
          ? "rounded-lg border border-sage-200 bg-sage-100/60 p-6 md:p-8"
          : "border-t border-sage-200 pt-8"
      }
    >
      <p className="eyebrow mb-2">Free download</p>
      <h3 className="font-display text-2xl text-sage-900 md:text-[1.7rem]">{headline}</h3>
      <p className="mt-2 text-sm text-sage-700">{subtext}</p>

      {status === "success" ? (
        <p className="mt-4 rounded bg-sage-200 px-4 py-3 text-sm font-medium text-sage-800">
          You&apos;re on the list. Check your inbox for the checklist.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2 sm:flex-row">
          <label htmlFor={`email-${variant}`} className="sr-only">
            Email address
          </label>
          <input
            id={`email-${variant}`}
            type="email"
            required
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded border border-sage-300 bg-cream px-4 py-2.5 text-sm text-ink placeholder:text-sage-500 focus:border-sage-600"
          />
          <button type="submit" className="btn-primary whitespace-nowrap" disabled={status === "submitting"}>
            {status === "submitting" ? "Sending..." : "Send it to me"}
          </button>
        </form>
      )}
      <p className="mt-3 text-xs text-sage-500">
        Provider: {siteConfig.newsletter.provider}. No spam, unsubscribe anytime.
      </p>
    </div>
  );
}

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
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Something went wrong.");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
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
      {status === "error" && (
        <p className="mt-2 text-sm text-red-700">{errorMessage}</p>
      )}
      <p className="mt-3 text-xs text-sage-500">
        Provider: {siteConfig.newsletter.provider}. No spam, unsubscribe anytime.
      </p>
    </div>
  );
}

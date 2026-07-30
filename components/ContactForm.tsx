"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    // Wire this up to an API route (e.g. app/api/contact/route.ts) that sends
    // through Resend, Postmark, or a forwarding service like Formspree.
    await new Promise((resolve) => setTimeout(resolve, 600));
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-sage-200 bg-sage-100/60 p-6">
        <p className="font-display text-xl text-sage-900">Message sent.</p>
        <p className="mt-2 text-sm text-sage-700">
          Thanks for writing in. I read every message and reply within a few business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-sage-800">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full rounded border border-sage-300 bg-cream px-4 py-2.5 text-sm text-ink focus:border-sage-600"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-sage-800">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded border border-sage-300 bg-cream px-4 py-2.5 text-sm text-ink focus:border-sage-600"
          />
        </div>
      </div>

      <div>
        <label htmlFor="reason" className="mb-1.5 block text-sm font-medium text-sage-800">
          What&apos;s this about?
        </label>
        <select
          id="reason"
          name="reason"
          className="w-full rounded border border-sage-300 bg-cream px-4 py-2.5 text-sm text-ink focus:border-sage-600"
          defaultValue="general"
        >
          <option value="general">General question</option>
          <option value="collab">Brand or affiliate partnership</option>
          <option value="press">Press</option>
          <option value="correction">Correction on a post</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-sage-800">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="w-full rounded border border-sage-300 bg-cream px-4 py-2.5 text-sm text-ink focus:border-sage-600"
        />
      </div>

      <button type="submit" className="btn-primary" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}

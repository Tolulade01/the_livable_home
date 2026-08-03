import { NextRequest, NextResponse } from "next/server";

// Sends contact form submissions to your inbox via Resend.
// Requires RESEND_API_KEY and CONTACT_FORM_TO_EMAIL in your environment (see .env.example).
// Docs: https://resend.com/docs/api-reference/emails/send-email
//
// Note: Resend requires the "from" address to be on a domain you've verified in
// your Resend dashboard. Until you verify thelivablehome.com (or your real domain),
// use onboarding@resend.dev as a safe default — Resend provides this for testing.

export async function POST(req: NextRequest) {
  try {
    const { name, email, reason, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_FORM_TO_EMAIL;

    if (!apiKey || !toEmail) {
      console.error("Contact form failed: RESEND_API_KEY or CONTACT_FORM_TO_EMAIL is not set.");
      return NextResponse.json(
        { error: "The contact form isn't configured yet. Please try again later." },
        { status: 500 }
      );
    }

    const fromAddress = process.env.CONTACT_FORM_FROM_EMAIL || "onboarding@resend.dev";

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: `The Livable Home Contact Form <${fromAddress}>`,
        to: [toEmail],
        reply_to: email,
        subject: `New contact form message: ${reason || "General question"}`,
        text: `From: ${name} <${email}>\nReason: ${reason || "General question"}\n\n${message}`,
      }),
    });

    if (!resendRes.ok) {
      const body = await resendRes.json().catch(() => ({}));
      console.error("Resend error:", body);
      return NextResponse.json(
        { error: "Something went wrong sending your message. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

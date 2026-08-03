import { NextRequest, NextResponse } from "next/server";

// Adds a subscriber to a Brevo (formerly Sendinblue) contact list.
// Requires BREVO_API_KEY and BREVO_LIST_ID in your environment (see .env.example).
// Docs: https://developers.brevo.com/reference/createcontact

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
    }

    const apiKey = process.env.BREVO_API_KEY;
    const listId = process.env.BREVO_LIST_ID;

    if (!apiKey || !listId) {
      console.error("Newsletter signup failed: BREVO_API_KEY or BREVO_LIST_ID is not set.");
      return NextResponse.json(
        { error: "Newsletter signup isn't configured yet. Please try again later." },
        { status: 500 }
      );
    }

    const brevoRes = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        email,
        listIds: [Number(listId)],
        updateEnabled: true, // if they already exist, just add them to the list instead of erroring
      }),
    });

    // Brevo returns 204 on success, or 400 with a "Contact already exist" duplicate_parameter
    // error if updateEnabled somehow still conflicts — treat both as success for the user.
    if (!brevoRes.ok) {
      const body = await brevoRes.json().catch(() => ({}));
      if (body?.code !== "duplicate_parameter") {
        console.error("Brevo error:", body);
        return NextResponse.json(
          { error: "Something went wrong adding you to the list. Please try again." },
          { status: 502 }
        );
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Newsletter signup error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

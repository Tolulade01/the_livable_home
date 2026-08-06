import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

// Renders a 2:3 Pinterest pin image on the fly: a tall base photo with the
// given text overlaid near the bottom, styled to match the site brand
// (Cormorant Garamond headline, DM Sans wordmark, sage/terracotta accent).
//
// This route IS the image's public URL. Nothing gets uploaded or stored —
// hit this URL with the right params and it renders fresh every time.
// n8n just needs to build a URL like:
//   https://yoursite.com/api/pin-image?image=/images/posts/pins/room-by-room/small-bedroom-ideas-1.webp&text=27%20Small%20Bedroom%20Ideas
//
// `image` should be a path relative to /public (this route resolves it to
// an absolute URL using the incoming request's own origin).

async function loadGoogleFont(family: string, weight: number, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
    family
  )}:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const match = css.match(/src: url\(([^)]+)\) format\('(opentype|truetype)'\)/);
  if (match) {
    const fontRes = await fetch(match[1]);
    if (fontRes.ok) {
      return await fontRes.arrayBuffer();
    }
  }
  throw new Error(`Failed to load font: ${family}`);
}

export async function GET(req: NextRequest) {
  const { searchParams, origin } = new URL(req.url);

  const imagePath = searchParams.get("image");
  const text = searchParams.get("text");

  if (!imagePath || !text) {
    return new Response(
      "Missing required query params: 'image' (path under /public) and 'text' (overlay text).",
      { status: 400 }
    );
  }

  const absoluteImageUrl = imagePath.startsWith("http")
    ? imagePath
    : `${origin}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;

  // Subset the fonts to only the characters actually needed, keeping the
  // request fast. Combine the overlay text with the brand name for the
  // wordmark, plus a couple of characters we always need (space, ellipsis).
  const brandText = "THE LIVABLE HOME";
  const [headlineFont, brandFont] = await Promise.all([
    loadGoogleFont("Cormorant Garamond", 600, text + "…"),
    loadGoogleFont("DM Sans", 500, brandText),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "1000px",
          height: "1500px",
          display: "flex",
          position: "relative",
          fontFamily: "DM Sans",
        }}
      >
        {/* Base photo, full bleed */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={absoluteImageUrl}
          width={1000}
          height={1500}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "1000px",
            height: "1500px",
            objectFit: "cover",
          }}
        />

        {/* Gradient scrim for text legibility, bottom-weighted */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "1000px",
            height: "1500px",
            background:
              "linear-gradient(to bottom, rgba(30,35,20,0) 40%, rgba(25,30,18,0.55) 68%, rgba(20,24,14,0.85) 100%)",
            display: "flex",
          }}
        />

        {/* Brand wordmark, top left */}
        <div
          style={{
            position: "absolute",
            top: "56px",
            left: "56px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "999px",
              background: "#C68F6B",
              marginRight: "12px",
              display: "flex",
            }}
          />
          <div
            style={{
              fontFamily: "DM Sans",
              fontSize: "22px",
              fontWeight: 500,
              letterSpacing: "2px",
              color: "#FBF8F2",
              display: "flex",
            }}
          >
            {brandText}
          </div>
        </div>

        {/* Headline text, bottom third */}
        <div
          style={{
            position: "absolute",
            bottom: "72px",
            left: "56px",
            right: "56px",
            display: "flex",
          }}
        >
          <div
            style={{
              fontFamily: "Cormorant Garamond",
              fontWeight: 600,
              fontSize: text.length > 45 ? "58px" : "72px",
              lineHeight: 1.12,
              color: "#FBF8F2",
              display: "flex",
            }}
          >
            {text}
          </div>
        </div>
      </div>
    ),
    {
      width: 1000,
      height: 1500,
      fonts: [
        { name: "Cormorant Garamond", data: headlineFont, weight: 600, style: "normal" },
        { name: "DM Sans", data: brandFont, weight: 500, style: "normal" },
      ],
    }
  );
}

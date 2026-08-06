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
  const kicker = searchParams.get("kicker") || ""; // optional small label above the headline, e.g. "SMALL SPACE IDEAS"
  const accent = searchParams.get("accent") === "clay" ? "#8A5A3B" : "#3A4A28"; // deep sage (default) or deep clay block color

  if (!imagePath || !text) {
    return new Response(
      "Missing required query params: 'image' (path under /public) and 'text' (overlay text).",
      { status: 400 }
    );
  }

  const absoluteImageUrl = imagePath.startsWith("http")
    ? imagePath
    : `${origin}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;

  const brandText = "THE LIVABLE HOME";
  const fontSubsetText = text + kicker + brandText + "…";
  const [headlineFont, brandFont, kickerFont] = await Promise.all([
    loadGoogleFont("Cormorant Garamond", 700, fontSubsetText),
    loadGoogleFont("DM Sans", 500, brandText),
    loadGoogleFont("DM Sans", 700, fontSubsetText),
  ]);

  const blockHeight = kicker ? 460 : 400;

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
        {/* Base photo, top portion only, full bleed */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={absoluteImageUrl}
          width={1000}
          height={1500 - blockHeight + 60}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "1000px",
            height: `${1500 - blockHeight + 60}px`,
            objectFit: "cover",
          }}
        />

        {/* Brand wordmark, top left, over the photo */}
        <div
          style={{
            position: "absolute",
            top: "48px",
            left: "48px",
            display: "flex",
            alignItems: "center",
            background: "rgba(20,24,14,0.45)",
            padding: "10px 18px",
            borderRadius: "999px",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "999px",
              background: "#E3B48D",
              marginRight: "10px",
              display: "flex",
            }}
          />
          <div
            style={{
              fontFamily: "DM Sans",
              fontSize: "18px",
              fontWeight: 500,
              letterSpacing: "2px",
              color: "#FBF8F2",
              display: "flex",
            }}
          >
            {brandText}
          </div>
        </div>

        {/* Thin accent divider at the photo/color-block seam */}
        <div
          style={{
            position: "absolute",
            top: `${1500 - blockHeight - 1}px`,
            left: 0,
            width: "1000px",
            height: "4px",
            background: accent === "#8A5A3B" ? "#E3B48D" : "#9BAB7C",
            display: "flex",
          }}
        />

        {/* Solid color block, bottom, full width - the high-contrast scannable part */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "1000px",
            height: `${blockHeight}px`,
            background: accent,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 56px",
          }}
        >
          {kicker && (
            <div
              style={{
                fontFamily: "DM Sans",
                fontWeight: 700,
                fontSize: "26px",
                letterSpacing: "3px",
                color: "#E3B48D",
                marginBottom: "20px",
                display: "flex",
              }}
            >
              {kicker.toUpperCase()}
            </div>
          )}
          <div
            style={{
              fontFamily: "Cormorant Garamond",
              fontWeight: 700,
              fontSize: text.length > 45 ? "72px" : "88px",
              lineHeight: 1.08,
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
        { name: "Cormorant Garamond", data: headlineFont, weight: 700, style: "normal" },
        { name: "DM Sans", data: brandFont, weight: 500, style: "normal" },
        { name: "DM Sans", data: kickerFont, weight: 700, style: "normal" },
      ],
    }
  );
}

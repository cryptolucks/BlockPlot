import { NextResponse } from "next/server";
import { getLand } from "@/lib/contract";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const inputText = body?.untrustedData?.inputText?.trim() || "";
    const landId = parseInt(inputText);

    if (isNaN(landId) || landId <= 0) {
      return new NextResponse(
        `<!DOCTYPE html>
        <html>
          <head>
            <meta property="fc:frame" content="vNext" />
            <meta property="fc:frame:image" content="https://blockplot.vercel.app/api/frame/image?error=Invalid%20Land%20ID" />
            <meta property="fc:frame:input:text" content="Enter Land ID (e.g. 1)" />
            <meta property="fc:frame:button:1" content="Verify Land 🔍" />
            <meta property="fc:frame:post_url" content="https://blockplot.vercel.app/api/frame" />
          </head>
          <body></body>
        </html>`,
        { headers: { "Content-Type": "text/html" } }
      );
    }

    const land = await getLand(landId);

    if (!land) {
      return new NextResponse(
        `<!DOCTYPE html>
        <html>
          <head>
            <meta property="fc:frame" content="vNext" />
            <meta property="fc:frame:image" content="https://blockplot.vercel.app/api/frame/image?error=Land%20Parcel%20Not%20Found" />
            <meta property="fc:frame:input:text" content="Enter Land ID (e.g. 1)" />
            <meta property="fc:frame:button:1" content="Verify Land 🔍" />
            <meta property="fc:frame:post_url" content="https://blockplot.vercel.app/api/frame" />
          </head>
          <body></body>
        </html>`,
        { headers: { "Content-Type": "text/html" } }
      );
    }

    // Build URL parameters
    const params = new URLSearchParams({
      id: landId.toString(),
      location: land.location,
      area: land.area.toString(),
      owner: land.owner,
      frozen: land.frozen.toString(),
    });

    return new NextResponse(
      `<!DOCTYPE html>
      <html>
        <head>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="https://blockplot.vercel.app/api/frame/image?${params.toString()}" />
          <meta property="fc:frame:input:text" content="Enter Land ID (e.g. 1)" />
          <meta property="fc:frame:button:1" content="Verify Land 🔍" />
          <meta property="fc:frame:button:2" content="Go to Web App 🌐" />
          <meta property="fc:frame:button:2:action" content="link" />
          <meta property="fc:frame:button:2:target" content="https://blockplot.vercel.app/register?id=${landId}" />
          <meta property="fc:frame:post_url" content="https://blockplot.vercel.app/api/frame" />
        </head>
        <body></body>
      </html>`,
      { headers: { "Content-Type": "text/html" } }
    );
  } catch (err) {
    return new NextResponse(
      `<!DOCTYPE html>
      <html>
        <head>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="https://blockplot.vercel.app/api/frame/image?error=Server%20Error" />
          <meta property="fc:frame:input:text" content="Enter Land ID (e.g. 1)" />
          <meta property="fc:frame:button:1" content="Verify Land 🔍" />
          <meta property="fc:frame:post_url" content="https://blockplot.vercel.app/api/frame" />
        </head>
        <body></body>
      </html>`,
      { headers: { "Content-Type": "text/html" } }
    );
  }
}

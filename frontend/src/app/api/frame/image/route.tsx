import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const error = searchParams.get("error");
    const id = searchParams.get("id");
    const location = searchParams.get("location");
    const area = searchParams.get("area");
    const owner = searchParams.get("owner");
    const frozen = searchParams.get("frozen") === "true";

    // If error view
    if (error) {
      return new ImageResponse(
        (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              height: "100%",
              backgroundColor: "#0D0D0D",
              padding: "40px",
              justifyContent: "space-between",
              fontFamily: "sans-serif",
              color: "#F9FAFB",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                paddingBottom: "20px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ fontSize: "36px", fontWeight: "bold", color: "#F97316" }}>BlockPlot</span>
                <span style={{ fontSize: "20px", color: "#9CA3AF", marginLeft: "10px" }}>Land Verification</span>
              </div>
            </div>

            {/* Error Message */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                flexGrow: 1,
              }}
            >
              <span style={{ fontSize: "64px", marginBottom: "20px" }}>⚠️</span>
              <span style={{ fontSize: "40px", fontWeight: "bold", color: "#F97316" }}>{error}</span>
              <span style={{ fontSize: "20px", color: "#9CA3AF", marginTop: "10px" }}>
                Please enter a valid Registered Land ID
              </span>
            </div>

            {/* Footer */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                paddingTop: "20px",
                fontSize: "14px",
                color: "#6B7280",
              }}
            >
              <span>Verify property ownership instantly</span>
              <span>blockplot.vercel.app</span>
            </div>
          </div>
        ),
        {
          width: 1200,
          height: 630,
        }
      );
    }

    // Success details view
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            backgroundColor: "#0D0D0D",
            padding: "40px",
            justifyContent: "space-between",
            fontFamily: "sans-serif",
            color: "#F9FAFB",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
              paddingBottom: "20px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ fontSize: "36px", fontWeight: "bold", color: "#F97316" }}>BlockPlot</span>
              <span style={{ fontSize: "20px", color: "#9CA3AF", marginLeft: "10px" }}>Land Verification</span>
            </div>
            <div
              style={{
                backgroundColor: "#F97316",
                color: "black",
                fontWeight: "bold",
                padding: "6px 16px",
                borderRadius: "9999px",
                fontSize: "16px",
              }}
            >
              SECURED ON BITCOIN
            </div>
          </div>

          {/* Land Details */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              flexGrow: 1,
              justifyContent: "center",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "16px", color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "1px" }}>
                  Land Parcel ID
                </span>
                <span style={{ fontSize: "44px", fontWeight: 800, color: "#F97316" }}>BP-TX#{id}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                <span style={{ fontSize: "16px", color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "1px" }}>
                  Status
                </span>
                <span
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: frozen ? "#EF4444" : "#10B981",
                  }}
                >
                  {frozen ? "❄️ FROZEN" : "✅ ACTIVE & SECURED"}
                </span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                backgroundColor: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                borderRadius: "16px",
                padding: "24px",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                <span style={{ fontSize: "14px", color: "#9CA3AF" }}>Owner Address</span>
                <span style={{ fontSize: "18px", fontWeight: "bold", color: "#F9FAFB", marginTop: "4px" }}>
                  {owner}
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", width: "180px", marginLeft: "40px" }}>
                <span style={{ fontSize: "14px", color: "#9CA3AF" }}>Area</span>
                <span style={{ fontSize: "20px", fontWeight: "bold", color: "#F9FAFB", marginTop: "4px" }}>
                  {area} sq ft
                </span>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "14px", color: "#9CA3AF" }}>Registered Location</span>
              <span style={{ fontSize: "22px", fontWeight: 600, color: "#F9FAFB", marginTop: "4px" }}>
                📍 {location}
              </span>
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              paddingTop: "20px",
              fontSize: "14px",
              color: "#6B7280",
            }}
          >
            <span>Verified via Clarity Smart Contract</span>
            <span>blockplot.vercel.app</span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (err) {
    return new Response("Internal Server Error", { status: 500 });
  }
}

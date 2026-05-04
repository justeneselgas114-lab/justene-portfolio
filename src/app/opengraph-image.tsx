import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Justene Selgas — Junior Full-Stack Developer & Claude AI Specialist";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function og() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#F5EFE6",
          color: "#2A1F14",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
        }}
      >
        <p style={{ fontSize: 24, color: "#8B5A2B", textTransform: "uppercase", letterSpacing: 4 }}>
          Portfolio
        </p>
        <h1 style={{ fontSize: 96, lineHeight: 1.05, margin: "16px 0", fontWeight: 500 }}>
          Justene Selgas
        </h1>
        <p style={{ fontSize: 36, color: "#6B5A47", maxWidth: 900 }}>
          Full-Stack Dev · n8n Integrations · Claude AI Specialist
        </p>
      </div>
    ),
    size
  );
}

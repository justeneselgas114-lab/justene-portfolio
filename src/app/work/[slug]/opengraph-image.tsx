import { ImageResponse } from "next/og";
import { getWorkBySlug } from "@/lib/data/work";

export const runtime = "edge";
export const alt = "Project case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function og({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getWorkBySlug(slug);
  const title = item?.title ?? "Project";
  const subtitle = item?.shortDescription ?? "";
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
        <p style={{ fontSize: 22, color: "#8B5A2B", textTransform: "uppercase", letterSpacing: 4 }}>
          {item?.type === "automation" ? "Automation" : "Web"} · Justene Selgas
        </p>
        <h1 style={{ fontSize: 64, lineHeight: 1.1, margin: "20px 0", fontWeight: 500, maxWidth: 1000 }}>
          {title}
        </h1>
        <p style={{ fontSize: 28, color: "#6B5A47", maxWidth: 1000, lineHeight: 1.3 }}>
          {subtitle}
        </p>
      </div>
    ),
    size
  );
}

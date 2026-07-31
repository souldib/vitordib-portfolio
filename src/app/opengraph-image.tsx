import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#06070A",
          backgroundImage:
            "radial-gradient(900px circle at 20% 0%, rgba(91,140,255,0.28), transparent 55%), radial-gradient(700px circle at 90% 100%, rgba(76,224,255,0.16), transparent 55%)",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#9AA0AE",
            fontSize: 24,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          <div style={{ width: 48, height: 2, backgroundColor: "#5B8CFF" }} />
          {site.role}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#F4F1EA",
              fontSize: 92,
              lineHeight: 1.02,
              letterSpacing: -3,
            }}
          >
            Data platforms
          </div>
          <div
            style={{
              color: "#5B8CFF",
              fontSize: 92,
              lineHeight: 1.02,
              letterSpacing: -3,
            }}
          >
            leaders can trust.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            color: "#9AA0AE",
            fontSize: 26,
          }}
        >
          <div style={{ display: "flex", color: "#F4F1EA" }}>{site.name}</div>
          <div style={{ display: "flex" }}>Microsoft Fabric · Azure · Power BI</div>
        </div>
      </div>
    ),
    size,
  );
}

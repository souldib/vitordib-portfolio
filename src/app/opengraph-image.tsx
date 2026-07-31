import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const portrait = await readFile(path.join(process.cwd(), "public", "vitor-og.jpg"));
  const portraitSrc = `data:image/jpeg;base64,${portrait.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          backgroundColor: "#06070A",
          backgroundImage:
            "radial-gradient(900px circle at 15% 0%, rgba(91,140,255,0.26), transparent 55%), radial-gradient(700px circle at 60% 100%, rgba(76,224,255,0.14), transparent 55%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "68px 0 68px 76px",
            width: 790,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              color: "#9AA0AE",
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            <div style={{ width: 48, height: 2, backgroundColor: "#5B8CFF" }} />
            {site.role}
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ color: "#F4F1EA", fontSize: 84, lineHeight: 1.02, letterSpacing: -3 }}>
              Data platforms
            </div>
            <div style={{ color: "#5B8CFF", fontSize: 84, lineHeight: 1.02, letterSpacing: -3 }}>
              leaders can trust.
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", color: "#F4F1EA", fontSize: 30 }}>{site.name}</div>
            <div style={{ display: "flex", color: "#9AA0AE", fontSize: 22 }}>
              Microsoft Fabric · Azure · Power BI
            </div>
          </div>
        </div>

        <div style={{ display: "flex", position: "relative", width: 410, height: "100%" }}>
          <img
            src={portraitSrc}
            width={410}
            height={630}
            style={{ objectFit: "cover", width: 410, height: 630 }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, #06070A 0%, rgba(6,7,10,0.35) 35%, rgba(6,7,10,0.1) 100%)",
            }}
          />
        </div>
      </div>
    ),
    size,
  );
}

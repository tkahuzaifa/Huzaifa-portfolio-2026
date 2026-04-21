import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#e5e7eb",
          borderRadius: "16px",
          border: "2px solid #9ca3af",
          color: "#111827",
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: "0.08em",
          fontFamily: "Arial, sans-serif",
        }}
      >
        MH
      </div>
    ),
    {
      width: size.width,
      height: size.height,
    }
  );
}

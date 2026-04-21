import * as React from "react";

type GoogleDriveVideoProps = {
  fileId: string; // google drive file id
  height?: number;
  className?: string;
};

export function GoogleDriveVideo({
  fileId,
  height = 480,
  className,
}: GoogleDriveVideoProps) {
  const src = `https://drive.google.com/file/d/${fileId}/preview`;

  return (
    <div
      className={[
        "overflow-hidden rounded-xl border bg-background/40",
        className ?? "",
      ].join(" ")}
    >
      <iframe
        src={src}
        width="100%"
        height={height}
        allow="autoplay"
        allowFullScreen
        title="Google Drive Video"
        style={{ border: 0 }}
      />
    </div>
  );
}

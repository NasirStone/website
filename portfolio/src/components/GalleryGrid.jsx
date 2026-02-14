import { useMemo } from "react";
import { Image } from "@unpic/react";
import { asset } from "./uiConstants.js";

function isAbsoluteUrl(src) {
  return (
    /^https?:\/\//i.test(src) || /^data:/i.test(src) || /^blob:/i.test(src)
  );
}

export default function GalleryGrid({
  images,
  columns = 2,
  gap = "1.0rem",
  aspect = "16 / 9",
  width = 1200,
  height = 675,
}) {
  const resolved = useMemo(() => {
    return (images || []).map((src) => {
      if (!src) return src;
      return isAbsoluteUrl(src) ? src : asset(src);
    });
  }, [images]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gap,
      }}
    >
      {resolved.map((src, i) => (
        <div
          key={`${src}-${i}`}
          style={{
            borderRadius: 0,
            overflow: "hidden",
            border: "3px solid var(--panel-border)",
            background: "var(--panel-bg)",
            aspectRatio: aspect,
          }}
        >
          <Image
            src={src}
            alt={`Gallery image ${i + 1}`}
            layout="constrained"
            width={width}
            height={height}
            priority={i === 0}
            sizes={
              columns === 1
                ? "100vw"
                : `(max-width: 720px) 100vw, (max-width: 1200px) ${Math.round(
                    100 / columns,
                  )}vw, ${Math.round(100 / columns)}vw`
            }
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
      ))}
    </div>
  );
}

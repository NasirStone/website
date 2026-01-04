import { useMemo } from "react";
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
            borderRadius: 12,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.10)",
            background: "rgba(255,255,255,0.03)",
            aspectRatio: aspect,
          }}
        >
          <img
            src={src}
            alt={`Gallery image ${i + 1}`}
            decoding="async"
            loading={i === 0 ? "eager" : "lazy"}
            fetchPriority={i === 0 ? "high" : "auto"}
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

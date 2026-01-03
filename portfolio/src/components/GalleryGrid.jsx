import { useEffect, useMemo } from "react";
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
  preloadCount = 4,
}) {
  const resolved = useMemo(() => {
    return (images || []).map((src) => {
      if (!src) return src;
      return isAbsoluteUrl(src) ? src : asset(src);
    });
  }, [images]);

  // Prefetch first images so they hit cache ASAP
  useEffect(() => {
    const n = Math.max(0, Math.min(preloadCount, resolved.length));
    if (!n) return;

    for (let i = 0; i < n; i++) {
      const src = resolved[i];
      if (!src) continue;
      const img = new Image();
      if (i < 2) img.fetchPriority = "high";
      img.decoding = "async";
      img.src = src;
    }
  }, [resolved, preloadCount]);

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
            loading={i < preloadCount ? "eager" : "lazy"}
            fetchPriority={i < 2 ? "high" : "auto"}
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

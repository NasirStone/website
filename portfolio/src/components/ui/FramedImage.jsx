export default function FramedImage({
  src,
  alt,
  size = "420px",
  aspect = "1 / 1",
  radius = 18,
}) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          width: `min(${size}, 86vw)`,
          aspectRatio: aspect,
          borderRadius: radius,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.14)",
          boxShadow: "0 24px 70px rgba(0,0,0,0.45)",
          background: "rgba(255,255,255,0.03)",
        }}
      >
        <img
          src={src}
          alt={alt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
          loading="eager"
        />
      </div>
    </div>
  );
}
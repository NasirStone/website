export default function TextPanel({
  title,
  children,
  padding = "clamp(16px, 2.5vw, 28px)",
}) {
  return (
    <div
      style={{
        borderRadius: 18,
        border: "1px solid var(--panel-border)",
        background: "var(--panel-bg)",
        boxShadow:"var(--shadow)",
        padding,
        lineHeight: 1.65,
      }}
    >
      {title ? (
        <div
          style={{
            fontSize: "clamp(1.4rem, 2.2vw, 2.1rem)",
            fontWeight: 700,
            marginBottom: "0.75rem",
          }}
        >
          {title}
        </div>
      ) : null}

      <div style={{ fontSize: "1rem", opacity: 0.92 }}>{children}</div>
    </div>
  );
}
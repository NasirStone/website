export default function TextPanel({
  title,
  header,
  children,
  padding = "clamp(16px, 2.5vw, 28px)",
  marginTop = 0,
  style,
}) {
  return (
    <div
      style={{
        marginTop,
        borderRadius: 18,
        border: "1px solid var(--panel-border)",
        background: "var(--panel-bg)",
        boxShadow: "var(--shadow)",
        padding,
        lineHeight: 1.65,
        ...style,
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

      {header ? (
        <div style={{ fontSize: "0.85rem", opacity: 0.85, marginBottom: "0.5rem" }}>
          {header}
        </div>
      ) : null}

      <div style={{ fontSize: "1rem", opacity: 0.92 }}>{children}</div>
    </div>
  );
}
import { MONO } from "../uiConstants.js";

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
      data-panel="true"
      style={{
        marginTop,
        borderRadius: 0,
        border: "3px solid var(--panel-border)",
        background: "var(--panel-bg)",
        boxShadow: "var(--panel-shadow, var(--shadow))",
        padding,
        lineHeight: 1.65,
        fontFamily: MONO,
        ...style,
      }}
    >
      {title ? (
        <div
          style={{
            fontFamily: MONO,
            fontSize: "clamp(1.4rem, 2.2vw, 2.1rem)",
            fontWeight: 600,
            marginBottom: "0.75rem",
          }}
        >
          {title}
        </div>
      ) : null}

      {header ? (
        <div
          style={{
            fontFamily: MONO,
            fontSize: "0.85rem",
            opacity: 0.85,
            marginBottom: "0.5rem",
          }}
        >
          {header}
        </div>
      ) : null}

      <div style={{ fontFamily: MONO, fontSize: "1rem", opacity: 0.92 }}>
        {children}
      </div>
    </div>
  );
}

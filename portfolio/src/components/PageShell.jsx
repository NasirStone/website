import { MONO } from "./uiConstants.js";

export default function PageShell({
  title,
  children,
  onBack,
  maxWidth = "1700px",
}) {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "var(--page-bg)",
        color: "var(--fg)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "1.5rem 0.75rem",
        justifyContent: "center",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          transform: "translateY(18px)",
          width: `min(${maxWidth}, 100%)`,
          boxSizing: "border-box",
          borderRadius: 14,
          border: "1px solid var(--shell-border)",
          background: "var(--shell-bg)",
          boxShadow: "var(--shadow)",
          padding: "1.25rem 1.25rem 1.5rem",
        }}
      >
        {title ? (
          <div
            style={{
              fontFamily: MONO,
              fontSize: "0.9rem",
              opacity: 0.9,
              marginBottom: "1.0rem",
            }}
          >
            {title}
          </div>
        ) : null}

        {children}

        {onBack ? (
          <button
            onClick={onBack}
            style={{
              marginTop: "1.25rem",
              background: "var(--panel-bg)",
              border: "1px solid var(--panel-border)",
              color: "var(--fg)",
              borderRadius: 12,
              padding:
                "clamp(0.63rem, 1.8vw, 0.86rem) clamp(0.86rem, 2.7vw, 1.04rem)",
              cursor: "pointer",
              fontFamily: MONO,
              fontSize: "clamp(0.88rem, 2.5vw, 0.98rem)",
              minHeight: "clamp(44px, 6.5vh, 50px)",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.45rem",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            ← Back to terminal
          </button>
        ) : null}
        <div
          style={{
            marginTop: "2.25rem",
            paddingTop: "1.0rem",
            borderTop: "1px solid var(--shell-border)",
            textAlign: "right",
            fontFamily: MONO,
            fontSize: "0.8rem",
            color: "var(--muted)",
            opacity: 0.9,
          }}
          aria-hidden="true"
        >
          © 2026 Nasir Sims
        </div>
      </div>
    </div>
  );
}

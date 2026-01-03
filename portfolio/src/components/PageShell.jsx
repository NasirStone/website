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
        width: "100vw",
        background: "var(--page-bg)",
        color: "var(--fg)",
        display: "grid",
        placeItems: "center",
        padding: "1.5rem 0.75rem",
      }}
    >
      <div
        style={{
          width: `min(${maxWidth}, 98vw)`,
          borderRadius: 14,
          border: "1px solid var(--shell-border)",
          background: "var(--shell-bg)",
          boxShadow: "var(--shadow)",
          padding: "1.25rem 1.25rem 1.5rem",
        }}
      >
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

        {children}

        {onBack ? (
          <button
            onClick={onBack}
            style={{
              marginTop: "1.25rem",
              background: "var(--panel-bg)",
              border: "1px solid var(--panel-border)",
              color: "var(--fg)",
              borderRadius: 10,
              padding: "0.55rem 0.8rem",
              cursor: "pointer",
              fontFamily: MONO,
              fontSize: "0.85rem",
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

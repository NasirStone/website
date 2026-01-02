import { BORDER, FG, MONO, PANEL_BG, PANEL_SHADOW } from "./uiConstants.js";

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
        background: "#0b0b0c",
        color: FG,
        display: "grid",
        placeItems: "center",
        padding: "1.5rem 0.75rem",
      }}
    >
      <div
        style={{
          width: `min(${maxWidth}, 98vw)`,
          borderRadius: 14,
          border: BORDER,
          background: PANEL_BG,
          boxShadow: PANEL_SHADOW,
          padding: "1.25rem 1.25rem 1.5rem",
        }}
      >
        <div
          style={{
            fontFamily: MONO,
            fontSize: "0.9rem",
            opacity: 0.85,
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
              background: "rgba(255,255,255,0.08)",
              border: BORDER,
              color: FG,
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
      </div>
    </div>
  );
}
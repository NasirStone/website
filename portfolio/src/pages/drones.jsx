import { useNavigate } from "react-router-dom";

export default function DronesPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "#0b0b0c",
        color: "rgba(235,235,235,0.92)",
        display: "grid",
        placeItems: "center",
        padding: "2.5rem 1.25rem",
      }}
    >
      <div
        style={{
          width: "min(900px, 92vw)",
          borderRadius: 14,
          border: "1px solid rgba(255,255,255,0.14)",
          background: "rgba(0, 0, 0, 0.82)",
          boxShadow:
            "0 24px 70px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06) inset",
          backdropFilter: "blur(14px)",
          padding: "1.25rem 1.25rem 1.5rem",
        }}
      >
        <div
          style={{
            fontFamily:
              "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
            fontSize: "0.9rem",
            opacity: 0.8,
            marginBottom: "0.9rem",
          }}
        >
          Drones
        </div>

        <div style={{ opacity: 0.85, lineHeight: 1.6 }}>
          This is your blank slate for the Drones page.
          <br />
          Build anything you want here.
        </div>

        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: "1.25rem",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.14)",
            color: "rgba(235,235,235,0.92)",
            borderRadius: 10,
            padding: "0.55rem 0.8rem",
            cursor: "pointer",
            fontFamily:
              "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
            fontSize: "0.85rem",
          }}
        >
          ← Back to landing
        </button>
      </div>
    </div>
  );
}
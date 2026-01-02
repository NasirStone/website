export default function TextBox({ children }) {
  return (
    <div
      style={{
        marginTop: "1.0rem",
        borderRadius: 12,
        border: "1px solid rgba(255,255,255,0.10)",
        background: "rgba(255,255,255,0.03)",
        padding: "1rem",
        lineHeight: 1.65,
        opacity: 0.92,
      }}
    >
      {children}
    </div>
  );
}
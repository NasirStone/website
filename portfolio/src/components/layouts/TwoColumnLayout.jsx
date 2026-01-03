export default function TwoColumnLayout({
  children,
  maxWidth = "1400px",
  leftWidth = "480px",
  breakpointPx = 860,
  align = "center",
  gap = "clamp(16px, 3vw, 36px)",
}) {
  const className = "twoColGrid";

  return (
    <>
      <div
        className={className}
        style={{
          width: `min(${maxWidth}, 100%)`,
          display: "grid",
          gridTemplateColumns: `minmax(280px, ${leftWidth}) 1fr`,
          gap,
          alignItems: align,
        }}
      >
        {children}
      </div>

      <style>{`
        @media (max-width: ${breakpointPx}px) {
          .${className} {
            grid-template-columns: 1fr !important;
            align-items: start !important;
          }
        }
      `}</style>
    </>
  );
}
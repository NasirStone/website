import { useNavigate } from "react-router-dom";
import PageShell from "../components/PageShell.jsx";
import TextPanel from "../components/ui/TextPanel.jsx";

export default function AutonomousVehiclesPage() {
  const navigate = useNavigate();

  return (
    <PageShell title="Autonomous Vehicles" onBack={() => navigate("/")}>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          padding: "clamp(16px, 3vw, 36px)",
          boxSizing: "border-box",
        }}
      >
        <div style={{ width: "min(1100px, 100%)" }}>
          <TextPanel title="Coming Soon..."></TextPanel>
        </div>
      </div>
    </PageShell>
  );
}

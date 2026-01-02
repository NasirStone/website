import { useNavigate } from "react-router-dom";
import PageShell from "../components/PageShell.jsx";
import GalleryGrid from "../components/GalleryGrid.jsx";
import TextBox from "../components/TextBox.jsx";
import { MONO } from "../components/uiConstants.js";

export default function DronesPage() {
  const navigate = useNavigate();
  const base = import.meta.env.BASE_URL;

  const images = [
    `${base}images/drones/b_entr.webp`,
    `${base}images/drones/camp.webp`,
    `${base}images/drones/chap.webp`,
    `${base}images/drones/fp.webp`,
  ];

  return (
    <PageShell title="Drones" onBack={() => navigate("/")}>
      <GalleryGrid images={images} columns={2} aspect="16 / 9" />

      <TextBox>
        <div style={{ fontFamily: MONO, fontSize: "0.85rem", opacity: 0.85 }}>
          WashU Drone Pilot Internship
        </div>
        <div style={{ marginTop: "0.5rem" }}>
          In the summer of 2025, I spent my days flying drones for WashU's
          Faciliities, Planning & Management Department. Working under my boss,
          I led mapping missions for WashU's campus and other assets to help
          create a 'digital twin' of WashU. Combining photogrammetry and LiDAR,
          I applied SLAM-supported workflows to refine ground, building, and
          vegetation classes for accurate change detection, including seasonal
          foliage variation.
        </div>
      </TextBox>
    </PageShell>
  );
}

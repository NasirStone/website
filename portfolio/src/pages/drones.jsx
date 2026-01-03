import { useNavigate } from "react-router-dom";
import PageShell from "../components/PageShell.jsx";
import GalleryGrid from "../components/GalleryGrid.jsx";
import TextPanel from "../components/ui/TextPanel.jsx";
import { MONO } from "../components/uiConstants.js";

export default function DronesPage() {
  const navigate = useNavigate();

  const images = [
    "images/drones/b_entr.webp",
    "images/drones/camp.webp",
    "images/drones/chap.webp",
    "images/drones/fp.webp",
  ];

  return (
    <PageShell title="Drones" onBack={() => navigate("/")}>
      <GalleryGrid images={images} columns={2} aspect="16 / 9" />

      <TextPanel
        marginTop="1rem"
        header={
          <span style={{ fontFamily: MONO }}>WashU Drone Pilot Internship</span>
        }
      >
        In the summer of 2025, I spent my days flying DJI Drones for WashU's
        Facilities, Planning & Management Department. I primarily flew a DJI
        Matrice 300 RTK, where I led mapping missions for WashU's campus and
        other assets to help create a 'digital twin' of WashU. Combining
        photogrammetry and LiDAR, I applied SLAM-supported workflows to refine
        ground, building, and vegetation classes for accurate change detection,
        including seasonal foliage variation.
      </TextPanel>
    </PageShell>
  );
}

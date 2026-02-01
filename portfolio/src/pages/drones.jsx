import { useNavigate } from "react-router-dom";
import PageShell from "../components/PageShell.jsx";
import GalleryGrid from "../components/GalleryGrid.jsx";
import TextPanel from "../components/ui/TextPanel.jsx";
import { MONO } from "../components/uiConstants.js";

const DRONE_IMAGES = [
  "images/drones/b_entr.webp",
  "images/drones/camp.webp",
  "images/drones/chap.webp",
  "images/drones/fp.webp",
];

const SECTION_HEADER = "WashU Drone Pilot Internship";

export default function DronesPage() {
  const navigate = useNavigate();

  return (
    <PageShell title={"Drones"} onBack={() => navigate("/")}>
      <GalleryGrid images={DRONE_IMAGES} columns={2} aspect="16 / 9" />

      <TextPanel
        marginTop="1rem"
        header={<span style={{ fontFamily: MONO }}>{SECTION_HEADER}</span>}
      >
        In the summer of 2025, I spent my days flying DJI Drones for WashU's
        Facilities, Planning & Management Department. I primarily flew a DJI
        Matrice 300 RTK, leading mapping missions across WashU's campus and
        other buildings to help create a 'digital twin' of the Campus. Combining
        photogrammetry and LiDAR, I applied SLAM-supported workflows to refine
        ground, building, and vegetation classes for accurate change detection,
        including seasonal foliage variation.
        <br />
        <br />
        In this role, I also helped lead WashU's Internal Space Audit program,
        which aims to revolutionize and greatly simplify space collection and
        management across WashU's many assets. Through the combination of
        collecting 360° imagery, GIS Surveys, and data collection and
        processing, I learned to optimize this project for scalability and to
        learn new technologies and hardware as they became available.
      </TextPanel>
    </PageShell>
  );
}

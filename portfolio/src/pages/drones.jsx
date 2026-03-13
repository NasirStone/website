import { useNavigate } from "react-router-dom";
import PageShell from "../components/PageShell.jsx";
import GalleryGrid from "../components/GalleryGrid.jsx";
import TextPanel from "../components/ui/TextPanel.jsx";

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
      <div
        style={{
          marginTop: "0.5rem",
          marginBottom: "1.5rem",
          fontSize: "0.8rem",
          opacity: 0.75,
          textAlign: "right",
          letterSpacing: "0.02em",
        }}
      >
        <em>
          Aerial imagery captured by Nasir Sims using a DJI Matrice 300 RTK with Zenmuse P1.
        </em>
      </div>

      <TextPanel marginTop="1rem" header={<span>{SECTION_HEADER}</span>}>
        In the summer of 2025, I flew DJI Drones for WashU's Facilities
        Department. I primarily flew a DJI Matrice 300 RTK, leading mapping
        missions across WashU's campus and other buildings to help create a
        'digital twin' of the Campus. Combining photogrammetry and LiDAR, I
        applied SLAM-supported workflows to refine ground, building, and
        vegetation classes for accurate change detection.
        <br />
        <br />
        In this role, I also helped lead WashU's Internal Space Audit program,
        which aims to greatly simplify space collection and management across
        WashU's buildings. Through the combination of collecting 360° imagery,
        GIS Surveys, and data processing and cleaning, I learned to optimize
        this project for scalability and learn new technologies and hardware as
        they became available.
      </TextPanel>
    </PageShell>
  );
}

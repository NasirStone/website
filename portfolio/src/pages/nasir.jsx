import { useNavigate } from "react-router-dom";
import PageShell from "../components/PageShell.jsx";
import TwoColumnLayout from "../components/layouts/TwoColumnLayout.jsx";
import FramedImage from "../components/ui/FramedImage.jsx";
import TextPanel from "../components/ui/TextPanel.jsx";

export default function NasirPage() {
  const navigate = useNavigate();
  const base = import.meta.env.BASE_URL;

  return (
    <PageShell title="Nasir Sims" onBack={() => navigate("/")}>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          padding: "clamp(16px, 3vw, 36px)",
          boxSizing: "border-box",
        }}
      >
        <TwoColumnLayout>
          <FramedImage
            src={`${base}images/about/Headshot.webp`}
            alt="Nasir headshot"
            size="420px"
            aspect="1 / 1"
          />

          <TextPanel title="About me">
            Hi, I'm Nasir! I'm a Junior studying Computer Science, with a minor
            in Film at Washington University in St. Louis.
            <br />
            <br />
            At WashU, I am involved in our High-Powered Rocketry team,
            WURocketry, where I serve as Chief Safety Officer. I also
            participated in an Autonomous Vehicle Research lab that aims to
            enhance safer agents through rapidly iterative simulations in CARLA,
            and a 1:8 scale city model. I also serve as an Information Security
            GRC Analyst for WashU's IT department, and I am a Teaching Assistant
            for MGT2001 - Introduction to Business Fundamentals.
            <br />
            <br />
            Outside of school, I love fixing things and getting my hands dirty.
            I repair anything from cars and bikes to vintage audio equipment. I
            love road trips (my longest was 6,000+ miles), I collect all
            different music formats, and I have a pet lizard whom I adore very
            much.
            <br />
            <br />I built this website not only to showcase my software
            projects, but also to reveal my interests. Thanks for visiting!
          </TextPanel>
        </TwoColumnLayout>
      </div>
    </PageShell>
  );
}

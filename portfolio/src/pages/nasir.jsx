import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PageShell from "../components/PageShell.jsx";
import FramedImage from "../components/ui/FramedImage.jsx";
import TextPanel from "../components/ui/TextPanel.jsx";

const HEADSHOT = "images/about/Headshot.webp";

const PAGE_WRAP_STYLE = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  padding: "clamp(16px, 3vw, 36px)",
  boxSizing: "border-box",
};

const BODY_TEXT_STYLE = {
  fontSize: "clamp(1.02rem, 3.6vw, 1.12rem)",
  lineHeight: 1.7,
  wordBreak: "break-word",
};

const CSS = `
  .aboutLayout {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: clamp(16px, 3vw, 28px);
  }
  @media (max-width: 820px) {
    .aboutLayout {
      flex-direction: column;
      align-items: center;
      gap: clamp(20px, 4vw, 36px);
    }
  }`;

export default function NasirPage() {
  const navigate = useNavigate();

  const base = import.meta.env.BASE_URL;
  const asset = useMemo(() => (p) => `${base}${p}`, [base]);

  return (
    <PageShell title="Nasir Sims" onBack={() => navigate("/")}>
      <div style={PAGE_WRAP_STYLE}>
        <style>{CSS}</style>

        <div className="aboutLayout">
          <FramedImage
            src={asset(HEADSHOT)}
            alt="Nasir headshot"
            size="clamp(260px, 88vw, 420px)"
            aspect="1 / 1"
          />

          <TextPanel title="About me">
            <div style={BODY_TEXT_STYLE}>
              Hi, I'm Nasir! I'm a Junior studying Computer Science, with a
              minor in Film & Media Studies at Washington University in St.
              Louis.
              <br />
              <br />
              At WashU, I am involved in our High Powered Rocketry team,
              WURocketry, where I serve as Chief Safety Officer. I was also
              involved in an Autonomous Vehicle Research lab that aims to
              develop safer agents through rapid, iterative simulations in CARLA
              and a 1:8 scale city model. I also serve as an Information
              Security GRC Analyst for WashU's IT department, and I am the Head
              Teaching Assistant for MGT2001 - Introduction to Business
              Fundamentals.
              <br />
              <br />
              Outside of school, I love fixing things and getting my hands
              dirty. I repair anything from cars and bikes, to vintage audio
              equipment. I love road trips (my longest was 6,000+ miles), I
              collect all different music formats, and I have a pet lizard.
              <br />
              <br />I built this website not only to showcase my software
              projects, but also to reveal my interests. Thanks for visiting!
            </div>
          </TextPanel>
        </div>
      </div>
    </PageShell>
  );
}

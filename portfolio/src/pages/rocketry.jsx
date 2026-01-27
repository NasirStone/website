import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageShell from "../components/PageShell.jsx";
import TextPanel from "../components/ui/TextPanel.jsx";
import { asset } from "../components/uiConstants.js";
import GalleryGrid from "../components/GalleryGrid.jsx";

const VIDEO_SRC = asset("videos/rocketry.mp4");
const LOGO_WHITE = asset("images/rocketry/logo.png");

const airbrakeImages = [
  "images/rocketry/Airbrakes Assembly Solo Retracted Top.webp", // 3
  "images/rocketry/Airbrakes Assembly Solo Extended Top.webp", // 1
  "images/rocketry/Airbrakes Assembly Solo Iso.webp", // 2
  "images/rocketry/FS_Assembled_Paddle.webp", // 4
];

const fullAssemblyImg = asset("images/rocketry/Full_Assembly.webp");
const fullAssemblyExplodedImg = asset(
  "images/rocketry/Full_Assembly_Exploded.webp"
);

function clamp01(x) {
  return Math.max(0, Math.min(1, x));
}

function heroProgress(el) {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight || 1;
  const scrollable = Math.max(1, rect.height - vh);
  return clamp01(-rect.top / scrollable);
}

function sectionProgress(el) {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight || 1;
  const total = Math.max(1, rect.height + vh);
  const raw = (vh - rect.top) / total;
  return clamp01(raw);
}

const KEYFRAMES = `
  @keyframes scrollHintFloat {
    0% { transform: translateY(0) rotate(45deg); opacity: 0.15; }
    40% { opacity: 0.75; }
    100% { transform: translateY(12px) rotate(45deg); opacity: 0; }
  }
`;

const styles = {
  pageWrap: {
    width: "100%",
    maxWidth: "100%",
    overflowX: "hidden",
    position: "relative",
    touchAction: "pan-y",
    fontSize: "1.08rem",
    lineHeight: 1.7,
  },
  centerRow: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  sectionHeading: {
    textAlign: "center",
    fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
    fontWeight: 700,
    letterSpacing: "-0.01em",
  },
  centeredPanelBody: {
    textAlign: "center",
    fontSize: "1.08rem",
    lineHeight: 1.7,
    opacity: 0.9,
  },
  constrainedBody: {
    maxWidth: "820px",
    margin: "0 auto",
    opacity: 0.95,
  },
};

function SectionHeading({ children, style }) {
  return <div style={{ ...styles.sectionHeading, ...style }}>{children}</div>;
}

function CenteredPanel({ title, children, panelStyle }) {
  return (
    <TextPanel
      title={title}
      style={{
        fontSize: "1.08rem",
        lineHeight: 1.7,
        textAlign: "center",
        ...(panelStyle || {}),
      }}
    >
      <div style={styles.constrainedBody}>{children}</div>
    </TextPanel>
  );
}

export default function RocketryPage() {
  const navigate = useNavigate();

  const stickyRegionRef = useRef(null);
  const assemblyRegionRef = useRef(null);

  const [p, setP] = useState(0); // 0..1 progress through sticky region
  const [a, setA] = useState(0); // 0..1 progress through assembly graphic region

  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;

      const heroEl = stickyRegionRef.current;
      if (heroEl) setP(heroProgress(heroEl));

      const assemblyEl = assemblyRegionRef.current;
      if (assemblyEl) setA(sectionProgress(assemblyEl));
    };

    const onTick = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };

    update();

    window.addEventListener("scroll", onTick, { passive: true });
    window.addEventListener("resize", onTick);

    return () => {
      window.removeEventListener("scroll", onTick);
      window.removeEventListener("resize", onTick);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  // Darken video as you scroll (smooth, non abrupt)
  const dim = 0.08 + p * 0.62; // ~0.08 -> ~0.70

  // Bring text in sooner (you should not have to scroll far)
  const textOpacity = clamp01((p - 0.06) / 0.22);
  const textLift = 12 * (1 - textOpacity);

  // Slight title fade as you scroll (optional, subtle)
  const titleOpacity = 0.86 - p * 0.18;

  // Scroll hint arrows (fade out quickly once user starts scrolling)
  const scrollHintOpacity = clamp01((0.14 - p) / 0.1);

  // Assembly dissolve
  const dissolveWindow = 0.13;
  const dissolveMid = 0.42; // earlier split
  const fullOpacity = clamp01((dissolveMid - a) / dissolveWindow + 0.5);
  const explodedOpacity = clamp01((a - dissolveMid) / dissolveWindow + 0.5);

  return (
    <PageShell title="" onBack={() => navigate("/")}>
      <div style={styles.pageWrap}>
        <style>{`
          .projectsRow {
            width: 100%;
            display: grid;
            grid-template-columns: 1.1fr 0.9fr;
            gap: 32px;
            align-items: start;
            position: relative;
          }
          .projectText {
            position: relative;
            z-index: 2;
          }
          .projectMedia {
            width: 100%;
            position: relative;
            z-index: 1;
          }
          @media (max-width: 720px) {
            .projectsRow {
              grid-template-columns: 1fr;
              gap: 14px;
            }
            .projectMedia { order: 1; }
            .projectText { order: 2; }
            .airbrakeRow .projectHero { display: none; }
          }
        `}</style>
        {/* Sticky video region: video does not move, content scrolls over it */}
        <section
          ref={stickyRegionRef}
          style={{ position: "relative", width: "100%", height: "110vh" }}
        >
          <div
            style={{
              position: "sticky",
              top: 0,
              height: "100vh",
              overflow: "hidden",
              borderRadius: 18,
            }}
          >
            <style>{KEYFRAMES}</style>

            <video
              src={VIDEO_SRC}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                filter: "saturate(1.05)",
              }}
            />

            {/* Scroll dimmer overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `rgba(0,0,0,${dim})`,
                transition: "background 420ms ease",
                pointerEvents: "none",
              }}
            />

            {/* Top fade so title reads cleanly */}
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                height: "120px",
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0))",
                pointerEvents: "none",
                opacity: 0.95,
              }}
            />

            {/* Title overlay (top-left) */}
            <div
              style={{
                position: "absolute",
                top: "20px",
                left: "22px",
                fontSize: "0.95rem",
                letterSpacing: "0.02em",
                opacity: titleOpacity,
                color: "rgba(255,255,255,0.90)",
                textShadow: "0 8px 24px rgba(0,0,0,0.45)",
                userSelect: "none",
                transition: "opacity 420ms ease",
              }}
            >
              Rocketry
            </div>

            {/* Top-right logo */}
            <img
              src={LOGO_WHITE}
              alt="WURocketry logo"
              style={{
                position: "absolute",
                top: "20px",
                right: "12px",
                height: "28px",
                width: "auto",
                opacity: 0.9,
                filter: "drop-shadow(0 6px 18px rgba(0,0,0,0.45))",
                userSelect: "none",
                pointerEvents: "none",
              }}
            />

            {/* Bottom fade (keeps the transition inside the frame) */}
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                height: "280px",
                pointerEvents: "none",
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.94) 100%)",
                opacity: 0.95,
              }}
            />

            {/* Scroll hint arrow */}
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: "clamp(96px, 2vh, 140px)",
                display: "flex",
                justifyContent: "center",
                pointerEvents: "none",
                opacity: scrollHintOpacity,
                transition: "opacity 320ms ease",
              }}
            >
              <span
                aria-hidden
                style={{
                  width: "14px",
                  height: "14px",
                  borderRight: "2px solid rgba(255,255,255,0.70)",
                  borderBottom: "2px solid rgba(255,255,255,0.70)",
                  opacity: 0.9,
                  animation: "scrollHintFloat 1200ms ease-in-out infinite",
                  filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.55))",
                }}
              />
            </div>

            {/* Text panel that appears over the video as you scroll */}
            <div
              style={{
                position: "absolute",
                left: "clamp(18px, 3vw, 36px)",
                right: "clamp(18px, 3vw, 36px)",
                bottom: "36px",
                display: "flex",
                justifyContent: "center",
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  width: "min(980px, 100%)",
                  opacity: textOpacity,
                  transform: `translateY(${textLift}px)`,
                  transition: "opacity 520ms ease, transform 520ms ease",
                  pointerEvents: "auto",
                }}
              >
                <TextPanel style={{ textAlign: "center", fontSize: "1.1rem" }}>
                  WURocketry is Washington University in St. Louis's
                  High-Powered Rocketry team. In my freshman year, I was a
                  member of the Avionics subteam, where I led the development of
                  a LoRa Telemetry Base Station to track flight parameters
                  during launch. In my sophomore year, I was a Co-Lead of the
                  Avionics subteam, where I helped develop our Airbrake Control
                  System and a full redesign of our camera system.
                  <br />
                  Now, as a junior, I serve as the team's Chief Safety Officer,
                  acting as the primary liaison between WURocketry and NASA
                  safety officials and ensuring compliance with NASA Student
                  Launch safety requirements.
                </TextPanel>
              </div>
            </div>
          </div>

          {/* Invisible end cap so the sticky region hands off smoothly */}
          <div aria-hidden style={{ height: "10vh" }} />
        </section>

        {/* Assembly graphic: cross-dissolve + subtle "pull apart" feel */}
        <section
          ref={assemblyRegionRef}
          style={{
            position: "relative",
            width: "100%",
            overflow: "hidden",
            padding: "clamp(8px, 1.6vw, 14px)",
            boxSizing: "border-box",
          }}
        >
          {/* Scroll room only for the sticky graphic */}
          <div style={{ height: "30vh", width: "100%", position: "relative" }}>
            <div
              style={{
                position: "sticky",
                top: "clamp(6px, 1.2vw, 12px)",
                width: "100%",
                borderRadius: 18,
                overflow: "hidden",
                marginTop: "-24px",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "16 / 4",
                  minHeight: "clamp(160px, 22vw, 260px)",
                }}
              >
                {/* Full assembly */}
                <img
                  src={fullAssemblyImg}
                  alt="Rocket full assembly"
                  loading="eager"
                  decoding="async"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    objectPosition: "center",
                    opacity: fullOpacity,
                    transform: `translateY(${(1 - fullOpacity) * 6}px) scale(${
                      1 + (1 - fullOpacity) * 0.01
                    })`,
                    transition:
                      "opacity 360ms ease-in-out, transform 360ms ease-in-out",
                    willChange: "opacity, transform",
                  }}
                />

                {/* Exploded view */}
                <img
                  src={fullAssemblyExplodedImg}
                  alt="Rocket exploded assembly"
                  loading="lazy"
                  decoding="async"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    objectPosition: "center",
                    opacity: explodedOpacity,
                    transform: `translateX(${
                      (1 - explodedOpacity) * -18
                    }px) scale(${1 + explodedOpacity * 0.01})`,
                    transition:
                      "opacity 360ms ease-in-out, transform 360ms ease-in-out",
                    willChange: "opacity, transform",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Rocket Overview */}
          <div
            style={{
              ...styles.centerRow,
              marginTop: "clamp(16px, 2.2vw, 24px)",
              marginBottom: "clamp(44px, 6vw, 72px)",
            }}
          >
            <div style={{ width: "min(1100px, 100%)" }}>
              <SectionHeading style={{ margin: "0 0 12px" }}>
                Ursa Major (2024-2025)
              </SectionHeading>
              <TextPanel style={styles.centeredPanelBody}>
                Ursa Major is WURocketry's 2024-2025 NASA Student Launch
                vehicle. Ursa is a reusable, innovative, high-powered rocket
                designed to fly repeatedly, recover cleanly, and serve as a
                platform for rapid improvement. The airframe and coupler are
                both made from G12 fiberglass, with an inner diameter of 6 in
                and a total length of 9.5ft. The vehicle's wet mass is ~48lbs.
                <br />
                <br />
                Inside, Ursa Major is built around instrumentation and
                recoverability. A dual-deploy recovery profile brings the rocket
                down in three tethered sections, with a drogue event near apogee
                and a main deployment around 550 ft AGL. The recovery
                electronics are redundant: a primary flight computer (TeleMega)
                handles the nominal sequence, while a secondary computer
                (EasyMini) fires backup events on offset timing to protect
                against single-point failures. The result is a vehicle that
                prioritises clean data, reliable deployment, and fast iteration.
                <br />
                <br />
                Ursa Major is also built around creative design challenges. The
                NASA Student Launch payload challenge is treated like a
                first-class subsystem, with dedicated space, interfaces, and
                wiring paths so integration does not feel like an afterthought.
                To ensure an accurate target altitude, the rocket also employs a
                feedforward airbrake control system that introduces controllable
                drag after burnout, letting us correct for motor variability and
                changing conditions. Finally, the onboard bi-directional camera
                system captures forward and aft footage, so we can validate
                deployment events and airbrake behaviour with visual evidence
                outside of datalogs.
                <br />
                <br />
              </TextPanel>
            </div>
          </div>
        </section>

        {/* Projects */}
        <div
          style={{
            ...styles.centerRow,
            padding: "clamp(10px, 2vw, 18px)",
            boxSizing: "border-box",
          }}
        >
          <div style={{ width: "min(1100px, 100%)", display: "grid", gap: 12 }}>
            <SectionHeading>My Projects</SectionHeading>

            <div className="projectsRow">
              <div className="projectMedia">
                <GalleryGrid
                  images={airbrakeImages}
                  columns={2}
                  aspect="1 / 1"
                  gap="14px"
                  objectFit="contain"
                  itemStyle={{
                    padding: "8px",
                    background: "var(--panel-bg)",
                  }}
                />
              </div>
              <div className="projectText">
                <CenteredPanel title="Airbrake Control System">
                  Our Airbrake Control System is a mechanism that dynamically
                  increases aerodynamic drag after motor burnout to control
                  rocket apogee. The system uses four radially mounted paddles
                  that extend into the airflow, allowing the vehicle to
                  compensate for motor performance, wind conditions, and mass.
                  <br />
                  <br />
                  As project lead, I directed the development of the system's
                  embedded control software. I spearheaded the implementation of
                  a feedforward control strategy using state estimation and
                  Kalman filtering to predict apogee in real time, complemented
                  by PID motor control for precise paddle positioning. Under my
                  leadership, the system underwent extensive bench tests,
                  elevator tests, and telemetry-driven validation to ensure
                  reliable deployment and retraction.
                  <br />
                  <br />
                </CenteredPanel>
              </div>
            </div>

            <div aria-hidden style={{ height: "clamp(12px, 2vw, 18px)" }} />

            <div className="projectsRow">
              <div className="projectMedia">
                <GalleryGrid
                  images={[
                    "images/rocketry/FS_Camera_Inserts.webp",
                    "images/rocketry/Zero_Spy_Camera.webp",
                  ]}
                  columns={1}
                  aspect="4 / 3"
                  gap="14px"
                  objectFit="contain"
                  itemStyle={{
                    padding: 0,
                    background: "transparent",
                    border: "none",
                    boxShadow: "none",
                    outline: "none",
                  }}
                />
              </div>

              <div className="projectText">
                <CenteredPanel
                  title="Bi-Directional Camera System"
                  panelStyle={{
                    boxShadow:
                      "0 14px 28px rgba(0,0,0,0.12), 0 2px 10px rgba(0,0,0,0.08)",
                    isolation: "isolate",
                    transform: "translateZ(0)",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    willChange: "transform",
                    backgroundClip: "padding-box",
                  }}
                >
                  Another project I took on was rebuilding our onboard camera
                  system. This redesign was necessary to more reliably capture
                  both forward and aft flight footage for post-flight analysis
                  and airbrake verification.
                  <br />
                  <br />
                  Our previous setup used off-the-shelf spy cameras mounted
                  externally, and they were a constant source of frustration. On
                  landing, they could shift or pop loose, and we would lose
                  footage necessary to validate deployment. I worked with
                  various subteams to redesign the system around Raspberry Pi
                  Zero modules with compact camera attachments, so everything
                  could be cleanly housed inside the rocket. Each unit boots
                  directly into recording using a lightweight startup script.
                  <br />
                  <br />
                  The biggest challenge was power and durability. We moved from
                  bulky power banks to the rocket's existing LiPo batteries,
                  then iterated on the connector design after we saw strain and
                  broken solder joints after flight. Once the hardware was
                  dependable, I focused on making the footage easy to retrieve.
                  By combining SSH access via hotspot with local encoding and
                  simple conversion scripts, we cut post-flight recovery from
                  hours down to seconds.
                </CenteredPanel>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

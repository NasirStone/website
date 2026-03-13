import { useNavigate } from "react-router-dom";
import PageShell from "../components/PageShell.jsx";
import TextPanel from "../components/ui/TextPanel.jsx";
import GalleryGrid from "../components/GalleryGrid.jsx";
import { asset } from "../components/uiConstants.js";

const ARTICLE_URL = "https://source.washu.edu/2023/10/model-av-testing/";
const REPO_URL = "https://github.com/NasirStone/nv-e2e-cl-ad";

const AV_MEDIA = {
  CARLA_LEFT_TURN: "images/autonomous/right_carla.webp",
  MINICITY_LEFT_TURN: "images/autonomous/right_mc.webp",
  ROS_2: "images/autonomous/nasir_av.webp",
  F1TENTH_PLATFORM: "images/autonomous/F1Tenth.webp",
};

const PAPER_DOWNLOADS = [
  {
    label: "End-to-End RL / Closed-Loop AD Report (PDF)",
    path: "papers/FL24_NV_E2E_RL_AD-2.pdf",
  },
  {
    label: "Classification Model Report (PDF)",
    path: "papers/Classification_Model_SP25.pdf",
  },
];

const BODY_TEXT_STYLE = {
  fontSize: "clamp(1.02rem, 3.9vw, 1.12rem)",
  lineHeight: 1.7,
};

const CAPTION_STYLE = {
  marginTop: "0.6rem",
  fontSize: "clamp(0.95rem, 3.4vw, 1.05rem)",
  lineHeight: 1.5,
  opacity: 0.85,
};

const BULLET_STYLE = {
  fontSize: "clamp(1.02rem, 3.9vw, 1.12rem)",
  lineHeight: 1.7,
};

const LINK_STYLE = {
  color: "var(--link)",
  textDecoration: "underline",
  textUnderlineOffset: "2px",
};

function ExtLink({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" style={LINK_STYLE}>
      {children}
    </a>
  );
}

function DownloadLink({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" style={LINK_STYLE}>
      {children}
    </a>
  );
}

export default function AutonomousVehiclesPage() {
  const navigate = useNavigate();

  return (
    <PageShell
      title="Autonomous Vehicles"
      onBack={() => navigate("/")}
      maxWidth="1700px"
    >
      <div style={{ width: "100%" }}>
        <style>{`
          @media (max-width: 900px) {
            .avGrid {
              grid-template-columns: 1fr !important;
            }
            .avGrid > div {
              grid-column: 1 / -1 !important;
            }
          }
          .miniCityRow {
            display: grid;
            gap: 1rem;
          }

          /* Two small images (thumbnail size) with a shared body paragraph underneath */
          .miniCityMediaRow {
            display: grid;
            grid-template-columns: auto auto;
            gap: 0.9rem;
            align-items: start;
            justify-content: end;
          }

          .miniCityMediaItem {
            min-width: 0;
            width: clamp(170px, 18vw, 230px);
          }

          .miniCitySplit {
            display: grid;
            grid-template-columns: 1fr auto;
            gap: 1.25rem;
            align-items: start;
          }

          .miniCityText {
            min-width: 0;
          }

          @media (max-width: 720px) {
            .miniCityMediaRow {
              grid-template-columns: 1fr;
              justify-content: stretch;
            }
            .miniCityMediaItem {
              width: min(320px, 92vw);
              margin-inline: auto;
            }
            .miniCitySplit {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
        {/* Summary */}
        <TextPanel
          marginTop="1rem"
          title="Autonomous Vehicle Research"
          header={
            <span>
              <ExtLink href={ARTICLE_URL}>WashU Feature</ExtLink>
              {" · "}
              <ExtLink href={REPO_URL}>Repository</ExtLink>
            </span>
          }
        >
          <div style={BODY_TEXT_STYLE}>
            In my sophomore year, I joined a research team focused on making
            autonomous driving systems safer by stress-testing them in
            simulation and on a 1:8-scale mini-city platform. With the goal of
            building repeatable scenarios, measuring failure modes, and then
            iterating on perception, planning, and control, we fine-tune the
            agent behavior consistently across new towns, lighting, weather,
            traffic, and more.
            <br />
            <br />
            {/* Visual comparison embedded in the narrative (CARLA vs Mini City) */}
            <div style={{ marginTop: "1rem" }}>
              <GalleryGrid
                images={[AV_MEDIA.CARLA_LEFT_TURN, AV_MEDIA.MINICITY_LEFT_TURN]}
                columns={2}
                aspect="16 / 9"
                gap="1rem"
              />
              <div style={CAPTION_STYLE}>
                Left: CARLA simulation intersection. Right: Similar turn
                geometry recreated in our physical Mini City environment.
              </div>
            </div>
            <br />
            My work spanned two threads: First, intersection handling in CARLA,
            where the agent must detect an upcoming intersection, choose the
            correct lane, and execute a clean left, right, or straight maneuver.
            Second, the transition from reinforcement learning-based control to
            a more modular perception-and-decision approach, including a turn
            classifier trained on labeled images.
          </div>
        </TextPanel>

        <div
          className="avGrid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <div style={{ gridColumn: "1 / -1" }}>
            <TextPanel title="F1TENTH / Mini City Platform">
              <div className="miniCityRow" style={{ marginTop: "0.75rem" }}>
                <div className="miniCitySplit">
                  <div className="miniCityText" style={BODY_TEXT_STYLE}>
                    Mini City let us repeatedly capture structured driving data
                    with lane markings, pedestrians, cars, foliage, and
                    controlled intersection geometry.
                    <br />
                    <br />
                    The platform is built on a Traxxas Rally 4WD chassis, with a
                    VESC-based electronic speed controller for the drive stack
                    and a Jetson Xavier NX onboard computer for perception and
                    autonomy. The primary sensor is a Logitech C920 USB camera,
                    and a SparkFun IMU provides acceleration and orientation
                    estimates for speed.
                    <br />
                    <br />
                    The software pipeline is ROS 2 end-to-end. The camera node
                    publishes frames, image transport republishes a compressed
                    stream for faster intra-ROS messaging, and the LaneNet-based
                    image processor turns each frame into lane geometry and a
                    trajectory to follow. An IMU driver node and a complementary
                    filter node refine inertial measurements, and the driver
                    stack consumes the perception outputs to generate continuous
                    steering and throttle commands.
                  </div>
                  <div className="miniCityMediaRow">
                    <div className="miniCityMediaItem">
                      <div
                        style={{
                          borderRadius: 0,
                          overflow: "hidden",
                          border: "2px solid var(--panel-border)",
                          background: "var(--panel-bg)",
                          aspectRatio: "1 / 1",
                        }}
                      >
                        <img
                          src={asset(AV_MEDIA.F1TENTH_PLATFORM)}
                          alt="F1TENTH platform hardware stack"
                          loading="lazy"
                          decoding="async"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                          }}
                        />
                      </div>
                      <div
                        style={{
                          marginTop: "0.5rem",
                          fontSize: "0.9rem",
                          opacity: 0.85,
                          lineHeight: 1.4,
                        }}
                      >
                        F1TENTH drive stack with onboard compute and sensors.
                      </div>
                    </div>

                    <div className="miniCityMediaItem">
                      <div
                        style={{
                          borderRadius: 0,
                          overflow: "hidden",
                          border: "2px solid var(--panel-border)",
                          background: "var(--panel-bg)",
                          aspectRatio: "1 / 1",
                        }}
                      >
                        <img
                          src={asset(AV_MEDIA.ROS_2)}
                          alt="F1TENTH platform running a ROS 2 vision pipeline"
                          loading="lazy"
                          decoding="async"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                          }}
                        />
                      </div>
                      <div
                        style={{
                          marginTop: "0.5rem",
                          fontSize: "0.9rem",
                          opacity: 0.85,
                          lineHeight: 1.4,
                        }}
                      >
                        ROS 2 vision-first pipeline on the F1TENTH platform.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TextPanel>
          </div>

          <div style={{ gridColumn: "span 6" }}>
            <TextPanel title="Intersection Handling in CARLA">
              <div style={BODY_TEXT_STYLE}>
                In CARLA, failure modes appear quickly. The agent would
                regularly drift wide on turns, cut corners, or miss the adjacent
                lane entirely on curves due to limited FOV. The project work
                centered on building a pipeline that can recognize an
                intersection early enough to choose the correct lane, then
                execute the maneuver smoothly without relying on a single (poor)
                heuristic.
                <br />
                <br />A key piece of this was the route planning logic that uses
                global map structure to anticipate junctions, instead of
                reacting only when lane markings change under the vehicle.
              </div>
            </TextPanel>
          </div>

          <div style={{ gridColumn: "span 6" }}>
            <TextPanel title="Classification Model for Turn Intent">
              <div style={BODY_TEXT_STYLE}>
                To make the system modular, I explored a simple supervised model
                that classifies a front-facing image as a left, right, or
                straight turn context. The classifier acts as a high level
                policy signal, with a separate control module responsible for
                steering and speed tracking. This separation makes it easier to
                debug and iterate, because you can improve perception without
                rewriting the controller.
                <br />
                <br />
                This work builds on earlier reinforcement learning experiments
                and helps bridge toward a pipeline that is easier to maintain
                and extend.
              </div>
            </TextPanel>
          </div>
        </div>

        <TextPanel marginTop="1rem" title="My Findings">
          <div style={{ ...BODY_TEXT_STYLE }}>
            <div style={{ display: "grid", gap: "0.65rem" }}>
              {PAPER_DOWNLOADS.map((p) => (
                <div key={p.path}>
                  <DownloadLink href={asset(p.path)}>{p.label}</DownloadLink>
                </div>
              ))}
            </div>
          </div>
        </TextPanel>
      </div>
    </PageShell>
  );
}

import { useNavigate } from "react-router-dom";
import PageShell from "../components/PageShell.jsx";
import TextPanel from "../components/ui/TextPanel.jsx";
import GalleryGrid from "../components/GalleryGrid.jsx";
import { asset } from "../components/uiConstants.js";

const ARTICLE_URL = "https://source.washu.edu/2023/10/model-av-testing/";
const REPO_URL = "https://github.com/NasirStone/nv-e2e-cl-ad";

const CARLA_LEFT_TURN = "images/autonomous/right_carla.webp";
const MINICITY_LEFT_TURN = "images/autonomous/right_mc.webp";

const ROS_2 = "images/autonomous/nasir_av.webp";

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

function ExtLink({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{
        color: "var(--link)",
        textDecoration: "underline",
        textUnderlineOffset: "2px",
      }}
    >
      {children}
    </a>
  );
}

function DownloadLink({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{
        color: "var(--link)",
        textDecoration: "underline",
        textUnderlineOffset: "2px",
      }}
    >
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
        `}</style>
        {/* Summary */}
        <TextPanel
          marginTop="1rem"
          title="Autonomous Driving Research"
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
            A key part of this workflow was data and labeling. We captured
            simulations in CARLA and on the physical Mini City environment.
            Then, we annotated frames to support supervised learning tasks. This
            made it easier to debug, as if the agent failed a left turn, we
            could trace it back to what the model saw and what the label
            pipeline expected.
            <br />
            <br />
            {/* Visual comparison embedded in the narrative (CARLA vs Mini City) */}
            <div style={{ marginTop: "1rem" }}>
              <GalleryGrid
                images={[CARLA_LEFT_TURN, MINICITY_LEFT_TURN]}
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
            My work spanned two threads. First, intersection handling in CARLA,
            where the agent must detect an upcoming intersection, choose the
            correct lane, and execute a clean left, right, or straight maneuver.
            Second, the transition from reinforcement learning-based control to
            a more modular perception-and-decision approach, including a turn
            classifier trained on labeled images.
          </div>
        </TextPanel>

        {/* Content blocks */}
        <div
          className="avGrid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <div style={{ gridColumn: "span 7" }}>
            <TextPanel title="F1TENTH / Mini City Platform">
              <div style={BODY_TEXT_STYLE}>
                The physical testbed is a small-scale vehicle running a ROS
                2-based stack with a vision-first pipeline. The on-car computer
                is a Jetson Xavier NX, and the primary sensor for autonomy is a
                forward camera, with IMU support available for state estimation.
                This setup lets us validate the same ideas in both simulation
                and a real environment with repeatable intersections and lane
                markings.
                <br />
                <br />
                Building on this setup, Mini City allows the platform to
                consistently capture data with lane markings, pedestrians, cars,
                foliage, and more.
                <br />
                <br />
                <div style={{ marginTop: "0.75rem" }}>
                  <div
                    style={{
                      fontSize: "0.9rem",
                      opacity: 0.85,
                      marginBottom: "0.5rem",
                    }}
                  ></div>
                  <div
                    style={{
                      borderRadius: 12,
                      overflow: "hidden",
                      border: "1px solid var(--panel-border)",
                      background: "var(--panel-bg)",
                      aspectRatio: "16 / 9",
                    }}
                  >
                    <img
                      src={asset(ROS_2)}
                      alt="Annotation example"
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
                </div>
              </div>
            </TextPanel>
          </div>

          <div style={{ gridColumn: "span 5" }}>
            <TextPanel title="What I Built and Improved">
              <div
                style={{
                  marginTop: "0.25rem",
                  ...BULLET_STYLE,
                  display: "grid",
                  gap: "0.55rem",
                }}
              >
                <div>
                  • Built a repeatable CARLA intersection testing suite across
                  towns and conditions
                </div>
                <div>
                  • Collected and labeled simulation and Mini City data for
                  supervised learning
                </div>
                <div>
                  • Defined and benchmarked intersection failure modes to guide
                  iteration
                </div>
                <div>
                  • Implemented a modular intersection handling pipeline
                  (perception → decision → control)
                </div>
                <div>
                  • Trained and evaluated a turn intent image classifier from
                  annotated frames
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
                To make the system more modular, I explored a simple supervised
                model that classifies a front-facing image (windshield) as a
                left, right, or straight turn context. The classifier acts as a
                high level policy signal, with a separate control module
                responsible for steering and speed tracking. This separation
                makes it easier to debug and iterate, because you can improve
                perception without rewriting the controller.
                <br />
                <br />
                This work builds on earlier reinforcement learning experiments
                and helps bridge toward a pipeline that is easier to maintain
                and extend.
              </div>
            </TextPanel>
          </div>
        </div>

        <TextPanel marginTop="1rem" title="My Research Papers">
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

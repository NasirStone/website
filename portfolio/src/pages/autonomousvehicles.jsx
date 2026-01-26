import { useNavigate } from "react-router-dom";
import PageShell from "../components/PageShell.jsx";
import TextPanel from "../components/ui/TextPanel.jsx";
import GalleryGrid from "../components/GalleryGrid.jsx";
import { asset } from "../components/uiConstants.js";

// External references
const ARTICLE_URL = "https://source.washu.edu/2023/10/model-av-testing/";
const REPO_URL = "https://github.com/NasirStone/nv-e2e-cl-ad";

const CARLA_LEFT_TURN = "images/autonomous/right_carla.webp";
const MINICITY_LEFT_TURN = "images/autonomous/right_mc.webp";

const ROS_2 = "images/autonomous/nasir_av.webp";

const PAPER_DOWNLOADS = [
  {
    label: "End-to-End RL / Closed-Loop AD (PDF)",
    path: "papers/FL24_NV_E2E_RL_AD-2.pdf",
  },
  {
    label: "Classification Model Report (PDF)",
    path: "papers/Classification_Model_SP25.pdf",
  },
];

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
        {/* Summary */}
        <TextPanel
          marginTop="1rem"
          title="Autonomous Driving Research"
          header={
            <span>
              CARLA Simulations, and F1TENTH testing
              {" · "}
              <ExtLink href={ARTICLE_URL}>WashU Feature</ExtLink>
              {" · "}
              <ExtLink href={REPO_URL}>Repository</ExtLink>
            </span>
          }
        >
          My sophomore year at WashU, I worked with a research group focused on
          making autonomous driving systems safer by stress testing them in
          simulation and on a 1/8 scale modular city platform. With the goal of
          building build repeatable scenarios, measure failure modes, then
          iterating on perception, planning, and control, we could fine-tune the
          agent behavior consistently across new towns, lighting, weather,
          traffic, and more.
          <br />
          <br />
          A key part of this workflow was data and labeling. We captured runs in
          CARLA and on the physical Mini City environment, then annotated frames
          to support supervised learning tasks (for example: turn intent at an
          upcoming junction). That made it easier to debug: when the agent
          failed a left turn, we could trace it back to what the model saw and
          what the label pipeline expected.
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
            <div
              style={{
                marginTop: "0.6rem",
                fontSize: "0.9rem",
                opacity: 0.85,
              }}
            >
              Left: CARLA simulation intersection. Right: similar turn geometry
              recreated in our physical Mini City environment.
            </div>
          </div>
          <br />
          My work spaned two threads. First, intersection handling in CARLA,
          where the agent must detect an upcoming junction, choose the correct
          lane, and execute a clean left or right maneuver. Second, the
          transition from reinforcement learning based control toward a more
          modular perception plus decision approach, including a turn classifier
          trained on labeled images.
        </TextPanel>

        {/* Content blocks */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <div style={{ gridColumn: "span 7" }}>
            <TextPanel title="F1TENTH Mini City platform">
              The physical testbed is a small scale vehicle running a ROS 2
              based stack with a vision first pipeline. The on car computer is a
              Jetson Xavier NX, and the primary sensor for autonomy is a forward
              camera, with IMU support available for state estimation. This
              setup let us validate the same ideas in both simulation and a real
              environment with repeatable intersections and lane markings.
              <br />
              <br />
              I focused on keeping the workflow practical: reliable bring up,
              consistent data capture, and a clear interface between perception
              outputs and the control layer.
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
            </TextPanel>
          </div>

          <div style={{ gridColumn: "span 5" }}>
            <TextPanel title="What I Built and Improved">
              <div style={{ marginTop: "0.25rem" }}>
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
            <TextPanel title="Intersection handling in CARLA">
              In CARLA, the failure modes show up quickly: drifting wide on
              turns, cutting corners, or missing the adjacent lane on curves due
              to limited field of view. The project work centered on building a
              pipeline that can recognize an intersection early enough to choose
              the correct lane, then execute the maneuver smoothly without
              relying on a single brittle heuristic.
              <br />
              <br />A key piece of this was route planning logic that uses
              global map structure to anticipate junctions, instead of reacting
              only when lane markings change under the vehicle.
            </TextPanel>
          </div>

          <div style={{ gridColumn: "span 6" }}>
            <TextPanel title="Classification model for turn intent">
              To make the system more modular, I explored a simple supervised
              model that classifies a front facing image as a left or right turn
              context. The classifier can act as a high level policy signal,
              with a separate control module responsible for steering and speed
              tracking. This separation makes it easier to debug and iterate,
              because you can improve perception without rewriting the
              controller.
              <br />
              <br />
              This work builds on earlier reinforcement learning experiments and
              helps bridge toward a pipeline that is easier to maintain and
              extend.
            </TextPanel>
          </div>
        </div>

        <TextPanel marginTop="1rem" title="My Research Papers">
          <div style={{ display: "grid", gap: "0.5rem" }}>
            {PAPER_DOWNLOADS.map((p) => (
              <div key={p.path}>
                <DownloadLink href={asset(p.path)}>{p.label}</DownloadLink>
              </div>
            ))}
          </div>
        </TextPanel>
      </div>
    </PageShell>
  );
}

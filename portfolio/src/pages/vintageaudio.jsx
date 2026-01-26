import { useNavigate } from "react-router-dom";
import PageShell from "../components/PageShell.jsx";
import TextPanel from "../components/ui/TextPanel.jsx";
import { MONO } from "../components/uiConstants.js";
import GalleryGrid from "../components/GalleryGrid.jsx";

export default function VintageAudioPage() {
  const navigate = useNavigate();
  return (
    <PageShell
      title="Vintage Audio"
      onBack={() => navigate("/")}
      // Keep this page a bit wider; images breathe more.
      maxWidth="1750px"
    >
      <GalleryGrid
        images={["images/vintageaudio/av_setup.webp"]}
        columns={1}
        aspect="16 / 9"
      />
      <TextPanel
        marginTop="1rem"
        header={
          <span style={{ fontFamily: MONO }}>Vintage Audio Repair Log</span>
        }
      >
        I have always loved fixing things, but this hobby usually consisted of
        physical and mechanical items (cars, bikes, computers). As I grew my
        physical media collection to over 150+ items in all different formats,
        it was only a matter of time that obtaining the devices to play them
        would also pique my interest. While electical engineering has never been
        my forte, I have gained so much knowledge through trial-and-error and
        self-learning. What I love about fixing vintage technology is that it is
        generally built with much more care, and servicability in mind. While
        the parts may be difficult to source at times, there exists a dedicated
        and passionate community who are always avaialble to ask for help.
        <br />
        <br />
        The list below serves as an updating log of the audio projects I own:
      </TextPanel>
      <TextPanel marginTop="1rem" title="My Repair Projects">
        <div style={{ display: "grid", gap: "1.5rem", maxWidth: "900px" }}>
          <div>
            <div style={{ fontWeight: 700, marginBottom: "0.25rem" }}>
              Sony Separates{" "}
              <span style={{ opacity: 0.75 }}>
                (Sony TA AV421, Sony TC WR31, Sony CDP C221, Sony ST S222)
              </span>
            </div>
            <div style={{ opacity: 0.9 }}>
              <b>Condition:</b> Power surge; none of the units powered on.
              <br />
              <b>Work:</b> Visual inspection, capacitor checks against wiring
              diagram, and first-pass diagnosis.
              <br />
              <b>Status:</b> On hold.
            </div>
            <div style={{ marginTop: "0.75rem" }}>
              <GalleryGrid
                images={["images/vintageaudio/sony.webp"]}
                columns={2}
                aspect="4 / 3"
              />
            </div>
          </div>

          <div>
            <div style={{ fontWeight: 700, marginBottom: "0.25rem" }}>
              Sony Walkman <span style={{ opacity: 0.75 }}>(WM-4)</span>
            </div>
            <div style={{ opacity: 0.9 }}>
              <b>Condition:</b> Battery corrosion and tape transport issues
              resulting in destroyed tape.
              <br />
              <b>Work:</b> Cleaned terminals, powered via DC adapter, teardown
              for transport diagnosis and cleaning.
              <br />
              <b>Status:</b> Disassembled.
            </div>
            <div style={{ marginTop: "0.75rem" }}>
              <GalleryGrid
                images={["images/vintageaudio/walkman.webp"]}
                columns={2}
                aspect="4 / 3"
              />
            </div>
          </div>

          <div>
            <div style={{ fontWeight: 700, marginBottom: "0.25rem" }}>
              Pioneer Receiver <span style={{ opacity: 0.75 }}>(SX-650)</span>
            </div>
            <div style={{ opacity: 0.9 }}>
              <b>Condition:</b> Phono channel inoperable, peeling wood veneer.
              <br />
              <b>Work:</b> Internal clean, potentiometer cleaning, recap /
              rebuild planned.
              <br />
              <b>Status:</b> On hold.
            </div>
            <div style={{ marginTop: "0.75rem" }}>
              <GalleryGrid
                images={["images/vintageaudio/pioneer.webp"]}
                columns={2}
                aspect="4 / 3"
              />
            </div>
          </div>

          <div>
            <div style={{ fontWeight: 700, marginBottom: "0.25rem" }}>
              Nakamichi Cassette Deck{" "}
              <span style={{ opacity: 0.75 }}>(CR-1A)</span>
            </div>
            <div style={{ opacity: 0.9 }}>
              <b>Condition:</b> Unknown
              <br />
              <b>Work:</b> Not performed.
              <br />
              <b>Status:</b> On Hold.
            </div>
            <div style={{ marginTop: "0.75rem" }}>
              <GalleryGrid
                images={["images/vintageaudio/nakamichi.webp"]}
                columns={2}
                aspect="4 / 3"
              />
            </div>
          </div>
        </div>
      </TextPanel>
      <div
        style={{
          marginTop: "1.25rem",
          fontSize: "0.9rem",
          opacity: 0.6,
          maxWidth: "900px",
        }}
      ></div>
    </PageShell>
  );
}

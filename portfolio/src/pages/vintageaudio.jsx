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
        <div
          style={{
            fontSize: "clamp(1.02rem, 3.6vw, 1.12rem)",
            lineHeight: 1.7,
            wordBreak: "break-word",
          }}
        >
          I have always loved fixing things, but this hobby has usually
          consisted of mechanical objects (cars, bikes, computers). As I grew my
          physical music collection to over 150+ items in all different formats,
          it was only a matter of time before obtaining the devices to play them
          would pique my interest. Electrical work has never been my forte, but
          taking on these projects has given me so much knowledge through trial
          and error and self-learning. What I love most about fixing vintage
          technology is that it is generally built with much more care and
          serviceability in mind. While parts may be difficult to source at
          times, there is often a dedicated and passionate community that is
          always available to help with any device.
          <br />
          <br />
          The list below serves as an updated log of the audio projects I have:
        </div>
      </TextPanel>
      <TextPanel marginTop="1rem" title="My Repair Projects">
        <div
          style={{
            display: "grid",
            gap: "1.75rem",
            maxWidth: "900px",
            fontSize: "clamp(1.0rem, 3.4vw, 1.1rem)",
            lineHeight: 1.65,
            wordBreak: "break-word",
          }}
        >
          <div>
            <div style={{ fontWeight: 700, marginBottom: "0.25rem" }}>
              Sony Separates{" "}
              <span style={{ opacity: 0.75 }}>
                (Sony TA AV421, Sony TC WR31, Sony CDP C221, Sony ST S222)
              </span>
            </div>
            <div style={{ opacity: 0.9, lineHeight: 1.65 }}>
              <b>Condition:</b> Seller stated was affected by power surge; none
              of the units power on.
              <br />
              <b>Work:</b> After a visual inspection, no capacitors are blown
              (verified with multimeter against capacitance values). <br />
              Checks against wiring diagram in progress.
              <br />
              <b>Status:</b> On hold.
            </div>
            <div style={{ marginTop: "0.75rem" }}>
              <GalleryGrid
                images={["images/vintageaudio/sony.webp"]}
                columns={2}
                aspect="4 / 3"
                responsive
              />
            </div>
          </div>

          <div>
            <div style={{ fontWeight: 700, marginBottom: "0.25rem" }}>
              Sony Walkman <span style={{ opacity: 0.75 }}>(WM-4)</span>
            </div>
            <div style={{ opacity: 0.9, lineHeight: 1.65 }}>
              <b>Condition:</b> Heavy battery corrosion, tape transport issues,
              high-pitched output. Destroyed my favorite tape.
              <br />
              <b>Work:</b> Removed, cleaned, and reinstalled battery terminals,{" "}
              teardown for transport diagnosis and cleaning after first test.
              <br />
              <b>Status:</b> Disassembled.
            </div>
            <div style={{ marginTop: "0.75rem" }}>
              <GalleryGrid
                images={["images/vintageaudio/walkman.webp"]}
                columns={2}
                aspect="4 / 3"
                responsive
              />
            </div>
          </div>

          <div>
            <div style={{ fontWeight: 700, marginBottom: "0.25rem" }}>
              Pioneer Receiver <span style={{ opacity: 0.75 }}>(SX-650)</span>
            </div>
            <div style={{ opacity: 0.9, lineHeight: 1.65 }}>
              <b>Condition:</b> Phono channel inoperable, peeling wood veneer,
              rust.
              <br />
              <b>Work:</b> Internals cleaned, potentiometers cleaned, re-cap
              planned.
              <br />
              <b>Status:</b> On hold.
            </div>
            <div style={{ marginTop: "0.75rem" }}>
              <GalleryGrid
                images={["images/vintageaudio/pioneer.webp"]}
                columns={2}
                aspect="4 / 3"
                responsive
              />
            </div>
          </div>

          <div>
            <div style={{ fontWeight: 700, marginBottom: "0.25rem" }}>
              Nakamichi Cassette Deck{" "}
              <span style={{ opacity: 0.75 }}>(CR-1A)</span>
            </div>
            <div style={{ opacity: 0.9, lineHeight: 1.65 }}>
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
                responsive
              />
            </div>
          </div>
        </div>
      </TextPanel>
      <div
        style={{
          marginTop: "1.25rem",
          fontSize: "clamp(0.95rem, 3.2vw, 1.05rem)",
          opacity: 0.6,
          maxWidth: "900px",
        }}
      ></div>
    </PageShell>
  );
}

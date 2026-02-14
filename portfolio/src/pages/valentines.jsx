import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PageShell from "../components/PageShell.jsx";
import GalleryGrid from "../components/GalleryGrid.jsx";
import TextPanel from "../components/ui/TextPanel.jsx";
import { MONO, asset } from "../components/uiConstants.js";

// ====== Update these with your own assets ======
const HERO_IMAGE = "images/valentines/bikestop.webp";
const GALLERY_IMAGES = [
  "images/valentines/bear.webp",
  "images/valentines/yeehaw.webp",
  "images/valentines/art.webp",
  "images/valentines/wine.webp",
];

const NOTE_LINES = [
  "Happy Valentine's Day!",
  "I love you so much, and even though we're apart, I had to figure out the strangest way to show my appreication for you",
  "And I love going through photos of you :)",
];

function HeartField({ isLight }) {
  const hearts = useMemo(() => {
    return Array.from({ length: 16 }).map((_, i) => {
      const left = Math.round(Math.random() * 1000) / 10;
      const top = Math.round(Math.random() * 1000) / 10;
      const size = 10 + Math.round(Math.random() * 18);
      const delay = Math.round(Math.random() * 1200) / 100;
      const dur = 10 + Math.round(Math.random() * 60) / 10;
      const drift = -8 + Math.round(Math.random() * 16);
      return { i, left, top, size, delay, dur, drift };
    });
  }, []);

  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0 }}>
      {hearts.map((h) => (
        <div
          key={h.i}
          className="vHeart"
          style={{
            left: `${h.left}%`,
            top: `${h.top}%`,
            fontSize: `${h.size}px`,
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.dur}s`,
            transform: `translate(${h.drift}px, 0)`,
            color: isLight ? "rgba(18,10,12,0.20)" : "rgba(255,255,255,0.16)",
          }}
        >
          ♥
        </div>
      ))}
    </div>
  );
}

export default function ValentinesPage() {
  const navigate = useNavigate();

  const isLight =
    typeof window !== "undefined" &&
    getComputedStyle(document.documentElement)
      .getPropertyValue("--page-bg")
      .toLowerCase()
      .includes("#f");

  const KEYFRAMES = `
    .valWrap { position: relative; width: 100%; }

    .valHeader {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 1rem;
      margin-bottom: 0.85rem;
    }

    .valTitle {
      font-family: ${MONO};
      font-size: 0.92rem;
      opacity: 0.92;
      letter-spacing: 0.02em;
      text-transform: uppercase;
    }

    .valSub {
      font-family: ${MONO};
      font-size: 0.85rem;
      opacity: 0.78;
      text-align: right;
      white-space: nowrap;
    }

    .valGrid {
      display: grid;
      grid-template-columns: 1.1fr 0.9fr;
      gap: 1rem;
      align-items: start;
    }

    .valHero {
      border: 3px solid var(--panel-border);
      background: var(--panel-bg);
      overflow: hidden;
      border-radius: 0;
      aspect-ratio: 16 / 9;
    }

    .valHero img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .noteBox {
      border: 3px solid var(--panel-border);
      background: var(--panel-bg);
      border-radius: 0;
      padding: 1rem;
    }

    .noteLine {
      font-family: ${MONO};
      font-size: 0.92rem;
      line-height: 1.6;
      opacity: 0.9;
    }

    .noteLine + .noteLine { margin-top: 0.55rem; }

    .tinyLabel {
      font-family: ${MONO};
      font-size: 0.78rem;
      opacity: 0.72;
      margin-bottom: 0.55rem;
      text-transform: uppercase;
      letter-spacing: 0.02em;
    }

    .vHeart {
      position: absolute;
      animation-name: floatUp;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
      user-select: none;
      pointer-events: none;
    }

    @keyframes floatUp {
      0% { transform: translateY(10px); opacity: 0; }
      10% { opacity: 1; }
      60% { opacity: 0.8; }
      100% { transform: translateY(-140px); opacity: 0; }
    }

    .valDivider {
      height: 0;
      border-top: 2px solid var(--shell-border);
      opacity: 0.6;
      margin: 1.15rem 0;
    }

    .valTwoCol {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      align-items: start;
    }

    .valCard {
      border: 3px solid var(--panel-border);
      background: var(--panel-bg);
      border-radius: 0;
      padding: 1rem;
    }

    .valCardTitle {
      font-family: ${MONO};
      font-size: 0.86rem;
      text-transform: uppercase;
      letter-spacing: 0.02em;
      opacity: 0.85;
      margin-bottom: 0.55rem;
    }

    .valCardBody {
      font-size: 1rem;
      line-height: 1.65;
      opacity: 0.92;
    }

    .asciiHeart {
      font-family: ${MONO};
      white-space: pre;
      font-size: 0.95rem;
      line-height: 1.15;
      opacity: 0.9;
    }

    @media (max-width: 900px) {
      .valGrid { grid-template-columns: 1fr; }
      .valSub { display: none; }
      .valTwoCol { grid-template-columns: 1fr; }
    }
  `;

  return (
    <PageShell
      title="Valentines"
      onBack={() => navigate("/")}
      maxWidth="1200px"
    >
      <div className="valWrap">
        <style>{KEYFRAMES}</style>
        <HeartField isLight={isLight} />

        <div className="valHeader">
          <div className="valTitle">Happy Valentines Day, my love!</div>
        </div>

        <div className="valGrid">
          <div>
            <div className="valHero">
              <img
                src={asset(HERO_IMAGE)}
                alt="Valentines hero"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </div>
          </div>

          <div>
            <div className="noteBox">
              {NOTE_LINES.map((line, idx) => (
                <div key={idx} className="noteLine">
                  {line}
                </div>
              ))}
              <div className="valDivider" />
              <div className="asciiHeart">{`  .:::.   .:::.
 :::::::.::::::
 ::::::::::::::
 '::::::::::::'
   '::::::::'
     '::::'
       ':'`}</div>
            </div>
          </div>
        </div>

        <div className="valDivider" />

        <TextPanel
          title="Some of my favorite memories"
          header={<span style={{ fontFamily: MONO }}></span>}
          style={{ borderRadius: 0, border: "3px solid var(--panel-border)" }}
        >
          <div style={{ display: "grid", gap: "0.8rem" }}>
            <div>
              1. I loved going to Build-A-Bear with you this past semester
              because it brought so much childlike wonder in your eyes, and
              seeing that was so beautiful. Although I do think the process of
              stuffing the husk of the bear was interesting, I had so much fun
              doing it with you. There are so many great photos we took from
              that time, but this one is my favorite becasue of your big smile,
              and the unmistakeable light in your eyes
              <br />
              <br />
              2. I think you look so absolutely gorgeous in this photo. I like
              this time because it was the start of the semester, and I think we
              were in a very good place then. Not that we are not in a good
              place now, but think about it: The truck was working perfectly, we
              were going on a cool new date, and we got Fork & Stix! At last, at
              least it wasn't on our anniversary ;)
              <br />
              <br />
              3. This photo is simply amazing. The way the leaves hit the sun
              and form a heart in front of you is just so beautiful. The
              symmetry of it all! And you! Simply stunning. Always, of course. I
              love how you never complain when I ask to take your photo. There
              are millions of moments that I want to capture of you at any time.
              I wonder why I don't have 1,000,000 photos of you yet...
              <br />
              <br />
              4. Last, but certiantly not least, is one of my all time
              favorites. The first photo of us! I remember so much and so little
              from that night, but I remember when that photo was taken and
              thinking to myself "this is crazy. I was with a beautiful girl
              (and I think she likes me)." To think that we have done so much in
              the almost two years we have been together is crazy. Sometimes I
              wish I could go back in time and be there with you again, but
              every time I think of you I'm reminded how I felt in that moment.
            </div>
            <div></div>
          </div>
        </TextPanel>

        <div className="valDivider" />
        <GalleryGrid images={GALLERY_IMAGES} columns={2} aspect="1 / 1" />
        <TextPanel
          title="Some things I want you to know"
          style={{ borderRadius: 0, border: "3px solid var(--panel-border)" }}
        >
          <ul style={{ margin: 0, paddingLeft: "1.15rem", lineHeight: 1.65 }}>
            <li>
              Your letter is coming, and will be printed out for you to read
              when I see you in person.
            </li>
            <li>
              I love you so much, more than you will ever know or comprehend.
            </li>
            <li>When I see you next, it is going dooooooown.</li>
            <li>I love you! (I did I say that already?)</li>
          </ul>
        </TextPanel>
      </div>
    </PageShell>
  );
}

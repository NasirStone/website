import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageShell from "../components/PageShell.jsx";
import TextPanel from "../components/ui/TextPanel.jsx";
import { asset } from "../components/uiConstants.js";

function isVideoSrc(src) {
  return /\.(mp4|webm|mov)$/i.test(src || "");
}

const TIMELINE_TRIGGER_Y = 140;
const JUMP_LOCK_MS = 900;

// -------------------- TRAVEL DATA --------------------

const TRAVEL_ENTRIES = [
  {
    id: "Europe-2023",
    date: "Summer 2023",
    title: "Füssen, Germany",
    images: ["images/travel/IMG_3564.webp", "images/travel/IMG_3636.webp"],
    body: (
      <>
        In the summer of 2023, my dad and I travelled to Füssen, Germany to
        visit my great aunt, Linda. We spent most of our days biking in the tall
        and beautiful mountians, and even crossed into Austria accidentally. It
        was my first time travelling in Europe, and I was entralled by the
        cleanliness, beautiful nature, and healthy food.
      </>
    ),
  },
  {
    id: "barcelona-paris",
    date: "Summer 2023",
    title: "Barcelona, Spain & Paris, France",
    images: ["images/travel/F1.mp4", "images/travel/IMG_3967.webp"],
    body: (
      <>
        Right after travelling in Germany, I met up with my best friend Conor,
        and we flew to Barcelona, Spain on the cheapest Ryanair, and stayed in
        an even cheaper hostel. The coolest thing we did by far was seeing the
        Formula 1 AWS Gran Premio de España 2023. We bought tickets for the
        general field, but with some social engineering, snuck into the only two
        seats left in the Grand Stands to catch great views of the cars racing.
      </>
    ),
  },
  {
    id: "portland",
    date: "Spring 2024",
    title: "Portland, OR",
    images: ["images/travel/DSC_6292.webp", "images/travel/img_7589.webp"],
    body: (
      <>
        During 2024 Spring Break, my friends Jack, Conor and I stayed with our
        friend Lucas's house in Portland, Oregon. The beauty of Oregon was so
        unfamiliar from the flatness I experience in Illinois. We had access to
        a car, so we got to drive around and visit the Japanese Gardens,
      </>
    ),
  },
  {
    id: "johnson",
    date: "Spring 2024",
    title: "Johnson Shut-Ins, MO",
    images: ["images/travel/IMG_0174.webp", "images/travel/IMG_8196.webp"],
    body: (
      <>
        The weekend before finals, my girlfriend Gabbi, and our other friend
        couple, Isabella and Andre drove an hour South to the Johnson Shut-Ins
        in Missouri to camp for two nights, hike, and swim in the flowing
        rivers. When we arrived, it was pouring rain, which resulted in a
        "red-flag" warning for the shut-in, meaning no one should enter. We did
        anyways, and learned quickly that we should have heeded the warning
        after almost immediately being swept away.
      </>
    ),
  },
  {
    id: "big-road-trip",
    date: "Summer 2024",
    title: "Western US Road Trip",
    images: [
      "images/travel/20240517_195933_1EA5D8.webp",
      "images/travel/20240517_200058_135BF1.webp",
      "images/travel/20240524_074129_19641A.webp",
      "images/travel/20240525_042043_1A097F.webp",
    ],
    body: (
      <>
        This road trip was and likely will be the most intense trip I have ever
        gone on. For two weeks, 7 friends and I loaded up an entire mini-van,
        and drove it 6000+ miles throughout the western US. We camped all but
        one night, and visited numerous national parks including: The Grand
        Tetons, Yellowstone, Crater Lake, Hoh Rainforest, Olympic, and Redwoods.
        We started in Lawrence, Kansas, and drove through 12 states. Besides a
        flat tire on the first day, we encountered very little problems!
      </>
    ),
  },
  {
    id: "puerto-rico",
    date: "Spring 2025",
    title: "Puerto Rico",
    images: [
      "images/travel/DSC00415.webp",
      "images/travel/DSC00213.webp",
      "images/travel/DSC00307.webp",
      "images/travel/IMG_0489.webp",
    ],
    body: (
      <>
        For our Spring Break, Gabbi, Isabella, Andre and I flew to Puerto Rico
        to spend our vacation. We went to the beach every day, explored many
        musesums, and went cliff jumping through a rainforest excursion. The
        food there was also terrific, I am very much looking forward to going
        back one day!
      </>
    ),
  },
  {
    id: "vermont-road-trip",
    date: "Summer 2025",
    title: "Chicago → Canada → Vermont",
    images: ["images/travel/IMG_8243.webp", "images/travel/DSCF0727.webp"],
    body: (
      <>
        In the early summer of 2025, Conor was heading out to Burlington,
        Vermont to start his internship at BETA Technologies. He of course
        needed a car there, so what better vehicle to bring down than his 1996
        Japanese Kei Truck? Only one condition: Do it all using paper maps. With
        our North America Atlas in hand, we started the 1,000 mile journey from
        Evanston, IL to Burlington, Vermont. We stopped in Detroit, Michigan,
        Toronto, Canada, and Montréal, Quebec before reaching our final
        destination. The truck only broke down once, after we hit a large puddle
        which sucked water into our air filter, causing the engine to stall.
        Montréal was our favorite stop, where we spent two nights there, and
        explored the city and hiked Mount Royale.
      </>
    ),
  },
  {
    id: "texas",
    title: "San Francisco, CA → Houston, TX",
    images: ["images/travel/DSC01120.webp"],
    body: (
      <>
        In the last week of summer, Conor was gearing up for his Co-Op at NASA
        in Houston, Texas, but he knew his mini-truck wouldn't be a viable daily
        driver, so he purchased a 1984 Volkwagen Westfalia camper van. Us plus
        our best-friend Jack flew to San-Francisco to pick it up, and drive it
        the 1,500 miles to Houston, Texas in 4 days. Averageing 8-10 hours of
        driving per day, we travlled the flatlands of Texas in our untested
        vehicle with no working taillight assembly. We stopped in two Texas
        state parks, and one hotel, and made it to Houston with barely enough
        time to catch our flights back home.
      </>
    ),
  },
  {
    id: "ozarks",
    date: "Fall 2025",
    title: "Lake of the Ozarks, MO",
    images: ["images/travel/IMG_0653.webp"],
    body: (
      <>
        For Fall Break, 8 friends and I packed two sedans for the 3 hour drive
        from WashU to the Lake of the Ozarks, MO. We rented an AirBNB for 4
        nights, bought groceries the first night, and felt what it was like to
        truly unwind after a tough start to our Junior Year. We swam in the
        water every day, cooked every night, played board games, and told
        stories by the fire. It was nice to know that such a tranquil place
        exists not too far from our school.{" "}
      </>
    ),
  },
  {
    id: "edinburgh",
    date: "Today",
    title: "Study Abroad at The University of Edinburgh",
    images: [
      "images/travel/IMG_0399.webp",
      "images/travel/IMG_0360.webp",
      "images/travel/IMG_0293.webp",
      "images/travel/IMG_0107.webp",
    ],
    body: (
      <>
        I am currently an exchange studnt at The University of Edinburgh, where
        I am continuing my study of Computer Science. It has been such an
        amazing experinece to explore a new country. Edinburgh, UK is an amazing
        city full of vibrant culture, amazing nature, and so much rain. While
        abroad, I have a few trips planned such as going to Dublin, Paris,
        Barcelona, London, and more.
      </>
    ),
  },
];

// -------------------- HELPERS --------------------

function resolveSrc(src) {
  return asset(src);
}

// -------------------- COMPONENTS --------------------

function MediaTile({ src, eager }) {
  // eager: boolean, for first image/video only
  if (isVideoSrc(src)) {
    return (
      <video
        src={resolveSrc(src)}
        muted
        loop
        playsInline
        autoPlay
        preload={eager ? "auto" : "metadata"}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
    );
  }
  return (
    <img
      src={resolveSrc(src)}
      alt=""
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
      }}
    />
  );
}

function TimelineItem({ entry, idx, isActive, onJump, isLast, btnRef }) {
  return (
    <button
      ref={isLast ? btnRef : null}
      key={entry.id}
      onClick={() => onJump(idx)}
      style={{
        width: "100%",
        textAlign: "left",
        background: "transparent",
        border: "none",
        padding: "14px 8px 14px 0",
        cursor: "pointer",
        color: "var(--fg)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "18px 1fr",
          gap: "10px",
          alignItems: "start",
          position: "relative",
        }}
      >
        {/* tick */}
        <div
          aria-hidden
          style={{
            width: "12px",
            height: "2px",
            marginTop: "9px",
            borderRadius: 2,
            background: isActive ? "var(--fg)" : "var(--panel-border)",
            opacity: isActive ? 0.95 : 0.55,
            boxShadow: isActive ? "0 10px 22px rgba(0,0,0,0.20)" : "none",
            transition: "background 220ms ease, opacity 220ms ease",
          }}
        />

        <div style={{ opacity: isActive ? 1 : 0.78 }}>
          <div
            style={{
              fontSize: "0.85rem",
              opacity: 0.8,
              marginBottom: "2px",
            }}
          >
            {entry.date}
          </div>
          <div style={{ fontWeight: 700 }}>{entry.title}</div>
        </div>
      </div>
    </button>
  );
}

function EntrySection({ entry, idx, sectionRef, markerRef }) {
  return (
    <section
      key={entry.id}
      ref={sectionRef}
      style={{
        scrollMarginTop: "110px",
        paddingBottom: "clamp(18px, 3vw, 28px)",
      }}
    >
      <div
        style={{
          fontSize: "0.85rem",
          opacity: 0.75,
          marginBottom: "8px",
        }}
      >
        {entry.date}
      </div>

      <div
        style={{
          fontSize: "clamp(1.4rem, 2.2vw, 2.1rem)",
          fontWeight: 800,
          letterSpacing: "-0.01em",
          marginBottom: "10px",
        }}
      >
        {entry.title}
      </div>

      <div ref={markerRef} aria-hidden style={{ height: 1 }} />
      {/* Image grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            entry.images.length >= 2 ? "repeat(2, minmax(0, 1fr))" : "1fr",
          gap: "14px",
          marginBottom: "14px",
        }}
      >
        {entry.images.map((src, i) => (
          <div
            key={`${entry.id}-${src}-${i}`}
            style={{
              borderRadius: 14,
              overflow: "hidden",
              border: "1px solid var(--panel-border)",
              background: "var(--panel-bg)",
              boxShadow: "var(--shadow)",
              aspectRatio: "16 / 10",
            }}
          >
            <MediaTile src={src} eager={idx === 0 && i === 0} />
          </div>
        ))}
      </div>

      {/* Text area */}
      <TextPanel title="">{entry.body}</TextPanel>

      {/* Small spacer */}
      <div aria-hidden style={{ height: "clamp(18px, 3vw, 28px)" }} />
    </section>
  );
}

// -------------------- HOOKS --------------------

function useTimelineLineHeight(entries) {
  const timelineInnerRef = useRef(null);
  const lastTimelineBtnRef = useRef(null);
  const [timelineLineHeight, setTimelineLineHeight] = useState(null);

  useLayoutEffect(() => {
    const measure = () => {
      const inner = timelineInnerRef.current;
      const lastBtn = lastTimelineBtnRef.current;
      if (!inner || !lastBtn) return;
      const h = lastBtn.offsetTop + lastBtn.offsetHeight;
      setTimelineLineHeight(h);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("resize", measure);
    };
  }, [entries]);

  return { timelineInnerRef, lastTimelineBtnRef, timelineLineHeight };
}

function useTimelineActive(entries, markerRefs) {
  const [activeIdx, setActiveIdx] = useState(0);
  const isJumpingRef = useRef(false);
  const jumpTargetIdxRef = useRef(0);
  const jumpUntilRef = useRef(0);

  useEffect(() => {
    let raf = 0;
    const updateActive = () => {
      raf = 0;
      if (isJumpingRef.current && Date.now() < jumpUntilRef.current) {
        setActiveIdx(jumpTargetIdxRef.current);
        return;
      } else if (isJumpingRef.current) {
        isJumpingRef.current = false;
      }
      const triggerY = TIMELINE_TRIGGER_Y;
      let bestIdx = 0;
      let bestTop = -Infinity;
      for (let i = 0; i < entries.length; i++) {
        const id = entries[i].id;
        const el = markerRefs.current[id];
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= triggerY && top > bestTop) {
          bestTop = top;
          bestIdx = i;
        }
      }
      setActiveIdx(bestIdx);
    };
    const onScrollOrResize = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(updateActive);
    };
    updateActive();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [entries, markerRefs]);

  const onJump = (idx) => {
    const e = entries[idx];
    setActiveIdx(idx);
    isJumpingRef.current = true;
    jumpTargetIdxRef.current = idx;
    jumpUntilRef.current = Date.now() + JUMP_LOCK_MS;
    const marker = markerRefs.current[e.id];
    if (!marker) return;
    const top = marker.getBoundingClientRect().top + window.scrollY;
    const targetTop = Math.max(0, top - TIMELINE_TRIGGER_Y);
    window.scrollTo({ top: targetTop, behavior: "smooth" });
    window.setTimeout(() => {
      if (Date.now() >= jumpUntilRef.current) {
        isJumpingRef.current = false;
      }
    }, JUMP_LOCK_MS + 50);
  };

  return { activeIdx, onJump };
}

export default function TravelPage() {
  const navigate = useNavigate();
  const sectionRefs = useRef({});
  const markerRefs = useRef({});

  const { timelineInnerRef, lastTimelineBtnRef, timelineLineHeight } =
    useTimelineLineHeight(TRAVEL_ENTRIES);
  const { activeIdx, onJump } = useTimelineActive(TRAVEL_ENTRIES, markerRefs);

  return (
    <PageShell title="Travel" onBack={() => navigate("/")}>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          padding: "clamp(16px, 3vw, 36px)",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: "min(1200px, 100%)",
            display: "grid",
            gridTemplateColumns: "280px 1fr",
            gap: "clamp(16px, 3vw, 36px)",
            alignItems: "start",
          }}
        >
          {/* Timeline */}
          <div
            style={{
              position: "sticky",
              top: "clamp(18px, 3vw, 28px)",
              alignSelf: "start",
              paddingTop: "6px",
              height: "calc(100vh - clamp(18px, 3vw, 28px))",
              overflow: "visible",
            }}
          >
            <div
              ref={timelineInnerRef}
              style={{
                position: "relative",
                paddingLeft: "18px",
              }}
            >
              {/* vertical line */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  left: "7px",
                  top: 0,
                  height: timelineLineHeight
                    ? `${timelineLineHeight}px`
                    : "100%",
                  bottom: "auto",
                  width: "2px",
                  background: "var(--panel-border)",
                  opacity: 0.75,
                  borderRadius: "2px",
                }}
              />
              {TRAVEL_ENTRIES.map((entry, idx) => (
                <TimelineItem
                  key={entry.id}
                  entry={entry}
                  idx={idx}
                  isActive={idx === activeIdx}
                  onJump={onJump}
                  isLast={idx === TRAVEL_ENTRIES.length - 1}
                  btnRef={lastTimelineBtnRef}
                />
              ))}
            </div>
          </div>

          {/* Content */}
          <div style={{ width: "100%" }}>
            {TRAVEL_ENTRIES.map((entry, idx) => (
              <EntrySection
                key={entry.id}
                entry={entry}
                idx={idx}
                sectionRef={(node) => {
                  if (node) sectionRefs.current[entry.id] = node;
                }}
                markerRef={(node) => {
                  if (node) markerRefs.current[entry.id] = node;
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}

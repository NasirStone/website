import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import PageShell from "../components/PageShell.jsx";
import TextPanel from "../components/ui/TextPanel.jsx";
import { asset } from "../components/uiConstants.js";

function isVideoSrc(src) {
  return /\.(mp4|webm|mov)$/i.test(src || "");
}

// -------------------- TRAVEL DATA --------------------

const TRAVEL_ENTRIES = [
  {
    id: "Europe-2023",
    date: "Summer 2023",
    title: "Füssen, Germany",
    images: ["images/travel/castle.webp", "images/travel/lake.webp"],
    body: (
      <>
        In the summer of 2023, my dad and I travelled to Füssen, Germany to
        visit my great aunt, Linda. We spent most of our days biking in the tall
        and beautiful mountians, where we accidentally crossed into Austria. It
        was my first time in Europe, and I was entralled by the cleanliness,
        beautiful nature, and healthy food that Germany offered.
      </>
    ),
  },
  {
    id: "barcelona-paris",
    date: "Summer 2023",
    title: "Barcelona, Spain & Paris, France",
    images: ["images/travel/F1.mp4", "images/travel/cour.webp"],
    body: (
      <>
        Right after Germany, I met up with my best friend Conor, and we flew to
        Barcelona, Spain, on the cheapest flight we could find, and stayed in a
        hostel. The coolest thing we did by far was watching the Formula 1 AWS
        Gran Premio de España 2023. We bought tickets for the general field, but
        with some social engineering, snuck into the only two seats left in the
        Grand Stands to catch amazing views of the race.
      </>
    ),
  },
  {
    id: "portland",
    date: "Spring 2024",
    title: "Portland, OR",
    images: ["images/travel/beach.webp", "images/travel/hood.webp"],
    body: (
      <>
        For my 2024 Spring Break, my friends Jack, Conor, and I stayed with our
        friend Lucas's house in Portland, Oregon. The beauty of Oregon was so
        jarring from the flatness I am familiar with in Illinois. We had access
        to a car, so we got to drive around and visit the Japanese Gardens,
        beautiful beaches, and twisty mountain roads. The water is also
        excellent in Oregon!
      </>
    ),
  },
  {
    id: "johnson",
    date: "Spring 2024",
    title: "Johnson Shut-Ins, MO",
    images: ["images/travel/hike.webp", "images/travel/shutin.webp"],
    body: (
      <>
        The weekend before finals, Gabbi (my girlfriend), and our other friend
        couple, Isabella and Andre, drove an hour south to the Johnson Shut-Ins
        in Missouri to camp for two nights, hike, and swim in the flowing
        rivers. When we arrived, it was pouring rain, triggering a "red-flag"
        warning for the shut-in, meaning no one should enter. We did anyway, and
        learned quickly that we should have heeded the warning after being swept
        away almost immediately.
      </>
    ),
  },
  {
    id: "big-road-trip",
    date: "Summer 2024",
    title: "Western US Road Trip",
    images: [
      "images/travel/teton.webp",
      "images/travel/drive.webp",
      "images/travel/cali_water.webp",
      "images/travel/utah.webp",
    ],
    body: (
      <>
        This road trip was, and likely will be, the most intense trip I have
        ever been on. For two weeks, 7 friends and I loaded an entire minivan
        and drove 6,000+ miles across the western US. We camped all but one
        night and visited numerous national parks, including the Grand Tetons,
        Yellowstone, Crater Lake, the Hoh Rainforest, Olympic, and Redwoods. We
        started in Lawrence, Kansas, and drove through 12 states in a big loop.
        Besides getting a flat tire on our first day, we encountered very few
        problems!
      </>
    ),
  },
  {
    id: "puerto-rico",
    date: "Spring 2025",
    title: "Puerto Rico",
    images: [
      "images/travel/prgabbi.webp",
      "images/travel/flags.webp",
      "images/travel/pose.webp",
      "images/travel/prtogether.webp",
    ],
    body: (
      <>
        For our next Spring Break, Gabbi, Isabella, Andre, and I flew to Puerto
        Rico. We went to the beach every day, explored many museums, and went
        cliff jumping on a rainforest excursion. The food there was also
        terrific. I am very much looking forward to going back one day!
      </>
    ),
  },
  {
    id: "vermont-road-trip",
    date: "Summer 2025",
    title: "Chicago → Canada → Vermont",
    images: ["images/travel/vermont1.webp", "images/travel/montreal.webp"],
    body: (
      <>
        In early summer 2025, Conor was heading to Burlington, Vermont, to start
        his internship. He, of course, needed a car there, so what better
        vehicle to bring down than his 1996 Japanese Kei Truck? Only one
        condition: Do it all using paper maps. With our North America Atlas in
        hand, we started the 1,000+ mile journey from Evanston, IL, to
        Burlington, Vermont. Along the way, we stopped in Detroit, Michigan,
        Toronto, Canada, and Montréal, Quebec before reaching our final
        destination. The truck only broke down once, after we hit a large
        puddle, which sucked water into our air filter, causing the engine to
        die. Montréal was our favorite stop, where we spent two nights, explored
        the city, and hiked Mount Royal.
      </>
    ),
  },
  {
    id: "texas",
    title: "San Francisco, CA → Houston, TX",
    images: ["images/travel/texas_trip.webp"],
    body: (
      <>
        In the last week of summer, Conor prepared for his Co-Op in Houston,
        Texas. Since his mini-truck wasn't suitable for daily driving there, he
        bought a 1984 Volkswagen Westfalia camper van. We, along with our friend
        Jack, flew to San Francisco to pick it up and drove 1,500 miles to
        Houston in 4 days. We averaged 8-10 hours of driving each day, crossing
        Texas in the untested van without a working taillight, AC, or,
        unbeknownst to us, adequate coolant. We slept at two Texas state parks,
        stayed one night in a hotel, and arrived in Houston just in time to
        catch our flights back home.
      </>
    ),
  },
  {
    id: "ozarks",
    date: "Fall 2025",
    title: "Lake of the Ozarks, MO",
    images: ["images/travel/ozark.webp"],
    body: (
      <>
        For Fall Break, 8 friends and I packed two sedans for the 3-hour drive
        from WashU to the Lake of the Ozarks in Missouri. We rented an AirBnB
        for 4 nights, bought groceries the first night, and felt what it was
        like to truly unwind after a tough start to our third year. We swam in
        the water every day, cooked every night, played board games, and told
        stories by the fire. It was nice to know that such a tranquil place
        exists not too far from our school.
      </>
    ),
  },
  {
    id: "edinburgh",
    date: "Today",
    title: "Study Abroad at The University of Edinburgh",
    images: [
      "images/travel/jan.webp",
      "images/travel/arthur2.webp",
      "images/travel/arthur3.webp",
      "images/travel/arthur1.webp",
    ],
    body: (
      <>
        I am currently an exchange student at The University of Edinburgh, where
        I am continuing my study of Computer Science. It has been such an
        amazing experience to live in a new continent. Edinburgh, UK, is a
        wonderful city full of vibrant culture, stunning natural scenery, and a
        lot of rain. While abroad, I have many trips planned, such as Dublin,
        Paris, Barcelona, London, and more.
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
          borderRadius: "inherit",
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
        borderRadius: "inherit",
      }}
    />
  );
}

function EntrySection({ entry, idx }) {
  return (
    <section
      key={entry.id}
      style={{
        scrollMarginTop: "110px",
        paddingBottom: "clamp(18px, 3vw, 28px)",
      }}
    >
      <div
        style={{
          fontSize: "clamp(0.95rem, 3.2vw, 1.05rem)",
          lineHeight: 1.4,
          opacity: 0.75,
          marginBottom: "8px",
        }}
      >
        {entry.date}
      </div>

      <div
        style={{
          fontSize: "clamp(1.65rem, 5.2vw, 2.2rem)",
          fontWeight: 800,
          letterSpacing: "-0.01em",
          marginBottom: "10px",
        }}
      >
        {entry.title}
      </div>

      {/* Image grid */}
      <div className={`travelGrid ${entry.images.length === 1 ? "one" : ""}`}>
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

      {/* Text */}
      <TextPanel title="">
        <div
          style={{
            textAlign: "center",
            fontSize: "clamp(1.02rem, 3.6vw, 1.12rem)",
            lineHeight: 1.7,
            wordBreak: "break-word",
          }}
        >
          {entry.body}
        </div>
      </TextPanel>

      {/* Small spacer */}
      <div aria-hidden style={{ height: "clamp(18px, 3vw, 28px)" }} />
    </section>
  );
}

export default function TravelPage() {
  const navigate = useNavigate();

  return (
    <PageShell title="Travel" onBack={() => navigate("/")}>
      <style>{`
        .travelGrid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
          margin-bottom: 14px;
        }
        .travelGrid.one {
          grid-template-columns: 1fr;
        }
        @media (max-width: 520px) {
          .travelGrid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
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
            display: "block",
            // alignItems: "flex-start",
          }}
        >
          {/* Content */}
          <div
            style={{
              flex: "1 1 auto",
              minWidth: 0,
              position: "relative",
              zIndex: 1,
            }}
          >
            {TRAVEL_ENTRIES.map((entry, idx) => (
              <EntrySection key={entry.id} entry={entry} idx={idx} />
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}

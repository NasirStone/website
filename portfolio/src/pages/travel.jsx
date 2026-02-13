import { useNavigate } from "react-router-dom";
import PageShell from "../components/PageShell.jsx";
import TextPanel from "../components/ui/TextPanel.jsx";
import { asset } from "../components/uiConstants.js";

function isVideoSrc(src) {
  return /\.(mp4|webm|mov)$/i.test(src || "");
}

// -------------------- TRAVEL DATA --------------------

const TRAVEL_MEDIA = {
  CASTLE: "images/travel/castle.webp",
  LAKE: "images/travel/lake.webp",
  F1_VIDEO: "images/travel/F1.mp4",
  COUR: "images/travel/cour.webp",
  BEACH: "images/travel/beach.webp",
  HOOD: "images/travel/hood.webp",
  HIKE: "images/travel/hike.webp",
  SHUTIN: "images/travel/shutin.webp",
  TETON: "images/travel/teton.webp",
  DRIVE: "images/travel/drive.webp",
  CALI_WATER: "images/travel/cali_water.webp",
  UTAH: "images/travel/utah.webp",
  PR_GABBI: "images/travel/prgabbi.webp",
  FLAGS: "images/travel/flags.webp",
  POSE: "images/travel/pose.webp",
  PR_TOGETHER: "images/travel/prtogether.webp",
  VERMONT_1: "images/travel/vermont1.webp",
  MONTREAL: "images/travel/montreal.webp",
  TEXAS_TRIP: "images/travel/texas_trip.webp",
  OZARK: "images/travel/ozark.webp",
  LONDON: "images/travel/london.webp",
  ARTHUR_1: "images/travel/arthur1.webp",
  PENTLANDS: "images/travel/pentlands.webp",
  ARTHUR_3: "images/travel/arthur3.webp",
};

const TRAVEL_ENTRIES = [
  {
    id: "Europe-2023",
    date: "Summer 2023",
    title: "Füssen, Germany",
    images: [TRAVEL_MEDIA.CASTLE, TRAVEL_MEDIA.LAKE],
    body: (
      <>
        In the summer of 2023, my dad and I travelled to Füssen, Germany to
        visit my great aunt, Linda. It was my first time in Europe, and we spent
        our days biking in the ttall and beautiful mountians, and accidentally
        crossed into Austria.
      </>
    ),
  },
  {
    id: "barcelona-paris",
    date: "Summer 2023",
    title: "Barcelona, Spain & Paris, France",
    images: [TRAVEL_MEDIA.F1_VIDEO, TRAVEL_MEDIA.COUR],
    body: (
      <>
        After Germany, I met up with my friend Conor, and we flew to Barcelona,
        Spain. The coolest thing we did was see the Formula 1 AWS Gran Premio de
        España 2023. We bought tickets for the general field, but with some
        social engineering, snuck into the only two seats left in the Grand
        Stands to catch amazing views of the race.
      </>
    ),
  },
  {
    id: "portland",
    date: "Spring 2024",
    title: "Portland, OR",
    images: [TRAVEL_MEDIA.BEACH, TRAVEL_MEDIA.HOOD],
    body: (
      <>
        For my 2024 Spring Break, my friends Jack, Conor, and I stayed with our
        friend Lucas in Portland, Oregon. The beauty of Oregon was so jarring
        from the flatness I am familiar with in Illinois. We had a car, so we
        got to drive around the twisty mountian roads, visit the Japanese
        Gardens, and beautiful beaches. The drinking water is also excellent in
        Oregon!
      </>
    ),
  },
  {
    id: "johnson",
    date: "Spring 2024",
    title: "Johnson Shut-Ins, MO",
    images: [TRAVEL_MEDIA.HIKE, TRAVEL_MEDIA.SHUTIN],
    body: (
      <>
        The weekend before finals, my girlfrind Gabbi, and our other friend
        couple, Isabella and Andre, drove to the Johnson Shut-Ins in Missouri to
        camp for two nights, hike, and swim in the flowing river. When we
        arrived, it was pouring rain, triggering a "red-flag" warning for the
        shut-in, meaning no one should enter. We did anyway, and learned quickly
        that we should have heeded the warning after being swept away almost
        immediately.
      </>
    ),
  },
  {
    id: "big-road-trip",
    date: "Summer 2024",
    title: "Western US Road Trip",
    images: [
      TRAVEL_MEDIA.TETON,
      TRAVEL_MEDIA.DRIVE,
      TRAVEL_MEDIA.CALI_WATER,
      TRAVEL_MEDIA.UTAH,
    ],
    body: (
      <>
        This road trip was, and likely will be, the most intense trip I have
        ever been on. For two weeks, 7 friends and I loaded an entire minivan
        and drove 6,000+ miles across the Western US. We camped all but one
        night and visited numerous national parks, including the Grand Tetons,
        Yellowstone, Crater Lake, the Hoh Rainforest, Olympic, and Redwoods. We
        started in Lawrence, Kansas, and drove through 12 states in a loop.
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
      TRAVEL_MEDIA.PR_GABBI,
      TRAVEL_MEDIA.FLAGS,
      TRAVEL_MEDIA.POSE,
      TRAVEL_MEDIA.PR_TOGETHER,
    ],
    body: (
      <>
        For our next Spring Break, Gabbi, Isabella, Andre, and I flew to Puerto
        Rico. We went to the beach every day, saw many museums, and went cliff
        jumping on a rainforest excursion. The food there was also terrific.
      </>
    ),
  },
  {
    id: "vermont-road-trip",
    date: "Summer 2025",
    title: "Chicago → Canada → Vermont",
    images: [TRAVEL_MEDIA.VERMONT_1, TRAVEL_MEDIA.MONTREAL],
    body: (
      <>
        In early summer 2025, Conor was heading to Burlington, Vermont, to start
        his internship. He, of course, needed a car there, so what better
        vehicle to bring down than his 1996 Japanese Kei Truck? Only one
        condition: Do it all using paper maps. We started the 1,000+ mile
        journey from Evanston, IL, to Burlington, Vermont. Along the way, we
        stopped in Detroit, Michigan, Toronto, Canada, and Montréal, Quebec
        before reaching Vermont. The truck only broke down once, after hitting a
        large puddle on the highway, water sucked into our air filter, causing
        it to die. Montréal was our favorite stop, where we spent two nights,
        explored the city, and hiked Mount Royal.
      </>
    ),
  },
  {
    id: "texas",
    title: "San Francisco, CA → Houston, TX",
    images: [TRAVEL_MEDIA.TEXAS_TRIP],
    body: (
      <>
        In the last week of summer, Conor prepared for his Co-Op in Houston,
        Texas. Since his mini-truck wasn't suitable for daily driving there, he
        bought a 1984 Volkswagen Westfalia camper van. We, along with Jack, flew
        to San Francisco to pick it up and drove 1,500 miles to Houston in 4
        days. We averaged 8-10 hours of driving each day, getting to Texas
        without a working taillight assembly, AC, or, unbeknownst to us,
        adequate coolant. We slept at two Texas state parks, stayed one night in
        a hotel, and arrived in Houston just in time to catch our flights back
        home.
      </>
    ),
  },
  {
    id: "ozarks",
    date: "Fall 2025",
    title: "Lake of the Ozarks, MO",
    images: [TRAVEL_MEDIA.OZARK],
    body: (
      <>
        For Fall Break, 8 friends and I drove to the Lake of the Ozarks in
        Missouri. We swam in the water every day, cooked every night, played
        board games, and told stories by the fire. It was nice to know that such
        a tranquil place exists not too far from our school.
      </>
    ),
  },
  {
    id: "edinburgh",
    date: "Today",
    title: "The University of Edinburgh",
    images: [
      TRAVEL_MEDIA.LONDON,
      TRAVEL_MEDIA.PENTLANDS,
      TRAVEL_MEDIA.ARTHUR_3,
      TRAVEL_MEDIA.ARTHUR_1,
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

function resolveSrc(src) {
  return asset(src);
}

function MediaTile({ src, eager }) {
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

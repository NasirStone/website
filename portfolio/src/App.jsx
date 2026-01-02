import { useEffect, useMemo, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import DronesPage from "./pages/drones.jsx";

function Landing() {
  const navigate = useNavigate();
  // Keywords you want floating in the whitespace
  const keywords = useMemo(
    () => [
      "Nasir",
      "rocketry",
      "drones",
      "autonomous vehicles",
      "robotics",
      "ai",
      "computers",
      "it",
      "telemetry",
      "mapping",
      "cameras",
      "avionics",
      "cars",
      "planes",
      "trains",
      "bikes",
      "skateboards",
      "gaming",
      "music",
      "vintage audio",
      "travel",
      "driving",
      "teaching",
      "chinese",
      "lizards",
      "secret",
    ],
    []
  );

  // --- Removed keywordPlacements. ---
  function hashString(str) {
    // Simple deterministic hash (stable across reloads)
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function seeded01(seed) {
    // Deterministic pseudo random in [0, 1)
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }

  function wordCloudStyle(seed) {
    // Spread words across the full viewport (clustered)
    const leftPct = Math.floor(seeded01(seed + 1) * 86) + 7; // 7%..93%
    const topPct = Math.floor(seeded01(seed + 2) * 84) + 8; // 8%..92%

    // Larger sizes for word-cloud feel
    const size = 1.3 + seeded01(seed + 3) * 2.2; // rem ~1.3..3.5
    const rotate = "0deg"; // no rotation

    // Fade in/out at different speeds and phases
    const duration = (5 + seeded01(seed + 5) * 7).toFixed(2) + "s"; // 5..12s
    const delay = (seeded01(seed + 6) * 4).toFixed(2) + "s"; // 0..4s

    // Brighter peak opacity
    const maxOpacity = (0.18 + seeded01(seed + 7) * 0.28).toFixed(2); // ~0.18..0.46

    return {
      leftPct,
      topPct,
      rotate,
      fontSizeRem: Number(size.toFixed(2)),
      animationDuration: duration,
      animationDelay: delay,
      maxOpacity,
    };
  }

  // Map a command to a page "section"
  const pages = useMemo(
    () => ({
      help: {
        title: "Help",
        body: (
          <>
            <p style={{ margin: 0 }}>Type a keyword and press Enter.</p>
            <p style={{ margin: "0.75rem 0 0" }}>
              Commands: <span style={{ opacity: 0.9 }}>help</span>,{" "}
              <span style={{ opacity: 0.9 }}>clear</span>
            </p>
          </>
        ),
      },
      rocketry: {
        title: "Rocketry",
        body: (
          <>
            <p style={{ margin: 0 }}>
              Bi directional camera systems, avionics integration, flight data
              capture.
            </p>
            <ul style={{ margin: "0.75rem 0 0", paddingLeft: "1.25rem" }}>
              <li>Forward and aft rocket camera system</li>
              <li>Telemetry and post flight analysis tooling</li>
              <li>Flight readiness validation with subteams</li>
            </ul>
          </>
        ),
      },
      drones: {
        title: "Drones",
        body: (
          <>
            <p style={{ margin: 0 }}>
              Mapping, SLAM assisted workflows, and field operations.
            </p>
            <ul style={{ margin: "0.75rem 0 0", paddingLeft: "1.25rem" }}>
              <li>Photogrammetry and survey capture</li>
              <li>Automation for repeatable processing</li>
            </ul>
          </>
        ),
      },
      cars: {
        title: "Cars",
        body: (
          <>
            <p style={{ margin: 0 }}>
              Mechanical work, diagnostics, and systems thinking applied to real
              hardware.
            </p>
          </>
        ),
      },
      planes: {
        title: "Planes",
        body: (
          <>
            <p style={{ margin: 0 }}>
              Avionics software maintenance and reliability focused engineering.
            </p>
          </>
        ),
      },
      trains: {
        title: "Trains",
        body: (
          <>
            <p style={{ margin: 0 }}>
              Interest area placeholder. Add a story or a project here.
            </p>
          </>
        ),
      },
      bikes: {
        title: "Bikes",
        body: (
          <>
            <p style={{ margin: 0 }}>
              Interest area placeholder. Add a story or a project here.
            </p>
          </>
        ),
      },
      avionics: {
        title: "Avionics",
        body: (
          <>
            <p style={{ margin: 0 }}>
              Embedded systems, telemetry, and software architecture for flight
              conditions.
            </p>
          </>
        ),
      },
      ai: {
        title: "AI",
        body: (
          <>
            <p style={{ margin: 0 }}>
              Applied ML systems, perception pipelines, and product oriented
              prototypes.
            </p>
          </>
        ),
      },
      telemetry: {
        title: "Telemetry",
        body: (
          <>
            <p style={{ margin: 0 }}>
              RF systems and protocols for reliable downlink and recovery.
            </p>
          </>
        ),
      },
      mapping: {
        title: "Mapping",
        body: (
          <>
            <p style={{ margin: 0 }}>
              Geospatial capture, processing automation, and visualization.
            </p>
          </>
        ),
      },
      robotics: {
        title: "Robotics",
        body: (
          <>
            <p style={{ margin: 0 }}>
              ROS2 based pipelines for perception and control.
            </p>
          </>
        ),
      },
      cameras: {
        title: "Cameras",
        body: (
          <>
            <p style={{ margin: 0 }}>
              Video capture, encoding, and fast retrieval workflows for field
              use.
            </p>
          </>
        ),
      },
    }),
    [keywords]
  );

  const [input, setInput] = useState("");
  const [activeKey, setActiveKey] = useState("help");
  const [history, setHistory] = useState([
    { type: "system", text: "# Type a keyword to begin" },
  ]);

  const [wordCloudItems, setWordCloudItems] = useState([]);

  useEffect(() => {
    function generateWordCloud() {
      const repeats = 6;

      const vw = window.innerWidth || 1200;
      const vh = window.innerHeight || 800;

      // Terminal approximate bounds in pixels (to avoid placing words behind it)
      const terminalW = Math.min(740, vw * 0.88);
      const terminalH = Math.min(560, vh * 0.7);
      const terminalPad = 36;

      const forbidden = {
        x: vw / 2 - terminalW / 2 - terminalPad,
        y: vh / 2 - terminalH / 2 - terminalPad,
        w: terminalW + terminalPad * 2,
        h: terminalH + terminalPad * 2,
      };

      function rectsOverlap(a, b) {
        return (
          a.x < b.x + b.w &&
          a.x + a.w > b.x &&
          a.y < b.y + b.h &&
          a.y + a.h > b.y
        );
      }

      // Rough text width estimate (monospace): ~0.62em per char
      function estimateRect(word, fontSizeRem, leftPct, topPct) {
        const fontPx = fontSizeRem * 16; // assumes 16px root
        const w = Math.max(24, word.length * fontPx * 0.62);
        const h = fontPx * 1.15;

        const x = (leftPct / 100) * vw;
        const y = (topPct / 100) * vh;

        return { x, y, w, h };
      }

      const placed = [];
      const items = [];

      const total = keywords.length * repeats;

      for (let idx = 0; idx < total; idx++) {
        const word = keywords[idx % keywords.length];
        const rep = Math.floor(idx / keywords.length);

        // Try a bunch of times to find a non-overlapping location
        let chosen = null;

        for (let attempt = 0; attempt < 160; attempt++) {
          const seed = Math.floor(Math.random() * 1_000_000_000);
          const s = wordCloudStyle(seed);

          // Jitter inside clustered band to reduce “grid” feel
          const jitterLeft = (Math.random() - 0.5) * 6; // +/- 3%
          const jitterTop = (Math.random() - 0.5) * 6; // +/- 3%

          const leftPct = Math.min(95, Math.max(3, s.leftPct + jitterLeft));
          const topPct = Math.min(95, Math.max(3, s.topPct + jitterTop));

          const rect = estimateRect(word, s.fontSizeRem, leftPct, topPct);

          // Keep inside viewport with small padding
          const pad = 8;
          const rectPadded = {
            x: rect.x - pad,
            y: rect.y - pad,
            w: rect.w + pad * 2,
            h: rect.h + pad * 2,
          };

          if (rectsOverlap(rectPadded, forbidden)) continue;

          let collide = false;
          for (const r of placed) {
            if (rectsOverlap(rectPadded, r)) {
              collide = true;
              break;
            }
          }
          if (collide) continue;

          chosen = {
            word,
            rep,
            seed,
            left: `${leftPct}%`,
            top: `${topPct}%`,
            fontSize: `${s.fontSizeRem}rem`,
            animationDuration: s.animationDuration,
            animationDelay: s.animationDelay,
            maxOpacity: s.maxOpacity,
          };

          placed.push(rectPadded);
          break;
        }

        // If we failed to place without overlap, place it anyway (rare) but smaller
        if (!chosen) {
          const seed = Math.floor(Math.random() * 1_000_000_000);
          const s = wordCloudStyle(seed);
          chosen = {
            word,
            rep,
            seed,
            left: `${s.leftPct}%`,
            top: `${s.topPct}%`,
            fontSize: `${Math.max(1.1, s.fontSizeRem * 0.85)}rem`,
            animationDuration: s.animationDuration,
            animationDelay: s.animationDelay,
            maxOpacity: s.maxOpacity,
          };
        }

        items.push(chosen);
      }

      setWordCloudItems(items);
    }

    generateWordCloud();

    // Optional: re-generate on resize so it continues to look good
    function onResize() {
      generateWordCloud();
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [keywords]);

  function runCommand(raw) {
    const cmd = raw.trim().toLowerCase();

    if (!cmd) return;

    if (cmd === "clear") {
      setHistory([
        { type: "system", text: "Cleared. Type a keyword. Try: help" },
      ]);
      setActiveKey("help");
      return;
    }

    if (pages[cmd]) {
      // special case: route to /drones
      if (cmd === "drones") {
        setHistory((h) => [...h, { type: "prompt", text: `Nasir % ${cmd}` }]);
        navigate("/drones");
        return;
      }

      setActiveKey(cmd);
      setHistory((h) => [...h, { type: "prompt", text: `Nasir % ${cmd}` }]);
      return;
    }

    setHistory((h) => [
      ...h,
      { type: "prompt", text: `Nasir % ${cmd}` },
      {
        type: "error",
        text: `Command not found: ${cmd}. Type help for commands.`,
      },
    ]);
  }

  function onSubmit(e) {
    e.preventDefault();
    const raw = input;
    setInput("");
    runCommand(raw);
  }

  const active = pages[activeKey] ?? pages.help;

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        minWidth: "100vw",
        background:
          "radial-gradient(1200px 800px at 50% 0%, rgba(255,255,255,0.05), rgba(0,0,0,0.92)), #0b0b0c",
        color: "#e7eaf0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        html, body, #root {
          height: 100%;
          width: 100%;
          margin: 0;
          padding: 0;
          background: #0b0b0c;
          overflow: hidden;
        }
        @keyframes wordFade {
          0% { opacity: 0.05; filter: blur(0px); }
          35% { opacity: var(--max-opacity); filter: blur(0px); }
          70% { opacity: 0.06; filter: blur(0px); }
          100% { opacity: 0.05; filter: blur(0px); }
        }
      `}</style>
      {/* floating keywords in the whitespace */}
      {wordCloudItems.map((item, i) => (
        <span
          key={`${item.word}-${item.rep}-${i}`}
          style={{
            position: "absolute",
            left: item.left,
            top: item.top,
            transform: "rotate(0deg)",
            fontFamily:
              "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
            fontSize: item.fontSize,
            opacity: 0.08,
            letterSpacing: "0.00em",
            userSelect: "none",
            pointerEvents: "none",
            whiteSpace: "nowrap",
            animationName: "wordFade",
            animationTimingFunction: "ease-in-out",
            animationIterationCount: "infinite",
            animationDuration: item.animationDuration,
            animationDelay: item.animationDelay,
            textTransform: "capitalize",
            ["--max-opacity"]: item.maxOpacity,
          }}
        >
          {item.word}
        </span>
      ))}

      {/* center container */}
      <div
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          padding: "2.5rem 1.25rem",
        }}
      >
        {/* terminal window */}
        <div
          style={{
            width: "min(740px, 88vw)",
            height: "min(560px, 70vh)",
            maxHeight: "70vh",
            borderRadius: 14,
            border: "1px solid rgba(255,255,255,0.14)",
            background: "rgba(0, 0, 0, 0.82)",
            boxShadow:
              "0 24px 70px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06) inset",
            backdropFilter: "blur(14px)",
            overflow: "hidden",
          }}
        >
          {/* terminal header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "0.75rem 1rem",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.04)",
            }}
          >
            <div style={{ display: "flex", gap: 8 }}>
              <span
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 999,
                  background: "rgba(255, 95, 86, 0.9)",
                }}
              />
              <span
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 999,
                  background: "rgba(255, 189, 46, 0.9)",
                }}
              />
              <span
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 999,
                  background: "rgba(39, 201, 63, 0.9)",
                }}
              />
            </div>
            <div
              style={{
                fontFamily:
                  "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                fontSize: "0.9rem",
                opacity: 0.8,
              }}
            >
              Terminal
            </div>
          </div>

          {/* terminal body */}
          <div
            style={{
              padding: "1rem 1.1rem",
              fontFamily:
                "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
              fontSize: "0.9rem",
              lineHeight: 1.55,
              color: "rgba(235,235,235,0.92)",
            }}
          >
            {/* history */}
            <div style={{ display: "grid", gap: "0.35rem" }}>
              {history.map((line, idx) => (
                <div
                  key={idx}
                  style={{
                    opacity: 1,
                    color:
                      line.type === "system"
                        ? "rgba(170, 170, 170, 0.75)"
                        : undefined,
                  }}
                >
                  {line.type === "error" ? (
                    <span style={{ color: "rgba(255, 120, 120, 0.95)" }}>
                      {line.text}
                    </span>
                  ) : (
                    <span>{line.text}</span>
                  )}
                </div>
              ))}
            </div>

            {/* input */}
            <form onSubmit={onSubmit} style={{ marginTop: "1.25rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ opacity: 0.95 }}>Nasir %</span>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="type a keyword and press Enter"
                  autoFocus
                  spellCheck={false}
                  style={{
                    flex: 1,
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    color: "#e7eaf0",
                    fontFamily:
                      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                    fontSize: "0.95rem",
                    padding: "0.35rem 0",
                  }}
                />
              </div>
              <div
                style={{
                  marginTop: "0.35rem",
                  fontSize: "0.8rem",
                  opacity: 0.6,
                }}
              >
                Tip: type <span style={{ opacity: 0.9 }}>help</span> for
                commands or <span style={{ opacity: 0.9 }}>clear</span> to
                reset.
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/drones" element={<DronesPage />} />
    </Routes>
  );
}

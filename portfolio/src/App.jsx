import { useEffect, useRef, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import DronesPage from "./pages/drones.jsx";

const MONO = "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";

const FG = "rgba(235,235,235,0.92)";
const MUTED = "rgba(170, 170, 170, 0.75)";

const KEYWORDS = [
  "nasir",
  "rocketry",
  "drones",
  "autonomous vehicles",
  "cars",
  "bikes",
  "gaming",
  "vintage audio",
  "travel",
  "driving",
  "teaching",
  "chinese",
];

const VALID_KEYWORDS = new Set(
  KEYWORDS.map((k) => k.trim().toLowerCase()).filter((k) => k && k !== "nasir")
);

function seeded01(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function wordCloudStyle(seed) {
  const leftPct = Math.floor(seeded01(seed + 1) * 96) + 2; // 2%..98%
  const topPct = Math.floor(seeded01(seed + 2) * 96) + 2; // 2%..98%

  const size = 1.3 + seeded01(seed + 3) * 2.2; // rem ~1.3..3.5
  const duration = (5 + seeded01(seed + 5) * 7).toFixed(2) + "s"; // 5..12s
  const delay = (seeded01(seed + 6) * 4).toFixed(2) + "s"; // 0..4s
  const maxOpacity = (0.18 + seeded01(seed + 7) * 0.28).toFixed(2); // ~0.18..0.46

  return {
    leftPct,
    topPct,
    fontSizeRem: Number(size.toFixed(2)),
    animationDuration: duration,
    animationDelay: delay,
    maxOpacity,
  };
}

function Landing() {
  const navigate = useNavigate();

  const [input, setInput] = useState("");
  const [history, setHistory] = useState(() => {
    try {
      const raw = sessionStorage.getItem("terminalHistory");
      const parsed = raw ? JSON.parse(raw) : null;
      return Array.isArray(parsed)
        ? parsed
        : [{ type: "system", text: "# Type a keyword to begin" }];
    } catch {
      return [{ type: "system", text: "# Type a keyword to begin" }];
    }
  });
  const [showTip, setShowTip] = useState(() => {
    try {
      const raw = sessionStorage.getItem("terminalShowTip");
      return raw === null ? true : raw === "true";
    } catch {
      return true;
    }
  });
  useEffect(() => {
    try {
      sessionStorage.setItem("terminalHistory", JSON.stringify(history));
      sessionStorage.setItem("terminalShowTip", String(showTip));
    } catch {
      // ignore
    }
  }, [history, showTip]);

  const [wordCloudItems, setWordCloudItems] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [loadingPct, setLoadingPct] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarKeywords = KEYWORDS.filter(
    (k) => k.trim().toLowerCase() !== "nasir"
  );

  // Draggable terminal window position (top-left in px)
  const [terminalPos, setTerminalPos] = useState({ x: 0, y: 0 });
  const draggingRef = useRef({ active: false, dx: 0, dy: 0 });
  const [isCompact, setIsCompact] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 640;
  });
  useEffect(() => {
    function centerIfUnset() {
      setTerminalPos((p) => {
        if (p.x !== 0 || p.y !== 0) return p;

        const vw = window.innerWidth || 1200;
        const vh = window.innerHeight || 800;

        // Approximate terminal size to center it (matches render sizes)
        const w = Math.min(740, vw * 0.88);
        const h = Math.min(560, vh * 0.7);

        const x = Math.max(12, Math.round(vw / 2 - w / 2));
        const y = Math.max(12, Math.round(vh / 2 - h / 2));
        return { x, y };
      });
    }

    centerIfUnset();

    function onResize() {
      setIsCompact(window.innerWidth < 640);
      // Clamp terminal into view on resize
      setTerminalPos((p) => {
        const vw = window.innerWidth || 1200;
        const vh = window.innerHeight || 800;
        const w = Math.min(740, vw * 0.88);
        const h = Math.min(560, vh * 0.7);

        const x = Math.min(Math.max(12, p.x), Math.max(12, vw - w - 12));
        const y = Math.min(Math.max(12, p.y), Math.max(12, vh - h - 12));
        return { x, y };
      });
    }

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    function onMove(e) {
      if (!draggingRef.current.active) return;

      const vw = window.innerWidth || 1200;
      const vh = window.innerHeight || 800;
      const w = Math.min(740, vw * 0.88);
      const h = Math.min(560, vh * 0.7);

      const nextX = e.clientX - draggingRef.current.dx;
      const nextY = e.clientY - draggingRef.current.dy;

      const x = Math.min(Math.max(12, nextX), Math.max(12, vw - w - 12));
      const y = Math.min(Math.max(12, nextY), Math.max(12, vh - h - 12));

      setTerminalPos({ x, y });
    }

    function onUp() {
      draggingRef.current.active = false;
    }

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  useEffect(() => {
    function generateWordCloud() {
      const vw = window.innerWidth || 1200;
      const vh = window.innerHeight || 800;
      const isSmall = vw < 640;
      const repeats = isSmall ? 3 : 6;

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

      const total = KEYWORDS.length * repeats;

      for (let idx = 0; idx < total; idx++) {
        const word = KEYWORDS[idx % KEYWORDS.length];
        const rep = Math.floor(idx / KEYWORDS.length);

        // Try a bunch of times to find a non-overlapping location
        let chosen = null;

        for (let attempt = 0; attempt < 160; attempt++) {
          const seed = Math.floor(Math.random() * 1_000_000_000);
          const s = wordCloudStyle(seed);

          // Jitter inside clustered band to reduce “grid” feel
          const jitterLeft = (Math.random() - 0.5) * 6; // +/- 3%
          const jitterTop = (Math.random() - 0.5) * 6; // +/- 3%

          const leftPct = Math.min(98, Math.max(2, s.leftPct + jitterLeft));
          const topPct = Math.min(98, Math.max(2, s.topPct + jitterTop));

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
            left: `${leftPct}%`,
            top: `${topPct}%`,
            fontSize: `${(isSmall
              ? s.fontSizeRem * 0.72
              : s.fontSizeRem
            ).toFixed(2)}rem`,
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
            left: `${s.leftPct}%`,
            top: `${s.topPct}%`,
            fontSize: `${Math.max(
              0.95,
              isSmall ? s.fontSizeRem * 0.65 : s.fontSizeRem * 0.85
            ).toFixed(2)}rem`,
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
  }, []);

  function formatColumns(items, cols) {
    const list = items.slice();
    const maxLen = list.reduce((m, s) => Math.max(m, s.length), 0);
    const colW = Math.max(10, maxLen + 3);

    const rows = Math.ceil(list.length / cols);
    const lines = [];

    for (let r = 0; r < rows; r++) {
      let line = "";
      for (let c = 0; c < cols; c++) {
        const i = r + c * rows;
        if (i >= list.length) continue;

        const cell = list[i];
        const isLastCol = c === cols - 1 || r + (c + 1) * rows >= list.length;

        line += isLastCol ? cell : cell.padEnd(colW, " ");
      }
      lines.push(line);
    }
    return lines;
  }

  function runCommand(raw) {
    const cmd = raw.trim().toLowerCase();

    if (!cmd) return;

    if (cmd === "ls") {
      const list = Array.from(VALID_KEYWORDS).sort();
      const cols = isCompact ? 2 : 4;
      const lines = formatColumns(list, cols);

      setHistory((h) => [
        ...h,
        { type: "prompt", text: `nasir % ${cmd}` },
        ...lines.map((t) => ({ type: "system", text: t })),
      ]);
      setShowTip(false);
      return;
    }

    if (cmd === "clear") {
      setHistory([]);
      setShowTip(false);
      return;
    }

    if (cmd === "help") {
      setHistory((h) => [
        ...h,
        { type: "prompt", text: `nasir % ${cmd}` },
        {
          type: "system",
          text: "# How to use: type a keyword you see and press Enter to open its page.",
        },
        { type: "system", text: "# Commands: help, ls, clear" },
      ]);
      setShowTip(false);
      return;
    }

    if (VALID_KEYWORDS.has(cmd)) {
      // routes that exist today
      if (cmd === "drones") {
        setHistory((h) => [
          ...h,
          { type: "prompt", text: `nasir % ${cmd}` },
          { type: "system", text: "# loading drones…" },
        ]);
        setShowTip(false);

        // short visible loading bar (< 0.5s total)
        setIsLoading(true);
        setLoadingPct(0);

        const steps = [35, 70, 100];
        steps.forEach((pct, i) => {
          setTimeout(() => setLoadingPct(pct), 90 + i * 90);
        });

        setTimeout(() => {
          setIsLoading(false);
          setIsSidebarOpen(false);
          navigate("/drones");
        }, 320);

        return;
      }

      setHistory((h) => [
        ...h,
        { type: "prompt", text: `nasir % ${cmd}` },
        {
          type: "system",
          text: "That page is not ready yet. Check back later!",
        },
      ]);
      setShowTip(false);
      return;
    }

    setHistory((h) => [
      ...h,
      { type: "prompt", text: `nasir % ${cmd}` },
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

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background:
          "radial-gradient(1200px 800px at 50% 0%, rgba(255,255,255,0.05), rgba(0,0,0,0.92)), #0b0b0c",
        color: "#e7eaf0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        .sidebarOverlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.35);
          z-index: 20;
        }
        .sidebar {
          position: absolute;
          top: 12px;
          left: 12px;
          width: 260px;
          max-height: calc(100vh - 24px);
          overflow: auto;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.14);
          background: rgba(0, 0, 0, 0.86);
          box-shadow: 0 18px 55px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.06) inset;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          color: rgba(235,235,235,0.92);
          padding: 0.9rem 0.85rem;
          backdrop-filter: blur(12px);
        }
        @media (max-width: 640px) {
          .sidebar {
            left: 10px;
            right: 10px;
            width: auto;
            top: 10px;
            max-height: calc(100vh - 20px);
          }
        }
        .sidebarHeader {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 0.6rem;
          opacity: 0.9;
          font-size: 0.9rem;
        }
        .sidebarCloseBtn {
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.14);
          color: rgba(235,235,235,0.92);
          border-radius: 10px;
          padding: 0.35rem 0.55rem;
          cursor: pointer;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 0.8rem;
        }
        .keywordBtn {
          width: 100%;
          text-align: left;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.10);
          color: rgba(235,235,235,0.92);
          border-radius: 10px;
          padding: 0.55rem 0.65rem;
          cursor: pointer;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 0.85rem;
          line-height: 1.25;
        }
        .keywordBtn:hover {
          background: rgba(255,255,255,0.06);
        }
        .keywordGrid {
          display: grid;
          gap: 0.55rem;
        }
        html, body, #root {
          height: 100%;
          width: 100%;
          margin: 0;
          padding: 0;
          background: #0b0b0c;
          overflow: hidden;
        }
        @keyframes wordFade {
          0% { opacity: 0.08; filter: blur(0px); }
          35% { opacity: var(--max-opacity); filter: blur(0px); }
          70% { opacity: 0.06; filter: blur(0px); }
          100% { opacity: 0.08; filter: blur(0px); }
        }
        @keyframes blockBlink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .terminalWindow {
          width: min(740px, 88vw);
          height: min(560px, 70vh);
          max-height: 70vh;
        }
        @media (max-width: 640px) {
          .terminalWindow {
            width: min(560px, 94vw);
            height: min(520px, 78vh);
            max-height: 78vh;
          }
        }
        .terminalBody {
          font-size: 0.9rem;
        }
        @media (max-width: 640px) {
          .terminalBody {
            font-size: 0.85rem;
          }
        }
      `}</style>
      {isSidebarOpen ? (
        <div
          className="sidebarOverlay"
          onClick={() => setIsSidebarOpen(false)}
          role="presentation"
        >
          <div
            className="sidebar"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Keywords"
          >
            <div className="sidebarHeader">
              <div>Keywords</div>
              <button
                type="button"
                className="sidebarCloseBtn"
                onClick={() => setIsSidebarOpen(false)}
              >
                Close
              </button>
            </div>

            <div className="keywordGrid">
              {sidebarKeywords.map((k) => (
                <button
                  key={k}
                  type="button"
                  className="keywordBtn"
                  onClick={() => runCommand(k)}
                >
                  {k}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {wordCloudItems.map((item, i) => (
        <span
          key={`${item.word}-${item.rep}-${i}`}
          style={{
            position: "absolute",
            left: item.left,
            top: item.top,
            fontFamily: MONO,
            fontSize: item.fontSize,
            opacity: 0.12,
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
            color: "rgba(255,255,255,0.78)",
            textShadow: "0 1px 10px rgba(0,0,0,0.55)",
          }}
        >
          {item.word}
        </span>
      ))}

      {/* terminal window (draggable) */}
      <div
        style={{
          position: "absolute",
          left: terminalPos.x,
          top: terminalPos.y,
          zIndex: 5,
        }}
      >
        {/* terminal window */}
        <div
          className="terminalWindow"
          style={{
            borderRadius: 14,
            border: "1px solid rgba(255,255,255,0.14)",
            background: "rgba(0, 0, 0, 0.82)",
            boxShadow:
              "0 24px 70px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06) inset",
            backdropFilter: isCompact ? "none" : "blur(14px)",
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
              cursor: isCompact ? "default" : "grab",
              userSelect: "none",
              touchAction: "none",
            }}
            onPointerDown={(e) => {
              if (isCompact) return;
              // Don't start dragging when clicking interactive controls in the header
              if (e.target && typeof e.target.closest === "function") {
                const btn = e.target.closest("button");
                if (btn) return;
              }
              if (e.button !== 0) return;

              draggingRef.current.active = true;
              draggingRef.current.dx = e.clientX - terminalPos.x;
              draggingRef.current.dy = e.clientY - terminalPos.y;

              if (e.currentTarget.setPointerCapture) {
                try {
                  e.currentTarget.setPointerCapture(e.pointerId);
                } catch {
                  // ignore
                }
              }
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
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                width: "100%",
              }}
            >
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: "0.9rem",
                  opacity: 0.8,
                }}
              >
                Terminal
              </div>

              <button
                type="button"
                onClick={() => setIsSidebarOpen((v) => !v)}
                onPointerDown={(e) => e.stopPropagation()}
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  color: FG,
                  borderRadius: 10,
                  padding: "0.35rem 0.6rem",
                  cursor: "pointer",
                  fontFamily: MONO,
                  fontSize: "0.8rem",
                }}
              >
                Keywords
              </button>
            </div>
          </div>

          {/* terminal body */}
          <div
            className="terminalBody"
            style={{
              padding: "1rem 1.1rem",
              fontFamily: MONO,
              lineHeight: 1.55,
              color: FG,
            }}
          >
            {/* history */}
            <div
              style={{
                display: "grid",
                gap: "0.35rem",
              }}
            >
              {history.map((line, idx) => (
                <div
                  key={idx}
                  style={{
                    opacity: 1,
                    color: line.type === "system" ? MUTED : undefined,
                    whiteSpace: "pre",
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

            {isLoading ? (
              <div
                style={{
                  marginTop: "0.75rem",
                  color: MUTED,
                }}
              >
                <span style={{ fontFamily: "inherit" }}>
                  {`# [${"="
                    .repeat(Math.round((loadingPct / 100) * 18))
                    .padEnd(18, " ")}] ${loadingPct}%`}
                </span>
              </div>
            ) : null}

            {/* input */}
            <form
              onSubmit={onSubmit}
              style={{
                marginTop: history.length || isLoading ? "1.25rem" : "0.25rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span
                  style={{
                    color: FG,
                    fontFamily: MONO,
                    fontSize: "0.9rem",
                    lineHeight: 1.55,
                  }}
                >
                  nasir %
                </span>

                <div
                  style={{ position: "relative", flex: 1, height: "1.3rem" }}
                >
                  {/* visible overlay line */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      color: FG,
                      fontFamily: MONO,
                      fontSize: "0.9rem",
                      lineHeight: 1.55,
                      whiteSpace: "pre",
                      pointerEvents: "none",
                    }}
                  >
                    <span>{input}</span>
                    <span
                      style={{
                        display: "inline-block",
                        width: "0.62em",
                        height: "1.15em",
                        marginLeft: "2px",
                        background: "rgba(235,235,235,0.85)",
                        animation: "blockBlink 1s steps(1, end) infinite",
                      }}
                    />
                  </div>

                  {/* real input (captures typing) */}
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    autoFocus
                    spellCheck={false}
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      caretColor: "transparent",
                      color: "transparent",
                      textShadow: `0 0 0 ${FG}`,
                      fontFamily: MONO,
                      fontSize: "0.9rem",
                      lineHeight: 1.55,
                      padding: 0,
                    }}
                  />
                </div>
              </div>
              {showTip ? (
                <div
                  style={{
                    marginTop: "0.35rem",
                    fontSize: "0.8rem",
                    color: MUTED,
                  }}
                >
                  # type a keyword into the terminal to access the page,{" "}
                  <span style={{ color: "rgba(220,220,220,0.85)" }}>help</span>{" "}
                  for commands, or{" "}
                  <span style={{ color: "rgba(220,220,220,0.85)" }}>clear</span>{" "}
                  to reset.
                </div>
              ) : null}
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

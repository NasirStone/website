import { useEffect, useMemo, useRef, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import DronesPage from "./pages/drones.jsx";
import NasirPage from "./pages/nasir.jsx";
import AutonomousVehiclesPage from "./pages/autonomousvehicles.jsx";
import RocketryPage from "./pages/rocketry.jsx";

const SANS =
  '"Geist", -apple-system, BlinkMacSystemFont, "Segoe UI", Inter, Helvetica, Arial, sans-serif';
const MONO = "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";

// Resume link: defaults to /resume.pdf (place the PDF in /public),
// but can be overridden via Vite env var VITE_RESUME_URL.
const RESUME_URL = (import.meta?.env?.VITE_RESUME_URL || "/resume.pdf").trim();

// Terminal story for the `portfolio` command.
// Edit the lines below to customize what gets printed in-terminal.
const PORTFOLIO_STORY = [
  "",
  "For my first portfolio, I set out to make something bold and creative.",
  "",
  "Inspired by an assignment in my OOP class, a 'mock os',",
  "I loved the ability to program my own arguments with C++.",
  "This design language inspired the layout of this website.",
  "",
  "For anyone familiar with Bash, this should be intuitive,",
  "(you can even use cd to move between directories)",
  "However I also wanted thisp to be accessible to the non-technical, so",
  "creating a website that is inviting, yet unique was important to me.",
  "",
  "I hope you enjoy!",
];

// Terminal text for the `contact` keyword.
const CONTACT_STORY = [
  { type: "output", text: "" },

  { type: "output", text: "Email:" },
  {
    type: "link",
    text: "nasir@wustl.edu",
    href: "mailto:nasir@wustl.edu",
    newTab: true,
  },

  { type: "output", text: "" },
  { type: "output", text: "LinkedIn:" },
  {
    type: "link",
    text: "linkedin.com/in/nasir-sims",
    href: "https://www.linkedin.com/in/nasir-sims",
    newTab: true,
  },

  { type: "output", text: "" },
  { type: "output", text: "GitHub:" },
  {
    type: "link",
    text: "github.com/NasirStone",
    href: "https://github.com/NasirStone",
    newTab: true,
  },
];

const KEYWORDS = [
  "about me",
  "rocketry",
  "drones",
  "autonomous vehicles",
  "cars",
  "contact",
  "portfolio",
  "resume",
  "vintage audio",
  "travel"
];

function normalizeKeyword(s) {
  return String(s || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function titleCaseWords(s) {
  return String(s || "")
    .split(" ")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function displayKeyword(raw) {
  return titleCaseWords(raw);
}

const KEYWORDS_NORMALIZED = KEYWORDS.map(normalizeKeyword).filter(Boolean);
const VALID_KEYWORDS = new Set(KEYWORDS_NORMALIZED);

function seeded01(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function wordCloudStyle(seed) {
  const leftPct = Math.floor(seeded01(seed + 1) * 96) + 2; // 2%..98%
  const topPct = Math.floor(seeded01(seed + 2) * 96) + 2; // 2%..98%

  const size = 1.3 + seeded01(seed + 3) * 2.2; // rem ~1.3..3.5
  // Slower, calmer motion; start mid-animation so returning to the page doesn't "ramp" everything at once.
  const duration = (9 + seeded01(seed + 5) * 10).toFixed(2) + "s"; // 9..19s
  const delay = "-" + (seeded01(seed + 6) * 18).toFixed(2) + "s"; // negative delay = random phase
  const maxOpacity = (0.1 + seeded01(seed + 7) * 0.22).toFixed(2); // ~0.10..0.32
  const minOpacity = (0.03 + seeded01(seed + 8) * 0.05).toFixed(2); // ~0.03..0.08

  return {
    leftPct,
    topPct,
    fontSizeRem: Number(size.toFixed(2)),
    animationDuration: duration,
    animationDelay: delay,
    minOpacity,
    maxOpacity,
  };
}

function Landing({ theme, setTheme }) {
  const navigate = useNavigate();

  const isLight = theme === "light";

  // Theme tokens (source of truth lives in App via CSS variables)
  const FG = "var(--fg)";
  const MUTED = "var(--muted)";
  const PAGE_BG = "var(--page-bg)";

  // Terminal surface
  const TERM_BG = isLight ? "rgba(245, 247, 249, 0.88)" : "rgba(12,12,13,0.90)";
  const TERM_HDR_BG = isLight ? "rgba(0,0,0,0.035)" : "rgba(255,255,255,0.06)";
  const TERM_BORDER = isLight ? "rgba(0,0,0,0.14)" : "rgba(255,255,255,0.14)";
  const INSET_LINE = isLight ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.06)";
  // Word cloud (darker/inkier, less “glowy”)
  const CLOUD_COLOR = isLight ? "rgba(0,0,0,0.75)" : "rgba(255,255,255,0.55)";

  // Menu button
  const MENU_BG = "var(--shell-bg)";
  const [input, setInput] = useState("");
  const [history, setHistory] = useState(() => {
    try {
      const raw = sessionStorage.getItem("terminalHistory");
      const parsed = raw ? JSON.parse(raw) : null;
      return Array.isArray(parsed)
        ? parsed
        : [{ type: "system", text: "Type a keyword to begin" }];
    } catch {
      return [{ type: "system", text: "Type a keyword to begin" }];
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
  // Background typed text (behind terminal, above keywords)
  const [bgTopText, setBgTopText] = useState("");
  const [bgBottomText, setBgBottomText] = useState("");
  const [bgStage, setBgStage] = useState("top");

  const [isLoading, setIsLoading] = useState(false);
  const [loadingPct, setLoadingPct] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarIn, setSidebarIn] = useState(false);
  const sidebarKeywords = KEYWORDS_NORMALIZED;
  const sortedKeywords = useMemo(() => Array.from(VALID_KEYWORDS).sort(), []);

  // Draggable terminal window position (top-left in px)
  const [terminalPos, setTerminalPos] = useState(() => {
    if (typeof window === "undefined") {
      return { x: 0, y: 0 };
    }

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const w = Math.min(733, vw * 0.8712);
    const h = Math.min(554, vh * 0.693);

    return {
      x: Math.max(12, Math.round(vw / 2 - w / 2)),
      y: Math.max(12, Math.round(vh / 2 - h / 2 + 18)),
    };
  });
  const [terminalSize, setTerminalSize] = useState({ w: 0, h: 0 });
  const draggingRef = useRef({ active: false, dx: 0, dy: 0 });
  const inputRef = useRef(null);

  const cmdHistoryRef = useRef([]);
  const cmdIndexRef = useRef(-1); // -1 = not browsing history
  const cmdDraftRef = useRef(""); // what you were typing before pressing ↑/↓

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("terminalCmdHistory");
      const parsed = raw ? JSON.parse(raw) : null;
      if (Array.isArray(parsed)) {
        cmdHistoryRef.current = parsed.filter((x) => typeof x === "string");
      }
    } catch {
      // ignore
    }
  }, []);

  function persistCmdHistory() {
    try {
      sessionStorage.setItem(
        "terminalCmdHistory",
        JSON.stringify(cmdHistoryRef.current.slice(-200))
      );
    } catch {
      // ignore
    }
  }

  const [isDragging, setIsDragging] = useState(false);
  const settleTimerRef = useRef(null);

  const [isCompact, setIsCompact] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 640;
  });
  useEffect(() => {
    // initialize size immediately
    try {
      const vw = window.innerWidth || 1200;
      const vh = window.innerHeight || 800;
      const w = Math.min(733, vw * 0.8712);
      const h = Math.min(554, vh * 0.693);
      setTerminalSize({ w, h });
    } catch {
      // ignore
    }

    function onResize() {
      const vw = window.innerWidth || 1200;
      const vh = window.innerHeight || 800;
      setIsCompact(vw < 640);

      const w = Math.min(733, vw * 0.8712);
      const h = Math.min(554, vh * 0.693);
      setTerminalSize({ w, h });

      // Clamp terminal into view on resize
      setTerminalPos((p) => {
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
      const w = Math.min(733, vw * 0.8712);
      const h = Math.min(554, vh * 0.693);

      const nextX = e.clientX - draggingRef.current.dx;
      const nextY = e.clientY - draggingRef.current.dy;

      const x = Math.min(Math.max(12, nextX), Math.max(12, vw - w - 12));
      const y = Math.min(Math.max(12, nextY), Math.max(12, vh - h - 12));

      setTerminalPos({ x, y });
    }

    function onUp() {
      const wasDragging = draggingRef.current.active;
      draggingRef.current.active = false;

      if (settleTimerRef.current) clearTimeout(settleTimerRef.current);
      settleTimerRef.current = setTimeout(() => {
        setIsDragging(false);
        if (wasDragging) {
          // re-focus the hidden input after dragging so typing works again
          window.setTimeout(() => focusInput(), 0);
        }
      }, 180);

      if (wasDragging) {
        // also nudge focus immediately for fast drags
        window.setTimeout(() => focusInput(), 0);
      }
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

      // Deterministic during SPA navigation, but re-randomize on a full page refresh.
      // We do this by generating a new seed once per runtime and caching it in sessionStorage.
      let seedBase = 0;
      try {
        const win = window;
        const runtimeKey = "__wordCloudSeedInitialized";
        const existing = sessionStorage.getItem("wordCloudSeed");

        // If this JS runtime already initialized the seed, reuse it (prevents jumps when navigating away/back).
        if (win && win[runtimeKey] && existing) {
          seedBase = Number(existing) || 0;
        } else {
          // New runtime (e.g., hard refresh) -> new seed.
          seedBase = Math.floor(Math.random() * 1_000_000_000);
          sessionStorage.setItem("wordCloudSeed", String(seedBase));
          if (win) win[runtimeKey] = true;
        }

        if (!seedBase) seedBase = 123456789;
      } catch {
        seedBase = 123456789;
      }

      let rngState = seedBase >>> 0;
      function rand01() {
        // LCG
        rngState = (rngState * 1664525 + 1013904223) >>> 0;
        return rngState / 4294967296;
      }
      function randInt(max) {
        return Math.floor(rand01() * max);
      }

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

      const total = KEYWORDS_NORMALIZED.length * repeats;

      for (let idx = 0; idx < total; idx++) {
        const word = KEYWORDS_NORMALIZED[idx % KEYWORDS_NORMALIZED.length];
        const rep = Math.floor(idx / KEYWORDS_NORMALIZED.length);

        // const seedForDisplay = randInt(1_000_000_000);
        // const display = displayKeyword(word, seedForDisplay + rep * 97);
        const display = displayKeyword(word);

        // Try a bunch of times to find a non-overlapping location
        let chosen = null;

        for (let attempt = 0; attempt < 160; attempt++) {
          const seed = randInt(1_000_000_000);
          const s = wordCloudStyle(seed);

          // Jitter inside clustered band to reduce “grid” feel
          const jitterLeft = (rand01() - 0.5) * 6; // +/- 3%
          const jitterTop = (rand01() - 0.5) * 6; // +/- 3%

          const leftPct = Math.min(98, Math.max(2, s.leftPct + jitterLeft));
          const topPct = Math.min(98, Math.max(2, s.topPct + jitterTop));

          const rect = estimateRect(display, s.fontSizeRem, leftPct, topPct);

          // Keep inside viewport with small padding
          const pad = 8;
          const rectPadded = {
            x: rect.x - pad,
            y: rect.y - pad,
            w: rect.w + pad * 2,
            h: rect.h + pad * 2,
          };

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
            display,
            rep,
            left: `${leftPct}%`,
            top: `${topPct}%`,
            fontSize: `${(isSmall
              ? s.fontSizeRem * 0.72
              : s.fontSizeRem
            ).toFixed(2)}rem`,
            animationDuration: s.animationDuration,
            animationDelay: s.animationDelay,
            minOpacity: s.minOpacity,
            maxOpacity: s.maxOpacity,
          };

          placed.push(rectPadded);
          break;
        }

        // If we failed to place without overlap, place it anyway (rare) but smaller
        if (!chosen) {
          const seed = randInt(1_000_000_000);
          const s = wordCloudStyle(seed);
          chosen = {
            word,
            display,
            rep,
            left: `${s.leftPct}%`,
            top: `${s.topPct}%`,
            fontSize: `${Math.max(
              0.95,
              isSmall ? s.fontSizeRem * 0.65 : s.fontSizeRem * 0.85
            ).toFixed(2)}rem`,
            animationDuration: s.animationDuration,
            animationDelay: s.animationDelay,
            minOpacity: s.minOpacity,
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

  useEffect(() => {
    const top = "Nasir Sims";
    const bottom =
      "Type any word you see into the terminal to access a page. Type 'help' to learn more.";
    let cancelled = false;

    function typeLine(line, setLine, onDone, speed = 1) {
      let i = 0;

      function tick() {
        if (cancelled) return;

        i += 1;
        setLine(line.slice(0, i));

        if (i >= line.length) {
          if (onDone) onDone();
          return;
        }

        const base = 18 / speed;
        const jitter = (Math.random() * 26) / speed;
        const extra = line[i - 1] === " " ? 18 / speed : 0;
        setTimeout(tick, base + jitter + extra);
      }

      tick();
    }

    setBgTopText("");
    setBgBottomText("");
    setBgStage("top");

    typeLine(top, setBgTopText, () => {
      if (cancelled) return;

      setBgStage("bottom");

      setTimeout(() => {
        if (cancelled) return;

        typeLine(
          bottom,
          setBgBottomText,
          () => {
            if (cancelled) return;
            setBgStage("done");
          },
          1.6
        );
      }, 120);
    });

    return () => {
      cancelled = true;
    };
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

  function focusInput() {
    try {
      inputRef.current && inputRef.current.focus();
    } catch {
      // ignore
    }
  }

  function openSidebar() {
    setShowTip(false);
    setIsSidebarOpen(true);
    // Next frame so the transition can play
    requestAnimationFrame(() => setSidebarIn(true));
  }

  function closeSidebar(after) {
    setSidebarIn(false);
    // Match the CSS transition duration
    window.setTimeout(() => {
      setIsSidebarOpen(false);
      if (typeof after === "function") after();
    }, 180);
  }

  useEffect(() => {
    function refocus() {
      // Only refocus if we’re on the landing page and the sidebar isn’t actively capturing clicks.
      // We intentionally do NOT steal focus while the user is typing in another real input.
      const el = document.activeElement;
      const isTextField =
        el &&
        (el.tagName === "INPUT" ||
          el.tagName === "TEXTAREA" ||
          el.getAttribute("contenteditable") === "true");

      if (isTextField) return;

      // Defer one tick so the browser finishes restoring focus after app switch.
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          if (typeof focusInput === "function") focusInput();
          else if (inputRef?.current) inputRef.current.focus();
        });
      });
    }

    function onVis() {
      if (document.visibilityState === "visible") refocus();
    }

    window.addEventListener("focus", refocus);
    document.addEventListener("visibilitychange", onVis);

    return () => {
      window.removeEventListener("focus", refocus);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  // Refocus input after sidebar closes
  useEffect(() => {
    if (!isSidebarOpen) {
      // next tick to allow DOM to update after closing animation
      const t = window.setTimeout(() => focusInput(), 0);
      return () => window.clearTimeout(t);
    }
  }, [isSidebarOpen]);

  function navigateWithLoading({ cmd, path, label }) {
    setHistory((h) => [
      ...h,
      { type: "prompt", text: `nasir % ${cmd}` },
      { type: "system", text: `# loading ${label}…` },
    ]);
    setShowTip(false);

    setIsLoading(true);
    setLoadingPct(0);

    const steps = [45, 80, 100];
    steps.forEach((pct, i) => {
      setTimeout(() => setLoadingPct(pct), 45 + i * 45);
    });

    setTimeout(() => {
      setIsLoading(false);
      setSidebarIn(false);
      setIsSidebarOpen(false);
      navigate(path);
    }, 180);
  }

  function runCommand(raw) {
    const cmd = normalizeKeyword(raw);
    // Easter egg: allow `cd <keyword>` as an alias for navigating to a keyword
    let effectiveCmd = cmd;
    if (cmd.startsWith("cd ")) {
      const target = normalizeKeyword(cmd.slice(3));
      if (target) effectiveCmd = target;
    }

    if (!effectiveCmd) return;

    if (effectiveCmd === "lightmode" || effectiveCmd === "darkmode") {
      const next = effectiveCmd === "lightmode" ? "light" : "dark";
      setTheme(next);
      setHistory((h) => [
        ...h,
        { type: "prompt", text: `nasir % ${raw}` },
        {
          type: "output",
          text:
            next === "light"
              ? "Switched to light mode."
              : "Switched to dark mode.",
        },
      ]);
      setShowTip(false);
      return;
    }

    if (effectiveCmd === "ls") {
      const list = sortedKeywords;
      const cols = isCompact ? 2 : 4;
      const lines = formatColumns(list, cols);

      setHistory((h) => [
        ...h,
        { type: "prompt", text: `nasir % ${raw}` },
        ...lines.map((t) => ({ type: "output", text: t })),
      ]);
      setShowTip(false);
      return;
    }

    if (effectiveCmd === "clear") {
      setHistory([]);
      setShowTip(false);
      return;
    }

    if (effectiveCmd === "help") {
      setHistory((h) => [
        ...h,
        { type: "prompt", text: `nasir % ${raw}` },
        {
          type: "output",
          text: "Terminal Navigation",
        },
        { type: "output", text: "" },
        {
          type: "output",
          text: "Type a keyword and press Enter to open its page",
        },
        {
          type: "output",
          text: "Find keywords in the background, the menu button (top-left), or by running 'ls'",
        },
        { type: "output", text: "" },
        { type: "output", text: "Usage:" },
        { type: "output", text: "  <keyword>        open a page" },
        { type: "output", text: "  help             show this message" },
        { type: "output", text: "  ls               list available keywords" },
        { type: "output", text: "  clear            clear terminal output" },
        { type: "output", text: "  lightmode        switch to light mode" },
        { type: "output", text: "  darkmode         switch to dark mode" },
        { type: "output", text: "" },
        { type: "output", text: "Examples:" },
        { type: "output", text: "  drones" },
        { type: "output", text: "  ls" },
      ]);
      setShowTip(false);
      return;
    }

    if (VALID_KEYWORDS.has(effectiveCmd)) {
      // routes that exist today

      if (effectiveCmd === "portfolio") {
        setHistory((h) => [
          ...h,
          { type: "prompt", text: `nasir % ${raw}` },
          ...PORTFOLIO_STORY.map((t) => ({ type: "output", text: t })),
        ]);
        setShowTip(false);
        return;
      }

      if (effectiveCmd === "contact") {
        setHistory((h) => [
          ...h,
          { type: "prompt", text: `nasir % ${raw}` },
          ...CONTACT_STORY,
        ]);
        setShowTip(false);
        return;
      }

      if (effectiveCmd === "resume") {
        setHistory((h) => [
          ...h,
          { type: "prompt", text: `nasir % ${raw}` },
          {
            type: "link",
            text: "Download résumé (PDF)",
            href: RESUME_URL,
            download: true,
            newTab: false,
          },
        ]);
        setShowTip(false);
        return;
      }

      if (effectiveCmd === "about me") {
        navigateWithLoading({ cmd: raw, path: "/nasir", label: "about me" });
        return;
      }

      if (effectiveCmd === "drones") {
        navigateWithLoading({ cmd: raw, path: "/drones", label: "drones" });
        return;
      }

      if (effectiveCmd === "autonomous vehicles") {
        navigateWithLoading({
          cmd: raw,
          path: "/autonomous-vehicles",
          label: "autonomous vehicles",
        });
        return;
      }

      if (effectiveCmd === "rocketry") {
        navigateWithLoading({ cmd: raw, path: "/rocketry", label: "rocketry" });
        return;
      }

      setHistory((h) => [
        ...h,
        { type: "prompt", text: `nasir % ${raw}` },
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
      { type: "prompt", text: `nasir % ${raw}` },
      {
        type: "error",
        text: `Command not found: ${effectiveCmd}. Type help for commands.`,
      },
    ]);
  }

  function onSubmit(e) {
    e.preventDefault();
    const raw = input;
    const trimmed = raw.trim();
    if (trimmed) {
      const list = cmdHistoryRef.current;
      if (!list.length || list[list.length - 1] !== trimmed) {
        list.push(trimmed);
        if (list.length > 200) list.splice(0, list.length - 200);
        persistCmdHistory();
      }
    }
    cmdIndexRef.current = -1;
    cmdDraftRef.current = "";
    setInput("");
    runCommand(raw);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: PAGE_BG,
        color: FG,
        position: "relative",
        overflow: "hidden",
      }}
      onPointerDown={(e) => {
        // Don't steal focus from interactive elements
        if (e.target && typeof e.target.closest === "function") {
          const interactive = e.target.closest(
            "button,a,input,textarea,select,[role='dialog']"
          );
          if (interactive) return;
        }
        focusInput();
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;600;700&display=swap');
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
          border: 1px solid ${
            isLight ? "rgba(0,0,0,0.14)" : "rgba(255,255,255,0.14)"
          };
          background: ${
            isLight ? "rgba(245, 247, 249, 0.92)" : "rgba(0, 0, 0, 0.86)"
          };
          box-shadow: 0 18px 55px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.06) inset;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          color: ${
            isLight ? "rgba(18, 10, 12, 0.92)" : "rgba(235,235,235,0.92)"
          };
          padding: 0.9rem 0.85rem;
          backdrop-filter: blur(12px);
          transform: translateX(-110%);
          transition: transform 180ms ease, opacity 180ms ease;
          opacity: 0;
          will-change: transform, opacity;
        }
        .sidebarIn {
          transform: translateX(0);
          opacity: 1;
        }
        .sidebarOverlayFade {
          opacity: 0;
          transition: opacity 180ms ease;
        }
        .sidebarOverlayFade.sidebarOverlayIn {
          opacity: 1;
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
          margin-top: -4px;
          margin-bottom: 0.55rem;
          opacity: 0.9;
          font-size: 0.9rem;
          line-height: 1;
        }
        .sidebarTitle {
          position: relative;
          top: -1px;
        }
        .sidebarCloseBtn {
          width: 36px;
          height: 32px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: none;
          box-shadow: none;
          color: ${
            isLight ? "rgba(18, 10, 12, 0.78)" : "rgba(235,235,235,0.92)"
          };
          border-radius: 0;
          padding: 0;
          cursor: pointer;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 1.8rem;
          font-weight: 600;
          line-height: 1;
          transform: translateY(-1px);
          outline: none;
        }
        .sidebarCloseBtn:focus-visible {
          outline: 2px solid ${
            isLight ? "rgba(0,0,0,0.18)" : "rgba(255,255,255,0.22)"
          };
          outline-offset: 2px;
          border-radius: 8px;
        }
        .sidebarCloseBtn:hover {
          color: ${
            isLight ? "rgba(18, 10, 12, 0.92)" : "rgba(235,235,235,0.92)"
          };
        }
        .keywordBtn {
          width: 100%;
          text-align: left;
          background: ${
            isLight ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.03)"
          };
          border: 1px solid ${
            isLight ? "rgba(0,0,0,0.10)" : "rgba(255,255,255,0.10)"
          };
          color: ${
            isLight ? "rgba(18, 10, 12, 0.92)" : "rgba(235,235,235,0.92)"
          };
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
        .menuBtn {
          -webkit-tap-highlight-color: transparent;
          outline: none;
        }
        .menuBtn:focus {
          outline: none;
        }
        .menuBtn:focus-visible {
          outline: 2px solid rgba(235,235,235,0.22);
          outline-offset: 4px;
          border-radius: 12px;
        }
        .menuBtn:hover {
          outline: none;
        }
        html, body, #root {
          height: 100%;
          width: 100%;
          margin: 0;
          padding: 0;
          background: var(--page-bg);
          overflow: hidden;
        }
        @keyframes wordFade {
          0% { opacity: var(--min-opacity); filter: blur(0px); }
          40% { opacity: var(--max-opacity); filter: blur(0px); }
          70% { opacity: var(--min-opacity); filter: blur(0px); }
          100% { opacity: var(--min-opacity); filter: blur(0px); }
        }
        @keyframes blockBlink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .terminalWindow {
  width: min(733px, 87.12vw);
  height: min(554px, 69.3vh);
  max-height: 69.3vh;
  display: flex;
  flex-direction: column;
}
@media (max-width: 640px) {
  .terminalWindow {
    width: min(554px, 93.06vw);
    height: min(515px, 77.22vh);
    max-height: 77.22vh;
  }
}
        .terminalBody {
          font-size: 0.9rem;
          flex: 1;
          overflow: auto;
          overscroll-behavior: contain;
        }
        @media (max-width: 640px) {
          .terminalBody {
            font-size: 0.85rem;
          }
        }
      `}</style>
      {isSidebarOpen ? (
        <div
          className={`sidebarOverlay sidebarOverlayFade ${
            sidebarIn ? "sidebarOverlayIn" : ""
          }`}
          onClick={() => closeSidebar()}
          role="presentation"
        >
          <div
            className={`sidebar ${sidebarIn ? "sidebarIn" : ""}`}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Keywords"
          >
            <div className="sidebarHeader">
              <div className="sidebarTitle">Pages</div>
              <button
                type="button"
                className="sidebarCloseBtn"
                onClick={() => closeSidebar()}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="keywordGrid">
              {sidebarKeywords.map((k) => (
                <button
                  key={k}
                  type="button"
                  className="keywordBtn"
                  onClick={() => closeSidebar(() => runCommand(k))}
                >
                  {titleCaseWords(k)}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {/* global nav */}
      <button
        type="button"
        aria-label="Menu"
        className="menuBtn"
        onClick={() => (isSidebarOpen ? closeSidebar() : openSidebar())}
        onPointerDown={(e) => e.preventDefault()}
        style={{
          position: "absolute",
          left: 14,
          top: 14,
          zIndex: 21,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 51,
          height: 44,
          background: MENU_BG,
          border: "none",
          borderRadius: 12,
          cursor: "pointer",
          padding: 0,
          backdropFilter: "blur(10px)",
          boxShadow: "0 18px 55px rgba(0,0,0,0.35)",
          opacity: isSidebarOpen ? 0 : 1,
          transform: isSidebarOpen ? "scale(0.92)" : "scale(1)",
          transition: "opacity 140ms ease, transform 140ms ease",
          pointerEvents: isSidebarOpen ? "none" : "auto",
        }}
      >
        <span aria-hidden="true" style={{ display: "grid", gap: 4 }}>
          <span
            style={{
              width: 22,
              height: 2.2,
              borderRadius: 999,
              background: FG,
            }}
          />
          <span
            style={{
              width: 22,
              height: 2.2,
              borderRadius: 999,
              background: FG,
            }}
          />
          <span
            style={{
              width: 22,
              height: 2.2,
              borderRadius: 999,
              background: FG,
            }}
          />
        </span>
      </button>

      {/* background typed text (behind terminal, above keywords) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          pointerEvents: "none",
          fontFamily: MONO,
          color: FG,
        }}
        aria-hidden="true"
      >
        {/* top line */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 110,
            transform: "translateX(-50%)",
            width: "fit-content",
            maxWidth: "min(1100px, calc(100vw - 24px))",
            textAlign: "left",
            opacity: 0.92,
            fontFamily: SANS,
            fontSize: "clamp(2.4rem, 6vw, 4.2rem)",
            fontWeight: 600,
            letterSpacing: "-0.05em",
            lineHeight: "1.2",
            whiteSpace: "pre-wrap",
            textShadow: "0 2px 18px rgba(0,0,0,0.75)",
          }}
        >
          <span
            style={{
              position: "relative",
              display: "inline-block",
              paddingBottom: 10,
            }}
          >
            <span>{bgTopText}</span>
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "100%",
                top: 0,
                display: "inline-block",
                width: "0.62em",
                height: "1.15em",
                marginLeft: "2px",
                background: "var(--caret-block)",
                // animation: "blockBlink 1s steps(1, end) infinite",
                animation:
                  bgStage === "top"
                    ? "blockBlink 1s steps(1, end) infinite"
                    : "none",
                verticalAlign: "-0.15em",
                opacity: bgStage === "top" ? 1 : 0,
                transition: "opacity 120ms ease",
                pointerEvents: "none",
              }}
            />
          </span>
        </div>

        {/* bottom line */}
        <div
          style={{
            position: "absolute",
            left: terminalPos.x + terminalSize.w / 2,
            top: Math.min(
              (typeof window !== "undefined"
                ? window.innerHeight
                : terminalPos.y + terminalSize.h) - 24,
              terminalPos.y + terminalSize.h + 18
            ),
            transform: "translateX(-50%)",
            width: Math.min(
              terminalSize.w,
              (typeof window !== "undefined"
                ? window.innerWidth
                : terminalSize.w) - 24
            ),
            textAlign: "center",
            opacity: isDragging ? 0 : 0.92,
            transition: `opacity ${isDragging ? 140 : 650}ms ease`,
            fontSize: "1.05rem",
            whiteSpace: "pre-wrap",
            textShadow: "0 2px 18px rgba(0,0,0,0.75)",
            color:
              theme === "light"
                ? "rgba(18, 10, 12, 0.92)"
                : "rgba(245,245,245,0.96)",
          }}
        >
          <span>{bgBottomText}</span>
          {bgStage === "bottom" ? (
            <span
              style={{
                display: "inline-block",
                width: "0.62em",
                height: "1.15em",
                marginLeft: "2px",
                background: "var(--caret-block)",
                // animation: "blockBlink 1s steps(1, end) infinite",
                animation:
                  bgStage === "bottom"
                    ? "blockBlink 1s steps(1, end) infinite"
                    : "none",
                verticalAlign: "-0.15em",
                opacity: isDragging ? 0 : 1,
                transition: "opacity 220ms ease",
              }}
            />
          ) : null}
        </div>
      </div>

      {wordCloudItems.map((item, i) => (
        <span
          key={`${item.word}-${item.rep}-${i}`}
          style={{
            position: "absolute",
            zIndex: 1,
            left: item.left,
            top: item.top,
            fontFamily: MONO,
            letterSpacing: "0.06em",
            mixBlendMode: isLight ? "multiply" : "screen",
            transform: "translateZ(0)",
            fontSize: item.fontSize,
            userSelect: "none",
            pointerEvents: "none",
            whiteSpace: "nowrap",
            animationName: "wordFade",
            animationTimingFunction: "ease-in-out",
            animationIterationCount: "infinite",
            animationDuration: `calc(${item.animationDuration} * 0.6)`,
            animationDelay: item.animationDelay,
            animationFillMode: "both",
            // textTransform: "capitalize", // removed to render as stored
            ["--min-opacity"]: isLight
              ? String(Math.min(0.18, Number(item.minOpacity) * 2.0))
              : String(Math.min(0.2, Number(item.minOpacity) * 2.2)),
            ["--max-opacity"]: isLight
              ? String(Math.min(0.7, Number(item.maxOpacity) * 1.7))
              : String(Math.min(0.62, Number(item.maxOpacity) * 2.1)),
            color: CLOUD_COLOR,
            textShadow: isLight
              ? "0 1px 10px rgba(0,0,0,0.25)"
              : "0 1px 12px rgba(0,0,0,0.15)",
          }}
        >
          {item.display || item.word}
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
            border: `1px solid ${TERM_BORDER}`,
            background: TERM_BG,
            boxShadow: `0 24px 70px rgba(0,0,0,0.55), 0 0 0 1px ${INSET_LINE} inset`,
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
              borderBottom: `1px solid ${
                isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)"
              }`,
              background: TERM_HDR_BG,
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
              setIsDragging(true);

              if (settleTimerRef.current) {
                clearTimeout(settleTimerRef.current);
                settleTimerRef.current = null;
              }

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
                  ) : line.type === "link" ? (
                    <a
                      href={line.href}
                      download={line.download ? "resume" : undefined}
                      target={line.newTab ? "_blank" : undefined}
                      rel={line.newTab ? "noreferrer" : undefined}
                      style={{
                        color:
                          theme === "light"
                            ? "rgba(18, 10, 12, 0.85)"
                            : "rgba(220,220,220,0.92)",
                        textDecoration: "underline",
                      }}
                    >
                      {line.text}
                    </a>
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
                  color: FG,
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
                        background: "var(--caret-block)",
                        animation: "blockBlink 1s steps(1, end) infinite",
                      }}
                    />
                  </div>

                  {/* real input (captures typing) */}
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => {
                      // typing exits history mode
                      if (cmdIndexRef.current !== -1) {
                        cmdIndexRef.current = -1;
                        cmdDraftRef.current = "";
                      }
                      setInput(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;

                      const list = cmdHistoryRef.current;
                      if (!list.length) return;

                      e.preventDefault();

                      // first time entering history mode: save current draft
                      if (cmdIndexRef.current === -1) {
                        cmdDraftRef.current = input;
                        cmdIndexRef.current = list.length; // cursor after last
                      }

                      if (e.key === "ArrowUp") {
                        cmdIndexRef.current = Math.max(
                          0,
                          cmdIndexRef.current - 1
                        );
                        setInput(list[cmdIndexRef.current] || "");
                        return;
                      }

                      // ArrowDown
                      cmdIndexRef.current = Math.min(
                        list.length,
                        cmdIndexRef.current + 1
                      );
                      if (cmdIndexRef.current >= list.length) {
                        cmdIndexRef.current = -1;
                        setInput(cmdDraftRef.current || "");
                      } else {
                        setInput(list[cmdIndexRef.current] || "");
                      }
                    }}
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
            </form>
          </div>
        </div>
      </div>
      {/* footer */}
      <div
        style={{
          position: "absolute",
          right: 14,
          bottom: 12,
          zIndex: 6,
          pointerEvents: "none",
          fontFamily: MONO,
          fontSize: "0.75rem",
          color: isLight ? "rgba(18, 10, 12, 0.68)" : "rgba(235,235,235,0.9)",
          opacity: 0.9,
          textShadow: isLight
            ? "0 2px 14px rgba(0,0,0,0.18)"
            : "0 2px 14px rgba(0,0,0,0.7)",
        }}
        aria-hidden="true"
      >
        © 2026 Nasir Sims
      </div>
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState(() => {
    try {
      const raw = localStorage.getItem("theme");
      return raw === "light" || raw === "dark" ? raw : "dark";
    } catch {
      return "dark";
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    const isLight = theme === "light";

    root.style.setProperty(
      "--page-bg",
      isLight
        ? "radial-gradient(1400px 900px at 50% 0%, rgba(0,0,0,0.035), rgba(0,0,0,0.00)), #f4f6f8"
        : "radial-gradient(1400px 900px at 50% 0%, rgba(255,255,255,0.02), rgba(0,0,0,0.985)), #060607"
    );

    root.style.setProperty(
      "--fg",
      isLight ? "rgba(18, 10, 12, 0.92)" : "rgba(235,235,235,0.92)"
    );

    root.style.setProperty(
      "--muted",
      isLight ? "rgba(40, 24, 26, 0.62)" : "rgba(170, 170, 170, 0.75)"
    );

    root.style.setProperty(
      "--panel-bg",
      isLight ? "rgba(245, 247, 249, 0.92)" : "rgba(0,0,0,0.82)"
    );

    root.style.setProperty(
      "--panel-border",
      isLight ? "rgba(0,0,0,0.14)" : "rgba(255,255,255,0.14)"
    );

    root.style.setProperty(
      "--shell-bg",
      isLight ? "rgba(245, 247, 249, 0.72)" : "rgba(0,0,0,0.55)"
    );

    root.style.setProperty(
      "--shell-border",
      isLight ? "rgba(0,0,0,0.14)" : "rgba(255,255,255,0.14)"
    );

    root.style.setProperty(
      "--caret-block",
      isLight ? "rgba(18, 10, 12, 0.80)" : "rgba(235,235,235,0.85)"
    );

    root.style.setProperty("color-scheme", isLight ? "light" : "dark");
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem("theme", theme);
    } catch {
      // ignore
    }
  }, [theme]);

  return (
    <Routes>
      <Route path="/" element={<Landing theme={theme} setTheme={setTheme} />} />
      <Route path="/drones" element={<DronesPage />} />
      <Route path="/nasir" element={<NasirPage />} />
      <Route path="/autonomous-vehicles" element={<AutonomousVehiclesPage />} />
      <Route path="/rocketry" element={<RocketryPage />} />
    </Routes>
  );
}

import { useState, useEffect, useRef } from "react";

/* ─── DATA ───────────────────────────────────────────────────────────────── */
const NAV_ITEMS = [
  "Home",
  "About",
  "Experience",
  "Skills",
  "Projects",
  "MMA",
  "Blog",
  "Contact",
];

const EXPERIENCE = [
  {
    company: "ChipMango",
    role: "Application Engineer",
    period: "Aug 2025 – Present",
    type: "Hybrid",
    bullets: [
      "Architected and implemented backend services for a cloud-based EDA platform, reducing manual infrastructure setup effort by 99.3%",
      "Built a cloud-based license management server using FlexLM, reducing licensing and infrastructure costs by 95%",
      "Engineered a Windows desktop ECG viewer with BLE signal acquisition, visualization, and CSV export, reducing development time by 71.43%",
      "Designed workflows spanning backend infrastructure, real-time data processing, hardware communication, and desktop applications",
    ],
  },
  {
    company: "Graphite Technologies",
    role: "Founding Engineer",
    period: "Sep 2024 – Present",
    type: "Remote",
    bullets: [
      "Architected and shipped backend services for a recruitment and talent-coaching platform, including AI-driven course recommendation APIs",
      "Designed scalable RESTful services for a multi-tenant speech-therapy platform, covering session management, audio-processing integration, and tenant isolation",
      "Investigated system-level vulnerabilities in Windows environments using API-hooking techniques and proposed production mitigation strategies",
      "Mentored 12+ engineers in backend fundamentals, code review discipline, and high-performance system design",
    ],
  },
  {
    company: "Ubuntu Farms",
    role: "Backend Engineer Lead",
    period: "Nov 2024 – May 2025",
    type: "Remote · Contract",
    bullets: [
      "Architected and built a high-traffic e-commerce backend supporting 10,000 concurrent users and high-volume transactions",
      "Engineered fuzzy product search using PostgreSQL GIN indexing, improving search relevance and increasing user satisfaction by 70%",
      "Designed asynchronous media-processing workflows with Celery and Redis, reducing average user wait time by 50%",
      "Integrated multiple payment gateways using the Adapter pattern for reliable transaction processing",
      "Established code-review standards and deployment checklists to maintain production code quality",
    ],
  },
  {
    company: "Qudra",
    role: "Backend Engineer",
    period: "Sep 2024 – Feb 2025",
    type: "Remote · Contract",
    bullets: [
      "Led backend development for a large-scale examination platform supporting IELTS, TOEFL, JAMB, and WAEC, with real-time sessions for thousands of concurrent test-takers",
      "Diagnosed and resolved production database bottlenecks using Sentry and query optimization, reducing API latency from 500ms to 30ms — a 94% improvement",
      "Designed a Redis-based caching architecture for examination session state, reducing score-computation time by 40% and improving peak-load scalability",
      "Implemented a gamification streak system that increased user retention by 60%, alongside document and audio conversion services",
      "Developed analytics capabilities for user performance and engagement, enabling data-driven product decisions",
    ],
  },
  {
    company: "HNG / Hotels.ng",
    role: "Backend Engineer",
    period: "Mar 2023 – Mar 2024",
    type: "Remote",
    bullets: [
      "Executed a large-scale production data migration with 97% data accuracy while preserving SEO integrity across thousands of records",
      "Built backend services for a video recording and live-streaming platform, handling media ingestion, encoding callbacks, and delivery APIs",
      "Improved system throughput by 80% by offloading heavy processing to Celery background workers and freeing request threads",
      "Developed a Windows desktop application for web crawling, downtime detection, and automated website alerts",
    ],
  },
];

const SKILLS = {
  Languages: ["C#", "JavaScript", "TypeScript", "Python", "C++", "Golang", "SQL", "Shell Scripting", "HCL"],
  "Backend & Web Services": ["ASP.NET Core", "Express.js", "FastAPI", "Django", "Django REST Framework", "REST API Design"],
  "Databases & Storage": ["PostgreSQL", "MySQL", "Redis", "GIN Indexing", "Query Optimization"],
  "Distributed Systems": ["RabbitMQ", "Celery", "Async Processing", "Background Jobs", "Redis Caching"],
  Infrastructure: ["Docker", "AWS", "Terraform", "Git", "Sentry"],
  "ORM & Migrations": ["SQLAlchemy", "Alembic"],
};

const PROJECTS = [
  {
    title: "Smart Offsite Controlled Electric Meter",
    date: "Jun 2024",
    desc: "Designed backend systems for remote electricity purchase and IoT device control, reducing end-to-end transaction time by 70% through optimized API design and event-driven communication. Built real-time energy consumption tracking and secure REST APIs with authentication and authorization.",
    tags: ["Node.js", "IoT", "REST APIs", "Event-Driven"],
  },
  {
    title: "System Security Research",
    date: "Aug 2024",
    desc: "Conducted independent research on system-level vulnerabilities in secure browser environments using Windows API hooking; proposed mitigation techniques and submitted a patch to prevent automated bot voting.",
    tags: ["Security", "Windows API", "Systems"],
  },
  {
    title: "Plagiarism Detection Engine",
    date: "Jul 2024",
    desc: "Built a document and code similarity detection engine from scratch using the Winnowing algorithm, capable of identifying plagiarism across large text corpora with high precision.",
    tags: ["Python", "Algorithms", "NLP"],
  },
];

const STATS = [
  ["94%", "API latency reduction"],
  ["80%", "throughput increase"],
  ["99.3%", "setup effort reduction"],
  ["12+", "engineers mentored"],
];

/* ─── HOOKS ──────────────────────────────────────────────────────────────── */
function useWindowWidth() {
  const [w, setW] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return w;
}

function useScrollSpy() {
  const [active, setActive] = useState("Home");
  useEffect(() => {
    const fn = () => {
      let cur = "Home";
      for (const s of NAV_ITEMS) {
        const el = document.getElementById(s.toLowerCase());
        if (el && el.getBoundingClientRect().top <= 80) cur = s;
      }
      setActive(cur);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return active;
}

/* ─── HELPERS ────────────────────────────────────────────────────────────── */
const go = (id) =>
  document
    .getElementById(id.toLowerCase())
    ?.scrollIntoView({ behavior: "smooth" });

/* ─── SMALL COMPONENTS ───────────────────────────────────────────────────── */
const Tag = ({ children, bg = "#E8F0E9", color = "#1a5c1a" }) => (
  <span
    style={{
      background: bg,
      color,
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: "0.08em",
      padding: "3px 10px",
      borderRadius: 20,
      textTransform: "uppercase",
      display: "inline-block",
      whiteSpace: "nowrap",
    }}
  >
    {children}
  </span>
);

const SectionLabel = ({ children }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 12,
      marginBottom: "clamp(28px,5vw,48px)",
    }}
  >
    <span
      style={{ width: 28, height: 2, background: "#B5F265", flexShrink: 0 }}
    />
    <span
      style={{
        fontSize: 11,
        letterSpacing: "0.2em",
        fontWeight: 700,
        color: "#B5F265",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
    <span
      style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }}
    />
  </div>
);

/* ─── MAIN ───────────────────────────────────────────────────────────────── */
export default function Portfolio() {
  const w = useWindowWidth();
  const active = useScrollSpy();
  const isMobile = w < 640;
  const isTablet = w >= 640 && w < 1024;
  const isNarrow = w < 1024; // mobile + tablet → hamburger
  const [menu, setMenu] = useState(false);
  const [flipped, setFlipped] = useState({});
  const [hovExp, setHovExp] = useState(null);
  const canvasRef = useRef(null);

  /* lock body scroll when drawer open */
  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
  }, [menu]);

  /* close drawer on scroll */
  useEffect(() => {
    const fn = () => menu && setMenu(false);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [menu]);

  /* particles */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    const n = w < 640 ? 30 : 70;
    const link = w < 640 ? 80 : 120;
    const dots = Array.from({ length: n }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach((d) => {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > canvas.width) d.vx *= -1;
        if (d.y < 0 || d.y > canvas.height) d.vy *= -1;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(181,242,101,0.18)";
        ctx.fill();
      });
      for (let i = 0; i < dots.length; i++)
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x,
            dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < link) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(181,242,101,${0.07 * (1 - dist / link)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      raf = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const navClick = (item) => {
    go(item);
    setMenu(false);
  };
  const flip = (i) => setFlipped((f) => ({ ...f, [i]: !f[i] }));

  /* ── STYLES ── (injected once) */
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Lora:ital,wght@0,400;0,500;1,400&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    html{scroll-behavior:smooth;-webkit-text-size-adjust:100%}
    body{background:#0A0C0A;overscroll-behavior-y:none}
    ::selection{background:#B5F265;color:#0A0C0A}

    /* ── fluid type ── */
    .t-hero{font-size:clamp(38px,9vw,86px);font-weight:800;line-height:1.04;letter-spacing:-0.02em}
    .t-h2  {font-size:clamp(26px,5vw,42px);font-weight:800;line-height:1.1;letter-spacing:-0.02em}
    .t-h3  {font-size:clamp(15px,2.2vw,19px);font-weight:700;line-height:1.3}
    .t-body{font-size:clamp(14px,1.7vw,16px);line-height:1.78;font-family:Lora,serif}
    .t-sm  {font-size:clamp(12px,1.3vw,13px)}
    .lbl   {font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase}

    /* ── layout ── */
    .sp  {padding:clamp(56px,9vw,108px) 0}
    .wrap{width:100%;max-width:1120px;margin:0 auto;
          padding-left:clamp(16px,4.5vw,40px);padding-right:clamp(16px,4.5vw,40px)}

    /* ── nav ── */
    .nl{background:none;border:none;color:rgba(232,237,232,.5);font-family:Syne,sans-serif;
        font-size:12px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;
        cursor:pointer;transition:color .2s;padding:6px 0;min-height:44px;
        display:inline-flex;align-items:center}
    .nl:hover,.nl.on{color:#B5F265}
    .nl.on{border-bottom:1px solid #B5F265}

    /* ── mobile nav overlay ── */
    .moverlay{position:fixed;inset:0;z-index:200;background:rgba(10,12,10,.97);
      backdrop-filter:blur(20px);display:flex;flex-direction:column;
      align-items:center;justify-content:center;gap:4px;
      transition:opacity .28s,visibility .28s}
    .moverlay.hide{opacity:0;visibility:hidden;pointer-events:none}
    .moverlay.show{opacity:1;visibility:visible}
    .mnl{background:none;border:none;color:rgba(232,237,232,.6);font-family:Syne,sans-serif;
         font-size:clamp(22px,6vw,30px);font-weight:700;cursor:pointer;
         padding:10px 20px;min-height:54px;transition:color .2s;letter-spacing:-0.01em;
         width:100%;text-align:center}
    .mnl:hover,.mnl.on{color:#B5F265}

    /* ── hamburger ── */
    .hbg{background:none;border:none;cursor:pointer;width:44px;height:44px;
         display:flex;flex-direction:column;align-items:center;justify-content:center;
         gap:5px;padding:0;z-index:301;position:relative}
    .hbar{width:22px;height:2px;background:#E8EDE8;border-radius:2px;
          transition:transform .3s,opacity .3s}
    .hbg.x .hbar:nth-child(1){transform:translateY(7px) rotate(45deg)}
    .hbg.x .hbar:nth-child(2){opacity:0}
    .hbg.x .hbar:nth-child(3){transform:translateY(-7px) rotate(-45deg)}

    /* ── buttons ── */
    .btn-green{background:#B5F265;color:#0A0C0A;border:none;
      padding:clamp(11px,1.8vw,14px) clamp(22px,3vw,32px);border-radius:40px;
      font-family:Syne,sans-serif;font-size:clamp(13px,1.4vw,14px);font-weight:700;
      letter-spacing:.06em;cursor:pointer;transition:all .2s;
      min-height:48px;display:inline-flex;align-items:center}
    .btn-green:hover{background:#C8F77A;transform:translateY(-2px);
      box-shadow:0 8px 28px rgba(181,242,101,.22)}
    .btn-outline{background:transparent;color:#E8EDE8;
      border:1px solid rgba(255,255,255,.25);
      padding:clamp(10px,1.8vw,13px) clamp(20px,3vw,30px);border-radius:40px;
      font-family:Syne,sans-serif;font-size:clamp(13px,1.4vw,14px);font-weight:600;
      letter-spacing:.06em;cursor:pointer;transition:all .2s;
      min-height:48px;display:inline-flex;align-items:center}
    .btn-outline:hover{border-color:#B5F265;color:#B5F265}

    /* ── cards ── */
    .exp-card{border:1px solid rgba(255,255,255,.07);border-radius:16px;
      padding:clamp(16px,2.5vw,28px) clamp(16px,2.5vw,32px);
      transition:border-color .3s,transform .3s}
    .exp-card:hover{border-color:rgba(181,242,101,.35);transform:translateY(-2px)}
    @media(hover:none){.exp-card:hover{transform:none}}

    .blog-card{border:1px solid rgba(255,255,255,.07);border-radius:16px;
      padding:clamp(16px,2.5vw,26px) clamp(16px,2.5vw,26px) clamp(14px,2vw,22px);
      transition:all .3s;cursor:pointer;background:rgba(255,255,255,.02)}
    .blog-card:hover{border-color:rgba(181,242,101,.3);transform:translateY(-3px)}
    @media(hover:none){.blog-card:hover{transform:none}}

    .pill{display:inline-block;border:1px solid rgba(181,242,101,.25);
      background:rgba(181,242,101,.06);color:rgba(232,237,232,.85);
      font-size:clamp(12px,1.3vw,13px);font-weight:600;
      padding:6px clamp(10px,1.8vw,14px);border-radius:24px;margin:4px;
      transition:all .2s;white-space:nowrap}
    .pill:hover{background:rgba(181,242,101,.15);color:#B5F265;border-color:#B5F265}

    /* ── flip card ── */
    .flip-wrap{width:100%;height:clamp(158px,20vw,196px);perspective:1000px;cursor:pointer}
    .flip-inner{width:100%;height:100%;position:relative;
      transform-style:preserve-3d;transition:transform .55s cubic-bezier(.4,0,.2,1)}
    .flip-inner.done{transform:rotateY(180deg)}
    .flip-face{position:absolute;inset:0;backface-visibility:hidden;border-radius:14px;
      display:flex;flex-direction:column;align-items:center;justify-content:center;
      gap:10px;border:1px solid rgba(255,255,255,.1);padding:clamp(12px,2vw,18px)}
    .flip-back{transform:rotateY(180deg);background:rgba(181,242,101,.08);
      border-color:rgba(181,242,101,.25);text-align:center}

    /* ── contact ── */
    .ci{display:flex;align-items:center;gap:12px;
      padding:clamp(12px,1.8vw,14px) clamp(14px,2vw,20px);
      border:1px solid rgba(255,255,255,.07);border-radius:12px;
      transition:border-color .2s;text-decoration:none;color:inherit;min-height:56px}
    .ci:hover{border-color:rgba(181,242,101,.3)}

    /* ── grids ── */
    /* 2-col → 1-col below 700px */
    .g2{display:grid;grid-template-columns:1fr 1fr;gap:clamp(18px,4vw,40px)}
    @media(max-width:699px){.g2{grid-template-columns:1fr}}

    /* 2-col info cards (always 2 cols, tighter on mobile) */
    .ic{display:grid;grid-template-columns:1fr 1fr;gap:clamp(10px,1.8vw,16px)}

    /* blog: auto-fill columns */
    .bg{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(280px,100%),1fr));
        gap:clamp(12px,2vw,20px)}

    /* stat grid */
    .sg{display:grid;gap:clamp(20px,4vw,48px)}
    @media(max-width:480px){.sg{grid-template-columns:repeat(2,1fr)}}
    @media(min-width:481px){.sg{grid-template-columns:repeat(4,auto)}}

    /* ── misc ── */
    .divider{width:100%;height:1px;
      background:linear-gradient(90deg,transparent,rgba(181,242,101,.2),transparent)}
    .green{color:#B5F265}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
    @media(prefers-reduced-motion:reduce){*{animation-duration:.01ms!important;
      animation-iteration-count:1!important;transition-duration:.01ms!important}}
  `;

  return (
    <div
      style={{
        background: "#0A0C0A",
        color: "#E8EDE8",
        fontFamily: "'Syne',sans-serif",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <style>{css}</style>

      {/* ── PARTICLES ──────────────────────────────────────────────────────── */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          width: "100%",
          height: "100%",
        }}
      />

      {/* ── MOBILE DRAWER ──────────────────────────────────────────────────── */}
      <nav
        className={`moverlay ${menu ? "show" : "hide"}`}
        aria-label="Mobile navigation"
      >
        {NAV_ITEMS.map((item) => (
          <button
            key={item}
            className={`mnl ${active === item ? "on" : ""}`}
            onClick={() => navClick(item)}
          >
            {item}
          </button>
        ))}
        <div style={{ marginTop: 24 }}>
          <a
            href="mailto:abdulqowiyyuolamilekan@gmail.com"
            style={{
              fontSize: 12,
              color: "rgba(232,237,232,.35)",
              textDecoration: "none",
            }}
          >
            abdulqowiyyuolamilekan@gmail.com
          </a>
        </div>
      </nav>

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: "rgba(10,12,10,.9)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,.06)",
        }}
      >
        <div
          className="wrap"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 64,
          }}
        >
          {/* Logo */}
          <button
            onClick={() => navClick("home")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
              minHeight: 44,
            }}
          >
            <span
              style={{
                width: 28,
                height: 28,
                background: "#B5F265",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 800,
                  color: "#0A0C0A",
                  fontFamily: "Syne,sans-serif",
                }}
              >
                Q
              </span>
            </span>
            <span
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "#E8EDE8",
                letterSpacing: "0.05em",
              }}
            >
              Qowiyyu
            </span>
          </button>

          {/* Desktop nav */}
          {!isNarrow && (
            <nav
              style={{ display: "flex", gap: 24 }}
              aria-label="Primary navigation"
            >
              {NAV_ITEMS.map((item) => (
                <button
                  key={item}
                  className={`nl ${active === item ? "on" : ""}`}
                  onClick={() => go(item)}
                >
                  {item}
                </button>
              ))}
            </nav>
          )}

          {/* Hamburger */}
          {isNarrow && (
            <button
              className={`hbg ${menu ? "x" : ""}`}
              onClick={() => setMenu((v) => !v)}
              aria-label={menu ? "Close menu" : "Open menu"}
              aria-expanded={menu}
            >
              <span className="hbar" />
              <span className="hbar" />
              <span className="hbar" />
            </button>
          )}
        </div>
      </header>

      {/* ══════════════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="home"
        style={{
          minHeight: "100svh",
          display: "flex",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
          paddingTop: 64,
        }}
      >
        <div
          className="wrap"
          style={{
            paddingTop: "clamp(36px,7vh,80px)",
            paddingBottom: "clamp(36px,7vh,80px)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: "clamp(14px,2.5vh,22px)",
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#B5F265",
                flexShrink: 0,
                animation: "pulse 2s infinite",
              }}
            />
            <span className="lbl" style={{ color: "#B5F265" }}>
              Let's Ship Great Products Together!
            </span>
          </div>

          <h1
            className="t-hero"
            style={{ marginBottom: "clamp(14px,2.5vh,24px)" }}
          >
            Software
            <br />
            <span className="green">Engineer.</span>
          </h1>

          <p
            className="t-body"
            style={{
              color: "rgba(232,237,232,.6)",
              maxWidth: "min(500px,100%)",
              marginBottom: "clamp(26px,4vh,42px)",
            }}
          >
            Building scalable, high-performance systems across edtech,
            e-commerce, and embedded domains. 3+ years of precision engineering
            — and counting.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button className="btn-green" onClick={() => go("experience")}>
              View My Work
            </button>
            <button className="btn-outline" onClick={() => go("contact")}>
              Get in Touch
            </button>
          </div>

          {/* Stats */}
          <div className="sg" style={{ marginTop: "clamp(36px,7vh,68px)" }}>
            {STATS.map(([num, lbl]) => (
              <div key={lbl}>
                <div
                  style={{
                    fontSize: "clamp(28px,5.5vw,44px)",
                    fontWeight: 800,
                    color: "#B5F265",
                    lineHeight: 1,
                  }}
                >
                  {num}
                </div>
                <div
                  style={{
                    fontSize: "clamp(11px,1.2vw,13px)",
                    color: "rgba(232,237,232,.5)",
                    marginTop: 4,
                    letterSpacing: "0.04em",
                  }}
                >
                  {lbl}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint – hidden on mobile */}
        {!isMobile && (
          <div
            style={{
              position: "absolute",
              bottom: 28,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 5,
              opacity: 0.3,
            }}
          >
            <span
              style={{
                fontSize: 10,
                letterSpacing: "0.15em",
                color: "#E8EDE8",
                textTransform: "uppercase",
              }}
            >
              Scroll
            </span>
            <div
              style={{
                width: 1,
                height: 34,
                background: "rgba(232,237,232,.3)",
              }}
            />
          </div>
        )}
      </section>

      <div className="divider" />

      {/* ══════════════════════════════════════════════════════════════════════
          ABOUT
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="about"
        className="sp"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div className="wrap">
          <SectionLabel>About Me</SectionLabel>
          <div
            className="g2"
            style={{ alignItems: "center", gap: "clamp(28px,5vw,68px)" }}
          >
            <div>
              <h2
                className="t-h2"
                style={{ marginBottom: "clamp(14px,2.5vw,22px)" }}
              >
                Code, Combat &<br />
                <span className="green">Craft</span>
              </h2>
              <p
                className="t-body"
                style={{ color: "rgba(232,237,232,.65)", marginBottom: 16 }}
              >
                I'm Qowiyyu — a software engineer focused on backend systems,
                distributed applications, REST APIs, and high-performance services.
                I design scalable architectures, optimize database workloads, and
                build reliable asynchronous systems.
              </p>
              <p className="t-body" style={{ color: "rgba(232,237,232,.65)" }}>
                My work spans e-commerce, EdTech, SaaS, engineering infrastructure,
                and IoT, with measurable results including 94% lower API latency,
                80% higher throughput, and 99.3% less infrastructure setup effort.
              </p>
            </div>

            <div className="ic">
              {[
                {
                  label: "Specialization",
                  val: "Backend Systems",
                  sub: "Distributed & high-performance services",
                },
                {
                  label: "Primary Stack",
                  val: "C# · Node.js",
                  sub: "ASP.NET Core · Express.js",
                },
                {
                  label: "Databases",
                  val: "PostgreSQL · Redis",
                  sub: "Query optimization & caching",
                },
                {
                  label: "Infrastructure",
                  val: "AWS · Docker",
                  sub: "Terraform · RabbitMQ · Sentry",
                },
              ].map(({ label, val, sub }) => (
                <div
                  key={label}
                  style={{
                    background: "rgba(255,255,255,.03)",
                    border: "1px solid rgba(255,255,255,.07)",
                    borderRadius: 14,
                    padding: "clamp(12px,2vw,20px)",
                  }}
                >
                  <div
                    className="lbl"
                    style={{ color: "#B5F265", marginBottom: 6 }}
                  >
                    {label}
                  </div>
                  <div
                    style={{
                      fontSize: "clamp(13px,1.5vw,15px)",
                      fontWeight: 700,
                      marginBottom: 4,
                    }}
                  >
                    {val}
                  </div>
                  <div
                    style={{
                      fontSize: "clamp(11px,1.1vw,12px)",
                      color: "rgba(232,237,232,.4)",
                      lineHeight: 1.4,
                    }}
                  >
                    {sub}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ══════════════════════════════════════════════════════════════════════
          EXPERIENCE
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="experience"
        className="sp"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div className="wrap">
          <SectionLabel>Experience</SectionLabel>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(10px,1.8vw,14px)",
            }}
          >
            {EXPERIENCE.map((exp, i) => (
              <div
                key={i}
                className="exp-card"
                onMouseEnter={() => setHovExp(i)}
                onMouseLeave={() => setHovExp(null)}
                style={{
                  background:
                    hovExp === i ? "rgba(181,242,101,.04)" : "transparent",
                }}
              >
                {/* Header */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    gap: 8,
                    marginBottom: "clamp(10px,1.8vw,16px)",
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        flexWrap: "wrap",
                        marginBottom: 4,
                      }}
                    >
                      <h3 className="t-h3">{exp.company}</h3>
                      <Tag>{exp.type}</Tag>
                    </div>
                    <div
                      style={{
                        fontSize: "clamp(12px,1.4vw,14px)",
                        color: "#B5F265",
                        fontWeight: 600,
                      }}
                    >
                      {exp.role}
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: "clamp(11px,1.2vw,13px)",
                      color: "rgba(232,237,232,.4)",
                      fontFamily: "Lora,serif",
                      fontStyle: "italic",
                      flexShrink: 0,
                    }}
                  >
                    {exp.period}
                  </div>
                </div>

                {/* Bullets */}
                <ul
                  style={{
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: "clamp(5px,1vw,8px)",
                  }}
                >
                  {exp.bullets.map((b, j) => (
                    <li
                      key={j}
                      style={{
                        fontSize: "clamp(12px,1.4vw,14px)",
                        color: "rgba(232,237,232,.6)",
                        display: "flex",
                        gap: 10,
                        lineHeight: 1.65,
                      }}
                    >
                      <span
                        style={{
                          color: "#B5F265",
                          flexShrink: 0,
                          marginTop: 2,
                        }}
                      >
                        →
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ══════════════════════════════════════════════════════════════════════
          SKILLS
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="skills"
        className="sp"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div className="wrap">
          <SectionLabel>Skills</SectionLabel>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(22px,3.5vw,36px)",
            }}
          >
            {Object.entries(SKILLS).map(([cat, items]) => (
              <div key={cat}>
                <div
                  className="lbl"
                  style={{ color: "rgba(232,237,232,.35)", marginBottom: 12 }}
                >
                  {cat}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {items.map((s) => (
                    <span key={s} className="pill">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ══════════════════════════════════════════════════════════════════════
          PROJECTS
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="projects"
        className="sp"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div className="wrap">
          <SectionLabel>Projects</SectionLabel>
          <div className="g2">
            {PROJECTS.map((p, i) => (
              <div
                key={i}
                className="flip-wrap"
                onClick={() => flip(i)}
                onKeyDown={(e) => e.key === "Enter" && flip(i)}
                role="button"
                tabIndex={0}
                aria-label={`${p.title} — ${
                  isMobile ? "tap" : "click"
                } to reveal`}
              >
                <div className={`flip-inner ${flipped[i] ? "done" : ""}`}>
                  <div
                    className="flip-face"
                    style={{ background: "rgba(255,255,255,.03)" }}
                  >
                    <div style={{ textAlign: "center" }}>
                      <div
                        className="lbl"
                        style={{ color: "#B5F265", marginBottom: 10 }}
                      >
                        {p.date}
                      </div>
                      <h3 className="t-h3" style={{ marginBottom: 12 }}>
                        {p.title}
                      </h3>
                      <div
                        style={{
                          display: "flex",
                          gap: 6,
                          flexWrap: "wrap",
                          justifyContent: "center",
                        }}
                      >
                        {p.tags.map((t) => (
                          <Tag key={t}>{t}</Tag>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flip-face flip-back">
                    <p
                      style={{
                        fontSize: "clamp(12px,1.3vw,13px)",
                        color: "rgba(232,237,232,.75)",
                        lineHeight: 1.7,
                        fontFamily: "Lora,serif",
                      }}
                    >
                      {p.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p
            style={{
              fontSize: 12,
              color: "rgba(232,237,232,.3)",
              marginTop: 10,
              textAlign: "center",
            }}
          >
            {isMobile ? "Tap" : "Click"} cards to reveal details
          </p>
        </div>
      </section>

      <div className="divider" />

      {/* ══════════════════════════════════════════════════════════════════════
          MMA
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="mma"
        className="sp"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div className="wrap">
          <SectionLabel>Mixed Martial Arts</SectionLabel>
          <div
            className="g2"
            style={{ alignItems: "start", gap: "clamp(28px,5vw,68px)" }}
          >
            <div>
              <h2
                className="t-h2"
                style={{ marginBottom: "clamp(14px,2.5vw,24px)" }}
              >
                Where the
                <br />
                <span className="green">Mat Meets the Code</span>
              </h2>
              <p
                className="t-body"
                style={{ color: "rgba(232,237,232,.65)", marginBottom: 22 }}
              >
                Mixed Martial Arts isn't just a hobby — it's a discipline that
                mirrors the demands of engineering. Both require systematic
                thinking, composure under pressure, and a relentless drive to
                improve.
              </p>
              <div>
                <div
                  className="lbl"
                  style={{ color: "rgba(232,237,232,.35)", marginBottom: 12 }}
                >
                  Disciplines
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {[
                    "Brazilian Jiu-Jitsu",
                    "Muay Thai",
                    "Wrestling",
                    "Boxing",
                  ].map((d) => (
                    <span
                      key={d}
                      style={{
                        border: "1px solid rgba(181,242,101,.3)",
                        color: "#B5F265",
                        fontSize: "clamp(12px,1.3vw,13px)",
                        fontWeight: 600,
                        padding: "6px 14px",
                        borderRadius: 24,
                      }}
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "clamp(10px,1.8vw,14px)",
              }}
            >
              {MMA_VALUES.map((v) => (
                <div
                  key={v.label}
                  style={{
                    display: "flex",
                    gap: 14,
                    padding: "clamp(14px,2.2vw,20px)",
                    border: "1px solid rgba(255,255,255,.07)",
                    borderRadius: 14,
                    background: "rgba(255,255,255,.02)",
                  }}
                >
                  <div
                    style={{
                      width: 50,
                      height: 50,
                      flexShrink: 0,
                      background: "rgba(181,242,101,.1)",
                      border: "1px solid rgba(181,242,101,.25)",
                      borderRadius: 13,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 20,
                    }}
                  >
                    {v.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: "clamp(13px,1.5vw,15px)",
                        marginBottom: 4,
                      }}
                    >
                      {v.label}
                    </div>
                    <div
                      style={{
                        fontSize: "clamp(12px,1.3vw,13px)",
                        color: "rgba(232,237,232,.55)",
                        lineHeight: 1.65,
                        fontFamily: "Lora,serif",
                      }}
                    >
                      {v.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ══════════════════════════════════════════════════════════════════════
          BLOG
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="blog"
        className="sp"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div className="wrap">
          <SectionLabel>Blog</SectionLabel>
          <div className="bg">
            {BLOG_POSTS.map((post, i) => (
              <div key={i} className="blog-card">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 12,
                    gap: 8,
                    flexWrap: "wrap",
                  }}
                >
                  <Tag bg="rgba(181,242,101,.1)" color="#B5F265">
                    {post.category}
                  </Tag>
                  <span
                    style={{
                      fontSize: 11,
                      color: "rgba(232,237,232,.3)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {post.readTime}
                  </span>
                </div>
                <h3
                  className="t-h3"
                  style={{
                    marginBottom: 10,
                    fontSize: "clamp(14px,1.8vw,17px)",
                  }}
                >
                  {post.title}
                </h3>
                <p
                  style={{
                    fontSize: "clamp(13px,1.4vw,14px)",
                    color: "rgba(232,237,232,.55)",
                    lineHeight: 1.72,
                    marginBottom: 16,
                    fontFamily: "Lora,serif",
                  }}
                >
                  {post.excerpt}
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: 11, color: "rgba(232,237,232,.3)" }}>
                    {post.date}
                  </span>
                  <span
                    style={{ fontSize: 13, color: "#B5F265", fontWeight: 600 }}
                  >
                    Read →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ══════════════════════════════════════════════════════════════════════
          CONTACT
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="contact"
        className="sp"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div className="wrap">
          <SectionLabel>Contact</SectionLabel>
          <div
            className="g2"
            style={{ alignItems: "center", gap: "clamp(28px,5vw,80px)" }}
          >
            <div>
              <h2
                className="t-h2"
                style={{ marginBottom: "clamp(12px,2vw,20px)" }}
              >
                Let's Build
                <br />
                <span className="green">Something Real</span>
              </h2>
              <p
                className="t-body"
                style={{
                  color: "rgba(232,237,232,.6)",
                  marginBottom: "clamp(22px,3.5vw,36px)",
                }}
              >
                Whether you need a rock-solid backend system, a
                security-conscious API, or just want to talk shop — I'm ready.
              </p>
              <button
                className="btn-green"
                onClick={() =>
                  window.open("mailto:abdulqowiyyuolamilekan@gmail.com")
                }
              >
                Send an Email
              </button>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "clamp(8px,1.4vw,12px)",
              }}
            >
              {[
                {
                  icon: "✉",
                  label: "Email",
                  val: "abdulqowiyyuolamilekan@gmail.com",
                  href: "mailto:abdulqowiyyuolamilekan@gmail.com",
                },
                {
                  icon: "📱",
                  label: "Phone",
                  val: "+234 808 367 4765",
                  href: "tel:+2348083674765",
                },
                {
                  icon: "🔗",
                  label: "LinkedIn",
                  val: "linkedin.com/in/qowiyyu",
                  href: "https://www.linkedin.com/in/qowiyyuadelaja",
                },
                {
                  icon: "💻",
                  label: "GitHub",
                  val: "github.com/qowiyyu",
                  href: "https://github.com/adelajaOlamilekan",
                },
              ].map((c) => (
                <a key={c.label} href={c.href} className="ci">
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      flexShrink: 0,
                      background: "rgba(181,242,101,.08)",
                      borderRadius: 10,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 16,
                    }}
                  >
                    {c.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      className="lbl"
                      style={{ color: "rgba(232,237,232,.4)", marginBottom: 2 }}
                    >
                      {c.label}
                    </div>
                    <div
                      style={{
                        fontSize: "clamp(12px,1.3vw,13px)",
                        color: "rgba(232,237,232,.8)",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {c.val}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,.06)",
          padding: "clamp(18px,3.5vw,28px) 0",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          className="wrap"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <span
            style={{
              fontSize: "clamp(11px,1.2vw,13px)",
              color: "rgba(232,237,232,.3)",
            }}
          >
            © {new Date().getFullYear()} Qowiyyu Olamilekan Adelaja
          </span>
          <span
            style={{
              fontSize: "clamp(11px,1.2vw,13px)",
              color: "rgba(232,237,232,.3)",
              textAlign: "right",
            }}
          >
            Software Engineer · Backend & Distributed Systems
          </span>
        </div>
      </footer>
    </div>
  );
}

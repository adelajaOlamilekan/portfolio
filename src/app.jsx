import { useState, useEffect, useRef } from "react";

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
      "Designing backend systems for automated infrastructure provisioning in Cadence-based EDA workflows",
      "Reducing manual setup overhead and improving developer efficiency",
      "Collaborating with cross-functional teams to test, debug, and improve LMS platform reliability",
    ],
  },
  {
    company: "Graphite Technologies",
    role: "Founding Engineer",
    period: "Sept 2024 – Present",
    type: "Remote",
    bullets: [
      "Researched system-level vulnerabilities using Windows API hooking techniques",
      "Mentored and trained 12+ engineers in backend development fundamentals",
      "Built AI-driven course recommendation backend for a recruitment & talent coaching platform",
      "Developed scalable backend for a speech therapy platform",
    ],
  },
  {
    company: "Ubuntu Farms",
    role: "Backend Engineer Lead",
    period: "Nov 2024 – Feb 2025",
    type: "Remote · Contract",
    bullets: [
      "Architected high-traffic e-commerce backend supporting concurrent users and scalable transactions",
      "Implemented fuzzy search with PostgreSQL GIN indexing, boosting user satisfaction by 70%",
      "Designed Celery async workflows, reducing media upload wait time by 50%",
      "Integrated Monnify payment gateway for secure transaction processing",
    ],
  },
  {
    company: "Qudra",
    role: "Backend Engineer",
    period: "Sept 2024 – Nov 2024",
    type: "Remote · Contract",
    bullets: [
      "Led backend of large-scale exam platform for IELTS, TOEFL, JAMB, and WAEC",
      "Resolved DB bottlenecks reducing latency from 500ms → 30ms (94% improvement)",
      "Designed Redis caching system cutting score computation time by 40%",
      "Implemented gamification features increasing user retention by 60%",
    ],
  },
  {
    company: "Smart Offsite Electric Meter",
    role: "Backend & Embedded Engineer",
    period: "Jun 2024 – Aug 2024",
    type: "Remote · Contract",
    bullets: [
      "Designed backend for remote electricity purchase and device control, reducing transaction time by 70%",
      "Built real-time energy consumption tracking improving user engagement by 60%",
      "Implemented secure APIs for remote IoT device control",
    ],
  },
  {
    company: "HNG / Hotels.ng",
    role: "Backend Intern",
    period: "Mar 2023 – Sept 2023",
    type: "Remote",
    bullets: [
      "Migrated legacy data with 97% accuracy while maintaining SEO integrity",
      "Built backend services for a video recording and streaming platform",
      "Improved system performance by 80% using Celery background processing",
    ],
  },
];

const SKILLS = {
  Backend: ["FastAPI", "Django", "DRF", "Express"],
  Databases: ["PostgreSQL", "MySQL", "Redis"],
  Systems: ["REST API Design", "Redis Caching", "Celery", "Background Jobs"],
  Infrastructure: ["Docker", "Git", "Alembic", "SQLAlchemy", "Sentry"],
  Languages: ["Python", "JavaScript", "TypeScript", "C++"],
};

const PROJECTS = [
  {
    title: "System Security Research",
    date: "Aug 2024",
    desc: "Conducted research on system-level vulnerabilities in secure browser environments, proposed mitigation techniques, and submitted a patch to prevent bot voting.",
    tags: ["Security", "Windows API", "Browser"],
  },
  {
    title: "Plagiarism Checker",
    date: "Jul 2024",
    desc: "Built a plagiarism detection engine using the Winnowing algorithm for document and code similarity analysis.",
    tags: ["Python", "Algorithms", "NLP"],
  },
];

const BLOG_POSTS = [
  {
    title: "How I Cut DB Latency by 94% with Query Optimization",
    date: "Mar 2025",
    category: "Engineering",
    excerpt:
      "A deep-dive into the Sentry-guided debugging process that took a 500ms query down to 30ms on a real-world exam platform.",
    readTime: "8 min read",
  },
  {
    title: "The Discipline of Code & Combat",
    date: "Feb 2025",
    category: "MMA + Engineering",
    excerpt:
      "What training martial arts taught me about building reliable backend systems — pressure, patience, and precision.",
    readTime: "5 min read",
  },
  {
    title: "Redis Caching Patterns for High-Traffic APIs",
    date: "Jan 2025",
    category: "Engineering",
    excerpt:
      "Practical patterns I've used across multiple production systems to implement Redis caching effectively.",
    readTime: "6 min read",
  },
];

const MMA_CONTENT = {
  bio: "Mixed Martial Arts isn't just a hobby — it's a discipline that mirrors the demands of engineering. Both require systematic thinking, composure under pressure, and a relentless drive to improve.",
  disciplines: ["Brazilian Jiu-Jitsu", "Muay Thai", "Wrestling", "Boxing"],
  values: [
    {
      label: "Discipline",
      icon: "🔩",
      desc: "Consistent training translates into consistent code.",
    },
    {
      label: "Pressure Testing",
      icon: "⚡",
      desc: "Systems fail under load — so does technique. Both must be stress-tested.",
    },
    {
      label: "Adaptation",
      icon: "🔄",
      desc: "Every opponent and every codebase is different. Adapt fast or lose.",
    },
  ],
};

const useScrollSpy = (sections) => {
  const [active, setActive] = useState("Home");
  useEffect(() => {
    const onScroll = () => {
      let current = "Home";
      for (const s of sections) {
        const el = document.getElementById(s.toLowerCase());
        if (el && el.getBoundingClientRect().top <= 100) current = s;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [sections]);
  return active;
};

const scrollTo = (id) => {
  const el = document.getElementById(id.toLowerCase());
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

const Tag = ({ children, color = "#E8F0E9", text = "#1a5c1a" }) => (
  <span
    style={{
      background: color,
      color: text,
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: "0.06em",
      padding: "3px 10px",
      borderRadius: 20,
      textTransform: "uppercase",
      display: "inline-block",
    }}
  >
    {children}
  </span>
);

const SectionLabel = ({ children }) => (
  <div
    style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 48 }}
  >
    <span
      style={{
        width: 32,
        height: 2,
        background: "#B5F265",
        display: "inline-block",
      }}
    />
    <span
      style={{
        fontSize: 11,
        letterSpacing: "0.2em",
        fontWeight: 700,
        color: "#B5F265",
        textTransform: "uppercase",
      }}
    >
      {children}
    </span>
    <span
      style={{
        flex: 1,
        height: 1,
        background: "rgba(255,255,255,0.07)",
        display: "inline-block",
      }}
    />
  </div>
);

export default function Portfolio() {
  const active = useScrollSpy(NAV_ITEMS);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredExp, setHoveredExp] = useState(null);
  const [flipped, setFlipped] = useState({});
  const canvasRef = useRef(null);

  // Animated particle grid background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const dots = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const d of dots) {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > canvas.width) d.vx *= -1;
        if (d.y < 0 || d.y > canvas.height) d.vy *= -1;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(181,242,101,0.18)";
        ctx.fill();
      }
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x,
            dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(181,242,101,${0.07 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const toggleFlip = (i) => setFlipped((f) => ({ ...f, [i]: !f[i] }));

  return (
    <div
      style={{
        background: "#0A0C0A",
        color: "#E8EDE8",
        fontFamily: "'Syne', 'Space Grotesk', sans-serif",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Lora:ital,wght@0,400;0,500;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: #B5F265; color: #0A0C0A; }
        html { scroll-behavior: smooth; }
        body { background: #0A0C0A; }

        .nav-link { background: none; border: none; color: rgba(232,237,232,0.5); font-family: inherit; font-size: 13px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; transition: color 0.2s; padding: 4px 0; }
        .nav-link:hover, .nav-link.active { color: #B5F265; }
        .nav-link.active { border-bottom: 1px solid #B5F265; }

        .exp-card { border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; padding: 28px 32px; transition: border-color 0.3s, transform 0.3s; cursor: default; }
        .exp-card:hover { border-color: rgba(181,242,101,0.35); transform: translateY(-2px); }

        .skill-pill { display: inline-block; border: 1px solid rgba(181,242,101,0.25); background: rgba(181,242,101,0.06); color: rgba(232,237,232,0.85); font-size: 13px; font-weight: 600; padding: 6px 14px; border-radius: 24px; margin: 4px; transition: all 0.2s; }
        .skill-pill:hover { background: rgba(181,242,101,0.15); color: #B5F265; border-color: #B5F265; }

        .blog-card { border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; padding: 28px 28px 24px; transition: all 0.3s; cursor: pointer; }
        .blog-card:hover { border-color: rgba(181,242,101,0.3); transform: translateY(-3px); }

        .flip-card { width: 100%; height: 180px; perspective: 1000px; cursor: pointer; }
        .flip-inner { width: 100%; height: 100%; position: relative; transform-style: preserve-3d; transition: transform 0.5s; }
        .flip-inner.flipped { transform: rotateY(180deg); }
        .flip-face { position: absolute; width: 100%; height: 100%; backface-visibility: hidden; border-radius: 14px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; border: 1px solid rgba(255,255,255,0.1); }
        .flip-back { transform: rotateY(180deg); background: rgba(181,242,101,0.08); border-color: rgba(181,242,101,0.25); padding: 16px; text-align: center; }

        .cta-btn { background: #B5F265; color: #0A0C0A; border: none; padding: 14px 32px; border-radius: 40px; font-family: inherit; font-size: 14px; font-weight: 700; letter-spacing: 0.06em; cursor: pointer; transition: all 0.2s; }
        .cta-btn:hover { background: #C8F77A; transform: translateY(-2px); box-shadow: 0 8px 30px rgba(181,242,101,0.25); }

        .outline-btn { background: transparent; color: #E8EDE8; border: 1px solid rgba(255,255,255,0.25); padding: 13px 30px; border-radius: 40px; font-family: inherit; font-size: 14px; font-weight: 600; letter-spacing: 0.06em; cursor: pointer; transition: all 0.2s; }
        .outline-btn:hover { border-color: #B5F265; color: #B5F265; }

        .stat-num { font-size: 42px; font-weight: 800; color: #B5F265; line-height: 1; }
        .stat-lbl { font-size: 13px; color: rgba(232,237,232,0.5); margin-top: 4px; letter-spacing: 0.05em; }

        .section-pad { padding: 100px 0; }
        .container { max-width: 1100px; margin: 0 auto; padding: 0 32px; }
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; }
        @media (max-width: 768px) {
          .grid-2, .grid-3 { grid-template-columns: 1fr; }
          .hero-title { font-size: 52px !important; }
          .nav-desktop { display: none !important; }
        }
        .divider { width: 100%; height: 1px; background: linear-gradient(90deg, transparent, rgba(181,242,101,0.2), transparent); margin: 0; }
        .progress-bar { height: 3px; background: rgba(181,242,101,0.15); border-radius: 2px; overflow: hidden; margin-top: 8px; }
        .progress-fill { height: 100%; background: #B5F265; border-radius: 2px; transition: width 0.8s ease; }

        .mma-badge { width: 56px; height: 56px; background: rgba(181,242,101,0.1); border: 1px solid rgba(181,242,101,0.25); border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 24px; }
        
        .contact-item { display: flex; align-items: center; gap: 12px; padding: 14px 20px; border: 1px solid rgba(255,255,255,0.07); border-radius: 12px; transition: border-color 0.2s; }
        .contact-item:hover { border-color: rgba(181,242,101,0.3); }
        .contact-icon { width: 38px; height: 38px; background: rgba(181,242,101,0.08); border-radius: 10px; display: flex; align-items: center; justify-content: center; }
      `}</style>

      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* NAV */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: "rgba(10,12,10,0.85)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 64,
          }}
        >
          <button
            onClick={() => scrollTo("home")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
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
                  fontFamily: "Syne, sans-serif",
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
                fontFamily: "Syne, sans-serif",
                letterSpacing: "0.05em",
              }}
            >
              Qowiyyu
            </span>
          </button>
          <div className="nav-desktop" style={{ display: "flex", gap: 28 }}>
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                className={`nav-link ${active === item ? "active" : ""}`}
                onClick={() => scrollTo(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section
        id="home"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div className="container" style={{ paddingTop: 100 }}>
          <div style={{ maxWidth: 760 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 24,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#B5F265",
                  display: "inline-block",
                  animation: "pulse 2s infinite",
                }}
              />
              <span
                style={{
                  fontSize: 13,
                  color: "#B5F265",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                Available to build great produts
              </span>
            </div>
            <h1
              className="hero-title"
              style={{
                fontSize: 80,
                fontWeight: 800,
                lineHeight: 1.05,
                marginBottom: 24,
                color: "#E8EDE8",
                letterSpacing: "-0.02em",
              }}
            >
              Backend
              <br />
              <span style={{ color: "#B5F265" }}>Engineer.</span>
            </h1>
            <p
              style={{
                fontSize: 18,
                lineHeight: 1.7,
                color: "rgba(232,237,232,0.6)",
                maxWidth: 520,
                marginBottom: 40,
                fontFamily: "Lora, serif",
              }}
            >
              Building scalable, high-performance systems across edtech,
              e-commerce, and embedded domains. 3+ years of precision
              engineering — and counting.
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <button
                className="cta-btn"
                onClick={() => scrollTo("experience")}
              >
                View My Work
              </button>
              <button
                className="outline-btn"
                onClick={() => scrollTo("contact")}
              >
                Get in Touch
              </button>
            </div>
            <div style={{ display: "flex", gap: 48, marginTop: 64 }}>
              {[
                ["94%", "DB latency cut"],
                ["3+", "years experience"],
                ["70%", "UX improvements"],
                ["12+", "engineers mentored"],
              ].map(([num, lbl]) => (
                <div key={lbl}>
                  <div className="stat-num">{num}</div>
                  <div className="stat-lbl">{lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            opacity: 0.4,
          }}
        >
          <span
            style={{
              fontSize: 11,
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
              height: 40,
              background: "rgba(232,237,232,0.3)",
            }}
          />
        </div>
      </section>

      <div className="divider" />

      {/* ABOUT */}
      <section
        id="about"
        className="section-pad"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div className="container">
          <SectionLabel>About Me</SectionLabel>
          <div className="grid-2" style={{ alignItems: "center", gap: 64 }}>
            <div>
              <h2
                style={{
                  fontSize: 40,
                  fontWeight: 800,
                  lineHeight: 1.1,
                  marginBottom: 24,
                  letterSpacing: "-0.02em",
                }}
              >
                Code, Combat &<br />
                <span style={{ color: "#B5F265" }}>Craft</span>
              </h2>
              <p
                style={{
                  fontSize: 16,
                  lineHeight: 1.8,
                  color: "rgba(232,237,232,0.65)",
                  marginBottom: 20,
                  fontFamily: "Lora, serif",
                }}
              >
                I'm Qowiyyu — a backend engineer with a degree in Electrical and
                Electronics Engineering from the University of Lagos (CGPA:
                4.11/5.00). I build systems that don't flinch under load.
              </p>
              <p
                style={{
                  fontSize: 16,
                  lineHeight: 1.8,
                  color: "rgba(232,237,232,0.65)",
                  fontFamily: "Lora, serif",
                }}
              >
                Outside the terminal, I train Mixed Martial Arts — a discipline
                that's sharpened my thinking about resilience, adaptation, and
                performing under pressure. Engineering and MMA demand the same
                thing: relentless iteration.
              </p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
              }}
            >
              {[
                {
                  label: "University",
                  val: "University of Lagos",
                  sub: "B.Sc. Electrical & Electronics Eng.",
                },
                {
                  label: "CGPA",
                  val: "4.11 / 5.00",
                  sub: "First Class Honours track",
                },
                {
                  label: "Location",
                  val: "Lagos, Nigeria",
                  sub: "Open to remote",
                },
                {
                  label: "Focus",
                  val: "Backend Systems",
                  sub: "FastAPI · Django · Redis",
                },
              ].map(({ label, val, sub }) => (
                <div
                  key={label}
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 14,
                    padding: 20,
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      color: "#B5F265",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      marginBottom: 6,
                    }}
                  >
                    {label}
                  </div>
                  <div
                    style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}
                  >
                    {val}
                  </div>
                  <div style={{ fontSize: 12, color: "rgba(232,237,232,0.4)" }}>
                    {sub}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* EXPERIENCE */}
      <section
        id="experience"
        className="section-pad"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div className="container">
          <SectionLabel>Experience</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {EXPERIENCE.map((exp, i) => (
              <div
                key={i}
                className="exp-card"
                onMouseEnter={() => setHoveredExp(i)}
                onMouseLeave={() => setHoveredExp(null)}
                style={{
                  background:
                    hoveredExp === i ? "rgba(181,242,101,0.04)" : "transparent",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    gap: 8,
                    marginBottom: 16,
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        marginBottom: 4,
                      }}
                    >
                      <h3 style={{ fontSize: 18, fontWeight: 700 }}>
                        {exp.company}
                      </h3>
                      <Tag>{exp.type}</Tag>
                    </div>
                    <div
                      style={{
                        fontSize: 14,
                        color: "#B5F265",
                        fontWeight: 600,
                      }}
                    >
                      {exp.role}
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "rgba(232,237,232,0.4)",
                      fontFamily: "Lora, serif",
                      fontStyle: "italic",
                      paddingTop: 4,
                    }}
                  >
                    {exp.period}
                  </div>
                </div>
                <ul
                  style={{
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  {exp.bullets.map((b, j) => (
                    <li
                      key={j}
                      style={{
                        fontSize: 14,
                        color: "rgba(232,237,232,0.6)",
                        display: "flex",
                        gap: 10,
                        lineHeight: 1.6,
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
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* SKILLS */}
      <section
        id="skills"
        className="section-pad"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div className="container">
          <SectionLabel>Skills</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
            {Object.entries(SKILLS).map(([cat, items]) => (
              <div key={cat}>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "rgba(232,237,232,0.35)",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    marginBottom: 14,
                  }}
                >
                  {cat}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 0 }}>
                  {items.map((skill) => (
                    <span key={skill} className="skill-pill">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* PROJECTS */}
      <section
        id="projects"
        className="section-pad"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div className="container">
          <SectionLabel>Projects</SectionLabel>
          <div className="grid-2">
            {PROJECTS.map((p, i) => (
              <div
                key={i}
                className="flip-card"
                onClick={() => toggleFlip(i)}
                title="Click to flip"
              >
                <div className={`flip-inner ${flipped[i] ? "flipped" : ""}`}>
                  <div
                    className="flip-face"
                    style={{ background: "rgba(255,255,255,0.03)" }}
                  >
                    <div style={{ textAlign: "center", padding: "0 20px" }}>
                      <div
                        style={{
                          fontSize: 12,
                          color: "#B5F265",
                          fontWeight: 700,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          marginBottom: 10,
                        }}
                      >
                        {p.date}
                      </div>
                      <h3
                        style={{
                          fontSize: 18,
                          fontWeight: 700,
                          marginBottom: 12,
                        }}
                      >
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
                        fontSize: 13,
                        color: "rgba(232,237,232,0.7)",
                        lineHeight: 1.7,
                        fontFamily: "Lora, serif",
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
              fontSize: 13,
              color: "rgba(232,237,232,0.3)",
              marginTop: 16,
              textAlign: "center",
            }}
          >
            Click cards to reveal details
          </p>
        </div>
      </section>

      <div className="divider" />

      {/* MMA */}
      <section
        id="mma"
        className="section-pad"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div className="container">
          <SectionLabel>Mixed Martial Arts</SectionLabel>
          <div className="grid-2" style={{ alignItems: "start", gap: 64 }}>
            <div>
              <h2
                style={{
                  fontSize: 36,
                  fontWeight: 800,
                  lineHeight: 1.15,
                  marginBottom: 24,
                  letterSpacing: "-0.02em",
                }}
              >
                Where the
                <br />
                <span style={{ color: "#B5F265" }}>Mat Meets the Code</span>
              </h2>
              <p
                style={{
                  fontSize: 16,
                  lineHeight: 1.8,
                  color: "rgba(232,237,232,0.65)",
                  marginBottom: 28,
                  fontFamily: "Lora, serif",
                }}
              >
                {MMA_CONTENT.bio}
              </p>
              <div style={{ marginBottom: 28 }}>
                <div
                  style={{
                    fontSize: 12,
                    color: "rgba(232,237,232,0.35)",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    marginBottom: 14,
                  }}
                >
                  Disciplines
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {MMA_CONTENT.disciplines.map((d) => (
                    <span
                      key={d}
                      style={{
                        border: "1px solid rgba(181,242,101,0.3)",
                        color: "#B5F265",
                        fontSize: 13,
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
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {MMA_CONTENT.values.map((v) => (
                <div
                  key={v.label}
                  style={{
                    display: "flex",
                    gap: 16,
                    padding: "20px 20px",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 14,
                    background: "rgba(255,255,255,0.02)",
                  }}
                >
                  <div className="mma-badge">{v.icon}</div>
                  <div>
                    <div
                      style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}
                    >
                      {v.label}
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        color: "rgba(232,237,232,0.55)",
                        lineHeight: 1.6,
                        fontFamily: "Lora, serif",
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

      {/* BLOG */}
      <section
        id="blog"
        className="section-pad"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div className="container">
          <SectionLabel>Blog</SectionLabel>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 20,
            }}
          >
            {BLOG_POSTS.map((post, i) => (
              <div
                key={i}
                className="blog-card"
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 14,
                  }}
                >
                  <Tag color="rgba(181,242,101,0.1)" text="#B5F265">
                    {post.category}
                  </Tag>
                  <span
                    style={{ fontSize: 12, color: "rgba(232,237,232,0.3)" }}
                  >
                    {post.readTime}
                  </span>
                </div>
                <h3
                  style={{
                    fontSize: 17,
                    fontWeight: 700,
                    lineHeight: 1.4,
                    marginBottom: 12,
                  }}
                >
                  {post.title}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: "rgba(232,237,232,0.55)",
                    lineHeight: 1.7,
                    marginBottom: 20,
                    fontFamily: "Lora, serif",
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
                  <span
                    style={{ fontSize: 12, color: "rgba(232,237,232,0.3)" }}
                  >
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

      {/* CONTACT */}
      <section
        id="contact"
        className="section-pad"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div className="container">
          <SectionLabel>Contact</SectionLabel>
          <div className="grid-2" style={{ alignItems: "center", gap: 80 }}>
            <div>
              <h2
                style={{
                  fontSize: 40,
                  fontWeight: 800,
                  lineHeight: 1.1,
                  marginBottom: 20,
                  letterSpacing: "-0.02em",
                }}
              >
                Let's Build
                <br />
                <span style={{ color: "#B5F265" }}>Something Real</span>
              </h2>
              <p
                style={{
                  fontSize: 16,
                  color: "rgba(232,237,232,0.6)",
                  lineHeight: 1.8,
                  marginBottom: 32,
                  fontFamily: "Lora, serif",
                }}
              >
                Whether you need a rock-solid backend system, a
                security-conscious API, or just want to talk shop — I'm ready.
              </p>
              <button
                className="cta-btn"
                onClick={() =>
                  window.open("mailto:abdulqowiyyuolamilekan@gmail.com")
                }
              >
                Send an Email
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
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
                  href: "#",
                },
                {
                  icon: "💻",
                  label: "GitHub",
                  val: "github.com/qowiyyu",
                  href: "#",
                },
              ].map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  className="contact-item"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="contact-icon">
                    <span>{c.icon}</span>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "rgba(232,237,232,0.4)",
                        fontWeight: 600,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }}
                    >
                      {c.label}
                    </div>
                    <div
                      style={{ fontSize: 14, color: "rgba(232,237,232,0.8)" }}
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

      {/* FOOTER */}
      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "28px 0",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <span style={{ fontSize: 13, color: "rgba(232,237,232,0.3)" }}>
            © {new Date().getFullYear()} Qowiyyu Olamilekan Adelaja
          </span>
          <span style={{ fontSize: 13, color: "rgba(232,237,232,0.3)" }}>
            Backend Engineer · MMA Practitioner · Lagos, NG
          </span>
        </div>
      </footer>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
      `}</style>
    </div>
  );
}

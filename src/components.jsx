import { portfolioProjects } from "./projects.js";
import "./portfolio-final.css";import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  ExternalLink,
  Github,
  Mail,
  MapPin,
  Menu,
  Moon,
  Send,
  Sun,
  X
} from "lucide-react";

import {
  site,
  projects,
  skills,
  method,
  services,
  journey,
  techStack
} from "./data";

import {
  useActiveSection,
  useReducedMotion,
  useScrollProgress,
  useTheme
} from "./hooks";

const navItems = [
  ["Home", "home"],
  ["Work", "work"],
  ["Method", "method"],
  ["Skills", "skills"],
  ["About", "about"],
  ["Contact", "contact"]
];

const categories = ["ALL", "FRONTEND", "BACKEND", "AI / ML", "TOOLS"];

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
  }
};

function Reveal({ children, className = "", delay = 0 }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduced ? false : "hidden"}
      whileInView={reduced ? undefined : "visible"}
      viewport={{ once: true, amount: 0.15 }}
      variants={reveal}
      transition={reduced ? undefined : { delay }}
    >
      {children}
    </motion.div>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(navItems.map((item) => item[1]));
  const { theme, toggleTheme } = useTheme();

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
    setOpen(false);
  };

  return (
    <>
      <div className="scroll-progress">
        <div style={{ width: `${useScrollProgress()}%` }} />
      </div>

      <header className="navbar">
        <button className="brand" onClick={() => go("home")} aria-label="Go home">
          <span className="brand-mark">AI</span>
          <span>Saqlain Khan</span>
        </button>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map(([label, id]) => (
            <button
              key={id}
              className={active === id ? "nav-link active" : "nav-link"}
              onClick={() => go(id)}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="nav-actions">
          <button
            className="icon-button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          <button className="talk-button" onClick={() => go("contact")}>
            LET'S TALK <ArrowUpRight size={15} />
          </button>

          <button
            className="mobile-menu-button"
            onClick={() => setOpen(true)}
            aria-label="Open navigation"
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      {open && (
        <div className="mobile-menu">
          <div className="mobile-menu-top">
            <span className="brand-mark">AI</span>
            <button
              className="icon-button"
              onClick={() => setOpen(false)}
              aria-label="Close navigation"
            >
              <X size={22} />
            </button>
          </div>

          <div className="mobile-links">
            {navItems.map(([label, id]) => (
              <button key={id} onClick={() => go(id)}>
                <span>{label}</span>
                <ArrowUpRight size={19} />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export function Hero() {
  const goWork = () =>
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });

  const goMethod = () =>
    document.getElementById("method")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" className="hero section">
      <div className="hero-grid" />

      <div className="hero-content">
        <Reveal>
          <div className="eyebrow">
            <span className="status-dot" />
            {site.role}
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <h1>
            BUILDING
            <br />
            <em>INTELLIGENCE</em>
            <br />
            INTO PRODUCTS.
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="hero-copy">{site.tagline}</p>
        </Reveal>

        <Reveal delay={0.22}>
          <div className="hero-buttons">
            <button className="primary-button" onClick={goWork}>
              SEE THE WORK <ArrowDownRight size={17} />
            </button>
            <button className="secondary-button" onClick={goMethod}>
              HOW I BUILD <ArrowDownRight size={17} />
            </button>
          </div>
        </Reveal>

        <Reveal delay={0.28}>
          <div className="hero-meta">
            <span><MapPin size={14} /> Saqlain Khan · Vehari, Pakistan</span>
            <span className="available">
              <span className="status-dot" />
              {site.availability}
            </span>
          </div>
        </Reveal>
      </div>

      <Reveal className="hero-portrait-wrap" delay={0.2}>
        <div className="portrait-frame">
          <img src="/profile.jpg" alt="Developer profile" />
          <div className="portrait-label">
            <span>01</span>
            <span>ENGINEER / BUILDER</span>
          </div>
        </div>
      </Reveal>

      <div className="hero-corner">SCROLL TO EXPLORE ?</div>
    </section>
  );
}

export function TechMarquee() {
  const items = [...techStack, ...techStack];

  return (
    <div className="marquee" aria-label="Technology stack">
      <div className="marquee-track">
        {items.map((item, index) => (
          <React.Fragment key={`${item}-${index}`}>
            <span>{item}</span>
            <b>?</b>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export function ProjectCard({ project, index }) {
  return (
    <Reveal className={`project project-${index + 1}`}>
      <div className="project-image">
        <img
  src={project.image}
  alt={`${project.title} project`}
  loading="lazy"
  onError={(e) => {
    const fallback = {
      aurex: "/projects/aurex.png",
      vistara: "/projects/vistara.png",
      nexora: "/projects/nexora-weather.png"
    };

    if (fallback[project.id] && e.currentTarget.src !== window.location.origin + fallback[project.id]) {
      e.currentTarget.src = fallback[project.id];
    }
  }}
/>
        <span className={`project-accent ${project.accent}`} />
        <div className="project-number">{project.number}</div>
      </div>

      <div className="project-content">
        <div className="project-topline">
          <span>{project.category}</span>
          <ArrowUpRight size={19} />
        </div>

        <h3>{project.title}</h3>
        <p>{project.description}</p>

        <div className="tech-list">
          {project.technologies.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>

        <div className="project-result">
          <span>RESULT</span>
          <strong>{project.result}</strong>
        </div>

        <div className="project-status">
          <span className="status-dot" />
          <span>LIVE PROJECT</span>
        </div>

        <div className="project-links">
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
            LIVE DEMO <ExternalLink size={15} />
          </a>

          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              GITHUB <Github size={15} />
            </a>
          )}
        </div>
      </div>
    </Reveal>
  );
}

export function Projects() {
  return (
    <section id="work" className="section projects-section">
      <div className="section-heading">
        <Reveal>
          <span className="section-label">02 / SELECTED WORK</span>
          <h2>
            THINGS
            <br />
            I'VE <em>BUILT.</em>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p>
            Three products that represent my approach to combining engineering,
            intelligence and useful digital experiences.
          </p>
        </Reveal>
      </div>

      <div className="projects-list">
        {portfolioProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

export function Method() {
  const steps = [
    {
      number: "01",
      title: "DISCOVER",
      text: "Understand the problem deeply.",
      icon: "⌁"
    },
    {
      number: "02",
      title: "ARCHITECT",
      text: "Design a clean technical system.",
      icon: "◇"
    },
    {
      number: "03",
      title: "BUILD",
      text: "Turn the architecture into a working product.",
      icon: "⌘"
    },
    {
      number: "04",
      title: "INTELLIGENCE",
      text: "Integrate AI where it creates real value.",
      icon: "✦"
    },
    {
      number: "05",
      title: "TEST",
      text: "Run, debug and validate the product.",
      icon: "✓"
    },
    {
      number: "06",
      title: "SHIP",
      text: "Deploy a polished production experience.",
      icon: "↗"
    }
  ];

  return (
    <section id="method" className="final-method-section">
      <div className="final-method-header">
        <div className="final-method-label">03 / METHOD</div>

        <h2 className="final-method-title">
          HOW I
          <span>BUILD.</span>
        </h2>

        <p className="final-method-intro">
          AI helps me move faster, but every product still goes through
          architecture, testing, understanding and human review.
        </p>
      </div>

      <div className="final-method-grid">
        {steps.map((step) => (
          <article className="final-method-card" key={step.number}>
            <div className="final-method-top">
              <span className="final-method-number">
                {step.number}
              </span>

              <span className="final-method-icon">
                {step.icon}
              </span>
            </div>

            <div className="final-method-content">
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>

            <span className="final-method-arrow">→</span>
          </article>
        ))}
      </div>
    </section>
  );
}
export function Skills() {
  const [category, setCategory] = useState("ALL");

  const filtered =
    category === "ALL"
      ? skills
      : skills.filter((skill) => skill.category === category);

  return (
    <section id="skills" className="section skills-section">
      <div className="section-heading">
        <Reveal>
          <span className="section-label">04 / CAPABILITIES</span>
          <h2>
            THE
            <br />
            <em>STACK.</em>
          </h2>
        </Reveal>
        <Reveal>
          <p>
            A practical toolkit across interfaces, backend systems, AI,
            databases and deployment.
          </p>
        </Reveal>
      </div>

      <div className="skill-filters">
        {categories.map((item) => (
          <button
            key={item}
            className={category === item ? "selected" : ""}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <motion.div layout className="skills-grid">
        {filtered.map((skill) => (
          <motion.article
            layout
            key={`${skill.category}-${skill.name}`}
            className="skill-card"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="skill-index">/</span>
            <strong>{skill.name}</strong>
            <small>{skill.category}</small>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="section about-section">
      <Reveal>
        <span className="section-label">05 / ABOUT</span>
      </Reveal>

      <div className="about-grid">
        <Reveal>
          <h2>
            I BUILD
            <br />
            <em>USEFUL</em>
            <br />
            THINGS.
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="about-copy">
            <p>{site.about}</p>
            <p>
              My approach is simple: understand the problem, design the
              system, build carefully, test aggressively and ship something
              people can actually use.
            </p>

            <div className="info-grid">
              <div>
                <span>LOCATION</span>
                <strong>{site.location}</strong>
              </div>
              <div>
                <span>FOCUS</span>
                <strong>AI + FULL STACK</strong>
              </div>
              <div>
                <span>STATUS</span>
                <strong>BUILDING</strong>
              </div>
              <div>
                <span>INTEREST</span>
                <strong>PRODUCTS</strong>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Journey() {
  return (
    <section className="section journey-section">
      <div className="section-heading">
        <Reveal>
          <span className="section-label">06 / JOURNEY</span>
          <h2>
            ALWAYS
            <br />
            <em>EVOLVING.</em>
          </h2>
        </Reveal>
      </div>

      <div className="journey-list">
        {journey.map((item, index) => (
          <Reveal key={item.year} delay={index * 0.05}>
            <article className="journey-item">
              <span>{item.year}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section className="section services-section">
      <Reveal>
        <span className="section-label">07 / SERVICES</span>
      </Reveal>

      <div className="services-grid">
        {services.map((service, index) => (
          <Reveal key={service} delay={index * 0.035}>
            <article className="service-card">
              <span>0{index + 1}</span>
              <h3>{service}</h3>
              <ArrowUpRight size={19} />
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Contact() {
  const [state, setState] = useState("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    details: ""
  });

  const submit = (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.email.includes("@") || !form.details.trim()) {
      setState("error");
      return;
    }

    setState("loading");

    window.setTimeout(() => {
      setState("success");
      setForm({ name: "", email: "", details: "" });
    }, 700);
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="contact-header">
        <Reveal>
          <span className="section-label">08 / CONTACT</span>
          <h2>
            LET'S BUILD
            <br />
            SOMETHING <em>USEFUL.</em>
          </h2>
        </Reveal>

        <Reveal>
          <a className="email-link" href={`mailto:${site.email}`}>
            {site.email}
            <ArrowUpRight size={19} />
          </a>
        </Reveal>
      </div>

      <Reveal>
        <form className="contact-form" onSubmit={submit} noValidate>
          <label>
            <span>01 / NAME</span>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Saqlain Khan"
              autoComplete="name"
            />
          </label>

          <label>
            <span>02 / EMAIL</span>
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="khansaqikhan97@gmail.com"
              type="email"
              autoComplete="email"
            />
          </label>

          <label className="full-field">
            <span>03 / PROJECT DETAILS</span>
            <textarea
              value={form.details}
              onChange={(e) => setForm({ ...form, details: e.target.value })}
              placeholder="Tell me what you're building..."
              rows="5"
            />
          </label>

          <button className="primary-button submit-button" type="submit">
            {state === "loading" ? (
              "SENDING..."
            ) : state === "success" ? (
              <>
                SENT <Check size={17} />
              </>
            ) : (
              <>
                START A CONVERSATION <Send size={16} />
              </>
            )}
          </button>

          {state === "error" && (
            <p className="form-message error">
              Please complete all fields with a valid email.
            </p>
          )}

          {state === "success" && (
            <p className="form-message success">
              Thanks ? your message has been prepared successfully.
            </p>
          )}
        </form>
      </Reveal>
    </section>
  );
}

export function Footer() {
  const top = () =>
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  return (
    <footer className="footer">
      <div>
        <span className="brand-mark">AI</span>
        <strong>Saqlain Khan</strong>
      </div>

      <p>Built with intention. ? 2026</p>

      <div className="footer-links">
  <a
    href="https://www.linkedin.com/in/saqlain-khan-928826424"
    target="_blank"
    rel="noopener noreferrer"
    className="social-link"
  >
    LinkedIn
  </a>

  <a
    href="https://github.com/Saqlainkhan12"
    target="_blank"
    rel="noopener noreferrer"
    className="social-link"
  >
    GitHub
  </a>

  <a
    href="https://wa.me/923231824597"
    target="_blank"
    rel="noopener noreferrer"
    className="social-link"
  >
    WhatsApp
  </a>

        <a href={site.github} target="_blank" rel="noopener noreferrer">
          <Github size={15} /> GitHub
        </a>
        <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn <ArrowUpRight size={15} />
        </a>
        <button onClick={top}>
          TOP <ChevronDown size={15} className="rotate-180" />
        </button>
      </div>
    </footer>
  );
}












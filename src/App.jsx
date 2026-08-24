import React from "react";

import {
  Navbar,
  Hero,
  TechMarquee,
  Projects,
  Method,
  Skills,
  About,
  Journey,
  Services,
  Contact,
  Footer
} from "./components";

export default function App() {
  return (
    <div className="app-shell">

      <Navbar />

      <main>

        {/* HERO */}
        <Hero />

        {/* TECHNOLOGY STRIP */}
        <TechMarquee />

        {/* SELECTED PROJECTS */}
        <Projects />

        {/* DEVELOPMENT METHOD */}
        <Method />

        {/* SKILLS */}
        <Skills />

        {/* ABOUT */}
        <About />

        {/* JOURNEY */}
        <Journey />

        {/* SERVICES */}
        <Services />

        {/* CONTACT */}
        <Contact />

      </main>

      <Footer />

    </div>
  );
}


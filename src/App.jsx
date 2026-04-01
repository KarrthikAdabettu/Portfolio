import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import anime from "animejs";
import Hero from "./components/Hero";
import TerminalIntro from "./components/TerminalIntro";
import Projects from "./components/Projects";
import Atmosphere from "./components/Atmosphere";
import CursorGlow from "./components/CursorGlow";
import IntroSequence from "./components/IntroSequence";
import Navbar from "./components/Navbar";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ProjectPage from "./components/ProjectPage";
import Layout from "./components/Layout";
import "./App.css";

const App = () => {
  const [introFinished, setIntroFinished] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!introFinished) return;

    let observer = null;
    const timer = setTimeout(() => {
      const sections = document.querySelectorAll(".reveal-section");
      if (sections.length === 0) return;

      // Anime.js Scroll Reveal System
      observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
              const targets = entry.target.querySelectorAll('.reveal');
              if (targets.length > 0) {
                  anime({
                      targets: targets,
                      opacity: [0, 1],
                      translateY: [40, 0],
                      duration: 1200,
                      delay: anime.stagger(150),
                      easing: 'easeOutQuart'
                  });
                  // Remove class so it doesn't reveal again if not wanted, or keep it to repeat
                  entry.target.classList.remove('reveal-section');
                  if (observer) observer.unobserve(entry.target);
              }
          }
        });
      }, { threshold: 0.15 });

      sections.forEach(section => observer.observe(section));
    }, 100);

    return () => {
      clearTimeout(timer);
      if (observer) observer.disconnect();
    };
  }, [introFinished, location.pathname]);

  return (
    <div className="app-container">
      {!introFinished && <IntroSequence onComplete={() => setIntroFinished(true)} />}
      
      <Atmosphere />
      <CursorGlow />
      
      {/* 
        Only render core interactive content once intro finishes 
        so hero text anime.js can trigger reliably at exactly the right time
      */}
      {introFinished && (
        <Routes>
          <Route element={<Layout />}>
            {/* Main Portfolio Page */}
            <Route path="/" element={
              <>
                <div id="home">
                  <Hero />
                </div>
                <div id="terminal" className="reveal-section">
                    <TerminalIntro />
                </div>
                {/* Experience, Projects, and Contact sections */}
                <div id="experience" className="reveal-section">
                    <Experience />
                </div>
                <div id="projects" className="reveal-section">
                    <Projects />
                </div>
                <div id="contact" className="reveal-section">
                    <Contact />
                </div>
              </>
            } />
            {/* Dedicated Project Page */}
            <Route path="/projects/:projectId" element={<ProjectPage />} />
          </Route>
        </Routes>
      )}
    </div>
  );
};

export default App;

import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import WhatIDo from "./components/WhatIDo";
import TechStack from "./components/TechStack";
import Skills from "./components/Skills";
import Projects from "./components/projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import BackToTop from "./components/BackToTop";
import CommandPalette from "./components/CommandPalette";
import useTheme from "./hooks/useTheme";

function App() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className="min-h-[100svh] bg-white dark:bg-slate-900 transition-colors duration-500 relative">
      <div className="noise-overlay" />
      <CustomCursor />
      <ScrollProgress />
      <CommandPalette />
      <Toaster position="bottom-right" toastOptions={{ style: { borderRadius: "12px", background: "#1a1a2e", color: "#fff" } }} />

      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
      <section id="hero">
        <Hero />
      </section>
      <About />
      <WhatIDo />
      <TechStack />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;
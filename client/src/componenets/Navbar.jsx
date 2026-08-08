import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";

export default function Navbar({ darkMode, toggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = ["About", "Skills", "Projects", "Contact"];

  const scrollTo = (id) => {
    setIsOpen(false);
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg shadow-md" : "bg-transparent"}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="text-xl font-bold text-slate-800 dark:text-white">
          Omkar<span className="text-blue-600">.</span>
        </button>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <button key={link} onClick={() => scrollTo(link)} className="text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
              {link}
            </button>
          ))}
          <button onClick={toggleTheme} className="p-2 rounded-full bg-slate-200 dark:bg-slate-700 hover:scale-110 transition-transform">
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        <button className="md:hidden text-slate-800 dark:text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 px-6 pb-6 flex flex-col gap-4">
          {links.map((link) => (
            <button key={link} onClick={() => scrollTo(link)} className="text-slate-700 dark:text-slate-200 font-medium text-left">
              {link}
            </button>
          ))}
          <button onClick={toggleTheme} className="p-2 rounded-full bg-slate-200 dark:bg-slate-700 w-fit">
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      )}
    </nav>
  );
}
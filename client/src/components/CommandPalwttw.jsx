import { useState, useEffect } from "react";
import { Command } from "cmdk";
import { Home, User, Code, Briefcase, Mail, Github, Linkedin } from "lucide-react";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const go = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-start justify-center pt-32 bg-black/50 backdrop-blur-sm" onClick={() => setOpen(false)}>
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-lg mx-4">
        <Command className="rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-700">
          <Command.Input
            placeholder="Type a command or search..."
            className="w-full px-5 py-4 text-slate-900 dark:text-white bg-transparent outline-none border-b border-slate-200 dark:border-slate-700"
          />
          <Command.List className="p-2 max-h-80 overflow-y-auto">
            <Command.Empty className="px-4 py-6 text-sm text-slate-500 text-center">No results found.</Command.Empty>
            <Command.Item onSelect={() => go("hero")} className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-slate-700 dark:text-slate-200 data-[selected=true]:bg-slate-100 dark:data-[selected=true]:bg-slate-800">
              <Home size={16} /> Go to Home
            </Command.Item>
            <Command.Item onSelect={() => go("about")} className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-slate-700 dark:text-slate-200 data-[selected=true]:bg-slate-100 dark:data-[selected=true]:bg-slate-800">
              <User size={16} /> Go to About
            </Command.Item>
            <Command.Item onSelect={() => go("skills")} className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-slate-700 dark:text-slate-200 data-[selected=true]:bg-slate-100 dark:data-[selected=true]:bg-slate-800">
              <Code size={16} /> Go to Skills
            </Command.Item>
            <Command.Item onSelect={() => go("projects")} className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-slate-700 dark:text-slate-200 data-[selected=true]:bg-slate-100 dark:data-[selected=true]:bg-slate-800">
              <Briefcase size={16} /> Go to Projects
            </Command.Item>
            <Command.Item onSelect={() => go("contact")} className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-slate-700 dark:text-slate-200 data-[selected=true]:bg-slate-100 dark:data-[selected=true]:bg-slate-800">
              <Mail size={16} /> Go to Contact
            </Command.Item>
            <Command.Item onSelect={() => window.open("https://github.com/yourusername", "_blank")} className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-slate-700 dark:text-slate-200 data-[selected=true]:bg-slate-100 dark:data-[selected=true]:bg-slate-800">
              <Github size={16} /> Open GitHub
            </Command.Item>
            <Command.Item onSelect={() => window.open("https://linkedin.com/in/yourusername", "_blank")} className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-slate-700 dark:text-slate-200 data-[selected=true]:bg-slate-100 dark:data-[selected=true]:bg-slate-800">
              <Linkedin size={16} /> Open LinkedIn
            </Command.Item>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
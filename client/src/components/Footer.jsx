import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-8 px-6 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          © {year} Omkar Patil. All rights reserved.
        </p>
        <div className="flex gap-5">
          <a href="https://github.com/yourusername" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-blue-600 dark:text-slate-400">
            <Github size={20} />
          </a>
          <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-blue-600 dark:text-slate-400">
            <Linkedin size={20} />
          </a>
          <a href="mailto:your.email@example.com" className="text-slate-500 hover:text-blue-600 dark:text-slate-400">
            <Mail size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { Send, Mail, Copy, Check, Radio } from "lucide-react";

function FloatingField({ label, name, value, onChange, type = "text", textarea = false, focusColor }) {
  const [focused, setFocused] = useState(false);
  const hasValue = value.length > 0;

  const Tag = textarea ? "textarea" : "input";

  return (
    <div className="relative">
      <Tag
        name={name}
        type={textarea ? undefined : type}
        rows={textarea ? 5 : undefined}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required
        className="peer w-full px-4 pt-6 pb-2 rounded-xl bg-white/[0.03] border text-white placeholder-transparent focus:outline-none transition-colors duration-300 resize-none"
        style={{ borderColor: focused ? focusColor : "rgba(255,255,255,0.1)" }}
        placeholder={label}
      />
      <motion.label
        animate={{
          top: focused || hasValue ? 8 : textarea ? 20 : "50%",
          fontSize: focused || hasValue ? "0.7rem" : "0.9rem",
          y: focused || hasValue ? 0 : textarea ? 0 : "-50%",
          color: focused ? focusColor : "rgba(255,255,255,0.35)",
        }}
        transition={{ duration: 0.2 }}
        className="absolute left-4 pointer-events-none font-medium"
      >
        {label}
      </motion.label>
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 rounded-full"
        style={{ background: focusColor }}
        initial={{ width: 0 }}
        animate={{ width: focused ? "100%" : "0%" }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}

function TransmissionStatus() {
  const messages = ["CHANNEL OPEN", "AWAITING TRANSMISSION", "ENCRYPTED · SECURE"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setIndex((i) => (i + 1) % messages.length), 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center gap-2 font-mono text-xs text-emerald-300/70">
      <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }}>
        <Radio size={12} />
      </motion.span>
      <motion.span key={index} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        {messages[index]}
      </motion.span>
    </div>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);
  const [copied, setCopied] = useState(false);
  const email = "omkarpatil@example.com";

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    toast.success("Email copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    const toastId = toast.loading("Transmitting message...");
    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      toast.success("Message sent successfully!", { id: toastId });
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      toast.error("Transmission failed. Try again.", { id: toastId });
    }
  };

  return (
    <section id="contact" className="relative py-32 px-6 md:px-16 bg-[#0b080c] overflow-hidden">
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full blur-[150px] opacity-20 bg-emerald-500 pointer-events-none" />
      <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] rounded-full blur-[150px] opacity-15 bg-teal-500 pointer-events-none" />

      <svg className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none" preserveAspectRatio="none">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.line
            key={i}
            x1={`${Math.random() * 100}%`} y1={`${Math.random() * 100}%`}
            x2={`${Math.random() * 100}%`} y2={`${Math.random() * 100}%`}
            stroke="#34d399" strokeWidth="1"
            animate={{ opacity: [0.1, 0.5, 0.1] }}
            transition={{ duration: 3 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 3 }}
          />
        ))}
      </svg>

      <div className="relative z-10 max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <p className="text-emerald-400 font-mono text-sm tracking-wider mb-3">// CONTACT.connect()</p>
          <h2 className="text-4xl md:text-6xl font-bold font-display bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent mb-4">
            Let's Connect
          </h2>
          <TransmissionStatus />
        </motion.div>

        <motion.button
          onClick={handleCopy}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 mx-auto mt-8 mb-8 px-4 py-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 text-emerald-300 text-sm font-mono"
        >
          <Mail size={14} />
          {email}
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                <Check size={14} />
              </motion.span>
            ) : (
              <motion.span key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                <Copy size={14} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative space-y-5 p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm"
        >
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: "visible" }}>
            <line x1="0" y1="0" x2="100%" y2="0" stroke="#34d399" strokeWidth="1" strokeDasharray="6,6" opacity="0.2" />
            <line x1="0" y1="100%" x2="100%" y2="100%" stroke="#34d399" strokeWidth="1" strokeDasharray="6,6" opacity="0.2" />
          </svg>

          <FloatingField label="Your Name" name="name" value={formData.name} onChange={handleChange} focusColor="#34d399" />
          <FloatingField label="Your Email" name="email" type="email" value={formData.email} onChange={handleChange} focusColor="#2dd4bf" />
          <FloatingField label="Your Message" name="message" value={formData.message} onChange={handleChange} textarea focusColor="#22d3ee" />

          <motion.button
            type="submit"
            disabled={status === "loading"}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white py-3.5 rounded-xl font-medium overflow-hidden disabled:opacity-60"
          >
            {status === "loading" && (
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <Send size={18} />
              {status === "loading" ? "Transmitting..." : "Send Message"}
            </span>
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}
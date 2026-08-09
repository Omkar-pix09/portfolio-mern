import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [visible, setVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 12);
      cursorY.set(e.clientY - 12);
      if (!visible) setVisible(true);
      const target = e.target;
      setIsPointer(window.getComputedStyle(target).cursor === "pointer" || target.tagName === "BUTTON" || target.tagName === "A");
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY, visible]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[100] mix-blend-difference hidden md:block"
      style={{
        x,
        y,
        opacity: visible ? 1 : 0,
        scale: isPointer ? 1.8 : 1,
        background: "linear-gradient(135deg, #6366f1, #ec4899)",
      }}
      transition={{ scale: { duration: 0.2 } }}
    />
  );
}
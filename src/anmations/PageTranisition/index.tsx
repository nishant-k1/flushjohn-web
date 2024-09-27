"use client"; // Ensure this component is a client component

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const variants = {
  initial: { opacity: 0.3, scale: 1 }, // Start slightly zoomed out
  enter: { opacity: 1, scale: 1 }, // Zoom in to normal size
  exit: { opacity: 1, scale: 1 }, // Slightly zoom out before exiting
};

const transition = {
  ease: "easeInOut",
  duration: 1.5, // Reduced duration for a snappier transition
};

const PageTranisition = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey((prev) => prev + 1);
  }, [pathname]);

  return (
    // <div style={{ overflow: "hidden" }}>
    <AnimatePresence>
      <motion.div
        key={key}
        initial="initial"
        animate="enter"
        exit="exit"
        variants={variants}
        transition={transition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
    // </div>
  );
};

export default PageTranisition;

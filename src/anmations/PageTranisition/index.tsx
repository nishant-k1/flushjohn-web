"use client"; // Ensure this component is a client component

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { overlapFade } from "../effectData";

const { variants, transition } = overlapFade;

const PageTranisition = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey((prev) => prev + 1);
  }, [pathname]);

  return (
    <div style={{ overflow: "hidden" }}>
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
    </div>
  );
};

export default PageTranisition;

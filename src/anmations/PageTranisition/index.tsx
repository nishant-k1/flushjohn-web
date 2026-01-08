"use client"; // Ensure this component is a client component

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { animations } from "@/anmations/effectData";
import AnimationWrapper from "../AnimationWrapper";

// Lazy load framer-motion to reduce initial bundle size
const AnimatePresence = dynamic(
  () => import("framer-motion").then((mod) => mod.AnimatePresence),
  { ssr: false }
);

const PageTranisition = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey((prev) => prev + 1);
  }, [pathname]);

  return (
    <div style={{ overflow: "hidden" }}>
      <AnimatePresence>
        <AnimationWrapper effect={animations?.fadeWithScale} animationKey={key}>
          {children}
        </AnimationWrapper>
      </AnimatePresence>
    </div>
  );
};

export default PageTranisition;

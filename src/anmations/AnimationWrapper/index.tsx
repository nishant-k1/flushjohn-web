"use client"; // Ensure this component is a client component

import dynamic from "next/dynamic";
import React from "react";

// Lazy load framer-motion to reduce initial bundle size
const AnimatePresence = dynamic(
  () => import("framer-motion").then((mod) => ({ default: mod.AnimatePresence })),
  { ssr: false }
);

const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => ({ default: mod.motion.div })),
  { ssr: false }
);

const AnimationWrapper = ({
  children,
  effect,
  animationKey,
  className,
}: {
  children: React.ReactNode;
  effect: any;
  animationKey?: any;
  className?: any;
}) => {
  const { variants } = effect;

  return (
    <div>
      <AnimatePresence>
        <MotionDiv
          key={animationKey}
          className={className}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants}
        >
          {children}
        </MotionDiv>
      </AnimatePresence>
    </div>
  );
};

export default AnimationWrapper;

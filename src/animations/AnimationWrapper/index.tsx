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

const AnimationWrapper = React.forwardRef<
  HTMLDivElement,
  {
    children: React.ReactNode;
    effect: any;
    animationKey?: any;
    className?: any;
    style?: React.CSSProperties;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  }
>(({ children, effect, animationKey, className, style, onClick }, ref) => {
  const { variants } = effect;

  return (
    <AnimatePresence mode="wait">
      <MotionDiv
        ref={ref}
        key={animationKey}
        className={className}
        style={style}
        onClick={onClick}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
      >
        {children}
      </MotionDiv>
    </AnimatePresence>
  );
});

AnimationWrapper.displayName = "AnimationWrapper";

export default AnimationWrapper;

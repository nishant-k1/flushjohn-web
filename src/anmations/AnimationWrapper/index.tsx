"use client"; // Ensure this component is a client component

import { AnimatePresence, motion } from "framer-motion";

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
        <motion.div
          key={animationKey}
          className={className}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AnimationWrapper;

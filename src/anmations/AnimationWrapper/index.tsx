"use client"; // Ensure this component is a client component

import { motion } from "framer-motion";

const AnimationWrapper = ({
  children,
  effect,
  key,
}: {
  children: React.ReactNode;
  effect: any;
  key?: string | number;
}) => {
  console.log("key", key);
  const { variants, transition } = effect;
  return (
    <div>
      <motion.div
        key={key}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default AnimationWrapper;

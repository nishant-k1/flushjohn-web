"use client"; // Ensure this component is a client component

import { motion } from "framer-motion";

const AnimationWrapper = ({
  children,
  variants,
}: {
  children: React.ReactNode;
  variants: any;
}) => {
  return (
    <div>
      <motion.div
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

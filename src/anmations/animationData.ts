export const variants = {
  bobble: {
    // initial: { opacity: 0, scale: 1 },
    initial: { opacity: 1, scale: 1 },
    animate: {
      opacity: 1,
      scale: 1,
      y: [0, -10, 0], // Bobbing effect
      transition: {
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
      },
    },
    exit: { opacity: 0, scale: 0.9 },
  },
  bobbleImage: {
    // initial: { opacity: 0, scale: 1 },
    initial: { opacity: 1, scale: 1 },
    animate: {
      opacity: 1,
      scale: 1,
      y: [0, -10, 0], // Bobbing effect
      transition: {
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
      },
    },
    exit: { opacity: 0, scale: 0.9 },
  },
  bobbleButton: {
    // initial: { opacity: 0, scale: 1 },
    initial: { opacity: 1, scale: 1 },
    animate: {
      opacity: 1,
      scale: 1,
      y: [0, -10, 0], // Bobbing effect
      transition: {
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
      },
    },
    exit: { opacity: 0, scale: 0.9 },
  },
  pulse: {
    initial: { opacity: 1 },
    animate: {
      opacity: 1,
      scale: [1, 1.05, 1], // Pulse effect
      transition: {
        duration: 5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
      },
    },
    exit: { opacity: 0, scale: 0.9 },
  },
  pulseImage: {
    initial: { opacity: 1 },
    animate: {
      opacity: 1,
      scale: [1, 1.05, 1], // Pulse effect
      transition: {
        duration: 5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
      },
    },
    exit: { opacity: 0, scale: 0.9 },
  },
  pulseButton: {
    initial: { opacity: 1 },
    animate: {
      opacity: 1,
      scale: [1, 1.08, 1], // Pulse effect
      transition: {
        duration: 1.2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
      },
    },
    exit: { opacity: 0, scale: 0.9 },
  },
  scaleAndRotate: {
    initial: { opacity: 1, scale: 0.9, rotate: 0 },
    animate: {
      opacity: 1,
      scale: 1,
      rotate: [0, 5, -5, 0], // Slight rotation back and forth
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
      },
    },
    exit: { opacity: 1, scale: 0.9 },
  },
  zoomAndFade: {
    initial: { opacity: 1, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: [1, 1.1, 1], // Zoom in slightly
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
      },
    },
    exit: { opacity: 1, scale: 0.8 },
  },
  wave: {
    initial: { opacity: 1, scale: 1 },
    animate: {
      opacity: 1,
      scale: 1,
      y: [0, 10, 0, -10, 0], // Wave effect
      rotate: [0, 3, -3, 0], // Slight rotation with wave
      transition: {
        duration: 5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
      },
    },
    exit: { opacity: 1, scale: 0.9 },
  },
};

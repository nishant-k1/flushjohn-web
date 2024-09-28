export const fadeWithScale = {
  variants: {
    initial: { opacity: 0.3, scale: 0.95 }, // Start slightly zoomed out and faded
    enter: { opacity: 1, scale: 1 }, // Full opacity and scale
    exit: { opacity: 0, scale: 0.95 }, // Fade out and zoom out slightly
  },
  transition: {
    ease: "easeInOut",
    duration: 0.8, // Adjust duration for smoothness
  },
};

export const slideWithOpacityChange = {
  variants: {
    initial: { opacity: 0.5, x: "-100%" }, // Start off-screen to the left with reduced opacity
    enter: { opacity: 1, x: "0%" }, // Slide in to position
    exit: { opacity: 0.5, x: "100%" }, // Slide out to the right with reduced opacity
  },

  transition: {
    ease: "easeInOut",
    duration: 1, // Balanced duration for sliding and fading
  },
};

export const swipe = {
  variants: {
    initial: { opacity: 0, x: "-100%" }, // Off-screen to the left
    enter: { opacity: 1, x: "0%" }, // Slide in to center
    exit: { opacity: 0, x: "100%" }, // Slide off-screen to the right
  },

  transition: {
    ease: "easeInOut",
    duration: 0.8, // Fast swipe effect
  },
};

export const zoomOutAndZoomIn = {
  variants: {
    initial: { opacity: 0.3, scale: 1.1 }, // Start zoomed in with lower opacity
    enter: { opacity: 1, scale: 1 }, // Zoom into normal scale and opacity
    exit: { opacity: 0.3, scale: 1.1 }, // Zoom out slightly on exit
  },

  transition: {
    ease: "easeInOut",
    duration: 0.8, // Snappy and dynamic zoom effect
  },
};

export const overlapFade = {
  variants: {
    initial: { opacity: 0.5 }, // Reduced opacity at start
    enter: { opacity: 1 }, // Full opacity when entering
    exit: { opacity: 0 }, // Fade out completely on exit
  },

  transition: {
    ease: "easeInOut",
    duration: 0.6, // Short and smooth overlap
  },
};

export const parallaxTransition = {
  variants: {
    initial: { opacity: 0, y: "100%" }, // Start at bottom with no opacity
    enter: { opacity: 1, y: "0%" }, // Slide to center and full opacity
    exit: { opacity: 0, y: "-100%" }, // Slide out upwards with no opacity
  },

  transition: {
    ease: "easeInOut",
    duration: 1, // Moderate duration for parallax effect
  },
};

export const bobble = {
  variants: {
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

  transition: {
    ease: "easeInOut",
    duration: 1, // Moderate duration for parallax effect
  },
};

export const bobbleImage = {
  variants: {
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
  transition: {
    ease: "easeInOut",
    duration: 1, // Moderate duration for parallax effect
  },
};

export const bobbleButton = {
  variants: {
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
  transition: {
    ease: "easeInOut",
    duration: 1, // Moderate duration for parallax effect
  },
};

export const pulse = {
  variants: {
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
  transition: {
    ease: "easeInOut",
    duration: 1, // Moderate duration for parallax effect
  },
};

export const pulseImage = {
  variants: {
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
  transition: {
    ease: "easeInOut",
    duration: 1, // Moderate duration for parallax effect
  },
};

export const pulseButton = {
  variants: {
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
  transition: {
    ease: "easeInOut",
    duration: 1, // Moderate duration for parallax effect
  },
};

export const scaleAndRotate = {
  variants: {
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
  transition: {
    ease: "easeInOut",
    duration: 1, // Moderate duration for parallax effect
  },
};

export const zoomAndFade = {
  variants: {
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
  transition: {
    ease: "easeInOut",
    duration: 1, // Moderate duration for parallax effect
  },
};

export const wave = {
  variants: {
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
  transition: {
    ease: "easeInOut",
    duration: 1, // Moderate duration for parallax effect
  },
};

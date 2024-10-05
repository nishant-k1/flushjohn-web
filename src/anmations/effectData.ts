export const animations = {
  fadeWithScale: {
    variants: {
      initial: {
        opacity: 0,
        scale: 1,
        transition: {
          duration: 0.5, // Duration of the animation
          ease: "easeInOut", // Easing function for the transition
        },
      },
      animate: {
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.5, // Duration of the animation
          ease: "easeInOut", // Easing function for the transition
        },
      },
      exit: {
        opacity: 0,
        scale: 0.9,
        transition: {
          duration: 0.5, // Duration of the animation
          ease: "easeInOut", // Easing function for the transition
        },
      },
    },
  },

  slideWithOpacityChange: {
    variants: {
      initial: {
        opacity: 1,
        x: "100%",
      }, // Start off-screen to the left with reduced opacity
      animate: {
        opacity: 1,
        x: "0",
        transition: {
          ease: "easeInOut",
          duration: 3, // Balanced duration for sliding and fading
        },
      }, // Slide in to position
      exit: {
        opacity: 1,
        x: "100%",
      }, // Slide out to the right with reduced opacity
    },
  },
  slidebarSlide: {
    variants: {
      initial: {
        opacity: 1,
        x: "-100%",
        transition: {
          ease: "easeIn",
          duration: 0.03, // Balanced duration for sliding and fading
        },
      }, // Start off-screen to the left with reduced opacity
      animate: {
        opacity: 1,
        x: "0%",
        transition: {
          ease: "backIn",
          duration: 0.03, // Balanced duration for sliding and fading
        },
      }, // Slide in to position
      exit: {
        opacity: 1,
        x: "-100%",
        transition: {
          ease: "easeOut",
          duration: 0.05, // Balanced duration for sliding and fading
        },
      }, // Slide out to the right with reduced opacity
    },
  },
  swipe: {
    variants: {
      initial: {
        opacity: 0,
        x: "100%",
        transition: {
          ease: "easeInOut",
          duration: 1, // Balanced duration for sliding and fading
        },
      }, // Off-screen to the left
      animate: {
        opacity: 1,
        x: "0%",
        transition: {
          ease: "easeInOut",
          duration: 1, // Balanced duration for sliding and fading
        },
      }, // Slide in to center
      exit: {
        opacity: 0,
        x: "-100%",
        transition: {
          ease: "easeInOut",
          duration: 1, // Balanced duration for sliding and fading
        },
      }, // Slide off-screen to the right
    },
  },

  zoomOutAndZoomIn: {
    variants: {
      initial: { opacity: 0.3, scale: 1.1 }, // Start zoomed in with lower opacity
      animate: { opacity: 1, scale: 1 }, // Zoom into normal scale and opacity
      exit: { opacity: 0.3, scale: 1.1 }, // Zoom out slightly on exit
    },
    transition: {
      ease: "easeInOut",
      duration: 0.8, // Snappy and dynamic zoom effect
    },
  },

  overlapFade: {
    variants: {
      initial: { opacity: 0.5 }, // Reduced opacity at start
      animate: { opacity: 1 }, // Full opacity when entering
      exit: { opacity: 0 }, // Fade out completely on exit
    },
    transition: {
      ease: "easeInOut",
      duration: 0.6, // Short and smooth overlap
    },
  },

  parallaxTransition: {
    variants: {
      initial: { opacity: 0, y: "100%" }, // Start at bottom with no opacity
      animate: { opacity: 1, y: "0%" }, // Slide to center and full opacity
      exit: { opacity: 0, y: "-100%" }, // Slide out upwards with no opacity
    },
    transition: {
      ease: "easeInOut",
      duration: 5, // Moderate duration for parallax effect
    },
  },

  bobble: {
    variants: {
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
  },

  bobbleImage: {
    variants: {
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
  },

  bobbleButton: {
    variants: {
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
  },

  pulse: {
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
  },

  pulseImage: {
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
  },

  pulseButton: {
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
  },

  scaleAndRotate: {
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
  },

  zoomAndFade: {
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
  },

  wave: {
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
  },
};

/**
 * FlushJohn Web - Theme Configuration
 *
 * Central theme file containing all color values, design tokens, and theme constants.
 * This file serves as the single source of truth for all design system values.
 *
 * Colors defined here should match the CSS variables in styles/globals.css
 */

export const theme = {
  // ============================================
  // Primary Brand Colors
  // ============================================
  colors: {
    primary: "#8c6f48",
    primaryDark: "#6d5637",
    primaryLight: "#a5896a",
    primaryLighter: "#bea38c",

    secondary: "#8c6f48",
    secondaryLight: "#a5896a",
    secondaryLighter: "#bea38c",

    // Accent Colors
    accentBlue: "#6d5637",
    accentBlueLight: "#8c6f48",
    accentBlueDark: "#5a4630",
    accentGreen: "#6d5637",
    accentGreenDark: "#5a4630",
    accentGold: "#a5896a",

    // Neutral Colors - Based on main color with proper contrast
    neutral: {
      50: "#f5f3f0",
      100: "#ebe7e1",
      200: "#d7cfc3",
      300: "#c3b7a5",
      400: "#af9f87",
      500: "#8c6f48", // Main color
      600: "#6d5637",
      700: "#4e3d26",
      800: "#2f2415",
      900: "#1a1209",
    },

    // Text Colors - Optimized for dark brown background
    text: {
      primary: "#ffffff",
      secondary: "rgba(255, 255, 255, 0.9)",
      tertiary: "rgba(255, 255, 255, 0.7)",
      inverse: "#ffffff",
      inverseSecondary: "rgba(255, 255, 255, 0.9)",
      inverseTertiary: "rgba(255, 255, 255, 0.7)",
      dark: "#1a1a1a",
      formPlaceholder: "rgba(0, 0, 0, 0.6)",
      formValue: "#333",
    },

    // Background Colors
    background: {
      primary: "#5a4a3a",
      secondary: "#5a4a3a",
      tertiary: "#5a4a3a",
      dark: "#5a4a3a",
      darkAlpha: "rgba(90, 74, 58, 0.95)",
      darkAlpha50: "rgba(90, 74, 58, 0.5)",
      darkAlpha40: "rgba(90, 74, 58, 0.4)",
      transparent: "transparent",
      white: "#ffffff",
      light: "#f7fafc",
      lighter: "#f8f9fa",
      input: "#ffffff",
      buttonLight: "#f0f0f0",
      grayLight: "#f2f2f2",
      gray: "#ddd",
    },

    // Semantic Colors - Earth-toned but functional
    semantic: {
      success: "#6b8e5a",
      successDark: "#556b47",
      successLight: "#7fa366",
      successBg: "rgba(107, 142, 90, 0.15)",

      error: "#c85d47",
      errorDark: "#b04a35",
      errorLight: "#d8725f",
      errorRed: "#ff4444",
      errorRedAlpha90: "rgba(255, 68, 68, 0.9)", // For error messages with slight transparency
      errorBorder: "#ff4444",
      errorBg: "rgba(200, 93, 71, 0.15)",

      warning: "#d4a574",
      warningDark: "#b8905a",
      warningLight: "#e6b890",
      warningBg: "rgba(212, 165, 116, 0.15)",

      info: "#8c6f48",
      infoDark: "#6d5637",
      infoLight: "#a5896a",
      infoBg: "rgba(140, 111, 72, 0.15)",
    },

    // Border Colors
    border: {
      light: "#d9d9d9",
      lighter: "#e8e8e8",
      checkbox: "#c0c0c0",
      default: "#d9d9d9",
    },

    // Primary Color with Opacity Variants
    primaryAlpha: {
      5: "rgba(140, 111, 72, 0.05)",
      6: "rgba(140, 111, 72, 0.06)",
      8: "rgba(140, 111, 72, 0.08)",
      10: "rgba(140, 111, 72, 0.1)",
      12: "rgba(140, 111, 72, 0.12)",
      15: "rgba(140, 111, 72, 0.15)",
      20: "rgba(140, 111, 72, 0.2)",
      30: "rgba(140, 111, 72, 0.3)",
      40: "rgba(140, 111, 72, 0.4)",
    },

    // White Overlay Variants
    whiteAlpha: {
      5: "rgba(255, 255, 255, 0.05)",
      8: "rgba(255, 255, 255, 0.08)",
      10: "rgba(255, 255, 255, 0.1)",
      12: "rgba(255, 255, 255, 0.12)",
      15: "rgba(255, 255, 255, 0.15)",
      18: "rgba(255, 255, 255, 0.18)",
      20: "rgba(255, 255, 255, 0.2)",
      25: "rgba(255, 255, 255, 0.25)",
      30: "rgba(255, 255, 255, 0.3)",
      50: "rgba(255, 255, 255, 0.5)",
      90: "rgba(255, 255, 255, 0.9)",
    },

    // Black/Dark Overlay Variants
    blackAlpha: {
      5: "rgba(0, 0, 0, 0.05)",
      10: "rgba(0, 0, 0, 0.1)",
      12: "rgba(0, 0, 0, 0.12)",
      15: "rgba(0, 0, 0, 0.15)",
      18: "rgba(0, 0, 0, 0.18)",
      20: "rgba(0, 0, 0, 0.2)",
      25: "rgba(0, 0, 0, 0.25)",
      30: "rgba(0, 0, 0, 0.3)",
      40: "rgba(0, 0, 0, 0.4)",
      50: "rgba(0, 0, 0, 0.5)",
      60: "rgba(0, 0, 0, 0.6)",
    },

    // Rating/Star Colors
    rating: {
      active: "#FFD700",
      inactive: "rgba(255, 255, 255, 0.25)",
      glow: "rgba(255, 215, 0, 0.5)",
    },

    // Social Media Colors
    social: {
      facebook: "#3b5998",
      twitter: "#1da1f2",
      linkedin: "#0077b5",
    },

    // Additional Gray Colors
    gray: {
      medium: "#6c757d",
      text: "#666",
      dark: "#4a4a4a",
      darker: "#1a1a1a",
    },

    // Hero Section Overlay Colors
    hero: {
      overlayDarkBlue: "rgba(0, 28, 58, 0.8)", // Dark blue overlay on carousel images
      overlayGradientStart: "rgba(44, 62, 80, 0.3)", // Dark blue-gray gradient start
      overlayGradientEnd: "rgba(52, 73, 94, 0.3)", // Dark blue-gray gradient end
      overlayGradientStartLight: "rgba(44, 62, 80, 0.25)", // Lighter gradient start
      overlayGradientEndLight: "rgba(52, 73, 94, 0.25)", // Lighter gradient end
    },

    // Callout Colors (used for phone callout, similar to hero overlay colors)
    callout: {
      gradientStart: "#2c3e50", // Dark blue-gray gradient start
      gradientEnd: "#34495e", // Dark blue-gray gradient end
    },

    // Phone Bar Colors (dark blue-gray background for phone bars)
    phoneBar: {
      backgroundStart: "#2c3e50", // Dark blue-gray gradient start
      backgroundEnd: "#34495e", // Dark blue-gray gradient end
    },

    // Phone Button Colors
    phoneButton: {
      // Red variant (for PhoneNumberBar)
      redStart: "#e74c3c",
      redEnd: "#c0392b",
      redHoverStart: "#c0392b",
      redHoverEnd: "#a93226",
      redAlpha30: "rgba(231, 76, 60, 0.3)",
      redAlpha40: "rgba(231, 76, 60, 0.4)",
      // Green variant (for CombinedContactBar)
      greenStart: "#4a7c59",
      greenEnd: "#2d4a35",
      greenHoverStart: "#2d4a35",
      greenHoverEnd: "#1e3124",
      greenAlpha40: "rgba(45, 74, 53, 0.4)",
      greenAlpha50: "rgba(45, 74, 53, 0.5)",
    },

    // Check Button Colors (orange/brown for zip code checker)
    checkButton: {
      gradientStart: "#5f3300",
      gradientEnd: "#b45309",
      hoverStart: "#b45309",
      hoverEnd: "#92400e",
      border: "#7e4505",
      hoverBorder: "#b45309",
      alpha40: "rgba(217, 119, 6, 0.4)",
      alpha50: "rgba(217, 119, 6, 0.5)",
    },
  },

  // ============================================
  // Typography
  // ============================================
  typography: {
    fontFamily: {
      poppins:
        '"Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
      merriweather: '"Merriweather", Georgia, "Times New Roman", Times, serif',
    },
  },

  // ============================================
  // Spacing Scale
  // ============================================
  spacing: {
    xs: "4px",
    sm: "6px",
    md: "12px",
    lg: "18px",
    xl: "24px",
    "2xl": "32px",
    "3xl": "40px",
    "4xl": "48px",
    "5xl": "60px",
    section: "5rem", // 80px
  },

  // ============================================
  // Grid Gaps
  // ============================================
  gap: {
    sm: "1.5rem", // 24px
    md: "2rem", // 32px
  },

  // ============================================
  // Border Radius
  // ============================================
  borderRadius: {
    sm: "0",
    md: "0",
    lg: "0",
    xl: "0",
    "2xl": "0",
    full: "0",
  },

  // ============================================
  // Shadows
  // ============================================
  shadows: {
    sm: "0 1px 3px rgba(0, 0, 0, 0.08)",
    md: "0 2px 6px rgba(0, 0, 0, 0.1)",
    lg: "0 4px 12px rgba(0, 0, 0, 0.12)",
    xl: "0 6px 20px rgba(0, 0, 0, 0.15)",
    "2xl": "0 8px 30px rgba(0, 0, 0, 0.18)",
    primary: "0 2px 8px rgba(169, 93, 31, 0.25)",
    primaryLg: "0 4px 16px rgba(169, 93, 31, 0.3)",
  },

  // ============================================
  // Transitions
  // ============================================
  transitions: {
    fast: "0.15s ease",
    base: "0.3s ease",
    slow: "0.5s ease",
    bounce: "0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
  },

  // ============================================
  // Z-Index Scale
  // ============================================
  zIndex: {
    base: 1,
    dropdown: 100,
    sticky: 200,
    modal: 300,
    popover: 400,
    tooltip: 500,
  },

  // ============================================
  // Container Widths
  // ============================================
  container: {
    sm: "640px",
    md: "768px",
    lg: "960px",
    xl: "960px",
    "2xl": "960px",
  },

  // ============================================
  // Breakpoints
  // ============================================
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  },
} as const;

// Type exports for TypeScript support
export type Theme = typeof theme;
export type ThemeColors = typeof theme.colors;
export type ThemeSpacing = typeof theme.spacing;

// Helper function to get CSS variable name from theme path
export const getCSSVarName = (path: string): string => {
  return `--${path.replace(/\./g, "-")}`;
};

// Helper to convert theme colors to CSS variables format
export const themeToCSSVars = (themeObj: typeof theme) => {
  const cssVars: Record<string, string> = {};

  // Flatten nested objects into CSS variable format
  const flatten = (obj: any, prefix = ""): void => {
    Object.keys(obj).forEach((key) => {
      const value = obj[key];
      const cssKey = prefix ? `${prefix}-${key}` : key;

      if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
      ) {
        flatten(value, cssKey);
      } else {
        // Convert camelCase to kebab-case for CSS variables
        const kebabKey = cssKey.replace(
          /[A-Z]/g,
          (letter) => `-${letter.toLowerCase()}`
        );
        cssVars[kebabKey] = value;
      }
    });
  };

  flatten(themeObj);
  return cssVars;
};

// Default export
export default theme;

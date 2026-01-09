"use client";

import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { theme as defaultTheme, type Theme } from "@/constants/theme";

/**
 * Theme IDs for available themes
 */
export type ThemeId =
  // Dark themes
  | "default"
  | "brown-dark"
  | "blue"
  | "green"
  | "purple"
  | "dark-gray"
  | "midnight-blue"
  | "deep-green"
  | "charcoal"
  // Medium themes
  | "medium-blue"
  | "medium-green"
  | "medium-purple"
  | "medium-gray"
  | "warm-beige"
  // Light themes
  | "light-blue"
  | "light-green"
  | "light-purple"
  | "light-brown"
  | "light-gray";

/**
 * Theme definition with metadata
 * Colors can be any string values (not just the default theme's literal types)
 */
export interface ThemeDefinition {
  id: ThemeId;
  name: string;
  description?: string;
  colors: {
    [K in keyof Theme["colors"]]: Theme["colors"][K] extends string
      ? string
      : Theme["colors"][K] extends Record<string, any>
        ? {
            [P in keyof Theme["colors"][K]]: Theme["colors"][K][P] extends string
              ? string
              : Theme["colors"][K][P] extends Record<string, any>
                ? { [Q in keyof Theme["colors"][K][P]]: string }
                : string;
          }
        : Theme["colors"][K];
  };
  // Other theme properties can extend Theme type if needed
  typography?: Theme["typography"];
  spacing?: Theme["spacing"];
}

/**
 * Available theme definitions
 * Add new themes here to make them available for switching
 */
export const themes: Record<ThemeId, ThemeDefinition> = {
  default: {
    id: "default",
    name: "Classic Brown",
    description: "Original FlushJohn brown theme",
    colors: {
      ...defaultTheme.colors,
      // Keep original background colors - #5a4a3a
      background: {
        ...defaultTheme.colors.background,
        // Original colors preserved
        primary: "#5a4a3a",
        secondary: "#5a4a3a",
        tertiary: "#5a4a3a",
        dark: "#5a4a3a",
        darkAlpha: "rgba(90, 74, 58, 0.95)",
        darkAlpha50: "rgba(90, 74, 58, 0.5)",
        darkAlpha40: "rgba(90, 74, 58, 0.4)",
        // @ts-ignore - Glass morphism properties
        glass: "rgba(90, 74, 58, 0.75)", // Glass morphism background
        glassLight: "rgba(90, 74, 58, 0.65)",
        glassDark: "rgba(90, 74, 58, 0.85)",
      } as any,
    },
    typography: defaultTheme.typography,
    spacing: defaultTheme.spacing,
  },
  "brown-dark": {
    id: "brown-dark",
    name: "Dark Brown",
    description: "Darker brown theme with glass morphism",
    colors: {
      ...defaultTheme.colors,
      background: {
        ...defaultTheme.colors.background,
        primary: "#2a1f15", // Much darker brown
        secondary: "#2a1f15",
        tertiary: "#2a1f15",
        dark: "#1a130c", // Darkest brown
        darkAlpha: "rgba(26, 19, 12, 0.85)", // Glass morphism with blur
        darkAlpha50: "rgba(26, 19, 12, 0.5)",
        darkAlpha40: "rgba(26, 19, 12, 0.4)",
        // @ts-ignore - Glass morphism properties
        glass: "rgba(42, 31, 21, 0.75)", // Glass morphism background
        glassLight: "rgba(42, 31, 21, 0.65)",
        glassDark: "rgba(26, 19, 12, 0.85)",
      } as any,
    },
    typography: defaultTheme.typography,
    spacing: defaultTheme.spacing,
  },
  blue: {
    id: "blue",
    name: "Ocean Blue",
    description: "Cool blue theme",
    colors: {
      ...defaultTheme.colors,
      primary: "#2563eb",
      primaryDark: "#1e40af",
      primaryLight: "#3b82f6",
      primaryLighter: "#60a5fa",
      secondary: "#2563eb",
      secondaryLight: "#3b82f6",
      secondaryLighter: "#60a5fa",
      accentBlue: "#1e40af",
      accentBlueLight: "#2563eb",
      accentBlueDark: "#1e3a8a",
      neutral: {
        50: "#eff6ff",
        100: "#dbeafe",
        200: "#bfdbfe",
        300: "#93c5fd",
        400: "#60a5fa",
        500: "#3b82f6",
        600: "#2563eb",
        700: "#1d4ed8",
        800: "#1e40af",
        900: "#1e3a8a",
      },
      background: {
        ...defaultTheme.colors.background,
        primary: "#0f172a", // Much darker slate
        secondary: "#0f172a",
        tertiary: "#0f172a",
        dark: "#020617", // Darkest blue
        darkAlpha: "rgba(2, 6, 23, 0.85)", // Glass morphism with blur
        darkAlpha50: "rgba(15, 23, 42, 0.5)",
        darkAlpha40: "rgba(15, 23, 42, 0.4)",
        // @ts-ignore - Glass morphism properties
        glass: "rgba(15, 23, 42, 0.75)", // Glass morphism background
        glassLight: "rgba(15, 23, 42, 0.65)",
        glassDark: "rgba(2, 6, 23, 0.85)",
      } as any,
      primaryAlpha: {
        5: "rgba(37, 99, 235, 0.05)",
        6: "rgba(37, 99, 235, 0.06)",
        8: "rgba(37, 99, 235, 0.08)",
        10: "rgba(37, 99, 235, 0.1)",
        12: "rgba(37, 99, 235, 0.12)",
        15: "rgba(37, 99, 235, 0.15)",
        20: "rgba(37, 99, 235, 0.2)",
        30: "rgba(37, 99, 235, 0.3)",
        40: "rgba(37, 99, 235, 0.4)",
      },
      // Update semantic colors to match blue theme (but keep error red for visibility)
      semantic: {
        ...defaultTheme.colors.semantic,
        success: "#10b981", // Blue-tinted green
        info: "#2563eb", // Use primary blue
        infoDark: "#1e40af",
        infoLight: "#3b82f6",
        infoBg: "rgba(37, 99, 235, 0.15)",
      },
    },
    typography: defaultTheme.typography,
    spacing: defaultTheme.spacing,
  },
  green: {
    id: "green",
    name: "Forest Green",
    description: "Natural green theme",
    colors: {
      ...defaultTheme.colors,
      primary: "#059669",
      primaryDark: "#047857",
      primaryLight: "#10b981",
      primaryLighter: "#34d399",
      secondary: "#059669",
      secondaryLight: "#10b981",
      secondaryLighter: "#34d399",
      accentGreen: "#047857",
      accentGreenDark: "#065f46",
      neutral: {
        50: "#ecfdf5",
        100: "#d1fae5",
        200: "#a7f3d0",
        300: "#6ee7b7",
        400: "#34d399",
        500: "#10b981",
        600: "#059669",
        700: "#047857",
        800: "#065f46",
        900: "#064e3b",
      },
      background: {
        ...defaultTheme.colors.background,
        primary: "#0f1f1c", // Much darker green-tinted
        secondary: "#0f1f1c",
        tertiary: "#0f1f1c",
        dark: "#051411", // Darkest green
        darkAlpha: "rgba(5, 20, 17, 0.85)", // Glass morphism with blur
        darkAlpha50: "rgba(15, 31, 28, 0.5)",
        darkAlpha40: "rgba(15, 31, 28, 0.4)",
        // @ts-ignore - Glass morphism properties
        glass: "rgba(15, 31, 28, 0.75)", // Glass morphism background
        glassLight: "rgba(15, 31, 28, 0.65)",
        glassDark: "rgba(5, 20, 17, 0.85)",
      } as any,
      primaryAlpha: {
        5: "rgba(5, 150, 105, 0.05)",
        6: "rgba(5, 150, 105, 0.06)",
        8: "rgba(5, 150, 105, 0.08)",
        10: "rgba(5, 150, 105, 0.1)",
        12: "rgba(5, 150, 105, 0.12)",
        15: "rgba(5, 150, 105, 0.15)",
        20: "rgba(5, 150, 105, 0.2)",
        30: "rgba(5, 150, 105, 0.3)",
        40: "rgba(5, 150, 105, 0.4)",
      },
      // Update semantic colors to match green theme (but keep error red for visibility)
      semantic: {
        ...defaultTheme.colors.semantic,
        success: "#059669", // Use primary green
        successDark: "#047857",
        successLight: "#10b981",
        successBg: "rgba(5, 150, 105, 0.15)",
        info: "#059669", // Use primary green
        infoDark: "#047857",
        infoLight: "#10b981",
        infoBg: "rgba(5, 150, 105, 0.15)",
      },
    },
    typography: defaultTheme.typography,
    spacing: defaultTheme.spacing,
  },
  purple: {
    id: "purple",
    name: "Royal Purple",
    description: "Elegant purple theme",
    colors: {
      ...defaultTheme.colors,
      primary: "#7c3aed",
      primaryDark: "#6d28d9",
      primaryLight: "#8b5cf6",
      primaryLighter: "#a78bfa",
      secondary: "#7c3aed",
      secondaryLight: "#8b5cf6",
      secondaryLighter: "#a78bfa",
      accentBlue: "#6d28d9",
      accentBlueLight: "#7c3aed",
      accentBlueDark: "#5b21b6",
      neutral: {
        50: "#faf5ff",
        100: "#f3e8ff",
        200: "#e9d5ff",
        300: "#d8b4fe",
        400: "#c084fc",
        500: "#a855f7",
        600: "#9333ea",
        700: "#7e22ce",
        800: "#6b21a8",
        900: "#581c87",
      },
      background: {
        ...defaultTheme.colors.background,
        primary: "#1a0d3d", // Much darker purple
        secondary: "#1a0d3d",
        tertiary: "#1a0d3d",
        dark: "#0d0520", // Darkest purple
        darkAlpha: "rgba(13, 5, 32, 0.85)", // Glass morphism with blur
        darkAlpha50: "rgba(26, 13, 61, 0.5)",
        darkAlpha40: "rgba(26, 13, 61, 0.4)",
        // @ts-ignore - Glass morphism properties
        glass: "rgba(26, 13, 61, 0.75)", // Glass morphism background
        glassLight: "rgba(26, 13, 61, 0.65)",
        glassDark: "rgba(13, 5, 32, 0.85)",
      } as any,
      primaryAlpha: {
        5: "rgba(124, 58, 237, 0.05)",
        6: "rgba(124, 58, 237, 0.06)",
        8: "rgba(124, 58, 237, 0.08)",
        10: "rgba(124, 58, 237, 0.1)",
        12: "rgba(124, 58, 237, 0.12)",
        15: "rgba(124, 58, 237, 0.15)",
        20: "rgba(124, 58, 237, 0.2)",
        30: "rgba(124, 58, 237, 0.3)",
        40: "rgba(124, 58, 237, 0.4)",
      },
      // Update semantic colors to match purple theme (but keep error red for visibility)
      semantic: {
        ...defaultTheme.colors.semantic,
        success: "#10b981", // Keep green for success (accessibility)
        info: "#7c3aed", // Use primary purple
        infoDark: "#6d28d9",
        infoLight: "#8b5cf6",
        infoBg: "rgba(124, 58, 237, 0.15)",
      },
    },
    typography: defaultTheme.typography,
    spacing: defaultTheme.spacing,
  },

  // ============================================
  // ADDITIONAL DARK THEMES
  // ============================================

  "dark-gray": {
    id: "dark-gray",
    name: "Dark Gray",
    description: "Modern dark gray theme",
    colors: {
      ...defaultTheme.colors,
      primary: "#6366f1",
      primaryDark: "#4f46e5",
      primaryLight: "#818cf8",
      primaryLighter: "#a5b4fc",
      secondary: "#6366f1",
      secondaryLight: "#818cf8",
      secondaryLighter: "#a5b4fc",
      background: {
        ...defaultTheme.colors.background,
        primary: "#1f2937",
        secondary: "#1f2937",
        tertiary: "#1f2937",
        dark: "#111827",
        darkAlpha: "rgba(17, 24, 39, 0.95)",
        darkAlpha50: "rgba(31, 41, 55, 0.5)",
        darkAlpha40: "rgba(31, 41, 55, 0.4)",
        glass: "rgba(31, 41, 55, 0.75)",
        glassLight: "rgba(31, 41, 55, 0.65)",
        glassDark: "rgba(17, 24, 39, 0.85)",
      } as any,
      primaryAlpha: {
        5: "rgba(99, 102, 241, 0.05)",
        6: "rgba(99, 102, 241, 0.06)",
        8: "rgba(99, 102, 241, 0.08)",
        10: "rgba(99, 102, 241, 0.1)",
        12: "rgba(99, 102, 241, 0.12)",
        15: "rgba(99, 102, 241, 0.15)",
        20: "rgba(99, 102, 241, 0.2)",
        30: "rgba(99, 102, 241, 0.3)",
        40: "rgba(99, 102, 241, 0.4)",
      },
    },
    typography: defaultTheme.typography,
    spacing: defaultTheme.spacing,
  },

  "midnight-blue": {
    id: "midnight-blue",
    name: "Midnight Blue",
    description: "Deep midnight blue theme",
    colors: {
      ...defaultTheme.colors,
      primary: "#3b82f6",
      primaryDark: "#2563eb",
      primaryLight: "#60a5fa",
      primaryLighter: "#93c5fd",
      secondary: "#3b82f6",
      secondaryLight: "#60a5fa",
      secondaryLighter: "#93c5fd",
      background: {
        ...defaultTheme.colors.background,
        primary: "#0c1222",
        secondary: "#0c1222",
        tertiary: "#0c1222",
        dark: "#040810",
        darkAlpha: "rgba(4, 8, 16, 0.95)",
        darkAlpha50: "rgba(12, 18, 34, 0.5)",
        darkAlpha40: "rgba(12, 18, 34, 0.4)",
        glass: "rgba(12, 18, 34, 0.75)",
        glassLight: "rgba(12, 18, 34, 0.65)",
        glassDark: "rgba(4, 8, 16, 0.85)",
      } as any,
      primaryAlpha: {
        5: "rgba(59, 130, 246, 0.05)",
        6: "rgba(59, 130, 246, 0.06)",
        8: "rgba(59, 130, 246, 0.08)",
        10: "rgba(59, 130, 246, 0.1)",
        12: "rgba(59, 130, 246, 0.12)",
        15: "rgba(59, 130, 246, 0.15)",
        20: "rgba(59, 130, 246, 0.2)",
        30: "rgba(59, 130, 246, 0.3)",
        40: "rgba(59, 130, 246, 0.4)",
      },
    },
    typography: defaultTheme.typography,
    spacing: defaultTheme.spacing,
  },

  "deep-green": {
    id: "deep-green",
    name: "Deep Forest",
    description: "Deep forest green theme",
    colors: {
      ...defaultTheme.colors,
      primary: "#10b981",
      primaryDark: "#059669",
      primaryLight: "#34d399",
      primaryLighter: "#6ee7b7",
      secondary: "#10b981",
      secondaryLight: "#34d399",
      secondaryLighter: "#6ee7b7",
      background: {
        ...defaultTheme.colors.background,
        primary: "#0a1f18",
        secondary: "#0a1f18",
        tertiary: "#0a1f18",
        dark: "#051411",
        darkAlpha: "rgba(5, 20, 17, 0.95)",
        darkAlpha50: "rgba(10, 31, 24, 0.5)",
        darkAlpha40: "rgba(10, 31, 24, 0.4)",
        glass: "rgba(10, 31, 24, 0.75)",
        glassLight: "rgba(10, 31, 24, 0.65)",
        glassDark: "rgba(5, 20, 17, 0.85)",
      } as any,
      primaryAlpha: {
        5: "rgba(16, 185, 129, 0.05)",
        6: "rgba(16, 185, 129, 0.06)",
        8: "rgba(16, 185, 129, 0.08)",
        10: "rgba(16, 185, 129, 0.1)",
        12: "rgba(16, 185, 129, 0.12)",
        15: "rgba(16, 185, 129, 0.15)",
        20: "rgba(16, 185, 129, 0.2)",
        30: "rgba(16, 185, 129, 0.3)",
        40: "rgba(16, 185, 129, 0.4)",
      },
    },
    typography: defaultTheme.typography,
    spacing: defaultTheme.spacing,
  },

  charcoal: {
    id: "charcoal",
    name: "Charcoal",
    description: "Rich charcoal dark theme",
    colors: {
      ...defaultTheme.colors,
      primary: "#f59e0b",
      primaryDark: "#d97706",
      primaryLight: "#fbbf24",
      primaryLighter: "#fcd34d",
      secondary: "#f59e0b",
      secondaryLight: "#fbbf24",
      secondaryLighter: "#fcd34d",
      background: {
        ...defaultTheme.colors.background,
        primary: "#1a1a1a",
        secondary: "#1a1a1a",
        tertiary: "#1a1a1a",
        dark: "#0f0f0f",
        darkAlpha: "rgba(15, 15, 15, 0.95)",
        darkAlpha50: "rgba(26, 26, 26, 0.5)",
        darkAlpha40: "rgba(26, 26, 26, 0.4)",
        glass: "rgba(26, 26, 26, 0.75)",
        glassLight: "rgba(26, 26, 26, 0.65)",
        glassDark: "rgba(15, 15, 15, 0.85)",
      } as any,
      primaryAlpha: {
        5: "rgba(245, 158, 11, 0.05)",
        6: "rgba(245, 158, 11, 0.06)",
        8: "rgba(245, 158, 11, 0.08)",
        10: "rgba(245, 158, 11, 0.1)",
        12: "rgba(245, 158, 11, 0.12)",
        15: "rgba(245, 158, 11, 0.15)",
        20: "rgba(245, 158, 11, 0.2)",
        30: "rgba(245, 158, 11, 0.3)",
        40: "rgba(245, 158, 11, 0.4)",
      },
    },
    typography: defaultTheme.typography,
    spacing: defaultTheme.spacing,
  },

  // ============================================
  // MEDIUM THEMES (Balanced contrast)
  // ============================================

  "medium-blue": {
    id: "medium-blue",
    name: "Medium Blue",
    description: "Balanced medium blue theme",
    colors: {
      ...defaultTheme.colors,
      primary: "#2563eb",
      primaryDark: "#1d4ed8",
      primaryLight: "#3b82f6",
      primaryLighter: "#60a5fa",
      secondary: "#2563eb",
      secondaryLight: "#3b82f6",
      secondaryLighter: "#60a5fa",
      text: {
        ...defaultTheme.colors.text,
        primary: "#1e293b",
        secondary: "#334155",
        tertiary: "#475569",
        inverse: "#ffffff",
        inverseSecondary: "rgba(255, 255, 255, 0.9)",
        inverseTertiary: "rgba(255, 255, 255, 0.7)",
        dark: "#0f172a",
      },
      background: {
        ...defaultTheme.colors.background,
        primary: "#e0e7ff",
        secondary: "#c7d2fe",
        tertiary: "#a5b4fc",
        dark: "#6366f1",
        darkAlpha: "rgba(99, 102, 241, 0.9)",
        darkAlpha50: "rgba(99, 102, 241, 0.5)",
        darkAlpha40: "rgba(99, 102, 241, 0.4)",
        glass: "rgba(224, 231, 255, 0.8)",
        glassLight: "rgba(199, 210, 254, 0.7)",
        glassDark: "rgba(165, 180, 252, 0.85)",
      } as any,
      primaryAlpha: {
        5: "rgba(37, 99, 235, 0.05)",
        6: "rgba(37, 99, 235, 0.06)",
        8: "rgba(37, 99, 235, 0.08)",
        10: "rgba(37, 99, 235, 0.1)",
        12: "rgba(37, 99, 235, 0.12)",
        15: "rgba(37, 99, 235, 0.15)",
        20: "rgba(37, 99, 235, 0.2)",
        30: "rgba(37, 99, 235, 0.3)",
        40: "rgba(37, 99, 235, 0.4)",
      },
    },
    typography: defaultTheme.typography,
    spacing: defaultTheme.spacing,
  },

  "medium-green": {
    id: "medium-green",
    name: "Medium Green",
    description: "Balanced medium green theme",
    colors: {
      ...defaultTheme.colors,
      primary: "#059669",
      primaryDark: "#047857",
      primaryLight: "#10b981",
      primaryLighter: "#34d399",
      secondary: "#059669",
      secondaryLight: "#10b981",
      secondaryLighter: "#34d399",
      text: {
        ...defaultTheme.colors.text,
        primary: "#064e3b",
        secondary: "#065f46",
        tertiary: "#047857",
        inverse: "#ffffff",
        inverseSecondary: "rgba(255, 255, 255, 0.9)",
        inverseTertiary: "rgba(255, 255, 255, 0.7)",
        dark: "#022c22",
      },
      background: {
        ...defaultTheme.colors.background,
        primary: "#d1fae5",
        secondary: "#a7f3d0",
        tertiary: "#6ee7b7",
        dark: "#059669",
        darkAlpha: "rgba(5, 150, 105, 0.9)",
        darkAlpha50: "rgba(5, 150, 105, 0.5)",
        darkAlpha40: "rgba(5, 150, 105, 0.4)",
        glass: "rgba(209, 250, 229, 0.8)",
        glassLight: "rgba(167, 243, 208, 0.7)",
        glassDark: "rgba(110, 231, 183, 0.85)",
      } as any,
      primaryAlpha: {
        5: "rgba(5, 150, 105, 0.05)",
        6: "rgba(5, 150, 105, 0.06)",
        8: "rgba(5, 150, 105, 0.08)",
        10: "rgba(5, 150, 105, 0.1)",
        12: "rgba(5, 150, 105, 0.12)",
        15: "rgba(5, 150, 105, 0.15)",
        20: "rgba(5, 150, 105, 0.2)",
        30: "rgba(5, 150, 105, 0.3)",
        40: "rgba(5, 150, 105, 0.4)",
      },
    },
    typography: defaultTheme.typography,
    spacing: defaultTheme.spacing,
  },

  "medium-purple": {
    id: "medium-purple",
    name: "Medium Purple",
    description: "Balanced medium purple theme",
    colors: {
      ...defaultTheme.colors,
      primary: "#7c3aed",
      primaryDark: "#6d28d9",
      primaryLight: "#8b5cf6",
      primaryLighter: "#a78bfa",
      secondary: "#7c3aed",
      secondaryLight: "#8b5cf6",
      secondaryLighter: "#a78bfa",
      text: {
        ...defaultTheme.colors.text,
        primary: "#4c1d95",
        secondary: "#5b21b6",
        tertiary: "#6d28d9",
        inverse: "#ffffff",
        inverseSecondary: "rgba(255, 255, 255, 0.9)",
        inverseTertiary: "rgba(255, 255, 255, 0.7)",
        dark: "#3b0764",
      },
      background: {
        ...defaultTheme.colors.background,
        primary: "#ede9fe",
        secondary: "#ddd6fe",
        tertiary: "#c4b5fd",
        dark: "#7c3aed",
        darkAlpha: "rgba(124, 58, 237, 0.9)",
        darkAlpha50: "rgba(124, 58, 237, 0.5)",
        darkAlpha40: "rgba(124, 58, 237, 0.4)",
        glass: "rgba(237, 233, 254, 0.8)",
        glassLight: "rgba(221, 214, 254, 0.7)",
        glassDark: "rgba(196, 181, 253, 0.85)",
      } as any,
      primaryAlpha: {
        5: "rgba(124, 58, 237, 0.05)",
        6: "rgba(124, 58, 237, 0.06)",
        8: "rgba(124, 58, 237, 0.08)",
        10: "rgba(124, 58, 237, 0.1)",
        12: "rgba(124, 58, 237, 0.12)",
        15: "rgba(124, 58, 237, 0.15)",
        20: "rgba(124, 58, 237, 0.2)",
        30: "rgba(124, 58, 237, 0.3)",
        40: "rgba(124, 58, 237, 0.4)",
      },
    },
    typography: defaultTheme.typography,
    spacing: defaultTheme.spacing,
  },

  "medium-gray": {
    id: "medium-gray",
    name: "Medium Gray",
    description: "Neutral medium gray theme",
    colors: {
      ...defaultTheme.colors,
      primary: "#6366f1",
      primaryDark: "#4f46e5",
      primaryLight: "#818cf8",
      primaryLighter: "#a5b4fc",
      secondary: "#6366f1",
      secondaryLight: "#818cf8",
      secondaryLighter: "#a5b4fc",
      text: {
        ...defaultTheme.colors.text,
        primary: "#1e293b",
        secondary: "#334155",
        tertiary: "#475569",
        inverse: "#ffffff",
        inverseSecondary: "rgba(255, 255, 255, 0.9)",
        inverseTertiary: "rgba(255, 255, 255, 0.7)",
        dark: "#0f172a",
      },
      background: {
        ...defaultTheme.colors.background,
        primary: "#e2e8f0",
        secondary: "#cbd5e1",
        tertiary: "#94a3b8",
        dark: "#475569",
        darkAlpha: "rgba(71, 85, 105, 0.9)",
        darkAlpha50: "rgba(71, 85, 105, 0.5)",
        darkAlpha40: "rgba(71, 85, 105, 0.4)",
        glass: "rgba(226, 232, 240, 0.8)",
        glassLight: "rgba(203, 213, 225, 0.7)",
        glassDark: "rgba(148, 163, 184, 0.85)",
      } as any,
      primaryAlpha: {
        5: "rgba(99, 102, 241, 0.05)",
        6: "rgba(99, 102, 241, 0.06)",
        8: "rgba(99, 102, 241, 0.08)",
        10: "rgba(99, 102, 241, 0.1)",
        12: "rgba(99, 102, 241, 0.12)",
        15: "rgba(99, 102, 241, 0.15)",
        20: "rgba(99, 102, 241, 0.2)",
        30: "rgba(99, 102, 241, 0.3)",
        40: "rgba(99, 102, 241, 0.4)",
      },
    },
    typography: defaultTheme.typography,
    spacing: defaultTheme.spacing,
  },

  "warm-beige": {
    id: "warm-beige",
    name: "Warm Beige",
    description: "Cozy warm beige theme",
    colors: {
      ...defaultTheme.colors,
      primary: "#a16207",
      primaryDark: "#854d0e",
      primaryLight: "#ca8a04",
      primaryLighter: "#eab308",
      secondary: "#a16207",
      secondaryLight: "#ca8a04",
      secondaryLighter: "#eab308",
      text: {
        ...defaultTheme.colors.text,
        primary: "#422006",
        secondary: "#713f12",
        tertiary: "#854d0e",
        inverse: "#ffffff",
        inverseSecondary: "rgba(255, 255, 255, 0.9)",
        inverseTertiary: "rgba(255, 255, 255, 0.7)",
        dark: "#292524",
      },
      background: {
        ...defaultTheme.colors.background,
        primary: "#fef3c7",
        secondary: "#fde68a",
        tertiary: "#fcd34d",
        dark: "#d97706",
        darkAlpha: "rgba(217, 119, 6, 0.9)",
        darkAlpha50: "rgba(217, 119, 6, 0.5)",
        darkAlpha40: "rgba(217, 119, 6, 0.4)",
        glass: "rgba(254, 243, 199, 0.8)",
        glassLight: "rgba(253, 230, 138, 0.7)",
        glassDark: "rgba(252, 211, 77, 0.85)",
      } as any,
      primaryAlpha: {
        5: "rgba(161, 98, 7, 0.05)",
        6: "rgba(161, 98, 7, 0.06)",
        8: "rgba(161, 98, 7, 0.08)",
        10: "rgba(161, 98, 7, 0.1)",
        12: "rgba(161, 98, 7, 0.12)",
        15: "rgba(161, 98, 7, 0.15)",
        20: "rgba(161, 98, 7, 0.2)",
        30: "rgba(161, 98, 7, 0.3)",
        40: "rgba(161, 98, 7, 0.4)",
      },
    },
    typography: defaultTheme.typography,
    spacing: defaultTheme.spacing,
  },

  // ============================================
  // LIGHT THEMES (Light backgrounds, dark text)
  // ============================================

  "light-blue": {
    id: "light-blue",
    name: "Light Blue",
    description: "Fresh light blue theme",
    colors: {
      ...defaultTheme.colors,
      primary: "#2563eb",
      primaryDark: "#1e40af",
      primaryLight: "#3b82f6",
      primaryLighter: "#60a5fa",
      secondary: "#2563eb",
      secondaryLight: "#3b82f6",
      secondaryLighter: "#60a5fa",
      text: {
        ...defaultTheme.colors.text,
        primary: "#0f172a",
        secondary: "#1e293b",
        tertiary: "#334155",
        inverse: "#ffffff",
        inverseSecondary: "rgba(255, 255, 255, 0.9)",
        inverseTertiary: "rgba(255, 255, 255, 0.7)",
        dark: "#020617",
      },
      background: {
        ...defaultTheme.colors.background,
        primary: "#f8fafc",
        secondary: "#f1f5f9",
        tertiary: "#e2e8f0",
        dark: "#2563eb",
        darkAlpha: "rgba(37, 99, 235, 0.95)",
        darkAlpha50: "rgba(37, 99, 235, 0.5)",
        darkAlpha40: "rgba(37, 99, 235, 0.4)",
        glass: "rgba(248, 250, 252, 0.9)",
        glassLight: "rgba(241, 245, 249, 0.85)",
        glassDark: "rgba(226, 232, 240, 0.95)",
      } as any,
      primaryAlpha: {
        5: "rgba(37, 99, 235, 0.05)",
        6: "rgba(37, 99, 235, 0.06)",
        8: "rgba(37, 99, 235, 0.08)",
        10: "rgba(37, 99, 235, 0.1)",
        12: "rgba(37, 99, 235, 0.12)",
        15: "rgba(37, 99, 235, 0.15)",
        20: "rgba(37, 99, 235, 0.2)",
        30: "rgba(37, 99, 235, 0.3)",
        40: "rgba(37, 99, 235, 0.4)",
      },
    },
    typography: defaultTheme.typography,
    spacing: defaultTheme.spacing,
  },

  "light-green": {
    id: "light-green",
    name: "Light Green",
    description: "Natural light green theme",
    colors: {
      ...defaultTheme.colors,
      primary: "#059669",
      primaryDark: "#047857",
      primaryLight: "#10b981",
      primaryLighter: "#34d399",
      secondary: "#059669",
      secondaryLight: "#10b981",
      secondaryLighter: "#34d399",
      text: {
        ...defaultTheme.colors.text,
        primary: "#022c22",
        secondary: "#064e3b",
        tertiary: "#065f46",
        inverse: "#ffffff",
        inverseSecondary: "rgba(255, 255, 255, 0.9)",
        inverseTertiary: "rgba(255, 255, 255, 0.7)",
        dark: "#051411",
      },
      background: {
        ...defaultTheme.colors.background,
        primary: "#f0fdf4",
        secondary: "#dcfce7",
        tertiary: "#bbf7d0",
        dark: "#059669",
        darkAlpha: "rgba(5, 150, 105, 0.95)",
        darkAlpha50: "rgba(5, 150, 105, 0.5)",
        darkAlpha40: "rgba(5, 150, 105, 0.4)",
        glass: "rgba(240, 253, 244, 0.9)",
        glassLight: "rgba(220, 252, 231, 0.85)",
        glassDark: "rgba(187, 247, 208, 0.95)",
      } as any,
      primaryAlpha: {
        5: "rgba(5, 150, 105, 0.05)",
        6: "rgba(5, 150, 105, 0.06)",
        8: "rgba(5, 150, 105, 0.08)",
        10: "rgba(5, 150, 105, 0.1)",
        12: "rgba(5, 150, 105, 0.12)",
        15: "rgba(5, 150, 105, 0.15)",
        20: "rgba(5, 150, 105, 0.2)",
        30: "rgba(5, 150, 105, 0.3)",
        40: "rgba(5, 150, 105, 0.4)",
      },
    },
    typography: defaultTheme.typography,
    spacing: defaultTheme.spacing,
  },

  "light-purple": {
    id: "light-purple",
    name: "Light Purple",
    description: "Soft light purple theme",
    colors: {
      ...defaultTheme.colors,
      primary: "#7c3aed",
      primaryDark: "#6d28d9",
      primaryLight: "#8b5cf6",
      primaryLighter: "#a78bfa",
      secondary: "#7c3aed",
      secondaryLight: "#8b5cf6",
      secondaryLighter: "#a78bfa",
      text: {
        ...defaultTheme.colors.text,
        primary: "#3b0764",
        secondary: "#4c1d95",
        tertiary: "#5b21b6",
        inverse: "#ffffff",
        inverseSecondary: "rgba(255, 255, 255, 0.9)",
        inverseTertiary: "rgba(255, 255, 255, 0.7)",
        dark: "#1e1b4b",
      },
      background: {
        ...defaultTheme.colors.background,
        primary: "#faf5ff",
        secondary: "#f3e8ff",
        tertiary: "#e9d5ff",
        dark: "#7c3aed",
        darkAlpha: "rgba(124, 58, 237, 0.95)",
        darkAlpha50: "rgba(124, 58, 237, 0.5)",
        darkAlpha40: "rgba(124, 58, 237, 0.4)",
        glass: "rgba(250, 245, 255, 0.9)",
        glassLight: "rgba(243, 232, 255, 0.85)",
        glassDark: "rgba(233, 213, 255, 0.95)",
      } as any,
      primaryAlpha: {
        5: "rgba(124, 58, 237, 0.05)",
        6: "rgba(124, 58, 237, 0.06)",
        8: "rgba(124, 58, 237, 0.08)",
        10: "rgba(124, 58, 237, 0.1)",
        12: "rgba(124, 58, 237, 0.12)",
        15: "rgba(124, 58, 237, 0.15)",
        20: "rgba(124, 58, 237, 0.2)",
        30: "rgba(124, 58, 237, 0.3)",
        40: "rgba(124, 58, 237, 0.4)",
      },
    },
    typography: defaultTheme.typography,
    spacing: defaultTheme.spacing,
  },

  "light-brown": {
    id: "light-brown",
    name: "Light Brown",
    description: "Warm light brown theme",
    colors: {
      ...defaultTheme.colors,
      primary: "#8c6f48",
      primaryDark: "#6d5637",
      primaryLight: "#a5896a",
      primaryLighter: "#bea38c",
      secondary: "#8c6f48",
      secondaryLight: "#a5896a",
      secondaryLighter: "#bea38c",
      text: {
        ...defaultTheme.colors.text,
        primary: "#292524",
        secondary: "#44403c",
        tertiary: "#57534e",
        inverse: "#ffffff",
        inverseSecondary: "rgba(255, 255, 255, 0.9)",
        inverseTertiary: "rgba(255, 255, 255, 0.7)",
        dark: "#1c1917",
      },
      background: {
        ...defaultTheme.colors.background,
        primary: "#fafaf9",
        secondary: "#f5f5f4",
        tertiary: "#e7e5e4",
        dark: "#8c6f48",
        darkAlpha: "rgba(140, 111, 72, 0.95)",
        darkAlpha50: "rgba(140, 111, 72, 0.5)",
        darkAlpha40: "rgba(140, 111, 72, 0.4)",
        glass: "rgba(250, 250, 249, 0.9)",
        glassLight: "rgba(245, 245, 244, 0.85)",
        glassDark: "rgba(231, 229, 228, 0.95)",
      } as any,
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
    },
    typography: defaultTheme.typography,
    spacing: defaultTheme.spacing,
  },

  "light-gray": {
    id: "light-gray",
    name: "Light Gray",
    description: "Clean light gray theme",
    colors: {
      ...defaultTheme.colors,
      primary: "#6366f1",
      primaryDark: "#4f46e5",
      primaryLight: "#818cf8",
      primaryLighter: "#a5b4fc",
      secondary: "#6366f1",
      secondaryLight: "#818cf8",
      secondaryLighter: "#a5b4fc",
      text: {
        ...defaultTheme.colors.text,
        primary: "#0f172a",
        secondary: "#1e293b",
        tertiary: "#334155",
        inverse: "#ffffff",
        inverseSecondary: "rgba(255, 255, 255, 0.9)",
        inverseTertiary: "rgba(255, 255, 255, 0.7)",
        dark: "#020617",
      },
      background: {
        ...defaultTheme.colors.background,
        primary: "#ffffff",
        secondary: "#f8fafc",
        tertiary: "#f1f5f9",
        dark: "#475569",
        darkAlpha: "rgba(71, 85, 105, 0.95)",
        darkAlpha50: "rgba(71, 85, 105, 0.5)",
        darkAlpha40: "rgba(71, 85, 105, 0.4)",
        glass: "rgba(255, 255, 255, 0.95)",
        glassLight: "rgba(248, 250, 252, 0.9)",
        glassDark: "rgba(241, 245, 249, 0.98)",
      } as any,
      primaryAlpha: {
        5: "rgba(99, 102, 241, 0.05)",
        6: "rgba(99, 102, 241, 0.06)",
        8: "rgba(99, 102, 241, 0.08)",
        10: "rgba(99, 102, 241, 0.1)",
        12: "rgba(99, 102, 241, 0.12)",
        15: "rgba(99, 102, 241, 0.15)",
        20: "rgba(99, 102, 241, 0.2)",
        30: "rgba(99, 102, 241, 0.3)",
        40: "rgba(99, 102, 241, 0.4)",
      },
    },
    typography: defaultTheme.typography,
    spacing: defaultTheme.spacing,
  },
};

/**
 * Theme Context Type
 */
export type ThemeContextType = {
  currentTheme: ThemeDefinition;
  themeId: ThemeId;
  availableThemes: ThemeDefinition[];
  setTheme: (themeId: ThemeId) => void;
  // Helper to get full theme object with all properties
  getFullTheme: () => Theme;
};

/**
 * Theme Context
 */
export const ThemeContext = React.createContext<ThemeContextType | undefined>(
  undefined
);

/**
 * Storage key for persisting theme preference
 */
const THEME_STORAGE_KEY = "flushjohn-theme";

/**
 * Get initial theme from storage or default
 */
const getInitialTheme = (): ThemeId => {
  if (typeof window === "undefined") return "default";

  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored && stored in themes) {
      return stored as ThemeId;
    }
  } catch (e) {
    console.warn("Failed to read theme from localStorage", e);
  }

  return "default";
};

/**
 * Apply theme colors to CSS variables on the document root
 * Performance optimized: CSS variables update instantly without re-renders
 */
const applyThemeToCSS = (themeDefinition: ThemeDefinition) => {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  const colors = themeDefinition.colors;

  // Helper to set CSS variable (direct DOM manipulation - very fast)
  const setVar = (key: string, value: string) => {
    root.style.setProperty(key, value);
  };

  // Manually apply ALL CSS variables with correct names
  // This ensures we set exactly the variables that components use
  // (No recursive function to avoid variable name mismatches)
  
  // Primary colors
  setVar("--primary", colors.primary);
  setVar("--primary-dark", colors.primaryDark);
  setVar("--primary-light", colors.primaryLight);
  setVar("--primary-lighter", colors.primaryLighter);
  
  // Secondary colors
  setVar("--secondary", colors.secondary);
  setVar("--secondary-light", colors.secondaryLight);
  setVar("--secondary-lighter", colors.secondaryLighter);
  
  // Accent colors
  setVar("--accent-blue", colors.accentBlue || colors.primaryDark);
  setVar("--accent-blue-light", colors.accentBlueLight || colors.primary);
  setVar("--accent-blue-dark", colors.accentBlueDark || colors.primaryDark);
  setVar("--accent-green", colors.accentGreen || colors.primaryDark);
  setVar("--accent-green-dark", colors.accentGreenDark || colors.primaryDark);
  setVar("--accent-gold", colors.accentGold || colors.primaryLight);
  
  // Text colors
  setVar("--text-primary", colors.text.primary);
  setVar("--text-secondary", colors.text.secondary);
  setVar("--text-tertiary", colors.text.tertiary);
  setVar("--text-inverse", colors.text.inverse);
  setVar("--text-inverse-secondary", colors.text.inverseSecondary);
  setVar("--text-inverse-tertiary", colors.text.inverseTertiary);
  setVar("--text-dark", colors.text.dark);
  
  // Background colors (all variants)
  setVar("--bg-primary", colors.background.primary);
  setVar("--bg-secondary", colors.background.secondary);
  setVar("--bg-tertiary", colors.background.tertiary);
  setVar("--bg-dark", colors.background.dark);
  setVar("--bg-dark-alpha", colors.background.darkAlpha);
  setVar("--bg-dark-alpha-50", colors.background.darkAlpha50);
  setVar("--bg-dark-alpha-40", colors.background.darkAlpha40);
  setVar("--bg-transparent", colors.background.transparent);
  
  // Apply glass morphism backgrounds if available
  const bg = colors.background as any;
  if (bg.glass) {
    setVar("--bg-glass", bg.glass);
  }
  if (bg.glassLight) {
    setVar("--bg-glass-light", bg.glassLight);
  }
  if (bg.glassDark) {
    setVar("--bg-glass-dark", bg.glassDark);
  }

  // Apply semantic colors (with dark/light variants)
  setVar("--success", colors.semantic.success);
  setVar("--success-dark", colors.semantic.successDark);
  setVar("--success-light", colors.semantic.successLight);
  setVar("--success-bg", colors.semantic.successBg);
  setVar("--error", colors.semantic.error);
  setVar("--error-dark", colors.semantic.errorDark);
  setVar("--error-light", colors.semantic.errorLight);
  setVar("--error-red", colors.semantic.errorRed);
  setVar("--error-red-alpha-90", colors.semantic.errorRedAlpha90);
  setVar("--error-border", colors.semantic.errorBorder);
  setVar("--error-bg", colors.semantic.errorBg);
  setVar("--warning", colors.semantic.warning);
  setVar("--warning-dark", colors.semantic.warningDark);
  setVar("--warning-light", colors.semantic.warningLight);
  setVar("--warning-bg", colors.semantic.warningBg);
  setVar("--info", colors.semantic.info);
  setVar("--info-dark", colors.semantic.infoDark);
  setVar("--info-light", colors.semantic.infoLight);
  setVar("--info-bg", colors.semantic.infoBg);

  // Apply neutral colors (used in many components)
  if (colors.neutral) {
    Object.entries(colors.neutral).forEach(([key, value]) => {
      setVar(`--neutral-${key}`, String(value));
    });
  }
  
  // Apply border colors
  if (colors.border) {
    setVar("--border-light", colors.border.light);
    setVar("--border-lighter", colors.border.lighter);
    setVar("--border-checkbox", colors.border.checkbox);
    setVar("--border-default", colors.border.default);
  }
  
  // Apply alpha variants
  if (colors.primaryAlpha) {
    Object.entries(colors.primaryAlpha).forEach(([key, value]) => {
      setVar(`--primary-alpha-${key}`, String(value));
    });
  }

  if (colors.whiteAlpha) {
    Object.entries(colors.whiteAlpha).forEach(([key, value]) => {
      setVar(`--white-alpha-${key}`, String(value));
    });
  }

  if (colors.blackAlpha) {
    Object.entries(colors.blackAlpha).forEach(([key, value]) => {
      setVar(`--black-alpha-${key}`, String(value));
    });
  }

  // Apply hero, callout, phoneBar, phoneButton, checkButton colors
  if (colors.hero) {
    Object.entries(colors.hero).forEach(([key, value]) => {
      const kebabKey = key.replace(
        /[A-Z]/g,
        (letter) => `-${letter.toLowerCase()}`
      );
      setVar(`--hero-${kebabKey}`, value);
    });
  }

  if (colors.callout) {
    setVar("--callout-gradient-start", colors.callout.gradientStart);
    setVar("--callout-gradient-end", colors.callout.gradientEnd);
  }

  if (colors.phoneBar) {
    setVar("--phone-bar-background-start", colors.phoneBar.backgroundStart);
    setVar("--phone-bar-background-end", colors.phoneBar.backgroundEnd);
  }

  if (colors.phoneButton) {
    Object.entries(colors.phoneButton).forEach(([key, value]) => {
      const kebabKey = key.replace(
        /[A-Z]/g,
        (letter) => `-${letter.toLowerCase()}`
      );
      setVar(`--phone-button-${kebabKey}`, value);
    });
  }

  if (colors.checkButton) {
    Object.entries(colors.checkButton).forEach(([key, value]) => {
      const kebabKey = key.replace(
        /[A-Z]/g,
        (letter) => `-${letter.toLowerCase()}`
      );
      setVar(`--check-button-${kebabKey}`, value);
    });
  }
};

/**
 * Theme Context Provider
 * Manages theme state and applies themes dynamically
 *
 * @example
 * ```tsx
 * <ThemeContextProvider>
 *   <App />
 * </ThemeContextProvider>
 * ```
 */
export const ThemeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [themeId, setThemeIdState] = useState<ThemeId>(() => getInitialTheme());
  const [isClient, setIsClient] = useState(false);

  // Mark as client-side rendered
  useEffect(() => {
    setIsClient(true);
    // Apply initial theme on mount
    applyThemeToCSS(themes[themeId]);
  }, []);

  // Apply theme whenever themeId changes
  useEffect(() => {
    if (isClient) {
      applyThemeToCSS(themes[themeId]);
      
      // Debug: Verify CSS variables were set (can be removed in production)
      if (process.env.NODE_ENV === 'development') {
        const root = document.documentElement;
        const computedPrimary = getComputedStyle(root).getPropertyValue('--primary').trim();
        const computedBgPrimary = getComputedStyle(root).getPropertyValue('--bg-primary').trim();
        console.log(`✅ Theme "${themeId}" applied:`, {
          '--primary': computedPrimary || 'NOT SET',
          '--bg-primary': computedBgPrimary || 'NOT SET',
        });
      }
      
      // Persist to localStorage
      try {
        window.localStorage.setItem(THEME_STORAGE_KEY, themeId);
      } catch (e) {
        console.warn("Failed to save theme to localStorage", e);
      }
    }
  }, [themeId, isClient]);

  // Set theme function
  const setTheme = useCallback((newThemeId: ThemeId) => {
    if (newThemeId in themes) {
      setThemeIdState(newThemeId);
    } else {
      console.warn(
        `Theme "${newThemeId}" not found. Available themes:`,
        Object.keys(themes)
      );
    }
  }, []);

  // Get full theme object
  const getFullTheme = useCallback((): Theme => {
    const currentThemeDef = themes[themeId];
    return {
      ...defaultTheme,
      colors: currentThemeDef.colors as any, // Type assertion needed because theme allows different color values
      typography: currentThemeDef.typography || defaultTheme.typography,
      spacing: currentThemeDef.spacing || defaultTheme.spacing,
    } as Theme;
  }, [themeId]);

  // Memoize availableThemes to prevent recalculation on every render
  const availableThemesList = useMemo(() => Object.values(themes), []);

  // Memoize context value to prevent unnecessary re-renders
  // Only recreate when themeId changes
  const value: ThemeContextType = useMemo(
    () => ({
      currentTheme: themes[themeId],
      themeId,
      availableThemes: availableThemesList,
      setTheme,
      getFullTheme,
    }),
    [themeId, setTheme, getFullTheme, availableThemesList]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

/**
 * Hook to access theme from context
 * Throws error if used outside ThemeContextProvider
 *
 * @returns Theme context object with current theme and setTheme function
 *
 * @example
 * ```tsx
 * const { currentTheme, themeId, setTheme, availableThemes } = useThemeContext();
 *
 * // Switch theme
 * setTheme('blue');
 *
 * // Use current theme colors
 * <div style={{ color: currentTheme.colors.primary }}>
 * ```
 */
export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useThemeContext must be used within a ThemeContextProvider"
    );
  }

  return context;
};

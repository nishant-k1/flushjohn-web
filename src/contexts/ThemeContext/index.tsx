"use client";

import React, { useContext } from "react";
import { theme, type Theme } from "@/constants/theme";

/**
 * Theme Context Type
 */
export type ThemeContextType = Theme;

/**
 * Theme Context
 * Provides access to the theme object throughout the component tree
 */
export const ThemeContext = React.createContext<ThemeContextType | undefined>(
  undefined
);

/**
 * Theme Context Provider
 * Wraps the app and provides theme access via context
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
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

/**
 * Hook to access theme from context
 * Throws error if used outside ThemeContextProvider
 * 
 * @returns Theme object
 * 
 * @example
 * ```tsx
 * const theme = useThemeContext();
 * <div style={{ color: theme.colors.primary }}>
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

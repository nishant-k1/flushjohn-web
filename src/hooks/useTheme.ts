import { useMemo } from "react";
import { theme, type Theme, type ThemeColors } from "@/constants/theme";
import { useThemeContext } from "@/contexts/ThemeContext";

/**
 * Hook to access theme values in React components
 * 
 * Provides easy access to all theme colors, spacing, typography, and design tokens.
 * Automatically uses the current active theme from ThemeContext if available,
 * otherwise falls back to the default theme.
 * 
 * @returns Complete theme object with helper functions
 * 
 * @example
 * ```tsx
 * const theme = useTheme();
 * 
 * // Use in inline styles
 * <div style={{ 
 *   backgroundColor: theme.colors.primary,
 *   padding: theme.spacing.lg 
 * }}>
 * 
 * // Use with helper functions
 * <button style={{ 
 *   backgroundColor: theme.getColor('primary'),
 *   padding: theme.getSpacing('lg')
 * }}>
 * ```
 */
export const useTheme = (): Theme & {
  /**
   * Helper function to get color by path
   * @param path - Color path (e.g., 'primary', 'semantic.success', 'text.primary')
   * @returns Color value or undefined
   */
  getColor: (path: string) => string | undefined;

  /**
   * Helper function to get spacing value
   * @param size - Spacing size (e.g., 'xs', 'sm', 'md', 'lg')
   * @returns Spacing value
   */
  getSpacing: (size: keyof Theme["spacing"]) => string;

  /**
   * Helper function to get CSS variable name
   * @param path - Theme path (e.g., 'primary', 'text-primary')
   * @returns CSS variable name (e.g., '--primary', '--text-primary')
   */
  getCSSVar: (path: string) => string;
} => {
  // Try to use dynamic theme context if available
  let activeTheme: Theme;
  try {
    const themeContext = useThemeContext();
    activeTheme = themeContext.getFullTheme();
  } catch (e) {
    // Fallback to default theme if not within ThemeContextProvider
    activeTheme = theme;
  }

  return useMemo(() => {
    /**
     * Get color by path string
     * Supports nested paths like 'semantic.success' or 'text.primary'
     */
    const getColor = (path: string): string | undefined => {
      const keys = path.split(".");
      let value: any = activeTheme.colors;

      for (const key of keys) {
        if (value && typeof value === "object" && key in value) {
          value = value[key];
        } else {
          return undefined;
        }
      }

      return typeof value === "string" ? value : undefined;
    };

    /**
     * Get spacing value by size
     */
    const getSpacing = (size: keyof Theme["spacing"]): string => {
      return activeTheme.spacing[size] || activeTheme.spacing.md;
    };

    /**
     * Get CSS variable name from theme path
     * Converts camelCase to kebab-case and adds -- prefix
     */
    const getCSSVar = (path: string): string => {
      // Convert camelCase to kebab-case
      const kebabCase = path.replace(
        /[A-Z]/g,
        (letter) => `-${letter.toLowerCase()}`
      );
      return `--${kebabCase}`;
    };

    return {
      ...activeTheme,
      getColor,
      getSpacing,
      getCSSVar,
    };
  }, [activeTheme]);
};

/**
 * Hook to access only theme colors
 * Useful when you only need color values
 * 
 * @returns Theme colors object
 * 
 * @example
 * ```tsx
 * const colors = useThemeColors();
 * 
 * <div style={{ backgroundColor: colors.primary }}>
 * ```
 */
export const useThemeColors = (): ThemeColors => {
  // Use dynamic theme context if available, with safe fallback
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const themeContext = useThemeContext();
    // Type assertion needed because dynamic themes may have different color values
    return themeContext.currentTheme.colors as ThemeColors;
  } catch (e) {
    // Not within ThemeContextProvider, use default theme
    return useMemo(() => theme.colors, []);
  }
};

// Default export
export default useTheme;

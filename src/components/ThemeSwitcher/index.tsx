"use client";

import React from "react";
import { useThemeContext, type ThemeId } from "@/contexts/ThemeContext";
import styles from "./styles.module.css";

/**
 * Theme Switcher Component
 * Allows users to switch between available themes on the fly
 * 
 * @example
 * ```tsx
 * <ThemeSwitcher />
 * ```
 */
export default function ThemeSwitcher() {
  const { currentTheme, themeId, availableThemes, setTheme } = useThemeContext();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleThemeChange = (newThemeId: ThemeId) => {
    setTheme(newThemeId);
    setIsOpen(false);
    
    // Debug: Verify colors changed (development only)
    if (process.env.NODE_ENV === 'development') {
      setTimeout(() => {
        const root = document.documentElement;
        const primary = getComputedStyle(root).getPropertyValue('--primary').trim();
        const bgPrimary = getComputedStyle(root).getPropertyValue('--bg-primary').trim();
        console.log(`🎨 Switched to "${newThemeId}":`, {
          '--primary': primary,
          '--bg-primary': bgPrimary,
        });
      }, 100);
    }
  };

  return (
    <div className={styles.themeSwitcher}>
      <button
        className={styles.trigger}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change theme"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className={styles.icon}>🎨</span>
        <span className={styles.themeName}>{currentTheme.name}</span>
        <span className={styles.arrow}>{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen && (
        <>
          <div
            className={styles.backdrop}
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className={styles.dropdown} role="menu">
            {availableThemes.map((theme) => (
              <button
                key={theme.id}
                className={`${styles.themeOption} ${
                  theme.id === themeId ? styles.active : ""
                }`}
                onClick={() => handleThemeChange(theme.id)}
                role="menuitem"
                aria-checked={theme.id === themeId}
              >
                <span className={styles.themePreview}>
                  <span
                    className={styles.colorDot}
                    style={{ backgroundColor: theme.colors.primary }}
                  />
                </span>
                <div className={styles.themeInfo}>
                  <span className={styles.themeOptionName}>{theme.name}</span>
                  {theme.description && (
                    <span className={styles.themeDescription}>
                      {theme.description}
                    </span>
                  )}
                </div>
                {theme.id === themeId && (
                  <span className={styles.checkmark}>✓</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

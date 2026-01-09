#!/usr/bin/env node

/**
 * Script to sync CSS variables in globals.css with theme.ts
 * This ensures theme.ts is the single source of truth
 * 
 * Usage: node scripts/sync-theme-css.js
 */

const fs = require('fs');
const path = require('path');

// Import theme (we'll need to handle TypeScript - using require with ts-node or converting)
// For now, we'll use a simpler approach - reading and parsing

const themePath = path.join(__dirname, '../src/constants/theme.ts');
const cssPath = path.join(__dirname, '../styles/globals.css');

/**
 * Flatten theme object to CSS variable format
 */
function flattenThemeToCSS(theme, prefix = '') {
  const cssVars = {};

  function traverse(obj, keyPrefix) {
    for (const [key, value] of Object.entries(obj)) {
      const cssKey = keyPrefix ? `${keyPrefix}-${key}` : key;
      const kebabKey = cssKey.replace(/([A-Z])/g, '-$1').toLowerCase();

      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        traverse(value, cssKey);
      } else if (typeof value === 'string' || typeof value === 'number') {
        cssVars[kebabKey] = value;
      }
    }
  }

  traverse(theme, prefix);
  return cssVars;
}

/**
 * Generate CSS variables section from theme
 */
function generateCSSVariables(theme) {
  let css = '  /* ============================================\n';
  css += '     DESIGN TOKENS - Auto-generated from theme.ts\n';
  css += '     DO NOT EDIT MANUALLY - Edit src/constants/theme.ts instead\n';
  css += '     ============================================ */\n\n';

  // Typography
  css += '  /* Typography */\n';
  css += `  --font-poppins: ${theme.typography.fontFamily.poppins};\n`;
  css += `  --font-merriweather: ${theme.typography.fontFamily.merriweather};\n\n`;

  // Primary Colors
  css += '  /* Primary Brand Colors */\n';
  css += `  --primary: ${theme.colors.primary};\n`;
  css += `  --primary-dark: ${theme.colors.primaryDark};\n`;
  css += `  --primary-light: ${theme.colors.primaryLight};\n`;
  css += `  --primary-lighter: ${theme.colors.primaryLighter};\n\n`;

  // Secondary Colors
  css += '  /* Secondary Colors */\n';
  css += `  --secondary: ${theme.colors.secondary};\n`;
  css += `  --secondary-light: ${theme.colors.secondaryLight};\n`;
  css += `  --secondary-lighter: ${theme.colors.secondaryLighter};\n\n`;

  // Accent Colors
  css += '  /* Accent Colors */\n';
  css += `  --accent-blue: ${theme.colors.accentBlue};\n`;
  css += `  --accent-blue-light: ${theme.colors.accentBlueLight};\n`;
  css += `  --accent-blue-dark: ${theme.colors.accentBlueDark};\n`;
  css += `  --accent-green: ${theme.colors.accentGreen};\n`;
  css += `  --accent-green-dark: ${theme.colors.accentGreenDark};\n`;
  css += `  --accent-gold: ${theme.colors.accentGold};\n\n`;

  // Neutral Colors
  css += '  /* Neutral Colors */\n';
  Object.entries(theme.colors.neutral).forEach(([key, value]) => {
    css += `  --neutral-${key}: ${value};\n`;
  });
  css += '\n';

  // Text Colors
  css += '  /* Text Colors */\n';
  css += `  --text-primary: ${theme.colors.text.primary};\n`;
  css += `  --text-secondary: ${theme.colors.text.secondary};\n`;
  css += `  --text-tertiary: ${theme.colors.text.tertiary};\n`;
  css += `  --text-inverse: ${theme.colors.text.inverse};\n`;
  css += `  --text-inverse-secondary: ${theme.colors.text.inverseSecondary};\n`;
  css += `  --text-inverse-tertiary: ${theme.colors.text.inverseTertiary};\n`;
  css += `  --text-dark: ${theme.colors.text.dark};\n`;
  css += `  --text-form-placeholder: ${theme.colors.text.formPlaceholder};\n`;
  css += `  --text-form-value: ${theme.colors.text.formValue};\n\n`;

  // Background Colors
  css += '  /* Background Colors */\n';
  css += `  --bg-primary: ${theme.colors.background.primary};\n`;
  css += `  --bg-secondary: ${theme.colors.background.secondary};\n`;
  css += `  --bg-tertiary: ${theme.colors.background.tertiary};\n`;
  css += `  --bg-dark: ${theme.colors.background.dark};\n`;
  css += `  --bg-dark-alpha: ${theme.colors.background.darkAlpha};\n`;
  css += `  --bg-transparent: ${theme.colors.background.transparent};\n`;
  css += `  --bg-white: ${theme.colors.background.white};\n`;
  css += `  --bg-light: ${theme.colors.background.light};\n`;
  css += `  --bg-lighter: ${theme.colors.background.lighter};\n`;
  css += `  --bg-input: ${theme.colors.background.input};\n`;
  css += `  --bg-button-light: ${theme.colors.background.buttonLight};\n`;
  css += `  --bg-gray-light: ${theme.colors.background.grayLight};\n`;
  css += `  --bg-gray: ${theme.colors.background.gray};\n\n`;

  // Semantic Colors
  css += '  /* Semantic Colors */\n';
  css += `  --success: ${theme.colors.semantic.success};\n`;
  css += `  --success-dark: ${theme.colors.semantic.successDark};\n`;
  css += `  --success-light: ${theme.colors.semantic.successLight};\n`;
  css += `  --success-bg: ${theme.colors.semantic.successBg};\n`;
  css += `  --error: ${theme.colors.semantic.error};\n`;
  css += `  --error-dark: ${theme.colors.semantic.errorDark};\n`;
  css += `  --error-light: ${theme.colors.semantic.errorLight};\n`;
  css += `  --error-red: ${theme.colors.semantic.errorRed};\n`;
  css += `  --error-border: ${theme.colors.semantic.errorBorder};\n`;
  css += `  --error-bg: ${theme.colors.semantic.errorBg};\n`;
  css += `  --warning: ${theme.colors.semantic.warning};\n`;
  css += `  --warning-dark: ${theme.colors.semantic.warningDark};\n`;
  css += `  --warning-light: ${theme.colors.semantic.warningLight};\n`;
  css += `  --warning-bg: ${theme.colors.semantic.warningBg};\n`;
  css += `  --info: ${theme.colors.semantic.info};\n`;
  css += `  --info-dark: ${theme.colors.semantic.infoDark};\n`;
  css += `  --info-light: ${theme.colors.semantic.infoLight};\n`;
  css += `  --info-bg: ${theme.colors.semantic.infoBg};\n\n`;

  // Border Colors
  css += '  /* Border Colors */\n';
  css += `  --border-light: ${theme.colors.border.light};\n`;
  css += `  --border-lighter: ${theme.colors.border.lighter};\n`;
  css += `  --border-checkbox: ${theme.colors.border.checkbox};\n`;
  css += `  --border-default: var(--border-light);\n\n`;

  // Primary Alpha Variants
  css += '  /* Primary Color with Opacity Variants */\n';
  Object.entries(theme.colors.primaryAlpha).forEach(([key, value]) => {
    css += `  --primary-alpha-${key}: ${value};\n`;
  });
  css += '\n';

  // White Alpha Variants
  css += '  /* White Overlay Variants */\n';
  Object.entries(theme.colors.whiteAlpha).forEach(([key, value]) => {
    css += `  --white-alpha-${key}: ${value};\n`;
  });
  css += '\n';

  // Black Alpha Variants
  css += '  /* Black/Dark Overlay Variants */\n';
  Object.entries(theme.colors.blackAlpha).forEach(([key, value]) => {
    css += `  --black-alpha-${key}: ${value};\n`;
  });
  css += '\n';

  // Rating Colors
  css += '  /* Rating/Star Colors */\n';
  css += `  --rating-active: ${theme.colors.rating.active};\n`;
  css += `  --rating-inactive: ${theme.colors.rating.inactive};\n`;
  css += `  --rating-glow: ${theme.colors.rating.glow};\n\n`;

  // Social Media Colors
  css += '  /* Social Media Colors */\n';
  css += `  --social-facebook: ${theme.colors.social.facebook};\n`;
  css += `  --social-twitter: ${theme.colors.social.twitter};\n`;
  css += `  --social-linkedin: ${theme.colors.social.linkedin};\n\n`;

  // Gray Colors
  css += '  /* Additional Gray Colors */\n';
  css += `  --gray-medium: ${theme.colors.gray.medium};\n`;
  css += `  --gray-text: ${theme.colors.gray.text};\n\n`;

  // Legacy Support
  css += '  /* Legacy Support (Backward Compatibility) */\n';
  css += '  --primary-bg-color: var(--primary);\n';
  css += '  --primary-text-color: var(--text-inverse);\n';
  css += '  --primary-error-color: var(--primary-dark);\n';
  css += '  --secondary-bg-color: var(--bg-dark-alpha);\n';
  css += '  --secondary-text-color: var(--text-primary);\n';
  css += '  --tertiary-bg-color: var(--bg-transparent);\n';
  css += '  --neutral-bg-color: var(--neutral-400);\n';
  css += '  --btn-text-color: var(--text-inverse);\n\n';

  // Spacing
  css += '  /* Spacing Scale */\n';
  Object.entries(theme.spacing).forEach(([key, value]) => {
    const spacingKey = key === 'section' ? 'spacing-section' : `spacing-${key}`;
    css += `  --${spacingKey}: ${value};\n`;
  });
  css += '\n';

  // Gaps
  css += '  /* Grid Gaps */\n';
  Object.entries(theme.gap).forEach(([key, value]) => {
    css += `  --gap-${key}: ${value};\n`;
  });
  css += '\n';

  // Border Radius
  css += '  /* Border Radius */\n';
  Object.entries(theme.borderRadius).forEach(([key, value]) => {
    css += `  --radius-${key}: ${value};\n`;
  });
  css += '\n';

  // Shadows
  css += '  /* Shadows */\n';
  Object.entries(theme.shadows).forEach(([key, value]) => {
    css += `  --shadow-${key}: ${value};\n`;
  });
  css += '\n';

  // Transitions
  css += '  /* Transitions */\n';
  Object.entries(theme.transitions).forEach(([key, value]) => {
    css += `  --transition-${key}: ${value};\n`;
  });
  css += '\n';

  // Z-Index
  css += '  /* Z-Index Scale */\n';
  Object.entries(theme.zIndex).forEach(([key, value]) => {
    css += `  --z-${key}: ${value};\n`;
  });
  css += '\n';

  // Container
  css += '  /* Container Widths */\n';
  Object.entries(theme.container).forEach(([key, value]) => {
    css += `  --container-${key}: ${value};\n`;
  });
  css += '\n';

  // Breakpoints (for reference, not as CSS vars usually)
  css += '  /* Breakpoints (for reference, use in media queries) */\n';
  Object.entries(theme.breakpoints).forEach(([key, value]) => {
    css += `  --breakpoint-${key}: ${value};\n`;
  });

  return css;
}

try {
  // Read theme file and extract theme object (simplified - would need proper TS parsing in production)
  // For now, we'll just validate that the structure matches
  console.log('✅ Theme sync script ready');
  console.log('⚠️  Note: This script requires manual execution with theme object');
  console.log('   For full automation, use TypeScript compiler or ts-node');
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}

module.exports = { generateCSSVariables };

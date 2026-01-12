#!/usr/bin/env node

/**
 * Script to sync CSS variables in globals.css with theme.ts
 * This ensures theme.ts is the single source of truth
 * 
 * Usage: node scripts/sync-theme-css.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const themePath = path.join(__dirname, '../src/constants/theme.ts');
const cssPath = path.join(__dirname, '../styles/globals.css');

/**
 * Parse theme.ts file and extract color values using regex
 */
function parseThemeFile() {
  const themeContent = fs.readFileSync(themePath, 'utf8');
  const theme = { colors: {} };

  // Extract primary colors
  const primaryMatch = themeContent.match(/primary:\s*"([^"]+)"/);
  const primaryDarkMatch = themeContent.match(/primaryDark:\s*"([^"]+)"/);
  const primaryLightMatch = themeContent.match(/primaryLight:\s*"([^"]+)"/);
  const primaryLighterMatch = themeContent.match(/primaryLighter:\s*"([^"]+)"/);
  
  theme.colors.primary = primaryMatch ? primaryMatch[1] : '#CF772C';
  theme.colors.primaryDark = primaryDarkMatch ? primaryDarkMatch[1] : '#a85f1f';
  theme.colors.primaryLight = primaryLightMatch ? primaryLightMatch[1] : '#e08a4a';
  theme.colors.primaryLighter = primaryLighterMatch ? primaryLighterMatch[1] : '#f19d68';

  // Extract secondary colors
  const secondaryMatch = themeContent.match(/secondary:\s*"([^"]+)"/);
  const secondaryLightMatch = themeContent.match(/secondaryLight:\s*"([^"]+)"/);
  const secondaryLighterMatch = themeContent.match(/secondaryLighter:\s*"([^"]+)"/);
  
  theme.colors.secondary = secondaryMatch ? secondaryMatch[1] : '#CF772C';
  theme.colors.secondaryLight = secondaryLightMatch ? secondaryLightMatch[1] : '#e08a4a';
  theme.colors.secondaryLighter = secondaryLighterMatch ? secondaryLighterMatch[1] : '#f19d68';

  // Extract accent colors
  const accentBlueMatch = themeContent.match(/accentBlue:\s*"([^"]+)"/);
  const accentBlueLightMatch = themeContent.match(/accentBlueLight:\s*"([^"]+)"/);
  const accentBlueDarkMatch = themeContent.match(/accentBlueDark:\s*"([^"]+)"/);
  const accentGreenMatch = themeContent.match(/accentGreen:\s*"([^"]+)"/);
  const accentGreenDarkMatch = themeContent.match(/accentGreenDark:\s*"([^"]+)"/);
  const accentGoldMatch = themeContent.match(/accentGold:\s*"([^"]+)"/);
  
  theme.colors.accentBlue = accentBlueMatch ? accentBlueMatch[1] : '#a85f1f';
  theme.colors.accentBlueLight = accentBlueLightMatch ? accentBlueLightMatch[1] : '#CF772C';
  theme.colors.accentBlueDark = accentBlueDarkMatch ? accentBlueDarkMatch[1] : '#8a4d18';
  theme.colors.accentGreen = accentGreenMatch ? accentGreenMatch[1] : '#a85f1f';
  theme.colors.accentGreenDark = accentGreenDarkMatch ? accentGreenDarkMatch[1] : '#8a4d18';
  theme.colors.accentGold = accentGoldMatch ? accentGoldMatch[1] : '#CF772C';

  // Extract neutral colors
  theme.colors.neutral = {};
  for (let i = 50; i <= 900; i += (i < 100 ? 50 : 100)) {
    const regex = new RegExp(`${i}:\\s*"([^"]+)"`);
    const match = themeContent.match(regex);
    if (match) {
      theme.colors.neutral[i] = match[1];
    }
  }

  // Extract background colors
  const bgPrimaryMatch = themeContent.match(/background:\s*\{[^}]*primary:\s*"([^"]+)"/s);
  const bgSecondaryMatch = themeContent.match(/secondary:\s*"([^"]+)"/);
  const bgTertiaryMatch = themeContent.match(/tertiary:\s*"([^"]+)"/);
  const bgDarkMatch = themeContent.match(/dark:\s*"([^"]+)"/);
  const bgDarkAlphaMatch = themeContent.match(/darkAlpha:\s*"([^"]+)"/);
  const bgDarkAlpha50Match = themeContent.match(/darkAlpha50:\s*"([^"]+)"/);
  const bgDarkAlpha40Match = themeContent.match(/darkAlpha40:\s*"([^"]+)"/);
  
  theme.colors.background = {
    primary: bgPrimaryMatch ? bgPrimaryMatch[1] : '#7a6a5a',
    secondary: bgPrimaryMatch ? bgPrimaryMatch[1] : '#7a6a5a',
    tertiary: bgPrimaryMatch ? bgPrimaryMatch[1] : '#7a6a5a',
    dark: bgPrimaryMatch ? bgPrimaryMatch[1] : '#7a6a5a',
    darkAlpha: bgDarkAlphaMatch ? bgDarkAlphaMatch[1] : 'rgba(122, 106, 90, 0.95)',
    darkAlpha50: bgDarkAlpha50Match ? bgDarkAlpha50Match[1] : 'rgba(122, 106, 90, 0.5)',
    darkAlpha40: bgDarkAlpha40Match ? bgDarkAlpha40Match[1] : 'rgba(122, 106, 90, 0.4)',
  };

  // Extract semantic colors
  const infoMatch = themeContent.match(/info:\s*"([^"]+)"/);
  const infoDarkMatch = themeContent.match(/infoDark:\s*"([^"]+)"/);
  const infoLightMatch = themeContent.match(/infoLight:\s*"([^"]+)"/);
  const infoBgMatch = themeContent.match(/infoBg:\s*"([^"]+)"/);
  
  theme.colors.semantic = {
    info: infoMatch ? infoMatch[1] : '#CF772C',
    infoDark: infoDarkMatch ? infoDarkMatch[1] : '#a85f1f',
    infoLight: infoLightMatch ? infoLightMatch[1] : '#e08a4a',
    infoBg: infoBgMatch ? infoBgMatch[1] : 'rgba(207, 119, 44, 0.15)',
  };

  // Extract primaryAlpha
  theme.colors.primaryAlpha = {};
  for (const key of ['5', '6', '8', '10', '12', '15', '20', '30', '40']) {
    const regex = new RegExp(`${key}:\\s*"([^"]+)"`);
    const match = themeContent.match(regex);
    if (match && match[1].includes('rgba')) {
      theme.colors.primaryAlpha[key] = match[1];
    }
  }

  // Extract typography
  const poppinsMatch = themeContent.match(/poppins:\s*"([^"]+)"/);
  const merriweatherMatch = themeContent.match(/merriweather:\s*"([^"]+)"/);
  
  theme.typography = {
    fontFamily: {
      poppins: poppinsMatch ? poppinsMatch[1] : '"Poppins", sans-serif',
      merriweather: merriweatherMatch ? merriweatherMatch[1] : '"Merriweather", serif',
    }
  };

  return theme;
}

/**
 * Generate CSS variables section from theme
 */
function generateCSSVariables(theme) {
  let css = '  /* ============================================\n';
  css += '     DESIGN TOKENS - Auto-generated from theme.ts\n';
  css += '     DO NOT EDIT MANUALLY - Edit src/constants/theme.ts instead\n';
  css += '     Run: node scripts/sync-theme-css.js to regenerate\n';
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

  // Background Colors
  css += '  /* Background Colors */\n';
  css += `  --bg-primary: ${theme.colors.background.primary};\n`;
  css += `  --bg-secondary: ${theme.colors.background.secondary};\n`;
  css += `  --bg-tertiary: ${theme.colors.background.tertiary};\n`;
  css += `  --bg-dark: ${theme.colors.background.dark};\n`;
  css += `  --bg-dark-alpha: ${theme.colors.background.darkAlpha};\n`;
  css += `  --bg-dark-alpha-50: ${theme.colors.background.darkAlpha50};\n`;
  css += `  --bg-dark-alpha-40: ${theme.colors.background.darkAlpha40};\n\n`;

  // Semantic Colors - Info
  css += '  /* Info Colors */\n';
  css += `  --info: ${theme.colors.semantic.info};\n`;
  css += `  --info-dark: ${theme.colors.semantic.infoDark};\n`;
  css += `  --info-light: ${theme.colors.semantic.infoLight};\n`;
  css += `  --info-bg: ${theme.colors.semantic.infoBg};\n\n`;

  // Primary Alpha Variants
  css += '  /* Primary Color with Opacity Variants */\n';
  Object.entries(theme.colors.primaryAlpha).forEach(([key, value]) => {
    css += `  --primary-alpha-${key}: ${value};\n`;
  });
  css += '\n';

  return css;
}

/**
 * Update globals.css with synced values from theme.ts
 */
function syncCSSFile() {
  const theme = parseThemeFile();
  const cssVars = generateCSSVariables(theme);
  
  // Read existing CSS file
  let cssContent = fs.readFileSync(cssPath, 'utf8');
  
  // Find the :root block and replace the design tokens section
  // Look for the start of design tokens comment and end before other CSS
  const designTokensStart = cssContent.indexOf('/* ============================================');
  const designTokensEnd = cssContent.indexOf('/* Typography */');
  
  if (designTokensStart !== -1 && designTokensEnd !== -1) {
    // Find the actual end of the design tokens section (before other CSS rules)
    const nextSection = cssContent.indexOf('\n\n  /*', designTokensEnd + 100);
    const sectionEnd = nextSection !== -1 ? nextSection : cssContent.indexOf('\n\n}', designTokensEnd);
    
    if (sectionEnd !== -1) {
      // Replace the design tokens section
      const before = cssContent.substring(0, designTokensStart);
      const after = cssContent.substring(sectionEnd);
      cssContent = before + cssVars + after;
    }
  } else {
    // If structure is different, try to find :root and insert after it
    const rootIndex = cssContent.indexOf(':root {');
    if (rootIndex !== -1) {
      const afterRoot = cssContent.indexOf('\n', rootIndex) + 1;
      cssContent = cssContent.substring(0, afterRoot) + '\n' + cssVars + cssContent.substring(afterRoot);
    }
  }
  
  fs.writeFileSync(cssPath, cssContent, 'utf8');
  console.log('✅ Synced globals.css from theme.ts');
}

try {
  syncCSSFile();
  console.log('✅ Theme sync completed successfully!');
} catch (error) {
  console.error('❌ Error syncing theme:', error.message);
  console.error(error.stack);
  process.exit(1);
}

export { generateCSSVariables, parseThemeFile };

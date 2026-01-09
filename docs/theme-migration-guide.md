# Theme Migration Guide - Single Source of Truth

## ✅ Completed

1. **Created Theme System**
   - ✅ `src/constants/theme.ts` - Single source of truth for all colors
   - ✅ `src/hooks/useTheme.ts` - Hook for React components
   - ✅ `styles/globals.css` - CSS variables synced with theme
   - ✅ Added sync comment to globals.css

2. **Updated Critical Files**
   - ✅ `src/components/HeroQuickQuote/styles.module.css` - All hardcoded colors replaced with CSS variables
   - ✅ Added `error-red-alpha-90` variant to theme for error messages

## 📋 Migration Status

**Total Files with Hardcoded Colors**: ~70 files

**Files Updated**: 1
- ✅ `src/components/HeroQuickQuote/styles.module.css`

**Files Remaining**: ~69 files

## 🔄 Migration Strategy

### Step 1: Replace Colors in CSS Files (Priority)

Replace hardcoded colors with CSS variables:

**Common Replacements:**

| Hardcoded Color | CSS Variable | Theme Path |
|----------------|--------------|------------|
| `white` | `var(--bg-white)` or `var(--text-primary)` | `colors.background.white` / `colors.text.primary` |
| `black` | `var(--text-dark)` | `colors.text.dark` |
| `#ffffff` | `var(--bg-white)` or `var(--text-primary)` | See above |
| `#000000` | `var(--text-dark)` | `colors.text.dark` |
| `rgba(255, 255, 255, 0.1)` | `var(--white-alpha-10)` | `colors.whiteAlpha[10]` |
| `rgba(255, 255, 255, 0.2)` | `var(--white-alpha-20)` | `colors.whiteAlpha[20]` |
| `rgba(0, 0, 0, 0.1)` | `var(--black-alpha-10)` | `colors.blackAlpha[10]` |
| `rgba(0, 0, 0, 0.15)` | `var(--black-alpha-15)` | `colors.blackAlpha[15]` |
| `rgba(0, 0, 0, 0.2)` | `var(--black-alpha-20)` | `colors.blackAlpha[20]` |
| `rgba(0, 0, 0, 0.25)` | `var(--black-alpha-25)` | `colors.blackAlpha[25]` |
| `#8c6f48` | `var(--primary)` | `colors.primary` |
| `#6d5637` | `var(--primary-dark)` | `colors.primaryDark` |
| `#a5896a` | `var(--primary-light)` | `colors.primaryLight` |
| `#5a4a3a` | `var(--bg-primary)` | `colors.background.primary` |
| `#ff4444` | `var(--error-red)` | `colors.semantic.errorRed` |
| `rgba(255, 68, 68, 0.9)` | `var(--error-red-alpha-90)` | `colors.semantic.errorRedAlpha90` |

### Step 2: Replace Colors in TypeScript/React Files

Use the `useTheme()` hook:

```typescript
// ❌ Bad - Hardcoded color
<div style={{ backgroundColor: '#8c6f48' }}>

// ✅ Good - From theme
import { useTheme } from '@/hooks/useTheme';

function MyComponent() {
  const theme = useTheme();
  
  return (
    <div style={{ backgroundColor: theme.colors.primary }}>
      ...
    </div>
  );
}
```

**For inline styles:**
```typescript
// Use theme hook
const theme = useTheme();
const styles = {
  backgroundColor: theme.colors.primary,
  color: theme.colors.text.primary,
  padding: theme.spacing.lg,
};
```

**For CSS modules (preferred):**
```css
/* In your .module.css file */
.myClass {
  background-color: var(--primary);
  color: var(--text-primary);
}
```

### Step 3: Priority Files to Update

**High Priority (User-facing, frequently used):**
1. ✅ `src/components/HeroQuickQuote/styles.module.css` - DONE
2. `src/components/Navbar/styles.module.css`
3. `src/components/Footer/styles.module.css`
4. `src/components/UI/Button/styles.module.css`
5. `src/features/home/components/Hero/styles.module.css`

**Medium Priority:**
- Form components CSS files
- Modal components CSS files
- Quote flow CSS files

**Lower Priority:**
- Utility/helper components
- Internal/admin components

## 🛠️ Tools & Utilities

### Search for Hardcoded Colors

```bash
# Find hex colors
grep -r "#[0-9a-fA-F]\{3,6\}" src/

# Find rgba/rgb colors
grep -r "rgba\|rgb(" src/

# Find in CSS files specifically
grep -r "#[0-9a-fA-F]\{3,6\}\|rgba\|rgb(" src/**/*.css
```

### Use Theme Hook

```typescript
import { useTheme, useThemeColors } from '@/hooks/useTheme';

// Full theme access
const theme = useTheme();

// Colors only (lighter)
const colors = useThemeColors();
```

## 📝 Notes

1. **CSS Variables vs Theme Hook:**
   - CSS files: Use CSS variables (`var(--primary)`)
   - TypeScript/React: Use theme hook (`theme.colors.primary`)

2. **Opacity/RGBA:**
   - If you need opacity with a color, add it to the theme first
   - Example: `errorRedAlpha90` was added for error messages
   - Prefer existing alpha variants when possible

3. **Color Naming:**
   - Use semantic names (success, error, warning) over generic colors
   - Follow existing theme structure

4. **Testing:**
   - After replacing colors, test components visually
   - Ensure contrast ratios meet accessibility standards
   - Check both light and dark (if applicable) modes

## 🎯 Next Steps

1. **Batch Process CSS Files:**
   - Focus on one component at a time
   - Start with most visible/user-facing components
   - Test after each component

2. **TypeScript Files:**
   - Search for inline style objects with hardcoded colors
   - Replace with `useTheme()` hook
   - Prefer CSS modules over inline styles when possible

3. **Validation:**
   - Create a script to detect remaining hardcoded colors
   - Add linting rules to prevent new hardcoded colors

4. **Documentation:**
   - Update component documentation with theme usage examples
   - Create style guide showing approved color usage

## ⚠️ Common Pitfalls

1. **Don't use opacity on elements with CSS variables:**
   ```css
   /* ❌ Bad - opacity affects children */
   .error { 
     background-color: var(--error-red);
     opacity: 0.9;
   }
   
   /* ✅ Good - use alpha variant */
   .error {
     background-color: var(--error-red-alpha-90);
   }
   ```

2. **Don't hardcode in CSS files:**
   ```css
   /* ❌ Bad */
   .button { background: #8c6f48; }
   
   /* ✅ Good */
   .button { background: var(--primary); }
   ```

3. **Don't import theme in CSS (use CSS variables):**
   ```css
   /* ❌ Bad - Can't import TS in CSS */
   @import 'theme';
   
   /* ✅ Good - Use CSS variables */
   .button { background: var(--primary); }
   ```

## 📚 Resources

- Theme file: `src/constants/theme.ts`
- Theme hook: `src/hooks/useTheme.ts`
- CSS variables: `styles/globals.css`
- Theme README: `src/constants/theme.README.md`

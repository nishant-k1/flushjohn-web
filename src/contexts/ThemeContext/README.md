# Dynamic Theme System

This theme system allows you to switch between multiple themes on the fly. All colors are centralized and can be changed dynamically without page refresh.

## Features

✅ **Multiple Themes** - Switch between Classic Brown, Ocean Blue, Forest Green, and Royal Purple  
✅ **Persistent Storage** - Theme preference is saved to localStorage  
✅ **Dynamic CSS Variables** - All CSS variables update automatically when theme changes  
✅ **Backward Compatible** - Existing code using `useTheme()` hook continues to work  
✅ **Type Safe** - Full TypeScript support  

## Quick Start

### 1. Using the Theme Switcher Component

Simply add the `ThemeSwitcher` component anywhere in your app:

```tsx
import ThemeSwitcher from "@/components/ThemeSwitcher";

export default function MyComponent() {
  return (
    <div>
      <ThemeSwitcher />
    </div>
  );
}
```

### 2. Programmatically Switch Themes

Use the `useThemeContext` hook to switch themes programmatically:

```tsx
import { useThemeContext } from "@/contexts/ThemeContext";

export default function MyComponent() {
  const { themeId, setTheme, availableThemes } = useThemeContext();

  return (
    <div>
      <p>Current theme: {themeId}</p>
      <button onClick={() => setTheme('blue')}>Switch to Blue</button>
      <button onClick={() => setTheme('green')}>Switch to Green</button>
      <button onClick={() => setTheme('default')}>Switch to Default</button>
    </div>
  );
}
```

### 3. Access Current Theme Colors

Use the `useTheme()` or `useThemeColors()` hooks (works with or without ThemeContext):

```tsx
import { useTheme, useThemeColors } from "@/hooks/useTheme";

export default function MyComponent() {
  // Full theme object with helper functions
  const theme = useTheme();
  
  // Just colors
  const colors = useThemeColors();

  return (
    <div style={{ 
      backgroundColor: theme.colors.primary,
      color: colors.text.primary,
      padding: theme.spacing.lg 
    }}>
      Themed Content
    </div>
  );
}
```

### 4. Using CSS Variables (Automatic)

All CSS variables are automatically updated when themes change. Use them in your CSS:

```css
.myComponent {
  background-color: var(--primary);
  color: var(--text-primary);
  border: 1px solid var(--primary-alpha-20);
}
```

## Adding New Themes

To add a new theme, edit `src/contexts/ThemeContext/index.tsx`:

1. Add a new theme ID to the `ThemeId` type:
```tsx
export type ThemeId = "default" | "blue" | "green" | "purple" | "myNewTheme";
```

2. Add the theme definition to the `themes` object:
```tsx
export const themes: Record<ThemeId, ThemeDefinition> = {
  // ... existing themes
  myNewTheme: {
    id: "myNewTheme",
    name: "My New Theme",
    description: "Description of my theme",
    colors: {
      ...defaultTheme.colors,
      primary: "#your-color",
      primaryDark: "#your-dark-color",
      // ... override other colors as needed
    },
    typography: defaultTheme.typography,
    spacing: defaultTheme.spacing,
  },
};
```

3. The theme will automatically be available in the theme switcher!

## Available Themes

- **default** (Classic Brown) - Original FlushJohn brown theme
- **blue** (Ocean Blue) - Cool blue theme
- **green** (Forest Green) - Natural green theme
- **purple** (Royal Purple) - Elegant purple theme

## How It Works

1. `ThemeContextProvider` wraps your app and manages theme state
2. Theme preference is stored in localStorage (`flushjohn-theme`)
3. When theme changes, `applyThemeToCSS()` updates all CSS variables on `:root`
4. All components using CSS variables automatically update
5. Components using `useTheme()` hook get the current active theme

## Best Practices

1. **Use CSS Variables** - Prefer CSS variables over inline styles for better performance
2. **Extend Default Theme** - When creating new themes, extend `defaultTheme.colors` to maintain consistency
3. **Test All Themes** - Make sure your components look good in all available themes
4. **Document New Themes** - Add descriptions to help users understand theme options

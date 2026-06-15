export type LayoutMode = "side" | "top";

export interface ThemeConfig {
  darkMode: boolean;
  layoutMode: LayoutMode;
}

export const defaultThemeConfig: ThemeConfig = {
  darkMode: false,
  layoutMode: "side",
};

export const THEME_STORAGE_KEY = "app-theme-config";

export function loadThemeConfig(): ThemeConfig {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Partial<ThemeConfig>;
      return {
        ...defaultThemeConfig,
        darkMode: parsed.darkMode ?? defaultThemeConfig.darkMode,
        layoutMode: parsed.layoutMode ?? defaultThemeConfig.layoutMode,
      };
    }
  } catch {
    // Fall back to defaults when persisted settings cannot be parsed.
  }
  return { ...defaultThemeConfig };
}

export function saveThemeConfig(config: ThemeConfig): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(config));
  } catch {
    // Ignore storage failures.
  }
}

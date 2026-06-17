import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ConfigProvider, theme as antdTheme } from "antd";
import {
  ThemeConfig,
  defaultThemeConfig,
  loadThemeConfig,
  saveThemeConfig,
} from "./themes";
import { appTheme } from "./appTheme";

interface ThemeContextValue {
  themeConfig: ThemeConfig;
  setThemeConfig: (config: Partial<ThemeConfig>) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const mixTransparent = (color: string, percent: number) =>
  `color-mix(in srgb, ${color} ${percent}%, transparent)`;

const getModeAwareColorTokens = (darkMode: boolean) => ({
  colorPrimaryBg: darkMode
    ? mixTransparent(appTheme.colorPrimary, 22)
    : appTheme.colorPrimaryBg,
  colorPrimaryBorder: darkMode
    ? mixTransparent(appTheme.colorPrimary, 38)
    : appTheme.colorPrimaryBorder,
  colorSuccessBg: darkMode
    ? mixTransparent(appTheme.colorSuccess, 18)
    : appTheme.colorSuccessBg,
  colorSuccessBorder: darkMode
    ? mixTransparent(appTheme.colorSuccess, 38)
    : appTheme.colorSuccessBorder,
  colorWarningBg: darkMode
    ? mixTransparent(appTheme.colorWarning, 18)
    : appTheme.colorWarningBg,
  colorWarningBorder: darkMode
    ? mixTransparent(appTheme.colorWarning, 38)
    : appTheme.colorWarningBorder,
  colorErrorBg: darkMode
    ? mixTransparent(appTheme.colorError, 18)
    : appTheme.colorErrorBg,
  colorErrorBorder: darkMode
    ? mixTransparent(appTheme.colorError, 38)
    : appTheme.colorErrorBorder,
  colorInfoBg: darkMode
    ? mixTransparent(appTheme.colorInfo, 18)
    : appTheme.colorInfoBg,
  colorInfoBorder: darkMode
    ? mixTransparent(appTheme.colorInfo, 38)
    : appTheme.colorInfoBorder,
});

const DARK_CSS_VARS: Record<string, string> = {
  "--color-bg-base": "#141414",
  "--color-bg-container": "#1f1f1f",
  "--color-bg-elevated": "#262626",
  "--color-bg-spotlight": "#303030",
  "--color-header-bg": "rgba(31, 31, 31, 0.86)",
  "--color-sidebar-bg": "#1f1f1f",
  "--color-sidebar-border": "#303030",
  "--color-sidebar-hover-bg": "rgba(255, 255, 255, 0.08)",
  "--color-sidebar-active-bg": mixTransparent(appTheme.colorPrimary, 22),
  "--color-hover-bg": "rgba(255, 255, 255, 0.08)",
  "--color-border": "#424242",
  "--color-border-secondary": "#303030",
  "--color-text": "rgba(255, 255, 255, 0.88)",
  "--color-text-secondary": "rgba(255, 255, 255, 0.65)",
  "--color-text-tertiary": "rgba(255, 255, 255, 0.45)",
  "--color-sidebar-text": "rgba(255, 255, 255, 0.65)",
  "--color-sidebar-text-active": appTheme.colorPrimaryHover,
};

const LIGHT_CSS_VARS: Record<string, string> = {
  "--color-bg-base": "#f5f5f5",
  "--color-bg-container": "#ffffff",
  "--color-bg-elevated": "#ffffff",
  "--color-bg-spotlight": "#f0f0f0",
  "--color-header-bg": "rgba(255, 255, 255, 0.86)",
  "--color-sidebar-bg": "#ffffff",
  "--color-sidebar-border": "#f0f0f0",
  "--color-sidebar-hover-bg": "#f5f5f5",
  "--color-sidebar-active-bg": appTheme.colorPrimaryBg,
  "--color-hover-bg": "#f5f5f5",
  "--color-border": "#d9d9d9",
  "--color-border-secondary": "#f0f0f0",
  "--color-text": "rgba(0, 0, 0, 0.88)",
  "--color-text-secondary": "rgba(0, 0, 0, 0.65)",
  "--color-text-tertiary": "rgba(0, 0, 0, 0.45)",
  "--color-sidebar-text": "rgba(0, 0, 0, 0.65)",
  "--color-sidebar-text-active": appTheme.colorPrimary,
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [themeConfig, setThemeConfigState] =
    useState<ThemeConfig>(loadThemeConfig);

  const setThemeConfig = useCallback((partial: Partial<ThemeConfig>) => {
    setThemeConfigState((prev) => {
      const next = { ...prev, ...partial };
      saveThemeConfig(next);
      return next;
    });
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    if (themeConfig.darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    const colorTokens = getModeAwareColorTokens(themeConfig.darkMode);
    const appThemeVars: Record<string, string> = {
      "--color-primary": appTheme.colorPrimary,
      "--color-primary-hover": appTheme.colorPrimaryHover,
      "--color-primary-active": appTheme.colorPrimaryActive,
      "--color-primary-border": colorTokens.colorPrimaryBorder,
      "--color-primary-bg": colorTokens.colorPrimaryBg,
      "--color-success": appTheme.colorSuccess,
      "--color-success-hover": appTheme.colorSuccessHover,
      "--color-success-active": appTheme.colorSuccessActive,
      "--color-success-border": colorTokens.colorSuccessBorder,
      "--color-success-bg": colorTokens.colorSuccessBg,
      "--color-warning": appTheme.colorWarning,
      "--color-warning-hover": appTheme.colorWarningHover,
      "--color-warning-active": appTheme.colorWarningActive,
      "--color-warning-border": colorTokens.colorWarningBorder,
      "--color-warning-bg": colorTokens.colorWarningBg,
      "--color-error": appTheme.colorError,
      "--color-error-hover": appTheme.colorErrorHover,
      "--color-error-active": appTheme.colorErrorActive,
      "--color-error-border": colorTokens.colorErrorBorder,
      "--color-error-bg": colorTokens.colorErrorBg,
      "--color-info": appTheme.colorInfo,
      "--color-info-hover": appTheme.colorInfoHover,
      "--color-info-active": appTheme.colorInfoActive,
      "--color-info-border": colorTokens.colorInfoBorder,
      "--color-info-bg": colorTokens.colorInfoBg,
      "--motion-duration-fast": appTheme.motionDurationFast,
      "--motion-duration-base": appTheme.motionDurationBase,
      "--motion-duration-slow": appTheme.motionDurationSlow,
      "--motion-ease-standard": appTheme.motionEaseStandard,
      "--motion-ease-out": appTheme.motionEaseOut,
      "--motion-ease-emphasized": appTheme.motionEaseEmphasized,
    };

    Object.entries(appThemeVars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    const modeVars = themeConfig.darkMode ? DARK_CSS_VARS : LIGHT_CSS_VARS;
    Object.entries(modeVars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }, [themeConfig.darkMode]);

  const antdThemeConfig = useMemo(
    () => {
      const colorTokens = getModeAwareColorTokens(themeConfig.darkMode);

      return {
      algorithm: themeConfig.darkMode
        ? antdTheme.darkAlgorithm
        : antdTheme.defaultAlgorithm,
      token: {
        colorPrimary: appTheme.colorPrimary,
        colorPrimaryHover: appTheme.colorPrimaryHover,
        colorPrimaryActive: appTheme.colorPrimaryActive,
        colorPrimaryBg: colorTokens.colorPrimaryBg,
        colorPrimaryBorder: colorTokens.colorPrimaryBorder,
        colorSuccess: appTheme.colorSuccess,
        colorSuccessHover: appTheme.colorSuccessHover,
        colorSuccessActive: appTheme.colorSuccessActive,
        colorSuccessBg: colorTokens.colorSuccessBg,
        colorSuccessBorder: colorTokens.colorSuccessBorder,
        colorWarning: appTheme.colorWarning,
        colorWarningHover: appTheme.colorWarningHover,
        colorWarningActive: appTheme.colorWarningActive,
        colorWarningBg: colorTokens.colorWarningBg,
        colorWarningBorder: colorTokens.colorWarningBorder,
        colorError: appTheme.colorError,
        colorErrorHover: appTheme.colorErrorHover,
        colorErrorActive: appTheme.colorErrorActive,
        colorErrorBg: colorTokens.colorErrorBg,
        colorErrorBorder: colorTokens.colorErrorBorder,
        colorInfo: appTheme.colorInfo,
        colorInfoHover: appTheme.colorInfoHover,
        colorInfoActive: appTheme.colorInfoActive,
        colorInfoBg: colorTokens.colorInfoBg,
        colorInfoBorder: colorTokens.colorInfoBorder,
        borderRadius: appTheme.borderRadius,
      },
    };
    },
    [themeConfig.darkMode]
  );

  const contextValue = useMemo(
    () => ({ themeConfig, setThemeConfig }),
    [themeConfig, setThemeConfig]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <ConfigProvider
        componentSize={appTheme.componentSize}
        theme={antdThemeConfig}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    return {
      themeConfig: defaultThemeConfig,
      setThemeConfig: () => {},
    };
  }
  return ctx;
}

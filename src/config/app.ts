export const appConfig = {
  name: import.meta.env.VITE_APP_NAME || import.meta.env.VITE_TITLE || "React Admin Plus",
  shortName: import.meta.env.VITE_APP_SHORT_NAME || "Admin",
  description: import.meta.env.VITE_APP_DESCRIPTION || "Admin Platform",
  copyright:
    import.meta.env.VITE_APP_COPYRIGHT || "(c) 2026 React Admin Plus",
  defaultRoute: import.meta.env.VITE_APP_DEFAULT_ROUTE || "/dashboard",
  loginRoute: import.meta.env.VITE_APP_LOGIN_ROUTE || "/login",
  notifyRoute: import.meta.env.VITE_APP_NOTIFY_ROUTE || "/user/notify-message",
  apiBaseUrl: import.meta.env.VITE_BASE_API || "",
  apiPrefix: import.meta.env.VITE_API_PREFIX || "/api",
  captchaEnabled: import.meta.env.VITE_CAPTCHA_ENABLE === "true",
  mockEnabled: import.meta.env.VITE_MSW_ENABLE === "true",
};

export type AppConfig = typeof appConfig;

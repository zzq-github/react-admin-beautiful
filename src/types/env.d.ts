/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_SHORT_NAME: string;
  readonly VITE_APP_DESCRIPTION: string;
  readonly VITE_APP_COPYRIGHT: string;
  readonly VITE_APP_DEFAULT_ROUTE: string;
  readonly VITE_APP_LOGIN_ROUTE: string;
  readonly VITE_APP_NOTIFY_ROUTE: string;
  readonly VITE_TITLE: string;
  readonly VITE_BASE_API: string;
  readonly VITE_API_PREFIX: string;
  readonly VITE_PROXY_TARGET: string;
  readonly VITE_CAPTCHA_ENABLE: string;
  readonly VITE_MSW_ENABLE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

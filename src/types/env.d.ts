/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_ENCRYPT_ENABLE: string;
  readonly VITE_API_ENCRYPT_HEADER: string;
  readonly VITE_API_ENCRYPT_ALGORITHM: string;
  readonly VITE_API_ENCRYPT_REQUEST_KEY: string;
  readonly VITE_API_ENCRYPT_RESPONSE_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
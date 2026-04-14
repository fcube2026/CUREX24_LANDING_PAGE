/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FUNCTION_URL: string;
  readonly VITE_FORM_SHARED_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

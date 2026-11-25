/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WIX_SITE_ID?: string;
  readonly VITE_WIX_EVENTS_API?: string;
  readonly [key: string]: any;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

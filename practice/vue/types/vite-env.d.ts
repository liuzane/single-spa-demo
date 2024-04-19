/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PORT: number;
  readonly VITE_PUBLIC_PATH: string;
  readonly VITE_API_ADDRESS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
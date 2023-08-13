/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Custom env variables, @see: https://vitejs.dev/guide/env-and-mode.html#intellisense-for-typescript
  readonly VITE_API_URL: string;
  readonly VITE_SERVER_HOST: string | boolean;
  readonly VITE_SERVER_PORT: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

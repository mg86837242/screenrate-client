/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string;
  readonly VITE_API_URL: string;
  readonly VITE_SERVER_HOST: string | boolean;
  readonly VITE_SERVER_PORT: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// custom env variables: https://vitejs.dev/guide/env-and-mode.html#intellisense-for-typescript

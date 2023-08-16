import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), svgr()],
    server: {
      host: env.VITE_SERVER_HOST || 'localhost',
      // @see: https://stackoverflow.com/questions/50376419/environment-variable-is-not-assigning-with-typescript
      port: Number(env.VITE_SERVER_PORT) || 5173,
    },
  };
});

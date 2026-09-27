import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import packageJSON from './package.json' with {type: 'json'};

export default defineConfig({
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify(packageJSON.version),
  },
  server: {
    port: 3000, // firebase.js exposes window._update only on localhost:3000
  },
  build: {
    outDir: 'build', // `npm run deploy` publishes this with gh-pages
  },
  test: {
    environment: 'jsdom',
  },
});

import {execSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import packageJSON from './package.json' with {type: 'json'};

// The game runs in a sandboxed iframe (see src/gameFrame.js), whose requests for its own
// scripts arrive with `Origin: null`. GitHub Pages allows any origin; the local servers
// need to allow that one explicitly, alongside Vite's default localhost origins.
// The version shown in the game is package.json's major.minor, then the number of commits, so
// each deploy from main (.github/workflows/deploy.yml) gets a higher one without a version bump.
const appVersion = () => {
  const [major, minor] = packageJSON.version.split('.');
  try {
    const commits = execSync('git rev-list --count HEAD').toString().trim();
    return `${major}.${minor}.${commits}`;
  } catch {
    return packageJSON.version;
  }
};

const cors = {
  origin: [
    /^https?:\/\/(?:(?:[^:]+\.)?localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/,
    'null',
  ],
};

export default defineConfig({
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify(appVersion()),
  },
  server: {
    port: 3000, // firebase.js exposes window._update only on localhost:3000
    cors,
  },
  preview: {cors},
  build: {
    outDir: 'build', // .github/workflows/deploy.yml publishes this with gh-pages
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('index.html', import.meta.url)),
        play: fileURLToPath(new URL('play.html', import.meta.url)),
      },
    },
  },
  test: {
    environment: 'jsdom',
  },
});

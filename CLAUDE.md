# Mortal Wombat

A tile-based platformer (`src/game/`, plain DOM, no framework) and a collaborative React world editor (`src/Components/`), both backed by Firebase Realtime Database. `src/index.js` loads the editor when the URL has `?editor`. Otherwise `gameFrame.js` shows the game in a sandboxed iframe of `play.html` (entry `src/play.js`), and passes the URL's `#…` start config through. Scripts live in `package.json`.

## Data model

- A world is stored at `worlds/<worldId>` with these parts:
  - `world`: tiles keyed `"x_y"`, each `{x, y, tileType, onSpace?, onTouch?, name?, user, tstamp}`, where `user` is the editor's Firebase Auth uid
  - `tileTypes` and `gameConfig`: overrides for the defaults in `src/defaults.js`
  - `lastEditedBy` (uid) and `cursors` (live editor presence, each with a `user` uid)
- `/users` is keyed by uid: `{[uid]: {name, email}}`. Show editors with `editorName(userIndex, uid)`. `worlds/` is public, so never store emails there.
- Worlds only store overrides. Both the game and the editor combine them with the defaults using `mergeDeepLeft(overrides, defaults)`.
- `tileType` is a tile type's short `id` (`'g'` grass, `'w'` wombat, `'m'` magma, …), not its key in `tileTypes`. The wombat tile only marks the spawn point, and `Game.load` removes it from the world.
- Access rules live in `database.rules.json`, which must match what's live. Deploy with `npx firebase deploy --only database`, and check `npx firebase database:get /.settings/rules` afterwards. Anyone can read `worlds/`, and signed-in users can write to each world. The rules also require any `user`/`lastEditedBy` being written to equal the writer's `auth.uid`. Only signed-in users can read `/users`, and nobody can write it from the app (profiles are edited in the Firebase console, keyed by the editor's uid from Authentication → Users). `listen()` in `firebase.js` shows read errors in the editor's error banner, so a hook that reads a protected path must wait for `user` (see `useUserIndex`). Otherwise logged-out visitors see a `permission_denied` banner.
- **Numbers are stored as strings** because the editor saves raw `<input>` values: `"0.005"`, and `""` when a field is cleared. When engine code reads a config or tile-type value, it has to handle numeric strings, `""` and `undefined`. That handling caused several past NaN/0 bugs.

## Engine rules

- Physics constants are per tick. `main.js` runs a fixed 60 ticks/sec, so any tuning has to assume that rate.
- `Game.iterate` = `moveWombat` (the player) then `iterateTiles` (falling, liquid, patrol and magma rules), then `frame++`.
- When the wombat rests on a block, it only overlaps that block every other frame. Contact logic such as `processOnTouch` needs a grace window, not a "touched last frame" check.
- Tile scripts (`onSpace`/`onTouch`) are author-written JS compiled with `new Function` in `compile.js`. The helpers they can use are the ones listed in `useTemplate`, and `TileLogic.jsx` shows examples to authors, so keep the two in sync.
- **World scripts run only in the sandbox.** The iframe has `sandbox="allow-scripts"` and no `allow-same-origin`, so its origin is `'null'` and scripts can't read the editor's Firebase login. `play.js` starts the game only when `window.origin === 'null'`, and otherwise redirects to `/`. Keep game code out of the editor bundle and editor/auth code out of the game (auth lives in `src/auth.js`).
- Inside the sandbox, browser storage is unavailable. The database SDK treats that as "WebSockets failed before" and falls back to long polling, which the sandbox breaks, so `play.js` calls `forceWebSockets()` first. Script requests from the sandbox arrive with `Origin: null`: GitHub Pages allows any origin, and `vite.config.js` allows `null` for the dev and preview servers.

## Verifying changes

- `npm test` (Vitest + jsdom) covers the engine. The tests mock `../firebase` and build worlds inline. Add a test here when fixing engine behavior.
- To check the game in a browser, run `npm start` and open `localhost:3000` (the default world loads from the live DB and is read-only). Browsers pause `requestAnimationFrame` in hidden tabs, so an automated browser that isn't in the foreground shows a frozen game. Browser-automation console and network tools don't see inside the game's iframe, and the outer page can't reach into it: to debug the game, have it `parent.postMessage` its errors temporarily, or check with screenshots.
- The editor needs a login. The only way to create accounts is the Firebase console, so editor changes past the login screen need the user to test them.
- The dev server must stay on port 3000: `firebase.js` exposes `window._update` only on `localhost:3000`.

## Known issues / TODO

Ordered by priority. Remove an entry once it's done.

1. **Clean up after the editor-email migration (applied 2026-09-28, verified tile by tile).** Once the user confirms names show correctly in the editor, delete `backups/db-premigration-*.json` and `backups/uid-map.json` (they contain editor emails). `scripts/migrateEditorIds.js` can go too. Turn on database backups: there's no undo if a signed-in user overwrites a world. Note that `npx firebase database:update` fails with a generic error on very large updates, so split big writes into batches of about 10k paths.
2. **Upgrade dependencies:** React 18 → 19, ESLint 8 → 9 with a flat config (`.eslintrc.cjs` is the legacy format).
3. **Normalize numbers once,** when a world loads, instead of converting at every use (see Data model). TypeScript or JSDoc types for the world schema would help.
4. **Split `Game.js`** (physics, AI, sound, HUD, scripting). Replace the hard-coded tile-ID rules in `iterateTiles` (magma `'m'`, water `'a'`, stone `'s'`) with tile-type properties.
5. **Narrow the script API** so scripts don't get the whole `game` object. `Dialog.say` inserts author text as raw HTML.
6. **Editor performance:**
   - `MyWorlds` downloads every world, with every tile and cursor, just to draw thumbnails.
   - Stale cursors are removed by a random 1% cleanup in `useCursors`; use `onDisconnect()` instead.
7. **Collision order:** in `moveWombat`, once the first overlapping block is resolved, the wombat may no longer overlap the others. So an `onTouch` block processed after a plain block can be skipped entirely.
8. **Smaller items:**
   - Mobile touch controls (`ControlCircle`) are disabled and broken (`Touch` objects have no `offsetX`).
   - `makeButtons` calls hooks inside `.map()`.
   - In `npm run deploy`, `predeploy` builds before `npm version patch` runs, so the deployed build shows the previous version number.

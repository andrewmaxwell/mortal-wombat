# Mortal Wombat

A tile-based platformer (`src/game/`, plain DOM, no framework) and a collaborative React world editor (`src/Components/`), both backed by Firebase Realtime Database. `src/index.js` loads the editor when the URL has `?editor`. Otherwise `gameFrame.js` shows the game in a sandboxed iframe of `play.html` (entry `src/play.js`), and passes the URL's `#…` start config through. Scripts live in `package.json`.

## Data model

- A world is stored at `worlds/<worldId>` with these parts:
  - `world`: tiles keyed `"x_y"`, each `{x, y, tileType, onSpace?, onTouch?, name?, user, tstamp}`, where `user` is the editor's Firebase Auth uid
  - `tileTypes` and `gameConfig`: overrides for the defaults in `src/defaults.js`
  - `lastEditedBy` (uid) and `cursors` (live editor presence, each with a `user` uid). Each editor session removes its cursor with `onDisconnect()`.
- `worldIndex/<worldId>` is a small summary of each world, `{worldName, lastEdited, lastEditedBy, thumbnail}`, so the Worlds pane doesn't download every world (all of `worlds/` is about 19 MB). `saveTile` updates it, and so does `createNewWorld`. `useWorldThumbnail` re-renders the PNG `thumbnail` while someone edits, and the pane fills in a missing one. Code that writes world metadata has to update both places.
- `/users` is keyed by uid: `{[uid]: {name, email}}`. Show editors with `editorName(userIndex, uid)`. `worlds/` is public, so never store emails there.
- Worlds only store overrides. Both the game and the editor combine them with the defaults using `mergeDeepLeft(overrides, defaults)`.
- `tileType` is a tile type's short `id` (`'g'` grass, `'w'` wombat, `'m'` magma, …), not its key in `tileTypes`. The wombat tile only marks the spawn point, and `Game.load` removes it from the world.
- Access rules live in `database.rules.json`, which must match what's live. Deploy with `npx firebase deploy --only database`, and check `npx firebase database:get /.settings/rules` afterwards. Anyone can read `worlds/` and `worldIndex/`, and signed-in users can write to each world and its index entry. The rules also require any `user`/`lastEditedBy` being written to equal the writer's `auth.uid`. Only signed-in users can read `/users`, and nobody can write it from the app (profiles are edited in the Firebase console, keyed by the editor's uid from Authentication → Users). `listen()` in `firebase.js` shows read errors in the editor's error banner, so a hook that reads a protected path must wait for `user` (see `useUserIndex`). Otherwise logged-out visitors see a `permission_denied` banner.
- **Numbers are stored as strings** because the editor saves raw `<input>` values: `"0.005"`, and `""` when a field is cleared. `Game.load` converts them once with `normalizeWorld` (`src/worldSchema.js`, which also has JSDoc types for the schema), so engine code and tile scripts only see numbers. A blank game-config number becomes its default. A blank tile-type number becomes `0`, except `moveDelay`, which stays `undefined` (never moves), while `0` means it moves every frame. The editor keeps the raw strings. A new numeric field has to go in `worldSchema.js`'s key lists as well as the editor, and a test checks that they match. Tile-type `id`s can look numeric (`"10"`) but stay strings.

## Engine rules

- Physics constants are per tick. `main.js` runs a fixed 60 ticks/sec, so any tuning has to assume that rate.
- Input comes from `Controls` (keyboard), `GamepadControls` and `TouchControls`, merged through `getPressing`. `main.js` reads them only on frames that run a tick.
- `Game.iterate` = `moveWombat` (the player, in `wombat.js`) then `iterateTiles` (falling, liquid and patrol movement, and reactions, in `tiles.js`), then `frame++`. `Game.js` holds the world state, loading, the HUD stats (health, poop, collectibles) and the methods tile scripts call. Sounds live in `sounds.js`, and running tile scripts in `compile.js`. Helpers in `wombat.js` and `tiles.js` take `game` as their first argument. Keep script-facing methods on `Game`, since scripts reach them through `game`.
- Tile behavior comes from tile-type properties, not tile IDs. Magma's defaults are `burns` (destroys touching tiles that have HP), plus `reactsWith: 'a'` and `reactsInto: 's'` (touching water consumes the water and turns the magma to stone). Any tile type can use these properties. A tile acts every `moveDelay` frames, or every frame if it reacts but has no `moveDelay`.
- The wombat is on the ground (`you.onGround`) when `getSupports()` finds solid blocks directly below it and its y is a whole number. While grounded, it gets no gravity, can jump, and the blocks it stands on count as touched every frame. Liquids and collectibles don't count as ground. Neither do blocks that hurt: the wombat keeps falling into those every other frame, so they keep damaging it. `processOnTouch` still allows a short grace window for contact that bounces.
- Tile scripts (`onSpace`/`onTouch`) are author-written JS compiled with `new Function` in `compile.js`. The helpers they can use are the ones defined in `wrapScript` (`src/scriptTemplate.js`), and `TileLogic.jsx` shows examples to authors, so keep the two in sync. The editor uses `scriptSyntaxError` from the same file to show syntax errors under the script fields. In the game, syntax errors and errors thrown by scripts (including their `choice` and `setTimeout`/`setInterval` callbacks, which the template wraps) go to `Game.reportScriptError`, which lists them in the top-right corner instead of stopping the tick.
- **World scripts run only in the sandbox.** The iframe has `sandbox="allow-scripts"` and no `allow-same-origin`, so its origin is `'null'` and scripts can't read the editor's Firebase login. `play.js` starts the game only when `window.origin === 'null'`, and otherwise redirects to `/`. Keep game code out of the editor bundle and editor/auth code out of the game (auth lives in `src/auth.js`).
- Inside the sandbox, browser storage is unavailable. The database SDK treats that as "WebSockets failed before" and falls back to long polling, which the sandbox breaks, so `play.js` calls `forceWebSockets()` first. Script requests from the sandbox arrive with `Origin: null`: GitHub Pages allows any origin, and `vite.config.js` allows `null` for the dev and preview servers.

## Verifying changes

- `npm test` (Vitest + jsdom) covers the engine. The tests mock `../firebase` and build worlds inline. Add a test here when fixing engine behavior.
- To check the game in a browser, run `npm start` and open `localhost:3000` (the default world loads from the live DB and is read-only). Browsers pause `requestAnimationFrame` in hidden tabs, so an automated browser that isn't in the foreground shows a frozen game. Browser-automation console and network tools don't see inside the game's iframe, and the outer page can't reach into it: to debug the game, have it `parent.postMessage` its errors temporarily, or check with screenshots.
- Automated input is unreliable in the game's iframe. Automated clicks reach it, but automated drags don't arrive at all. A synthetic key press releases before the next tick, so the game never sees it. Touch taps are latched until a tick reads them (`touchControls.js`), so a click on a touch button does register. The touch controls only appear on touch screens, so force them on temporarily to check them on a desktop.
- The editor needs a login. The only way to create accounts is the Firebase console, so editor changes past the login screen need the user to test them.
- The dev server must stay on port 3000: `firebase.js` exposes `window._update` only on `localhost:3000`.

## Backups

- `.github/workflows/backup.yml` downloads `worlds/` every day (it's public, so no credentials) and keeps it as a workflow artifact, `worlds-YYYY-MM-DD`, for 90 days. It doesn't back up `/users`, and `worldIndex/` can be rebuilt from `worlds/`. It fails, and GitHub emails the owner, if the download is empty. Run it by hand with `gh workflow run backup.yml`.
- To restore a world, run `gh run download --name worlds-YYYY-MM-DD --dir backups` and then `node scripts/restoreWorld.js backups/worlds.json.gz <worldId>`. That only compares the backup with the live world. Add `--yes` to restore it. The script first saves the live world to `backups/` (gitignored), then resets the world's `worldIndex` entry so the Worlds pane re-renders its thumbnail.
- `npx firebase database:update` fails with a generic error on very large updates, so split big writes into batches of about 10k paths.

## Known issues / TODO

Ordered by priority. Remove an entry once it's done.

1. **Narrow the script API** so scripts don't get the whole `game` object. `Dialog.say` inserts author text as raw HTML.
2. **Smaller items:**
   - `makeButtons` calls hooks inside `.map()`.
   - ESLint 9 is end-of-life. Move to 10 once `eslint-plugin-react` and `eslint-plugin-import` list it in their peer dependencies.

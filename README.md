# Mortal Wombat

A tile-based platformer where you play a wombat who digs, eats, swims and poops through worlds that anyone with an editor account can build together, live.

- **Play:** https://mortalwombat.app/
- **Edit worlds:** https://mortalwombat.app/?editor

## Playing

| Action | Keyboard | Touch |
| --- | --- | --- |
| Move | A / D | direction pad |
| Jump (swim up in water) | W | jump |
| Swim down | S | direction pad |
| Dig, eat or talk to what you're facing | Space | dig |
| Poop (a block you can stand on) | P | 💩 |
| Start over | R | tap "you dead" |

Gamepads work too. Eating restores health and fills your poop meter, digging breaks blocks, and falls, magma and some other blocks hurt. Some tiles talk to you, give you choices, or take you to another world.

## Building worlds

Editors are created in the Firebase console, so ask for an account. In the editor:

- Pick a tile type in the bottom bar, then click or drag on the map to place it. Shift+click deletes.
- Ctrl/Cmd+Z undoes your last click or drag, and Ctrl/Cmd+Shift+Z redoes it.
- Move around with WASD or the arrow keys, and zoom with the buttons in the top right.
- Alt+click a spot to play-test from there in a new tab. That tab's URL starts other players at the same spot.
- Everyone editing a world sees each other's cursors and changes as they happen.

Each world can override the defaults for its tile types (**Tile Config**: images, sounds, HP, whether a tile falls, flows, patrols, burns, can be eaten or collected…) and for the game (**World Config**: gravity, jump power, health, background…). You can also add new tile types with the **+** button.

### Tile scripts

With the **None** tile type selected, double-click a placed tile to give it a name and JavaScript to run when the wombat presses Space at it (**On Space**) or touches it (**On Touch**):

```js
say('Want a snack?');
choice('Yes please', () => setHealth(100));
choice('No thanks');
```

Scripts can show dialog, play sounds, move, add and remove tiles, change health and poop, count collectibles, and `jumpTo` another world. The editor lists more examples under **Tile Logic Examples**. Syntax errors show up under the script field, and errors while playing show up in the top-right corner of the game.

## Development

```sh
npm install
npm start      # http://localhost:3000 (it must stay on port 3000)
npm test       # Vitest, mostly the game engine
npm run lint
```

`localhost:3000` plays the default world from the live database, and `localhost:3000/?editor` opens the editor, which needs a login.

- `src/game/` is the game: plain DOM and a fixed 60 ticks/sec loop. It runs in a sandboxed iframe (`play.html`) so world scripts can't reach editors' logins.
- `src/Components/` is the editor, in React.
- Worlds live in Firebase Realtime Database. Access rules are in `database.rules.json`.

[CLAUDE.md](CLAUDE.md) has the details: the data model, engine rules, the script sandbox, and how to test changes.

## Deploying

Every push to `main` deploys to GitHub Pages if lint and tests pass ([deploy.yml](.github/workflows/deploy.yml)). Database rules deploy separately, with `npx firebase deploy --only database`.

## Backups

All worlds are backed up every day and kept for 90 days ([backup.yml](.github/workflows/backup.yml)). [CLAUDE.md](CLAUDE.md#backups) explains how to restore one.

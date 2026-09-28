// Restores one world from a backup made by .github/workflows/backup.yml.
//   gh run download <run-id> --dir backups     (or `gh run download --name worlds-YYYY-MM-DD`)
//   node scripts/restoreWorld.js backups/worlds.json.gz <worldId>         shows what would change
//   node scripts/restoreWorld.js backups/worlds.json.gz <worldId> --yes   restores it
// Before writing, the world's current data is saved to backups/ (gitignored), so a restore can be undone.
import {execFileSync} from 'node:child_process';
import {mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {gunzipSync} from 'node:zlib';

const firebase = (...args) =>
  execFileSync('npx', ['firebase', ...args], {
    encoding: 'utf8',
    maxBuffer: 1024 ** 3,
    stdio: ['ignore', 'pipe', 'inherit'],
  });

const describe = (label, data) => {
  const tiles = Object.keys(data?.world || {}).length;
  const edited = data?.lastEdited
    ? new Date(data.lastEdited).toISOString()
    : 'never';
  console.log(
    `${label}: ${JSON.stringify(data?.worldName)}, ${tiles} tiles, last edited ${edited} by ${data?.lastEditedBy}`,
  );
};

const [backupPath, worldId, flag] = process.argv.slice(2);
if (!backupPath || !worldId) {
  console.error(
    'usage: node scripts/restoreWorld.js <worlds.json[.gz]> <worldId> [--yes]',
  );
  process.exit(1);
}

let raw = readFileSync(backupPath);
if (backupPath.endsWith('.gz')) raw = gunzipSync(raw);
const backup = JSON.parse(raw)?.[worldId];
if (!backup) {
  console.error(`World ${worldId} isn't in ${backupPath}`);
  process.exit(1);
}
// cursors are live presence, not content
const {cursors: _, ...restored} = backup;

const current = JSON.parse(firebase('database:get', `/worlds/${worldId}`));
describe('backup ', restored);
describe('current', current);

if (flag !== '--yes') {
  console.log('Nothing written. Add --yes to restore the backup.');
  process.exit(0);
}

mkdirSync('backups', {recursive: true});
const savedPath = `backups/${worldId.replace(':', '_')}-before-restore-${Date.now()}.json`;
writeFileSync(savedPath, JSON.stringify(current));
console.log(`Saved the current world to ${savedPath}`);

const worldFile = join(tmpdir(), `restore-${Date.now()}.json`);
writeFileSync(worldFile, JSON.stringify(restored));
firebase('database:set', `/worlds/${worldId}`, worldFile, '--force');

// null removes the thumbnail, so the Worlds pane re-renders it from the restored tiles
const index = {thumbnail: null};
for (const key of ['worldName', 'lastEdited', 'lastEditedBy']) {
  if (restored[key] !== undefined) index[key] = restored[key];
}
const indexFile = join(tmpdir(), `restore-index-${Date.now()}.json`);
writeFileSync(indexFile, JSON.stringify(index));
firebase('database:update', `/worldIndex/${worldId}`, indexFile, '--force');

console.log(`Restored ${worldId}.`);

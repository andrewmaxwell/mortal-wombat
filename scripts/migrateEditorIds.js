// One-off migration (2026-09): replace editor emails in the database with Firebase Auth uids.
//
//   node scripts/migrateEditorIds.js <db-export.json> <email-to-uid.json> <out-update.json>
//
// Reads a full export (`npx firebase database:get /`) and an {email: uid} map, and writes a
// single multi-path update for `npx firebase database:update / <out-update.json>`, which
// applies atomically. Nothing here talks to Firebase.
import {readFileSync, writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';

const isEmail = (v) => typeof v === 'string' && v.includes('@');

export const migrate = (db, emailToUid) => {
  const uidFor = (email) => emailToUid[email.toLowerCase()];
  const updates = {};
  const unmapped = new Set();
  const stats = {tiles: 0, worlds: 0, cursorsRemoved: 0, users: 0};

  const toUid = (path, value) => {
    if (!isEmail(value)) return false;
    const uid = uidFor(value);
    if (uid) updates[path] = uid;
    else {
      unmapped.add(value.toLowerCase());
      updates[path] = null; // no account: drop the email rather than keep it public
    }
    return true;
  };

  for (const [worldId, world] of Object.entries(db.worlds || {})) {
    for (const [key, tile] of Object.entries(world.world || {})) {
      if (toUid(`worlds/${worldId}/world/${key}/user`, tile.user)) stats.tiles++;
    }
    if (toUid(`worlds/${worldId}/lastEditedBy`, world.lastEditedBy))
      stats.worlds++;
    // cursors are live presence that expires; clear them instead of rewriting
    const cursors = Object.keys(world.cursors || {}).length;
    if (cursors) {
      updates[`worlds/${worldId}/cursors`] = null;
      stats.cursorsRemoved += cursors;
    }
  }

  // /users: from a list of {email, name} to {[uid]: {email, name}}
  const users = {};
  for (const user of Object.values(db.users || {})) {
    const uid = isEmail(user.email) && uidFor(user.email);
    if (uid) users[uid] = user;
    else unmapped.add(String(user.email).toLowerCase());
  }
  stats.users = Object.keys(users).length;
  updates.users = users;

  return {updates, stats, unmapped: [...unmapped]};
};

// Applies a multi-path update to a plain object, the way the database would.
export const applyUpdates = (db, updates) => {
  const copy = structuredClone(db);
  for (const [path, value] of Object.entries(updates)) {
    const keys = path.split('/');
    const last = keys.pop();
    let node = copy;
    for (const k of keys) node = node[k] ??= {};
    if (value === null) delete node[last];
    else node[last] = value;
  }
  return copy;
};

// Every string under `node` that looks like an email, with its path.
export const findEmails = (node, path = '') => {
  if (isEmail(node)) return [path];
  if (!node || typeof node !== 'object') return [];
  return Object.entries(node).flatMap(([k, v]) =>
    findEmails(v, path ? `${path}/${k}` : k),
  );
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const [dbPath, mapPath, outPath] = process.argv.slice(2);
  const db = JSON.parse(readFileSync(dbPath, 'utf8'));
  const emailToUid = JSON.parse(readFileSync(mapPath, 'utf8'));
  const {updates, stats, unmapped} = migrate(db, emailToUid);

  // dry run against the local copy
  const after = applyUpdates(db, updates);
  const tileCount = (d) =>
    Object.values(d.worlds || {}).reduce(
      (n, w) => n + Object.keys(w.world || {}).length,
      0,
    );
  const check = {
    worldsBefore: Object.keys(db.worlds || {}).length,
    worldsAfter: Object.keys(after.worlds || {}).length,
    tilesBefore: tileCount(db),
    tilesAfter: tileCount(after),
    emailsLeftUnderWorlds: findEmails(after.worlds).length,
  };

  writeFileSync(outPath, JSON.stringify(updates), {mode: 0o600});
  console.log(
    JSON.stringify(
      {
        stats,
        unmappedCount: unmapped.length,
        updatePaths: Object.keys(updates).length,
        check,
      },
      null,
      2,
    ),
  );
}

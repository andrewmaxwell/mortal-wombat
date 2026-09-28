import {expect, test} from 'vitest';
import {applyUpdates, findEmails, migrate} from './migrateEditorIds';

const db = {
  users: [
    {email: 'Ann@example.com', name: 'Ann'},
    {email: 'bob@example.com', name: 'Bob'},
    {email: 'gone@example.com', name: 'No account'},
  ],
  worlds: {
    w1: {
      worldName: 'One',
      lastEditedBy: 'bob@example.com',
      world: {
        '0_0': {x: 0, y: 0, tileType: 'g', user: 'ann@example.com', tstamp: 1},
        '1_0': {x: 1, y: 0, tileType: 's', user: 'BOB@example.com', tstamp: 2},
        '2_0': {x: 2, y: 0, tileType: 's'},
        '3_0': {x: 3, y: 0, tileType: 'g', user: 'stranger@example.com'},
      },
      cursors: {s1: {user: 'ann@example.com', mouseX: 1}},
    },
    w2: {worldName: 'Empty'},
  },
};
const emailToUid = {'ann@example.com': 'uidAnn', 'bob@example.com': 'uidBob'};

test('replaces emails with uids, case-insensitively', () => {
  const after = applyUpdates(db, migrate(db, emailToUid).updates);
  expect(after.worlds.w1.world['0_0'].user).toBe('uidAnn');
  expect(after.worlds.w1.world['1_0'].user).toBe('uidBob');
  expect(after.worlds.w1.lastEditedBy).toBe('uidBob');
});

test('keeps everything else about tiles and worlds', () => {
  const after = applyUpdates(db, migrate(db, emailToUid).updates);
  expect(after.worlds.w1.world['0_0']).toEqual({
    x: 0,
    y: 0,
    tileType: 'g',
    user: 'uidAnn',
    tstamp: 1,
  });
  expect(after.worlds.w1.world['2_0']).toEqual(db.worlds.w1.world['2_0']);
  expect(after.worlds.w1.worldName).toBe('One');
  expect(after.worlds.w2).toEqual(db.worlds.w2);
});

test('leaves no emails under worlds and clears cursors', () => {
  const {updates, unmapped} = migrate(db, emailToUid);
  const after = applyUpdates(db, updates);
  expect(findEmails(after.worlds)).toEqual([]);
  expect(after.worlds.w1.cursors).toBeUndefined();
  // an author with no account loses the author field instead of keeping the email
  expect(after.worlds.w1.world['3_0'].user).toBeUndefined();
  expect(unmapped.sort()).toEqual(['gone@example.com', 'stranger@example.com']);
});

test('re-keys /users by uid', () => {
  const after = applyUpdates(db, migrate(db, emailToUid).updates);
  expect(after.users).toEqual({
    uidAnn: {email: 'Ann@example.com', name: 'Ann'},
    uidBob: {email: 'bob@example.com', name: 'Bob'},
  });
});

test('does not modify the input', () => {
  const before = structuredClone(db);
  applyUpdates(db, migrate(db, emailToUid).updates);
  expect(db).toEqual(before);
});

import {defaultGameConfig, defaultTileTypes} from '../defaults';
import {defaultWorldId, loadItem} from '../firebase';
import {isGuid} from '../utils';
import {mergeDeepLeft} from '../utils/mergeDeepLeft';
import {compile} from './compile';
import {Game} from './Game';

export const load = async (rootElement) => {
  let hashConfig;
  if (location.hash.length > 1) {
    try {
      hashConfig = JSON.parse(atob(location.hash.slice(1)));
    } catch (e) {
      console.log('bad hash', e);
    }
  }

  const worldId = isGuid(hashConfig?.worldId)
    ? hashConfig.worldId
    : defaultWorldId;

  const w = await loadItem(`worlds/${worldId}`);

  const {world} = w;
  const tileTypes = mergeDeepLeft(w.tileTypes, defaultTileTypes);
  const gameConfig = mergeDeepLeft(w.gameConfig, defaultGameConfig);

  const typeIndex = {};
  let you;
  for (const type of Object.values(tileTypes)) {
    typeIndex[type.id] = type;
  }
  for (const key in world) {
    const {x, y, tileType, onSpace} = world[key];
    if (tileType === 'w') {
      you = {x, y};
      delete world[key];
    } else if (typeIndex[tileType]) {
      world[key] = {x, y, type: typeIndex[tileType], onSpace: compile(onSpace)};
    } else {
      delete world[key];
    }
  }

  if (hashConfig?.x !== undefined && hashConfig?.y !== undefined) {
    you.x = hashConfig.x;
    you.y = hashConfig.y;
  }

  return new Game(you, world, gameConfig, typeIndex, rootElement);
};

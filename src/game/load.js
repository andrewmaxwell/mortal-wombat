import {defaultWorldId, loadData} from '../firebase';
import {isGuid} from '../utils';
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

  const worldKey = `worlds/${
    isGuid(hashConfig?.worldId) ? hashConfig.worldId : defaultWorldId
  }/world`;

  const data = await loadData(['tileTypes', worldKey, 'gameConfig']);

  const {tileTypes, gameConfig} = data;
  const world = data[worldKey];

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

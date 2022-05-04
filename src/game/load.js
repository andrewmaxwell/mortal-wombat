import {loadData} from '../firebase';
import {Game} from './Game';

export const load = async () => {
  const {tileTypes, world, gameConfig} = await loadData([
    'tileTypes',
    'world',
    'gameConfig',
  ]);

  const typeIndex = {};
  let you;
  for (const type of Object.values(tileTypes)) {
    typeIndex[type.id] = type;
  }
  for (const key in world) {
    const {x, y, tileType} = world[key];
    if (tileType === 'w') {
      you = {x, y};
      delete world[key];
    } else if (typeIndex[tileType]) {
      world[key] = {x, y, type: typeIndex[tileType]};
    } else {
      delete world[key];
    }
  }

  if (location.hash.length > 1) {
    try {
      you = JSON.parse(atob(location.hash.slice(1)));
    } catch (e) {
      console.log('bad hash', e);
    }
  }

  return new Game(you, world, gameConfig, typeIndex);
};

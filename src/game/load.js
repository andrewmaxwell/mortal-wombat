import {defaultWorldId} from '../firebase';
import {isGuid} from '../utils';
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

  const game = new Game(rootElement);
  return await game.load(worldId, hashConfig);
};

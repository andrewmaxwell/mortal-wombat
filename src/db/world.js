import {update} from '../firebase';

export const placeTile = (x, y, id, onError) =>
  update({[`world/${x}_${y}`]: id ? {x, y, tileType: id} : null}, onError);

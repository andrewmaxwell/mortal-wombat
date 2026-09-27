import {saveTile} from '../utils/saveTile';
import {Code, FormThing} from './common/FormThing';
import './tileLogic.css';

const fields = [
  {
    prop: 'name',
    label: 'Name',
    type: 'text',
    info: 'Name to use to easily refer to tile.',
  },
  {
    prop: 'onSpace',
    label: 'On Space',
    type: 'code',
    info: 'What should happen when you press space at it?',
  },
  {
    prop: 'onTouch',
    label: 'On Touch',
    type: 'code',
    info: 'What should happen when you collide with this tile?',
  },
];

const examples = `
// to show the player some text:
say('hello!');

// to give the player some choices after their text:
say('what do you want to do?');
choice('replenish health', () => setHealth(100));
choice('lose health', () => setHealth(1));

// to play a sound:
playSound('https://static.heironimus.info/sound/PinkFast.ogg');

// to pause the sound:
pauseSound('https://static.heironimus.info/sound/PinkFast.ogg');

// to loop the sound:
loopSound('https://static.heironimus.info/sound/PinkFast.ogg');

// to jump to a different world:
jumpTo('l36gx6hi:xbmqfbeqyfr');
// To get a world's id, go to the world in the editor and it's 
// between the # and the first / in the page URL

// to set poop:
setPoop(100);

// to set health:
setHealth(100);

// to move a tile
moveTile(4, -15, 1, 0); // tile x, tile y, move amount x, move amount y
// this moves the tile at (4, -15) one tile to the right and 0 tiles down.

`.trim();

export const TileLogic = ({tile, worldId, onError}) => (
  <div className="tileLogic">
    <FormThing
      fields={fields}
      data={tile}
      onChange={(value, prop) => {
        saveTile(worldId, {...tile, [prop]: value}, onError);
      }}
    />
    <details>
      <summary>Tile Logic Examples</summary>
      <Code value={examples} />
    </details>
  </div>
);

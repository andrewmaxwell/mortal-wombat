import {saveTile} from '../utils/saveTile';
import {FormThing} from './common/FormThing';

const fields = [
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

export const TileLogic = ({tile, worldId, onError}) => (
  <>
    <FormThing
      fields={fields}
      data={tile}
      onChange={(value, prop) => {
        saveTile(worldId, {...tile, [prop]: value}, onError);
      }}
    />
  </>
);

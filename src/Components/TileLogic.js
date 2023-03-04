import {saveTile} from '../utils/saveTile';
import {FormThing} from './common/FormThing';
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

export const TileLogic = ({tile, worldId, onError}) => (
  <div className="tileLogic">
    <FormThing
      fields={fields}
      data={tile}
      onChange={(value, prop) => {
        saveTile(worldId, {...tile, [prop]: value}, onError);
      }}
    />
  </div>
);

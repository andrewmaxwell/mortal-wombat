import {useEffect, useState} from 'react';
import {listen, updateWithHistory} from '../firebase';
import {FormThing} from './FormThing';
import './gameConfig.css';

const useConfig = (onError) => {
  const [config, setConfig] = useState();
  useEffect(() => listen('gameConfig', setConfig, onError), []);
  return config;
};

const fields = [
  {
    prop: 'digSpeed',
    label: 'Wombat Digging Speed',
    type: 'number',
    info: 'How fast much can you dig in one frame?',
  },
  {
    prop: 'eatSpeed',
    label: 'Wombat Eating Speed',
    type: 'number',
    info: 'How fast much can you eat in one frame?',
  },
  {
    prop: 'gravity',
    label: 'Gravity',
    type: 'number',
    info: 'How strong is gravity?',
  },
  {
    prop: 'health',
    label: 'Wombat Starting Health',
    type: 'number',
    info: 'How much health do you start with?',
  },
  {
    prop: 'jumpPower',
    label: 'Wombat Jumping Power',
    type: 'number',
    info: 'How much jumping power do you start with?',
  },
  {
    prop: 'moveSpeed',
    label: 'Wombat Walking Speed',
    type: 'number',
    info: 'How fast can you move?',
  },
  {
    prop: 'moveDeceleration',
    label: 'Wombat Deceleration',
    type: 'number',
    info: 'How fast can you slow down?',
  },
  {
    prop: 'magmaDelay',
    label: 'Magma Delay',
    type: 'number',
    info: 'Number of frames between magma movements',
  },
];

export const GameConfig = ({onError, user}) => {
  const config = useConfig(onError);
  return (
    <div className="gameConfig">
      <FormThing
        fields={fields}
        data={config}
        onChange={(value, prop) => {
          updateWithHistory({[`gameConfig/${prop}`]: value}, user, onError);
        }}
      />
    </div>
  );
};

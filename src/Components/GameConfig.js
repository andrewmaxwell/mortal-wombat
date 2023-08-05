import {useEffect, useState} from 'react';
import {defaultGameConfig} from '../defaults';
import {listen, update} from '../firebase';
import {FormThing} from './common/FormThing';
import {gameConfigFields} from './GameConfigFields';
import './gameConfig.css';

const useConfig = (worldId, onError) => {
  const [config, setConfig] = useState();
  useEffect(
    () => listen(`worlds/${worldId}/gameConfig`, setConfig, onError),
    []
  );
  return config;
};

export const GameConfig = ({worldId, onError}) => {
  const config = useConfig(worldId, onError);

  const callOnFieldChange = (value, prop) => {
    const fieldChanged = gameConfigFields.find((field) => field.prop === prop);
    if (fieldChanged && typeof fieldChanged.onFieldChange === 'function')
      fieldChanged.onFieldChange(value);
  };

  const onConfigValueChange = (value, prop) => {
    update({[`worlds/${worldId}/gameConfig/${prop}`]: value}, onError);
    callOnFieldChange(value, prop);
  };

  return (
    <div className="gameConfig">
      <FormThing
        fields={gameConfigFields}
        data={config}
        defaults={defaultGameConfig}
        onChange={onConfigValueChange}
      />
    </div>
  );
};

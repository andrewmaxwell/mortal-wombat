import React, {useEffect, useRef, useState} from 'react';
import {read, utils} from 'xlsx';
import {Editor} from './Editor/Editor';
import {init} from './game/mortalWombat';
import {graphicStrToCanvas} from './utils/graphicStrToCanvas';

const publishedUrl =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vRHkI16kUEmaAhMhl0-xVDHUwx2Z63hXs-xEMNaFh24zjvRmtw1BApV0iBJYl1CXR_dYsT3YBoyR-K3/pub?output=xlsx';

const getData = async (setState) => {
  const response = await fetch(publishedUrl);
  const data = read(await response.arrayBuffer()).Sheets;
  setState({
    tiles: Object.fromEntries(
      utils
        .sheet_to_json(data.Tiles)
        .map(({id, description, graphic}) => [
          id,
          {id, description, graphic, ...graphicStrToCanvas(graphic)},
        ])
    ),
    world: utils.sheet_to_json(data.World, {header: 1}),
  });
};

const GameElement = ({initialState}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!initialState) return;
    init({canvas: canvasRef.current, initialState});
  }, [initialState]);

  return <canvas ref={canvasRef} />;
};

export const App = () => {
  const [state, setState] = useState();

  useEffect(() => {
    getData(setState);
  }, []);

  return (
    <>
      <div
        style={{position: 'fixed', top: 0, left: 0, right: '25%', bottom: 0}}
      >
        <GameElement initialState={state} />
      </div>
      <div
        style={{position: 'fixed', top: 0, left: '75%', right: 0, bottom: 0}}
      >
        <Editor initialState={state} />
      </div>
    </>
  );
};

import React, {useEffect, useRef, useState} from 'react';
import {Editor} from './Editor/Editor';
import {init} from './game/mortalWombat';
import './App.css';
import {getData} from './getData';
import {graphicToCanvas} from './utils/graphicToCanvas';

const GameElement = ({initialState}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (initialState) init({canvas: canvasRef.current, initialState});
  }, [initialState]);

  return <canvas ref={canvasRef} />;
};

export const App = () => {
  const [state, setState] = useState();

  useEffect(() => {
    getData().then((data) => {
      for (const t of Object.values(data.tiles)) {
        t.canvas = graphicToCanvas(t.graphic);
        t.dataURL = t.canvas.toDataURL();
      }
      setState(data);
    });
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

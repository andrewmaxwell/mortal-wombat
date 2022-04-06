import React, {useEffect, useRef} from 'react';
import {createRoot} from 'react-dom/client';
import {Editor} from './Editor/Editor';
import {init} from './game/main';
// import reportWebVitals from './reportWebVitals';

const Game = () => {
  const canvasRef = useRef(null);
  useEffect(() => init(canvasRef.current), []);
  return <canvas ref={canvasRef} />;
};

const container = document.querySelector('#root');
createRoot(container).render(
  <React.StrictMode>
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: '25%',
        bottom: 0,
        background: '#222',
      }}
    >
      <Game />
    </div>
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: '75%',
        right: 0,
        bottom: 0,
        background: '#EEE',
      }}
    >
      <Editor />
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

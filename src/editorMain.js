import React from 'react';
import {createRoot} from 'react-dom/client';
import {App} from './Components/App';
import './index.css';

document.title = 'Mortal Wombat Editor';

createRoot(document.querySelector('#root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

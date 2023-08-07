import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {App} from './Components/App';

document.title = 'Mortal Wombat Editor';

createRoot(document.querySelector('#root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

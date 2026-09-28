import {forceWebSockets} from 'firebase/database';
import './index.css';

// Only run inside the sandboxed frame from gameFrame.js, where the origin is opaque ('null').
// Opened directly, or framed without the sandbox, world scripts would share this site's origin.
if (window.origin === 'null') {
  // Without storage the database SDK assumes WebSockets failed before and falls back to
  // long polling, which needs same-origin iframe access that the sandbox blocks.
  forceWebSockets();
  import('./game/main.js');
} else if (window === window.top) {
  location.replace('/' + location.hash);
} else {
  document.body.textContent = 'Play Mortal Wombat at https://mortalwombat.app/';
}

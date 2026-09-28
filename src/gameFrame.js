// World scripts (onSpace/onTouch) are arbitrary JS written by any editor. The game runs in
// an iframe sandboxed without allow-same-origin, which gives it an opaque origin: scripts
// there can't read this site's storage, where the editor keeps its Firebase login.
const frame = document.createElement('iframe');
frame.className = 'gameFrame';
frame.src = '/play.html' + location.hash;
frame.setAttribute('sandbox', 'allow-scripts');
frame.allow = 'autoplay *; gamepad *';
document.body.append(frame);

// the game pauses unless its own document has focus
const focusGame = () => frame.focus();
frame.addEventListener('load', focusGame);
window.addEventListener('focus', focusGame);

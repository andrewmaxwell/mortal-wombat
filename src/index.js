import './index.css';
if (location.search === '?editor') import('./editorMain.js');
else import('./game/main.js');

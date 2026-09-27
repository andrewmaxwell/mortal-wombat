import './index.css';
if (location.search === '?editor') import('./editorMain.jsx');
else import('./game/main.js');

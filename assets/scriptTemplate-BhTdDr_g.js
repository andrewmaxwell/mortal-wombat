import{a as e,c as t,f as n,i as r,l as i,o as a,r as o,s,t as c,u as l,v as u,y as d}from"./index.esm-b9Qad1XC.js";var f=(e,t)=>{let n={...t};return delete n[e],n},p=()=>Date.now().toString(36)+`:`+Math.random().toString(36).slice(2),m=e=>/^[0-9a-z]{8,}:[0-9a-z]+$/.test(e),h=(e,t)=>{let n={};for(let r of t)n[e(r)]=r;return n},g=(e={})=>Object.entries(e).map(([e,t])=>({key:e,...t})),_=(e,t)=>{let n,r=(...r)=>{clearTimeout(n),n=setTimeout(()=>e(...r),t)};return r.cancel=()=>clearTimeout(n),r},v=(e,t)=>{let n,r=!1,i,a=(...o)=>{if(r){i=o;return}r=!0,n=setTimeout(()=>{e(...o),r=!1,i&&a(...i),i=void 0},t)};return a.cancel=()=>clearTimeout(n),a};d(`firebase`,`12.19.0`,`app`),u({apiKey:`AIzaSyBEserPzSUos4MT3XRO8NKAO2oVk1-LS-I`,authDomain:`mortal-wombat-8c76a.firebaseapp.com`,projectId:`mortal-wombat-8c76a`,storageBucket:`mortal-wombat-8c76a.appspot.com`,messagingSenderId:`929181149015`,appId:`1:929181149015:web:33a7f450bcdbb06ae64012`,measurementId:`G-JL6HCMYYBS`});var y=r(),b=l(y),x=`l5ybd0mu:2x3xfrsom4h`,S=(e,t)=>{let r=e=>{console.error(e),t?.(e.message)};try{return n(b,e).catch(r)}catch(e){r(e)}};location.host===`localhost:3000`&&(window._update=async e=>await n(b,e));var C=(e,n)=>t(l(y,e)).remove().catch(e=>{console.error(e),n?.(e.message)}),w=async e=>(await o(c(b,e))).val(),T=(e,t,n)=>{let r=e=>{console.error(e),n?.(e.message)};try{return i(l(y,e),e=>t(e.val()||{}),r)}catch(e){r(e)}},E=(t,n,r)=>{let i=l(y,t),o,c=(e,t)=>{o||(o={},queueMicrotask(()=>{let e=o;o=void 0,n(e)})),o[e]=t},u=!1,d=e=>{u||(u=!0,console.error(e),r?.(e.message))},f=[e(i,e=>c(e.key,e.val()),d),a(i,e=>c(e.key,e.val()),d),s(i,e=>c(e.key,null),d)];return()=>{for(let e of f)e();o={}}},D={airDrag:`0.001`,digSpeed:`0.05`,eatSpeed:`0.05`,fallDamageMin:`0.3`,fallDamageMult:`100`,fallDamageSound:`https://static.heironimus.info/sound/Thud.ogg`,gameOverSound:`https://static.heironimus.info/sound/YouDead.ogg`,gravity:`0.005`,health:`100`,jumpPower:`0.111`,maxHealth:`100`,maxPoop:`10`,moveDeceleration:`0.2`,moveSpeed:`0.0222`,poop:`0`,swimPower:`0.008`,waterDrag:`0.1`,backgroundUrl:`https://i.ibb.co/ZLjf3Jb/imgonline-com-ua-Texture-Seamless-ef-Gzuxvyq-GO67.jpg`},O={0:{color:`green`,diggable:!0,edible:!0,healing:`5`,hp:`1`,id:`g`,image:`https://art.pixilart.com/sr2601896d34615.png`,label:`grass`,makePoop:`1`,order:`1`,sound:`https://static.heironimus.info/sound/Chomp.ogg`},1:{color:`saddleBrown`,density:`20`,diggable:!0,healing:`2`,hp:`1`,id:`p`,image:`https://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/b0e07c73f8aa75e.png`,label:`poop`,movable:!0,moveDelay:`2`,order:`2`,sound:`https://static.heironimus.info/sound/SloppyPoopSoft.ogg`},2:{color:`gray`,id:`s`,image:`https://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/0041e8e715b1264.png`,label:`stone`,order:`3`},3:{color:`red`,density:`1.1`,id:`w`,image:`https://static.heironimus.info/image/WombatStanding.gif`,walkingImage:`https://static.heironimus.info/image/WombatStanding.gif`,pushingImage:`https://static.heironimus.info/image/WombatPushing.gif`,jumpingImage:`https://static.heironimus.info/image/WombatJumping.gif`,diggingImage:`https://static.heironimus.info/image/WombatDigger.gif`,crouchingImage:`https://static.heironimus.info/image/WombatBendingDown.gif`,label:`wombat`,order:`4`},4:{burns:!0,color:`orange`,density:`2`,healing:`-0.73`,id:`m`,image:`https://static.heironimus.info/image/magma.gif`,label:`magma`,moveDelay:`30`,moveStyle:`liquid`,order:`5`,reactsInto:`s`,reactsWith:`a`},5:{collectible:!0,color:`cyan`,id:`j`,image:`https://i.ibb.co/m6V89v5/gem.gif`,label:`jewel`,order:`6`,sound:`https://static.heironimus.info/sound/PinkFast.ogg`},6:{color:`purple`,density:`0`,diggable:!0,dropsLoot:`j`,healing:`-0.5`,hp:`2`,id:`k`,image:`https://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/2b956856674265a.png`,label:`Koala`,moveDelay:`25`,moveStyle:`patrol`,order:`7`,sound:`https://static.heironimus.info/sound/Hiss.ogg`},7:{color:`blue`,density:`0.85`,id:`a`,image:`https://static.heironimus.info/image/water.gif`,label:`water`,moveDelay:`15`,moveStyle:`liquid`,order:`8`},8:{color:`#f04dd2`,density:`10`,id:`o`,image:`https://static.heironimus.info/image/polymer.gif`,label:`polymer`,movable:!0,moveDelay:`90`,moveStyle:`liquid`,order:`9`,sound:`https://static.heironimus.info/sound/Boing.ogg`},9:{color:`red`,density:`1`,hp:`1`,id:`n`,image:`https://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/6efea72003769ad.png`,label:`NPC`,moveDelay:`10`,order:`10`},"-1":{color:`black`,id:`_delete`,label:`delete`,order:`0`}},k=(e,t)=>{if(e===void 0)return t;if(t===void 0)return e;if(e&&t&&typeof e==`object`&&typeof t==`object`){let n={};for(let r in{...e,...t})n[r]=k(e[r],t[r]);return n}return e},A=(e,t=`image`)=>{let n=e?.[t]||e?.image;return n?`no-repeat center/contain url(${n})`:e?.color},j=[`game`,`__guard`],M=e=>`
const GRASS = 'g';
const POOP = 'p';
const STONE = 's';
const WOMBAT = 'w';
const MAGMA = 'm';
const JEWEL = 'j';
const KOALA = 'k';
const WATER = 'a';
const POLYMER = 'o';
const NPC = 'n';

const say = game.dialog.say.bind(game.dialog);
const choice = (text, action) =>
  game.dialog.choice(text, typeof action === 'function' ? __guard(action) : action);
const setTimeout = (f, ...args) =>
  window.setTimeout(typeof f === 'function' ? __guard(f) : f, ...args);
const setInterval = (f, ...args) =>
  window.setInterval(typeof f === 'function' ? __guard(f) : f, ...args);
const playSound = game.playSound.bind(game);
const pauseSound = game.pauseSound.bind(game);
const loopSound = game.loopSound.bind(game);
const jumpTo = game.jumpTo.bind(game);

const numCollected = game.numCollected.bind(game);
const setCollectible = game.setCollectible.bind(game);

const setPoop = game.setPoop.bind(game);
const setHealth = game.setHealth.bind(game);

const moveTile = game.moveTile.bind(game);
const addTile = game.addTile.bind(game);
const deleteTile = game.deleteTile.bind(game);
const isEmpty = game.isEmpty.bind(game);
const getTile = game.getTile.bind(game);
const getTileByName = game.getTileByName.bind(game);
const damage = game.damage.bind(game);
const changeTileType = game.changeTileType.bind(game);

const you = game.you;
const poop = game.poop;
const health = game.health;
const namedTiles = game.namedTiles;

${e}`,N=e=>{if(e)try{Function(...j,M(e))}catch(e){return String(e)}};export{h as _,k as a,v as b,x as c,w as d,C as f,p as g,f as h,A as i,T as l,_ as m,N as n,D as o,S as p,M as r,O as s,j as t,E as u,m as v,g as y};
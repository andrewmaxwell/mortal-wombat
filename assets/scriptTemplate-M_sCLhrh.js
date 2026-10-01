import{a as e,g as t,h as n,i as r,l as i,o as a,r as o,s,t as c}from"./index.esm-BrxQMzHF.js";var l=(e,t)=>{let n={...t};return delete n[e],n},u=()=>Date.now().toString(36)+`:`+Math.random().toString(36).slice(2),d=e=>/^[0-9a-z]{8,}:[0-9a-z]+$/.test(e),f=(e,t)=>{let n={};for(let r of t)n[e(r)]=r;return n},p=(e={})=>Object.entries(e).map(([e,t])=>({key:e,...t})),m=(e,t)=>{let n,r=(...r)=>{clearTimeout(n),n=setTimeout(()=>e(...r),t)};return r.cancel=()=>clearTimeout(n),r},h=(e,t)=>{let n,r=!1,i,a=(...o)=>{if(r){i=o;return}r=!0,n=setTimeout(()=>{e(...o),r=!1,i&&a(...i),i=void 0},t)};return a.cancel=()=>clearTimeout(n),a};t(`firebase`,`12.19.0`,`app`),n({apiKey:`AIzaSyBEserPzSUos4MT3XRO8NKAO2oVk1-LS-I`,authDomain:`mortal-wombat-8c76a.firebaseapp.com`,projectId:`mortal-wombat-8c76a`,storageBucket:`mortal-wombat-8c76a.appspot.com`,messagingSenderId:`929181149015`,appId:`1:929181149015:web:33a7f450bcdbb06ae64012`,measurementId:`G-JL6HCMYYBS`});var g=r(),_=s(g),v=`l5ybd0mu:2x3xfrsom4h`,y=(e,t)=>{let n=e=>{console.error(e),t?.(e.message)};try{return i(_,e).catch(n)}catch(e){n(e)}};location.host===`localhost:3000`&&(window._update=async e=>await i(_,e));var b=(t,n)=>e(s(g,t)).remove().catch(e=>{console.error(e),n?.(e.message)}),x=async e=>(await o(c(_,e))).val(),S=(e,t,n)=>{let r=e=>{console.error(e),n?.(e.message)};try{return a(s(g,e),e=>t(e.val()||{}),r)}catch(e){r(e)}},C={airDrag:`0.001`,digSpeed:`0.05`,eatSpeed:`0.05`,fallDamageMin:`0.3`,fallDamageMult:`100`,fallDamageSound:`https://static.heironimus.info/sound/Thud.ogg`,gameOverSound:`https://static.heironimus.info/sound/YouDead.ogg`,gravity:`0.005`,health:`100`,jumpPower:`0.111`,maxHealth:`100`,maxPoop:`10`,moveDeceleration:`0.2`,moveSpeed:`0.0222`,poop:`0`,swimPower:`0.008`,waterDrag:`0.1`,backgroundUrl:`https://i.ibb.co/ZLjf3Jb/imgonline-com-ua-Texture-Seamless-ef-Gzuxvyq-GO67.jpg`},w={0:{color:`green`,diggable:!0,edible:!0,healing:`5`,hp:`1`,id:`g`,image:`https://art.pixilart.com/sr2601896d34615.png`,label:`grass`,makePoop:`1`,order:`1`,sound:`https://static.heironimus.info/sound/Chomp.ogg`},1:{color:`saddleBrown`,density:`20`,diggable:!0,healing:`2`,hp:`1`,id:`p`,image:`https://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/b0e07c73f8aa75e.png`,label:`poop`,movable:!0,moveDelay:`2`,order:`2`,sound:`https://static.heironimus.info/sound/SloppyPoopSoft.ogg`},2:{color:`gray`,id:`s`,image:`https://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/0041e8e715b1264.png`,label:`stone`,order:`3`},3:{color:`red`,density:`1.1`,id:`w`,image:`https://static.heironimus.info/image/WombatStanding.gif`,walkingImage:`https://static.heironimus.info/image/WombatStanding.gif`,pushingImage:`https://static.heironimus.info/image/WombatPushing.gif`,jumpingImage:`https://static.heironimus.info/image/WombatJumping.gif`,diggingImage:`https://static.heironimus.info/image/WombatDigger.gif`,crouchingImage:`https://static.heironimus.info/image/WombatBendingDown.gif`,label:`wombat`,order:`4`},4:{burns:!0,color:`orange`,density:`2`,healing:`-0.73`,id:`m`,image:`https://static.heironimus.info/image/magma.gif`,label:`magma`,moveDelay:`30`,moveStyle:`liquid`,order:`5`,reactsInto:`s`,reactsWith:`a`},5:{collectible:!0,color:`cyan`,id:`j`,image:`https://i.ibb.co/m6V89v5/gem.gif`,label:`jewel`,order:`6`,sound:`https://static.heironimus.info/sound/PinkFast.ogg`},6:{color:`purple`,density:`0`,diggable:!0,dropsLoot:`j`,healing:`-0.5`,hp:`2`,id:`k`,image:`https://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/2b956856674265a.png`,label:`Koala`,moveDelay:`25`,moveStyle:`patrol`,order:`7`,sound:`https://static.heironimus.info/sound/Hiss.ogg`},7:{color:`blue`,density:`0.85`,id:`a`,image:`https://static.heironimus.info/image/water.gif`,label:`water`,moveDelay:`15`,moveStyle:`liquid`,order:`8`},8:{color:`#f04dd2`,density:`10`,id:`o`,image:`https://static.heironimus.info/image/polymer.gif`,label:`polymer`,movable:!0,moveDelay:`90`,moveStyle:`liquid`,order:`9`,sound:`https://static.heironimus.info/sound/Boing.ogg`},9:{color:`red`,density:`1`,hp:`1`,id:`n`,image:`https://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/6efea72003769ad.png`,label:`NPC`,moveDelay:`10`,order:`10`},"-1":{color:`black`,id:`_delete`,label:`delete`,order:`0`}},T=(e,t)=>{if(e===void 0)return t;if(t===void 0)return e;if(e&&t&&typeof e==`object`&&typeof t==`object`){let n={};for(let r in{...e,...t})n[r]=T(e[r],t[r]);return n}return e},E=(e,t=`image`)=>{let n=e?.[t]||e?.image;return n?`no-repeat center/contain url(${n})`:e?.color},D=[`game`,`__guard`],O=e=>`
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

${e}`,k=e=>{if(e)try{Function(...D,O(e))}catch(e){return String(e)}};export{d as _,T as a,v as c,b as d,y as f,f as g,u as h,E as i,S as l,l as m,k as n,C as o,m as p,O as r,w as s,D as t,x as u,p as v,h as y};
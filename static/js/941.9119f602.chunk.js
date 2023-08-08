"use strict";(self.webpackChunkmortal_wombat=self.webpackChunkmortal_wombat||[]).push([[941],{699:function(e,t,n){n.d(t,{u:function(){return o},z:function(){return r}});var o={airDrag:"0.001",digSpeed:"0.05",eatSpeed:"0.05",fallDamageMin:"0.3",fallDamageMult:"100",fallDamageSound:"https://static.heironimus.info/sound/Thud.ogg",gameOverSound:"https://static.heironimus.info/sound/YouDead.ogg",gravity:"0.005",health:"100",jumpPower:"0.111",maxHealth:"100",maxPoop:"10",moveDeceleration:"0.2",moveSpeed:"0.0222",poop:"0",swimPower:"0.008",waterDrag:"0.1",backgroundUrl:"https://i.ibb.co/ZLjf3Jb/imgonline-com-ua-Texture-Seamless-ef-Gzuxvyq-GO67.jpg"},r={0:{color:"green",diggable:!0,edible:!0,healing:"5",hp:"1",id:"g",image:"https://art.pixilart.com/sr2601896d34615.png",label:"grass",makePoop:"1",order:"1",sound:"https://static.heironimus.info/sound/Chomp.ogg"},1:{color:"saddleBrown",density:"20",diggable:!0,healing:"2",hp:"1",id:"p",image:"https://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/b0e07c73f8aa75e.png",label:"poop",movable:!0,moveDelay:"2",order:"2",sound:"https://static.heironimus.info/sound/SloppyPoopSoft.ogg"},2:{color:"gray",id:"s",image:"https://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/0041e8e715b1264.png",label:"stone",order:"3"},3:{color:"red",density:"1.1",id:"w",image:"https://piskel-imgstore-b.appspot.com/img/610cc71e-cdb9-11ec-8e05-2f9ec14027c3.gif",walkingImage:"https://piskel-imgstore-b.appspot.com/img/253fba5c-cdb9-11ec-acf8-2f9ec14027c3.gif",pushingImage:"https://piskel-imgstore-b.appspot.com/img/586bb7e6-cdb9-11ec-a846-2f9ec14027c3.gif",jumpingImage:"https://piskel-imgstore-b.appspot.com/img/4439c4fd-cdb9-11ec-9ce8-2f9ec14027c3.gif",diggingImage:"https://piskel-imgstore-b.appspot.com/img/3a751840-cdb9-11ec-8175-2f9ec14027c3.gif",crouchingImage:"https://piskel-imgstore-b.appspot.com/img/32ac8f9e-cdb9-11ec-9e05-2f9ec14027c3.gif",label:"wombat",order:"4"},4:{color:"orange",density:"2",healing:"-0.73",id:"m",image:"https://piskel-imgstore-b.appspot.com/img/a3591080-d48c-11ec-adf0-83f7175e2efe.gif",label:"magma",moveDelay:"30",moveStyle:"liquid",order:"5"},5:{collectible:!0,color:"cyan",id:"j",image:"https://i.ibb.co/m6V89v5/gem.gif",label:"jewel",order:"6",sound:"https://static.heironimus.info/sound/PinkFast.ogg"},6:{color:"purple",density:"0",diggable:!0,dropsLoot:"j",healing:"-0.5",hp:"2",id:"k",image:"https://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/2b956856674265a.png",label:"Koala",moveDelay:"25",moveStyle:"patrol",order:"7",sound:"https://static.heironimus.info/sound/Hiss.ogg"},7:{color:"blue",density:"0.85",id:"a",image:"https://piskel-imgstore-b.appspot.com/img/ffce45fa-d85c-11ec-a908-a90a117b47b4.gif",label:"water",moveDelay:"15",moveStyle:"liquid",order:"8"},8:{color:"#f04dd2",density:"10",id:"o",image:"https://piskel-imgstore-b.appspot.com/img/e92587eb-df95-11ec-b289-d74eb3c6d4e4.gif",label:"polymer",movable:!0,moveDelay:"90",moveStyle:"liquid",order:"9",sound:"https://static.heironimus.info/sound/Boing.ogg"},9:{color:"red",density:"1",hp:"1",id:"n",image:"https://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/6efea72003769ad.png",label:"NPC",moveDelay:"10",order:"10"},"-1":{color:"black",id:"_delete",label:"delete",order:"0"}}},941:function(e,t,n){n.r(t);var o=n(791),r=n(250),a=n(413),i=n(885),l=n(942),s=n(457),c=n(63),u=function(e,t){var n=(0,o.useState)({}),r=(0,i.Z)(n,2),a=r[0],l=r[1];return(0,o.useEffect)((function(){return(0,c.oL)("users",(function(e){return l(function(e){return(0,s.HK)((function(e){return e.email}),Object.values(e))}(e))}),t)}),[e]),a},d={KeyS:"down",KeyA:"left",KeyW:"up",KeyD:"right",ArrowUp:"up",ArrowDown:"down",ArrowLeft:"left",ArrowRight:"right"},p=(0,s.Ds)((function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];location.hash=t.join("/")}),1e3),f=n(685),h=15e3,m=(0,s.M8)(),g=function(e){var t=0;for(var n in e)t=Math.max(t,e[n].tstamp);return t},v=function(e,t){var n=(0,o.useState)({}),r=(0,i.Z)(n,2),a=r[0],l=r[1];return(0,o.useEffect)((function(){if(t)return(0,c.oL)("worlds/".concat(t,"/cursors"),l,e)}),[t]),(0,o.useEffect)((function(){Math.random()<.01&&function(e,t,n){var o={},r=g(e);for(var a in e)r-e[a].tstamp>h&&(o["worlds/".concat(t,"/cursors/").concat(a)]=null);(0,c.Vx)(o,n)}(a,t,e)}),[a,t]),a},y=(0,s.P2)((function(e,t,n,o,r,a,i,s){o&&(0,c.Vx)((0,l.Z)({},"worlds/".concat(o,"/cursors/").concat(m),{user:e.email,mouseX:t,mouseY:n,left:r-innerWidth/i/2,top:a-innerHeight/i/2,width:innerWidth/i,height:innerHeight/i,tstamp:(0,f.Bt)()}),s)}),500),b=n(184),x=function(e){var t=e.className,n=e.hide,o=e.label,r=e.children;return(0,b.jsxs)("div",{className:"pane ".concat(t),children:[(0,b.jsxs)("div",{className:"paneHeader",children:[(0,b.jsx)("a",{onClick:n,children:(0,b.jsx)("i",{className:"fa-solid fa-x"})}),(0,b.jsx)("strong",{children:o})]}),(0,b.jsx)("div",{className:"paneBody",children:r})]})},w=function(e,t){var n=(0,o.useState)(void 0===localStorage[e]?t:function(e,t){try{return JSON.parse(e)}catch(n){return console.error(n),t}}(localStorage[e],t)),r=(0,i.Z)(n,2),a=r[0],l=r[1];return(0,o.useEffect)((function(){localStorage[e]=JSON.stringify(a)}),[a]),[a,l]},j=function(e){var t=e.errors,n=e.clearError;return Object.keys(t).length>0&&(0,b.jsx)("div",{className:"errorBanner",children:Object.entries(t).map((function(e){var t=(0,i.Z)(e,2),o=t[0],r=t[1];return(0,b.jsxs)("div",{children:[r," ",(0,b.jsx)("a",{onClick:function(){return n(o)},children:"[x]"})]},o)}))})},k=n(861),C=n(757),S=n.n(C),T=function(e){var t=e.onError,n=(0,o.useState)(""),r=(0,i.Z)(n,2),a=r[0],l=r[1],s=(0,o.useState)(""),u=(0,i.Z)(s,2),d=u[0],p=u[1];return(0,b.jsx)("div",{style:{width:300,margin:"50px auto"},children:(0,b.jsxs)("form",{className:"login",onSubmit:function(){var e=(0,k.Z)(S().mark((function e(n){return S().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.preventDefault(),e.prev=1,e.next=4,(0,c.Ib)(a,d);case 4:e.next=9;break;case 6:e.prev=6,e.t0=e.catch(1),t(e.t0.message);case 9:case"end":return e.stop()}}),e,null,[[1,6]])})));return function(t){return e.apply(this,arguments)}}(),children:[(0,b.jsx)("input",{type:"email",placeholder:"email",value:a,onChange:function(e){return l(e.target.value)}}),(0,b.jsx)("input",{type:"password",placeholder:"password",value:d,onChange:function(e){return p(e.target.value)}}),(0,b.jsx)("button",{style:{width:"100%"},children:"Log In"})]})})},Z=n(546),I=function(e){var t=e.tileTypes,n=e.selectedTileTypeId,o=e.setSelectedTileTypeId,r=e.showTileTypeEditor,a=e.setShowTileTypeEditor,s=e.worldId;return(0,b.jsxs)("div",{className:"toolBar",children:[(0,b.jsx)("div",{className:"tileType",onClick:function(){return o()},children:(0,b.jsx)("label",{children:"None"})}),Object.entries(t).sort((function(e,t){return e[1].order-t[1].order})).map((function(e){var t=(0,i.Z)(e,2),l=t[0],s=t[1];return(0,b.jsx)("div",{className:"tileType"+(n===s.id?" selected":""),style:{background:(0,Z.V)(s)},title:r?"":"Double click to edit tile properties.",onClick:function(){return o(s.id)},onDoubleClick:function(){return a(!0)},children:(0,b.jsx)("label",{children:s.label})},l)})),(0,b.jsx)("div",{className:"tileType",children:(0,b.jsx)("button",{onClick:function(){var e=Object.values(t).length.toString();(0,c.Vx)((0,l.Z)({},"worlds/".concat(s,"/tileTypes/").concat(e),{order:e,id:e})),o(e),a(!0)},children:(0,b.jsx)("i",{className:"fa-solid fa-plus"})})})]})},N=n(842),E=function(e,t,n){var o,r=(0,N.v0)().currentUser.email,i=(0,f.Bt)();return(0,c.Vx)((o={},(0,l.Z)(o,"worlds/".concat(e,"/world/").concat(t.x,"_").concat(t.y),"_delete"===t.tileType?null:(0,a.Z)((0,a.Z)({},t),{},{user:r,tstamp:i})),(0,l.Z)(o,"worlds/".concat(e,"/lastEdited"),i),(0,l.Z)(o,"worlds/".concat(e,"/lastEditedBy"),r),o),n)},L=n(762),D=[{label:"year",amount:31536e6},{label:"month",amount:2592e6},{label:"week",amount:6048e5},{label:"day",amount:864e5},{label:"hour",amount:36e5},{label:"minute",amount:6e4},{label:"second",amount:1e3}],W=function(e){if(isNaN(e))return"???";var t,n=(0,L.Z)(D);try{for(n.s();!(t=n.n()).done;){var o=t.value,r=o.label,a=o.amount;if(a<=e){var i=Math.floor(e/a);return"".concat(i," ").concat(r).concat(1===i?"":"s"," ago")}}}catch(l){n.e(l)}finally{n.f()}return"just now"},H=32,M=function(e){var t=e.cursors,n=e.userIndex,r=e.scale,a=g(t);return Object.entries(t).map((function(e){var t,l,s=(0,i.Z)(e,2),c=s[0],u=s[1],d=u.user,p=u.left,f=u.top,g=u.width,v=u.height,y=u.tstamp,x=u.mouseX,w=u.mouseY;if(c===m||a-y>h)return null;var j=1-(a-y)/h;return(0,b.jsxs)(o.Fragment,{children:[(0,b.jsx)("div",{className:"cursorView",style:{transform:"translate(".concat(p*H,"px, ").concat(f*H,"px)"),width:g*H,height:v*H,opacity:j},children:(0,b.jsx)("span",{style:{fontSize:2560/r+"%"},children:(null===(t=n[d])||void 0===t?void 0:t.name)||d})}),x&&w?(0,b.jsxs)("div",{className:"mouseCursor",style:{transform:"translate(".concat((x+.5)*H,"px, ").concat((w+.5)*H,"px) scale(").concat(H/r,") "),opacity:j},children:[(0,b.jsx)("i",{className:"fa-solid fa-arrow-pointer"}),(0,b.jsx)("span",{children:(null===(l=n[d])||void 0===l?void 0:l.name)||d})]}):null]},c)}))},P=[{prop:"digSpeed",label:"Wombat Digging Speed",type:"number",info:"How fast much can you dig in one frame?"},{prop:"eatSpeed",label:"Wombat Eating Speed",type:"number",info:"How fast much can you eat in one frame?"},{prop:"gravity",label:"Gravity",type:"number",info:"How strong is gravity?"},{prop:"health",label:"Wombat Starting Health",type:"number",info:"How much health do you start with?"},{prop:"maxHealth",label:"Wombat Max Health",type:"number",info:"How much health can you have?"},{prop:"poop",label:"Wombat Starting Poop",type:"number",info:"How much poop do you start with?"},{prop:"maxPoop",label:"Wombat Max Poop",type:"number",info:"How much poop can you hold?"},{prop:"jumpPower",label:"Wombat Jumping Power",type:"number",info:"How much jumping power do you start with?"},{prop:"moveSpeed",label:"Wombat Acceleration",type:"number",info:"How fast can you move?"},{prop:"moveDeceleration",label:"Wombat Deceleration",type:"number",info:"How fast can you slow down?"},{prop:"airDrag",label:"Air Drag",type:"number",info:"How much does the air slow you down?"},{prop:"fallDamageMin",label:"Fall Dmg Threshold",type:"number",info:"What is the minimum blocks/frame where landing hurts?"},{prop:"fallDamageMult",label:"Fall Dmg Multiplier",type:"number",info:"This is multiplied by (your speed - Fall Dmg Threshold) when you land to calculate the damage you take."},{prop:"fallDamageSound",label:"Fall Dmg Sound",type:"text",info:"The URL for the sound that is played if fall damage occurs."},{prop:"swimPower",label:"Swim Power",type:"number",info:"How fast of a swimmer do you start out as?"},{prop:"waterDrag",label:"Water Drag",type:"number",info:"How quickly does water slow you down?"},{prop:"gameOverSound",label:"Game Over Sound",type:"text",info:"The URL for the sound that is played when the game is over."},{prop:"backgroundUrl",label:"Background URL",type:"text",info:"The URL for the background of the game.",onFieldChange:function(e){document.body.style.backgroundImage="url(".concat(e,")")}}],O=n(699),U=function(e,t,n,o){return{x:Math.floor((e.clientX-innerWidth/2)/t)+n,y:Math.floor((e.clientY-innerHeight/2)/t)+o}},A=function(e,t,n,o,r){var a;if(!e||!t)return"";var i=(null===(a=n[e])||void 0===a?void 0:a.name)||e;return"Placed at (".concat(o,", ").concat(r,") by ").concat(i," ").concat(W(Date.now()-t))},B=function(e){var t=e.world,n=e.tileTypeIndex,o=e.userIndex,r=e.setTileLogicCoords;return Object.entries(t).map((function(e){var t=(0,i.Z)(e,2),a=t[0],l=t[1],s=l.x,c=l.y,u=l.tileType,d=l.user,p=l.tstamp;return(0,b.jsx)("div",{className:"tile",title:A(d,p,o,s,c),style:{transform:"translate(".concat(s*H,"px, ").concat(c*H,"px)"),background:(0,Z.V)(n[u])},onDoubleClick:function(){return r({x:s,y:c})}},a)}))},R=(0,o.memo)(B),F=function(e){var t=e.world,n=e.tileTypes,r=e.selectedTileTypeId,i=e.onError,l=e.worldId,u=e.xCoord,d=e.yCoord,p=e.scale,f=e.user,h=e.cursors,m=e.userIndex,g=e.tileLogicCoords,v=e.setTileLogicCoords,x=(0,o.useRef)(),w=(0,o.useMemo)((function(){return(0,s.HK)((function(e){return e.id}),(0,s.aW)(n))}),[n]),j=function(e){var n=U(e,p,u,d),o=n.x,a=n.y;if(e.altKey)return window.open(location.href.replace(/\?.*/,"")+"#"+btoa(JSON.stringify({worldId:l,x:o,y:a})),"_blank"),e.preventDefault(),!1;var s,c=null===(s=t["".concat(o,"_").concat(a)])||void 0===s?void 0:s.tileType,f=e.shiftKey?"_delete":r;f&&(c||"_delete"!==f)&&c!==f&&E(l,{x:o,y:a,tileType:f},i)},k=(0,o.useCallback)((function(e){var t,n=U(e,p,u,d),o=n.x,a=n.y;r&&((null===(t=x.current)||void 0===t?void 0:t.style).transform="translate(".concat(o*H,"px, ").concat(a*H,"px)"),e.buttons&&j(e));y(f,o,a,l,u,d,p,i)}),[p,l,u,d,r,f]),C=innerWidth/2-u*H,S=innerHeight/2-d*H;return(0,o.useEffect)((function(){(0,c.oi)("worlds/".concat(l,"/gameConfig")).then((function(e){var t=(0,a.Z)((0,a.Z)({},O.u),e);P.filter((function(e){return"function"===typeof e.onFieldChange})).forEach((function(e){void 0!=t[e.prop]&&e.onFieldChange(t[e.prop])}))}))}),[l]),(0,b.jsx)("div",{id:"worldEditor",className:"world",onClick:j,onMouseMove:k,children:(0,b.jsxs)("div",{style:{transformOrigin:"".concat(innerWidth/2,"px ").concat(innerHeight/2,"px"),transform:"scale(".concat(p/H,") translate(").concat(C,"px,").concat(S,"px)")},children:[(0,b.jsx)(M,{cursors:h,userIndex:m,scale:p}),(0,b.jsx)(R,{world:t,tileTypeIndex:w,userIndex:m,setTileLogicCoords:v}),r&&(0,b.jsx)("div",{ref:x,className:"ghost tile",style:{background:(0,Z.V)(w[r])}}),g&&(0,b.jsx)("div",{style:{transform:"translate(".concat(g.x*H,"px, ").concat(g.y*H,"px)")},className:"selected tile"})]})})},V=n(147),z=function(e){var t,n=e.user,o=e.setScale,r=e.zoomAmt,a=e.userIndex,i=e.children;return(0,b.jsxs)("nav",{children:[n&&(0,b.jsxs)("div",{style:{float:"right"},children:[(0,b.jsx)("a",{onClick:function(){return o((function(e){return Math.round(e*r)}))},children:(0,b.jsx)("i",{className:"fa-solid fa-magnifying-glass-plus"})}),(0,b.jsx)("a",{onClick:function(){return o((function(e){return Math.round(e/r)}))},children:(0,b.jsx)("i",{className:"fa-solid fa-magnifying-glass-minus"})}),"Hi, ",(null===(t=a[n.email])||void 0===t?void 0:t.name)||n.email,"!",(0,b.jsx)("a",{onClick:c.ni,children:"log out"})]}),(0,b.jsxs)("b",{children:["MW Collabitat v",V.i8]}),i]})},K=n(982),Y=n(915),_=(0,o.lazy)((function(){return n.e(60).then(n.bind(n,60))})),q={minimap:{enabled:!1}},X=function(e){var t=e.value,n=e.onChange;return(0,b.jsx)(o.Suspense,{fallback:"Loading...",children:(0,b.jsx)(_,{height:200,width:800,theme:"vs-dark",defaultLanguage:"javascript",value:t,onChange:n,options:q})})},J={text:function(e){var t=e.value,n=void 0===t?"":t,o=e.onChange;return(0,b.jsx)("input",{type:"text",value:n,onChange:function(e){return o(e.target.value)}})},number:function(e){var t=e.value,n=void 0===t?"":t,o=e.onChange;return(0,b.jsx)("input",{type:"number",value:n,onChange:function(e){return o(e.target.value)}})},checkbox:function(e){var t=e.value,n=void 0!==t&&t,o=e.onChange;return(0,b.jsx)("input",{type:"checkbox",checked:n,onChange:function(e){return o(e.target.checked)}})},select:function(e){var t=e.value,n=e.onChange,o=e.options;return(0,b.jsxs)("select",{value:t,onChange:function(e){return n(e.target.value)},children:[(0,b.jsx)("option",{}),o.map((function(e){var t=e.label,n=e.value;return(0,b.jsx)("option",{value:n,children:t},t)}))]})},code:X},G=function(e){var t=e.fields,n=e.data,o=e.defaults,r=e.onChange;return t.map((function(e){var t=e.prop,a=e.label,i=e.type,l=e.info,s=e.show,c=e.options;if(s&&!s(n))return null;var u=J[i],d=void 0===(null===n||void 0===n?void 0:n[t])?null===o||void 0===o?void 0:o[t]:null===n||void 0===n?void 0:n[t];return(0,b.jsxs)("div",{title:l,children:[(0,b.jsx)("label",{children:a}),(0,b.jsx)(u,{value:d,onChange:function(e){return r(e,t)},options:c}),o&&d!==(null===o||void 0===o?void 0:o[t])&&(0,b.jsx)("button",{onClick:function(){return r(null,t)},title:"Click to reset ".concat(a," to ").concat(JSON.stringify(null===o||void 0===o?void 0:o[t])),children:"Reset"})]},t)}))},Q=[{prop:"label",label:"Label",type:"text",info:"The label you see in the tool bar below."},{prop:"image",label:"Image URL",type:"text",info:"A url to an image."}].concat((0,K.Z)(["walking","pushing","jumping","digging","crouching"].map((function(e){return{prop:"".concat(e,"Image$"),label:"".concat((t=e,t[0].toUpperCase()+t.slice(1))," Image URL"),type:"text",info:"A url to an image for ".concat(e,"."),show:function(e){return"wombat"===e.label||parseInt(e.moveDelay)}};var t}))),[{prop:"sound",label:"Sound URL",type:"text",info:"URL for the sound that should be played."},{prop:"color",label:"Color",type:"text",info:"The color to use if there is no image"},{prop:"hp",label:"HP",type:"number",info:"How much health does it have?"},{prop:"movable",label:"Movable",type:"checkbox",info:"Can you move it?"},{prop:"moveDelay",label:"Move Delay",type:"number",info:"How many frames does it wait to move? Smaller is faster."},{prop:"density",label:"Density",type:"number",info:"Air density is 0. Wombat density is 1. Wombat floats when density is >1, sinks when <1.",show:function(e){return parseInt(e.moveDelay)}},{prop:"moveStyle",label:"Move Style",type:"select",info:"How does it move?",options:[{label:"Liquid",value:"liquid"},{label:"Patrol",value:"patrol"}],show:function(e){return parseInt(e.moveDelay)}},{prop:"healing",label:"Healing",type:"number",info:"How much does it heal (or hurt) when you eat/touch it (per frame)?"},{prop:"edible",label:"Edible",type:"checkbox",info:"Can you eat it?"},{prop:"makePoop",label:"Make Poop",type:"number",info:"How much poop does it make?",show:function(e){return e.edible}},{prop:"diggable",label:"Diggable",type:"checkbox",info:"Can you dig it?",show:function(e){return!e.edible}},{prop:"collectible",label:"Collectible",type:"checkbox",info:"Can you collect it?",show:function(e){return!e.edible&&!e.movable}},{prop:"dropsLoot",label:"Drops Loot",type:"select",info:"What kind of loot does it drop?",options:[{label:"Jewel",value:"j"}],show:function(e){return e.diggable&&e.hp}},{prop:"order",label:"Order",type:"number",info:"The order it shows up in the toolbar below"}]),$=Q.reduce((function(e,t){var n=t.prop,o=t.type;return e[n]="checkbox"!==o&&"",e}),{}),ee=function(e){var t=e.selectedTileTypeId,n=e.tileTypes,o=e.worldId,r=e.onError;if(!t||t.startsWith("_")||!Object.values(n).some((function(e){return e.id===t})))return"You can't edit this.";var a=(0,s.aW)(n).find((function(e){return e.id===t})),i=Object.values(O.z).find((function(e){return e.id===t}));return a&&(0,b.jsx)("div",{className:"tileTypeEditor",children:(0,b.jsx)(G,{fields:Q,data:a,defaults:i&&(0,Y.v)(i,$),onChange:function(e,t){(0,c.Vx)((0,l.Z)({},"worlds/".concat(o,"/tileTypes/").concat(a.key,"/").concat(t),e),r)}})})},te=function(e){var t=e.worldId,n=e.onError,r=function(e,t){var n=(0,o.useState)(),r=(0,i.Z)(n,2),a=r[0],l=r[1];return(0,o.useEffect)((function(){return(0,c.oL)("worlds/".concat(e,"/gameConfig"),l,t)}),[]),a}(t,n);return(0,b.jsx)("div",{className:"gameConfig",children:(0,b.jsx)(G,{fields:P,data:r,defaults:O.u,onChange:function(e,o){(0,c.Vx)((0,l.Z)({},"worlds/".concat(t,"/gameConfig/").concat(o),e),n),function(e,t){var n=P.find((function(e){return e.prop===t}));n&&"function"===typeof n.onFieldChange&&n.onFieldChange(e)}(e,o)}})})},ne=function(e){var t=e.cursors,n=e.userIndex,o=e.worldId,r=g(t);return Object.entries(t).filter((function(e){return r-e[1].tstamp<h})).map((function(e){var t,r=(0,i.Z)(e,2),a=r[0],l=r[1],s=l.user,c=l.mouseX,u=l.mouseY;return(0,b.jsxs)("div",{style:{margin:5},children:[(null===(t=n[s])||void 0===t?void 0:t.name)||s,c&&u?(0,b.jsx)("a",{style:{margin:"0 10px"},href:"#".concat(o||"","/").concat(c,"/").concat(u,"/32"),children:"go"}):null]},a)}))},oe=function(e){location.hash="".concat(e,"/0/0/32")},re=function(){var e=(0,k.Z)(S().mark((function e(){var t,n;return S().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=(0,s.M8)(),n=prompt("Enter a name for your new world.")){e.next=4;break}return e.abrupt("return");case 4:return e.next=6,(0,c.Vx)((0,l.Z)({},"worlds/".concat(t),{worldName:n,lastEdited:(0,f.Bt)(),lastEditedBy:(0,N.v0)().currentUser.email}));case 6:oe(t);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),ae=function(e){var t=e.world,n=e.tileTypes,r=(0,o.useRef)();return(0,o.useEffect)((function(){t&&n&&function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:document.createElement("canvas"),o=(0,s.HK)((function(e){return e.id}),(0,s.aW)(t)),r=1/0,a=1/0,i=-1/0,l=-1/0;for(var c in e){var u=e[c],d=u.x,p=u.y;r=Math.min(r,d),a=Math.min(a,p),i=Math.max(i,d),l=Math.max(l,p)}n.width=i-r+1,n.height=l-a+1;var f=n.getContext("2d");for(var h in e){var m,g=e[h],v=g.x,y=g.y,b=g.tileType;f.fillStyle=null===(m=o[b])||void 0===m?void 0:m.color,f.fillRect(v-r,y-a,1,1)}}(t,n,r.current)}),[t,n]),(0,b.jsx)("canvas",{ref:r})},ie=function(e){var t,n=e.id,o=e.item,r=o.lastEdited,a=o.worldName,i=o.lastEditedBy,l=o.world,s=o.tileTypes,c=e.userIndex,u=e.close;return(0,b.jsxs)("button",{className:"worldButton",onClick:function(){oe(n),u()},children:[(0,b.jsxs)("div",{className:"canvasContainer",children:[(0,b.jsx)(ae,{world:l,tileTypes:(0,Y.v)(s,O.z)})," "]}),a||"???",r&&(0,b.jsxs)("span",{className:"lastEdited",children:["last edited by"," ",((null===(t=c[i])||void 0===t?void 0:t.name)||i||"???")+" "+W(Date.now()-r)]})]})},le=function(){var e=(0,k.Z)(S().mark((function e(t){return S().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t(),e.t0=t,e.next=4,(0,c.oi)("worlds");case 4:e.t1=e.sent,(0,e.t0)(e.t1);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),se=function(e){var t=e.userIndex,n=e.close,r=(0,o.useState)(),a=(0,i.Z)(r,2),l=a[0],s=a[1];return(0,o.useEffect)((function(){le(s)}),[]),l?(0,b.jsxs)("div",{className:"myWorlds",children:[(0,b.jsx)("div",{style:{float:"right"},children:(0,b.jsxs)("button",{onClick:(0,k.Z)(S().mark((function e(){return S().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,re();case 2:n();case 3:case"end":return e.stop()}}),e)}))),children:[(0,b.jsx)("i",{className:"fa-solid fa-circle-plus"})," Create a New World"]})}),(0,b.jsxs)("button",{onClick:function(){return le(s)},children:[(0,b.jsx)("i",{className:"fa-solid fa-arrows-rotate"})," Refresh List"]}),Object.entries(l).sort((function(e,t){return t[1].lastEdited-e[1].lastEdited})).map((function(e){var o=(0,i.Z)(e,2),r=o[0],a=o[1];return(0,b.jsx)(ie,{id:r,item:a,userIndex:t,close:n},r)}))]}):(0,b.jsx)("div",{className:"fa-3x",style:{textAlign:"center"},children:(0,b.jsx)("i",{className:"fa-solid fa-spinner fa-spin"})})},ce=function(e){return e[0].toUpperCase()+e.slice(1)},ue=function(e,t){return e.reduce((function(e,n){var o=t(n);return e[o]=(e[o]||0)+1,e}),{})},de=function(e){var t=e.heading,n=e.data,o=e.getLabel;return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("tr",{children:(0,b.jsx)("td",{children:(0,b.jsx)("br",{})})}),(0,b.jsx)("tr",{children:(0,b.jsx)("th",{children:t})}),Object.entries(n).sort((function(e,t){return t[1]-e[1]})).map((function(e){var t=(0,i.Z)(e,2),n=t[0],r=t[1];return(0,b.jsxs)("tr",{children:[(0,b.jsx)("td",{children:o?o(n):n}),(0,b.jsx)("td",{children:r})]},n)}))]})},pe=function(e){var t=e.world,n=e.tileTypes,o=e.userIndex,r=(0,s.HK)((function(e){return e.id}),(0,s.aW)(n)),a=Object.values(t);return(0,b.jsx)("table",{children:(0,b.jsxs)("tbody",{children:[(0,b.jsxs)("tr",{children:[(0,b.jsx)("th",{children:"Total Tiles"}),(0,b.jsx)("td",{children:a.length})]}),(0,b.jsx)(de,{heading:"By Person",data:ue(a,(function(e){return e.user})),getLabel:function(e){var t;return ce((null===(t=o[e])||void 0===t?void 0:t.name)||"???")}}),(0,b.jsx)(de,{heading:"By Tile Type",data:ue(a,(function(e){return e.tileType})),getLabel:function(e){var t;return ce((null===(t=r[e])||void 0===t?void 0:t.label)||"???")}}),(0,b.jsx)(de,{heading:"By Date",data:ue(a,(function(e){return e.tstamp?W(Date.now()-e.tstamp):"???"}))})]})})},fe=(0,o.memo)(pe),he=[{prop:"name",label:"Name",type:"text",info:"Name to use to easily refer to tile."},{prop:"onSpace",label:"On Space",type:"code",info:"What should happen when you press space at it?"},{prop:"onTouch",label:"On Touch",type:"code",info:"What should happen when you collide with this tile?"}],me="\n// to show the player some text:\nsay('hello!');\n\n// to give the player some choices after their text:\nsay('what do you want to do?');\nchoice('replenish health', () => setHealth(100));\nchoice('lose health', () => setHealth(1));\n\n// to play a sound:\nplaySound('https://static.heironimus.info/sound/PinkFast.ogg');\n\n// to pause the sound:\npauseSound('https://static.heironimus.info/sound/PinkFast.ogg');\n\n// to loop the sound:\nloopSound('https://static.heironimus.info/sound/PinkFast.ogg');\n\n// to jump to a different world:\njumpTo('l36gx6hi:xbmqfbeqyfr');\n// To get a world's id, go to the world in the editor and it's \n// between the # and the first / in the page URL\n\n// to set poop:\nsetPoop(100);\n\n// to set health:\nsetHealth(100);\n\n// to move a tile\nmoveTile(4, -15, 1, 0); // tile x, tile y, move amount x, move amount y\n// this moves the tile at (4, -15) one tile to the right and 0 tiles down.\n\n".trim(),ge=function(e){var t=e.tile,n=e.worldId,o=e.onError;return(0,b.jsxs)("div",{className:"tileLogic",children:[(0,b.jsx)(G,{fields:he,data:t,onChange:function(e,r){E(n,(0,a.Z)((0,a.Z)({},t),{},(0,l.Z)({},r,e)),o)}}),(0,b.jsxs)("details",{children:[(0,b.jsx)("summary",{children:"Tile Logic Examples"}),(0,b.jsx)(X,{value:me})]})]})},ve=[{key:"instructions",buttonLabel:"Instructions",paneLabel:"Instructions",icon:"circle-question"},{key:"gameConfig",buttonLabel:"World Config",paneLabel:"Config Overrides",icon:"toolbox"},{key:"tileTypeEditor",buttonLabel:"Tile Config",paneLabel:"Tile Config Overrides",icon:"gear"},{key:"hereNow",buttonLabel:"People",paneLabel:"Editing Now",icon:"person"},{key:"stats",buttonLabel:"World Stats",paneLabel:"World Stats",icon:"gauge"},{key:"myWorlds",buttonLabel:"Worlds",paneLabel:"Worlds",icon:"earth-americas"}],ye=function(){var e,t=function(){var e=(0,o.useState)({}),t=(0,i.Z)(e,2),n=t[0],r=t[1];return[n,function(e){r((function(t){return(0,a.Z)((0,a.Z)({},t),{},(0,l.Z)({},(0,s.M8)(),e))}))},function(e){return r((function(t){return(0,s.an)(e,t)}))}]}(),n=(0,i.Z)(t,3),r=n[0],f=n[1],h=n[2],m=(0,o.useState)(c.rZ),g=(0,i.Z)(m,2),k=g[0],C=g[1],S=(0,o.useState)(),Z=(0,i.Z)(S,2),N=Z[0],E=Z[1],L=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=(0,o.useState)(e),r=(0,i.Z)(n,2),a=r[0],l=r[1],s=(0,o.useState)(t),c=(0,i.Z)(s,2),u=c[0],p=c[1];return(0,o.useEffect)((function(){var e=function(e){if(e.target===document.body){var t=d[e.code];"up"===t&&p((function(e){return e-4})),"down"===t&&p((function(e){return e+4})),"left"===t&&l((function(e){return e-4})),"right"===t&&l((function(e){return e+4}))}};return window.addEventListener("keydown",e),function(){window.removeEventListener("keydown",e)}}),[]),{xCoord:a,yCoord:u,setXCoord:l,setYCoord:p}}(0,0),D=L.xCoord,W=L.yCoord,H=L.setXCoord,M=L.setYCoord,P=(0,o.useState)(32),U=(0,i.Z)(P,2),A=U[0],B=U[1],R=(0,o.useState)(),V=(0,i.Z)(R,2),K=V[0],_=V[1],q=function(){var e=(0,o.useState)(),t=(0,i.Z)(e,2),n=t[0],r=t[1];return(0,o.useEffect)((function(){return(0,c.G9)(r)}),[]),n}(),X=u(q,f),J=function(e,t){var n=(0,o.useState)(),r=(0,i.Z)(n,2),a=r[0],l=r[1];return(0,o.useEffect)((function(){return(0,c.oL)("worlds/".concat(t,"/tileTypes"),l,e)}),[t]),a}(f,k),G=function(e,t){var n=(0,o.useState)({}),r=(0,i.Z)(n,2),a=r[0],l=r[1];return(0,o.useEffect)((function(){if(t)return(0,c.oL)("worlds/".concat(t,"/world"),l,e)}),[t]),a}(f,k),Q=v(f,k),$=(e=ve,Object.fromEntries(e.map((function(e){var t=e.key,n=e.buttonLabel,o=e.paneLabel,r=e.icon,a=w("show"+n,!1),l=(0,i.Z)(a,2),s=l[0],c=l[1],u={label:o,className:t+"Container",hide:function(){return c(!1)}};return[t,{button:(0,b.jsxs)("a",{className:s?"active":"",onClick:function(){return c((function(e){return!e}))},children:[(0,b.jsx)("i",{className:"fa-solid fa-".concat(r)})," ",n]},t),show:s,setShow:c,paneProps:u}]}))));!function(e){var t=e.worldId,n=e.xCoord,r=e.yCoord,a=e.scale,l=e.setWorldId,c=e.setXCoord,u=e.setYCoord,d=e.setScale;(0,o.useEffect)((function(){return p(t,n,r,a),p.cancel}),[t,a,n,r]),(0,o.useEffect)((function(){var e=function(){var e=location.hash.slice(1).split("/"),o=(0,i.Z)(e,4),p=o[0],f=o[1],h=o[2],m=o[3];p&&!(0,s.kQ)(p)||![f,h,m].every((function(e){return!isNaN(e)}))?(console.log("bad hash"),location.hash=[t||"",n,r,a].join("/")):(l(p),c(Number(f)),u(Number(h)),d(Number(m)))};return e(),window.addEventListener("hashchange",e),function(){window.removeEventListener("hashchange",e)}}),[])}({worldId:k,xCoord:D,yCoord:W,scale:A,setWorldId:C,setXCoord:H,setYCoord:M,setScale:B}),(0,o.useEffect)((function(){q&&y(q,null,null,k,D,W,A,f)}),[q,k,D,W,A]);var oe=(0,Y.v)(J,O.z);return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(z,{user:q,scale:A,setScale:B,zoomAmt:2,userIndex:X,children:Object.values($).map((function(e){return e.button}))}),(0,b.jsx)(j,{errors:r,clearError:h}),q?(0,b.jsxs)("div",{className:"appContainer",children:[$.tileTypeEditor.show&&(0,b.jsx)(x,(0,a.Z)((0,a.Z)({},$.tileTypeEditor.paneProps),{},{children:(0,b.jsx)(ee,{selectedTileTypeId:N,tileTypes:oe,worldId:k,onError:f})})),$.gameConfig.show&&(0,b.jsx)(x,(0,a.Z)((0,a.Z)({},$.gameConfig.paneProps),{},{children:(0,b.jsx)(te,{worldId:k,onError:f})})),k&&$.hereNow.show&&(0,b.jsx)(x,(0,a.Z)((0,a.Z)({},$.hereNow.paneProps),{},{children:(0,b.jsx)(ne,{cursors:Q,userIndex:X,worldId:k})})),$.instructions.show&&(0,b.jsxs)(x,(0,a.Z)((0,a.Z)({},$.instructions.paneProps),{},{children:[(0,b.jsx)("p",{children:"Use the arrow keys or WASD to move around the map."}),(0,b.jsx)("p",{children:"Click a tile type at the bottom. Click on the map to place it."}),(0,b.jsx)("p",{children:"Shift+Click a tile to delete it."}),(0,b.jsxs)("p",{children:["You can zoom in and out with"," ",(0,b.jsx)("i",{className:"fa-solid fa-magnifying-glass-plus"})," and"," ",(0,b.jsx)("i",{className:"fa-solid fa-magnifying-glass-minus"})," in the upper right."]}),(0,b.jsx)("p",{children:"Share your URL with other editors to show them what you made."}),(0,b.jsx)("p",{children:"To test what you have made, Alt+Click where you want to start testing. Share your game URL to share your starting point."}),(0,b.jsx)("p",{children:"Using the None tile-type, double-click on a placed tile to open the script editor."})]})),$.myWorlds.show&&(0,b.jsx)(x,(0,a.Z)((0,a.Z)({},$.myWorlds.paneProps),{},{children:(0,b.jsx)(se,{userIndex:X,close:function(){return $.myWorlds.setShow(!1)}})})),$.stats.show&&(0,b.jsx)(x,(0,a.Z)((0,a.Z)({},$.stats.paneProps),{},{children:(0,b.jsx)(fe,{world:G,tileTypes:oe,userIndex:X})})),K&&(0,b.jsx)(x,{label:"Tile Logic (".concat(K.x,",").concat(K.y,")"),className:"tileLogicContainer",hide:function(){return _()},children:(0,b.jsx)(ge,{tile:G["".concat(K.x,"_").concat(K.y)],worldId:k,onError:f})}),(0,b.jsx)("div",{className:"toolContainer",children:(0,b.jsx)(I,{tileTypes:oe,selectedTileTypeId:N,setSelectedTileTypeId:E,showTileTypeEditor:$.tileTypeEditor.show,setShowTileTypeEditor:$.tileTypeEditor.setShow,worldId:k})}),k&&(0,b.jsx)("div",{className:"worldEditorContainer",children:(0,b.jsx)(F,{world:G,selectedTileTypeId:N,tileTypes:oe,onError:f,worldId:k,xCoord:D,yCoord:W,scale:A,user:q,cursors:Q,userIndex:X,tileLogicCoords:K,setTileLogicCoords:_})})]}):(0,b.jsx)(T,{onError:f})]})};document.title="Mortal Wombat Editor",(0,r.s)(document.querySelector("#root")).render((0,b.jsx)(o.StrictMode,{children:(0,b.jsx)(ye,{})}))},63:function(e,t,n){n.d(t,{G9:function(){return v},Ib:function(){return g},Vx:function(){return f},ni:function(){return y},oL:function(){return m},oi:function(){return h},rZ:function(){return p}});var o=n(861),r=n(757),a=n.n(r),i=n(702),l=n(685),s=n(842);(0,i.ZF)({apiKey:"AIzaSyBEserPzSUos4MT3XRO8NKAO2oVk1-LS-I",authDomain:"mortal-wombat-8c76a.firebaseapp.com",projectId:"mortal-wombat-8c76a",storageBucket:"mortal-wombat-8c76a.appspot.com",messagingSenderId:"929181149015",appId:"1:929181149015:web:33a7f450bcdbb06ae64012",measurementId:"G-JL6HCMYYBS"});var c=(0,l.N8)(),u=(0,s.v0)(),d=(0,l.iH)(c),p="l5ybd0mu:2x3xfrsom4h",f=function(e,t){try{return(0,l.Vx)(d,e)}catch(n){console.error(n),t(n.message)}};"localhost:3000"===location.host&&(window._update=function(){var e=(0,o.Z)(a().mark((function e(t){return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,l.Vx)(d,t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());var h=function(){var e=(0,o.Z)(a().mark((function e(t){return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,l.U2)((0,l.iU)(d,t));case 2:return e.abrupt("return",e.sent.val());case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),m=function(e,t,n){try{var o=(0,l.iH)(c,e);return(0,l.jM)(o,(function(e){return t(e.val()||{})})),function(){return(0,l.S1)(o)}}catch(r){console.error(r),n(r.message)}},g=function(e,t){return(0,s.e5)(u,e,t)},v=function(e){return(0,s.Aj)(u,e)},y=function(){return(0,s.w7)(u)}},457:function(e,t,n){n.d(t,{Ds:function(){return p},HK:function(){return u},M8:function(){return s},P2:function(){return f},aW:function(){return d},an:function(){return l},kQ:function(){return c}});var o=n(982),r=n(885),a=n(762),i=n(413),l=function(e,t){var n=(0,i.Z)({},t);return delete n[e],n},s=function(){return Date.now().toString(36)+":"+Math.random().toString(36).slice(2)},c=function(e){return/^[0-9a-z]{8,}:[0-9a-z]+$/.test(e)},u=function(e,t){var n,o={},r=(0,a.Z)(t);try{for(r.s();!(n=r.n()).done;){var i=n.value;o[e(i)]=i}}catch(l){r.e(l)}finally{r.f()}return o},d=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object.entries(e).map((function(e){var t=(0,r.Z)(e,2),n=t[0],o=t[1];return(0,i.Z)({key:n},o)}))},p=function(e,t){var n,o=function(){for(var o=arguments.length,r=new Array(o),a=0;a<o;a++)r[a]=arguments[a];clearTimeout(n),n=setTimeout((function(){return e.apply(void 0,r)}),t)};return o.cancel=function(){return clearTimeout(n)},o},f=function(e,t){var n,r,a=!1,i=function i(){for(var l=arguments.length,s=new Array(l),c=0;c<l;c++)s[c]=arguments[c];a?r=s:(a=!0,n=setTimeout((function(){e.apply(void 0,s),a=!1,r&&i.apply(void 0,(0,o.Z)(r)),r=void 0}),t))};return i.cancel=function(){return clearTimeout(n)},i}},546:function(e,t,n){n.d(t,{V:function(){return o}});var o=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"image",n=(null===e||void 0===e?void 0:e[t])||(null===e||void 0===e?void 0:e.image);return n?"no-repeat center/contain url(".concat(n,")"):null===e||void 0===e?void 0:e.color}},915:function(e,t,n){n.d(t,{v:function(){return r}});var o=n(413),r=function e(t,n){if(void 0===t)return n;if(void 0===n)return t;if(t&&n&&"object"===typeof t&&"object"===typeof n){var r={};for(var a in(0,o.Z)((0,o.Z)({},t),n))r[a]=e(t[a],n[a]);return r}return t}},147:function(e){e.exports={i8:"0.1.39"}}}]);
//# sourceMappingURL=941.9119f602.chunk.js.map
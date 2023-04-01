"use strict";(self.webpackChunkmortal_wombat=self.webpackChunkmortal_wombat||[]).push([[516],{699:function(e,t,i){i.d(t,{u:function(){return n},z:function(){return o}});var n={airDrag:"0.001",digSpeed:"0.05",eatSpeed:"0.05",fallDamageMin:"0.3",fallDamageMult:"100",fallDamageSound:"https://static.heironimus.info/sound/Thud.ogg",gameOverSound:"https://static.heironimus.info/sound/YouDead.ogg",gravity:"0.005",health:"100",jumpPower:"0.111",maxHealth:"100",maxPoop:"10",moveDeceleration:"0.2",moveSpeed:"0.0222",poop:"0",swimPower:"0.008",waterDrag:"0.1"},o={0:{color:"green",diggable:!0,edible:!0,healing:"5",hp:"1",id:"g",image:"https://art.pixilart.com/sr2601896d34615.png",label:"grass",makePoop:"1",order:"1",sound:"https://static.heironimus.info/sound/Chomp.ogg"},1:{color:"saddleBrown",density:"20",diggable:!0,healing:"2",hp:"1",id:"p",image:"https://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/b0e07c73f8aa75e.png",label:"poop",movable:!0,moveDelay:"2",order:"2",sound:"https://static.heironimus.info/sound/SloppyPoopSoft.ogg"},2:{color:"gray",id:"s",image:"https://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/0041e8e715b1264.png",label:"stone",order:"3"},3:{color:"red",density:"1.1",id:"w",image:"https://piskel-imgstore-b.appspot.com/img/610cc71e-cdb9-11ec-8e05-2f9ec14027c3.gif",walkingImage:"https://piskel-imgstore-b.appspot.com/img/253fba5c-cdb9-11ec-acf8-2f9ec14027c3.gif",pushingImage:"https://piskel-imgstore-b.appspot.com/img/586bb7e6-cdb9-11ec-a846-2f9ec14027c3.gif",jumpingImage:"https://piskel-imgstore-b.appspot.com/img/4439c4fd-cdb9-11ec-9ce8-2f9ec14027c3.gif",diggingImage:"https://piskel-imgstore-b.appspot.com/img/3a751840-cdb9-11ec-8175-2f9ec14027c3.gif",crouchingImage:"https://piskel-imgstore-b.appspot.com/img/32ac8f9e-cdb9-11ec-9e05-2f9ec14027c3.gif",label:"wombat",order:"4"},4:{color:"orange",density:"2",healing:"-0.73",id:"m",image:"https://piskel-imgstore-b.appspot.com/img/a3591080-d48c-11ec-adf0-83f7175e2efe.gif",label:"magma",moveDelay:"30",moveStyle:"liquid",order:"5"},5:{collectible:!0,color:"cyan",id:"j",image:"https://i.ibb.co/m6V89v5/gem.gif",label:"jewel",order:"6",sound:"https://static.heironimus.info/sound/PinkFast.ogg"},6:{color:"purple",density:"0",diggable:!0,dropsLoot:"j",healing:"-0.5",hp:"2",id:"k",image:"https://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/2b956856674265a.png",label:"Koala",moveDelay:"25",moveStyle:"patrol",order:"7",sound:"https://static.heironimus.info/sound/Hiss.ogg"},7:{color:"blue",density:"0.85",id:"a",image:"https://piskel-imgstore-b.appspot.com/img/ffce45fa-d85c-11ec-a908-a90a117b47b4.gif",label:"water",moveDelay:"15",moveStyle:"liquid",order:"8"},8:{color:"#f04dd2",density:"10",id:"o",image:"https://piskel-imgstore-b.appspot.com/img/e92587eb-df95-11ec-b289-d74eb3c6d4e4.gif",label:"polymer",movable:!0,moveDelay:"90",moveStyle:"liquid",order:"9",sound:"https://static.heironimus.info/sound/Boing.ogg"},9:{color:"red",density:"1",hp:"1",id:"n",image:"https://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/6efea72003769ad.png",label:"NPC",moveDelay:"10",order:"10"},"-1":{color:"black",id:"_delete",label:"delete",order:"0"}}},63:function(e,t,i){i.d(t,{G9:function(){return f},Ib:function(){return y},Vx:function(){return p},ni:function(){return v},oL:function(){return m},oi:function(){return g},rZ:function(){return d}});var n=i(861),o=i(757),a=i.n(o),s=i(702),r=i(685),l=i(856);(0,s.ZF)({apiKey:"AIzaSyBEserPzSUos4MT3XRO8NKAO2oVk1-LS-I",authDomain:"mortal-wombat-8c76a.firebaseapp.com",projectId:"mortal-wombat-8c76a",storageBucket:"mortal-wombat-8c76a.appspot.com",messagingSenderId:"929181149015",appId:"1:929181149015:web:33a7f450bcdbb06ae64012",measurementId:"G-JL6HCMYYBS"});var c=(0,r.N8)(),u=(0,l.v0)(),h=(0,r.iH)(c),d="l5ybd0mu:2x3xfrsom4h",p=function(e,t){try{return(0,r.Vx)(h,e)}catch(i){console.error(i),t(i.message)}};"localhost:3000"===location.host&&(window._update=function(){var e=(0,n.Z)(a().mark((function e(t){return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,r.Vx)(h,t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());var g=function(){var e=(0,n.Z)(a().mark((function e(t){return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,r.U2)((0,r.iU)(h,t));case 2:return e.abrupt("return",e.sent.val());case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),m=function(e,t,i){try{var n=(0,r.iH)(c,e);return(0,r.jM)(n,(function(e){return t(e.val()||{})})),function(){return(0,r.S1)(n)}}catch(o){console.error(o),i(o.message)}},y=function(e,t){return(0,l.e5)(u,e,t)},f=function(e){return(0,l.Aj)(u,e)},v=function(){return(0,l.w7)(u)}},516:function(e,t,i){i.r(t);var n,o,a=i(861),s=i(757),r=i.n(s),l=i(671),c=i(144),u=i(457),h=i(885),d=i(136),p=i(668),g=i(546),m=i(147),y=function(e,t){return[Math.floor(e/24),Math.floor(t/24)]},f=function(){function e(){(0,l.Z)(this,e),this.el=document.createElement("div")}return(0,c.Z)(e,[{key:"destroy",value:function(){this.el.remove()}}]),e}(),v=function(e){(0,d.Z)(i,e);var t=(0,p.Z)(i);function i(e,n,o){var a;return(0,l.Z)(this,i),(a=t.call(this)).x=n,a.y=o,a.el.classList.add("chunk"),e.append(a.el),a}return(0,c.Z)(i,[{key:"updateVisibility",value:function(e,t){var i=Math.abs(e-this.x)<2&&Math.abs(t-this.y)<2;this.el.title="chunk ".concat(this.x,"_").concat(this.y," ").concat(e," ").concat(t),i!==this.isShowing&&(this.isShowing=i,this.el.style.display=i?"block":"none")}}]),i}(f),k=function(e){(0,d.Z)(i,e);var t=(0,p.Z)(i);function i(e){var n;return(0,l.Z)(this,i),(n=t.call(this)).chunks={},e.append(n.el),n}return(0,c.Z)(i,[{key:"update",value:function(e){var t=y(e.x,e.y),i=(0,h.Z)(t,2),n=i[0],o=i[1];if(n!==e.chunkX||o!==e.chunkY)for(var a in e.chunkX=n,e.chunkY=o,this.chunks)this.chunks[a].updateVisibility(n,o);var s=Math.round(innerWidth/2-48*e.x),r=Math.round(innerHeight/2-48*e.y);this.el.style.transform="translate(".concat(s,"px,").concat(r,"px)"),document.body.style.backgroundPosition="".concat(s>>2,"px ").concat(r>>2,"px")}},{key:"getChunk",value:function(e,t){var i=y(e,t),n=(0,h.Z)(i,2),o=n[0],a=n[1],s="".concat(o,"_").concat(a);return this.chunks[s]=this.chunks[s]||new v(this.el,o,a)}},{key:"clear",value:function(){this.el.replaceChildren(),this.chunks={}}}]),i}(f),b=function(e){(0,d.Z)(i,e);var t=(0,p.Z)(i);function i(e,n){var o;return(0,l.Z)(this,i),(o=t.call(this)).worldElement=n,o.el.classList.add("tile"),o.setBackground(e.type),o.update(e),o}return(0,c.Z)(i,[{key:"setBackground",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"image";this.el.style.background=(0,g.V)(e,t)}},{key:"update",value:function(e){var t=e.x,i=e.y,n=e.dirX,o=void 0===n?0:n,a=e.dirY,s=void 0===a?0:a,r=e.type,l=e.isJumping,c=e.isWalking,u=e.isPushing,d=e.isDigging,p=Math.atan2(s,o)+Math.PI,g=p>=.5*Math.PI&&p<=1.5*Math.PI;this.el.style.transform="\n    translate(".concat(48*t,"px,").concat(48*i,"px)\n    rotate(").concat(p,"rad)\n    ").concat(g?"scaleY(-1)":"");var m=d?"diggingImage":l?"jumpingImage":u?"pushingImage":c?"walkingImage":"image";m!==this.pImage&&(this.pImage=m,this.setBackground(r,m));var f=y(t,i),v=(0,h.Z)(f,2),k=v[0],b=v[1];k===this.chunkX&&b===this.chunkY||(this.chunkX=k,this.chunkY=b,this.worldElement.getChunk(t,i).el.append(this.el))}}]),i}(f),w=function(e){(0,d.Z)(i,e);var t=(0,p.Z)(i);function i(e){var n;return(0,l.Z)(this,i),(n=t.call(this)).el.classList.add("bar"),n.valueElement=document.createElement("div"),n.el.append(n.valueElement),e.append(n.el),n}return(0,c.Z)(i,[{key:"update",value:function(e,t,i){var n=this.valueElement;n.style.background=i,n.style.width=100*e/t+"%",n.innerText=e}}]),i}(f),x=function(e){(0,d.Z)(i,e);var t=(0,p.Z)(i);function i(e,n){var o;return(0,l.Z)(this,i),(o=t.call(this)).el.classList.add("collectibleCounter"),o.el.innerHTML='<span></span> <div style="background: '.concat((0,g.V)(n),'"></div>'),o.valueEl=o.el.querySelector("span"),e.append(o.el),o}return(0,c.Z)(i,[{key:"update",value:function(e){this.valueEl.innerText=e}}]),i}(f),S=function(e){(0,d.Z)(i,e);var t=(0,p.Z)(i);function i(e){var n;return(0,l.Z)(this,i),(n=t.call(this)).el.classList.add("hud"),n.healthBar=new w(n.el),n.poopBar=new w(n.el),e.append(n.el),n.counters={},n}return(0,c.Z)(i,[{key:"updateCounter",value:function(e,t){this.counters[e.id]||(this.counters[e.id]=new x(this.el,e)),this.counters[e.id].update(t)}}]),i}(f),T=function(e){(0,d.Z)(i,e);var t=(0,p.Z)(i);function i(e){var n;return(0,l.Z)(this,i),(n=t.call(this)).el.classList.add("version"),n.el.innerText="v"+m.i8,e.append(n.el),n}return(0,c.Z)(i)}(f),Z=function(e){(0,d.Z)(i,e);var t=(0,p.Z)(i);function i(e){var n;return(0,l.Z)(this,i),(n=t.call(this)).el.classList.add("dialog"),n.div=document.createElement("div"),n.div.classList.add("dialogContainer"),n.el.append(n.div),n.hide(),e.append(n.el),n}return(0,c.Z)(i,[{key:"say",value:function(e){this.text=e,this.choices=[],this.choiceIndex=0,this.render(),this.el.style.display="block",this.isOpen=!0}},{key:"choice",value:function(e,t){this.choices.push({text:e,action:t}),this.render()}},{key:"hasChoices",value:function(){return this.choices.length>0}},{key:"next",value:function(){this.choices.length?(this.choiceIndex=(this.choiceIndex+1)%this.choices.length,this.render()):this.hide()}},{key:"renderChoices",value:function(){var e=this,t=this.choices.map((function(t,i){var n=t.text;return"<li ".concat(i===e.choiceIndex?'class="selected"':"",">").concat(n,"</li>")})).join("");return t?"<ul>".concat(t,"</ul>"):""}},{key:"render",value:function(){this.div.innerHTML=this.text+this.renderChoices()}},{key:"choose",value:function(){this.hide(),this.choices[this.choiceIndex].action()}},{key:"hide",value:function(){this.el.style.display="none",this.isOpen=!1}}]),i}(f),M=(0,u.HK)((function(e){return e.code}),[{id:"left",key:"A",code:"KeyA"},{id:"right",key:"D",code:"KeyD"},{id:"up",key:"W",code:"KeyW"},{id:"down",key:"S",code:"KeyS"},{id:"poop",key:"P",code:"KeyP"},{id:"space",key:"Space",code:"Space"},{id:"reload",key:"R",code:"KeyR"}]),P=function(){function e(t,i,n){var o=this,a=t.onPress;(0,l.Z)(this,e),this.pressing={},this.additionalControls=n||[];var s=function(e){M[e.code]&&(o.pressing[M[e.code].id]="keydown"===e.type)};window.addEventListener("keydown",s),window.addEventListener("keyup",s),window.addEventListener("keypress",(function(e){M[e.code]&&a(M[e.code].id)}))}return(0,c.Z)(e,[{key:"getPressing",value:function(){var e=this.pressing;return this.additionalControls.forEach((function(t){e=t.getPressing(e)})),e}}]),e}(),I=i(413),D=0,E=1,C=2,B=0,L=1,X=function(){function e(t){var i=t.onPress;(0,l.Z)(this,e),this.onPress=i,this.lastGamepadState={}}return(0,c.Z)(e,[{key:"getGamepad",value:function(){for(var e=navigator.getGamepads(),t=0;t<e.length;t++)if(null!=e[t]&&e[t].connected)return e[t];return null}},{key:"getGamepadState",value:function(){var e=this.getGamepad();if(null!=e)return{up:e.axes[L]<=-.5||e.buttons[E].pressed,down:e.axes[L]>=.5,left:e.axes[B]<=-.25,right:e.axes[B]>=.25,space:e.buttons[D].pressed,poop:e.buttons[C].pressed}}},{key:"getPressing",value:function(e){var t=this,i=this.getGamepadState();if(!i)return e;var n=(0,I.Z)({},e),o=function(e){n[e]=!0,t.lastGamepadState[e]||t.onPress(e)};return i.up&&o("up"),i.down&&o("down"),i.left&&o("left"),i.right&&o("right"),i.space&&o("space"),i.poop&&o("poop"),this.lastGamepadState=i,n}}]),e}(),j=i(63),H=i(762),Y=i(915),O=i(699),W=function(e){if(e)try{return new Function("game",function(e){return"\nconst GRASS = 'g';\nconst POOP = 'p';\nconst STONE = 's';\nconst WOMBAT = 'w';\nconst MAGMA = 'm';\nconst JEWEL = 'j';\nconst KOALA = 'k';\nconst WATER = 'a';\nconst POLYMER = 'o';\nconst NPC = 'n';\n\nconst say = game.dialog.say.bind(game.dialog);\nconst choice = game.dialog.choice.bind(game.dialog);\nconst playSound = game.playSound.bind(game);\nconst pauseSound = game.pauseSound.bind(game);\nconst loopSound = game.loopSound.bind(game);\nconst jumpTo = game.jumpTo.bind(game);\n\nconst numCollected = game.numCollected.bind(game);\nconst setCollectible = game.setCollectible.bind(game);\n\nconst setPoop = game.setPoop.bind(game);\nconst setHealth = game.setHealth.bind(game);\n\nconst moveTile = game.moveTile.bind(game);\nconst addTile = game.addTile.bind(game);\nconst isEmpty = game.isEmpty.bind(game);\nconst getTile = game.getTile.bind(game);\nconst getTileByName = game.getTileByName.bind(game);\nconst damage = game.damage.bind(game);\nconst changeTileType = game.changeTileType.bind(game);\n\nconst you = game.you;\nconst poop = game.poop;\nconst health = game.health;\n\n".concat(e)}(e))}catch(t){return console.error("Invalid logic: ".concat(e)),void console.error(t)}},A=[[Math.floor,Math.floor],[Math.ceil,Math.floor],[Math.floor,Math.ceil],[Math.ceil,Math.ceil]],_=[[1,0],[0,1],[-1,0],[0,-1]],z=function(){function e(t){(0,l.Z)(this,e),this.rootElement=t,this.worldElement=new k(t),this.hud=new S(t),this.dialog=new Z(t),new T(t)}return(0,c.Z)(e,[{key:"load",value:function(){var e=(0,a.Z)(r().mark((function e(t,i){var n,o,a,s,l,c,u,h,d,p,g,m,y,f,v,k,w,x,S,T,Z,M,P,D;return r().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.loading=!0,e.next=3,(0,j.oi)("worlds/".concat(t));case 3:for(n=e.sent,o=n.world,a=n.tileTypes,s=n.gameConfig,l=(0,Y.v)(a,O.z),c=(0,Y.v)(s,O.u),u={},this.namedTiles={},d=0,p=Object.values(l);d<p.length;d++)g=p[d],u[g.id]=g;for(m in o)y=o[m],f=y.x,v=y.y,k=y.tileType,w=y.onSpace,x=y.onTouch,S=y.name,"w"===k?(h={x:f,y:v},delete o[m]):u[k]?(o[m]={x:f,y:v,type:u[k],onSpace:W(w),onTouch:W(x)},S&&(this.namedTiles[S]=o[m])):delete o[m];for(T in void 0!==(null===i||void 0===i?void 0:i.x)&&void 0!==(null===i||void 0===i?void 0:i.y)&&(h.x=i.x,h.y=i.y),this.sounds=this.buildSounds(c,u),this.worldElement.clear(),this.world={},o)this.addTile(o[T]);for(this.typeIndex=u,this.you=(0,I.Z)({x:0,y:0,xs:0,ys:0,dirX:1,dirY:0,type:u.w},h),this.you.el=new b(this.you,this.worldElement),Z=0,M=["x","y","dirX","dirY"];Z<M.length;Z++)P=M[Z],this.you["p"+P]=this.you[P];for(D in this.collectibles=(null===i||void 0===i?void 0:i.collectibles)||{},this.frame=0,this.digSpeed=.07,this.eatSpeed=.05,this.gravity=.005,this.health=100,this.maxHealth=100,this.poop=50,this.maxPoop=10,this.jumpPower=.11,this.moveSpeed=.02,this.moveDeceleration=.3,this.fallDamageMin=.2,this.fallDamageMult=100,this.swimPower=.005,this.waterDrag=.1,this.airDrag=.001,c)isNaN(c[D])||(this[D]=Number(c[D]));return this.setHealth((null===i||void 0===i?void 0:i.health)||this.health),this.setPoop((null===i||void 0===i?void 0:i.poop)||this.poop),this.you.el.update(this.you),this.worldElement.update(this.you),this.loading=!1,e.abrupt("return",this);case 46:case"end":return e.stop()}}),e,this)})));return function(t,i){return e.apply(this,arguments)}}()},{key:"buildSounds",value:function(e,t){var i={};Object.values(t).filter((function(e){return e.sound})).forEach((function(e){return i[e.id]=new Audio(e.sound)}));var n="Sound";return Object.keys(e).filter((function(t){return t.endsWith(n)&&e[t]})).forEach((function(t){var o=t.substring(0,t.length-n.length);i[o]=new Audio(e[t])})),i}},{key:"playSound",value:function(e){var t,i;void 0===this.sounds[e]&&(i=e,new RegExp("^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$","i").test(i))&&(this.sounds[e]=new Audio(e)),null===(t=this.sounds[e])||void 0===t||t.play()}},{key:"pauseSound",value:function(e){var t;null===(t=this.sounds[e])||void 0===t||t.pause()}},{key:"loopSound",value:function(e){this.playSound(e),this.sounds[e]&&(this.sounds[e].loop=!0)}},{key:"iterate",value:function(e){this.loading||(this.moveWombat(e),this.iterateTiles(),this.frame++)}},{key:"addTile",value:function(e){this.world["".concat(e.x,"_").concat(e.y)]=(0,I.Z)((0,I.Z)({},e),{},{el:new b(e,this.worldElement)})}},{key:"deleteTile",value:function(e){e.el.destroy(),delete this.world["".concat(e.x,"_").concat(e.y)]}},{key:"changeTileType",value:function(e,t){e.type=t,delete e.hp,e.el.setBackground(t)}},{key:"moveWombat",value:function(e){var t,i=this.you,n=this.world,o=i.swimBlock;if(i.isPushing=!1,i.isWalking=!1,i.isDigging=!1,this.health<=0)e.reload&&location.reload();else{(e.left||e.right||e.up||e.down)&&(i.dirX=0,i.dirY=0),e.left&&(i.xs-=i.swimBlock?this.swimPower:this.moveSpeed,i.dirX--,i.isWalking=!0),e.right&&(i.xs+=i.swimBlock?this.swimPower:this.moveSpeed,i.dirX++,i.isWalking=!0),e.up&&(i.swimBlock?i.ys-=this.swimPower:i.isJumping||i.ys||(i.ys-=this.jumpPower,i.isJumping=!0),i.dirY--),e.down&&(i.swimBlock&&(i.ys+=this.swimPower),i.dirY++),i.x+=i.xs,i.xs*=1-(i.swimBlock?this.waterDrag:this.moveDeceleration),i.y+=i.ys,i.ys*=1-(i.swimBlock?this.waterDrag:this.airDrag),i.ys+=this.gravity*(1-((null===(t=i.swimBlock)||void 0===t?void 0:t.type.density)||0));var a,s={},r=(0,H.Z)(A);try{for(r.s();!(a=r.n()).done;){var l=(0,h.Z)(a.value,2),c=l[0],u=l[1],d=c(i.x)+"_"+u(i.y);!s[d]&&n[d]&&(s[d]=!0,this.resolveCollision(n[d]))}}catch(T){r.e(T)}finally{r.f()}var p=0;delete i.swimBlock;var g,m=(0,H.Z)(A);try{for(m.s();!(g=m.n()).done;){var y=(0,h.Z)(g.value,2),f=y[0],v=y[1],k=n[f(i.x)+"_"+v(i.y)];if(k){if(k.type.collectible)return this.collect(k.type.id),this.deleteTile(k);k.type.healing<0&&(p=Math.max(p,-k.type.healing)),"liquid"===k.type.moveStyle&&(i.swimBlock=k)}}}catch(T){m.e(T)}finally{m.f()}if(i.swimBlock&&i.swimBlock!==o&&this.playSound(i.swimBlock.type.id),p&&this.setHealth(this.health-p),e.space){i.isDigging=!0;var b=Math.atan2(i.dirY,i.dirX),w=Math.round(i.x+Math.cos(b)),x=Math.round(i.y+Math.sin(b)),S=this.getTile(w,x);null!==S&&void 0!==S&&S.type.edible&&(this.damage(S,this.eatSpeed),this.setHealth(this.health+S.type.healing*this.eatSpeed),this.setPoop(this.poop+S.type.makePoop*this.eatSpeed),this.playSound(S.type.id)),null!==S&&void 0!==S&&S.type.diggable&&this.damage(S,this.digSpeed)}(Math.abs(i.x-i.px)>.1||Math.abs(i.y-i.py)>.1||i.dirX!==i.pdirX||i.dirY!==i.pdirY||i.isDigging!==i.pIsDigging||i.isJumping!==i.pIsJumping||i.isPushing!==i.pIsPushing||i.isWalking!==i.pIsWalking)&&(i.el.update(i),this.worldElement.update(i),i.px=i.x,i.py=i.y,i.pdirX=i.dirX,i.pdirY=i.dirY,i.pIsDigging=i.isDigging,i.pIsJumping=i.isJumping,i.pIsPushing=i.isPushing,i.pIsWalking=i.isWalking)}}},{key:"damage",value:function(e,t){if(null!==e&&void 0!==e&&e.type.hp)return void 0===e.hp&&(e.hp=e.type.hp),e.hp-=t,e.hp<=0?(e.type.dropsLoot?this.changeTileType(e,this.typeIndex[e.type.dropsLoot]):this.deleteTile(e),!0):void 0}},{key:"resolveCollision",value:function(e){var t=this.you;if(e.onTouch&&e.onTouch(this),!e.type.collectible&&"liquid"!==e.type.moveStyle)if(e.type.healing<0&&(this.setHealth(this.health+Number(e.type.healing)),this.playSound(e.type.id),t.y-=.1),Math.abs(t.x-e.x)>Math.abs(t.y-e.y)){var i=e.x<t.x?-1:1;t.isJumping||t.ys!==this.gravity?t.x=e.x+(t.x<e.x?-1:1):(t.isPushing=!0,e.type.movable&&this.isEmpty(e.x+i,e.y)&&this.moveTile(e.x,e.y,i,0)),t.xs=0,t.isWalking=!1}else{if(t.y<e.y&&(t.isJumping=!1),t.y=e.y+(t.y<e.y?-1:1),t.ys>this.fallDamageMin){var n=(t.ys-this.fallDamageMin)*this.fallDamageMult;this.setHealth(this.health-n),this.playSound("fallDamage");var o=Math.min(n,e.hp||1/0,e.type.hp||1/0);if(this.damage(e,n))return void(t.ys/=1+o)}t.ys=0}}},{key:"getTile",value:function(e,t){return this.world["".concat(e,"_").concat(t)]}},{key:"getTileByName",value:function(e){return this.namedTiles[e]}},{key:"isEmpty",value:function(e,t){return!this.getTile(e,t)}},{key:"badGuyCanWalkOn",value:function(e,t){var i=this.getTile(e,t);return i&&"liquid"!==i.type.moveStyle}},{key:"moveTile",value:function(e,t,i,n){var o="".concat(e,"_").concat(t),a=this.world[o];delete this.world[o],a.x+=i,a.y+=n,this.world["".concat(a.x,"_").concat(a.y)]=a,a.el.update(a)}},{key:"iterateTiles",value:function(){for(var e in this.world){var t=this.world[e];if(!(!t.type.moveDelay||this.frame%t.type.moveDelay>0||Math.abs(this.you.x-t.x)>32||Math.abs(this.you.y-t.y)>32)){if(this.isEmpty(t.x,t.y+1))this.moveTile(t.x,t.y,0,1);else if("liquid"===t.type.moveStyle){var i=this.isEmpty(t.x-1,t.y),n=this.isEmpty(t.x+1,t.y);i&&n?this.moveTile(t.x,t.y,Math.random()<.5?1:-1,0):i?this.moveTile(t.x,t.y,-1,0):n&&this.moveTile(t.x,t.y,1,0)}else"patrol"===t.type.moveStyle&&(t.dirX||(t.dirX=1),this.isEmpty(t.x+t.dirX,t.y)&&this.badGuyCanWalkOn(t.x+t.dirX,t.y+1)?this.moveTile(t.x,t.y,t.dirX,0):t.dirX*=-1);if("m"===t.type.id){var o,a=!1,s=(0,H.Z)(_);try{for(s.s();!(o=s.n()).done;){var r=(0,h.Z)(o.value,2),l=r[0],c=r[1],u=this.getTile(t.x+l,t.y+c);u&&(u.type.hp||"a"===u.type.id)&&("a"===u.type.id&&(a=!0),this.deleteTile(u))}}catch(d){s.e(d)}finally{s.f()}a&&this.changeTileType(t,this.typeIndex.s)}}}}},{key:"setHealth",value:function(e){this.health=Math.max(0,Math.min(this.maxHealth,e)),this.hud.healthBar.update(Math.ceil(this.health),this.maxHealth,this.health>30?"green":"red"),e<=0&&(this.playSound("gameOver"),this.rootElement.innerHTML+='<div class="youDead"><h1>you dead</h1><h2>press R to try again</h2></div>')}},{key:"numCollected",value:function(e){return this.collectibles[e]||0}},{key:"setCollectible",value:function(e,t){this.collectibles[e]=t,this.hud.updateCounter(this.typeIndex[e],t)}},{key:"collect",value:function(e){this.setCollectible(e,this.numCollected(e)+1),this.playSound(e)}},{key:"setPoop",value:function(e){this.poop=Math.max(0,Math.min(this.maxPoop,e)),this.hud.poopBar.update(Math.floor(this.poop),this.maxPoop,"saddleBrown")}},{key:"makePoop",value:function(){if(!(this.poop<1)){var e=this.you,t=this.world,i=this.typeIndex,n=Math.atan2(e.dirY,e.dirX)+Math.PI,o=Math.round(e.x+Math.cos(n)),a=Math.round(e.y+Math.sin(n));o===e.x&&a===e.y||t["".concat(o,"_").concat(a)]||(this.addTile({x:o,y:a,type:i.p}),this.setPoop(this.poop-1),this.playSound("p"))}}},{key:"updateViewport",value:function(){this.worldElement.update(this.you)}},{key:"interact",value:function(){var e,t,i=this.you,n=Math.atan2(i.dirY,i.dirX),o=Math.round(i.x+Math.cos(n)),a=Math.round(i.y+Math.sin(n));null===(e=this.getTile(o,a))||void 0===e||null===(t=e.onSpace)||void 0===t||t.call(e,this)}},{key:"jumpTo",value:function(){var e=(0,a.Z)(r().mark((function e(t){return r().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.load(t,{health:this.health,poop:this.poop,collectibles:this.collectibles});case 2:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()}]),e}(),G=function(){var e=(0,a.Z)(r().mark((function e(t){var i,n,o,a;return r().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(location.hash.length>1)try{n=JSON.parse(atob(location.hash.slice(1)))}catch(s){console.log("bad hash",s)}return o=(0,u.kQ)(null===(i=n)||void 0===i?void 0:i.worldId)?n.worldId:j.rZ,a=new z(t),e.next=5,a.load(o,n);case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),N=!1,J=document.querySelector("#root"),K=function e(){if(document.hasFocus()&&n){N&&(N=!1,document.body.style.opacity=1);var t=o.getPressing();n.dialog.isOpen||n.iterate(t)}else N||(N=!0,document.body.style.opacity=.5);requestAnimationFrame(e)},V=function(){var e=(0,a.Z)(r().mark((function e(){var t;return r().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,G(J);case 2:n=e.sent,o=new P({onPress:t=function(e){n.dialog.isOpen?"space"===e&&n.dialog.hasChoices()?n.dialog.choose():n.dialog.next():"poop"===e?n.makePoop():"space"===e&&n.interact()}},J,[new X({onPress:t})]),window.addEventListener("resize",(function(){n.updateViewport()})),K();case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();V()},457:function(e,t,i){i.d(t,{Ds:function(){return d},HK:function(){return u},M8:function(){return l},P2:function(){return p},aW:function(){return h},an:function(){return r},kQ:function(){return c}});var n=i(982),o=i(885),a=i(762),s=i(413),r=function(e,t){var i=(0,s.Z)({},t);return delete i[e],i},l=function(){return Date.now().toString(36)+":"+Math.random().toString(36).slice(2)},c=function(e){return/^[0-9a-z]{8,}:[0-9a-z]+$/.test(e)},u=function(e,t){var i,n={},o=(0,a.Z)(t);try{for(o.s();!(i=o.n()).done;){var s=i.value;n[e(s)]=s}}catch(r){o.e(r)}finally{o.f()}return n},h=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object.entries(e).map((function(e){var t=(0,o.Z)(e,2),i=t[0],n=t[1];return(0,s.Z)({key:i},n)}))},d=function(e,t){var i,n=function(){for(var n=arguments.length,o=new Array(n),a=0;a<n;a++)o[a]=arguments[a];clearTimeout(i),i=setTimeout((function(){return e.apply(void 0,o)}),t)};return n.cancel=function(){return clearTimeout(i)},n},p=function(e,t){var i,o,a=!1,s=function s(){for(var r=arguments.length,l=new Array(r),c=0;c<r;c++)l[c]=arguments[c];a?o=l:(a=!0,i=setTimeout((function(){e.apply(void 0,l),a=!1,o&&s.apply(void 0,(0,n.Z)(o)),o=void 0}),t))};return s.cancel=function(){return clearTimeout(i)},s}},546:function(e,t,i){i.d(t,{V:function(){return n}});var n=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"image",i=(null===e||void 0===e?void 0:e[t])||(null===e||void 0===e?void 0:e.image);return i?"no-repeat center/contain url(".concat(i,")"):null===e||void 0===e?void 0:e.color}},915:function(e,t,i){i.d(t,{v:function(){return o}});var n=i(413),o=function e(t,i){if(void 0===t)return i;if(void 0===i)return t;if(t&&i&&"object"===typeof t&&"object"===typeof i){var o={};for(var a in(0,n.Z)((0,n.Z)({},t),i))o[a]=e(t[a],i[a]);return o}return t}},147:function(e){e.exports={i8:"0.1.33"}}}]);
//# sourceMappingURL=516.6c2ea9de.chunk.js.map
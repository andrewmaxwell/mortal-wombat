"use strict";(self.webpackChunkmortal_wombat=self.webpackChunkmortal_wombat||[]).push([[927],{63:function(t,e,i){i.d(e,{G9:function(){return m},Ib:function(){return v},Vx:function(){return y},mu:function(){return p},ni:function(){return w},oL:function(){return f},rZ:function(){return d}});var n=i(861),a=i(757),r=i.n(a),o=i(426),s=i(408),l=i(918);(0,o.ZF)({apiKey:"AIzaSyBEserPzSUos4MT3XRO8NKAO2oVk1-LS-I",authDomain:"mortal-wombat-8c76a.firebaseapp.com",projectId:"mortal-wombat-8c76a",storageBucket:"mortal-wombat-8c76a.appspot.com",messagingSenderId:"929181149015",appId:"1:929181149015:web:33a7f450bcdbb06ae64012",measurementId:"G-JL6HCMYYBS"});var u=(0,s.N8)(),h=(0,l.v0)(),c=(0,s.iH)(u),d="l31p2np9:dy828s8l3wv",y=function(t,e){try{return(0,s.Vx)(c,t)}catch(i){console.error(i),e(i.message)}};"localhost:3000"===location.host&&(window._update=function(){var t=(0,n.Z)(r().mark((function t(e){return r().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,(0,s.Vx)(c,e);case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());var p=function(){var t=(0,n.Z)(r().mark((function t(e){return r().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.t0=Object,t.next=3,Promise.all(e.map(function(){var t=(0,n.Z)(r().mark((function t(e){return r().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.t0=e,t.next=3,(0,s.U2)((0,s.iU)(c,e));case 3:return t.t1=t.sent.val(),t.abrupt("return",[t.t0,t.t1]);case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()));case 3:return t.t1=t.sent,t.abrupt("return",t.t0.fromEntries.call(t.t0,t.t1));case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),f=function(t,e,i){try{var n=(0,s.iH)(u,t);return(0,s.jM)(n,(function(t){return e(t.val()||{})})),function(){return(0,s.S1)(n)}}catch(a){console.error(a),i(a.message)}},v=function(t,e){return(0,l.e5)(h,t,e)},m=function(t){return(0,l.Aj)(h,t)},w=function(){return(0,l.w7)(h)}},927:function(t,e,i){i.r(e);var n,a,r=i(861),o=i(757),s=i.n(o),l=i(671),u=i(144),h=i(457),c=i(885),d=i(136),y=i(668),p=i(546),f=i(147),v=function(t,e){return[Math.floor(t/24),Math.floor(e/24)]},m=function(){function t(){(0,l.Z)(this,t),this.el=document.createElement("div")}return(0,u.Z)(t,[{key:"destroy",value:function(){this.el.remove()}}]),t}(),w=function(t){(0,d.Z)(i,t);var e=(0,y.Z)(i);function i(t,n,a){var r;return(0,l.Z)(this,i),(r=e.call(this)).x=n,r.y=a,r.el.classList.add("chunk"),t.append(r.el),r}return(0,u.Z)(i,[{key:"updateVisibility",value:function(t,e){var i=Math.abs(t-this.x)<2&&Math.abs(e-this.y)<2;this.el.title="chunk ".concat(this.x,"_").concat(this.y," ").concat(t," ").concat(e),i!==this.isShowing&&(this.isShowing=i,this.el.style.display=i?"block":"none")}}]),i}(m),x=function(t){(0,d.Z)(i,t);var e=(0,y.Z)(i);function i(t){var n;return(0,l.Z)(this,i),(n=e.call(this)).chunks={},t.append(n.el),n}return(0,u.Z)(i,[{key:"update",value:function(t){var e=v(t.x,t.y),i=(0,c.Z)(e,2),n=i[0],a=i[1];if(n!==t.chunkX||a!==t.chunkY)for(var r in t.chunkX=n,t.chunkY=a,this.chunks)this.chunks[r].updateVisibility(n,a);var o=Math.round(innerWidth/2-48*t.x),s=Math.round(innerHeight/2-48*t.y);this.el.style.transform="translate(".concat(o,"px,").concat(s,"px)"),document.body.style.backgroundPosition="".concat(o>>2,"px ").concat(s>>2,"px")}},{key:"getChunk",value:function(t,e){var i=v(t,e),n=(0,c.Z)(i,2),a=n[0],r=n[1],o="".concat(a,"_").concat(r);return this.chunks[o]=this.chunks[o]||new w(this.el,a,r)}}]),i}(m),k=function(t){(0,d.Z)(i,t);var e=(0,y.Z)(i);function i(t,n){var a;return(0,l.Z)(this,i),(a=e.call(this)).worldElement=n,a.el.classList.add("tile"),a.updateType(t.type),a.update(t),a}return(0,u.Z)(i,[{key:"updateType",value:function(t){this.el.style.background=(0,p.V)(t)}},{key:"update",value:function(t){var e=t.x,i=t.y,n=t.dirX,a=void 0===n?0:n,r=t.dirY,o=void 0===r?0:r,s=Math.atan2(o,a)+Math.PI,l=s>=.5*Math.PI&&s<=1.5*Math.PI;this.el.style.transform="\n    translate(".concat(48*e,"px,").concat(48*i,"px)\n    rotate(").concat(s,"rad)\n    ").concat(l?"scaleY(-1)":"");var u=v(e,i),h=(0,c.Z)(u,2),d=h[0],y=h[1];d===this.chunkX&&y===this.chunkY||(this.chunkX=d,this.chunkY=y,this.worldElement.getChunk(e,i).el.append(this.el))}}]),i}(m),g=function(t){(0,d.Z)(i,t);var e=(0,y.Z)(i);function i(t){var n;return(0,l.Z)(this,i),(n=e.call(this)).el.classList.add("bar"),n.valueElement=document.createElement("div"),n.el.append(n.valueElement),t.append(n.el),n}return(0,u.Z)(i,[{key:"update",value:function(t,e,i){var n=this.valueElement;n.style.background=i,n.style.width=100*t/e+"%",n.innerText=Math.ceil(t)}}]),i}(m),Z=function(t){(0,d.Z)(i,t);var e=(0,y.Z)(i);function i(t,n){var a;return(0,l.Z)(this,i),(a=e.call(this)).el.classList.add("collectibleCounter"),a.el.innerHTML='<span></span> <div style="background: '.concat((0,p.V)(n),'"></div>'),a.valueEl=a.el.querySelector("span"),t.append(a.el),a}return(0,u.Z)(i,[{key:"update",value:function(t){this.valueEl.innerText=t}}]),i}(m),b=function(t){(0,d.Z)(i,t);var e=(0,y.Z)(i);function i(t){var n;return(0,l.Z)(this,i),(n=e.call(this)).el.classList.add("hud"),n.healthBar=new g(n.el),n.poopBar=new g(n.el),t.append(n.el),n.counters={},n}return(0,u.Z)(i,[{key:"updateCounter",value:function(t,e){this.counters[t.id]||(this.counters[t.id]=new Z(this.el,t)),this.counters[t.id].update(e)}}]),i}(m),M=function(t){(0,d.Z)(i,t);var e=(0,y.Z)(i);function i(t){var n;return(0,l.Z)(this,i),(n=e.call(this)).el.classList.add("version"),n.el.innerText="v"+f.i8,t.append(n.el),n}return(0,u.Z)(i)}(m),T=(0,h.HK)((function(t){return t.code}),[{id:"left",key:"A",code:"KeyA"},{id:"right",key:"D",code:"KeyD"},{id:"up",key:"W",code:"KeyW"},{id:"down",key:"S",code:"KeyS"},{id:"poop",key:"P",code:"KeyP"},{id:"attack",key:"Space",code:"Space"},{id:"reload",key:"R",code:"KeyR"}]),P=function(){function t(e,i){var n=this,a=e.onPress;(0,l.Z)(this,t),this.pressing={};var r=function(t){T[t.code]&&(n.pressing[T[t.code].id]="keydown"===t.type)};window.addEventListener("keydown",r),window.addEventListener("keyup",r),window.addEventListener("keypress",(function(t){T[t.code]&&a(T[t.code].id)}))}return(0,u.Z)(t,[{key:"getPressing",value:function(){return this.pressing}}]),t}(),S=i(63),E=i(762),X=i(413),D=[[Math.floor,Math.floor],[Math.ceil,Math.floor],[Math.floor,Math.ceil],[Math.ceil,Math.ceil]],Y=[[1,0],[0,1],[-1,0],[0,-1]],B=function(){function t(e,i,n,a,r){for(var o in(0,l.Z)(this,t),this.rootElement=r,this.worldElement=new x(r),this.hud=new b(r),new M(r),this.world={},i)this.addTile(i[o]);this.typeIndex=a,this.you=(0,X.Z)({x:0,y:0,xs:0,ys:0,dirX:1,dirY:0},e),this.you.el=new k({x:this.you.x,y:this.you.y,type:a.w},this.worldElement);for(var s=0,u=["x","y","dirX","dirY"];s<u.length;s++){var h=u[s];this.you["p"+h]=this.you[h]}for(var c in this.collectibles={},this.frame=0,this.digSpeed=.07,this.eatSpeed=.05,this.gravity=.005,this.health=100,this.maxHealth=100,this.poop=50,this.maxPoop=10,this.jumpPower=.11,this.moveSpeed=.02,this.moveDeceleration=.3,this.fallDamageMin=.2,this.fallDamageMult=100,this.swimPower=.005,this.waterDrag=.1,this.airDrag=.001,n)isNaN(n[c])||(this[c]=Number(n[c]));this.setHealth(this.health),this.setPoop(this.poop),this.you.el.update(this.you),this.worldElement.update(this.you)}return(0,u.Z)(t,[{key:"iterate",value:function(t){this.moveWombat(t),this.iterateTiles(),this.frame++}},{key:"addTile",value:function(t){this.world["".concat(t.x,"_").concat(t.y)]=(0,X.Z)((0,X.Z)({},t),{},{el:new k(t,this.worldElement)})}},{key:"deleteTile",value:function(t){t.el.destroy(),delete this.world["".concat(t.x,"_").concat(t.y)]}},{key:"changeTileType",value:function(t,e){t.type=e,delete t.hp,t.el.updateType(e)}},{key:"moveWombat",value:function(t){var e,i=this.you,n=this.world;if(this.health<=0)t.reload&&location.reload();else{(t.left||t.right||t.up||t.down)&&(i.dirX=0,i.dirY=0),t.left&&(i.xs-=i.swimBlock?this.swimPower:this.moveSpeed,i.dirX--),t.right&&(i.xs+=i.swimBlock?this.swimPower:this.moveSpeed,i.dirX++),t.up&&(i.swimBlock?i.ys-=this.swimPower:i.jumping||i.ys||(i.ys-=this.jumpPower,i.jumping=!0),i.dirY--),t.down&&(i.swimBlock&&(i.ys+=this.swimPower),i.dirY++),i.x+=i.xs,i.xs*=1-(i.swimBlock?this.waterDrag:this.moveDeceleration),i.y+=i.ys,i.ys*=1-(i.swimBlock?this.waterDrag:this.airDrag),i.ys+=this.gravity*(1-((null===(e=i.swimBlock)||void 0===e?void 0:e.type.density)||0));var a,r={},o=(0,E.Z)(D);try{for(o.s();!(a=o.n()).done;){var s=(0,c.Z)(a.value,2),l=s[0],u=s[1],h=l(i.x)+"_"+u(i.y);!r[h]&&n[h]&&(r[h]=!0,this.resolveCollision(n[h]))}}catch(b){o.e(b)}finally{o.f()}var d=0;delete i.swimBlock;var y,p=(0,E.Z)(D);try{for(p.s();!(y=p.n()).done;){var f=(0,c.Z)(y.value,2),v=f[0],m=f[1],w=n[v(i.x)+"_"+m(i.y)];if(w){if(w.type.collectible)return this.collect(w.type),this.deleteTile(w);w.type.healing<0&&(d=Math.max(d,-w.type.healing)),"liquid"===w.type.moveStyle&&(i.swimBlock=w)}}}catch(b){p.e(b)}finally{p.f()}if(d&&this.setHealth(this.health-d),(Math.abs(i.x-i.px)>.1||Math.abs(i.y-i.py)>.1||i.dirX!==i.pdirX||i.dirY!==i.pdirY)&&(i.el.update(i),this.worldElement.update(i),i.px=i.x,i.py=i.y,i.pdirX=i.dirX,i.pdirY=i.dirY),t.attack){var x=Math.atan2(i.dirY,i.dirX),k=Math.round(i.x+Math.cos(x)),g=Math.round(i.y+Math.sin(x)),Z=this.getTile(k,g);null!==Z&&void 0!==Z&&Z.type.edible&&(this.damage(Z,this.eatSpeed),this.setHealth(this.health+Z.type.healing*this.eatSpeed),this.setPoop(this.poop+Z.type.makePoop*this.eatSpeed)),null!==Z&&void 0!==Z&&Z.type.diggable&&this.damage(Z,this.digSpeed)}}}},{key:"damage",value:function(t,e){if(null!==t&&void 0!==t&&t.type.hp)return void 0===t.hp&&(t.hp=t.type.hp),t.hp-=e,t.hp<=0?(t.type.dropsLoot?this.changeTileType(t,this.typeIndex[t.type.dropsLoot]):this.deleteTile(t),!0):void 0}},{key:"resolveCollision",value:function(t){var e=this.you;if(!t.type.collectible&&"liquid"!==t.type.moveStyle)if(t.type.healing<0&&(this.setHealth(this.health+Number(t.type.healing)),e.y-=.1),Math.abs(e.x-t.x)>Math.abs(e.y-t.y)){var i=t.x<e.x?-1:1;!e.jumping&&e.ys===this.gravity&&t.type.movable&&this.isEmpty(t.x+i,t.y)?this.moveTile(t.x,t.y,i,0):e.x=t.x+(e.x<t.x?-1:1),e.xs=0}else{if(e.y<t.y&&(e.jumping=!1),e.y=t.y+(e.y<t.y?-1:1),e.ys>this.fallDamageMin){var n=(e.ys-this.fallDamageMin)*this.fallDamageMult;this.setHealth(this.health-n);var a=Math.min(n,t.hp||1/0,t.type.hp||1/0);if(this.damage(t,n))return void(e.ys/=1+a)}e.ys=0}}},{key:"getTile",value:function(t,e){return this.world["".concat(t,"_").concat(e)]}},{key:"isEmpty",value:function(t,e){return!this.getTile(t,e)}},{key:"badGuyCanWalkOn",value:function(t,e){var i=this.getTile(t,e);return i&&"liquid"!==i.type.moveStyle}},{key:"moveTile",value:function(t,e,i,n){var a="".concat(t,"_").concat(e),r=this.world[a];delete this.world[a],r.x+=i,r.y+=n,this.world["".concat(r.x,"_").concat(r.y)]=r,r.el.update(r)}},{key:"iterateTiles",value:function(){for(var t in this.world){var e=this.world[t];if(!(!e.type.moveDelay||this.frame%e.type.moveDelay>0||Math.abs(this.you.x-e.x)>32||Math.abs(this.you.y-e.y)>32)){if(this.isEmpty(e.x,e.y+1))this.moveTile(e.x,e.y,0,1);else if("liquid"===e.type.moveStyle){var i=this.isEmpty(e.x-1,e.y),n=this.isEmpty(e.x+1,e.y);i&&n?this.moveTile(e.x,e.y,Math.random()<.5?1:-1,0):i?this.moveTile(e.x,e.y,-1,0):n&&this.moveTile(e.x,e.y,1,0)}else"patrol"===e.type.moveStyle&&(e.dirX||(e.dirX=1),this.isEmpty(e.x+e.dirX,e.y)&&this.badGuyCanWalkOn(e.x+e.dirX,e.y+1)?this.moveTile(e.x,e.y,e.dirX,0):e.dirX*=-1);if("m"===e.type.id){var a,r=!1,o=(0,E.Z)(Y);try{for(o.s();!(a=o.n()).done;){var s=(0,c.Z)(a.value,2),l=s[0],u=s[1],h=this.getTile(e.x+l,e.y+u);h&&(h.type.hp||"a"===h.type.id)&&("a"===h.type.id&&(r=!0),this.deleteTile(h))}}catch(d){o.e(d)}finally{o.f()}r&&this.changeTileType(e,this.typeIndex.s)}}}}},{key:"setHealth",value:function(t){this.health=Math.max(0,Math.min(this.maxHealth,t)),this.hud.healthBar.update(this.health,this.maxHealth,this.health>30?"green":"red"),t<=0&&(this.rootElement.innerHTML+='<div class="youDead"><h1>you dead</h1><h2>press R to try again</h2></div>')}},{key:"setPoop",value:function(t){this.poop=Math.max(0,Math.min(this.maxPoop,t)),this.hud.poopBar.update(this.poop,this.maxPoop,"saddleBrown")}},{key:"collect",value:function(t){this.collectibles[t.id]=(this.collectibles[t.id]||0)+1,this.hud.updateCounter(t,this.collectibles[t.id])}},{key:"makePoop",value:function(){if(!(this.poop<1)){var t=this.you,e=this.world,i=this.typeIndex,n=Math.atan2(t.dirY,t.dirX)+Math.PI,a=Math.round(t.x+Math.cos(n)),r=Math.round(t.y+Math.sin(n));a===t.x&&r===t.y||e["".concat(a,"_").concat(r)]||(this.addTile({x:a,y:r,type:i.p}),this.setPoop(this.poop-1))}}},{key:"updateViewport",value:function(){this.worldElement.update(this.you)}}]),t}(),H=function(){var t=(0,r.Z)(s().mark((function t(e){var i,n,a,r,o,l,u,c,d,y,p,f,v,m,w,x,k,g,Z;return s().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(location.hash.length>1)try{r=JSON.parse(atob(location.hash.slice(1)))}catch(s){console.log("bad hash",s)}return o="worlds/".concat((0,h.kQ)(null===(i=r)||void 0===i?void 0:i.worldId)?r.worldId:S.rZ,"/world"),t.next=4,(0,S.mu)(["tileTypes",o,"gameConfig"]);case 4:for(l=t.sent,u=l.tileTypes,c=l.gameConfig,d=l[o],y={},f=0,v=Object.values(u);f<v.length;f++)m=v[f],y[m.id]=m;for(w in d)x=d[w],k=x.x,g=x.y,"w"===(Z=x.tileType)?(p={x:k,y:g},delete d[w]):y[Z]?d[w]={x:k,y:g,type:y[Z]}:delete d[w];return void 0!==(null===(n=r)||void 0===n?void 0:n.x)&&void 0!==(null===(a=r)||void 0===a?void 0:a.y)&&(p.x=r.x,p.y=r.y),t.abrupt("return",new B(p,d,c,y,e));case 12:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),I=!1,L=document.querySelector("#root"),C=function t(){document.hasFocus()&&n?(I&&(I=!1,document.body.style.opacity=1),n.iterate(a.getPressing())):I||(I=!0,document.body.style.opacity=.5),requestAnimationFrame(t)},_=function(){var t=(0,r.Z)(s().mark((function t(){return s().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,H(L);case 2:n=t.sent,a=new P({onPress:function(t){"poop"===t&&n.makePoop()}},L),window.addEventListener("resize",(function(){n.updateViewport()})),C();case 6:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();_()},457:function(t,e,i){i.d(e,{Ds:function(){return d},HK:function(){return h},M8:function(){return l},P2:function(){return y},aW:function(){return c},an:function(){return s},kQ:function(){return u}});var n=i(982),a=i(885),r=i(762),o=i(413),s=function(t,e){var i=(0,o.Z)({},e);return delete i[t],i},l=function(){return Date.now().toString(36)+":"+Math.random().toString(36).slice(2)},u=function(t){return/^[0-9a-z]{8,}:[0-9a-z]+$/.test(t)},h=function(t,e){var i,n={},a=(0,r.Z)(e);try{for(a.s();!(i=a.n()).done;){var o=i.value;n[t(o)]=o}}catch(s){a.e(s)}finally{a.f()}return n},c=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object.entries(t).map((function(t){var e=(0,a.Z)(t,2),i=e[0],n=e[1];return(0,o.Z)({key:i},n)}))},d=function(t,e){var i,n=function(){for(var n=arguments.length,a=new Array(n),r=0;r<n;r++)a[r]=arguments[r];clearTimeout(i),i=setTimeout((function(){return t.apply(void 0,a)}),e)};return n.cancel=function(){return clearTimeout(i)},n},y=function(t,e){var i,a,r=!1,o=function o(){for(var s=arguments.length,l=new Array(s),u=0;u<s;u++)l[u]=arguments[u];r?a=l:(r=!0,i=setTimeout((function(){t.apply(void 0,l),r=!1,a&&o.apply(void 0,(0,n.Z)(a)),a=void 0}),e))};return o.cancel=function(){return clearTimeout(i)},o}},546:function(t,e,i){i.d(e,{V:function(){return n}});var n=function(t){return null!==t&&void 0!==t&&t.image?"no-repeat center/contain url(".concat(t.image,")"):null===t||void 0===t?void 0:t.color}},147:function(t){t.exports={i8:"0.1.13"}}}]);
//# sourceMappingURL=927.e127e59b.chunk.js.map
"use strict";(self.webpackChunkmortal_wombat=self.webpackChunkmortal_wombat||[]).push([[772],{63:function(e,t,n){n.d(t,{G9:function(){return x},Ib:function(){return m},Vx:function(){return d},mu:function(){return y},ni:function(){return f},oL:function(){return p}});var r=n(861),a=n(757),o=n.n(a),i=n(426),s=n(408),c=n(162);(0,i.ZF)({apiKey:"AIzaSyBEserPzSUos4MT3XRO8NKAO2oVk1-LS-I",authDomain:"mortal-wombat-8c76a.firebaseapp.com",projectId:"mortal-wombat-8c76a",storageBucket:"mortal-wombat-8c76a.appspot.com",messagingSenderId:"929181149015",appId:"1:929181149015:web:33a7f450bcdbb06ae64012",measurementId:"G-JL6HCMYYBS"});var u=(0,s.N8)(),l=(0,c.v0)(),h=(0,s.iH)(u),d=function(e,t){try{return console.log("updates",e),(0,s.Vx)(h,e)}catch(n){console.error(n),t(n.message)}};window._update=function(){var e=(0,r.Z)(o().mark((function e(t){return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=console,e.next=3,(0,s.Vx)(h,t);case 3:return e.t1=e.sent,e.abrupt("return",e.t0.log.call(e.t0,e.t1));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();var y=function(){var e=(0,r.Z)(o().mark((function e(t){return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=Object,e.next=3,Promise.all(t.map(function(){var e=(0,r.Z)(o().mark((function e(t){return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=t,e.next=3,(0,s.U2)((0,s.iU)(h,t));case 3:return e.t1=e.sent.val(),e.abrupt("return",[e.t0,e.t1]);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 3:return e.t1=e.sent,e.abrupt("return",e.t0.fromEntries.call(e.t0,e.t1));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),p=function(e,t,n){try{var r=(0,s.iH)(u,e);return(0,s.jM)(r,(function(e){return t(e.val())})),function(){return(0,s.S1)(r)}}catch(a){console.error(a),n(a.message)}},m=function(e,t){return(0,c.e5)(l,e,t)},x=function(e){return(0,c.Aj)(l,e)},f=function(){return(0,c.w7)(l)}},772:function(e,t,n){n.r(t);var r=n(413),a=n(885),o=n(791),i=n(250),s=n(861),c=n(757),u=n.n(c),l=n(63),h=n(671),d=n(144),y=function(){function e(t,n,a,o){for(var i in(0,h.Z)(this,e),this.world=n,this.typeIndex=o,this.you=(0,r.Z)({x:0,y:0,xs:0,ys:0,dirX:1,dirY:0},t),this.jewels=0,this.frame=0,this.digSpeed=.07,this.eatSpeed=.05,this.gravity=.005,this.health=100,this.maxHealth=100,this.poop=50,this.maxPoop=10,this.jumpPower=.11,this.moveSpeed=.02,this.moveDeceleration=.3,a)isNaN(a[i])||(this[i]=Number(a[i]))}return(0,d.Z)(e,[{key:"iterate",value:function(e){return this.iterateYou(e),this.iterateTiles(),this.frame++,this}},{key:"iterateYou",value:function(e){var t=this.you,n=this.world,r=this.gravity;if(this.health<=0)e.KeyR&&location.reload();else{(e.KeyA||e.KeyD||e.KeyW||e.KeyS)&&(t.dirX=0,t.dirY=0),e.KeyA&&(t.xs-=this.moveSpeed,t.dirX--),e.KeyD&&(t.xs+=this.moveSpeed,t.dirX++),e.KeyW&&(t.jumping||t.ys||(t.ys-=this.jumpPower,t.jumping=!0),t.dirY--),e.KeyS&&t.dirY++,t.x+=t.xs,t.xs*=1-this.moveDeceleration,t.ys+=r,t.y+=t.ys;for(var a=0,o=["".concat(Math.floor(t.x),"_").concat(Math.floor(t.y)),"".concat(Math.ceil(t.x),"_").concat(Math.floor(t.y)),"".concat(Math.floor(t.x),"_").concat(Math.ceil(t.y)),"".concat(Math.ceil(t.x),"_").concat(Math.ceil(t.y))];a<o.length;a++){var i=o[a];if(n[i])this.interact(t,n[i],e)&&delete n[i]}}}},{key:"isEmpty",value:function(e,t){return(e!==this.you.x||t!==this.you.y)&&!this.world["".concat(e,"_").concat(t)]}},{key:"moveTile",value:function(e,t,n,r){var a="".concat(e,"_").concat(t),o=this.world[a];delete this.world[a],o.x+=n,o.y+=r,this.world["".concat(o.x,"_").concat(o.y)]=o}},{key:"iterateTiles",value:function(){for(var e in this.world){var t=this.world[e];if(t.type.moveDelay&&!(this.frame%t.type.moveDelay>0))if(this.isEmpty(t.x,t.y+1))this.moveTile(t.x,t.y,0,1);else if(t.type.liquid){var n=this.isEmpty(t.x-1,t.y),r=this.isEmpty(t.x+1,t.y);n&&r?this.moveTile(t.x,t.y,Math.random()<.5?1:-1,0):n?this.moveTile(t.x,t.y,-1,0):r&&this.moveTile(t.x,t.y,1,0)}}}},{key:"interact",value:function(e,t,n){if(this.onIntersect(t,n))return!0;if(Math.abs(e.x-t.x)>Math.abs(e.y-t.y)){var r=t.x<e.x?-1:1;t.type.movable&&this.isEmpty(t.x+r,t.y)?this.moveTile(t.x,t.y,r,0):e.x=t.x+(e.x<t.x?-1:1),e.xs=0}else{e.y<t.y&&(e.jumping=!1);var a=t.y<e.y?-1:1;t.type.movable&&this.isEmpty(t.x,t.y+a)?this.moveTile(t.x,t.y,0,a):e.y=t.y+(e.y<t.y?-1:1),e.ys=0}}},{key:"onIntersect",value:function(e,t){return e.type.collectible?(this.jewels++,!0):(e.type.healing<0&&(this.health=Math.max(0,this.health+Number(e.type.healing))),!!(e.type.edible&&t.Space&&(void 0===e.eaten&&(e.eaten=1),e.eaten-=this.eatSpeed,this.health=Math.min(this.maxHealth,this.health+e.type.healing*this.eatSpeed),this.poop=Math.min(this.maxPoop,this.poop+e.type.makePoop*this.eatSpeed),e.eaten<=0))||(!!(e.type.diggable&&t.Space&&(void 0===e.dug&&(e.dug=1),e.dug-=this.digSpeed,e.dug<=0))||void 0))}},{key:"makePoop",value:function(){if(!(this.poop<1)){var e=this.you,t=this.world,n=this.typeIndex,r=Math.atan2(e.dirY,e.dirX)+Math.PI,a=Math.round(e.x+Math.cos(r)),o=Math.round(e.y+Math.sin(r));a===e.x&&o===e.y||t["".concat(a,"_").concat(o)]||(t["".concat(a,"_").concat(o)]={x:a,y:o,type:n.p},this.poop--)}}}]),e}(),p=function(){var e=(0,s.Z)(u().mark((function e(){var t,n,r,a,o,i,s,c,h,d,p,m,x,f;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,l.mu)(["tileTypes","world","gameConfig"]);case 2:for(t=e.sent,n=t.tileTypes,r=t.world,a=t.gameConfig,o={},s=0,c=Object.values(n);s<c.length;s++)h=c[s],o[h.id]=h;for(d in r)p=r[d],m=p.x,x=p.y,"w"===(f=p.tileType)?(i={x:m,y:x},delete r[d]):o[f]?r[d]={x:m,y:x,type:o[f]}:delete r[d];if(location.hash.length>1)try{i=JSON.parse(atob(location.hash.slice(1)))}catch(u){console.log("bad hash",u)}return e.abrupt("return",new y(i,r,a,o));case 11:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),m=n(546),x=n(184),f=48,v=function(e){var t=e.you,n=e.children,r=innerWidth/2-t.x*f,a=innerHeight/2-t.y*f;return(0,x.jsx)("div",{style:{transform:"translate(".concat(r,"px,").concat(a,"px)")},children:n})},w=function(e){var t=e.world;return Object.entries(t).map((function(e){var t=(0,a.Z)(e,2),n=t[0],r=t[1],o=r.x,i=r.y,s=r.type;return(0,x.jsx)("div",{className:"tile",style:{transform:"translate(".concat(o*f,"px, ").concat(i*f,"px)"),background:(0,m.V)(s)}},n)}))},g=function(e){var t=e.you,n=e.typeIndex,r=Math.atan2(t.dirY,t.dirX)+Math.PI,a=r>=.5*Math.PI&&r<=1.5*Math.PI;return(0,x.jsx)("div",{className:"tile",style:{transform:"\n      translate(".concat(t.x*f,"px,").concat(t.y*f,"px)\n      rotate(").concat(r,"rad)\n      ").concat(a?"scaleY(-1)":""),background:(0,m.V)(n.w)}})},j=function(e){var t=e.value,n=e.maxValue,r=e.color;return(0,x.jsx)("div",{className:"bar",children:(0,x.jsx)("div",{style:{background:r,width:100*t/n+"%"},children:Math.floor(t)})})},b=function(e){var t=e.health,n=e.maxHealth,r=e.poop,a=e.maxPoop,o=e.jewels,i=e.typeIndex;return t>0?(0,x.jsxs)("div",{className:"hud",children:[(0,x.jsx)(j,{value:t,maxValue:n,color:t>30?"green":"red"}),(0,x.jsx)(j,{value:r,maxValue:a,color:"saddleBrown"}),(0,x.jsxs)("div",{className:"jewelCounter",children:[o," ",(0,x.jsx)("img",{src:i.j.image})]})]}):(0,x.jsxs)("div",{className:"youDead",children:[(0,x.jsx)("h1",{children:"you dead"}),(0,x.jsx)("h2",{children:"press R to try again"})]})},k=function(e){var t=e.you,n=e.world,r=e.health,a=e.maxHealth,o=e.poop,i=e.maxPoop,s=e.jewels,c=e.typeIndex;return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(v,{you:t,children:[(0,x.jsx)(w,{world:n}),(0,x.jsx)(g,{you:t,typeIndex:c})]}),(0,x.jsx)(b,{health:r,maxHealth:a,poop:o,maxPoop:i,jewels:s,typeIndex:c})]})},M=function(){var e=function(){var e=(0,o.useRef)(),t=(0,o.useState)(0),n=(0,a.Z)(t,2)[1];return(0,o.useEffect)((function(){var t,r={};p().then((function(a){e.current=a,(t=function(){e.current.iterate(r),n((function(e){return e+1})),requestAnimationFrame(t)})()}));var a=function(e){return r[e.code]="keydown"===e.type},o=function(t){"KeyP"===t.code&&e.current.makePoop()};return window.addEventListener("keydown",a),window.addEventListener("keyup",a),window.addEventListener("keypress",o),function(){window.removeEventListener("keydown",a),window.removeEventListener("keyup",a),window.removeEventListener("keypress",o),cancelAnimationFrame(t)}}),[]),e.current}();return e&&(0,x.jsx)(k,(0,r.Z)({},e))};(0,i.s)(document.querySelector("#root")).render((0,x.jsx)(o.StrictMode,{children:(0,x.jsx)(M,{})}))},546:function(e,t,n){n.d(t,{V:function(){return r}});var r=function(e){return null!==e&&void 0!==e&&e.image?"no-repeat center/contain url(".concat(e.image,")"):null===e||void 0===e?void 0:e.color}}}]);
//# sourceMappingURL=772.95726ff1.chunk.js.map
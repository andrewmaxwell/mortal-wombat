"use strict";(self.webpackChunkmortal_wombat=self.webpackChunkmortal_wombat||[]).push([[114],{63:function(e,t,n){n.d(t,{G9:function(){return b},Ib:function(){return g},Oz:function(){return v},Vx:function(){return p},mu:function(){return m},ni:function(){return w},oL:function(){return x}});var r=n(861),i=n(942),a=n(413),o=n(757),c=n.n(o),s=n(426),u=n(408),l=n(162),f=n(457);(0,s.ZF)({apiKey:"AIzaSyBEserPzSUos4MT3XRO8NKAO2oVk1-LS-I",authDomain:"mortal-wombat-8c76a.firebaseapp.com",projectId:"mortal-wombat-8c76a",storageBucket:"mortal-wombat-8c76a.appspot.com",messagingSenderId:"929181149015",appId:"1:929181149015:web:33a7f450bcdbb06ae64012",measurementId:"G-JL6HCMYYBS"});var h=(0,u.N8)(),y=(0,l.v0)(),d=(0,u.iH)(h),p=function(e,t){try{return console.log("updates",e),(0,u.Vx)(d,e)}catch(n){console.error(n),t(n.message)}},v=function(e,t,n){return p((0,a.Z)((0,a.Z)({},e),{},(0,i.Z)({},"history/".concat((0,f.M8)()),{update:JSON.stringify(e),user:t.email,tstamp:(0,u.Bt)()})),n)},m=function(){var e=(0,r.Z)(c().mark((function e(t){return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=Object,e.next=3,Promise.all(t.map(function(){var e=(0,r.Z)(c().mark((function e(t){return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=t,e.next=3,(0,u.U2)((0,u.iU)(d,t));case 3:return e.t1=e.sent.val(),e.abrupt("return",[e.t0,e.t1]);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 3:return e.t1=e.sent,e.abrupt("return",e.t0.fromEntries.call(e.t0,e.t1));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),x=function(e,t,n){try{var r=(0,u.iH)(h,e);return(0,u.jM)(r,(function(e){return t(e.val())})),function(){return(0,u.S1)(r)}}catch(i){console.error(i),n(i.message)}},g=function(e,t){return(0,l.e5)(y,e,t)},b=function(e){return(0,l.Aj)(y,e)},w=function(){return(0,l.w7)(y)}},114:function(e,t,n){n.r(t);var r=n(861),i=n(757),a=n.n(i),o=n(63),c=n(762),s=n(413),u=n(671),l=n(144),f=function(e,t,n,r){return n.type.collectible?(t.jewels++,!0):(n.type.healing<0&&(e.health=Math.max(0,e.health+Number(n.type.healing))),!!(n.type.edible&&r.Space&&(void 0===n.eaten&&(n.eaten=1),n.eaten-=e.eatSpeed,e.health=Math.min(100,e.health+n.type.healing*e.eatSpeed),n.eaten<=0))||(!!(n.type.diggable&&r.Space&&(void 0===n.dug&&(n.dug=1),n.dug-=e.digSpeed,n.dug<=0))||void 0))},h=function(e,t,n,r){var i=t.x-n.x,a=t.y-n.y;return Math.abs(i)>Math.abs(a)?(t.x=n.x+(t.x<n.x?-1:1),t.xs=0,f(e,t,n,r)):(t.y<n.y&&(t.jumping=!1),t.y=n.y+(t.y<n.y?-1:1),t.ys=0,f(e,t,n,r))},y=function(){function e(t,n,r){var i=this;(0,u.Z)(this,e),this.reset=function(){for(var e in i.blocks=n,i.frame=0,i.you=(0,s.Z)({x:0,y:0,xs:0,ys:0,dirX:1,dirY:0,jewels:0},t),i.digSpeed=.05,i.eatSpeed=.05,i.gravity=.005,i.health=100,i.jumpPower=.11,i.magmaDelay=30,i.moveSpeed=.015,i.moveDeceleration=.3,r)isNaN(r[e])||(i[e]=Number(r[e]))},this.reset()}return(0,l.Z)(e,[{key:"iterate",value:function(e){this.iterateYou(e),this.frame%this.magmaDelay===0&&this.iterateBlocks(),this.frame++}},{key:"iterateYou",value:function(e){var t=this.you,n=this.blocks,r=this.gravity;if(this.health<=0)e.Space&&this.reset();else{(e.KeyA||e.KeyD||e.KeyW||e.KeyS)&&(t.dirX=0,t.dirY=0),e.KeyA&&(t.xs-=this.moveSpeed,t.dirX--),e.KeyD&&(t.xs+=this.moveSpeed,t.dirX++),e.KeyW&&(t.jumping||(t.ys-=this.jumpPower,t.jumping=!0),t.dirY--),e.KeyS&&t.dirY++,t.x+=t.xs,t.xs*=1-this.moveDeceleration,t.ys+=r,t.y+=t.ys;for(var i=0,a=["".concat(Math.floor(t.x),"_").concat(Math.floor(t.y)),"".concat(Math.ceil(t.x),"_").concat(Math.floor(t.y)),"".concat(Math.floor(t.x),"_").concat(Math.ceil(t.y)),"".concat(Math.ceil(t.x),"_").concat(Math.ceil(t.y))];i<a.length;i++){var o=a[i];if(n[o])h(this,t,n[o],e)&&delete n[o]}}}},{key:"isEmpty",value:function(e,t){return!this.blocks["".concat(e,"_").concat(t)]}},{key:"move",value:function(e,t,n,r){var i="".concat(e,"_").concat(t),a=this.blocks[i];delete this.blocks[i],a.x+=n,a.y+=r,this.blocks["".concat(a.x,"_").concat(a.y)]=a}},{key:"iterateBlocks",value:function(){var e,t=(0,c.Z)(Object.values(this.blocks).filter((function(e){return"liquid"===e.type.movement})).sort((function(e,t){return e.y===t.y?Math.random()-.5:e.y-t.y})));try{for(t.s();!(e=t.n()).done;){var n=e.value;if(this.isEmpty(n.x,n.y+1))this.move(n.x,n.y,0,1);else{var r=this.isEmpty(n.x-1,n.y),i=this.isEmpty(n.x+1,n.y);r&&i?this.move(n.x,n.y,Math.random()<.5?1:-1,0):r?this.move(n.x,n.y,-1,0):i&&this.move(n.x,n.y,1,0)}}}catch(a){t.e(a)}finally{t.f()}}}]),e}(),d=32,p=function(e,t,n,r,i,a){e.fillStyle="black",e.fillText(t,n+a,r+a),e.fillStyle=i,e.fillText(t,n,r)},v=function(){function e(t){var n=this;(0,u.Z)(this,e),this.canvas=t,this.ctx=t.getContext("2d",{antialias:!1,depth:!1}),this.resize(),window.addEventListener("resize",(function(){return n.resize()}))}return(0,l.Z)(e,[{key:"resize",value:function(){var e=this.canvas;this.width=e.width=innerWidth,this.height=e.height=innerHeight}},{key:"render",value:function(e){var t=e.you,n=e.health,r=e.blocks,i=this.ctx,a=this.width,o=this.height;i.clearRect(0,0,a,o),i.save(),i.translate(a/2-t.x*d-16,o/2-t.y*d-16);for(var c=0,s=Object.values(r);c<s.length;c++){var u=s[c],l=u.x,f=u.y,h=u.type;i.fillStyle=h.color,i.fillRect(l*d,f*d,d,d)}i.fillStyle="red",i.fillRect(t.x*d,t.y*d,d,d);var y=Math.atan2(t.dirY,t.dirX);i.strokeStyle="black",i.lineWidth=2,i.beginPath(),i.moveTo((t.x+.5)*d,(t.y+.5)*d),i.lineTo((t.x+.5)*d+Math.cos(y)*d/2,(t.y+.5)*d+Math.sin(y)*d/2),i.stroke(),i.restore(),n>0?(i.strokeStyle="white",i.fillStyle=n>30?"green":"red",i.fillRect(10,10,5*n,20),i.strokeRect(10,10,500,20),i.fillStyle="white",i.textBaseline="top",i.font="18px sans-serif",i.textAlign="left",i.textBaseline="top",i.fillText(Math.round(n)+"%",12,11)):(i.textBaseline="middle",i.textAlign="center",i.font="120px sans-serif",p(i,"you dead",innerWidth/2,innerHeight/2,"red",5),i.font="32px sans-serif",p(i,"press space to try again",innerWidth/2,innerHeight/2+60,"#AFF",3))}}]),e}(),m=function(){var e=(0,r.Z)(a().mark((function e(){var t,n,r,i,c,s,u,l,f,h,d,p,m,x,g,b,w,k,S;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,o.mu)(["tileTypes","world","gameConfig"]);case 2:for(t=e.sent,n=t.tileTypes,r=t.world,i=t.gameConfig,c={},u=0,l=Object.values(n);u<l.length;u++)f=l[u],c[f.id]=f;for(h in r)d=r[h],p=d.x,m=d.y,"w"===(x=d.tileType)?(s={x:p,y:m},delete r[h]):r[h]={x:p,y:m,type:c[x]};console.log(i),g=new y(s,r,i),b=document.createElement("canvas"),document.body.append(b),document.body.style.background="black",document.body.style.margin=0,document.body.style.overflow="hidden",w=new v(b),k={},function e(){g.iterate(k),w.render(g,n),requestAnimationFrame(e)}(),S=function(e){return k[e.code]="keydown"===e.type},window.addEventListener("keydown",S),window.addEventListener("keyup",S);case 23:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();m()},457:function(e,t,n){n.d(t,{Ds:function(){return f},HK:function(){return u},M8:function(){return c},aW:function(){return l},an:function(){return o},vM:function(){return s}});var r=n(885),i=n(762),a=n(413),o=function(e,t){var n=(0,a.Z)({},t);return delete n[e],n},c=function(){return Date.now().toString(36)+":"+Math.random().toString(36).slice(2)},s=function(e,t){var n,r={},a=(0,i.Z)(t);try{for(a.s();!(n=a.n()).done;){var o=n.value,c=e(o);(r[c]=r[c]||[]).push(o)}}catch(s){a.e(s)}finally{a.f()}return r},u=function(e,t){var n,r={},a=(0,i.Z)(t);try{for(a.s();!(n=a.n()).done;){var o=n.value;r[e(o)]=o}}catch(c){a.e(c)}finally{a.f()}return r},l=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object.entries(e).map((function(e){var t=(0,r.Z)(e,2),n=t[0],i=t[1];return(0,a.Z)({key:n},i)}))},f=function(e,t){var n,r=function(){for(var r=arguments.length,i=new Array(r),a=0;a<r;a++)i[a]=arguments[a];clearTimeout(n),n=setTimeout((function(){return e.apply(void 0,i)}),t)};return r.cancel=function(){return clearTimeout(n)},r}}}]);
//# sourceMappingURL=114.6a691463.chunk.js.map
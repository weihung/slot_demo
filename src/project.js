window.__require=function t(e,n,i){function s(r,a){if(!n[r]){if(!e[r]){var l=r.split("/");if(l=l[l.length-1],!e[l]){var u="function"==typeof __require&&__require;if(!a&&u)return u(l,!0);if(o)return o(l,!0);throw new Error("Cannot find module '"+r+"'")}}var c=n[r]={exports:{}};e[r][0].call(c.exports,function(t){return s(e[r][1][t]||t)},c,c.exports,t,e,n,i)}return n[r].exports}for(var o="function"==typeof __require&&__require,r=0;r<i.length;r++)s(i[r]);return s}({"audio-manager":[function(t,e,n){"use strict";cc._RF.push(e,"a7dbfKh+5JK04r9bLRSoPa2","audio-manager");var i=cc.Class({extends:cc.Component,properties:{coinsWin:{type:cc.AudioClip,default:null},coinsInsert:{type:cc.AudioClip,default:null},jackpotWin:{type:cc.AudioClip,default:null},lineWin:{type:cc.AudioClip,default:null},reelStart:{type:cc.AudioClip,default:null},reelRoll:{type:cc.AudioClip,default:null},reelStop:{type:cc.AudioClip,default:null},gameOver:{type:cc.AudioClip,default:null}},statics:{instance:null},playCoinsWin:function(){cc.audioEngine.playMusic(this.coinsWin,!1)},playCoinsInsert:function(){cc.audioEngine.playEffect(this.coinsInsert,!1)},playJackpotWin:function(){cc.audioEngine.playEffect(this.jackpotWin,!1)},playLineWin:function(){cc.audioEngine.playEffect(this.lineWin,!1)},playReelStart:function(){cc.audioEngine.playEffect(this.reelStart,!1)},playReelRoll:function(){this.playSound(this.reelRoll)},playReelStop:function(){cc.audioEngine.playEffect(this.reelStop,!1)},playGameOver:function(){cc.audioEngine.playEffect(this.gameOver,!1)},playSound:function(t){t&&cc.audioEngine.playMusic(t,!1)},onLoad:function(){i.instance=this}});cc._RF.pop()},{}],game:[function(t,e,n){"use strict";cc._RF.push(e,"17a107hOA1DjJdGNDmkBd3y","game");var i=t("reel"),s=t("on-off-button"),o=t("audio-manager"),r=t("user-default"),a=t("paytable-tags")();cc.Class({extends:cc.Component,properties:{reels:{default:[],type:[i]},currentCredit:{default:100,type:cc.Integer},betOneValue:{default:1,type:cc.Integer},betMaxValue:{default:5,type:cc.Integer},spinButton:{default:null,type:s},autoSpinButton:{default:null,type:s},betOneButton:{default:null,type:s},betMaxButton:{default:null,type:s},totalBetLabel:{default:null,type:cc.Label},creditLabel:{default:null,type:cc.Label},betInfoLabel:{default:null,type:cc.Label},rollingCompletedCount:{default:0,visible:!1,type:cc.Integer},isRollingCompleted:{default:!0,visible:!1},totalBetValue:{default:0,visible:!1,type:cc.Integer},currentBetValue:{default:0,visible:!1,type:cc.Integer},currentPayTableTag:{default:0,visible:!1,type:cc.Integer},isAutoSpin:{default:!1,visible:!1},autoSpinTimer:{default:null,visible:!1}},onLoad:function(){var t=this;this.creditLabel.string=this.currentCredit.toString(),this.betInfoLabel.string="",this.spinButton.node.on("reel-spin",function(e){e.isOn&&t.spin()}),this.autoSpinButton.node.on("reel-auto-spin",function(e){!0===t.isAutoSpin?t.isAutoSpin=!1:t.isAutoSpin=!0,t.isAutoSpin?e.isOn&&t.spin():clearTimeout(t.autoSpinTimer)}),this.betOneButton.node.on("bet-one",function(e){e.isOn&&(t.betMaxButton.reset(),t.currentBetValue=t.betOneValue,t.currentPayTableTag=a.BET_ONE,t.betInfoLabel.string=t.currentBetValue.toString(),o.instance.playCoinsInsert())}),this.betMaxButton.node.on("bet-max",function(e){e.isOn&&(t.betOneButton.reset(),t.currentBetValue=t.betMaxValue,t.currentPayTableTag=a.BET_MAX,t.betInfoLabel.string=t.currentBetValue.toString(),o.instance.playCoinsInsert())}),this.node.on("rolling-completed",function(e){if(t.rollingCompletedCount++,o.instance.playReelStop(),t.rollingCompletedCount==t.reels.length){t.rollingCompletedCount=0;var n;n=t.getLineSymbolsTag();var i=t.getComponent("paytable").isWinning(n,t.currentPayTableTag);Object.keys(i).length>0?(o.instance.playLineWin(),o.instance.playCoinsWin(),t.showWinningSymbolsAndPay(i),t.isAutoSpin?t.autoSpinTimer=setTimeout(function(){t.spin()},3500):(t.isRollingCompleted=!0,t.spinButton.reset())):(t.updateCurrenCredit(t.currentCredit-t.currentBetValue),t.betInfoLabel.string=(-t.currentBetValue).toString(),t.isAutoSpin?t.autoSpinTimer=setTimeout(function(){t.spin()},500):(t.isRollingCompleted=!0,t.spinButton.reset())),t.isRollingCompleted&&(t.setButtonsLocked(!1),r.instance.setCurrentCredit(t.currentCredit))}})},start:function(){this.loadUserDefault()},loadUserDefault:function(){this.updateCurrenCredit(r.instance.getCurrentCredit(this.currentCredit))},spin:function(){var t=this;if(0!==this.currentCredit&&(this.betInfoLabel.string=this.currentBetValue.toString(),this.isRollingCompleted)){this.totalBetValue+=this.currentBetValue,this.totalBetLabel.string=this.totalBetValue.toString(),this.isAutoSpin||(this.isRollingCompleted=!1),this.setButtonsLocked(!0);var e={bet:this.currentBetValue},n={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)};fetch("https://dicedemo.ddns.net/PlaySlot",n).then(function(t){return t.json()}).then(function(e){console.log(e),o.instance.playReelRoll();for(var n=0;n<t.reels.length;n++)t.reels[n].spin(),t.reels[n].setWinnerStop(e.result[n]-1);t.winAmount=e.winAmount})}},setButtonsLocked:function(t){this.isAutoSpin||(this.autoSpinButton.isLocked=t),this.spinButton.isLocked=t,this.betOneButton.isLocked=t,this.betMaxButton.isLocked=t},getLineSymbolsTag:function(){for(var t=[],e=0;e<this.reels.length;e++){var n=this.reels[e].getWinnerStop().getComponent("stop");t.push(n.tag)}return t},showWinningSymbolsAndPay:function(t){for(var e=0,n=0;n<t.length;n++)for(var i=t[n],s=0;s<i.indexes.length;s++)this.reels[i.indexes[s]].getWinnerStop().getComponent("stop").blink();e=this.winAmount,this.updateCurrenCredit(this.currentCredit+e),this.betInfoLabel.string=e.toString()},updateCurrenCredit:function(t){this.currentCredit=t,this.creditLabel.string=this.currentCredit.toString(),parseInt(this.currentCredit)<=0&&(o.instance.playGameOver(),this.updateCurrenCredit(100))}}),cc._RF.pop()},{"audio-manager":"audio-manager","on-off-button":"on-off-button","paytable-tags":"paytable-tags",reel:"reel","user-default":"user-default"}],"on-off-button":[function(t,e,n){"use strict";cc._RF.push(e,"5357bF9y7pDjoX+fmXrnWY3","on-off-button"),cc.Class({extends:cc.Component,properties:{mouseDownName:{default:"on-off-mousedown"},sprite:{default:null,type:cc.Sprite},spriteTextureDownUrl:{type:cc.Texture2D,default:null},isOn:{default:!1},spriteTextureUp:{default:null,visible:!1,type:cc.Texture2D},spriteTextureDown:{default:null,visible:!1,type:cc.Texture2D},isLocked:{default:!1,visible:!1}},onLoad:function(){var t=this;function e(t){}this.spriteTextureUp=this.sprite._spriteFrame._texture,this.spriteTextureDown=this.spriteTextureDownUrl,this.node.on("touchstart",function(e){t.onOff()},this.node),this.node.on("touchend",e,this.node),this.node.on("touchcancel",e,this.node)},start:function(){this.isOn&&(this.isOn=!1,this.onOff())},onOff:function(){this.isLocked||(this.isOn?(this.updateSpriteFrame(this.sprite,this.spriteTextureUp),this.isOn=!1):(this.updateSpriteFrame(this.sprite,this.spriteTextureDown),this.isOn=!0),this.node.emit(this.mouseDownName,{isOn:this.isOn}))},reset:function(){this.isOn=!1,this.isLocked=!1,this.updateSpriteFrame(this.sprite,this.spriteTextureUp)},updateSpriteFrame:function(t,e){if(t&&e){var n=t.node.width,i=t.node.height,s=new cc.SpriteFrame(e,cc.rect(0,0,n,i));t.spriteFrame=s}}}),cc._RF.pop()},{}],"paytable-definition":[function(t,e,n){"use strict";cc._RF.push(e,"4b94bWer2JLr7DA4SmWX2NA","paytable-definition");var i=t("stop-tags")(),s=t("paytable-tags")(),o=[{stopTag:i.BONUS,5:2e3,4:1600,3:1e3,2:800},{stopTag:i.BANANA,5:300,4:260,3:200,2:100},{stopTag:i.BEGAMOT,5:200,4:160,3:100,2:50},{stopTag:i.COCODRILE,5:200,4:160,3:100,2:50},{stopTag:i.COCKTAIL,5:200,4:160,3:100,2:5},{stopTag:i.KAKADU,5:100,4:90,3:75,2:5},{stopTag:i.MAN,5:100,4:90,3:75,2:5},{stopTag:i.MONKEY,5:100,4:90,3:75,2:2},{stopTag:i.LION,5:50,4:40,3:25,2:2}],r=[{stopTag:i.BONUS,5:200,4:170,3:100,2:50},{stopTag:i.BANANA,5:100,4:80,3:20,2:10},{stopTag:i.BEGAMOT,5:50,4:40,3:10,2:5},{stopTag:i.COCODRILE,5:50,4:40,3:10,2:5},{stopTag:i.COCKTAIL,5:20,4:15,3:10,2:2},{stopTag:i.KAKADU,5:10,4:8,3:5,2:2},{stopTag:i.MAN,5:10,4:8,3:5,2:2},{stopTag:i.MONKEY,5:10,4:8,3:5,2:1},{stopTag:i.LION,5:5,4:3,3:2,2:1}];e.exports=function(t){switch(t){case s.BET_ONE:return r;case s.BET_MAX:return o;default:return r}},cc._RF.pop()},{"paytable-tags":"paytable-tags","stop-tags":"stop-tags"}],"paytable-tags":[function(t,e,n){"use strict";cc._RF.push(e,"ea2e2acVj1Hmpq3sPcOAYmv","paytable-tags"),e.exports=function(){return{BET_ONE:0,BET_MAX:1}},cc._RF.pop()},{}],paytable:[function(t,e,n){"use strict";cc._RF.push(e,"91f5f5bVWpFDYv2UMKKXJYb","paytable");var i=t("paytable-definition");t("stop-tags")();cc.Class({extends:cc.Component,properties:{},onLoad:function(){},isWinning:function(t,e){for(var n={},i=0;i<t.length;i++){var s=t[i],o=i>0?t[i-1]:-1,r=[];r.push(i);for(var a=i+1;a<t.length;a++){var l=t[a];if(s!=l||l==o)break;r.push(a),n[s]={indexes:r}}}return Object.keys(n).length>0?this.check(n):[]},check:function(t,e){var n=i(e),s=[];for(var o in t)if(t.hasOwnProperty(o))n.filter(function(e){e.stopTag==o&&(parseInt(e[t[o].indexes.length].toString())>0&&s.push({indexes:t[o].indexes,winningValue:e[t[o].indexes.length].toString(),winningTag:o}))});return s}}),cc._RF.pop()},{"paytable-definition":"paytable-definition","stop-tags":"stop-tags"}],prng:[function(t,e,n){"use strict";cc._RF.push(e,"f86f5iz5DNJDqogRC4T+OHu","prng"),e.exports=function(){return{newValue:function(t,e){return Math.floor(Math.random()*(e-t+1))+t}}},cc._RF.pop()},{}],reel:[function(t,e,n){"use strict";cc._RF.push(e,"3d805IS8GdKi4fpFoRADeDr","reel");var i=t("prng")();cc.Class({extends:cc.Component,properties:{stops:{default:[],type:[cc.Prefab]},prngMinRange:{default:1,type:cc.Integer},prngMaxRange:{default:1e9,type:cc.Integer},stopNodes:{default:[],visible:!1,type:[cc.Node]},tailNode:{default:null,visible:!1,type:cc.Node},visibleStops:{default:3,visible:!1,type:cc.Integer},padding:{default:0,visible:!1,type:cc.Integer},stopHeight:{default:0,visible:!1,type:cc.Integer},stepY:{default:0,visible:!1,type:cc.Integer},rollingCount:{default:0,visible:!1,type:cc.Integer},winnerIndex:{default:0,visible:!1,type:cc.Integer},stopAfterRollingCount:{default:0,visible:!1,type:cc.Integer},winnerLineY:{default:0,visible:!1,type:cc.Integer},isRollingCompleted:{default:!1,visible:!1}},onLoad:function(){this.winnerLineY=this.node.height/2;var t=cc.instantiate(this.stops[0]);this.stopHeight=t.height,this.padding=(this.node.height-this.visibleStops*this.stopHeight)/(this.visibleStops+1),this.stepY=this.stopHeight/5;for(var e=this.node.height-this.padding-this.stopHeight,n=this.node.width/2-t.width/2,i=0;i<this.stops.length;i++){var s=cc.instantiate(this.stops[i]);this.node.addChild(s),s.setPosition(cc.p(n,e)),e=e-this.padding-this.stopHeight,this.stopNodes.push(s)}this.tailNode=this.stopNodes[this.stopNodes.length-1],this.isRollingCompleted=!0},update:function(t){if(!this.isRollingCompleted)for(var e=0;e<this.stopNodes.length;e++){var n=this.stopNodes[e];n.y=n.y+this.stepY,n.y-this.padding>this.node.height&&(e+1==this.stopNodes.length&&this.rollingCount++,n.y=this.tailNode.y-this.tailNode.height-this.padding,this.tailNode=n),this.stopAfterRollingCount==this.rollingCount&&e==this.winnerIndex&&n.y>=this.winnerLineY&&(0===this.winnerIndex&&(this.tailNode.y=n.y+n.height,this.tailNode=this.stopNodes[this.stopNodes.length-2]),this.resetY(n),this.isRollingCompleted=!0,this.node.dispatchEvent(new cc.Event.EventCustom("rolling-completed",!0)))}},resetY:function(t){for(var e=t.y-this.winnerLineY+t.height/2,n=this.winnerIndex===this.stopNodes.length-1,i=0;i<this.stopNodes.length;i++){var s=this.stopNodes[i];s.y=s.y-e,n&&s.y<this.winnerLineY&&i!=this.winnerIndex&&(s.y=s.y+this.padding)}},spin:function(){this.rollingCount=0,this.stopAfterRollingCount=Math.floor(2*Math.random())+1;var t=i.newValue(this.prngMinRange,this.prngMaxRange);this.winnerIndex=t%this.stops.length,this.isRollingCompleted=!1},getWinnerStop:function(){return this.stopNodes[this.winnerIndex]},setWinnerStop:function(t){this.winnerIndex=t}}),cc._RF.pop()},{prng:"prng"}],"stop-tags":[function(t,e,n){"use strict";cc._RF.push(e,"b1f8fcCyUlAQYXKla3YDX5/","stop-tags"),e.exports=function(){return{BANANA:1,BEGAMOT:2,BONUS:3,COCKTAIL:4,COCODRILE:5,KAKADU:6,LION:7,MAN:8,MONKEY:9}},cc._RF.pop()},{}],stop:[function(t,e,n){"use strict";cc._RF.push(e,"7c9d92+IOBMGKwSTChSoIVi","stop"),cc.Class({extends:cc.Component,properties:{tag:{default:0,type:cc.Integer},blinkTimer:{default:null,visible:!1},blinkCounter:{default:0,visible:!1}},onLoad:function(){},blink:function(){var t=this;this.blinkTimer=setInterval(function(){t.blinkCounter++,!0===t.node.active?t.node.active=!1:t.node.active=!0,10==t.blinkCounter&&(t.blinkCounter=0,t.node.active=!0,clearInterval(t.blinkTimer))},300)}}),cc._RF.pop()},{}],"user-default-keys":[function(t,e,n){"use strict";cc._RF.push(e,"246ab4anldKkYCjr7FirIEK","user-default-keys"),e.exports=function(){return{CURRENT_CREDIT:"Current_Credit"}},cc._RF.pop()},{}],"user-default":[function(t,e,n){"use strict";cc._RF.push(e,"ac85aN0yDZAy5qM8en8FeDQ","user-default");var i=t("user-default-keys")(),s=cc.Class({extends:cc.Component,properties:{localStorage:{default:null,visible:!1,type:Object}},onLoad:function(){this.localStorage=cc.sys.localStorage,s.instance=this},statics:{instance:null},getCurrentCredit:function(t){var e=this.localStorage.getItem(i.CURRENT_CREDIT);return e||(e=t),e?parseInt(e):0},setCurrentCredit:function(t){this.localStorage.setItem(i.CURRENT_CREDIT,t)}});cc._RF.pop()},{"user-default-keys":"user-default-keys"}]},{},["audio-manager","game","paytable-definition","paytable-tags","paytable","prng","reel","stop-tags","stop","user-default-keys","user-default","on-off-button"]);
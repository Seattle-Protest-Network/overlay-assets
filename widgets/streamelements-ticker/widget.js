/*!
 * Telex 2.0.4
 * (c) 2019 sjaakpriester.nl
 */
var Telex=function(e){"use strict";return function(e){if(e&&"undefined"!=typeof window){var t=document.createElement("style");t.setAttribute("type","text/css"),t.innerHTML=e,document.head.appendChild(t)}}("@keyframes telex{from{margin-left:0}}.telex{display:flex;white-space:nowrap;overflow-x:hidden;line-height:1.7;min-height:1.7em}.telex > div{padding:0 1.5em}"),e.Widget=function(e,t,i){var n=this;Object.setPrototypeOf(this,{defaults:{speed:200,direction:"normal",timing:"linear",pauseOnHover:!1,onCycle:function(e){}},animStart:function(e){if(e){var t=this._elementWidth(e),i=1e3*t/this.speed;Object.assign(e.style,{marginLeft:"-"+t+"px",animationName:"telex",animationDirection:this.direction,animationDuration:i+"ms",animationTimingFunction:this.timing})}},animStop:function(e){e&&Object.assign(e.style,{marginLeft:null,animationName:"none"})},discardMsg:function(e){e&&e.classList.add("telex-discard")},populate:function(){var a=this,e=this.element.childNodes.length;this.element.childNodes.forEach(function(e){a.discardMsg(e)});for(var t=this._elementWidth(this.element),i={total:0,max:0};0<(i=this._messages.reduce(function(e,t,i){"string"==typeof t&&(t={content:t});var n=document.createElement("div");n.innerHTML=t.content,t.class&&n.classList.add(t.class),0===i&&n.classList.add("telex-head"),a.element.appendChild(n);var s=a._elementWidth(n);return{total:e.total+s,max:s>e.max?s:e.max}},i)).total&&i.total<t+i.max;);this.onCycle(this),e||this.animStart(this.element.firstChild)},refresh:function(){this.element.childNodes.length?this._pending=!0:this.populate()},_setAnimationState:function(e){var t=this.element.firstChild;t&&(t.style.animationPlayState=e)},_elementWidth:function(e){return e.getBoundingClientRect().width},_removeIfDiscarded:function(e){return!(!e||!e.classList.contains("telex-discard")||(this.element.removeChild(e),0))},set messages(e){this._messages=e,this.refresh()},get messages(){return this._messages},add:function(e){this._messages.unshift(e),this.refresh()},remove:function(t){var e=this._messages.findIndex(function(e){return e.id===t});0<=e&&this._messages.splice(e,1),this.refresh()},update:function(t,e){var i=this._messages.findIndex(function(e){return e.id===t});0<=i&&this._messages.splice(i,1,e),this.refresh()},pause:function(){this._paused=!0,this._setAnimationState("paused")},resume:function(){this._paused=!1,this._setAnimationState("running")}}),this.element=document.getElementById(e),this.element.classList.add("telex"),this.element.addEventListener("animationend",function(e){if(n.animStop(e.target),n.direction===e.target.style.animationDirection)if("normal"===n.direction)n._removeIfDiscarded(e.target)||n.element.appendChild(e.target);else{for(var t,i=n.element.childNodes;t=i[i.length-1],n._removeIfDiscarded(t););n.element.insertBefore(t,n.element.firstChild)}n.animStart(n.element.firstChild),n._pending&&n.element.firstChild.classList.contains("telex-head")&&(n.populate(),n._pending=!1)}),this.element.addEventListener("mouseenter",function(e){n.pauseOnHover&&n._setAnimationState("paused")}),this.element.addEventListener("mouseleave",function(e){n.pauseOnHover&&!n._paused&&n._setAnimationState("running")}),window.addEventListener("resize",function(e){n.refresh()}),Object.assign(this,this.defaults,t),this.messages=i},e.widget=function(e,t,i){return new this.Widget(e,t,i)},e.version="2.0.4",e}({});

let url,
    scrollSpeed;

let scrollText = "";

function fetchText(url) {
  let text = ""
  return $.ajax({
    url: url,
    type: "get",
    dataType: 'text',  
    async: false,
  }).responseText;
}

function update(mq) {
  console.log("Update!")
  scrollText = fetchText(url);
  console.log(scrollText)
  for(let i = mq.messages.length - 1; i >= 0; i--) {
      mq.remove(mq.messages[i].id)
  }
  scrollText.split(/[\r\n]+/).forEach((textLine) => {
    if(textLine.trim().length > 0) {
      console.log("Adding line: ", textLine)
      mq.add({
        content: textLine,
        class: 'marquee-message'
      })
    }
  })
}

window.addEventListener('onWidgetLoad', function (obj) {
  const fieldData = obj["detail"]["fieldData"];
  url = fieldData["url"]
  scrollSpeed = fieldData["scrollSpeed"]

  const mq = Telex.widget("marquee", {
    speed: scrollSpeed,
    direction: 'normal',
    onCycle: update
  }, [])
});

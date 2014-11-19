/*
*
* DISCLAIMER: Javascript is terrible, and these utils are NOT intended for use in the general case
* for JS and all of its terribleness. These functions operate only on the most naively constructed of
* objects. If you're trying to do something fancy and these don't work for you, please take the
* rest of the day off to question your life choices. I wish you the best of luck.
*
*/

//maps attributes found in defaults from init onto obj, falling back to defaults value if not present in init
var doMapInitDefaults = function(obj, init, defaults)
{
  var attribs = Object.keys(defaults);
  for(var i = 0; i < attribs.length; i++)
  {
    var k = attribs[i];
    obj[k] = init.hasOwnProperty(k) ? init[k] : defaults[k];
  }
}

//sets doX and doY as x/y offset into the object listening for the event
function doSetPosOnEvent(evt)
{
  if(evt.offsetX != undefined)
  {
    evt.doX = evt.offsetX;
    evt.doY = evt.offsetY;
  }
  else if(evt.touches != undefined)
  {
    evt.doX = evt.touches[0].pageX - evt.touches[0].target.offsetLeft;
    evt.doY = evt.touches[0].pageY - evt.touches[0].target.offsetTop;
  }
  else if(evt.layerX != undefined && evt.originalTarget != undefined)
  {
    evt.doX = evt.layerX-evt.originalTarget.offsetLeft;
    evt.doY = evt.layerY-evt.originalTarget.offsetTop;
  }
  else //give up because javascript is terrible
  {
    evt.doX = 0;
    evt.doY = 0;
  }
}

/* No idea what this actually is... */
function hackInputs()
{
  actualWidthOfStuff = window.innerWidth;
  actualHeightOfStuff = window.innerHeight;
  document.getElementById("dabody").style.width = actualWidthOfStuff+"px";
  document.getElementById("dabody").style.height = actualHeightOfStuff+"px";
  document.getElementById("debug").style.width = actualWidthOfStuff+"px";
  document.getElementById("debug").style.height = actualHeightOfStuff+"px";
  document.getElementById("stage_container").style.width = actualWidthOfStuff+"px";
  document.getElementById("stage_container").style.height = actualHeightOfStuff+"px";
  var children = document.getElementById("stage_container").childNodes;
  for(var i = 0; i < children.length; i++)
  {
    children[i].style.width = actualWidthOfStuff+"px";
    children[i].style.height = actualHeightOfStuff+"px";
  }
}


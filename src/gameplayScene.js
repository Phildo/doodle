var GamePlayScene = function()
{
  var self = this;

  var hoverer;
  var clicker;
  var dragger;
  var cam;

  self.resize = function()
  {
    if(hoverer) hoverer.detach(); hoverer = new PersistentHoverer({source:gg.canvas});
    if(clicker) clicker.detach(); clicker = new Clicker({source:gg.canvas});
    if(dragger) dragger.detach(); dragger = new Dragger({source:gg.canvas});
    gg.cam = {wx:0,wy:0,ww:gg.canvas.width,wh:gg.canvas.height};
  }

  self.ready = function()
  {
    self.resize();
  };

  var t_mod_twelve_pi = 0;
  self.tick = function()
  {
    t_mod_twelve_pi += 0.01;
    if(t_mod_twelve_pi > twelvepi) t_mod_twelve_pi -= twelvepi;

/*
    var check = 1;
    hoverer.filter(thing);
    if(check) check = !clicker.filter(thing);
    if(check) check = !dragger.filter(thing);
*/

    hoverer.flush();
    clicker.flush();
    dragger.flush();
  };

  self.draw = function()
  {
    gg.ctx.fillStyle = white;
    gg.ctx.fillRect(0,0,gg.canvas.width,gg.canvas.height);
  };

  self.cleanup = function()
  {
    if(hoverer) hoverer.detach(); hoverer = null;
    if(clicker) clicker.detach(); clicker = null;
    if(dragger) dragger.detach(); dragger = null;
  };

};


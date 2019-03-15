var gg = {};
var ENUM;

var Game = function(init)
{
  var self = this;
  gg.game = self;

  self.dpr = window.devicePixelRatio ? window.devicePixelRatio : 1;
  var sargs = {width:init.width,height:init.height,container:init.container,dpr:self.dpr,smoothing:1}
  gg.stage = new Stage(sargs);
  gg.canvas = gg.stage.canvas;
  gg.ctx = gg.stage.context;

  var scene = new GamePlayScene();

  self.resize = function(args)
  {
    if(args.width == gg.stage.width && args.height == gg.stage.height) return;
    document.getElementById(gg.stage.container).removeChild(gg.stage.canvas);
    gg.stage.canvas.width = 0;
    gg.stage.canvas.height = 0;
    if(args.stage) gg.stage = args.stage;
    else //must have width+height in args
    {
      var sargs = {width:args.width,height:args.height,container:gg.stage.container,dpr:self.dpr,smoothing:1}
      gg.stage = new Stage(sargs);
    }
    gg.canvas = gg.stage.canvas;
    gg.ctx = gg.stage.context;
    scene.resize_requested = 10;
  }

  self.begin = function()
  {
    scene.ready();
    prev_t = performance.now();
    tick(prev_t);
  };

  var tick = function(cur_t)
  {
    requestAnimationFrame(tick);
    if(cur_t-prev_t > 30) scene.tick(2);
    else if(cur_t-prev_t < 8) return;
    else scene.tick(1);
    scene.draw();
    prev_t = cur_t;
  };

};


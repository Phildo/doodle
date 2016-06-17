var LoadingScene = function(game, stage)
{
  var self = this;

  var canv = stage.drawCanv;
  var canvas = canv.canvas;
  var ctx = canv.context;

  var pad;
  var barw;
  var progress;
  var canv = stage.drawCanv;

  var n_loading_imgs_loaded = 0;
  var loading_img_srcs = [];
  var loading_imgs = [];
  var n_imgs_loaded = 0;
  var img_srcs = [];
  var imgs = [];

  var loadingImageLoaded = function()
  {
    n_loading_imgs_loaded++;
  };
  var imageLoaded = function()
  {
    n_imgs_loaded++;
  };

  self.ready = function()
  {
    pad = 20;
    barw = (canv.width-(2*pad));
    progress = 0;
    canv.context.fillStyle = "#000000";
    canv.context.fillText(".",0,0);// funky way to encourage any custom font to load

    //put asset paths in loading_img_srcs (for assets used on loading screen itself)
    //loading_img_srcs.push("assets/man.png");
    for(var i = 0; i < loading_img_srcs.length; i++)
    {
      loading_imgs[i] = new Image();
      loading_imgs[i].onload = loadingImageLoaded;
      loading_imgs[i].src = loading_img_srcs[i];
    }
    loadingImageLoaded(); //call once to prevent 0/0 != 100% bug

    //put asset paths in img_srcs
    //img_srcs.push("assets/man.png");
    for(var i = 0; i < img_srcs.length; i++)
    {
      imgs[i] = new Image();
      imgs[i].onload = imageLoaded;
      imgs[i].src = img_srcs[i];
    }
    imageLoaded(); //call once to prevent 0/0 != 100% bug
  };

  self.tick = function()
  {
    //note- assets used on loading screen itself NOT included in wait
    var p = n_imgs_loaded/(img_srcs.length+1);
    if(progress <= p) progress += 0.01;
    //if(progress >= 1.0) game.nextScene(); //use this to wait for bar
    if(p >= 1.0) game.nextScene();
  };

  self.draw = function()
  {
    canv.context.fillRect(pad,canv.height/2,progress*barw,1);
    canv.context.strokeRect(pad-1,(canv.height/2)-1,barw+2,3);

    var p = n_loading_imgs_loaded/(loading_img_srcs.length+1);
    if(p >= 1.0) //assets used in loading screen itself have been loaded
    {
      //do any special drawing here
    }
  };

  self.cleanup = function()
  {
    imgs = [];//just used them to cache assets in browser; let garbage collector handle 'em.
    loading_imgs = [];//just used them to cache assets in browser; let garbage collector handle 'em.
  };
};

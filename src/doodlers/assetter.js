//ok "assetter" doesn't really make as much sense as "drawer" or "ticker", but hell if I'm changing it...
var Assetter = function(init)
{
  var default_init =
  {
  }

  var self = this;
  doMapInitDefaults(self,init,default_init);

  var assets = [];
  self.asset = function(file)
  {
    file = "assets/"+file;
    if(!assets[file])
    {
      assets[file] = new Image();
      assets[file].src = file;
    }
    return assets[file];
  }
}


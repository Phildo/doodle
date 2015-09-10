function NumberBox(x,y,w,h,val,callback)
{
  var self = this;
  self.x = x;
  self.y = y;
  self.w = w;
  self.h = h;

  self.number = val;

  self.value = ""+val;
  self.focused = false;
  self.highlit = false;
  self.down = false;

  self.ref_x = 0;
  self.delta_val = 0.01;

  var processInput = function(n)
  {
    if(!isNaN(parseFloat(n)) && isFinite(n))
      self.number = parseFloat(n);
    callback(self.number);
  }

  self.key = function(evt)
  {
    if(evt.keyCode == 13) //enter
    {
      self.focused = false;
      self.highlit = false;
      self.value = ""+self.number;
    }
  }
  self.key_letter = function(k)
  {
    if(self.focused)
    {
      if(self.highlit) self.value = ""+k;
      else             self.value = self.value+k;
      self.highlit = false;
      processInput(self.value);
    }
    self.print();
  }
  self.key_down = function(evt)
  {
  }
  self.key_up = function(evt)
  {
  }

  //nice in smooth dragging
  self.offX = 0;
  self.offY = 0;
  self.dragStart = function(evt)
  {
    self.focused = true;
    self.down = true;

    self.offX = evt.doX-self.x;
    self.offY = evt.doY-self.y;
  }
  self.drag = function(evt)
  {
    self.deltaX = ((evt.doX-self.x)-self.offX);
    self.deltaY = ((evt.doY-self.y)-self.offY);
    self.offX = evt.doX - self.x;
    self.offY = evt.doY - self.y;
    processInput(self.number + self.deltaX*self.delta_val);
    self.value = ""+self.number;

    self.down = ptWithinObj(evt.doX, evt.doY, self);
    self.print();
  }
  self.dragFinish = function()
  {
    if(self.down) self.highlit = !self.highlit;
    self.down = false;
    self.print();
  }

  self.blur = function()
  {
    self.focused = false;
    self.highlit = false;
    processInput(self.number);
    self.value = ""+self.number;
    self.print();
  }
  self.focus = function()
  {
    self.focused = true;
    self.highlit = true;
    self.print();
  }
  self.set = function(n)
  {
    processInput(n);
    self.print();
  }

  self.draw = function(canv)
  {
    if(self.highlit)
    {
      canv.context.fillStyle = "#8899FF";
      canv.context.fillRect(self.x,self.y,self.w,self.h);
    }
    if(self.focused) canv.context.strokeStyle = "#F40000";
    if(self.down)    canv.context.strokeStyle = "#00F400";
    canv.context.strokeRect(self.x,self.y,self.w,self.h);
    canv.context.fillStyle = "#000000";
    canv.context.fillText(self.value,self.x+self.w/2,self.y+self.h/2);
  }

  self.print = function()
  {
    console.log("("+self.x+","+self.y+","+self.w+","+self.h+") n:"+self.number+" v:"+self.value+" f:"+self.focused+" h:"+self.highlit+" d:"+self.down+" "+"");
  }
}


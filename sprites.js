var Sprites = {

  var images = {};
  loadImage("assets/monster");

   loadImage : function (name) {
    images[name] = new Image();
    images[name].onload = function() {
      resourceLoaded();
    }
    images[name].src = "images/" + name + ".png";
  }

  var totalResources = 1;
  var numResourcesLoaded = 0;
  var fps = 30;

  resourceLoaded : function () {

    numResourcesLoaded += 1;
    if(numResourcesLoaded == totalResources) {
      setInterval (redraw, 1000/fps);
    }
  }

  var context = document.getElementById('canvas').getContext("2d");
  var charX = 245;
  var charY = 185;

  redraw : function () {
    var x = charX;
    var y = charY;

    canvas.width = canvas.width;

    context.drawImage(images["monster"], x,y);
}

<script type="text/javascript">
var ctx;
var can;

var stageWidth;
var stageHeight;

var centerX;
var centerY;

var bounds = new Rectangle();
var car;
var keys = [];
var speed = 0;
var speedx = 0;
var speedy = 0;
var carHolder;
var maxSpeed = 14;
var rotationStep = 4;
var speedStep = 3;
var friction = 0.9;
var backgroundShape;
var backgroundGraphic;

function init() {
  can = document.getElementById("canvas");
  ctx = can.getContext("2d");

  stageWidth = document.width;
  stageHeight = document.height;

  can.width = bounds.w = stageWidth;
  can.height = bounds.h = stageHeight;

  centerX = stageWidth*.5;
  centerY = stageHeight*.5;

  stage = new Stage(can);

  backgroundShape = new Shape();
  backgroundShape.graphics.beginFill('#FFF6DB');
  backgroundShape.graphics.rect(0,0,bounds.w,bounds.h);
  stage.addChild(backgroundShape);

  loadMap();
  window.addEventListener('keydown',doKeyDown,true);
  window.addEventListener('keyup',doKeyUp,true);
  window.addEventListener('resize',onScale,true);
}
function loadCar() {
  var carImage = new Image();
  carImage.onload = function() {
    car = new Bitmap(carImage);
    carHolder = new Container();
    carHolder.addChild(car);
    carHolder.x = centerX+300;
    carHolder.y = centerY+150;
    car.x = -24*.5;
    car.y = -35*.5;
    stage.addChild(carHolder);
    setInterval("tick()",30);
    tick();
    collisionDetection();
  }
  carImage.src = "assets/car.png";
}
function loadMap() {
  var mapImage = new Image();
  mapImage.onload = function() {
    map = new Bitmap(mapImage);
    map.x = bounds.w/2-900/2
    map.y = bounds.h/2-623/2
    stage.addChild(map);
    loadCar();
  }
  mapImage.src = "assets/map.png";
}
function drawBackground() {
  backgroundShape.graphics.rect(0,0,bounds.w,bounds.h);
}
function moveCar() {
  speed*=friction;
  if(keys[38]) {

    if(speed<maxSpeed) {
      speed+=speedStep;
    }
  }
  if(keys[40]) {
    if(speed>-maxSpeed) {
      speed-=speedStep;
    }
  }
  if(keys[37]) {
    carHolder.rotation -= rotationStep*(speed/3);
  }
  if(keys[39]) {
    carHolder.rotation += rotationStep*(speed/3);
  }
  speedx = Math.sin(carHolder.rotation*(Math.PI/180))*speed;
  speedy = Math.cos(carHolder.rotation*(Math.PI/180))*speed*-1;

  carHolder.x+=speedx;
  carHolder.y+=speedy;

}
function collisionDetection() {
  //netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
  var data = ctx.getImageData(carHolder.x, carHolder.y, 1, 1).data;
  if(data[0] == 226 && data[1] == 226 && data[2] == 226) {
    speedStep = 2;
    maxSpeed = 7
  }else{
    speedStep = 0.5;
    maxSpeed = 1;
  }
  data = null;
}
function doKeyDown(evt){
  keys[evt.keyCode] = true;
}
function doKeyUp(evt){
  keys[evt.keyCode] = false;
}
function tick() {
  moveCar();
  carHolder.visible = false;
  stage.tick();
  collisionDetection();
  carHolder.visible = true;
  stage.tick();
}
function onScale(evt) {
  var tx = centerX;
  var ty = centerY;

  stageWidth = document.width;
  stageHeight = document.height+33;

  can.width = bounds.w = stageWidth;
  can.height = bounds.h = stageHeight;

  centerX = stageWidth*.5;
  centerY = stageHeight*.5;

  map.x = bounds.w/2-900/2
  map.y = bounds.h/2-623/2

  carHolder.x += centerX-tx;
  carHolder.y += centerY-ty;

  drawBackground();
}
init();
</script>
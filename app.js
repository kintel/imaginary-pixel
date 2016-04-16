var canvas = document.querySelector('canvas');
var screen = document.querySelector('#screen');
var ctx = canvas.getContext('2d');

var x = 50;
var y = 50;
var blobsize = 200;

function canvasLoop(e) {
//  ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);

  ctx.fillStyle = "#000";
  ctx.fillRect(x-10,y-10,220,220);
  
  var movementX = e.movementX || 0;
  var movementY = e.movementY || 0;
  x += movementX;
  y += movementY; 
  x = Math.min(x, screen.width - blobsize);
  x = Math.max(x, 0);
  y = Math.min(y, screen.height - blobsize);
  y = Math.max(y, 0);

//  var n = new Date().getTime();
//  y = (Math.sin((n/10%360)*Math.PI/180) + 1)/2*(canvas.clientHeight-blobsize);
  ctx.fillStyle = "#777777";
  ctx.fillRect(x,y,200,200);

  var animation = requestAnimationFrame(canvasLoop);
}
document.addEventListener("mousemove", canvasLoop, false);
canvas.ondblclick = enterFullscreen;

var screen = document.querySelector("#screen");

// Note: FF nightly needs about:config full-screen-api.enabled set to true.
function enterFullscreen() {
  canvas.requestPointerLock();
  console.log("enterFullscreen()");
  screen.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
  canvas.ondblclick = exitFullscreen;
}

function exitFullscreen() {
  console.log("exitFullscreen()");
  document.webkitCancelFullScreen();
  canvas.ondblclick = enterFullscreen;
}

function resize() {
    screen.width = window.innerWidth;
    screen.height = window.innerHeight;
}
window.addEventListener('resize', resize, false);
resize();

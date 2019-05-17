/* -------------------------------------------------
Author: Alex Dawson
Description: Pong game
-------------------------------------------------
This will be Pong without comments below this one.
This is so you can easily copy this into a Virtual Machiene and run on localhost.
-------------------------------------------------- */
 var canvas = document.createElement('canvas');
 var canvasWidth = 800;
 var canvasHeight = 500;
 canvas.width = canvasWidth;
 canvas.height = canvasHeight;
 var context = canvas.getContext('2d');
 window.onload = function() {
   document.body.appendChild(canvas);
 };
var PlayerPaddleY = 225;
var PlayerPaddleX = 0;
var ComputerPaddleY = 225;
var ComputerPaddleX = 792;
var BallX = 400;
var BallY = 250;
var PlayerPaddle_step = 0;
var ComputerPaddle_step = 0;
var BallX_step = 5;
var BallY_step = -5;
var DownKey = {};
window.addEventListener("keydown", function(event) {DownKey[event.keyCode] = true;});
window.addEventListener("keyup", function(event) {delete DownKey[event.keyCode];});
var PaddleWidth = 8;
var PaddleHeight = 50;
var keepPlaying = true;
function EraseCanvas() {
  var eraseCanvas = document.createElement('canvas');
  eraseCanvas.width = canvasWidth;
  eraseCanvas.height = canvasHeight;
  context.fillStyle = "white";
  context.fillRect(0, 0, canvasWidth, canvasHeight)
}
function DrawGame() {
  context.beginPath();
  context.fillStyle = "black";
  context.fillRect(PlayerPaddleX,PlayerPaddleY, PaddleWidth, PaddleHeight);
  context.fillRect(ComputerPaddleX,ComputerPaddleY, PaddleWidth, PaddleHeight);
  context.stroke();
  context.beginPath();
  context.arc(BallX,BallY,10,0,2*Math.PI, false);
  context.fill();
  context.lineWidth = 1;
  context.strokeStyle = "green";
  context.stroke();
}
function MovePieces() {
  PlayerPaddleY += PlayerPaddle_step;
  ComputerPaddleY += ComputerPaddle_step;
  BallX += BallX_step;
  BallY += BallY_step;
  for (var Key in DownKey){
    var Value = Number(Key);
    if (Value == 38) {
      PlayerPaddleY -= 5;
    }
    else if (Value == 40) {
      PlayerPaddleY += 5;
    }
    else if (Value == 81 || Value == 113) {
      keepPlaying = false;
    }
    else {}
  }
  if (BallY - 10 < ComputerPaddleY + 25) {
    ComputerPaddle_step = 5;
  }
  if (BallY + 10 < ComputerPaddleY + 25) {
    ComputerPaddle_step = -5;
  }
  if (BallX > 300) {
    if (BallY-5 < (ComputerPaddleY+PaddleHeight) &&
        BallY+5 > ComputerPaddleY &&
        BallX-5 <  (ComputerPaddleX+PaddleWidth) &&
        BallX+5 > ComputerPaddleX) {
      BallX_step = -3;
      BallX += BallX_step;
    }
  }
  else if (BallX < 300) {
    console.log("power level under 300")
    if (BallY-5 < (PlayerPaddleY+PaddleHeight) &&
        BallY+5 > PlayerPaddleY &&
        BallX-5 < (PlayerPaddleX+PaddleWidth) &&
        BallX+5 > PlayerPaddleX) {
      console.log("HIT!");
      BallX_step = 3;
      BallX += BallX_step;
    }
  }
}
function ManagePieces() {
  if (PlayerPaddleY+50>500) {
    PlayerPaddleY = 500 - 50;
  }
  if (PlayerPaddleY<0) {
    PlayerPaddleY = 0;
  }
  if (ComputerPaddleY+50>500) {
    ComputerPaddleY = 500 - 50;
  }
  if (ComputerPaddleY<0) {
    ComputerPaddleY = 0;
  }
  if (BallY + 10 + BallY_step > 500) {
    BallY = 500 - 10;
    BallY_step =-1*BallY_step;
  }
  if (BallY - 10 - BallY_step < 0) {
    BallY = 10;
    BallY_step =-1*BallY_step;
  }
  if (BallX < 0 || BallX > 800) {
    console.log("Oops. Someone missed.")
    Reset();
  }
}
function Reset() {
  PlayerPaddleY = 225;
  PlayerPaddleX = 0;
  ComputerPaddleY = 225;
  ComputerPaddleX = 792;
  BallX = 400;
  BallY = 250;
  PlayerPaddle_step = 0;
  ComputerPaddle_step = 0;
  BallX_step = 5;
  BallY_step = -5;
}
function Play () {
  if (keepPlaying=true) {
    MovePieces();
  }
  else if (keepPlaying=false) {
    Reset();
  }
}
function DisplayFrames() {
  setInterval (NextFrame , 60);
}
function NextFrame () {
  EraseCanvas();
  DrawGame();
  ManagePieces();
  Play();
}

DisplayFrames();

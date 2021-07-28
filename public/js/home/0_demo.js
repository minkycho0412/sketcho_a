const socket = io();

window.onload=function(){
  const nickname = document.querySelector("#nickname");
  const sendButton = document.querySelector("#button1");

  sendButton.addEventListener("click", () => {
    const param = {
      name: nickname.value,
    }
    socket.emit("myid", param);
  });
}

socket.on("myid", (data) => {
  console.log(data);
});

var myVideo;
let mask;
let canvas;
let vidWidth = 160;
let vidHeight = 120;
let bg;
let r, g, b;

function windowResized(){
  console.log('resized');
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  
  canvas =   createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
  canvas.style('z-index', '-1');
  bg = loadImage('images/Demo.jpg');
  noCursor();

  let constraints = {audio: false, video: true};

    myVideo = createCapture(constraints,VIDEO);
    myVideo.size(vidWidth, vidHeight);
    myVideo.hide();
}

function draw() {
  // background(205,240,255);
  background(bg);
  noCursor();

  noStroke();
  fill(r, g, b);
  triangle(mouseX,mouseY,mouseX + 20,mouseY + 5, mouseX + 6, mouseY + 18);
 // mask.noStroke();
  mask = createGraphics(vidWidth, vidHeight);
  mask.circle(mask.width/2, mask.height/2, 120);
  myVideo.mask(mask);
  image(myVideo, mouseX, mouseY, vidWidth, vidHeight);

}
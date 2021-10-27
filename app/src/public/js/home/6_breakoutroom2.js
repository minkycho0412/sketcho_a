// "use strict";

// This is a test of the p5LiveMedia webrtc library and associated service.
// Open this sketch up 9 times to send video back and forth
// let socket = io.connect("http://localhost:4000");

//let socket = io.connect("http://localhost:5500");
const socket = io();

let muteBtn = document.getElementById("mute");
muteBtn.addEventListener("click", MuteClick);
let cameraBtn = document.getElementById("camera");
cameraBtn.addEventListener("click", CameraClick);

let muted = false;
let cameraOff = false;
let videoTrack;

let allConnections = [];
let vidWidth = 160;
let vidHeight = 120;
let p5live;

let nameField;
let canvas;
let bg;
let mask;
let r, g, b;

function windowResized(){
    console.log('resized');
    resizeCanvas(windowWidth, windowHeight);
  }
  
  function setup() {
    canvas =   createCanvas(windowWidth, windowHeight);
    canvas.position(0,0);
    canvas.style('z-index', '-1');
    bg = loadImage('images/breakoutroom2.jpg');
    noCursor();
    let constraints = {audio: true, video: true};
    myVideo = createCapture(constraints,VIDEO, gotMineConnectOthers);
    myVideo.size(vidWidth, vidHeight);
    myVideo.hide();
    allConnections['Me'] = {
      'video': myVideo,
      'name': "Me",
      'x': random(width),
      'y': random(height)
    }
    // nameField = createInput("Enter your name");
    // nameField.changed(enteredName);
    // nameField.position(10,700);

    r = random(255);
    g = random(255);
    b = random(255);
  
  }
  
  function gotMineConnectOthers(myStream) {
    p5live = new p5LiveMedia(this, "CAPTURE", myStream, "preparationRoom");
    p5live.on('stream', gotOtherStream);
    p5live.on('disconnect', lostOtherStream);
    p5live.on('data', gotData);
    videoTrack = myStream.getVideoTracks()[0];
    audioTrack = myStream.getAudioTracks()[0];
  }
  
  
function MuteClick(){
  if(!muted) {
    audioTrack.enabled = false;
    console.log("audio is " + audioTrack.enabled);
    document.getElementById("mute").innerHTML= '<i class = "fas fa-microphone-slash"></i>';
    // muteBtn.innerText = "Unmute";
    muted = true;
  } else {
    audioTrack.enabled = true;
    console.log("audio is " + audioTrack.enabled);
    document.getElementById("mute").innerHTML= '<i class = "fas fa-microphone"></i>';
    // muteBtn.innerText = "mute";
    muted = false;
  } 

}

function CameraClick(){
  if(!cameraOff) {
    videoTrack.enabled = false;
    console.log("Camera is " + videoTrack.enabled);
    document.getElementById("camera").innerHTML= '<i class="fas fa-video-slash"></i>';
    //cameraBtn.innerText = "Turn Camera On";
    cameraOff = true;
    
  } else {
    videoTrack.enabled = true;
    console.log("Camera is " + videoTrack.enabled);
    document.getElementById("camera").innerHTML= '<i class="fas fa-video"></i>';
    //cameraBtn.innerText = "Turn Camera Off";
    cameraOff = false;
  } 
}
  
  function draw() {
    background(bg);
    //stroke(255);
    // mask = createGraphics(vidWidth, vidHeight);
    // mask.circle(mask.width/2, mask.height/2, 80);
    // myVideo.mask(mask);
    noCursor;
    noStroke();
    fill(r, g, b);
    triangle(mouseX,mouseY,mouseX + 20,mouseY + 5, mouseX + 6, mouseY + 18);
   
    for (var id in allConnections) {
      let thisConnectJSON = allConnections[id];
      let x = thisConnectJSON.x;
      let y = thisConnectJSON.y;
    
      image(thisConnectJSON.video, x, y, vidWidth, vidHeight);
      
      noStroke();
      text(thisConnectJSON.name, x+60, y+150);
      text('Font Style Bold');
      textSize(20);
     
      mask = createGraphics(vidWidth, vidHeight);
      mask.circle(mask.width/2, mask.height/2, 120);
      thisConnectJSON.video.mask(mask);
  
      }
  }
  
  // We got a new stream!
  function gotOtherStream(stream, id) {
    // This is just like a video/stream from createCapture(VIDEO)
    otherVideo = stream;
    otherVideo.size(vidWidth, vidHeight);
    allConnections[id] = {
      'video': otherVideo,
      'name': id,
      'x': 0,
      'y': 0
    }
  
    otherVideo.hide();
    mouseDragged() //send them your location
    enteredName() //send them your name
  }
  
  function lostOtherStream(id) {
    print("lost connection " + id)
    delete allConnections[id];
  }
  
  function mouseDragged() {
    //change locally
   
    allConnections['Me'].x = mouseX;
    allConnections['Me'].y = mouseY;
    //send to others
    let dataToSend = {
      dataType: 'location',
      x: mouseX,
      y: mouseY
    };
    // Send it
    p5live.send(JSON.stringify(dataToSend));
  }
  
  function enteredName() {
    //change locally
    allConnections['Me'].name = nameField.value();
    //
    let dataToSend = {
      dataType: 'name',
      name: nameField.value()
    };
    print(dataToSend);
    // Send it
    p5live.send(JSON.stringify(dataToSend));
  }
  
  function gotData(data, id) {
    // If it is JSON, parse it
  
    let d = JSON.parse(data);
  
    print(d.dataType);
    if (d.dataType == 'name') {
      allConnections[id].name = d.name;
    } else if (d.dataType == 'location') {
      allConnections[id].x = d.x;
      allConnections[id].y = d.y;
    }
  }
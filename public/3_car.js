// This is a test of the p5LiveMedia webrtc library and associated service.
// Open this sketch up 9 times to send video back and forth
// let socket = io.connect("http://localhost:4000");

// let socket = io.connect("http://localhost:5500");

let allConnections = [];
let vidWidth = 160;
let vidHeight = 120;
let p5live;

let nameField;
let canvas;
let bg;
let mask;
let img;


// function windowResized(){
//     console.log('resized');
//     resizeCanvas(windowWidth, windowHeight);
//   }
  
  function setup() {
    canvas =   createCanvas(windowWidth, windowHeight);
    canvas.position(0,0);
    canvas.style('z-index', '-1');
    bg = loadImage('images/car_museum.jpg');
    img = loadImage('images/cars.png');
    noCursor();
    let constraints = {audio: false, video: true};
    myVideo = createCapture(constraints,VIDEO, gotMineConnectOthers);
    myVideo.size(vidWidth, vidHeight);
    myVideo.hide();
    allConnections['Me'] = {
      'video': myVideo,
      'name': "Me",
      'x': random(width),
      'y': random(height)
    }
    nameField = createInput("Enter your name");
    nameField.changed(enteredName);
    nameField.position(10,700);

    r = random(255);
    g = random(255);
    b = random(255);
  
  }
  
  
  function gotMineConnectOthers(myStream) {
    p5live = new p5LiveMedia(this, "CAPTURE", myStream, "carmuseumRoom");
    p5live.on('stream', gotOtherStream);
    p5live.on('disconnect', lostOtherStream);
    p5live.on('data', gotData);
  }
  
  function draw() {
    background(bg);
   
    //stroke(255);
    // mask = createGraphics(vidWidth, vidHeight);
    // mask.circle(mask.width/2, mask.height/2, 80);
    // myVideo.mask(mask);
    noCursor;
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
      image(img,0,0,windowWidth, windowHeight);
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
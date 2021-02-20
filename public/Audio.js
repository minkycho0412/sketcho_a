let myAudio;
let otherVideo;

function setup() { 
  // Use constraints to request audio from createCapture
  let constraints = {
    audio: true
  };
  
  // Need to use the callback to get at the audio/video stream
  myAudio = createCapture(constraints, function(stream) {
    
    // Get a stream from the canvas to send
    // Extract the audio tracks from the stream
    let audioTracks = stream.getAudioTracks();
    
    // Use the first audio track, add it to the canvas stream
    if (audioTracks.length > 0) {
      canvasStream.addTrack(audioTracks[0]);
    }
    
    // Give the canvas stream to SimpleSimplePeer as a "CAPTURE" stream
    let p5lm = new p5LiveMedia(this, "CAPTURE", canvasStream, "SimpleSimplePeerAdvancedTest");
    p5lm.on('stream', gotStream);       
  });
  
  myAudio.elt.muted = true;
  myAudio.hide();

  button = createButton('UnMute');
  button.position(800,10);
  button.size(50,40);
  button.mousePressed(UnMute);
}

function draw() {
}

function gotStream(stream) {
  otherVideo = stream;
}
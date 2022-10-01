//code by marlon barrios solano

let faceapi;
let detections = [];
let mask;

let video;
let canvas;

function setup() {
  canvas = createCanvas(640, 480);
  canvas.id("canvas");
  mask = loadImage("purepng.png");

  video = createCapture(VIDEO);// Creat the video: 
  video.id("video");
  video.size(width, height);
  
  const faceOptions = {
    withLandmarks: true,
   
  };

  //Initialize the model: 
  faceapi = ml5.faceApi(video, faceOptions, faceReady);
}

function faceReady() {
  faceapi.detect(gotFaces);// Start detecting faces:
}

// Got faces: 顔を検知
function gotFaces(error, result) {
  if (error) {
    console.log(error);
    return;
  }

  detections = result;　//Now all the data in this detections: 
 

  clear();//Draw transparent background;: 
  drawBoxs(detections);//Draw detection box: 
 

  faceapi.detect(gotFaces);// Call the function again at here: 
}

function drawBoxs(detections){
  
  if (detections.length > 0) {//If at least 1 face is detected:
    for (f=0; f < detections.length; f++){
      let {_x, _y, _width , _height} = detections[f].alignedRect._box;
     
      imageMode(CORNERS);
      image(mask,  _x  , _y -15, _x + _width, _y+_height);
      textSize(20);
      fill(255);
      textFont('Helvetica Neue');
      text("Privacy is Dead, ", 100, 400);
      text( "...and that’s the Way you Like It.!", 100, 430);
    
    }
  }
}


// Classifier Variable
let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/gi7W_hGuR/';

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";

let hang;
let yes;
let no;
let love;
let peace;
let oldSign;
let onScreen = false;
let images = {};

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + "model.json");
  images = {
    Yes: loadImage("images/Yes.png"),
    No: loadImage("images/No.png"),
    Hang: loadImage("images/Hang.png"),
    Peace: loadImage("images/Peace.png"),
    Love: loadImage("images/Love.png"),
  }
}

function setup() {
  createCanvas(1280, 720);
  // Create the video
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  flippedVideo = ml5.flipImage(video)
  // Start classifying
  classifyVideo();
}

function draw() {
  background(0);
  imageMode(CORNER);

  // Draw the video
  tint(255);
  image(flippedVideo, 0, 0);

  if (label && label != "background") {
    // console.log('here');
    image(images[label], 0, 0);
  }

}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
  // Classifiy again!
  classifyVideo();
}

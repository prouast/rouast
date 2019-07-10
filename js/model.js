
import {VideoBuffer} from './buffer.js';

// The number of frames used for prediction.
const NUM_FRAMES = 16;

// A webcam iterator
let webcam;

// The buffer object where we will store frames.
const videoBuffer = new VideoBuffer(NUM_FRAMES);

// The model.
let model;

// Push a frame into the videoBuffer
async function pushFrame() {
  const frame = await webcam.capture();
  const ready = tf.tidy(() =>
    videoBuffer.updateWithFrame(frame.toFloat().div(127).sub(1)));
  frame.dispose();
  if (ready) {
    // TODO ready for prediction?
  }
}

async function init() {
  try {
    const videoElement = document.createElement('video');
    videoElement.width = 128;
    videoElement.height = 128;
    webcam = await tf.data.webcam(videoElement);
    //webcam = await tf.webcam(document.getElementById('videoElement'));
  } catch (e) {
    console.log(e);
  }

  var timer = setInterval(pushFrame, 125);

  model = await tf.loadLayersModel('./model/model.json');
  model.summary();

  //clearInterval(timer)

  //  ui.init();

  // TODO warm up the model?
}


// Initialize the application.
init();

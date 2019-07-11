
import {VideoBuffer} from './buffer.js';

// The number of frames used for prediction.
const NUM_FRAMES = 16;

// A webcam iterator
let webcam;

// The buffer object where we will store frames.
const videoBuffer = new VideoBuffer(NUM_FRAMES);

// The model.
let model;

async function init() {
  try {
    const webcamConfig = {
      facingMode: 'user',
      resizeWidth: 128.0,
      resizeHeight: 128.0,
      centerCrop: true
    }
    webcam = await tf.data.webcam(document.getElementById('webcam'), webcamConfig);
  } catch (e) {
    console.log(e);
  }

  var timer = setInterval(pushFrame, 125);

  model = await tf.loadLayersModel('./model/model.json');
  model.summary();

  //clearInterval(timer)

  //ui.init();
}

function standardization(frames) {
  const num_pixels = tf.prod(frames.shape);
  const mean = tf.mean(frames);
  const stddev = tf.sqrt(tf.relu(tf.sub(tf.mean(tf.square(frames)), tf.square(mean))))
  const min_stddev = tf.rsqrt(tf.cast(num_pixels, 'float32'))
  const pixel_value_scale = tf.maximum(stddev, min_stddev)
  const normFrames = tf.div(tf.sub(frames, mean), pixel_value_scale);
  return normFrames;
}

let isPredicting = false;

async function predict() {
  while (isPredicting) {
    // Get input frames
    // Try 2D model why maxPool3D is not supported yet
    const frame = videoBuffer.frames.slice(NUM_FRAMES - 1);
    // Normalize the frames
    const normFrame = tf.tidy(() => standardization(frame.toFloat()));
    frame.dispose();
    // const t0 = performance.now();
    // Run inference
    const logits = model.predict(normFrame);
    normFrame.dispose();
    const p = tf.softmax(logits.flatten());
    // const t1 = performance.now();
    // console.log("inference took " + (t1 - t0) + " milliseconds.");
    // console.log('tf.memory(): ', tf.memory());
    p.print();

    await tf.nextFrame();
  }
}

// Push a frame into the videoBuffer
async function pushFrame() {
  const frame = await webcam.capture();
  const ready = tf.tidy(() => videoBuffer.updateWithFrame(frame));
  frame.dispose();
  if (ready) {
    // Ready for prediction
    isPredicting = true;
    predict()
  }
}

// Initialize the application.
init();

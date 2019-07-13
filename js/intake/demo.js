import {VideoBuffer} from './buffer.js';
import {UI} from './ui.js';

// The number of frames used for prediction.
const NUM_FRAMES = 16;

/**
 * Demo for intake gesture detection
 */
export class IntakeDemo {
  constructor(webcamId, chartId) {
    this.webcamId = webcamId;
    this.chartId = chartId
  }

  async init() {
    this.isPredicting = false;
    this.videoBuffer = new VideoBuffer(NUM_FRAMES);
    this.ui = new UI(this.chartId);
    this.ui.cameraAccess();
    try {
      const webcamConfig = {
        facingMode: 'user',
        resizeWidth: 128.0,
        resizeHeight: 128.0,
        centerCrop: true
      }
      this.webcam = await tf.data.webcam(
        document.getElementById(this.webcamId), webcamConfig);
    } catch (e) {
      this.ui.cameraError();
      console.log(e);
      this.ui.close();
    }
    if (this.webcam != null) {
      this.timer = setInterval(this.pushFrame.bind(this), 125);
      this.model = await tf.loadLayersModel('../../model/intake/model.json');
      this.ui.cameraReady();
      this.ui.modelWaiting();
      this.waiting = true;
    }
  }

  standardize(frames) {
    const num_pixels = tf.prod(frames.shape);
    const mean = tf.mean(frames);
    const stddev = tf.sqrt(tf.relu(tf.sub(tf.mean(tf.square(frames)), tf.square(mean))))
    const min_stddev = tf.rsqrt(tf.cast(num_pixels, 'float32'))
    const pixel_value_scale = tf.maximum(stddev, min_stddev)
    const normFrames = tf.div(tf.sub(frames, mean), pixel_value_scale);
    return normFrames;
  }

  // Push a frame into the videoBuffer
  async pushFrame() {
    const frame = await this.webcam.capture();
    const ready = tf.tidy(() => this.videoBuffer.updateWithFrame(frame));
    frame.dispose();
    if (ready && !this.isPredicting) {
      if (this.waiting) {
        // Model is ready
        this.waiting = false;
        this.ui.modelReady();
      }
      // Predict
      this.predict();
    }
  }

  // Make one prediction
  async predict() {
    this.isPredicting = true;
    // Get input frames
    // Try 2D model why maxPool3D is not supported yet
    const frame = this.videoBuffer.frames.slice(NUM_FRAMES - 1);
    // Normalize the frames
    const normFrame = tf.tidy(() => this.standardize(frame.toFloat()));
    frame.dispose();
    const t0 = performance.now();
    // Run inference
    const logits = this.model.predict(normFrame);
    normFrame.dispose();
    const p = tf.softmax(logits.flatten());
    const data = await p.data();
    this.ui.updateChart(data[1], t0);
    const t1 = performance.now();
    this.isPredicting = false;
    //console.log("inference took " + (t1 - t0) + " milliseconds.");
    //console.log('tf.memory(): ', tf.memory());
  }

  stop() {
    clearInterval(this.timer);
    this.webcam.stop();
  }
}

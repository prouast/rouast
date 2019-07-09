
// A buffer that keeps the most recent 16 video frames

export class VideoBuffer {
  constructor(numFrames) {
    this.numFrames = numFrames;
  }
  /**
  * Add a frame to the video buffer.
  * Should be called at 8 fps since that's what the model was trained for.
  * @param {Tensor} frame A tensor [128, 128, 3] representing the frame.
  */
  updateWithFrame(frame) {
    // Add the frame
    if (this.frames == null) {
      this.frames = tf.keep(frame.expandDims(0));
    } else {
      const oldFrames = this.frames;
      this.frames = tf.keep(oldFrames.concat(frame, 0));
      oldFrames.dispose();
    }
    // Remove oldest frame if buffer is already full
    if (this.frames.shape[0] > this.numFrames) {
      const oldFrames = this.frames;
      this.frames = tf.keep(oldFrames.slice([1, 0, 0, 0], this.numFrames))
      oldFrames.dispose();
    }
  }
}

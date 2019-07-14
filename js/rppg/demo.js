
export class RPPGDemo {
  constructor(webcamId, chartId) {
    this.webcamId = webcamId;
    this.chartId = chartId
  }
  async init(resolution) {
    this.webcam = document.getElementById(this.webcamId);
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
      .then(function(stream) {
        this.webcam.srcObject = stream;
        this.webcam.play();
        this.stream = stream;
        this.webcam.addEventListener('canplay', this.onVideoStarted.bind(this), false);
      }.bind(this))
      .catch(function(err) {
        console.log("An error occurred!" + err);
      });
    // Mats that will hold the frames
    this.src = new cv.Mat(this.webcam.height, this.webcam.width, cv.CV_8UC4);
    this.dst = new cv.Mat(this.webcam.height, this.webcam.width, cv.CV_8UC1);
    this.streaming = false;
    console.log("init done");
  }
  onVideoStarted() {
    console.log("start done");
    this.streaming = true;
    this.cap = new cv.VideoCapture(this.webcam);
    this.timer = setInterval(this.processFrame.bind(this), 100);
  }
  async processFrame() {
    console.log("frame..");
    const t0 = Date.now();
    console.log(this.cap);
    this.cap.read(this.src);
    console.log(this.src);
    cv.cvtColor(this.src, this.dst, cv.COLOR_RGBA2GRAY);
    cv.imshow('rppgCanvas', this.dst);
  }
  stop() {
    clearInterval(this.timer);
    if (this.webcam) {
      this.webcam.pause();
      this.webcam.srcObject = null;
      this.webcam.removeEventListener('canplay', this.onVideoStarted.bind(this));
    }
    if (this.stream) {
      this.stream.getVideoTracks()[0].stop();
    }
  }
}

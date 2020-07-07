import {IntakeDetection} from './intake/intake_detection.js';
import {Heartbeat} from './rppg/heartbeat.js';

const OPENCV_URI = "https://docs.opencv.org/master/opencv.js";
const TENSORFLOW_URI = "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest"
const HAARCASCADE_URI = "model/rppg/haarcascade_frontalface_alt.xml";

let intakeDemo;
let rppgDemo;
let opencvLoaded = false;
let tensorflowLoaded = false;

// Animate menu scrolling
$("#topMenu").click(function() {
  $('html, body').animate({
      scrollTop: 0
  }, 200);
});

// Animate menu scrolling
$("#projectsMenu").click(function() {
  $('html, body').animate({
      scrollTop: $("#projects").offset().top - 100
  }, 200);
});

// Animate menu scrolling
$("#publicationsMenu").click(function() {
  $('html, body').animate({
      scrollTop: $("#publications").offset().top - 100
  }, 200);
});

// Animate menu scrolling
$("#timelineMenu").click(function() {
  $('html, body').animate({
      scrollTop: $("#timeline").offset().top - 100
  }, 200);
});

// Show/hide more projects
$("#projectsButton").click(function(evt){
  evt.preventDefault();
  if ($("#hidableProjects").css("display") == "none") {
    $("#hidableProjects").show(0);
    $("#projectsButton").html("Show less");
    $("#projectsButton").removeClass("primary");
  }
  else {
    $("#hidableProjects").hide(0);
    $("#projectsButton").html("Show more");
    $("#projectsButton").addClass("primary");
  }
});

// Show/hide more publications
$("#publicationsButton").click(function(evt){
  evt.preventDefault();
  if ($("#hidablePublications").css("display") == "none") {
    $("#hidablePublications").show(0);
    $("#publicationsButton").html("Show less");
    $("#publicationsButton").removeClass("primary");
  }
  else {
    $("#hidablePublications").hide(0);
    $("#publicationsButton").html("Show more");
    $("#publicationsButton").addClass("primary");
  }
});

// Show/hide TAC abstract
$("#buttonJBHI").click(function(evt){
  evt.preventDefault();
  if ($("#moreJBHI").css("display") == "none") {
    $("#dotsJBHI").toggle();
    $("#moreJBHI").toggle();
    $("#buttonJBHI").html("Read less");
    $("#buttonJBHI").removeClass("primary");
  }
  else {
    $("#dotsJBHI").toggle();
    $("#moreJBHI").toggle();
    $("#buttonJBHI").html("Read more");
    $("#buttonJBHI").addClass("primary");
  }
});

// Show/hide TAC abstract
$("#buttonTAC").click(function(evt){
  evt.preventDefault();
  if ($("#moreTAC").css("display") == "none") {
    $("#dotsTAC").toggle();
    $("#moreTAC").toggle();
    $("#buttonTAC").html("Read less");
    $("#buttonTAC").removeClass("primary");
  }
  else {
    $("#dotsTAC").toggle();
    $("#moreTAC").toggle();
    $("#buttonTAC").html("Read more");
    $("#buttonTAC").addClass("primary");
  }
});

// Show/hide ECIS abstract
$("#buttonECIS").click(function(evt){
  evt.preventDefault();
  if ($("#moreECIS").css("display") == "none") {
    $("#dotsECIS").toggle();
    $("#moreECIS").toggle();
    $("#buttonECIS").html("Read less");
    $("#buttonECIS").removeClass("primary");
  }
  else {
    $("#dotsECIS").toggle();
    $("#moreECIS").toggle();
    $("#buttonECIS").html("Read more");
    $("#buttonECIS").addClass("primary");
  }
});

// Show/hide FCS abstract
$("#buttonFCS").click(function(evt){
  evt.preventDefault();
  if ($("#moreFCS").css("display") == "none") {
    $("#dotsFCS").toggle();
    $("#moreFCS").toggle();
    $("#buttonFCS").html("Read less");
    $("#buttonFCS").removeClass("primary");
  }
  else {
    $("#dotsFCS").toggle();
    $("#moreFCS").toggle();
    $("#buttonFCS").html("Read more");
    $("#buttonFCS").addClass("primary");
  }
});

// Show/hide AITIC abstract
$("#buttonAITIC").click(function(evt){
  evt.preventDefault();
  if ($("#moreAITIC").css("display") == "none") {
    $("#dotsAITIC").toggle();
    $("#moreAITIC").toggle();
    $("#buttonAITIC").html("Read less");
    $("#buttonAITIC").removeClass("primary");
  }
  else {
    $("#dotsAITIC").toggle();
    $("#moreAITIC").toggle();
    $("#buttonAITIC").html("Read more");
    $("#buttonAITIC").addClass("primary");
  }
});

// Load tensorflow when needed
async function loadTensorflow(uri) {
  return new Promise(function(resolve, reject) {
    console.log("starting to load tensorflow");
    var tag = document.createElement('script');
    tag.src = uri;
    tag.async = true;
    tag.type = 'text/javascript'
    tag.onload = () => {
      console.log("tensorflow ready");
      resolve();
    };
    tag.onerror = () => {
      throw new URIError("tensorflow didn't load correctly.");
    };
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  });
}

// Intake demo modal
$("#intakeModalButton").click(function() {
  $("#intakeModal")
    .modal({
      onVisible: function() {
        if (intakeDemo == null) {
          intakeDemo = new IntakeDetection('intakeWebcam', 'intakeChart');
        }
        if (tensorflowLoaded) {
          $('#intakeModalDimmer').removeClass('active');
          $('#intakeCameraLoader').addClass('active');
          intakeDemo.start();
        } else {
          var ready = loadTensorflow(TENSORFLOW_URI);
          ready.then(function() {
            $('#intakeModalDimmer').removeClass('active');
            $('#intakeCameraLoader').addClass('active');
            intakeDemo.start();
          });
        }
      },
      onHidden: function() {
        intakeDemo.stop();
        $('#intakeModalDimmer').addClass('active');
      }})
    .modal('show');
});

// Load opencv when needed
async function loadOpenCv(uri) {
  return new Promise(function(resolve, reject) {
    console.log("starting to load opencv");
    var tag = document.createElement('script');
    tag.src = uri;
    tag.async = true;
    tag.type = 'text/javascript'
    tag.onload = () => {
      cv['onRuntimeInitialized'] = () => {
        opencvLoaded = true;
        console.log("opencv ready");
        resolve();
      }
    };
    tag.onerror = () => {
      throw new URIError("opencv didn't load correctly.");
    };
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  });
}

// RPPG demo modal
$("#rppgModalButton").click(function() {
  $("#rppgModal")
    .modal({
      onVisible: function() {
        rppgDemo = new Heartbeat('rppgWebcam', 'rppgCanvas', HAARCASCADE_URI, 30, 6, 250);
        if (opencvLoaded) {
          $('#rppgModalDimmer').removeClass('active');
          $('#rppgCameraLoader').addClass('active');
          rppgDemo.init();
        } else {
          var ready = loadOpenCv(OPENCV_URI);
          ready.then(function() {
            $('#rppgModalDimmer').removeClass('active');
            $('#rppgCameraLoader').addClass('active');
            rppgDemo.init();
          });
        }
      },
      onHidden: function() {
        rppgDemo.stop();
        $('#rppgModalDimmer').addClass('active');
      }})
    .modal('show');
});

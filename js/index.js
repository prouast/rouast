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

// Show/hide ACC2020 abstract
$("#buttonACC2020").click(function(evt){
  evt.preventDefault();
  if ($("#moreACC2020").css("display") == "none") {
    $("#dotsACC2020").toggle();
    $("#moreACC2020").toggle();
    $("#buttonACC2020").html("Read less");
    $("#buttonACC2020").removeClass("primary");
  }
  else {
    $("#dotsACC2020").toggle();
    $("#moreACC2020").toggle();
    $("#buttonACC2020").html("Read more");
    $("#buttonACC2020").addClass("primary");
  }
});

// Show/hide JBHI2019 abstract
$("#buttonJBHI2019").click(function(evt){
  evt.preventDefault();
  if ($("#moreJBHI2019").css("display") == "none") {
    $("#dotsJBHI2019").toggle();
    $("#moreJBHI2019").toggle();
    $("#buttonJBHI2019").html("Read less");
    $("#buttonJBHI2019").removeClass("primary");
  }
  else {
    $("#dotsJBHI2019").toggle();
    $("#moreJBHI2019").toggle();
    $("#buttonJBHI2019").html("Read more");
    $("#buttonJBHI2019").addClass("primary");
  }
});

// Show/hide TAC abstract
$("#buttonTAC2019").click(function(evt){
  evt.preventDefault();
  if ($("#moreTAC2019").css("display") == "none") {
    $("#dotsTAC2019").toggle();
    $("#moreTAC2019").toggle();
    $("#buttonTAC2019").html("Read less");
    $("#buttonTAC2019").removeClass("primary");
  }
  else {
    $("#dotsTAC2019").toggle();
    $("#moreTAC2019").toggle();
    $("#buttonTAC2019").html("Read more");
    $("#buttonTAC2019").addClass("primary");
  }
});

// Show/hide ECIS abstract
$("#buttonECIS2018").click(function(evt){
  evt.preventDefault();
  if ($("#moreECIS2018").css("display") == "none") {
    $("#dotsECIS2018").toggle();
    $("#moreECIS2018").toggle();
    $("#buttonECIS2018").html("Read less");
    $("#buttonECIS2018").removeClass("primary");
  }
  else {
    $("#dotsECIS2018").toggle();
    $("#moreECIS2018").toggle();
    $("#buttonECIS2018").html("Read more");
    $("#buttonECIS2018").addClass("primary");
  }
});

// Show/hide FCS abstract
$("#buttonFCS2016").click(function(evt){
  evt.preventDefault();
  if ($("#moreFCS2016").css("display") == "none") {
    $("#dotsFCS2016").toggle();
    $("#moreFCS2016").toggle();
    $("#buttonFCS2016").html("Read less");
    $("#buttonFCS2016").removeClass("primary");
  }
  else {
    $("#dotsFCS2016").toggle();
    $("#moreFCS2016").toggle();
    $("#buttonFCS2016").html("Read more");
    $("#buttonFCS2016").addClass("primary");
  }
});

// Show/hide AITIC abstract
$("#buttonAITIC2016").click(function(evt){
  evt.preventDefault();
  if ($("#moreAITIC2016").css("display") == "none") {
    $("#dotsAITIC2016").toggle();
    $("#moreAITIC2016").toggle();
    $("#buttonAITIC2016").html("Read less");
    $("#buttonAITIC2016").removeClass("primary");
  }
  else {
    $("#dotsAITIC2016").toggle();
    $("#moreAITIC2016").toggle();
    $("#buttonAITIC2016").html("Read more");
    $("#buttonAITIC2016").addClass("primary");
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

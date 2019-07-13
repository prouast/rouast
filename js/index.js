
import {IntakeDemo} from './intake/demo.js';
import {RPPGDemo} from './rppg/demo.js';

let intakeDemo;
let rppgDemo;

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

// Intake demo modal
$("#intakeModalButton").click(function() {
  $("#intakeModal")
    .modal({
      onVisible: function() {
        intakeDemo = new IntakeDemo('intakeWebcam', 'intakeChart');
        intakeDemo.init();
      },
      onHidden: function() {
        intakeDemo.stop();
      }})
    .modal('show');
});

// rPPG demo modal
$("#rppgModalButton").click(function() {
  $("#rppgModal")
    .modal({
      onVisible: function() {
        rppgDemo = new RPPGDemo('rppgWebcam', 'rppgChart');
        rppgDemo.init();
      },
      onHidden: function() {
        rppgDemo.stop();
      }})
    .modal('show');
});


import {Demo} from './demo.js';

let demo;

$(document).ready(function() {
  $("#topMenu").click(function() {
    $('html, body').animate({
        scrollTop: 0
    }, 200);
  });
  $("#projectsMenu").click(function() {
    $('html, body').animate({
        scrollTop: $("#projects").offset().top - 100
    }, 200);
  });
  $("#publicationsMenu").click(function() {
    $('html, body').animate({
        scrollTop: $("#publications").offset().top - 100
    }, 200);
  });
  $("#timelineMenu").click(function() {
    $('html, body').animate({
        scrollTop: $("#timeline").offset().top - 100
    }, 200);
  });
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
  $("#modal1").click(function() {
    $('.ui.small.modal')
      .modal({
        onVisible: function() {
          demo = new Demo('webcam', 'chart');
          $('body')
            .toast({
              message: 'I am a toast, nice to meet you !'
            });
          demo.init();
        },
        onHidden: function() {
          demo.stop();
        }
      })
      .modal('show');
  });
});

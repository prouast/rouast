
$(document).ready(function() {
  $("#topMenu").click(function() {
    $('html, body').animate({
        scrollTop: 0
    }, 250);
  });
  $("#projectsMenu").click(function() {
    $('html, body').animate({
        scrollTop: $("#projects").offset().top - 100
    }, 250);
  });
  $("#publicationsMenu").click(function() {
    $('html, body').animate({
        scrollTop: $("#publications").offset().top - 100
    }, 250);
  });
  $("#timelineMenu").click(function() {
    $('html, body').animate({
        scrollTop: $("#timeline").offset().top - 100
    }, 250);
  });
  $("#projectsButton").click(function(evt){
    evt.preventDefault();
    if ($("#hidableProjects").css("display") == "none") {
      $("#hidableProjects").show(250);
      $("#projectsButton").html("Show less")
      $("#projectsButton").removeClass("primary")
    }
    else {
      $("#hidableProjects").hide(250);
      $("#projectsButton").html("Show more")
      $("#projectsButton").addClass("primary")
    }
  });
  $("#buttonTAC").click(function(evt){
    evt.preventDefault();
    if ($("#moreTAC").css("display") == "none") {
      $("#dotsTAC").toggle();
      $("#moreTAC").toggle();
      $("#buttonTAC").html("Read less")
      $("#buttonTAC").removeClass("primary")
    }
    else {
      $("#dotsTAC").toggle();
      $("#moreTAC").toggle();
      $("#buttonTAC").html("Read more")
      $("#buttonTAC").addClass("primary")
    }
  });
  $("#buttonECIS").click(function(evt){
    evt.preventDefault();
    if ($("#moreECIS").css("display") == "none") {
      $("#dotsECIS").toggle();
      $("#moreECIS").toggle();
      $("#buttonECIS").html("Read less")
      $("#buttonECIS").removeClass("primary")
    }
    else {
      $("#dotsECIS").toggle();
      $("#moreECIS").toggle();
      $("#buttonECIS").html("Read more")
      $("#buttonECIS").addClass("primary")
    }
  });
});

$(document).on("click", "#mc-embedded-subscribe", function(){
  $(".get-updates").fadeOut();

  $("header nav.isRight a").text("Thanks for Joining!")
});

$(document).on("click", ".gu-exit", function(){
  $(".get-updates-underlay").animate({
    width: "50px",
    height: "50px"
  }, 500, function(){
    $(".get-updates").css("display", "none");
    $(".gu-exit").css("display", "none");
  });

  $(".gu-content, .gu-exit").animate({
    opacity:0,
  }, 250);


});

$(document).on("click", "#getUpdates", function(){
  $(".get-updates").css("display", "block");
  $(".gu-exit").css("display", "flex");

  $(".get-updates-underlay").animate({
    width: "200%",
    height: "200%"
  }, 500, function(){
  });

  setTimeout(function(){
    $(".gu-content, .gu-exit").animate({
      opacity:1,
    }, 250);
  }, 250);



});

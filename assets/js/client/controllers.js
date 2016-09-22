$(document).on("click", "#mc-embedded-subscribe", function(){
//  $(".get-updates").fadeOut();
//  $("content, body").css("overflow-y", "auto");

//  $("header nav.isRight a").text("Thanks for Joining!")
});

$(document).on("click", ".gu-exit", function(){
  $("content, body").css("overflow-y", "auto");

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

$(document).on("click", ".getUpdates", function(){
  $(".get-updates").css("display", "block");
  $(".gu-exit").css("display", "flex");
  $("content, body").css("overflow-y", "hidden");

  const size_x = $(window).width()*2;
  const size_y = $(window).height()*2;
  let size = size_x;

  if(size_x < size_y){
    size = size_y;
  }

  $(".get-updates-underlay").css("margin-top", -(size/4));
  $(".get-updates-underlay").css("margin-right", -(size/4));

  $(".get-updates-underlay").animate({
    width: size,
    height: size
  }, 500, function(){
  });

  setTimeout(function(){
    $(".gu-content, .gu-exit").animate({
      opacity:1,
    }, 250);
  }, 250);



});

function launchIndex(){
  // all functions from index.js





  $(".index-HackForTheFuture").parent().mouseenter(function(){
    const size = $(".isFull .content").width();
    $(".index-HF2").animate({
      width:size - 120
    }, 500)
  });

  $(".index-HackForTheFuture").parent().mouseleave(function(){
    $(".index-HF2").animate({
      width:0
    }, 500)
  });


}

function launchApplyField(noanimation){
  if(noanimation){
    launchApplyData();
  } else {
    launchApplyData();
  }
}

function launchApplyData(){

}

$(document).on("click", ".applyNow", function(){
  launchApplyField(false);
});



$(document).on("click", ".option-logThemIn", function(){
  let $apply = $(".apply-section-KeepingLoop");
  if(!$apply.hasClass("old-user")){
    $apply.addClass("old-user");
  }
});

$(document).on("click", ".option-signThemUp", function(){
  let $apply = $(".apply-section-KeepingLoop");

  if($apply.hasClass("old-user")){
    $apply.removeClass("old-user");

  }
});


$(document).on("click", ".ifLoneWolf", function(){
  $(".isHighSchool, .isCollege").css("display", "none");
  $(".isLoneWolf").css("display", "block");
});

$(document).on("click", ".ifCollege", function(){
  $(".isHighSchool, .isLoneWolf").css("display", "none");
  $(".isCollege").css("display", "block");
});

$(document).on("click", ".ifHighSchool", function(){
  $(".isCollege, .isLoneWolf").css("display", "none");
  $(".isHighSchool").css("display", "block");
});

$(document).on("click", ".start-my-app", function(){
  $(".apply-section-KeepingLoop").css("display", "none");
  $(".apply-section-GettingToKnowYou").css("display", "none");
});

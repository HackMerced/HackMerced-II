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

$(document).on("click", ".start-my-app", function(){
  // put in request to log-in


  $(".apply-section-KeepingLoop").css("display", "none");
  $(".apply-section-GettingToKnowYou").css("display", "none");

});

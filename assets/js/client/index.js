function launchIndex(){
  // all functions from index.js





  $(".index-HackForTheFuture").parent().mouseenter(function(){
    $(".index-HF2").animate({
      width:780
    }, 500)
  });

  $(".index-HackForTheFuture").parent().mouseleave(function(){
    $(".index-HF2").animate({
      width:0
    }, 500)
  });


}

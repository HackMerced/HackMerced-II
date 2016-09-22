function centerInSectionsVertically(){
  $(".u-verticalCenterIntheMiddleofASection").each(function(){
    const $that = $(this);

    $that.css("margin-top", -($that.height()/2));
  });
}



function pageRenderOperations(page, resolve){
  centerInSectionsVertically(); // centers those with the class "centerIntheMiddleofASection" vertically

  resolve();
}

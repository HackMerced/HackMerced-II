
// the ad for helix



function playHelixAd(where){
  $.ajax({
      url: "/html/ads/helix.html",
      type: "GET",
      success: function(helixAd){
        console.log("a")
        $(where).html(helixAd);
      },
      error:function(){

      },
  });

}

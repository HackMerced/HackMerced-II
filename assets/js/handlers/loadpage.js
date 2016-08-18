//
window.onpopstate = function(){
  onLoad();
};

//when window loads
window.onload = function () {
    onLoad();
};



function onLoad(){
  if (typeof history.pushState === "function") {
    var page = window.location.pathname.split('/')[1];
        page = (page) ? page : "index";

    loadPage(page);

  } else {
    // if it fails
      var ignoreHashChange = true;
      window.onhashchange = function () {
          if (!ignoreHashChange) {
              ignoreHashChange = true;
              window.location.hash = Math.random();
          }
          else {
              ignoreHashChange = false;
          }
      };
  }
}

function getService(){
  return $("preload").data("service");
}

function loadPage(page){
  // load header
  $.ajax({
      url: "/html/" getService() + "/" + page + ".html",
      type: "GET",
      success: function(results){

        $("content").html(results);

        if(page && runPage[page]){
          runPage[page]();
        }
      },
      error: function(results){
        // page fails

      }
  });
}

var runPage = {
  index:function(){
    launchIndex();
  }
}

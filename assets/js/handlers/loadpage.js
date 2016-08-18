// random catch phrases
var catchphrases = [
  'Hack On.',
  'sudo ./hackmerced.sh',
  'git commit -am "my hack 2017"',
  "Your code looks great!",
  "Just add Node.js",
  "Design+Code",
  "SELECT * FROM hacks"
]

//
window.onpopstate = function(){
  onLoad();
};

$(document).ready(function(){
  onLoad();
});

$(document).on("click", ".load", function(){
  var page = $(this).data("goto");
  setPage(page, page)
  loadPage(page);
});

function setPage(page, title, part){
  history.pushState({}, title, "/" + page + ((part) ? "#" + part : "") );
}


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
      url: "/html/" + getService() + "/" + page + ".html",
      type: "GET",
      success: function(results){

        $("content").html(results);
        loadingAnimations(function(){
          if(page && runPage[page]){
              runPage[page]();
          }
        });

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


function loadingAnimations(resolve){
  $("container section").css("opacity", "0");

  $(".loader-o-text").text(catchphrases.chooseOne());
  var overlay = $(".loader-overlay");
  overlay.css("display", "block");

  setTimeout(function(){

    overlay.animate({
        opacity: 0
    }, 1000, function(){
      overlay.css("display", "none");
    });

    overlay.find(".loader-o-content").animate({
      opacity:0
    }, 500, function(){


      var timeDelay = 1;

      $("container section").each(function(){
        var delay = (timeDelay*150 + 0);
        var that = this;

        $(that).css("margin-top", "50px");

        setTimeout(function(){

          $(that).animate({
            opacity:1,
            "margin-top":0
          }, 500, function(){

          });
        }, delay)


        timeDelay++;
      });

      resolve();

    });
  }, 500)
}

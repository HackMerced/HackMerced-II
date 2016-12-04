// random catch phrases
var catchphrases = [
  'sudo ./hackmerced.sh',
  'git commit -am "my hack 2017"',
  "Just add Node.js",
  "SELECT * FROM hacks",
  "Reticulating Splines",
  "#harambe",
]


function chooseCatchPhrase(){
  $(".loader-o-text").text(catchphrases.chooseOne());
}


function leavingPage(page, resolve){

  if(leavePage[page]){
    leavePage[page](function(){
      resolve();
    });
  } else {

    resolve();
  }
}

function preLoad(resolve){
  if(!$("preload").data("loaded")){
    $("preload").data("loaded", true);
    chooseCatchPhrase();

    resolve();
  }
}

var load = false;

function startUpScripts(){
  $("header nav").css("display", "block");
}

//
window.onpopstate = function(){
  preLoad(function(){
    onLoad(false);
  });
};

function checkLogin(){
  if($("#userdat").data("session")){
      userIsLoggedin();
  }
}

function userIsLoggedin() {
  let html =  '<a data-goto="apply" class="load">Your Application</a>';
      html += '<a href="/api/logout" class="load selected">Log Out</a>';

  $("#applyNow").html(html);
}

$(document).ready(function(){
  startUpScripts();

  checkLogin();


  // hide the nojs website
  $(".nojs").html("");

  preLoad(function(){
    onLoad(false);
  });

});

$(document).on("click", ".load", function(){
  var that = this;
  var oldPage = getCurrentPage();

  preLoad(function(){


    var page = $(that).data("goto") || "";

    makeLoadSelected(page);
    var timeDelay  = 0;
    var last = true;
    $("container section").each(function(){
      var delay = (timeDelay*150 + 0);
      var that = this;

      setTimeout(function(){

        $(that).animate({
          opacity:0,
          "margin-top":50
        }, 500, function(){
          if(last){
            last = false;
            setPage(page, page);
            leavingPage(oldPage, function(){
              loadPage(page);
            });

          }
        });
      }, delay)


      timeDelay++;
    });




  });

});

function setPage(page, title, part){
  history.pushState({}, title, "/" + page + ((part) ? "#" + part : "") );
}

function getCurrentPage(){
  return window.location.pathname.split('/')[1];
}


function onLoad(){
  if (typeof history.pushState === "function") {
    var page = getCurrentPage();


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


// get type of page (client/app/etc)
function getService(){
  return $("preload").data("service");
}

function makeLoadSelected(page){
  $(".load").removeClass("selected");
  $(".load[data-goto='" + page + "']").addClass("selected");

}

function loadPage(page){
  if(!load){
    page = (page) ? page : "index";
    load = true;

    if(!$(".load[data-goto='" + page + "']").hasClass("selected")){
      makeLoadSelected(page);
    }



    // load page
    $.ajax({
        url: "/html/" + getService() + "/" + page + ".html",
        type: "GET",
        success: function(results){
          $("body").attr("data-page", page);
          $("content").html(results);

          pageRenderOperations(page, function(){
            loadingAnimations(function(){
              load = false;
              // scroll to top of page
              $(window).scrollTo(0);

              if(page && runPage[page]){
                runPage[page]();
              } else {
                runPage["default"]();
              }

              $("preload").data("loaded", false);
            });
          })


        },
        error: function(results){
          // page fails

        }
    });
  }

}

var runPage = {
  index:function(){
    launchIndex();
  },
  2016:function(){
    launch2016();
  },
  sponsor:function(){
    launchSponsor();
  },
  apply:function(){
    launchApply();
  },
  default:function(){
  }
}

var leavePage = {
  sponsor:function(resolve){
    leaveSponsor(resolve);
  },
};




// the loading thingy
function loadingAnimations(resolve){
  var overlay = $(".loader-overlay"),
      footer = $("footer"),
      container = $("container section");

  container.css("opacity", "0");
  footer.css("opacity", "0");


  overlay.css("display", "block");
  overlay.animate({
    opacity:1
  }, 500);



  overlay.find(".loader-o-content").css("opacity", "1");

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

      footer.animate({
        opacity:1
      }, 500);

      if($(window).scrollTop() < ($(window).height() + 1)) {
        $("container section").each(function(){
          var delay = (timeDelay*150 + 0);
          var that = this;

          $(that).css("margin-top", "50px");

          setTimeout(function(){

            $(that, ", footer").animate({
              opacity:1,
              "margin-top":0
            }, 500, function(){

            });
          }, delay)


          timeDelay++;
        });
      } else {
        // user isnt at the top of the page
        quickAnimateItems();
      }


      resolve();

    });
  }, 500)
}

function quickAnimateItems(){
  $("container section, footer").animate({
    opacity:1,
    "margin-top":0
  }, 500, function(){

  });
}

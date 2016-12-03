
function loadCollegesAutocomplete(){
  let collegePicker = new myriagon("/files/universities.csv", "applyUniversityMain");
}



function loadLocationAutocomplete(){
  var input = document.getElementById('applyLocationMain');
  var options = {
    types: ['(cities)'],
  };

  autocomplete = new google.maps.places.Autocomplete(input, options);

}

function launchApply(){


  loadLocationAutocomplete()
  launchApplyData();

}






function launchApplyData(){
  const anonData = $("#userdat").data("anonymous");
  const userData = $("#userdat").data("session");

  if(userData){
    startInnerUser(userData);
  } else {
    // run login
    $(".apply-section-KeepingLoop").css("display", "block");
    $("#apply-KeepingLoop").addClass("selected");
    $("#apply-KeepingLoop .apply-completecount").text("Logged Out");
  }

}



$(document).on("click", ".option-logThemIn", function(){
  let $apply = $(".apply-section-KeepingLoop");
  if(!$apply.hasClass("old-user")){
    $apply.addClass("old-user");
  }
});


let lockStartApp = false;

$(document).on("click", ".start-my-app", function(e){
  e.preventDefault();

  if(!lockStartApp){
    lockStartApp = true;




      let $this = this;
      let uri = "/api/login";

      let send = {
        email: $("#inputEmail input").val(),
        password: $("#inputPassword input").val(),
        confirmPassword: $("#inputConfirmPassword input").val()
      }

      if(!$(".apply-section-KeepingLoop").hasClass("old-user")){
        uri = "/api/signup";
      }

      cleanInputErrors();

    $.ajax({
        url: uri,
        type: "POST",
        contentType:"application/json",
        dataType:"json",
        data:JSON.stringify(send),
        success: function(user){
          lockStartApp = false;
          startInnerUser(user);
        },

        error: function(error){
          lockStartApp = false;
          console.log(error);
          if(error.status === 500 || !error.responseJSON){
            inputError.serverFault();
          } else {
            inputError.userFault(error.responseJSON);
          }
        }
    });
  }
});

function startInnerUser(user){
  $(".apply-section-KeepingLoop").css("display", "none");
  $(".apply-section-GettingToKnowYou").fadeIn();

  $("#apply-KeepingLoop .apply-completecount").text("Logged In");
}

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

  loadCollegesAutocomplete();
});

$(document).on("click", ".ifHighSchool", function(){
  $(".isCollege, .isLoneWolf").css("display", "none");
  $(".isHighSchool").css("display", "block");
});


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

          if(error.status === 500 || !error.responseJSON){
            inputError.serverFault();
          } else {
            inputError.userFault(error.responseJSON);
          }
        }
    });
  }
});

function checkUserApplicationStatus(status){
  let $appStatus = $("#apply-GettingToKnowYou .apply-completecount");
  if(status === "accepted"){ // accepted goes in your acceptance
    $appStatus.text("completed");
  } else {
    $appStatus.text(status);
  }
}

function startInnerUser(user){
  $(".apply-section-KeepingLoop").css("display", "none");
  $(".apply-time-section").removeClass("selected");
  $("#apply-GettingToKnowYou").addClass("selected");
  $(".apply-section-GettingToKnowYou").fadeIn();

  $("#apply-KeepingLoop .apply-completecount").text("Logged In");

  checkUserApplicationStatus(user.status);
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

$(document).on("click", ".apply-option", function(){
  const $this = $(this);
  const $parent = $this.parent();

  if(!$this.hasClass("selected")){
    $parent.find("input").val($this.text()); // sets the hidden value as this data
    $parent.find(".selected").removeClass("selected");
    $this.addClass("selected");
  }
});

function generateSurvey(){
  let survey = {};
  $(".apply-item:visible").each(function(){
    const $this = $(this);
    const name = $this.attr('id').replace("input", "").toLowerCase();
    const value = $this.find("input").val();

    if(name !== "name" && value){
      survey[name] = value;
    }
  });

  return survey;
}


$(document).on("change", ".apply-option input", function(){

  let send = {
    name:$("#inputName input").val(),
    survey:generateSurvey()
  }

  $.ajax({
    url: "/api/update",
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

      if(error.status === 500 || !error.responseJSON){
        inputError.serverFault();
      } else {
        inputError.userFault(error.responseJSON);
      }
    }
  });
});

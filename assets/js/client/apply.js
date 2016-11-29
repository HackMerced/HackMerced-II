
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

  loadCollegesAutocomplete();
});

$(document).on("click", ".ifHighSchool", function(){
  $(".isCollege, .isLoneWolf").css("display", "none");
  $(".isHighSchool").css("display", "block");
});

$(document).on("click", ".start-my-app", function(){
  $(".apply-section-KeepingLoop").css("display", "none");
  $(".apply-section-GettingToKnowYou").css("display", "none");
});

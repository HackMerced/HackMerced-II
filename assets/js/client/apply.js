
function loadCollegesAutocomplete(){
  let collegePicker = new myriagon("/files/universities.csv", "inputUniversityMain");
}

function loadLocationAutocomplete(){
  var input = document.getElementById('inputLocationMain');
  var options = {
    types: ['(cities)'],
  };

  let autocomplete = new google.maps.places.Autocomplete(input, options);
      autocomplete.addListener('place_changed', function(){
        let place = autocomplete.getPlace();
        $("#inputLocationMain").data("coordinates", {lat:place.geometry.location.lat(), lng:place.geometry.location.lng()});
      });
}

function launchApply(){

  launchApplyData();

}

function updatedResume(){
  $("#upload-resume").text("Update Resume");
  $("#upload-resume").css("background-color", "#c2c2c2");
}

function loadResumeUpload(){
  let apikey = $("#userdat").data("filestack");
  filepicker.setKey(apikey);

  $("#upload-resume").click(function(e){
    e.preventDefault();


    filepicker.pick(
      {
        extensions: [".pdf", ".odt", ".doc", ".txt"],
      },
      function(data){
        $("#inputResumeMain").val(data.url)
        updatedResume();
      },
      function(FPError){
        //inputError.serverFault();
      });
  });
}




class application{
  constructor(application, userData, location, resolve){
    this.$location = $(location);
    this.userData = userData;
    let that = this;

    this.readApplicationFields(application.fields, userData, function(html){
      $(location).html(html);

      if(userData){
        $("#inputNameMain").val(userData.name);
        if($("#inputResumeMain").val()){
          updatedResume();
        }
        that.checkEducationSelector();
      }

      resolve();
    })
  }

  checkEducationSelector(){
    let field_type = $("#inputEducation .selected").data("type");
    if(field_type){
      if(field_type === "High School"){
        loadHighSchool();
      } else if(field_type === "Undergrad Student" || field_type === "Graduate Student"){
        loadCollege();
      } else {
        loadLoneWolf();
      }
    }

  }

  createOpenTag(type, classes, id, attributes){

        attributes = (attributes) ? attributes : {};
    let more_classes = (attributes && attributes.classes) ? attributes.classes.join(" ") : "";

    let tag  = "<" + type;

        // add tags
        tag += " class='" + (classes.join(" ") + " " + more_classes) + "' ";
        attributes.classes = undefined;

        // add attributes
        for(let x in attributes){
          if(attributes[x]){
            tag += x + "='" + attributes[x] + "' ";
          }

        }

        // add id
        tag += "id='" + id + "' ";

        // close
        tag += ">";

      return tag;
  }


  createItem(item, value){
    let data = "";


    if(item && item.input){
          item.id = item.id.capitalize();
          let tag_classes = ["apply-item"];

          if(item.required){
            tag_classes.push("required");
          }

          data += this.createOpenTag("div", tag_classes, "input" + item.id, item.attributes);
          data += "<label>" + item.title + "</label>";
          data += "<div class='apply-description'>" + item.subtitle + "</div>";

          input = item.input

          if(input.attributes){
            input.attributes.type = input.type;
          } else {
            input.attributes = {type:input.type};
          }

          if(value){
            input.attributes.value = value;
          }

          if(input.type === "multiple-choice"){

            data += "<div class='apply-options'>";


            for(let i in input.fields){
              if(input.fields[i] && input.fields[i].type){
                let field_type = input.fields[i].type;
                let input_classes = ["apply-option"];

                if(!input.fields[i].attributes){
                  input.fields[i].attributes = {};
                }
                input.fields[i].attributes["data-type"] = field_type;



                if(input.attributes.value === field_type){
                  input_classes.push("selected");
                }

                data += this.createOpenTag("div", input_classes, "applyOption" + item.id + field_type.replace(" ", "_"), input.fields[i].attributes);
                data += input.fields[i].value + "</div>"
              }
            }
            data += "</div>"
            data += this.createOpenTag("input", ["apply-option-hidden"], "input" + item.id + "Main", input.attributes);
          } else if(input.type === "filepicker"){


            data += '<button id="upload-resume">Upload Resume</button>';
            data += this.createOpenTag("input", ["apply-option-hidden"], "input" + item.id + "Main", input.attributes);
          } else {

            data += this.createOpenTag("input", [""], "input" + item.id + "Main", input.attributes);
          }
          data += "</div>";
    }


      return data;
  }

  readApplicationFields(fields, userData, resolve){
    let html = "";
    let value = "";

    for(let i in fields){

      if(fields[i] && fields[i].id){
        let set = fields[i].id.toLowerCase();

        if(userData && userData.survey && userData.survey[set]){
          value = userData.survey[set];
        }
        html += this.createItem(fields[i], value);

        value = "";
      }
    }

    resolve(html);
  }
}


function loadApplication(userData, resolve){
  $.ajax({
    url: "/api/application",
    type: "GET",
    contentType:"application/json",
    dataType:"json",
    success: function(form){
      let app = new application(form, userData, "#apply-actual", function(){
        resolve();
      });
    },
    error: function(error){
      inputError.serverFault();
    }
  });
}

function launchApplyData(){
  const anonData = $("#userdat").data("anonymous");
  const userData = $("#userdat").data("session");

  loadApplication(userData, function(){
    if(userData){

        startInnerUser(userData);

    } else {
      // run login
      $(".apply-section-KeepingLoop").css("display", "block");
      $("#apply-KeepingLoop").addClass("selected");
      $("#apply-KeepingLoop .apply-completecount").text("Logged Out");
    }
  });


}



$(document).on("click", ".option-logThemIn", function(){
  let $apply = $(".apply-section-KeepingLoop");
  if(!$apply.hasClass("old-user")){
    $apply.addClass("old-user");
  }
});



$(document).on("click", ".complete-my-app", function(e){
  e.preventDefault();
  let pass = true;

  $(".apply-item-errored").removeClass("apply-item-errored");

  $(".apply-item.required:visible").each(function(){
    const $this = $(this);

    if(!$this.find("input").val()){
      pass = false;
      $this.addClass("apply-item-errored");
    }
  });

  if(pass){
    updateApplication(true);
    inputError.userFault({text:"You have successfully submitted your application - you can stil edit your app!"});
  } else {
    inputError.userFault({text:"You are missing a few required parameters!"});
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
    $appStatus.text("Completed");
  } else {
    $appStatus.text(status.capitalize());
  }
}

function startInnerUser(user){
  $(".apply-section-KeepingLoop").css("display", "none");
  $(".apply-time-section").removeClass("selected");
  $("#apply-GettingToKnowYou").addClass("selected");
  $(".apply-section-GettingToKnowYou").fadeIn(1500);

  $("#apply-KeepingLoop .apply-completecount").text("Logged In");

  checkUserApplicationStatus(user.status);
  loadLocationAutocomplete();
  loadResumeUpload();
}

$(document).on("click", ".option-signThemUp", function(){
  let $apply = $(".apply-section-KeepingLoop");

  if($apply.hasClass("old-user")){
    $apply.removeClass("old-user");

  }
});



function loadLoneWolf(){
  $(".isHighSchool, .isCollege").css("display", "none");
  $(".isLoneWolf").css("display", "block");
}

function loadHighSchool(){
  $(".isCollege, .isLoneWolf").css("display", "none");
  $(".isHighSchool").css("display", "block");
}

function loadCollege(){
  $(".isHighSchool, .isLoneWolf").css("display", "none");
  $(".isCollege").css("display", "block");

  loadCollegesAutocomplete();
}

$(document).on("click", ".ifCollege", function(){
  loadCollege();
});

$(document).on("click", ".ifLoneWolf", function(){
  loadLoneWolf();
});

$(document).on("click", ".ifHighSchool", function(){
  loadHighSchool();
});

$(document).on("click", " .apply-options .apply-option", function(){
  const $this = $(this);
  const $parent = $this.parent();

  if(!$this.hasClass("selected")){
    let type = $this.data("type");
    $parent.parent().find("input").val(type); // sets the hidden value as this data
    $parent.find(".selected").removeClass("selected");
    $this.addClass("selected");
  }
});

$(document).on("click", ".apply-section-GettingToKnowYou .apply-options .apply-option", function(){
  performUpdate();
});



function generateSurvey(){
  let survey = {};
  $(".apply-section-GettingToKnowYou .apply-item").each(function(){
    const $this = $(this);
    if($this && $this.attr && $this.attr("id")){
      const name = $this.attr('id').replace("input", "").toLowerCase();
      const value = $this.find("input").val();

      if(name !== "name" && value){
        survey[name] = value;
      }

    }
  });


  survey.coordinates = $("#inputLocationMain").data("coordinates") || false;

  return survey;
}

function generateSendForUpdate(){
  return {
    name:$("#inputName input").val(),
    survey:generateSurvey()
  }
}

let updateApplication = function(isDone){
  if(!updateLock){
    let updateLock = true;

    let send = generateSendForUpdate();

    if(isDone){
      send.status = "submitted";
    } else {
      send.status = "in-progress"
    }

    $.ajax({
      url: "/api/update",
      type: "POST",
      contentType:"application/json",
      dataType:"json",
      data:JSON.stringify({hacker:send}),
      success: function(user){
        // updated
      },

      error: function(error){
        updateLock = false;

        if(error.status === 500 || !error.responseJSON){
          inputError.serverFault();
        } else {
          inputError.userFault(error.responseJSON);
        }
      }
    });
  }

}

let updateTimer;
let updateLock = false;
function performUpdate(){
  if(updateTimer) {
        clearTimeout(updateTimer);
        updateTimer = null;
  }
  updateTimer = setTimeout(updateApplication, 5000)
}

$(document).on("change keydown", ".apply-section-GettingToKnowYou .apply-item input", function(){
  performUpdate();
});

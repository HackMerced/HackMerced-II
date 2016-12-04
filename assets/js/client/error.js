let server_error = "There seems to be an issue with our servers! Please contact an admin at hello@hackmerced.com to report this issue!";

function createError(error_text){
    let id = $(".error-box").length + 1;
    let timeout = 5000; // defaults to 5s
    let html = "<div class='error-box' id='ebox" + id + "'>" +
                  "<div class='error-box-x fa fa-remove'></div>" +
                  "<div class='error-box-content'>" +
                    error_text +
                  "</div>" +
                "</div>";

    $(".error-container").prepend(html);

    setTimeout(function(){
      $("#ebox" + id).animate({
        opacity:"0",
        height:0
      }, 1000, function(){
        $("#ebox" + id).remove();
      });
    }, timeout)


}

function createIssueInput(issues){


  for(let i in issues){
    if(issues[i] && issues[i].capitalize){
      $("#input" + issues[i].capitalize() + " input").addClass("errored");
    }
  }
}

function cleanInputErrors(){

  $("input").removeClass("errored");
  $(".error-box").remove();
}

$(document).on("click", ".error-box-x", function(){
  let $this = $(this);

  $this.parent().remove();
});

const inputError = {
  userFault:function(error){


    if(error.issue){
      createIssueInput(error.issue);
    }
    createError(error.text);
  },
  serverFault:function(){
    createError(server_error);
  }
}

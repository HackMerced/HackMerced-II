


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



let server_error = "There seems to be an issue with our servers! Please contact an admin at hello@hackmerced.com to report this issue!";

class banner{
	constructor(type, content, timeout){
    this.id = "ebox" + (parseFloat($(".banner-box").length) + 1);
    this.timeout = timeout || 5000;
    this.type = type;

    if(type === "error" && content.issue){
      createIssueInput(content.issue);
    }


		this.createBanner(content.text);
	}

  createBanner(text){
    let html = "<div class='banner-box " + this.type + "' id='" + this.id + "'>" +
                  "<div class='banner-box-x fa fa-remove'></div>" +
                  "<div class='banner-box-content'>" +
                    text +
                  "</div>" +
                "</div>";

    $(".banner-container").prepend(html);

    this.killBanner();

  }

  killBanner(){
    let that = this;
    let $element = $("#" + this.id);

    setTimeout(function(){
      $element.animate({
        opacity:"0",
        height:0
      }, 1000, function(){
        $element.remove();
      });
    }, that.timeout);
  }


}

const loadBanner = {
  error:{
    server:function(){
    	return new banner("error", {text:server_error}, timeout);
    },
    user:function(content, timeout){
    	return new banner("error", content);
    },
  },
  success:function(content){
  	return new banner("success", content);
  }
}

function showCurrentRow(){
  var current = $(window).scrollTop() + $(window).height();
  var delay = 0;

  $(".image-shareImages section.transparent-content").each(function(){
    var that = this;

    if(current >= parseFloat($(that).offset().top)){
      setTimeout(function(){
        $(that).animate({
          opacity:1,
          "margin-top":0
        }, 500, function(){
          $(that).removeClass("transparent-content");
        });
      }, delay*200)

      if(delay < 3){
        delay++;
      } else {
        delay += .25;
      }

    }
  });

}

function launch2016(){
  function loadImage(item){
    var image = "https://s3-us-west-1.amazonaws.com/hackmerced/look_back_2016/" + item + ".jpg"
    return "" +
           "<section class='is33 isLeft withAP transparent-content'>" +
           "<div class='APstats'><div class='button'>Download</div></div>" +
           "<div class='APimage' style='background-image:url(" + image + ")'></div>" +
           "</section>"
  }


  var html = "";

  for(var i = 1; i < 19; i++){
    if(i === 5){
      html += $(".stats-2016").html();
    }
    html += (loadImage(i));
  }

  html += "<div class='clear'></div>"
  $(".image-shareImages").html(html);

  showCurrentRow();

  $(window).scroll(function(){
    showCurrentRow();
  });

}

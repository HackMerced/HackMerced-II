function launch2016(){
  function loadImage(item){
    var image = "https://s3-us-west-1.amazonaws.com/hackmerced/look_back_2016/IMG_00" + item + ".jpg"
    return "" +
           "<section class='is33 isLeft withAPicture' style='background-image:url(" + image + ")' >" +
           "</section>"
  }


  var html = "";

  for(var i = 35; i < 40; i++){
    html += (loadImage(i));
  }
  console.log("a")
  $(".image-shareImages").html(html);
}

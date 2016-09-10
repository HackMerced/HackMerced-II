function launchSponsor(){

  $(".backgroundUnderlay").animate({
    opacity:1
  }, 500, function(){


    runSponor();
  });
}

function leaveSponsor(resolve){

  $("body").removeClass("dark");
  $(".backgroundUnderlay").animate({
    opacity:0
  }, 500, function(){

    resolve();
  });

}


function runSponor(){
  // run all the scripts starting here for sponors
  $("body").addClass("dark");
  generateArcAboutAttendence();


  playHelixAd("#sponsor_playHelixAd")

  //runSchoolsAttending();
}


function runSchoolsAttending(){
  setInterval(function(){
    var count = 0;
    $(".sponsor-rotate-image").each(function(){
      var that = this;

      setTimeout(function(){
        var first_child = $(that).find("img:visible").eq(0);

        var nextIndex = 1;
        if(first_child.index() < ($(that).find("img").length - 1)){
          nextIndex = first_child.index() + 2;
        }

        var second_child = $(that).find("img:nth-child(" + nextIndex + ")");

        if(first_child.css("display") === "none"){
          first = second_child;
          second = first_child;
        } else {
          first = first_child;
          second = second_child;
        }

        first.animate({
          opacity:0
        }, 500, function(){
          first.css("display","none");
          second.css("display","block");



          second.animate({
            opacity:1
          }, 500, function(){

          });
        });

      }, 1200*count);
      count++;
    })



  }, 5000);
}

function generateArcAboutAttendence(){
  var chart = c3.generate({
      bindto:".sponsor-chartAttendence",
      data: {
          columns: [
              ['Students', 329]
          ],
          type: 'gauge',
      },
      gauge: {
          label: {
              format: function(value, ratio) {
                  return value;
              },
              show: false // to turn off the min/max labels.
          },
      min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
      max: 500, // 100 is default
      units: ' %',
      width: 60 // for adjusting arc thickness
      },
      color: {
          pattern: ['#4D199D'], // the three color levels for the percentage values.
      },
      size: {

      }
  });
}

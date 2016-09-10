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
  generateArcAboutBudget();


//  playHelixAd("#sponsor_playHelixAd");


  //runSchoolsAttending();
}


function sentStudents(){
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
}
function runSchoolsAttending(){
  sentStudents();

  setInterval(function(){
    sentStudents();
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

function generateArcAboutBudget(){
  var chart2 = c3.generate({
      bindto:".sponsor-budgetLastYear",
      legend: {
        show: false
      },
      data: {
          columns: [
              ['Food+Water+Snacks', 40],
              ['Hardware', 20],
              ['Swag', 15],
              ['Reimbursments', 18],
              ['Services/Servers', 2],
              ['Surprises+Events', 5],
          ],
          type: 'donut',
      },
      color: {
          pattern: ['#3253A3', "#256EA5", "#1D80A7", "#158FA8", "#06AEAB", "#00BCAC"], // the three color levels for the percentage values.
      }
  });
}

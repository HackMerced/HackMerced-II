
// when launching the sponsor
function launchSponsor(){

  $(".backgroundUnderlay").animate({
    opacity:1
  }, 500, function(){


    runSponsor();
  });
}

// leave the sponsor page
function leaveSponsor(resolve){

  $("body").removeClass("dark");
  $(".backgroundUnderlay").animate({
    opacity:0
  }, 500, function(){

    resolve();
  });
}

// uses d3js to pull csv of pricing
function getPricingPlans(){
  d3.csv('./public/files/sponsor-tiers.csv', function(o){

      for(var i in o){
        var test_case = {
          configuration:{},
          expected:{}
        }

        var count = 1;
        for(var x in o[i]){

          var formatted = x.toString().replace(/ /g, "_").toLowerCase();
          if(count >= 11){
            test_case.expected[formatted] = parseFloat(o[i][x])
          } else {
            test_case.configuration[formatted] = (o[i][x]);
          }
          count++;
        }


        test_container.push(test_case)
      }


  });
}


function runSponsor(){
  // run all the scripts starting here for sponors
  $("body").addClass("dark"); // changes the colorscheme
  generateArcAboutAttendence();
  generateArcAboutBudget();


//  playHelixAd("#sponsor_playHelixAd");

  getPricingPlans();
  runSchoolsAttending();
}

// function controlling where the students from schools are sent from to hackmerced
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

// handler for sentstudents
function runSchoolsAttending(){
  sentStudents();

  setInterval(function(){
    sentStudents();
  }, 5000);
}

// generates a graph
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
              show: false
          },
      min: 0,
      units: ' %',
      width: 60
      },
      color: {
          pattern: ['#0B3566'],
      },
      size: {

      }
  });
}

// refer to internal budget doc when updating
// TODO: sync with our internal doc
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

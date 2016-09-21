
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

// chose a pricing plan
var TierDescriptions = {
  "ruby":"Ruby sponsorships are meant for everyone and come with a wide range of choice and benefits",
  "node.js":"Node.js sponsorships are aimed to smaller companies (with ARR/assets of 80,000 or less) and organizations affiliated with the UC system",
  "java":"Java sponsorships are for organizations that would like to provide food, such as a meal, or snacks to our students. There are a limit to the amount of food sponsors we accept.",
  "c++":"Are you a student/faculty member with a low/no-revenue startup at UC Merced or any other UC campus and want to be represented at HackMerced? This tier is for you."
}

$(document).on("click", ".st-option", function(){
  var $tier = $(this).text().toLowerCase();

  $(".sponsor-TierTable h3 > text").text($tier);
  $(".sponsor-TierDescription").text(TierDescriptions[$tier]);
  $(".st-option").removeClass("selected");
  $(this).addClass("selected");


  $(".sponsor-tier-item").removeClass("selected");
  $(".sponsor-tier-item[data-tier='" + tier + "']").addClass("selected");
});

// uses d3js to pull csv of pricing
function getPricingPlans(){
  d3.csv('./files/sponsor-tiers.csv', function(sponsordocs){
    var PricingPlanHTML = "";

    function tabledata(data){
      var selected = "";
      data = data.toLowerCase();

      if(data === "ruby"){
        selected = "selected";
      }

      return "class='sponsor-tier-item " + selected + "' data-tier='" +  data  + "'"
    }


    // write the header
    PricingPlanHTML += "<tr>";

    // add blank
    PricingPlanHTML += "<th>Sponsor</th>";

    // fill contents
      for(var tiers in sponsordocs){
        if(sponsordocs[tiers] && sponsordocs[tiers]["Sponsor Type"]){
          PricingPlanHTML += "<th " +  tabledata(sponsordocs[tiers]["Sponsor Type"])  + ">";
          PricingPlanHTML += sponsordocs[tiers]["Cost"]
          PricingPlanHTML += "</th>";
        }

      }

    PricingPlanHTML += "</tr>";

    // create rows
    for(var items in sponsordocs[0]){
      if(items !== "Sponsor Type" && items !== "Cost"){
        PricingPlanHTML += "<tr>";

        // init row
        PricingPlanHTML += "<td>";
        PricingPlanHTML += items
        PricingPlanHTML += "</td>";

        for(tiers in sponsordocs){
          if(sponsordocs[tiers] && sponsordocs[tiers]["Sponsor Type"]){

            PricingPlanHTML += "<td " +  tabledata(sponsordocs[tiers]["Sponsor Type"])  + ">";
            PricingPlanHTML += sponsordocs[tiers][items];
            PricingPlanHTML += "</td>";

          }
        }

        PricingPlanHTML += "</tr>";
      }

    }


    $(".sponsor-TierTable table").html(PricingPlanHTML);
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
      var $first_child = $(that).find("img:visible").eq(0);

      var nextIndex = 1;
      if($first_child.index() < ($(that).find("img").length - 1)){
        nextIndex = $first_child.index() + 2;
      }

      var $second_child = $(that).find("img:nth-child(" + nextIndex + ")");

      if($first_child.css("display") === "none"){
        first = $second_child;
        second = $first_child;
      } else {
        first = $first_child;
        second = $second_child;
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
      max:500,
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

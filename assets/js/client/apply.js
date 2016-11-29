

function launchApply(){

  var input = document.getElementById('applyLocationMain');
  var options = {
    types: ['(cities)'],
  };

  autocomplete = new google.maps.places.Autocomplete(input, options);

}

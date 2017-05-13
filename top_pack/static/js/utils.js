
// Can be used to generate a unique a colour for string
var stringToColour = function(str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var colour = '#';
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xFF;
    colour += ('00' + value.toString(16)).substr(-2);
  }
  return colour;
}

var clear_local = function(){
    localStorage.clear();
    alert("All the imported packages were restored");
}

$(document).ajaxSend(function(event, request, settings) {
    $('#loading-indicator').show();
});

$(document).ajaxComplete(function(event, request, settings) {
    $('#loading-indicator').hide();
});

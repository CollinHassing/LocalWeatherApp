$(document).ready(function() {
  $.getJSON("https://freegeoip.io/json/?callback=?", function(data2) {
    // get location user location information
    var lat = data2.latitude;
    var long = data2.longitude;
    var city = data2.city;
    var state = data2.region_code;
    var api = "https://cors-everywhere.herokuapp.com/https://api.darksky.net/forecast/3bf0cb79490854594f1327b277e0251b/" +
     lat +
     "," +
     long;
    $.getJSON(api, function(data1) {
      // get weather stats using darksky api
      var fTemp = Math.round(data1.currently.temperature);
      var currentIcon = data1.currently.icon;
      var summary = data1.currently.summary;
      var lowTemp = Math.round(data1.daily.data[0].apparentTemperatureMin);
      var highTemp = Math.round(data1.daily.data[0].apparentTemperatureMax);
      //Temps in celcius
      var cTemp = Math.round((fTemp - 32) * 5 / 9);
      var cLowTemp = Math.round((lowTemp - 32) * 5 / 9);
      var cHighTemp = Math.round((highTemp - 32) * 5 / 9);
      //Switch between F & C temps
      var tempChange = true;
      $("#temp").click(function(){
        if(tempChange === true){
          $("#temp").html(cTemp + "&degC");
          $("#minMax").html("H " + cHighTemp + " L " + cLowTemp);
          tempChange = false;
        } else {
          $("#temp").html(fTemp + "&degF");
          $("#minMax").html("H " + highTemp + " L " + lowTemp);
          tempChange = true;
        }
      });
      // display data on page
      $("#location").html(city + ", " + state);
      $("#temp").html(fTemp + "&degF");
      $("#summary").html(summary);
      $("#minMax").html("H " + highTemp + " L " + lowTemp);
      $("#icon").toggleClass(weatherIcon(currentIcon));

      // Set the weekday of next 3 days
      let date = new Date();
      let weekday = ["Sun", "Mon", "Tues", "Weds", "Thurs", "Fri", "Sat"];
      for(var i = 1; i < 4; i++){
        $("#day" + i).html(weekday[(date.getDay() + i) % 7]);
        $("#day" + i +"forecast").toggleClass(weatherIcon(data1.daily.data[i].icon));
      }
      // Use switch to determine value of icon and set the image icon appopriatly
      function weatherIcon(a){
        switch(a){
         case "clear-day":
          return "wi wi-day-sunny"
          break;
        case "clear-night":
          return "wi wi-night-clear";
          break;
        case "rain":
          return "wi wi-rain";
          break;
        case "snow":
          return "wi wi-snow";
          break;
        case "sleet":
          return "wi wi-sleet";
          break;
        case "wind":
          return "wi wi-cloudy-windy";
          break;
        case "fog":
          return "wi wi-fog";
          break;
        case "cloudy":
          return "wi wi-cloudy";
          break;
        case "partly-cloudy-day":
          return "wi wi-day-cloudy";
          break;
        case "partly-cloudy-night":
          return "wi wi-night-alt-cloudy";
          break;
         }
      }
      
    }); // End of darksky API
  }); // End of location JSON
}); // End of jQuery Doc

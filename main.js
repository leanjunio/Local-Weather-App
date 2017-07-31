$(document).ready(function() {
  
  // API GET REQUEST - Gets JSON data from API and returns within callback    
  $.getJSON("http://ip-api.com/json", function(location) {
    var cityProvCty = location.city + ', ' + location.region + ', ' + location.country,
      long = location.lon,
      lat = location.lat,
      cc = location.countryCode;
    $("#showThis").text(cityProvCty);
    getWeather(long, lat, cc);
  });
  
  // Generate new API endpoint, make a GET request to the endpoint, return data, and format
  function getWeather(long, lat, cc) {
    
    // Generate new API string based on coordinates taken from above API
    var weatherApi = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&units=imperial' + '&type=accurate' + '&appid=558bd867fdcb621323b289daf829bd4e';
    
    // API GET REQUEST - Make a GET request to the new weatherAPI string that was made and return in callback
    $.get(weatherApi, function(weatherData) {

      temp = weatherData.main.temp.toFixed(0);
      tempC = ((temp - 32) * (5 / 9)).toFixed(0);
      
      // Get the weather
      var city = weatherData.name,
        condition = weatherData.weather[0].description,
        id = weatherData.weather[0].id,
        speed = Number((weatherData.wind.speed * 0.86897624190816).toFixed(1)),
        deg = weatherData.wind.deg,
        countryShort = weatherData.sys.country,
        windDir,
        iconClass,
        bgIndex,
        backgroundId = [299, 499, 599, 699, 799, 800],
        backgroundIcon = ['thunderstorm', 'sprinkle', 'rain', 'snow', 'fog', 'night-clear', 'cloudy', ],
          
        // Use images from another freecodecamper
        backgroundImg = ['http://tylermoeller.github.io/local-weather-app/assets/img/thunderstorm.jpg', 'https://tylermoeller.github.io/local-weather-app/assets/img/sprinkle.jpg', 'https://tylermoeller.github.io/local-weather-app/assets/img/rain.jpg', 'https://tylermoeller.github.io/local-weather-app/assets/img/snow.jpg', 'https://tylermoeller.github.io/local-weather-app/assets/img/fog.jpg', 'https://tylermoeller.github.io/local-weather-app/assets/img/clear.jpg', 'https://tylermoeller.github.io/local-weather-app/assets/img/cloudy.jpg', ];
      backgroundId.push(id);
      bgIndex = backgroundId.sort().indexOf(id);
      $('body').css('background-image', 'url(' + backgroundImg[bgIndex] + ')');
      iconClass = backgroundIcon[bgIndex];
		
      if (deg) {
        var value = Math.floor((deg / 22.5) + 0.5),
          arr = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW', ],
          windDir = arr[(value % 16)];
      } else {
        windDir = 'N';
      }
      var fahrenheit = ['US', 'BS', 'BZ', 'KY', 'PL'];
      if (fahrenheit.indexOf(cc) > -1) {
        $('#temperature').text(temp + '° F');
      } else {
        $('#temperature').text(tempC + '° C');
      }
      
      // CREATE HTML ELEMENTS TO POST ON MAIN VIEW
      $('#wind-speed').html('<i class="wi wi-wind wi-from-' + windDir.toLowerCase() + '"></i><br>' + windDir + ' ' + speed + ' knots');
      $('#condition').html('<i class="wi wi-' + iconClass + '"></i><br>' + condition);
    }).fail(function(err) {
      alert('There was an error retrieving your weather data. \n' + 'Please try again later.');
    });
  } 
  // End of getWeather() function
  
  // UI Action
  $('#convert-button').click(function() {
    if ($('#temperature').text().indexOf('F') > -1) {
      $('#temperature').text(tempC + '° C');
    } else {
      $('#temperature').text(temp + '° F');
    }
})

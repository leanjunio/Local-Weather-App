function getData(url, method) {
  var results
  
  $.ajax({
    url: url,
    method: method,
    dataType: 'JSON',
    async: false,
    success: function(res) {
      results = res
    }
  })

  return results
}


function getCelsius(t) {
  return ((t - 32) * (5 / 9)).toFixed(0)
}

// API Logic for now
var data = {}
var locationURL = 'http://ip-api.com/json'
data.location = getData(locationURL, 'get')
var weatherApi = 'http://api.openweathermap.org/data/2.5/weather?lat=' + data.location.lat + '&lon=' + data.location.lon + '&units=imperial' + '&type=accurate' + '&appid=558bd867fdcb621323b289daf829bd4e';
data.weather = getData(weatherApi, 'get')
data.clouds = data.weather.weather[0]
data.tempF = data.weather.main.temp
data.tempC = getCelsius(data.tempF)
// data.events = getData('http://history.muffinlabs.com/date', 'get')

// display the logic
updateUI()

function updateUI() {
  $('#location').text(String(data.location.city + ', ' + data.location.country + ' '))
  $('#temp').text(String(data.tempC + '˚C'))
  $('#clouds').text(String(data.clouds.description))
}





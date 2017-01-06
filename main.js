$(document).ready(function() {
    // gets the coordinates, city, region, country, and the cuntryCOde
    // sends the coordinates to the getWeather function
    // take the link and download the JSON to location
    $.getJSON("http://ip-api.com/json", function(location) {
            var cityProvCty = location.city + ', ' + location.region + ', ' + location.country,
                long = location.lon,
                lat = location.lat,
                cc = location.countryCode;
            $("#showThis").text(cityProvCty);
            getWeather(long, lat, cc);
        })
        // gets the coordinates and pushes them to the open weather api

    function getWeather(long, lat, cc) {
            // Generates the API string link to show the JSON for the coordinates it was given
            var weatherApi = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&units=imperial' +
                '&type=accurate' + '&appid=558bd867fdcb621323b289daf829bd4e';
            // get the weatherData JSON dadta from weatherApi 
            // weatherAPI is the url the request is made from and it puts the results inside weatherData
            $.get(weatherApi, function(weatherData) {
                // Note: weatherData is the whole screen with the data.
                //get the actual weather data: temperature, etc
                // calculate the temperatures in C and F
                temp = weatherData.main.temp.toFixed(0);
                tempC = ((temp - 32) * (5 / 9)).toFixed(0);
                // get the weather
                // these can be found in the JSON reply of the API
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
                    backgroundImg = ['http://tylermoeller.github.io/local-weather-app/assets/img/thunderstorm.jpg',
                        'https://tylermoeller.github.io/local-weather-app/assets/img/sprinkle.jpg',
                        'https://tylermoeller.github.io/local-weather-app/assets/img/rain.jpg',
                        'https://tylermoeller.github.io/local-weather-app/assets/img/snow.jpg',
                        'https://tylermoeller.github.io/local-weather-app/assets/img/fog.jpg',
                        'https://tylermoeller.github.io/local-weather-app/assets/img/clear.jpg',
                        'https://tylermoeller.github.io/local-weather-app/assets/img/cloudy.jpg',
                    ];
                backgroundId.push(id);
                bgIndex = backgroundId.sort().indexOf(id);
                $('body').css('background-image', 'url(' + backgroundImg[bgIndex] + ')');
                iconClass = backgroundIcon[bgIndex];
                // will add the background later on
                // do the degrees
                if (deg) {
                    var value = Math.floor((deg / 22.5) + 0.5),
                        arr = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW',
                            'NNW',
                        ],
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
                //write final weather conditions and wind information to the page
                $('#wind-speed').html('<i class="wi wi-wind wi-from-' + windDir.toLowerCase() + '"></i><br>' + windDir +
                    ' ' + speed + ' knots');
                $('#condition').html('<i class="wi wi-' + iconClass + '"></i><br>' + condition);
            }).fail(function(err) {
                alert('There was an error retrieving your weather data. \n' + 'Please try again later.');
            }); //getweatherapi
        } //getWeather
    $('#convert-button').click(function() {
        if ($('#temperature').text().indexOf('F') > -1) {
            $('#temperature').text(tempC + '° C');
        } else {
            $('#temperature').text(temp + '° F');
        }
    }); //document ready
})
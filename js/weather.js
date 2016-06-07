function initWeather(city, degree) {
    $.simpleWeather({
        location: city,
        woeid: '',
        unit: degree,
        success: function (weather) {
            var html = '';
            html += '<div class="wrapper"><section>';

            html += '<h1 id="city">' + weather.city + '</h1>'
                + '<div class="temperature"><i class="wi wi-yahoo-' + weather.code + '"></i>'
                + '<h2 class="white">'
                + weather.temp
                + '<span class="degree-symbol">°</span>' + weather.units.temp + '</h2></div><br/>';

            html += '<span class="fontawesome-umbrella left white">    ' + weather.humidity + '%    </span>'
                + '<span class="fontawesome-leaf center white">    ' + weather.wind.direction + '    </span>'
                + '<span class="fontawesome-tint right white">    ' + weather.currently + '    </span>'

            html += '</section></div>';
            $("#weather").html(html);
        },
        error: function (error) {
            $("#weather").html('<p>' + error + '</p>');
        }
    })
}



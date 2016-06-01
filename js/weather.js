function initWeather(city,degree) {
        $.simpleWeather({
            location: city,
            woeid: '',
            unit: degree,
            success: function(weather) {
                html = '<div id="title">'+weather.title+"</div>"+"<div id='degree'>"+weather.temp+'</div>'+
                '<div>'+weather.units.temp+'</div>';

                $("#weather").html(html);
            },
            error: function(error) {
                $("#weather").html('<p>'+error+'</p>');
            }
    });
}
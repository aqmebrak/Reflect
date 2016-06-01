$(document).ready(function() {
    initWeather();
});


function initWeather() {
    $.simpleWeather({
        location: "Valbonne",
        woeid: '',
        unit: 'c',
        success: function(weather) {
            var html = '';
            html += '<p>'+weather.title+"</p>"+"<p>"+weather.temp+'</p>';

            $("#weather").html(html);
        },
        error: function(error) {
            $("#weather").html('<p>'+error+'</p>');
        }
    });
}
$(document).ready(function() {


    $("#submit").click(function() {
        localStorage.setItem("reload",true);
    })
});

function updateWeather(id) {
    $("input[name='temp-config']").change(function() {
        var result = $(this).val();
        $.getJSON("1.json", function(json) {
            var data = json;
            if (result == "celsius") data.weather.degree.push('c');
            else data.weather.degree.push('f');
        });
    });
}
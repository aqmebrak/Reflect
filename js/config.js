$(document).ready(function() {
    /*console.log(unit);
    $("input[name='temp-config']").change(function() {
        var result = $(this).val();
        if (result == "celsius") unit = 'c';
        else unit = 'f';
    });*/

    $("#submit").click(function() {
        localStorage.setItem("reload",true);
    })
});
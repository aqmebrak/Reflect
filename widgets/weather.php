<div id="weather" class="draggable grabbable widget hvr-glow"></div>

<?php
$jsonString = file_get_contents('database/' . $_SESSION['uid'] . '.json');
$data = json_decode($jsonString, true);

$city = $data['weather']['location'];
$degree = $data['weather']['degree'];
?>
<script>
    var city = "<?php echo $city; ?>";
    var degree = "<?php echo $degree; ?>";
    initWeather(city, degree);

    var $draggable = $('.draggable').draggabilly({
        // options...
    });

    //first set the cookie when the widget is selected
    //then ask to a php to change the position of the widget
    var weather = "weather";
    $("#" + weather)
        .mousedown(function () {
            document.cookie = "currentWidget=" + weather;
        })
        .mouseup(function () {
            document.cookie = "currentWidget=";
            setTimeout(function(){
                var left = $("#" + weather).css("left");
                var top = $("#" + weather).css("top");
                $.ajax({
                    url: 'widgetsPosition/setWidgetPosition.php',
                    data: {currentWidget: weather, left: left, top: top}
                });
            }, 100);

        });
</script>


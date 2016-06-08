<div id="weather" class="draggable grabbable widget"></div>

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

    var widget = "weather";
    //set the cookie
    $("#"+widget).mousedown(function () {
        document.cookie = "currentWidget="+widget;
    });
    //ask to the php to set new left & top values
    //var left = $("#"+widget)).css("left");
    //var top = $("#"+widget)).css("top");
</script>


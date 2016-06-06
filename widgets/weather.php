<div id="weather" class="draggable grabbable widget" style="left:300px;"></div>

<?php
$jsonString = file_get_contents('database/' . $_SESSION['uid'] . '.json');
$data = json_decode($jsonString, true);

$city = $data['weather']['location'];
$degree = $data['weather']['degree'];

$timezone = $data['clock']['timezone'];
echo $_SESSION['currentWidget'];
?>
<script>
    window.onload = function () {
        var city = "<?php echo $city; ?>";
        var degree = "<?php echo $degree; ?>";
        initWeather(city, degree);
        $("#weather").mousedown(function () {
            <?php $_SESSION['currentWidget']='weather' ?>;
        });

        var timezone = "<?php echo $timezone; ?>";
        initClock(timezone);
        $("#clock").mousedown(function () {
            <?php $_SESSION['currentWidget']='clock' ?>;
        });


        var $draggable = $('.draggable').draggabilly({
            // options...
        });

    }
</script>


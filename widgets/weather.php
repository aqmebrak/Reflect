<div id="weather" class="draggable grabbable widget" style="left:300px;"></div>

<?php
    $jsonString = file_get_contents('database/'.$_SESSION['uid'].'.json');
    $data = json_decode($jsonString, true);

    $city = $data['weather']['location'];
    $degree = $data['weather']['degree'];

    $timezone = $data['clock']['timezone'];
?>

<script>
    window.onload = function() {
        var city = "<?php echo $city; ?>";
        var degree = "<?php echo $degree; ?>";
        initWeather(city,degree);

        var timezone = "<?php echo $timezone; ?>";
        initTime(timezone);
        var $draggable = $('.draggable').draggabilly({
            // options...
        })
    }
</script>



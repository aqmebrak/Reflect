<div id="weather" class="draggable"></div>

<?php
    $jsonString = file_get_contents('database/1.json');
    $data = json_decode($jsonString, true);

    $city = $data['weather']['location'];
    $degree = $data['weather']['degree'];
?>

<script>
    window.onload = function() {
        var city = "<?php echo $city; ?>";
        var degree = "<?php echo $degree; ?>";
        initWeather(city,degree);
        var $draggable = $('.draggable').draggabilly({
            // options...
        })
    }
</script>



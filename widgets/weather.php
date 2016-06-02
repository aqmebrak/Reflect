<<<<<<< HEAD
<div id="weather" class="draggable grabbable widget"></div>
=======
<div id="weather" class="draggable"></div>
>>>>>>> 48ac1d0bef9fccad536db9b6f782c79eddf04c77

<?php
    $jsonString = file_get_contents('database/'.$_POST['uid'].'.json');
    $data = json_decode($jsonString, true);

    $city = $data['weather']['location'];
    $degree = $data['weather']['degree'];
?>

<script>
    window.onload = function() {
        var city = "<?php echo $city; ?>";
        var degree = "<?php echo $degree; ?>";
        initWeather(city,degree);
        initTime();
        var $draggable = $('.draggable').draggabilly({
            // options...
        })
    }
</script>



<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Weather layer</title>
    <script src="js/jquery-2.2.4.min.js"></script>
    <script src="js/jquery.simpleWeather.min.js"></script>
    <script src="js/weather.js"></script>
    <script src="js/index.js"></script>
    <script>
        window.setInterval(function(){
            if(localStorage.getItem("reload")) {
                location.reload();
                localStorage.removeItem("reload");
            }
        }, 5000);
    </script>
</head>
<body>

<div id="weather"></div>


<?php
    echo "YCDGFGUILHOMJP";
?>

</body>
</html>
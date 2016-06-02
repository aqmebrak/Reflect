<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Mirror</title>
    <script src="https://code.jquery.com/jquery-2.2.4.min.js"
            integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery.simpleWeather/3.1.0/jquery.simpleWeather.min.js"></script>
    <script src="js/weather.js"></script>
    <link href="css/mirror.css" rel="stylesheet">
    <script src="lib/bootstrap.min.js"></script>
    <script src="js/draggable.min.js"></script>
    <link rel="stylesheet" type="text/css" href="css/meteo.css">

    <script>
        window.setInterval(function () {
            if (localStorage.getItem("reload")) {
                location.reload();
                localStorage.removeItem("reload");
            }
        }, 5000);
    </script>
</head>
<body>
<?php
if (isset($_POST['uid']))
    echo $_POST['uid'];
?>
<?php include_once('./widgets/weather.php'); ?>
</body>


</html>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Mirror</title>
    <script src="https://code.jquery.com/jquery-2.2.4.min.js"
            integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery.simpleWeather/3.1.0/jquery.simpleWeather.min.js"></script>
    <script src="js/weather.js"></script>
    <script src="js/clock.js"></script>
    <link href="css/mirror.css" rel="stylesheet">
    <script src="lib/bootstrap.min.js"></script>
    <script src="js/draggable.min.js"></script>
    <script src="lib/jquery.rotate.js"></script>
    <script src="lib/jClocksGMT.js"></script>
    <link rel="stylesheet" href="css/jClocksGMT.css">
    <link rel="stylesheet" type="text/css" href="css/weather.css">

    <script>
        window.setInterval(function () {
            if (localStorage.getItem("reload")) {
                location.reload();
                localStorage.removeItem("reload");
                var $draggable = $('.draggable').draggabilly({
                    // options...
                }
            }
        }, 5000);
    </script>
</head>
<body>

<?php include_once('./widgets/clock.php'); ?>

<?php include_once('./widgets/weather.php'); ?>


<div id="center">
</div>
<div id="rightPanel">
	<ul>
		<li><a >Maquillage</a></li>
		<li><a >Lorem</a></li>
		<li><a >Ipsum</a></li>
		<li><a >Sin</a></li>
	</ul>
</div>

</body>


</html>
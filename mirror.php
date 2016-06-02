<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Mirror</title>
    <script src="https://code.jquery.com/jquery-2.2.4.min.js"
            integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery.simpleWeather/3.1.0/jquery.simpleWeather.min.js"></script>
    <script src="js/weather.js"></script>
    <script src="js/time.js"></script>
    <link href="css/mirror.css" rel="stylesheet">
    <script src="lib/bootstrap.min.js"></script>
    <script src="js/draggable.min.js"></script>
    <link rel="stylesheet" type="text/css" href="css/meteo.css">

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

<?php include_once('./widgets/time.php'); ?>
<?php include_once('./widgets/weather.php'); ?>


<div id="weather"></div>

<div class="grabbable" > Grab me !</div>

<div id="center">
</div>
<div id="rightPanel">
	<ul>
		<li><div id="maquillageIcon"><a ></a><div></li>
		<li><a >Lorem</a></li>
		<li><a >Ipsum</a></li>
		<li><a >Sin</a></li>
	</ul>
</div>

</body>


</html>
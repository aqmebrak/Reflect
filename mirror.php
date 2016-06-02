<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Mirror</title>
    <script src="lib/jquery-2.2.4.min.js"></script>
    <script src="lib/jquery.simpleWeather.min.js"></script>
    <script src="js/weather.js"></script>

	<link href="css/mirror.css" rel="stylesheet">
    <script src="lib/bootstrap.min.js"></script>
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
<?php
if (isset($_POST['uid']))
	echo $_POST['uid'];
?>
<div id="weather"></div>

<div class="grabbable" > Grab me !</div>

<div id="center">
</div>
<div id="rightPanel">
	<ul>
		<li><a >Weather</a></li>
		<li><a >Clock</a></li>
		<li><a >Contact</a></li>
		<li><a >About</a></li>
	</ul>
</div>
</body>


</html>
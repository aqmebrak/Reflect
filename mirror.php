<?php
session_start();
if (!isset($_SESSION['uid']))
    $_SESSION['uid'] = $_POST['uid'];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Mirror</title>
    <!-- SCRIPTS  LIB-  - - -- - - -- - - - --  -- - - - -->
    <script src="lib/jquery-2.2.4.min.js"></script>
    <script src="lib/jquery.rotate.js"></script>
    <script src="lib/jquery.simpleWeather.min.js"></script>
    <script src="lib/bootstrap.min.js"></script>
    <script src="lib/jClocksGMT.js"></script>
    <script src="lib/draggable.min.js"></script>
    <script src="lib/VideoClient.js?"></script>
    <script src="lib/jquery-ui.js"></script>
    <script src="lib/jquery.countdown360.js"></script>
    <script src="lib/sly.min.js"></script>
    <!-- SCRIPTS  JS-  - - -- - - -- - - - --  -- - - - -->
    <script src="js/clock.js"></script>
    <script src="js/video.js"></script>
    <script src="js/video_search.js"></script>
    <script src="js/weather.js"></script>
    <script src="js/cursor.js"></script>
    <script src="js/humanize.js"></script>
    <script src="js/web-sockets.js"></script>

    <!-- CSS - - - - - - - - - -- - - - - - - - - - - - -->
    <link href="css/mirror.css" rel="stylesheet">
    <link href="css/traffic.css" rel="stylesheet">
    <link rel="stylesheet" href="css/jClocksGMT.css">
    <link rel="stylesheet" href="css/weather.css">
    <link rel="stylesheet" href="css/video.css">
    <link href="css/weather-icons.min.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="css/animate.css">
    <link rel="stylesheet" href="css/weather-icons-wind.min.css">
    <link rel="stylesheet" href="css/font-awesome.min.css">
    <link rel="stylesheet" href="css/hover.css">
    <!-- - - - - - - - - - - - - - - - - - - - - - - - - -->

</head>
<body>
<audio hidden>
    <source src="http://www.w3schools.com/html/horse.ogg" type="audio/ogg">
    <source src="http://www.w3schools.com/html/horse.mp3" type="audio/mpeg">
    Your browser does not support the audio element.
</audio>
<?php include_once('./widgets/loadingScreen.php'); ?>

<?php include_once('./widgets/rightPanel.php'); ?>
<?php include_once('./widgets/leftPanel.php'); ?>

<?php include_once('./widgets/clock.php'); ?>
<?php include_once('./widgets/traffic.php'); ?>
<?php include_once('./widgets/weather.php'); ?>
<?php include_once('./widgets/news.php'); ?>
<?php include_once('./widgets/video.php'); ?>
<?php include_once('./widgets/countdown.php'); ?>
<?php include_once('./widgets/popup.php'); ?>

<div id="container">
    <video autoplay="true" id="videoElement"></video>
</div>

<!-- VIDEOS LIST PART -->
<div id="forcecentered" class="frame grabbable" style="display: none">
    <ul class="clearfix"></ul>
</div>
<div id="exit" style="display: none"></div>


<div id="bottomPanel">
</div>

<script src="js/bottomPanel.js"></script>
<script src="js/loadWidgets.js"></script>
<script src="js/getWebcam.js"></script>

</body>
</html>
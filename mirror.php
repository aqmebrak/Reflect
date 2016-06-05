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

    <!-- SCRIPTS -  - - -- - - -- - - - --  -- - - - -->
    <script src="lib/jquery-2.2.4.min.js"></script>
    <script src="lib/jquery.rotate.js"></script>
    <script src="lib/jquery.simpleWeather.min.js"></script>
    <script src="js/weather.js"></script>
    <script src="lib/Kinect-1.8.0.js"></script>
    <script src="js/KinectSensor.js"></script>
    <script src="lib/bootstrap.min.js"></script>
    <script src="js/clock.js"></script>
    <script src="lib/jClocksGMT.js"></script>
    <script src="lib/draggable.min.js"></script>
    <script src="js/video.js"></script>
    <!-- - - - - - - - - - - - - - - - - - - - - - - -->
    <!--<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCPjTonWpMnclazoTL22ibJOdAPyb4CmaA"
            type="text/javascript"></script>-->
    <!-- CSS - - - - - - - - - -- - - - - - - - - - - - -->
    <link href="css/mirror.css" rel="stylesheet">
    <link rel="stylesheet" href="css/jClocksGMT.css">
    <link rel="stylesheet" type="text/css" href="css/weather.css">

    <!-- - - - - - - - - - - - - - - - - - - - - - - - - -->

</head>
<body>

<?php include_once('./widgets/clock.php'); ?>

<?php include_once('./widgets/weather.php'); ?>
<body>
<div id="container">
    <video autoplay="true" id="videoElement"></video>
</div>

<div id="video" class="widget grabbable draggable">
    <span style="color:white; font-size: 2.2em;"><a onclick="closeFrame()">&#10006;</a></span>
    <br/>
    <div id="player"></div>
</div>

<div id="rightPanel">
    <ul>
        <li onclick="launchVideo()">
            <div id="maquillageIcon" class="widgetIcon">
                <div>
        </li>
        <li><a>Lorem</a></li>
        <a href="config/weather-config.php">
            <li>
                <div id="ecrouIcon" class="widgetIcon">
                    <div>
            </li>
        </a>
        <a href="index.php">
            <li>
                <div id="exitIcon" class="widgetIcon">
                    <div>
            </li>
        </a>
    </ul>
</div>

<script>
    var video = document.querySelector("#videoElement");

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

    if (navigator.getUserMedia) {
        navigator.getUserMedia({video: true}, handleVideo, videoError);
    }

    function handleVideo(stream) {
        video.src = window.URL.createObjectURL(stream);
    }

    function videoError(e) {
        // do something
    }
</script>

</body>
</html>
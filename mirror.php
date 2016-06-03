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
    <script src="https://code.jquery.com/jquery-2.2.4.min.js"
            integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
    <script src="lib/jquery.rotate.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery.simpleWeather/3.1.0/jquery.simpleWeather.min.js"></script>
    <script src="js/weather.js"></script>
    <script src="js/clock.js"></script>
    <link href="css/mirror.css" rel="stylesheet">
    <script src="lib/bootstrap.min.js"></script>

    <script src="lib/jClocksGMT.js"></script>
    <!--<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCPjTonWpMnclazoTL22ibJOdAPyb4CmaA"
            type="text/javascript"></script>-->
    <link rel="stylesheet" href="css/jClocksGMT.css">
    <link rel="stylesheet" type="text/css" href="css/weather.css">
    <script src="lib/draggable.min.js"></script>
    <script src="js/video.js"></script>

    <script>
        window.setInterval(function () {
            if (localStorage.getItem("reload")) {
                location.reload();
                localStorage.removeItem("reload");
                var $draggable = $('.draggable').draggabilly({
                    // options...
                })
            }
        }, 5000);
    </script>
    <style>
        video#videoElement {
            position: fixed;
            top: 50%;
            left: 50%;
            min-width: 100%;
            min-height: 100%;
            width: auto;
            height: auto;
            z-index: -100;
            -ms-transform: translateX(-50%) translateY(-50%);
            -moz-transform: translateX(-50%) translateY(-50%);
            -webkit-transform: translateX(-50%) translateY(-50%);
            transform: translateX(-50%) translateY(-50%);
            background-size: cover;
        }
    </style>
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
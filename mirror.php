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
    <script src="js/clock.js"></script>
    <script src="js/video.js"></script>
    <script src="js/video_search.js"></script>
    <script src="js/weather.js"></script>
    <script src="js/mirror.js"></script>
    <!-- SCRIPTS  LIB-  - - -- - - -- - - - --  -- - - - -->
    <script src="lib/jquery-2.2.4.min.js"></script>
    <script src="lib/jquery.rotate.js"></script>
    <script src="lib/jquery.simpleWeather.min.js"></script>
<<<<<<< HEAD
=======
    <script src="js/weather.js"></script>
    <script src="lib/bootstrap.min.js"></script>
    <script src="js/clock.js"></script>
>>>>>>> dff2a029c791be101841eeaaed933b96a34ab35a
    <script src="lib/jClocksGMT.js"></script>
    <script src="lib/draggable.min.js"></script>
    <script src="lib/VideoClient.js?" type="text/javascript"></script>
    <script src="lib/bootstrap.min.js"></script>

    <!--<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCPjTonWpMnclazoTL22ibJOdAPyb4CmaA"
            type="text/javascript"></script>-->
    <!-- CSS - - - - - - - - - -- - - - - - - - - - - - -->
    <link href="css/mirror.css" rel="stylesheet">
    <link href="css/traffic.css" rel="stylesheet">
    <link rel="stylesheet" href="css/jClocksGMT.css">
    <link rel="stylesheet" type="text/css" href="css/weather.css">
	<link rel="stylesheet" type="text/css" href="css/video.css">

    <!-- - - - - - - - - - - - - - - - - - - - - - - - - -->

</head>
<body>

<?php include_once('./widgets/clock.php'); ?>
<?php include_once('./widgets/rightPanel.php'); ?>
<?php include_once('./widgets/traffic.php'); ?>
<?php include_once('./widgets/leftPanel.php'); ?>
<?php include_once('./widgets/weather.php'); ?>
<?php include_once ('./widgets/news.php'); ?>

<div id="container">
    <video autoplay="true" id="videoElement"></video>
</div>

<div id="video" class="widget grabbable draggable">
    <span style="color:white; font-size: 2.2em;"><a onclick="closeFrame()">&#10006;</a></span>
    <br/>
    <div id="player"></div>
</div>

<div id="VideosList"></div>

<div id="bottomPanel">
</div>

<script src="js/bottomPanel.js"></script>
<script src="js/getVideo.js"></script>

</body>
</html>
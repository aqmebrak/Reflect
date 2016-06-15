<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Configuration</title>
    <script src="../lib/jquery-2.2.4.min.js"></script>
    <script src="../lib/bootstrap.min.js"></script>
    <script src="../js/config.js"></script>
    <script src="../js/cursor.js"></script>
    <script src="../lib/sly.min.js"></script>
    <script src="../lib/jquery-ui.js"></script>
    <link href="../css/bootstrap.min.css" rel="stylesheet">
    <link href="../css/config.css" rel="stylesheet">
    <link href="../css/hover.css" rel="stylesheet">
    <link href="../css/animate.css" rel="stylesheet">
    <link href='https://fonts.googleapis.com/css?family=Kanit:100' rel='stylesheet' type='text/css'>

</head>
<body>

<!--<ul class="panel-left">
    <li class="panel-left-item cloud hvr-glow"><a href="weather-config.php"><span>Configure the weather</span></a></li>
    <li class="panel-left-item time hvr-glow"><a href="clock-config.php"><span>Configure the time</span></a></li>
    <li class="panel-left-item rss hvr-glow"><a href="news-config.php"><span>Configure the newsfeed</span></a></li>
    <li class="panel-left-item car hvr-glow"><a href="traffic-config.php"><span>Configure the traffic</span></a></li>
    <li class="panel-left-item video hvr-glow"><a href="video-config.php"><span>Configure the videos</span></a></li>
    <li class="panel-left-item exit hvr-glow"><a href="../mirror.php"><span>Exit</span></a></li>
</ul>-->

<div id="config-nav" class="frame grabbable">
    <ul class="clearfix">
        <a href="weather-config.php"><li class="panel-left-item cloud hvr-glow"><span>Configure the weather</span></li></a>
        <a href="clock-config.php"><li class="panel-left-item time hvr-glow"><span>Configure the time</span></li></a>
        <a href="news-config.php"><li class="panel-left-item rss hvr-glow"><span>Configure the newsfeed</span></li></a>
        <a href="traffic-config.php"><li class="panel-left-item car hvr-glow"><span>Configure the traffic</span></li></a>
        <a href="video-config.php"><li class="panel-left-item video hvr-glow"><span>Configure the videos</span></li></a>
        <a href="../mirror.php"><li class="panel-left-item exit hvr-glow"><span>Exit</span></li></a>
    </ul>
</div>

<div id="info" class="fadeIn">Grab and scroll</div>

<script>
    jQuery(function($) {
        'use strict';
        (function() {
            var $frame = $('#config-nav');

            // Call Sly on frame
            $frame.sly({
                horizontal: 1,
                itemNav: 'forceCentered',
                smart: 0,
                activateMiddle: 0,
                activateOn: 'mouseenter',
                mouseDragging: 1,
                touchDragging: 1,
                releaseSwing: 1,
                startAt: 0,
                scrollBy: 1,
                speed: 300,
                elasticBounds: 1,
                easing: 'easeOutExpo',
                dragHandle: 1,
                dynamicHandle: 1,
                clickBar: 1
            });
        }());
    });

    $('.panel-left-item').mouseenter(function() {
        var span = $(this).find("span").text();
        $('#info').text(span);
        $("#info").fadeIn("slow");
    });

    $(".panel-left-item").mouseleave(function() {
        $("#info").text("Grab and scroll");
    });
</script>


</body>
</html>
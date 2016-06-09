<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Configuration</title>
    <script src="../lib/jquery-2.2.4.min.js"></script>
    <script src="../lib/bootstrap.min.js"></script>
    <script src="../js/config.js"></script>
    <script src="../js/cursor.js"></script>
    <link href="../css/bootstrap.min.css" rel="stylesheet">
    <link href="../css/config.css" rel="stylesheet">
    <link href="../css/hover.css" rel="stylesheet">
    <link href="../css/animate.css" rel="stylesheet">
    <link href='https://fonts.googleapis.com/css?family=Kanit:100' rel='stylesheet' type='text/css'>

</head>
<body>

<ul class="panel-left">
    <li class="panel-left-item cloud hvr-glow"><a href="weather-config.php"><span>Configure the weather</span></a></li>
    <li class="panel-left-item time hvr-glow"><a href="clock-config.php"><span>Configure the time</span></a></li>
    <li class="panel-left-item rss hvr-glow"><a href="news-config.php"><span>Configure the newsfeed</span></a></li>
    <li class="panel-left-item car hvr-glow"><a href="traffic-config.php"><span>Configure the traffic</span></a></li>
    <li class="panel-left-item exit hvr-glow"><a href="../mirror.php"><span>Exit</span></a></li>
</ul>

<div id="info" class="fadeIn" style="display: none"></div>

<script>
    $('.panel-left-item').mouseenter(function() {
        var span = $(this).find("span").text();
        $('#info').text(span);
        $("#info").fadeIn("slow");
    });

    $(".panel-left-item").mouseleave(function() {
        $("#info").empty();
        $("#info").css("display","none");
    });
</script>


</body>
</html>
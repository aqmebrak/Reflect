<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Configuration</title>
    <script src="../lib/jquery-2.2.4.min.js"></script>
    <script src="../lib/bootstrap.min.js"></script>
    <link href="../css/bootstrap.min.css" rel="stylesheet">
    <link href="../css/config.css" rel="stylesheet">
    <link href="../css/hover.css" rel="stylesheet">
</head>
<body>

<div id="navbar">
    <ul>
        <li><a href="weather-config.php">Weather</a></li>
        <li><a href="clock-config.php">Clock</a></li>
        <li class="active"><a href="news-config.php">News</a></li>
        <li><a href="../mirror.php">Mirror</a></li>
    </ul>
</div>

<div id="content">

    <div id="news"></div>


</div>
</body>

<!-- Script which will build the elements according to the newsfeed.json -->
<script>
    $.getJSON("../database/newsfeed.json", function(json) {
        var s = "";
        $.each(json.providers, function (key, val) {
            s += "<h1>"+val.provider+"</h1>";
            s += "<div class='flex-container'>";
            s += "<form role='form' method='post' action='news-config.php'>";
            $.each(val.url, function(key) {
                s += "<input class='flex-item hvr-glow' type='submit' value='"+key+"' name='newsfeed' />";
            });
            s += "</form>";
            s += "</div>";
        });
        $('#news').html(s);
    });
</script>

<!-- script for putting the new url in the user's config file -->
<?php

// Loading of the newsfeed file
$jsonString_newsfeed = file_get_contents('../database/newsfeed.json');
$data_newsfeed = json_decode($jsonString_newsfeed, true);

// Loading of the user's config file
$jsonString_userFile = file_get_contents('../database/'.$_SESSION['uid'].'.json');
$data_userFile = json_decode($jsonString_userFile, true);

/** We loop over the datas from newsfeed.json. If the key of the url
 * match the one we clicked in the form, we put its value inside the
user's config file*/
if (!EMPTY($_POST['newsfeed'])) {
    foreach ($data_newsfeed['providers'] as $providers) {
        foreach ($providers['url'] as $key => $value) {
            if ($key == $_POST['newsfeed']) {
                $data_userFile['news']['url'] = $value;
            }
        }
    }
}


$newJsonString = json_encode($data_userFile);
file_put_contents('../database/'.$_SESSION['uid'].'.json', $newJsonString);
?>

</html>
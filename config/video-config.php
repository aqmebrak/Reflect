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
    <script src="../js/cursor.js"></script>
    <link href="../css/bootstrap.min.css" rel="stylesheet">
    <link href="../css/config.css" rel="stylesheet">
    <link href="../css/hover.css" rel="stylesheet">
</head>
<body>

<div id="content">

    <form role="form" method="post" action="video-config.php">
        <input name="tag" placeholder="Enter your YouTube tag" type="text">
        <button type="submit" class="btn btn-default">Save</button>
    </form>

</div>

<div class="nav">
    <a class="back hvr-glow" href="config.php"></a>
    <a class="exit hvr-glow" href="../mirror.php"></a>
</div>

<style>
    form {
        text-align: center;
    }
</style>

<!-- script for putting the new tag in the user's config file -->
<?php

// Loading of the user's config file
$jsonString_userFile = file_get_contents('../database/'.$_SESSION['uid'].'.json');
$data_userFile = json_decode($jsonString_userFile, true);

if (!EMPTY($_POST['tag']))
    $data_userFile['video']['tag'] = $_POST['tag'];

$newJsonString = json_encode($data_userFile);
file_put_contents('../database/'.$_SESSION['uid'].'.json', $newJsonString);
?>

</body>



</html>
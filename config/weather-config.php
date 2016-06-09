<?php
session_start();
if (isset($_POST['uid']))
    $_SESSION['uid'] = $_POST['uid'];
?>
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
</head>
<body>

<div id="content">
    <?php
    $jsonString = file_get_contents('../database/' . $_SESSION['uid'] . '.json');
    $data = json_decode($jsonString, true);
    $degree = $data['weather']['degree'];
    $cIsChecked = "";
    $fIsChecked = "";
    if ($degree == 'c')
        $cIsChecked = "checked";
    else
        $fIsChecked = "checked";

    $city=$data['weather']['location'];
    ?>

    <form class="weather" role="form" method="post" action="validateWeatherConfig.php">
        <div class="weather-switch">
            <input type="radio" name="temp-config" value="c" id="temp_c"
                   class="weather-switch-input" <?php echo $cIsChecked ?> >
            <label for="temp_c" class="weather-switch-label">Celsius</label>
            <input type="radio" name="temp-config" value="f" id="temp_f"
                   class="weather-switch-input" <?php echo $fIsChecked ?> >
            <label for="temp_f" class="weather-switch-label">Fahrenheit</label>
        </div>
        <input type="text" name="city" class="weather-input" placeholder="<?php echo $city ?>">
        <input type="submit" value="Save" class="weather-button">

    </form>

</div>

<div class="nav">
    <a class="back hvr-glow" href="config.php"></a>
    <a class="exit hvr-glow" href="../mirror.php"></a>
</div>

</body>
</html>
<?php
session_start();
if(isset($_POST['uid']))
    $_SESSION['uid']=$_POST['uid'];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Configuration</title>
    <script src="../lib/jquery-2.2.4.min.js"></script>
    <script src="../lib/bootstrap.min.js"></script>
    <script src="../js/config.js"></script>
    <link href="../css/bootstrap.min.css" rel="stylesheet">
    <link href="../css/config.css" rel="stylesheet">
</head>
<body>

<ul>
    <li class="active"><a href="weather-config.php">Weather</a></li>
    <li><a href="clock-config.php">Clock</a></li>
    <li><a href="contact.asp">Contact</a></li>
    <li><a href="../mirror.php">Mirror</a></li>
</ul>

<div id="content">
    <div id="weather">

        <form role="form" method="post" action="weather-config.php">
            <!--<label><?php echo $_SESSION['uid'] ?></label>-->
            <div class="radio-inline">
                <label>Celsius</label><input value="c" type="radio" name="temp-config" class="radio">
            </div><br/><br/><br/><br/><br/><br/><br/>
            <div class="radio-inline">
                <label>Fahrenheit</label><input value="f" type="radio" name="temp-config" class="radio">
            </div>
            <br/><br/><br/><br/><br/><br/><br/>
            <label>
                Enter your city
                <input type="text" name="city">
            </label>
            <button type="submit" class="btn btn-primary btn-lg">Save</button>

        </form>

        <?php
        $jsonString = file_get_contents('../database/'.$_SESSION['uid'].'.json');
        $data = json_decode($jsonString, true);

        if (!EMPTY($_POST['temp-config'])) {
            $data['weather']['degree'] = $_POST['temp-config'];
        }
        if (!EMPTY($_POST['city'])) {
            $data['weather']['location'] = $_POST['city'];
        }
        $newJsonString = json_encode($data);
        file_put_contents('../database/'.$_SESSION['uid'].'.json', $newJsonString);
        ?>
    </div>
</div>

</body>
</html>
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
    <script src="../js/config.js"></script>
    <link href="../css/bootstrap.min.css" rel="stylesheet">
    <link href="../css/config.css" rel="stylesheet">
</head>
<body>

<ul>
    <li><a href="weather-config.php">Weather</a></li>
    <li class="active"><a href="clock-config.php">Clock</a></li>
    <li><a href="contact.asp">Contact</a></li>
    <li><a href="about.asp">About</a></li>
</ul>

<div id="content">
    <div id="clock">

        <form role="form" method="post" action="clock-config.php">
            <?php echo $_SESSION['uid'] ?>
            <label>Timezone</label>
            <select class="form-control">
                <option>-4</option>
                <option>-3</option>
                <option>-1</option>
                <option>0</option>
                <option>+1</option>
                <option>+2</option>
                <option>+3</option>
                <option>+4</option>
            </select>
            <div class="radio-inline">
                <label><input value="f" type="radio" name="temp-config">Fahrenheit</label>
            </div>

            <button type="submit" class="btn btn-primary">Save</button>

        </form>

        <?php
        $jsonString = file_get_contents('../database/1.json');
        $data = json_decode($jsonString, true);

        if (!EMPTY($_POST['temp-config'])) {
            $data['weather']['degree'] = $_POST['temp-config'];
        }
        if (!EMPTY($_POST['city'])) {
            $data['weather']['location'] = $_POST['city'];
        }
        $newJsonString = json_encode($data);
        file_put_contents('../database/1.json', $newJsonString);
        ?>
    </div>
</div>

</body>
</html>
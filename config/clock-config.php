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
    <li><a href="news-config.php">News</a></li>
    <li><a href="traffic-config.php">Traffic</a></li>
    <li><a href="../mirror.php">Mirror</a></li>
</ul>

<div id="content">
    <div id="clock">

        <form role="form" method="post" action="clock-config.php">
            <label>Timezone</label>
            <select class="form-control" name="timezone">
                <option>-4</option>
                <option>-3</option>
                <option>-1</option>
                <option>0</option>
                <option>+1</option>
                <option>+2</option>
                <option>+3</option>
                <option>+4</option>
            </select>

            <button type="submit" class="btn btn-primary">Save</button>

        </form>

        <?php
        $jsonString = file_get_contents('../database/'.$_SESSION['uid'].'.json');
        $data = json_decode($jsonString, true);

        if (!EMPTY($_POST['timezone'])) {
            $data['clock']['timezone'] = $_POST['timezone'];
        }
        $newJsonString = json_encode($data);
        file_put_contents('../database/'.$_SESSION['uid'].'.json', $newJsonString);
        ?>
    </div>
</div>

</body>
</html>
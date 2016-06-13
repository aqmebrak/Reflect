<?php
session_start();
if (!isset($_SESSION['uid']))
    $_SESSION['uid'] = $_POST['uid'];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Reflect</title>
    <script src="../lib/jquery-2.2.4.min.js"></script>
    <script src="../lib/bootstrap.min.js"></script>
    <script src="../js/cursor.js"></script>
    <script src="../lib/patternLock.js"></script>

    <link href="../css/bootstrap.min.css" rel="stylesheet">
    <link href="../css/patternLock.css" rel="stylesheet" type="text/css">

</head>
<body>

<img
    class="logo"
    src="../images/logo.svg"/>

<div id="patternLock">
    <div id="patternContainer"></div>
</div>

<script>
    var lock = new PatternLock('#patternContainer', {
        radius: 35,
        margin: 35,
        onDraw: function (pattern) {
            $.ajax({
                url: 'writePattern.php',
                data: {pattern: pattern}
            }).done(function(data) {
                document.location.href="../index.php"
            });
        }
    });
</script>
</body>
</html>
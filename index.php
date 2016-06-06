<?php
if (isset($_SESSION['uid']))
    session_destroy();
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Reflect</title>
    <script src="lib/jquery-2.2.4.min.js"></script>
    <script src="js/index.js"></script>
    <script src="lib/bootstrap.min.js"></script>

    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/index.css" rel="stylesheet">
    <link href="css/hover.css" rel="stylesheet">
</head>
<body>
<img
    class="logo"
    src="images/logo.png"/>
<div class="row">

</div>
<button onclick="location.href = 'createUser.php';" class="create-button">Create new profile</button>


<script>
    printUsers();
</script>
</body>
</html>
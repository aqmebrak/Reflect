<?php
session_start();
if (isset($_SESSION['uid']))
    session_destroy();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Welcome</title>
    <script src="lib/jquery-2.2.4.min.js"></script>
    <script src="js/index.js"></script>
    <script src="lib/bootstrap.min.js"></script>

    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/index.css" rel="stylesheet">
</head>
<body>

<div class="row">

</div>


<script>
    printUsers();
</script>
</body>
</html>
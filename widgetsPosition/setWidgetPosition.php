<?php
session_start();
$s = file_get_contents("database/" . $_SESSION['uid'] . ".json");
$data = json_decode($s, true);

if (!EMPTY($_GET['currentWidget']) && !EMPTY($_GET['left']) && !EMPTY($_GET['top'])) {
    $data[$_GET['currentWidget']]['left'] = $_GET['left'];
    $data[$_GET['currentWidget']]['top'] = $_GET['top'];
}

//write into user's file
$newJsonString = json_encode($data);
file_put_contents('database/' . $_SESSION['uid'] . '.json', $newJsonString);
?>
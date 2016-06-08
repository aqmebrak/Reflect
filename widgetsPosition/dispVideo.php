<?php
session_start();

$s = file_get_contents("database/" . $_SESSION['uid'] . ".json");
$data = json_decode($s, true);

$data[$_GET['video']]['display'] = true;

//write into user's file
$newJsonString = json_encode($data);
file_put_contents('database/' . $_SESSION['uid'] . '.json', $newJsonString);

?>
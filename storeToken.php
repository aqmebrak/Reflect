<?php
session_start();

$s = file_get_contents("database/users.json");
$data = json_decode($s, true);

$data[$_SESSION['uid']]['token'] = $_GET['token'];

$newJsonString = json_encode($data);
file_put_contents("database/users.json", $newJsonString);
?>
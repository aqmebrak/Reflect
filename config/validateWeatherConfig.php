<?php
session_start();

$jsonString = file_get_contents('../database/' . $_SESSION['uid'] . '.json');
$data = json_decode($jsonString, true);

if (!EMPTY($_POST['temp-config'])) {
    $data['weather']['degree'] = $_POST['temp-config'];
}
if (!EMPTY($_POST['city'])) {
    $data['weather']['location'] = $_POST['city'];
}
$newJsonString = json_encode($data);
file_put_contents('../database/' . $_SESSION['uid'] . '.json', $newJsonString);

header('Refresh:0;url=weather-config.php');
?>
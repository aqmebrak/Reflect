<?php
//find a new id to give to new user
$s = file_get_contents("database/".$_SESSION['uid'].".json");
$data = json_decode($s, true);
print_r($_GET['currentWidget']);
print_r($_SESSION['uid']);
if (!EMPTY($_GET['currentWidget'])) {
    $data[$_GET['currentWidget']]['display'] = false;
}
$newJsonString = json_encode($data);
file_put_contents('database/' . $_SESSION['uid'] . '.json', $newJsonString);
?>
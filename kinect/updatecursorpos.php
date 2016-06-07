<?php


if (!isset($_GET['status'])) {
	die();
}

$jsonString = file_get_contents('../database/cursor/cursor_status.json');
$data = json_decode($jsonString, true);

$data['status'] = $_GET['status'];

$newJsonString = json_encode($data);
file_put_contents('../database/cursor/cursor_status.json', $newJsonString);

?>
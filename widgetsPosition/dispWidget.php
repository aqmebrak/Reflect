<?php
session_start();
$s = file_get_contents("../database/".$_SESSION['uid'].".json");
$data = json_decode($s, true);

//display a widget
if($_GET['disp']=='true'){
    if (!EMPTY($_GET['currentWidget']) && !$data[$_GET['currentWidget']]['display']) {
        //set display to true
        $data[$_GET['currentWidget']]['display'] = true;

        //retreive original left and top position of the widget
        $w = file_get_contents("../database/widgets.json");
        $widgets = json_decode($w, true);

        //set it for the user
        $data[$_GET['currentWidget']]['left']=$widgets[$_GET['currentWidget']]['left'];
        $data[$_GET['currentWidget']]['top']=$widgets[$_GET['currentWidget']]['top'];
    }
}

//hide a widget
else if($_GET['disp']=='false'){
    if (!EMPTY($_GET['currentWidget'])) {
        $data[$_GET['currentWidget']]['display'] = false;
    }
}

//write into user's file
$newJsonString = json_encode($data);
file_put_contents("../database/".$_SESSION['uid'].".json", $newJsonString);
?>
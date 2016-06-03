<?php
if (isset($_POST['firstname'])){
    //find a new id to give to new user
    $s = file_get_contents("database/users.json");
    $data = json_decode($s, true);
    $id=0;
    foreach($data['user'] as $u) {
        $id = $u['id'];
    }
    $id++;

    //fill the users.json file
    $newUser = array('id' => $id, 'lastname' => $_POST['lastname'], 'firstname' => $_POST['firstname']);
    array_push($data['user'],$newUser);
    $newJsonString = json_encode($data);
    file_put_contents('database/users.json', $newJsonString);

    //create a json file for this new id
    $newUserFile = fopen("database/".$id.".json", "w");
    $txt="{\"lastname\":\"".$_POST['lastname']."\",
  \"firstname\":\"".$_POST['firstname']."\",
  \"weather\":
  {\"degree\":\"c\",\"location\":\"London\"},
  \"clock\":{\"timezone\":\"+1\"}
}";
    fwrite($newUserFile, $txt);
    fclose($newUserFile);
    header('Location: index.php');
}
?>
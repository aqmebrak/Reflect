<?php
if (isset($_POST['firstname'])) {
    //check if a user already exist
    $s = file_get_contents("database/users.json");
    $data = json_decode($s, true);
    $alreadyExists = false;
    foreach ($data['user'] as $u) {
        if ($_POST['firstname'] == $u['firstname']) {
            $alreadyExists = true;
            break;
        }
    }
    if ($alreadyExists) {
        header('Location: createUser.php?error=true');
    } else {
        //find a new id to give to new user
        $s = file_get_contents("database/users.json");
        $data = json_decode($s, true);
        $id = 0;
        foreach ($data['user'] as $u) {
            $id = $u['id'];
        }
        $id++;

        //fill the users.json file
        $newUser = array('id' => $id, 'lastname' => $_POST['lastname'], 'firstname' => $_POST['firstname'], 'patternLock' => '');
        array_push($data['user'], $newUser);
        $newJsonString = json_encode($data);
        file_put_contents('database/users.json', $newJsonString);

        //create a json file for this new id
        $newUserFile = fopen("database/" . $id . ".json", "w");

        $f = file_get_contents("database/widgets.json");
        fwrite($newUserFile, $f);
        fclose($newUserFile);
        header("Refresh:0; url=index.php");
    }

}
?>
<!DOCTYPE html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>Reflect</title>
    <link rel="stylesheet" href="css/createUser.css">
    <!--[if lt IE 9]><script src="//html5shim.googlecode.com/svn/trunk/html5.js"></script><![endif]-->
</head>
<script>
    function validateForm() {
        var fn = document.forms["reg"]["firstname"].value;
        var ln = document.forms["reg"]["lastname"].value;
        if (fn == null || fn == "" || ln == null || ln == "") {
            alert("Please fill all inputs");
            return false;
        }


    }
</script>
<body>
<h1 class="register-title">Welcome</h1>
<form class="register" name="reg" method="post" action="validateNewUser.php" onsubmit="return validateForm()">
    <div class="register-switch">
        <input type="radio" name="sex" value="f" id="sex_f" class="register-switch-input" checked>
        <label for="sex_f" class="register-switch-label">Female</label>
        <input type="radio" name="sex" value="m" id="sex_m" class="register-switch-input">
        <label for="sex_m" class="register-switch-label">Male</label>
    </div>
    <?php
    if(isset($_GET['error'])){
        echo '<div class="warning">
        Please choose another first name
    </div>';
    }
    ?>
    <input type="text" name="firstname" class="register-input" placeholder="First name">
    <input type="text" name="lastname" class="register-input" placeholder="Last name">
    <input type="submit" value="Create my profile" class="register-button">
</form>
</body>
</html>

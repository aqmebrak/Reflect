<!-- Font for the loading screen -->
<link href='https://fonts.googleapis.com/css?family=Kanit:100' rel='stylesheet' type='text/css'>

<!----------------------------------------------------->
<!-- Php to get the name from the user's config file -->
<!----------------------------------------------------->
<?php
$jsonString = file_get_contents('database/users.json');
$data = json_decode($jsonString, true);

foreach($data['user'] as $elem) {
    if($elem['id'] == $_SESSION['uid'])
        $firstName = $elem['firstname'];
}
?>

<!---------------------------------------------------->
<!--------------- Loading screen HTML ---------------->
<!---------------------------------------------------->
<div id="loadingScreen">
    <div class="clear-loading loading-effect-2">
        <span></span>
    </div>
    <div id="name" class="fadeIn animated">
        Hi <?php echo $firstName ?>
    </div>
</div>


<!---------------------------------------------------------->
<!-- Script for hiding the loading screen after x seconds -->
<!---------------------------------------------------------->
<script>
    setTimeout(function(){
        $('#loadingScreen').hide('slow', function(){ $('#loadingScreen').remove(); });
    }  , 3000 );
</script>


<!------------------------------------------->
<!------ Style for the loading screen ------->
<!------------------------------------------->
<style>
    #loadingScreen {
        width: 100%;
        height: 100%;
        background-color: black;
        position: relative;
        z-index:15;
    }

    #name {
        font-family: 'Kanit', sans-serif;
        font-size: 7vw;
        text-transform: uppercase;
        white-space: nowrap;
        position: absolute;
        top: 75%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .clear-loading {
        position: absolute;
        box-sizing: border-box;
        margin: -5vw 0 0 -10vw; /* To center the element in the center */
        left:50%;
        top:25%;
    }

    .loading-effect-2 {
        width: 20vw; /* vw to keep a responsive square */
        height: 20vw;
    }

    .loading-effect-2 > span,
    .loading-effect-2 > span:before,
    .loading-effect-2 > span:after {
        content: "";
        display: block;
        border-radius: 50%;
        border: 2px solid #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%,-50%);
        -moz-transform: translate(-50%,-50%);
        -o-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);

    }

    .loading-effect-2 > span {
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        border-left-color: transparent;
        -webkit-animation: effect-2 2s infinite linear;
        -moz-animation: effect-2 2s infinite linear;
        -o-animation: effect-2 2s infinite linear;
        animation: effect-2 2s infinite linear;
    }

    .loading-effect-2 > span:before {
        width: 75%;
        height: 75%;
        border-right-color: transparent;
    }

    .loading-effect-2 > span:after {
        width: 50%;
        height: 50%;
        border-bottom-color: transparent;
    }

    @-webkit-keyframes effect-2 {
        from{
            transform: rotate(0deg);
        }
        to{
            transform: rotate(360deg);
        }
    }

    @keyframes effect-2 {
        from{
            transform: rotate(0deg);
        }
        to{
            transform: rotate(360deg);
        }
    }
</style>
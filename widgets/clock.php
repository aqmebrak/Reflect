<div id="clock_hou" class="grabbable widget draggable">

</div>
<?php
$jsonString = file_get_contents('database/' . $_POST['uid'] . '.json');
$data = json_decode($jsonString, true);

?>

<script>
    window.onload = function () {
        var $draggable = $('.draggable').draggabilly({
            // options...
        })
    }
</script>


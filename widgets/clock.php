<<<<<<< HEAD:widgets/time.php
<div id="time" class="draggable grabbable widget">
=======
<div id="clock_hou" class="draggable">
>>>>>>> 48ac1d0bef9fccad536db9b6f782c79eddf04c77:widgets/clock.php

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


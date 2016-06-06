<div id="time" class="draggable grabbable widget"></div>

<?php
$jsonString = file_get_contents('database/' . $_POST['uid'] . '.json');
$data = json_decode($jsonString, true); ?>

<script>
    window.onload = function () {
        initClock();
        var $draggable = $('.draggable').draggabilly({
            // options...
        })
    }
</script>

<div id="clock" class="grabbable widget draggable"></div>

<?php
$jsonString = file_get_contents('database/' . $_SESSION['uid'] . '.json');
$data = json_decode($jsonString, true);

$timezone = $data['clock']['timezone'];
?>

<script>
    var timezone = "<?php echo $timezone; ?>";
    initClock(timezone);

    var $draggable = $('.draggable').draggabilly({
        // options...
    });

    $("#clock").mousedown(function () {
        document.cookie = "currentWidget=clock";
    });
</script>


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

    var widget = "clock";
    var left = $("#" + widget).css("left");
    var top = $("#" + widget).css("top");
    $("#" + widget)
        .mousedown(function () {
            document.cookie = "currentWidget=" + widget;

            //$.ajax({
              //  url: 'setWidgetPosition.php?currentWidget=' + widget + '&left=' + left + '&top='top
            //})
        });


</script>


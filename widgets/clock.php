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

    //first set the cookie when the widget is selected
    //then ask to a php to change the position of the widget
    var clock = "clock";
    $("#" + clock)
        .mousedown(function () {
            document.cookie = "currentWidget=" + clock;
        })
        .mouseup(function () {
            setTimeout(function(){
                var left = $("#" + clock).css("left");
                var top = $("#" + clock).css("top");
                $.ajax({
                    url: 'widgetsPosition/setWidgetPosition.php',
                    data: {currentWidget: clock, left: left, top: top}
                });
            }, 100);

        });
</script>


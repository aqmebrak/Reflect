<div id="video" class="widget grabbable draggable">
    <div id="player"></div>
</div>

<script>
    var $draggable = $('.draggable').draggabilly({
        // options...
    });

    //first set the cookie when the widget is selected
    //then ask to a php to change the position of the widget
    var video2 = "video";
    $("#" + video2)
        .mousedown(function () {
            document.cookie = "currentWidget=" + video2;
        })
        .mouseup(function () {
            setTimeout(function () {
                var left = $("#" + video2).css("left");
                var top = $("#" + video2).css("top");
                $.ajax({
                    url: 'widgetsPosition/setWidgetPosition.php',
                    data: {currentWidget: video2, left: left, top: top}
                });
            }, 100);
        });
</script>
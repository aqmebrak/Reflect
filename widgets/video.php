<div id="video" class="widget grabbable draggable">
    <span style="color:white; font-size: 2.2em;"><a onclick="closeFrame()">&#10006;</a></span>
    <br/>
    <div id="player"></div>
</div>

<script>
    var $draggable = $('.draggable').draggabilly({
        // options...
    });

    //first set the cookie when the widget is selected
    //then ask to a php to change the position of the widget
    var video = "video";
    $("#" + video)
    .mousedown(function () {
        document.cookie = "currentWidget=" + video;
    })
    .mouseup(function () {
        setTimeout(function(){
            var left = $("#" + video).css("left");
            var top = $("#" + video).css("top");
            $.ajax({
                    url: 'setWidgetPosition.php',
                    data: {currentWidget: video, left: left, top: top}
                });
            }, 100);
    });
</script>
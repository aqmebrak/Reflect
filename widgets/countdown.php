<div id="countdown" class="draggable grabbable widget"></div>
<script>

    $("#countdown").countdown360({
        radius      : 90,
        seconds     : 120,
        strokeWidth : 4,
        fillStyle   : 'transparent',
        strokeStyle : 'white',
        fontSize    : 70,
        fontColor   : '#FFFFFF',
        autostart: false,
        onComplete  : function () {
            //sayPopup("popupCountdown","Well done! Your tooth are perfectly brushed.");
            $("#countdown").css({
                "display": "none"
            });
        }
    }).start();

    //$("#countdown").countdown360().stop();

    var $draggable = $('.draggable').draggabilly({
        // options...
    });

    //first set the cookie when the widget is selected
    //then ask to a php to change the position of the widget
    var countdown = "countdown";
    $("#" + countdown)
        .mousedown(function () {
            document.cookie = "currentWidget=" + countdown;
        })
        .mouseup(function () {
            document.cookie = "currentWidget=";
            setTimeout(function(){
                var left = $("#" + countdown).css("left");
                var top = $("#" + countdown).css("top");
                $.ajax({
                    url: 'widgetsPosition/setWidgetPosition.php',
                    data: {currentWidget: countdown, left: left, top: top}
                });
            }, 100);

        });
</script>

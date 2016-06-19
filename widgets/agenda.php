<div id='agenda' class="grabbable widget draggable hvr-glow">
    <div id="upperText">
        <img src="images/agenda.svg"><span id="today"></span>
    </div>
    <ul id="listEvent" class="list-group">
    </ul>
</div>

<script src="https://apis.google.com/js/client.js?onload=checkAuthInMirror">
</script>
<script>

    $("#today").text("Events ("+$.format.date(moment().endOf('day').format(), "dd/MM")+")");

    var $draggable = $('.draggable').draggabilly({
        // options...
    });

    //first set the cookie when the widget is selected
    //then ask to a php to change the position of the widget
    var agenda = "agenda";
    $("#" + agenda)
        .mousedown(function () {
            document.cookie = "currentWidget=" + agenda;
        })
        .mouseup(function () {
            document.cookie = "currentWidget=";
            setTimeout(function(){
                var left = $("#" + agenda).css("left");
                var top = $("#" + agenda).css("top");
                $.ajax({
                    url: 'widgetsPosition/setWidgetPosition.php',
                    data: {currentWidget: agenda, left: left, top: top}
                });
            }, 100);

        });
</script>



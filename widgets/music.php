<?php
$jsonString = file_get_contents('database/' . $_SESSION['uid'] . '.json');
$data = json_decode($jsonString, true);

?>
<div id="music" class="draggable grabbable widget hvr-glow">
    <br/>
    <div id="sc-sound"></div>
    <br/>
<span class="sc" onclick="playSC()">
    <i class="fa fa-play-circle-o"></i>
</span>
<span class="sc" onclick="pauseSC()">
    <i class="fa fa-pause-circle-o"></i>
</span>
<span class="sc" onclick="backSC()">
    <i class="fa fa-caret-square-o-left"></i>
</span>
<span class="sc" onclick="nextSC()">
    <i class="fa fa-caret-square-o-right"></i>
</span>
    <div id="musicframe">
        <iframe id="sc-widget" src="http://w.soundcloud.com/player/?url=https://soundcloud.com/aqmebrak/tracks"
                width="250" height="200" scrolling="no" frameborder="no"></iframe>
    </div>
</div>
<style>
    .sc {
        width: 120px;
        font-size: 5em;
        background-color: transparent;
        color: white;
    }

    .sc :hover {
        color: red;
    }

    #sc-sound {
        text-align: center;
        width: 90% !important;
        border: white solid medium;
        margin-left: auto;
    }

    #music {
        border: solid medium white;
        border-radius: 7px;
        margin: 0;
        padding: 0;
        width: 300px;
        text-align: center;
    }

    #musicframe {
        text-align: center;
    }
</style>
<script>

    var volume = 1;
    (function () {
        var widgetIframe = document.getElementById('sc-widget'),
            widget = SC.Widget(widgetIframe);
        widget.load("https%3A//api.soundcloud.com/users/37700638&amp;", {});
        widget.bind(SC.Widget.Events.READY, function () {
            widget.setVolume(volume);
            // get current level of volume
            widget.getVolume(function (volume) {
                //console.log('current volume value is ' + volume);
            });
            // set new volume level
        });

    }());
    function playSC() {
        var widgetIframe = document.getElementById('sc-widget'),
            widget = SC.Widget(widgetIframe);
        widget.play();
    }

    function pauseSC() {
        var widgetIframe = document.getElementById('sc-widget'),
            widget = SC.Widget(widgetIframe);
        widget.pause();
    }

    function nextSC() {
        var widgetIframe = document.getElementById('sc-widget'),
            widget = SC.Widget(widgetIframe);
        widget.next();
    }

    function backSC() {
        var widgetIframe = document.getElementById('sc-widget'),
            widget = SC.Widget(widgetIframe);
        widget.prev();
    }

    $('#sc-sound').sGlide({
        startAt: 100,
        pill: true,
        width: 60,
        colorShift: ["#e52d27", "#b31217"],
        showKnob: false,
        totalRange: [0, 1],
        drag: changeVideoSound
    });

    function changeVideoSound(o) {
        var sound = o.custom;
        console.log(sound);
        var widgetIframe = document.getElementById('sc-widget'),
            widget = SC.Widget(widgetIframe);
        widget.setVolume(sound);
    }
</script>


<script>
    //first set the cookie when the widget is selected
    //then ask to a php to change the position of the widget
    var music = "music";
    $("#" + music)
        .mousedown(function () {
            document.cookie = "currentWidget=" + music;
        })
        .mouseup(function () {
            document.cookie = "currentWidget=";
            setTimeout(function () {
                var left = $("#" + music).css("left");
                var top = $("#" + music).css("top");
                $.ajax({
                    url: 'widgetsPosition/setWidgetPosition.php',
                    data: {currentWidget: music, left: left, top: top}
                });
            }, 100);

        });
</script>
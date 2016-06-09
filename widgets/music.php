<?php
$jsonString = file_get_contents('database/' . $_SESSION['uid'] . '.json');
$data = json_decode($jsonString, true);

?>


<div id="music" class="draggable grabbable widget">
    <iframe src="https://embed.spotify.com/?uri=spotify:user:spotify_france:playlist:1c1NyazFiQPonWzNtxWd5M&theme=white"
            width="250" height="300" frameborder="0" allowtransparency="true"></iframe>
</div>

<style>
    #music {
        border: medium solid white;
        border-radius: 7px;
        padding-top:2.5em;
        text-align:center;
    }
    iframe{
        background-color: transparent;
    }

</style>

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
            setTimeout(function(){
                var left = $("#" + music).css("left");
                var top = $("#" + music).css("top");
                $.ajax({
                    url: 'widgetsPosition/setWidgetPosition.php',
                    data: {currentWidget: music, left: left, top: top}
                });
            }, 100);

        });
</script>
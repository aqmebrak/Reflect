<?php
$jsonString = file_get_contents('database/' . $_SESSION['uid'] . '.json');
$data = json_decode($jsonString, true);

?>


<div id="music" class="draggable grabbable widget">
    <span style="font-size: 1.5em;color:white;">Music</span>
    <br/>
    <br/>
    <iframe src="https://embed.spotify.com/?uri=spotify:user:spotify_france:playlist:1c1NyazFiQPonWzNtxWd5M&theme=white"
            width="250" height="300" frameborder="0" allowtransparency="true"></iframe>
</div>

<style>
    #music {
        border: medium solid white;
        border-radius: 7px;
        padding-top: 7px;
        text-align:center;
    }
    iframe{
        background-color: transparent;
    }

</style>
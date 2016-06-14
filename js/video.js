function launchVideo() {
    // 2. This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;

var videoID;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: videoID,
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    buildControls();
    event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        done = true;
    }
}


function buildControls() {
    var videoDuration = player.getDuration();
    $('#time-controls').sGlide({
        startAt	: 0,
        pill	: true,
        width	: 60,
        colorShift	: ["#e52d27", "#b31217"],
        showKnob: false,
        totalRange: [0, videoDuration],
        drag: changeVideoTime
    });

    $('#sound-controls').sGlide({
        startAt	: 0,
        pill	: true,
        width	: 60,
        colorShift	: ["#e52d27", "#b31217"],
        showKnob: false,
        totalRange: [0, 100],
        drag: changeVideoSound
    });
}

function changeVideoTime(o) {
    var time = o.custom;
    player.seekTo(time,true);
}

function changeVideoSound(o) {
    var sound = o.custom;
    player.setVolume(sound);
}
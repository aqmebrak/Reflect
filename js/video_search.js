function searchMaquillageVideos() {
    gapi.client.setApiKey('AIzaSyARvwirFktEIi_BTaKcCi9Ja-m3IEJYIRk');
    gapi.client.load('youtube', 'v3', function () {

        searchVideosByQuery('maquillage');
    });
}


function searchVideosByQuery(query) {

    var request = gapi.client.youtube.search.list({
        part: 'snippet',
        maxResults: 50,
        q: query
    });
    request.execute(function (response) {
        // var str = JSON.stringify(response.result);
        displayVideosListInHtml(response.items);
        //createReturnBackButton();
    });
}

/* Quand on clique sur l'icone maquillage */
function displayVideosListInHtml(jsonList) {

    var elem ="";
    for (var i = 0; i < jsonList.length; i++) {
        var func = "selectVideoFromList('" + jsonList[i].id.videoId + "')";
        elem += "<li onclick="+func+">";
        elem += "<img src='"+jsonList[i].snippet.thumbnails.medium.url +"'>";
        elem += "<p class='title'>" + jsonList[i].snippet.title + "</p>";
        elem += "<p class='author'> By " + jsonList[i].snippet.channelTitle + "</p></li>";
    }
    $("#forcecentered").find("ul").html(elem);
    $("#forcecentered").css("display","block");
    $("#exit").css("display","block");
    $("#exit").click(function() {
        $("#forcecentered").css("display", "none");
        $("#exit").css("display", "none");
    });

    jQuery(function($) {
        'use strict';

        // -------------------------------------------------------------
        //   Force Centered Navigation
        // -------------------------------------------------------------
        (function() {
            var $frame = $('#forcecentered');

            // Call Sly on frame
            $frame.sly({
                horizontal: 1,
                itemNav: 'forceCentered',
                smart: 0,
                activateMiddle: 0,
                activateOn: 'mouseenter',
                mouseDragging: 1,
                touchDragging: 1,
                releaseSwing: 1,
                startAt: 0,
                scrollBy: 1,
                speed: 300,
                elasticBounds: 1,
                easing: 'easeOutExpo',
                dragHandle: 1,
                dynamicHandle: 1,
                clickBar: 1
            });
        }());
    });
}

function displayVideo() {
    //update user's file
    $.ajax({
        url: 'widgetsPosition/getUid.php'
    })
        .done(function (uid) {
            //set proper location
            $.getJSON("database/" + uid + ".json", function (data) {
                var left = "";
                var top = "";
                //retreive original top & left values
                $.each(data, function (key, val) {
                    if (key == 'video') {
                        left = val['left'];
                        top = val['top'];
                    }
                });
                //set them for the widget
                $("#video").css({
                        "left": left,
                        "top": top
                    }
                );
            });

            //display the widget
            $("#video").css({
                "display": "block"
            });
        });
    $.ajax({
        url: 'widgetsPosition/dispVideo.php'
    });
}

/*Quand on clique sur une des videos de la liste */
function selectVideoFromList(videoId) {
    videoID = videoId;
    if (player) {
        player.loadVideoById(videoId);
    }
    displayVideo();
    launchVideo();
    document.getElementById("forcecentered").style.display = "none";
    document.getElementById("exit").style.display = "none";
}



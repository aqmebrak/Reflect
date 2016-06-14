function searchMaquillageVideos() {
    gapi.client.setApiKey('AIzaSyARvwirFktEIi_BTaKcCi9Ja-m3IEJYIRk');
    gapi.client.load('youtube', 'v3', function () {

        searchVideosByQuery('maquillage');
    });
}


function searchVideosByQuery(query) {

    var request = gapi.client.youtube.search.list({
        part: 'snippet',
        maxResults: 8,
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
        elem += "<div onclick="+func+">";
        elem += "<img src='"+jsonList[i].snippet.thumbnails.medium.url +"'>";
        elem += "<p id='title'>" + jsonList[i].snippet.title + "</p>";
        elem += "<p id='author'> By " + jsonList[i].snippet.channelTitle + "</p></div>";
    }
    $("#videosList").html(elem);
    $("#youtube").css("display","block");
    $("#exit").css("display","block");
    $("#exit").click(function() {
        $("#youtube").css("display","none");
        $("#exit").css("display","none");
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
    document.getElementById("youtube").style.display = "none";
    document.getElementById("exit").style.display = "none";
    document.getElementById("rightPanel").style.display = "block";
}



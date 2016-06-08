$("#bottomPanel").on("mousedown mouseover", function (e) {
    if (e.buttons == 1) {
        $(getBorder(getCookie("currentWidget"))).css({
            "border-color": "red"
        });
    }
}).on("mouseup", function (e) {
    if(getCookie("currentWidget")=='video'){
        player.pauseVideo();
    }
    $.ajax({ url: 'widgetsPosition/dispWidget.php?currentWidget='+getCookie("currentWidget")+'&disp=false' });
    $("#"+getCookie("currentWidget")).css({
            "display": "none"
        }
    );
}).on("mouseout", function (e) {
    $(getBorder(getCookie("currentWidget"))).css({
            "border-color": "white"
        }
    );
});

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}

function getBorder(currentWidget){
    var div="";
    if(currentWidget=="weather")
        div="#insideWeather";
    else if (currentWidget=="clock")
        div=".jcgmt-digital";
    else if (currentWidget=="news")
        div="#news";
    else if (currentWidget=="traffic")
        div="#traffic";
    else if (currentWidget=="video")
        div="#video";
    return div;
}
<script>
    function displayWidget(name) {
        //update user's file
        $.ajax({
            url: 'widgetsPosition/dispWidget.php?currentWidget=' + name + '&disp=true'
        })
            .done(function () {
                //set proper location
                $.getJSON("database/widgets.json", function (data) {

                    var left = "";
                    var top = "";
                    //retreive original top & left values
                    $.each(data, function (key, val) {
                        if (key == name) {
                            left = val['left'];
                            top = val['top'];
                        }
                    });
                    //set them for the widget
                    $("#" + name).css({
                            "left": left,
                            "top": top
                        }
                    );
                });

                if(name=='countdown'){
                    $("#countdown").countdown360().start();
                    setTimeout(function(){
                        $("#" + name).css({
                            "display": "block"
                        });
                    }, 450);
                }
                //display the widget
                else{
                    $("#" + name).css({
                        "display": "block"
                    });
                }
            });
    }
</script>

<div id="leftPanel">
    <ul>
        <li onclick="displayWidget('clock')">
            <img class="smallIconLeft" src="images/clock.svg">
        </li>
        <li onclick="displayWidget('weather')">
            <img class="smallIconLeft" src="images/weather.svg">
        </li>
        <li onclick="displayWidget('traffic')">
            <img class="smallIconLeft" src="images/traffic.svg">
        </li>
        <li onclick="displayWidget('news')">
            <img class="smallIconLeft" src="images/news.svg">
        </li>
        <li onclick="displayWidget('countdown')">
            <img class="smallIconLeft" src="images/countdown.svg">
        </li>
        <li onclick="displayWidget('music')">
            <img class="smallIconLeft" src="images/music.svg">
        </li>
    </ul>
</div>

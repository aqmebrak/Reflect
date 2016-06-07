<script>
    function displayWidget(name) {
        //update user's file
        $.ajax({url: 'dispWidget.php?currentWidget=' + name + '&disp=true'});

        //set proper location
        $.getJSON( "database/widgets.json", function(data) {
            var left="";
            var top="";
            //retreive original top & left values
            $.each(data, function (key, val) {
                if(key==name){
                    left=val['left'];
                    top=val['top'];
                }
            });
            //set them for the widget
            $("#"+name).css({
                    "left": left,
                    "top": top
                }
            );
        });

        //display the widget
        $(getBorder(name)).css({
                "display": "block"
            }
        );

    }
</script>

<div id="leftPanel">
    <ul>
        <li onclick="displayWidget('clock')">
            <img class="smallIcon" src="images/clock.png">

        </li>
        <li onclick="displayWidget('weather')">
            <img class="smallIcon" src="images/weather.png">
        </li>
    </ul>
</div>
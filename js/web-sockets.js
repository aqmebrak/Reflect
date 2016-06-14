window.onload = function () {
    var status = document.getElementById("status");
    var canvas = document.getElementById("canvas");
    var timer = 0;


    if (!window.WebSocket) {
        return;
    }
    // Initialize a new web socket.
    var socket = new WebSocket("ws://localhost:8181");

    // Connection established.
    socket.onopen = function () {
    };

    // Connection closed.
    socket.onclose = function () {
    }

    // Receive data FROM the server!
    socket.onmessage = function (event) {
        if (typeof event.data === "string") {
            // SKELETON DATA
            var handRight = {coordX: 0};
            var handLeft = {coordX: 0};

            // Get the data in JSON format.
            var jsonObject = JSON.parse(event.data);

            // Display the skeleton joints.
            for (var i = 0; i < jsonObject.skeletons.length; i++) {
                for (var j = 0; j < jsonObject.skeletons[i].joints.length; j++) {
                    var joint = jsonObject.skeletons[i].joints[j];
                    if (joint.name == "handright") {
                        handRight.coordX = joint.x;
                    }
                    else if (joint.name == "handleft") {
                        handLeft.coordX = joint.x;
                    }
                    //console.log("RX:" + handRight.coordX + " LX" + handLeft.coordX + "\n");

                    if (handLeft.coordX != 0 && handRight.coordX != 0) {
                        if (handLeft.coordX <= handRight.coordX + 30 && handLeft.coordX >= handRight.coordX - 30) {
                            timer++;
                            console.log("\n" + timer);
                            if (timer >= 300) {
                                timer = 0;
                                document.getElementsByTagName('audio')[0].play();
                                console.log("===============================================");
                                clearWidgets();
                            }
                        }
                    }
                }
            }
        }
    };
};

function clearWidgets() {
    $.getJSON("database/widgets.json", function (data) {

        //retreive original top & left values
        $.each(data, function (key, val) {
            $.ajax({
                url: 'widgetsPosition/dispWidget.php',
                //je regarde le fichier widgets.json
                //pour chaque widget, metre currentWidgett
                data: {currentWidget: key, disp: false}
            });
            $("#" + key).css({
                    "display": "none"
                }
            );
        });
    });
}

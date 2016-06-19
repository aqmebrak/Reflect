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
            var handRight = {X: 0};
            var handLeft = {X: 0};
            var shoulderLeft = {X: 0};
            var shoulderRight = {X: 0, Y: 0};

            // Get the data in JSON format.
            var jsonObject = JSON.parse(event.data);

            // Display the skeleton joints.
            for (var i = 0; i < jsonObject.skeletons.length; i++) {
                for (var j = 0; j < jsonObject.skeletons[i].joints.length; j++) {
                    var joint = jsonObject.skeletons[i].joints[j];
                    if (joint.name == "handright") {
                        handRight.X = joint.x;
                    }
                    else if (joint.name == "handleft") {
                        handLeft.X = joint.x;
                    }
                    else if (joint.name == "shoulderleft") {
                        shoulderLeft.X = joint.x;
                        shoulderRight.Y = joint.y;
                    }
                    else if (joint.name == "shoulderright") {
                        shoulderRight.X = joint.x;
                    }
                    //console.log("RX:" + handRight.X + " LX" + handLeft.X + "\n");

                    //////////////SUPPRIMER WIDGETS/////////////////////////
                    if (handLeft.X != 0 && handRight.X != 0) {
                        if (handLeft.X <= handRight.X + 25 && handLeft.X >= handRight.X - 25) {
                            timer++;
                            //console.log("\n" + timer);
                            if (timer >= 800) {
                                timer = 0;
                                document.getElementsByTagName('audio')[0].play();
                                console.log("===============================================");
                                clearWidgets();
                            }
                        }
                    }
                    ///////////////VETEMENTS/////////////////////////
                    if (shoulderRight.X != 0 && shoulderLeft.X != 0) {
                        var diff = shoulderLeft.X - shoulderRight.X;
                        //console.log(Math.abs(diff));
                        diff = Math.abs(diff);
                        var tshirt = document.getElementById('tshirt');
                        var shopping = document.getElementById('shopping');

                        var size = diff * 4.15;
                        tshirt.style.width = '' + size + 'px';
                        tshirt.style.height = '' + size + 'px';
                        //console.log('width' + tshirt.width);
                        shopping.style.left = '' + (shoulderLeft.X * 1.8) + 'px';
                        shopping.style.top = '' + (shoulderRight.Y * 2.1) + 'px';
                        //console.log('LEFT' + shopping.style.left);
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

function amazonShopping() {
    console.log("triggered");
    if (document.getElementById('shopping').style.display == 'none') {
        document.getElementById('shopping').style.display = 'block';
    }
    else {
        document.getElementById('shopping').style.display = 'none';
    }
}

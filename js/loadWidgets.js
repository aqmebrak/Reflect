$.ajax({
    url: "getUid.php"
})
    .done(function (uid) {
        $.getJSON("database/" + uid + ".json", function (data) {
            $.each(data, function (key, val) {
                if ((!val['display']) || key=='video') {
                    $("#" + key).css({
                            "display": "none"
                        }
                    );
                }
                else {
                    $("#" + key).css({
                            "left": val["left"],
                            "top": val["top"]
                        }
                    );
                }

            });
        });
    });

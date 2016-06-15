/**
 * Check if current user has authorized this application.
 */
function checkAuthInMirror() {
    console.log("in function");
    $.ajax({
        url: "widgetsPosition/getUid.php"
    }).done(function (uid) {
        $.getJSON("database/users.json", function (data) {
            $.each(data, function (key, val) {
                if (key == uid) {
                    //if the user hasn't sign in to google yet
                    if(val['token']['access_token']=="" || val['token']['access_token']==null){
                        //remove

                    }
                    var revokeUrl = 'https://accounts.google.com/o/oauth2/revoke?token=' + val['token']['access_token'];
                    $.ajax({
                        type: 'GET',
                        url: revokeUrl,
                        async: false,
                        contentType: "application/json",
                        dataType: 'jsonp',
                        success: function (nullResponse) {
                            console.log("success")
                        },
                        error: function (e) {
                            console.log(e);
                        }
                    });
                }
            });
        });
    });
    /*gapi.auth.authorize(
     {
     'client_id': CLIENT_ID,
     'scope': SCOPES.join(' '),
     'immediate': true,
     'cookie_policy': 'single_host_origin'
     }, loadCalendarApi);*/
    loadCalendarApi();

}

/**
 * Load Google Calendar client library. List upcoming events
 * once client library is loaded.
 */
function loadCalendarApi() {
    /*$.ajax({
        url: "widgetsPosition/getUid.php"
    }).done(function (uid) {
        var to = "";
        $.getJSON("database/users.json", function (data) {
            $.each(data, function (key, val) {
                if (key == uid) {
                    to = val['token'];
                }
            });
            //gapi.auth.setToken(to);;
            //gapi.client.load('calendar', 'v3', listUpcomingEvents);
        });
    });*/
    $.ajax({
        url: "widgetsPosition/getUid.php"
    }).done(function (uid) {
        $.getJSON("database/users.json", function (data) {
            $.each(data, function (key, val) {
                if (key == uid) {
                    console.log("uid : "+uid);
                    var revokeUrl = 'https://accounts.google.com/o/oauth2/revoke?token=' + val['token']['access_token'];
                    $.ajax({
                        type: 'GET',
                        url: revokeUrl,
                        async: false,
                        contentType: "application/json",
                        dataType: 'jsonp',
                        success: function (nullResponse) {
                            console.log("success")
                        },
                        error: function (e) {
                            console.log(e);
                        }
                    });
                }
            });
        });
    });
}

/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
function listUpcomingEvents() {
    var request = gapi.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': (new Date()).toISOString(),
        'timeMax': moment().endOf('day').format(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime'
    });

    request.execute(function (resp) {
        var events = resp.items;
        var s = '<li class="list-group-item">';
        if (events.length > 0) {
            for (i = 0; i < events.length; i++) {
                var event = events[i];
                var when = event.start.dateTime;
                if (!when) {
                    when = event.start.date;
                }
                //when=$.format.date(when, "dd/MM, HH:mm");
                when = $.format.date(when, "HH:mm");
                $('#listEvent').append(s + when + ": " + event.summary + '</li>');
            }
        } else {
            $('#listEvent').append(s + "No events today !  </li>");
        }

    });


}
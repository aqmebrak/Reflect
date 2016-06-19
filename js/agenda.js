/**
 * Check if current user has authorized this application.
 */
function checkAuthInMirror() {
    /*console.log("in function");
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
                }
            });
        });
    });*/
    loadCalendarApi();

}

/**
 * Load Google Calendar client library. List upcoming events
 * once client library is loaded.
 */
function loadCalendarApi() {
    //gapi.auth.signOut();
    $.ajax({
        url: "widgetsPosition/getUid.php"
    }).done(function (uid) {
        var to = "";
        $.getJSON("database/users.json", function (data) {
            $.each(data, function (key, val) {
                if (key == uid) {
                    to = val['token'];
                }
            });
            gapi.auth.setToken(to);;
            gapi.client.load('calendar', 'v3', listUpcomingEvents);
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
<?php
session_start();
?>
<html>
<head>
    <meta charset="UTF-8">
    <title>Configuration</title>
    <script src="../lib/jquery-2.2.4.min.js"></script>
    <script src="../lib/bootstrap.min.js"></script>
    <script src="../js/config.js"></script>
    <script src="../js/cursor.js"></script>
    <link href="../css/bootstrap.min.css" rel="stylesheet">
    <link href="../css/config.css" rel="stylesheet">
    <link href="../css/hover.css" rel="stylesheet">
    <script type="text/javascript">
        // Your Client ID can be retrieved from your project in the Google
        // Developer Console, https://console.developers.google.com
        var CLIENT_ID = '756277605864-gshqnce6iu6rqb8qc4jf89r2kg13h93q.apps.googleusercontent.com';

        var SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

        /**
         * Check if current user has authorized this application.
         */
        function checkAuth() {
            gapi.auth.authorize(
                {
                    'client_id': CLIENT_ID,
                    'scope': SCOPES.join(' '),
                    'immediate': true,
                    'cookie_policy': 'single_host_origin'
                }, handleAuthResult);
        }

        /**
         * Handle response from authorization server.
         *
         * @param {Object} authResult Authorization result.
         */
        function handleAuthResult(authResult) {
            var authorizeDiv = document.getElementById('authorize-div');
            if (authResult && !authResult.error) {
                console.log("connected");
                 var t = gapi.auth.getToken();
                $.ajax({
                    url: '../storeToken.php',
                    data: {token: t}
                }).done(function (data) {
                    console.log(data);
                });

                // Hide auth UI, then load client library.
                authorizeDiv.style.display = 'none';
                //loadCalendarApi();
            } else {
                console.log("disconnected");
                // Show auth UI, allowing the user to initiate authorization by
                // clicking authorize button.
                authorizeDiv.style.display = 'block';
            }
        }


        /**
         * Initiate auth flow in response to user clicking authorize button.
         *
         * @param {Event} event Button click event.
         */
        function handleAuthClick(event) {
            gapi.auth.authorize(
                {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
                handleAuthResult);
            return false;
        }


    </script>
    <script src="https://apis.google.com/js/client.js?onload=checkAuth">
    </script>
</head>
<body>
<div id="authorize-div" style="display: none">
    <!--Button for the user to click to initiate auth sequence -->
    <div id="authorize-button" class="btn btn-primary grabbable" onclick="handleAuthClick(event)">
        Authorize access to your Google Agenda
    </div>
</div>


<div class="nav">
    <a class="back hvr-glow" href="config.php"></a>
    <a class="exit hvr-glow" href="../mirror.php"></a>
</div>


</body>
</html>

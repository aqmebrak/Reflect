<?php
session_start();
?>
<!DOCTYPE html>
<html>
<head>
    <title>Configuration</title>
    <script src="../lib/jquery-2.2.4.min.js"></script>
    <script src="../lib/bootstrap.min.js"></script>
    <script src="../js/config.js"></script>
	<script src="../js/cursor.js"></script>
    <link href="../css/bootstrap.min.css" rel="stylesheet">
    <link href="../css/config.css" rel="stylesheet">
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <meta charset="utf-8">

    <style>
        .locationField {
            position: relative;
            width: 480px;
        }

        #address td {
            font-size: 10pt;
        }

        body {
            color: white;
        }
    </style>
</head>

<body>
<ul>
    <li ><a href="weather-config.php">Weather</a></li>
    <li><a href="clock-config.php">Clock</a></li>
    <li><a href="news-config.php">News</a></li>
    <li class="active"><a href="traffic-config.php">Traffic</a></li>
    <li><a href="../mirror.php">Mirror</a></li>
</ul>
<div id="content">
    <form role="form" method="post" action="traffic-config.php">
        <div class="form-group locationField">
            <label for="autocomplete1">FROM: </label>
            <input name="from" id="autocomplete1" placeholder="Enter your departure address"
                   onFocus="geolocate()" type="text" class="form-control">
        </div>
        <br/>
        <div class="form-group locationField">
            <label for="autocomplete1">TO: </label>
            <input name="to" id="autocomplete2" placeholder="Enter your arrival address"
                   onFocus="geolocate()" type="text" class="form-control">
        </div>
        <button type="submit" class="btn btn-default">Save</button>
    </form>
</div>
<script>
    // This example displays an address form, using the autocomplete feature
    // of the Google Places API to help users fill in the information.

    var placeSearch, autocomplete;
    var componentForm = {
        street_number: 'short_name',
        route: 'long_name',
        locality: 'long_name',
        administrative_area_level_1: 'short_name',
        country: 'long_name',
        postal_code: 'short_name'
    };

    function initAutocomplete() {
        // Create the autocomplete object, restricting the search to geographical
        // location types.
        var autocomplete1 = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */(document.getElementById('autocomplete1')),
            {types: ['geocode']});
        var autocomplete2 = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */(document.getElementById('autocomplete2')),
            {types: ['geocode']});
        // When the user selects an address from the dropdown, populate the address
        // fields in the form.
        autocomplete1.addListener('place_changed', fillInAddress);
        autocomplete2.addListener('place_changed', fillInAddress);

    }

    // [START region_fillform]
    function fillInAddress() {
        // Get the place details from the autocomplete object.
        var place = autocomplete.getPlace();

        for (var component in componentForm) {
            document.getElementById(component).value = '';
            document.getElementById(component).disabled = false;
        }

        // Get each component of the address from the place details
        // and fill the corresponding field on the form.
        for (var i = 0; i < place.address_components.length; i++) {
            var addressType = place.address_components[i].types[0];
            if (componentForm[addressType]) {
                var val = place.address_components[i][componentForm[addressType]];
                document.getElementById(addressType).value = val;
            }
        }
    }
    // [END region_fillform]

    // [START region_geolocation]
    // Bias the autocomplete object to the user's geographical location,
    // as supplied by the browser's 'navigator.geolocation' object.
    function geolocate() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var geolocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                var circle = new google.maps.Circle({
                    center: geolocation,
                    radius: position.coords.accuracy
                });
                autocomplete.setBounds(circle.getBounds());
            });
        }
    }
    // [END region_geolocation]

</script>
<script
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCPjTonWpMnclazoTL22ibJOdAPyb4CmaA&signed_in=true&libraries=places&callback=initAutocomplete"
    async defer></script>

<?php
$jsonString = file_get_contents('../database/' . $_SESSION['uid'] . '.json');
$data = json_decode($jsonString, true);

if (!EMPTY($_POST['from'])) {
    $data['traffic']['from'] = $_POST['from'];
    $data['traffic']['to'] = $_POST['to'];
}
$newJsonString = json_encode($data);
file_put_contents('../database/' . $_SESSION['uid'] . '.json', $newJsonString);
?>
</body>
</html>
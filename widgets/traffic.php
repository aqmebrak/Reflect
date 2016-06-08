<?php
$jsonString = file_get_contents('database/' . $_SESSION['uid'] . '.json');
$data = json_decode($jsonString, true);

$from = $data['traffic']['from'];
$to = $data['traffic']['to']; ?>

<div class="draggable grabbable widget" id="traffic">
    <div id="output">    <i class="fa fa-car" aria-hidden="true"></i>
    </div>
</div>
<div id="map" style="display:none;"></div>
<script>
    function initMap() {
        var bounds = new google.maps.LatLngBounds;
        var markersArray = [];

        var origin1 = '<?php echo $from ?>';
        var destinationA = '<?php echo $to ?>';

        var destinationIcon = 'https://chart.googleapis.com/chart?' +
            'chst=d_map_pin_letter&chld=D|FF0000|000000';
        var originIcon = 'https://chart.googleapis.com/chart?' +
            'chst=d_map_pin_letter&chld=O|FFFF00|000000';
        var map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 55.53, lng: 9.4},
            zoom: 10
        });
        var geocoder = new google.maps.Geocoder;

        var service = new google.maps.DistanceMatrixService;
        service.getDistanceMatrix({
            origins: [origin1],
            destinations: [destinationA],
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.METRIC,
            avoidHighways: false,
            avoidTolls: false
        }, function (response, status) {
            if (status !== google.maps.DistanceMatrixStatus.OK) {
                alert('Error was: ' + status);
            } else {
                var originList = response.originAddresses;
                var destinationList = response.destinationAddresses;
                var outputDiv = document.getElementById('output');
                deleteMarkers(markersArray);

                var showGeocodedAddressOnMap = function (asDestination) {
                    var icon = asDestination ? destinationIcon : originIcon;
                    return function (results, status) {
                        if (status === google.maps.GeocoderStatus.OK) {
                            map.fitBounds(bounds.extend(results[0].geometry.location));
                            markersArray.push(new google.maps.Marker({
                                map: map,
                                position: results[0].geometry.location,
                                icon: icon
                            }));
                        } else {
                            alert('Geocode was not successful due to: ' + status);
                        }
                    };
                };

                for (var i = 0; i < originList.length; i++) {
                    var results = response.rows[i].elements;
                    geocoder.geocode({'address': originList[i]},
                        showGeocodedAddressOnMap(false));
                    for (var j = 0; j < results.length; j++) {
                        geocoder.geocode({'address': destinationList[j]},
                            showGeocodedAddressOnMap(true));
                        if (results[j].duration) {
                            outputDiv.innerHTML += 'Needed time: ' +
                                results[j].duration.text + '<br>';
                        }
                    }
                }
            }
        });
    }

    function deleteMarkers(markersArray) {
        for (var i = 0; i < markersArray.length; i++) {
            markersArray[i].setMap(null);
        }
        markersArray = [];
    }

</script>
<script
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCPjTonWpMnclazoTL22ibJOdAPyb4CmaA&signed_in=true&callback=initMap"
    async defer>

</script>
<script>
    //first set the cookie when the widget is selected
    //then ask to a php to change the position of the widget
    var traffic = "traffic";
    $("#" + traffic)
        .mousedown(function () {
            document.cookie = "currentWidget=" + traffic;
        })
        .mouseup(function () {
            setTimeout(function(){
                var left = $("#" + traffic).css("left");
                var top = $("#" + traffic).css("top");
                $.ajax({
                    url: 'setWidgetPosition.php',
                    data: {currentWidget: traffic, left: left, top: top}
                });
            }, 100);

        });
</script>



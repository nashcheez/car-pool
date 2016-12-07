function initMap() {
    var bounds = new google.maps.LatLngBounds;
    var markersArray = [];
    var data = [{
        origin: {
            lat: 12.9354504, // Koramangala
            lng: 77.6146828
        },
        destination: {
            lat: 12.9729594, // Indiranagar
            lng: 77.6295003
        },
        startTime: new Date(),
        endTime: new Date(new Date().getTime() + (60000 * 30))
    }, {
        origin: {
            lat: 12.9630167, // domlur
            lng: 77.6268656
        },
        destination: {
            lat: 12.9730247, // mg road
            lng: 77.6144708
        },
        startTime: new Date(new Date().getTime() + (60000 * 23)),
        endTime: new Date(new Date().getTime() + (60000 * 80))
    }];


    var origin1 = data[0].origin,
        origin2 = data[1].origin,
        destinationA = data[0].destination,
        destinationB = data[1].destination,
        pointsArr = ["Origin 1", "Origin 2", "Destination A", "Destination B"];

    var totalDistance = [],
        totalTime = [],
        outputArr = [];


    var destinationIcon = 'https://chart.googleapis.com/chart?' +
        'chst=d_map_pin_letter&chld=D|FF0000|000000';
    var originIcon = 'https://chart.googleapis.com/chart?' +
        'chst=d_map_pin_letter&chld=O|FFFF00|000000';
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10
    });


    var geocoder = new google.maps.Geocoder;
    var service = new google.maps.DistanceMatrixService;
    service.getDistanceMatrix({
        origins: [origin1, origin2, destinationA, destinationB],
        destinations: [origin1, origin2, destinationA, destinationB],
        travelMode: 'DRIVING',
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
    }, function(response, status) {
        if (status !== 'OK') {
            alert('Error was: ' + status);
        } else {
            var originList = response.originAddresses;
            var destinationList = response.destinationAddresses;
            var outputDiv = document.getElementById('output');
            outputDiv.innerHTML = '';

            // Possible outcomes:
            // 12AB
            // 12BA
            // 21AB
            // 21BA
            // 1A2B
            // 2B1A

            var dur1, dur2, dur3;

            for (var i = 0; i < 2; i++) {
                for (var j = 0; j < 4; j++) {
                    if (j != i && !(i == 0 && j == 3) && !(i == 1 && j == 2)) {
                        for (var k = 0; k < 4; k++) {
                            if (k != j && k != i) {
                                for (var m = 2; m < 4; m++) {
                                    if (m != k && m != j && m != i) {

                                        dur1 = addSeconds(data[i].startTime, response.rows[i].elements[j].duration.value);
                                        dur2 = addSeconds(dur1, response.rows[j].elements[k].duration.value);
                                        dur3 = addSeconds(dur2, response.rows[k].elements[m].duration.value);
                                        if (j != 2 && j != 3) {
                                            // 12AB, 12BA,21AB,21BA
                                            if (dur1 > data[j].startTime && dur2 < data[k - 2].endTime && dur3 < data[m - 2].endTime) {
                                                totalDistance.push(response.rows[i].elements[j].distance.value + response.rows[j].elements[k].distance.value + response.rows[k].elements[m].distance.value);

                                                console.log(i + "" + j + "" + k + "" + m);

                                                totalTime.push(Math.abs(dur3 - data[i].startTime));

                                                outputArr.push("Route: " + pointsArr[i] + " -> " + pointsArr[j] + " -> " + pointsArr[k] + " -> " + pointsArr[m] + " <br><br> " + originList[i] + ' to ' + originList[j] +
                                                    ': ' + response.rows[i].elements[j].distance.text + ' in ' +
                                                    response.rows[i].elements[j].duration.text + '<br><br>' + originList[j] + ' to ' + originList[k] +
                                                    ': ' + response.rows[j].elements[k].distance.text + ' in ' +
                                                    response.rows[k].elements[k].duration.text + '<br><br>' + originList[k] + ' to ' + originList[m] +
                                                    ': ' + response.rows[k].elements[m].distance.text + ' in ' +
                                                    response.rows[k].elements[m].duration.text + '<br><br>' + "Total distance: " + (response.rows[i].elements[j].distance.value + response.rows[j].elements[k].distance.value + response.rows[k].elements[m].distance.value) / 1000 + " kms" + '<br><br>' + "Total Time: " + ((Math.abs(dur3 - data[i].startTime)) / 60000) + " mins");
                                            }
                                        } else {
                                            // 1A2B, 2B1A
                                            if (dur1 < data[j - 2].endTime && dur2 > data[k].startTime && dur3 < data[m - 2].endTime) {
                                                totalDistance.push(response.rows[i].elements[j].distance.value + response.rows[j].elements[k].distance.value + response.rows[k].elements[m].distance.value);

                                                console.log(i + "" + j + "" + k + "" + m);

                                                totalTime.push(Math.abs(dur3 - data[i].startTime));

                                                outputArr.push("Route: " + pointsArr[i] + " -> " + pointsArr[j] + " -> " + pointsArr[k] + " -> " + pointsArr[m] + " <br><br> " + originList[i] + ' to ' + originList[j] +
                                                    ': ' + response.rows[i].elements[j].distance.text + ' in ' +
                                                    response.rows[i].elements[j].duration.text + '<br><br>' + originList[j] + ' to ' + originList[k] +
                                                    ': ' + response.rows[j].elements[k].distance.text + ' in ' +
                                                    response.rows[k].elements[k].duration.text + '<br><br>' + originList[k] + ' to ' + originList[m] +
                                                    ': ' + response.rows[k].elements[m].distance.text + ' in ' +
                                                    response.rows[k].elements[m].duration.text + '<br><br>' + "Total distance: " + (response.rows[i].elements[j].distance.value + response.rows[j].elements[k].distance.value + response.rows[k].elements[m].distance.value) / 1000 + " kms" + '<br><br>' + "Total Time: " + ((Math.abs(dur3 - data[i].startTime)) / 60000) + " mins");
                                            }
                                        }

                                    }
                                }
                            }
                        }
                    }
                }
            }

            var shortestDistance = Array.min(totalDistance);
            var shortestDistanceKey = totalDistance.indexOf(shortestDistance);

            outputDiv.innerHTML += outputArr[shortestDistanceKey];

            deleteMarkers(markersArray);

            var showGeocodedAddressOnMap = function(asDestination) {
                var icon = asDestination ? destinationIcon : originIcon;
                return function(results, status) {
                    if (status === 'OK') {
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



            for (var i = 0; i < originList.length - 2; i++) {
                var results = response.rows[i].elements;
                geocoder.geocode({ 'address': originList[i] },
                    showGeocodedAddressOnMap(false));
                for (var j = 0; j < results.length; j++) {
                    if (j != i) {
                        geocoder.geocode({ 'address': destinationList[j] },
                            showGeocodedAddressOnMap(true));
                    }
                }
            }
        }
    });
}

Array.min = function(array) {
    return Math.min.apply(Math, array);
};

function addSeconds(date, secs) {
    return new Date(date.getTime() + secs * 1000);
}

function deleteMarkers(markersArray) {
    for (var i = 0; i < markersArray.length; i++) {
        markersArray[i].setMap(null);
    }
    markersArray = [];
}

function initMap() {
    //init lat lng
    var geoCode = {
        lat: 21.036237,
        lng: 105.790583
    };
    //
    var directionsService = new google.maps.DirectionsService();

    //init map
    var element = document.getElementById('map'); // chỉ ra element cần tạo
    var map = new google.maps.Map(element, {
        zoom: 12,
        center: geoCode,

    });

    // marker
    var marker = new google.maps.Marker({
        map: map,
        position: geoCode
    });
    /// add test list fire station

    var listMarker = [{
            lat: 21.0345190208582,
            lng: 105.78254699707
        },
        {
            lat: 21.0466353629359,
            lng: 105.804948806763
        },
        {
            lat: 21.0374029999189,
            lng: 105.774221420288
        },
    ]
    listMarker.forEach(element => {
        var marker = new google.maps.Marker({
            map: map,
            position: element,
            animation: google.maps.Animation.DROP,
            icon: {
                url: "fire-station.svg",
                scaledSize: {
                    width: 35,
                    height: 35
                }
            }
        });

    });



    ////  sussget textbox
    var input = document.getElementById("textLocation")
    var autocomplete = new google.maps.places.Autocomplete(input);
    // textbox changed
    autocomplete.addListener('place_changed', function () {
        var place = autocomplete.getPlace();

        if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17); // Why 17? Because it looks good.
        }
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);

        console.log(marker.getPosition().lat());
        console.log(marker.getPosition().lng());

    })

    // end susgest textbox  

    // add marker on click

    var listColor = ['#FF0000', '#1582ff', '#00ff0d']
    var indexColor = 0;
    google.maps.event.addListener(map, 'click', function (event) {
        placeMarker(event.latLng);
    });

    function placeMarker(location) {
        //  var marker = new google.maps.Marker({
        //      position: location, 
        //      map: map
        //  });

        listMarker.forEach(element => {
            marker.setPosition(location);
            marker.setVisible(true);

            console.log(marker.getPosition().lat());
            console.log(marker.getPosition().lng());

            var polylineOptionsActual = new google.maps.Polyline({
                strokeColor: listColor[indexColor],
                strokeOpacity: 1.0,
                strokeWeight: 5
            });
            var directionsDisplay = new google.maps.DirectionsRenderer({
                polylineOptions: polylineOptionsActual
            });
            var request = {
                origin: {
                    lat: marker.getPosition().lat(),
                    lng: marker.getPosition().lng()
                },
                destination: element,
                travelMode: 'DRIVING'
            };
            directionsService.route(request, function (response, status) {
                if (status == 'OK') {
                    directionsDisplay.setDirections(response);
                }
            });
            directionsDisplay.setMap(map)
            indexColor++;
        });



    }
    // test calucation distance
    $('#distance').click(function () {
        var latitude1 = 21.0345190208582;
        var longitude1 = 105.78254699707;
        var latitude2 = 21.0466353629359;
        var longitude2 = 105.804948806763;

        var distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(latitude1, longitude1), new google.maps.LatLng(latitude2, longitude2));
        alert(distance);
    });




    // path
    // var polylineOptionsActual = new google.maps.Polyline({
    //     strokeColor: '#FF0000',
    //     strokeOpacity: 1.0,
    //     strokeWeight: 5
    //     });
    // var directionsDisplay = new google.maps.DirectionsRenderer({polylineOptions: polylineOptionsActual});
    // var request = {
    //     origin: {lat:21.081121, lng:105.818031},
    //     destination: {lat:21.036237,lng:105.790583},
    //     travelMode: 'DRIVING'
    // };
    // directionsService.route(request, function (response, status) {
    //     if (status == 'OK') {
    //         directionsDisplay.setDirections(response);
    //     }
    // });
    // directionsDisplay.setMap(map)
}
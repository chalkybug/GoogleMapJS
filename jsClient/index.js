function initMap() {
    var geoCode = {
        lat: 21.036237,
        lng: 105.790583
    };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: geoCode,
    });
    var geocoder = new google.maps.Geocoder;
    var infowindow = new google.maps.InfoWindow;
    /// thêm vào sự kiện dbclick
    document.getElementById('submit').addEventListener('click', function () {
        //geocodeLatLng(geocoder, map, infowindow);
        var input = document.getElementById('latlng').value;
        var latlngStr = input.split(',', 2);
        var latlng = {
            lat: parseFloat(latlngStr[0]),
            lng: parseFloat(latlngStr[1])
        };
        geocoder.geocode({
            'location': latlng
        }, function (results, status) {
            if (status === 'OK') {
                if (results[0]) {
                    map.setZoom(15);
                    // var marker = new google.maps.Marker({
                    //     position: latlng,
                    //     map: map
                    // });
                    marker.setPosition(location);
                    infowindow.setContent(results[0].formatted_address);
                    console.log(results[0].formatted_address);
                    // fill text box
                    var fullAddress = results[0].formatted_address;
                    var arrAddress = fullAddress.split(',');
                    //
                    let res="";
                    console.log(res);
                    
                    for (let index = 0; index < arrAddress.length - 3; index++) {
                        const element = arrAddress[index];
                        res += element + ', '
                    }
                    //
                    $('#txtAddress').val(res);
                    $('#txtCounty').val(arrAddress[arrAddress.length - 3]);
                    $('#txtCity').val(arrAddress[arrAddress.length - 2]);

                    infowindow.open(map, marker);
                } else {
                    window.alert('No results found');
                }
            } else {
                window.alert('Geocoder failed due to: ' + status);
            }
        });
    });


    



    // add event click
    var marker = new google.maps.Marker({
        position: geocoder,
        map: map
    });
    marker.setVisible(false)
    google.maps.event.addListener(map, 'click', function (event) {
        placeMarker(event.latLng);
    });

    function placeMarker(location) {
        marker.setPosition(location);
        let lat = marker.getPosition().lat();
        let lng = marker.getPosition().lng()
        $('#latlng').val(lat + ',' + lng);
        marker.setVisible(true)
    }


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



}


function geocodeLatLng(geocoder, map, infowindow) {

}
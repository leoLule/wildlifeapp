function getLocation() {
    var locationInput = document.getElementById("locationInput");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                var latitude = position.coords.latitude;
                var longitude = position.coords.longitude;

                locationInput.value = latitude + ", " + longitude;
            },
            function (error) {
                console.error("Error retrieving location:", error);
            }
        );
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
}

getLocation();
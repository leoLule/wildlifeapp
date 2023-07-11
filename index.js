function getLocation() {
    let locationInput = document.getElementById("locationInput");
    navigator.geolocation.getCurrentPosition(
        function (position) {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;

            locationInput.value = latitude + ", " + longitude;
        },
        function (error) {
            console.error("Error retrieving location:", error);
        }
    );

}

getLocation();
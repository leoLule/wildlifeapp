//TODO: when click on button add picture add picture to gallery
//- save in local storages, how to remove/edit pic?
//- add description of observations:what shall it contain ?
//- maybe as a card design with a small pic on top and a short description below and if i click on the description you can edit the card

// Get references to the gallery container and images
function getLocation() {
  let locationInput = document.getElementById("locationInput");
  navigator.geolocation.getCurrentPosition(
    function (position) {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;

      locationInput.value = latitude + ", " + longitude;
      getLocationName(latitude, longitude);
    },
    function (error) {
      console.error("Error retrieving location:", error);
    }
  );
}

const apiKey = "AIzaSyBl-lr2Ba9AGX5fBY3eXCTfHg3H8uwNds4";
function getLocationName(latitude, longitude) {
  let apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      let locationName = data.results[0].formatted_address;
      console.log(locationName);
      locationInput.value = locationName;
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}

getLocation();

let data = [];

let savedData = localStorage.getItem("savedData");
if (savedData !== null) {
  data = JSON.parse(savedData);
}

const galleryContainer = document.getElementById("gallery");
const images = galleryContainer.getElementsByTagName("img");

// Add click event listener to each image
for (let i = 0; i < images.length; i++) {
  images[i].addEventListener("click", function () {
    displayImage(i);
  });
}

// Function to display clicked image in a larger view
function displayImage(index) {
  // Create a modal or lightbox to display the image in a larger view
  // Example: Create a modal div and append the clicked image to it
  const modal = document.createElement("div");
  modal.classList.add("modal");

  const image = document.createElement("img");
  image.src = images[index].src;
  image.alt = images[index].alt;

  modal.appendChild(image);
  document.body.appendChild(modal);

  // Add event listener to close the modal when clicked
  modal.addEventListener("click", function () {
    modal.remove();
  });
}

//select html divs/inputs
const grabSubmit = document.querySelector("#submit-btn");
const grabFlora = document.querySelector("#flora-input");
const grabLocation = document.querySelector("#locationInput");
const grabNotes = document.querySelector("#comment");
const output = document.getElementById("output");
const outputLocation = document.getElementById("output-location");
const outputNote = document.getElementById("output-note");

function addFlora() {
  const flora = grabFlora.value;
  const divElement = document.createElement("div");
  divElement.className = "myDiv";
  divElement.innerHTML = flora;
  data.push({
    flora: flora,
  });
  localStorage.setItem("savedData", JSON.stringify(data));

  output.appendChild(divElement);
}
function addNote() {
  const note = grabNotes.value;
  const divElement = document.createElement("div");
  divElement.className = "myDiv";
  divElement.innerHTML = note;
  data.push({
    note: note,
  });
  localStorage.setItem("savedData", JSON.stringify(data));
  outputNote.appendChild(divElement);
}
function addLocation() {
  const location = grabLocation.value;
  const divElement = document.createElement("div");
  divElement.className = "myDiv";
  divElement.innerHTML = location;
  outputLocation.appendChild(divElement);
}
function addFile() {
  // Get the selected files
  const selectedFiles = picButton.files;

  // Iterate over each selected file
  for (let i = 0; i < selectedFiles.length; i++) {
    const file = selectedFiles[i];

    // Create an image element
    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    img.alt = file.name;

    // Append the image element to the gallery container
    gallery.appendChild(img);
  }
}
//on submit/click
grabSubmit.addEventListener("click", function () {
  addFile();
  addFlora();
  addLocation();
  addNote();
  // gallery.innerHTML = ""; if we want to empty the existing gallery
});
function displayDataFromLocalStorage() {
  for (let i = 0; i < data.length; i++) {
    const divElement = document.createElement("div");
    divElement.className = "myDiv";
    divElement.innerText = data[i].flora;
    output.appendChild(divElement);
  }
}
function displayNotesFromStorage() {
  for (let i = 0; i < data.length; i++) {
    const divElement = document.createElement("div");
    divElement.className = "myDiv";
    divElement.innerText = data[i].note;
    output.appendChild(divElement);
  }
}

window.addEventListener("DOMContentLoaded", function () {
  displayDataFromLocalStorage();
  displayNotesFromStorage();
});

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
const outputFlora = document.getElementById("output-flora");
const outputLocation = document.getElementById("output-location");
const outputNote = document.getElementById("output-note");
const picButton = document.querySelector("#picButton");
const gallery = document.querySelector("#gallery");

function addFlora() {
  const flora = grabFlora.value;
  const divElement = document.createElement("div");
  divElement.className = "myDiv";
  divElement.innerHTML = flora;
  floraData.push({
    flora: flora,
  });
  localStorage.setItem("savedFloraData", JSON.stringify(floraData));
  outputFlora.appendChild(divElement);
}
function addNote() {
  const note = grabNotes.value;
  const divElement = document.createElement("div");
  divElement.className = "myDiv";
  divElement.innerHTML = note;
  noteData.push({
    note: note,
  });
  localStorage.setItem("savedNoteData", JSON.stringify(noteData));
  outputNote.appendChild(divElement);
}
function addLocation() {
  const location = grabLocation.value;
  const divElement = document.createElement("div");
  divElement.className = "myDiv";
  divElement.innerHTML = location;
  locationData.push({
    location: location,
  });
  localStorage.setItem("savedLocationData", JSON.stringify(locationData));
  outputLocation.appendChild(divElement);
}


function addImage() {
  const slectedImages = picButton.files;

  for (let i = 0; i < slectedImages.length; i++) {
    const image = slectedImages[i];
    const img = document.createElement("img");
    img.src = URL.createObjectURL(image);
    img.alt = image.name;
    gallery.appendChild(img);

    // Store the image URL in an array
    imageURLs.push(img.src);
  }

  // Save the image URLs to local storage
  localStorage.setItem("savedImageURLs", JSON.stringify(imageURLs));
}

//on submit/click
grabSubmit.addEventListener("click", function () {
  addImage();
  addFlora();
  addLocation();
  addNote();
  // gallery.innerHTML = ""; if we want to empty the existing gallery
});

//set & get local storage for flora
let floraData = [];
let savedFloraData = localStorage.getItem("savedFloraData");
if (savedFloraData !== null) {
  floraData = JSON.parse(savedFloraData);
}
function displayFloraFromStorage() {
  for (let i = 0; i < floraData.length; i++) {
    let divElement = document.createElement("div");
    divElement.className = "myDiv";
    divElement.innerText = floraData[i].flora;
    outputFlora.appendChild(divElement);
  }
}

//set & get local storage for notes
let noteData = [];
let savedNoteData = localStorage.getItem("savedNoteData");
if (savedNoteData !== null) {
  noteData = JSON.parse(savedNoteData);
}
function displayNotesFromStorage() {
  for (let i = 0; i < noteData.length; i++) {
    let divElement = document.createElement("div");
    divElement.className = "myDiv";
    divElement.innerText = noteData[i].note;
    outputNote.appendChild(divElement);
  }
}
//set & get local storage for location
let locationData = [];
let savedLocationData = localStorage.getItem("savedLocationData");
if (savedLocationData !== null) {
  locationData = JSON.parse(savedLocationData);
}
function displayLocationFromStorage() {
  for (let i = 0; i < locationData.length; i++) {
    let divElement = document.createElement("div");
    divElement.className = "myDiv";
    divElement.innerText = locationData[i].location;
    outputLocation.appendChild(divElement);
  }
}
let imageURLs = [];

function displayImageFromStorage() {
  // Retrieve the stored image URLs from local storage
  const savedImageURLs = localStorage.getItem("savedImageURLs");

  if (savedImageURLs !== null) {
    const imageURLs = JSON.parse(savedImageURLs);

    // Display the stored images in the gallery
    for (let i = 0; i < imageURLs.length; i++) {
      const img = document.createElement("img");
      img.src = imageURLs[i];
      img.alt = "Image " + (i + 1);
      gallery.appendChild(img);
    }
  }
}
window.addEventListener("DOMContentLoaded", function () {
  displayFloraFromStorage();
  displayNotesFromStorage();
  displayLocationFromStorage();
  displayImageFromStorage();
});

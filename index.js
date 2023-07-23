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

const grabSubmit = document.querySelector("#submit-btn");
const grabFlora = document.querySelector("#flora-input");
const grabLocation = document.querySelector("#locationInput");
const grabNotes = document.querySelector("#comment");
const picButton = document.querySelector("#picButton");
const gallery = document.querySelector("#gallery");
const galleryWrapper = document.querySelector(".gallery-wrapper");
function addExperienceDiv() {
  const experienceDiv = document.createElement("div");
  experienceDiv.className = "experienceDiv";
  galleryWrapper.appendChild(experienceDiv);
  return experienceDiv;
}
function divCreation() {
  const divElement = document.createElement("div");
  divElement.className = "outputDiv";
  return divElement;
}
function imgDivCreation() {
  const imgDivElement = document.createElement("div");
  imgDivElement.className = "imgDiv";
  return imgDivElement;
}
let floraData = [];
let savedFloraData = localStorage.getItem("savedFloraData");
let noteData = [];
let savedNoteData = localStorage.getItem("savedNoteData");
let locationData = [];
let savedLocationData = localStorage.getItem("savedLocationData");
let imageURLs = [];
let savedImageURLs = localStorage.getItem("savedImageURLs");

function addFlora(parentElement) {
  const flora = grabFlora.value;
  const divElement = divCreation();
  divElement.innerHTML = flora;
  floraData.push({
    flora: flora,
    location: location,
    note: note,
    // image: URL.createObjectURL(image),
  });
  localStorage.setItem("savedFloraData", JSON.stringify(floraData));
  parentElement.appendChild(divElement);
}
function addNote(parentElement) {
  const note = grabNotes.value;
  const divElement = divCreation();
  divElement.innerHTML = note;
  noteData.push({
    note: note,
  });
  localStorage.setItem("savedNoteData", JSON.stringify(noteData));
  parentElement.appendChild(divElement);
}
function addLocation(parentElement) {
  const location = grabLocation.value;
  const divElement = divCreation();
  divElement.innerHTML = location;
  locationData.push({
    location: location,
  });
  localStorage.setItem("savedLocationData", JSON.stringify(locationData));
  parentElement.appendChild(divElement);
}

function addImage() {
  const slectedImages = picButton.files;

  for (let i = 0; i < slectedImages.length; i++) {
    const image = slectedImages[i];
    const img = document.createElement("img");
    img.src = URL.createObjectURL(image);
    img.alt = image.name;
    imgDivElement.appendChild(img);
    parentElement.appendChild(imgDivElement);
    imageURLs.push(img.src);
  }
  localStorage.setItem("savedImageURLs", JSON.stringify(imageURLs));
}

grabSubmit.addEventListener("click", function () {
  const experienceDiv = addExperienceDiv();
  addImage(experienceDiv);
  addFlora(experienceDiv);
  addLocation(experienceDiv);
  addNote(experienceDiv);
});
function displayFromStorage() {
  if (savedFloraData !== null) {
    floraData = JSON.parse(savedFloraData);
  }
  if (savedNoteData !== null) {
    noteData = JSON.parse(savedNoteData);
  }
  if (savedLocationData !== null) {
    locationData = JSON.parse(savedLocationData);
  }
  if (savedImageURLs !== null) {
    imageURLs = JSON.parse(savedImageURLs);
  }
  for (let i = 0; i < floraData.length; i++) {
    const experienceDiv = addExperienceDiv();

    const imgDivElement = imgDivCreation();
    const img = document.createElement("img");
    img.src = imageURLs[i];
    imgDivElement.appendChild(img);
    experienceDiv.appendChild(imgDivElement);

    const floraElement = document.createElement("div");
    floraElement.className = "outputDiv";
    floraElement.innerText = floraData[i].flora;
    experienceDiv.appendChild(floraElement);

    const locationElement = document.createElement("div");
    locationElement.className = "outputDiv";
    locationElement.innerText = locationData[i].location;
    experienceDiv.appendChild(locationElement);

    const noteElement = document.createElement("div");
    noteElement.className = "outputDiv";
    noteElement.innerText = noteData[i].note;
    experienceDiv.appendChild(noteElement);
  }
}
window.addEventListener("DOMContentLoaded", function () {
  displayFromStorage();
});

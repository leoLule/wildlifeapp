// Get references to the gallery container and images
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

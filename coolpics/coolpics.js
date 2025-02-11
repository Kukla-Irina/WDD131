// Hiding and showing menu
const menuButton = document.querySelector(".menu-button");
function toggleMenu() {
  const menu = document.querySelector(".menu");
  menu.classList.toggle("hide");
}

menuButton.addEventListener("click", toggleMenu);

// Handling a window resize
function handleResize() {
  const menu = document.querySelector(".menu");
  if (window.innerWidth > 1000) {
    menu.classList.remove("hide");
  } else {
    menu.classList.add("hide");
  }
}

handleResize();
window.addEventListener("resize", handleResize);

//   function viewerTemplate(pic, alt) {
//     return `<div class="viewer">
//       <button class="close-viewer">X</button>
//       <img src="${pic}" alt="${alt}">
//       </div>`;
//   }

function viewHandler(event) {
  // Create a variable to hold the element that was clicked on from event.target
  const clickedElement = event.target;

  // Get the src attribute from that element and 'split' it on the "-"
  const srcParts = clickedElement.src.split("-");

  // Construct the new image file name by adding "-full.jpeg" to the first part of the array
  const fullImageSrc = clickedElement.src.replace("-sm", "-full");

  // Create the viewer template
  const viewerTemplate = `<div class="viewer">
      <button class="close-viewer">X</button>
      <img src="${fullImageSrc}" alt="picture">
      </div>`;

  // Insert the viewerTemplate into the top of the body element
  document.body.insertAdjacentHTML("afterbegin", viewerTemplate);

  // Add a listener to the close button (X) that calls a function called closeViewer when clicked
  const closeViewerButton = document.querySelector(".close-viewer");
  closeViewerButton.addEventListener("click", closeViewer);
}

// Close viewer function
function closeViewer() {
  const viewer = document.querySelector(".viewer");
  if (viewer) {
    viewer.remove(); // Remove the viewer div from the DOM
  }
}

// Add event listener to the .gallery section
const gallery = document.querySelector(".gallery");
gallery.addEventListener("click", viewHandler);

// First page:
// Function to save the image for later
function saveForLater(event) {
  // Get the target button that was clicked
  const targetButton = event.target;
  // Get the parent node of the target button
  const parentNode = targetButton.parentNode;
  // Get the 'a' tag within the parent node
  const aTag = parentNode.querySelector("a");
  // Get the URL of the image from the 'a' tag
  const imageUrl = aTag.getAttribute("href");
  // Store the image URL in session storage
  // Save the id and url of the clicked button's link into session storage
  sessionStorage.setItem(aTag.id, imageUrl);

  alert(
    `Item saved. Total items in your 'Save for Later' page: ${
      Object.keys(sessionStorage).length
    }`
  );
}

const buttons = document.querySelectorAll(".saveForLater");
buttons.forEach((button) => {
  button.addEventListener("click", saveForLater);
});

const galleryImages = document.querySelectorAll(".galleryImage");

galleryImages.forEach((image) => {
  const likeButton = image.querySelector(".like");
  const imageId = image.querySelector("a").getAttribute("id");

  // Get the number of likes for this image from local storage, or default to 0
  let likes = parseInt(localStorage.getItem(`${imageId}-likes`)) || 0;

  // Update the like button text to show the current number of likes
  likeButton.textContent = `Like (${likes})`;

  // Add an event listener for when the like button is clicked
  likeButton.addEventListener("click", () => {
    // Increment the number of likes for this image
    likes++;

    // Save the updated number of likes to local storage
    localStorage.setItem(`${imageId}-likes`, likes);

    // Update the like button text to show the new number of likes
    likeButton.textContent = `Like (${likes})`;
  });
});

// Second page:
function onNewGalleryLoad() {
  // Get an array of all the image URLs that have been saved for later
  const savedImageUrls = Object.values(sessionStorage);

  // Create an unordered list (ul) element
  const ul = document.createElement("ul");

  // Loop through all the saved image URLs
  for (let i = 0; i < savedImageUrls.length; i++) {
    // Create a list item (li) element
    const li = document.createElement("li");

    // Create an anchor (a) element
    const a = document.createElement("a");

    // Set the href of the anchor to the URL of the saved image
    a.href = savedImageUrls[i];

    // Set the text of the anchor to the URL of the saved image
    a.innerText = savedImageUrls[i];

    // Set the target of the anchor to "_blank" to open the link in a new tab
    a.target = "_blank";

    // Append the anchor to the list item
    li.appendChild(a);

    // Append the list item to the unordered list
    ul.appendChild(li);
  }

  // Append the unordered list to the body of the page
  document.body.appendChild(ul);
}

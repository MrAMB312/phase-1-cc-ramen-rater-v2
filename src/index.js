// index.js

// Callbacks
const handleClick = (ramen) => {
  // Add code

  // Select the ramen-detail div to display ramen info
  const ramenDetail = document.getElementById('ramen-detail');

  // Update details in the ramen-detail div
  ramenDetail.querySelector('.detail-image').src = ramen.image;
  ramenDetail.querySelector('.name').textContent = ramen.name;
  ramenDetail.querySelector('.restaurant').textContent = ramen.restaurant;
  document.getElementById('rating-display').textContent = ramen.rating;
  document.getElementById('comment-display').textContent = ramen.comment;
};

const addSubmitListener = () => {
  // Add code

  // Select new-ramen form to post new ramen info
  const newRamenForm = document.getElementById('new-ramen');

  newRamenForm.addEventListener('submit', (event) => {
    // Prevent submit button from refreshing the page
    event.preventDefault();

    const ramenName = event.target['new-name'].value.trim();
    const ramenRestaurant = event.target['new-restaurant'].value.trim();
    const ramenImage = event.target['new-image'].value.trim();
    const ramenRating = event.target['new-rating'].value.trim();
    const ramenComment = event.target['new-comment'].value.trim();

    // Create object for new data
    const newRamen = {
      name: ramenName,
      restaurant: ramenRestaurant,
      image: ramenImage,
      rating: ramenRating,
      comment: ramenComment,
    };

    const ramenMenu = document.getElementById('ramen-menu');
    const ramenImageElement = document.createElement('img');
    ramenImageElement.src = newRamen.image;

    ramenImageElement.addEventListener('click', () => handleClick(newRamen));

    ramenMenu.appendChild(ramenImageElement);

    newRamenForm.reset();
  })
}

const displayRamens = () => {
  // Add code

  // Fetch data from server
  fetch('http://localhost:3000/ramens')
    .then(response => response.json())
    .then(ramens => {
      const ramenMenu = document.getElementById('ramen-menu');

      // Iterate through the ramen objects and create img elements
      ramens.forEach(ramen => {
        const ramenImage = document.createElement('img');

        ramenImage.src = ramen.image;
        
        // Add click event for each unique ramen image
        ramenImage.addEventListener('click', () => handleClick(ramen));

        // Append img element to the ramen-menu div
        ramenMenu.appendChild(ramenImage);
      })
    })
    .catch(error => {
      console.error('Error fetching ramen data:', error);
    })
};

const main = () => {
  // Invoke displayRamens here
  // Invoke addSubmitListener here

  document.addEventListener('DOMContentLoaded', () => {
    displayRamens();
    addSubmitListener();
  })
}

main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};

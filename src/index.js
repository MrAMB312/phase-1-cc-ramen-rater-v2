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

    const ramenName = event.target.name.value;
    const ramenRestaurant = event.target.restaurant.value;
    const ramenImage = event.target.image.value;
    const ramenRating = event.target.rating.value;
    const ramenComment = event.target.comment.value;

    // Create object for new data
    const ramenData = {
      name: ramenName,
      restaurant: ramenRestaurant,
      image: ramenImage,
      rating: ramenRating,
      comment: ramenComment,
    };

    // Send a POST request to server
    fetch('http://localhost:3000/ramens', {
      method: 'POST',
      headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(ramenData),
    })
      .then(response => response.json())
      .then(newRamen => {
        const ramenMenu = document.getElementById('ramen-menu');

        const card = document.createElement('div');
        card.classList.add('card');

        const img = document.createElement('img');
        img.src = newRamen.image;
        img.classList.add('detail-image');

        const h2 = document.createElement('h2');
        h2.textContent = newRamen.name;

        const h3 = document.createElement('h3');
        h3.textContent = newRamen.restaurant;

        const span = document.createElement('span');
        span.textContent = newRamen.rating;

        const p = document.createElement('p');
        p.textContent = newRamen.comment;

        card.append(img, h2, h3, span, p);

        ramenMenu.appendChild(card);

        newRamenForm.reset();
      })

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
        ramenImage.alt = ramen.name;

        // Add click event for each unique ramen image
        ramenImage.addEventListener('click', () => handleClick(ramen));
        
        // Append img elmenet to the ramen-menu div
        ramenMenu.appendChild(ramenImage);
      });
    })
    .catch(error => {
      console.error('Error fetching ramen data:', error);
    });

}

const main = () => {
  // Invoke displayRamens here
  // Invoke addSubmitListener here

  document.addEventListener('DOMContentLoaded', () => {
    displayRamens();
    addSubmitListener();
  });
}

main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};

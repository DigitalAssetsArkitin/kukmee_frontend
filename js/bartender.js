document.getElementById('choose-drinks').addEventListener('click', function() {
    // Show the drink options div
    document.getElementById('drink-options').style.display = 'block';

    // Optionally, you could also hide the button after clicking
    this.style.display = 'none';
});










document.getElementById('choose-drinks').addEventListener('click', function () {
    document.getElementById('drink-options').style.display = 'block';
});

document.getElementById('add-to-cart').addEventListener('click', function () {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const eventDate = document.getElementById('event-date').value;
    const city = document.getElementById('city').value;
    const budget = document.getElementById('budget').value;
    const eventType = document.getElementById('event-type').value;
    const guests = document.getElementById('guests').value;

    const selectedDrinks = [];
    const drinkCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    let totalAmount = 0;

    drinkCheckboxes.forEach(checkbox => {
        selectedDrinks.push(checkbox.value);
        totalAmount += parseFloat(checkbox.getAttribute('data-rate'));
    });

    let modalContent = `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Event Date:</strong> ${eventDate}</p>
        <p><strong>City:</strong> ${city}</p>
        <p><strong>Budget:</strong> $${budget}</p>
        <p><strong>Event Type:</strong> ${eventType}</p>
        <p><strong>Number of Guests:</strong> ${guests}</p>
        <p><strong>Selected Drinks:</strong> ${selectedDrinks.length > 0 ? selectedDrinks.join(', ') : 'None'}</p>
        <p><strong>Total Amount:</strong> $${totalAmount}</p>
    `;

    document.getElementById('modal-content').innerHTML = modalContent;
    const modal = new bootstrap.Modal(document.getElementById('cartModal'));
    modal.show();

    // Reset input fields
    document.getElementById('name').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('event-date').value = '';
    document.getElementById('city').value = '';
    document.getElementById('budget').value = '';
    document.getElementById('event-type').value = '';
    document.getElementById('guests').value = '';

    // Reset checkboxes
    drinkCheckboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
});









function changeQuantity(drink, change) {
    const quantityElement = document.getElementById(`${drink}-quantity`);
    let currentQuantity = parseInt(quantityElement.innerText);

    // Adjust the quantity based on the button clicked
    currentQuantity += change;

    // Prevent negative quantities
    if (currentQuantity < 0) {
        currentQuantity = 0;
    }

    // Update the displayed quantity
    quantityElement.innerText = currentQuantity;

    // Update checkbox state based on quantity
    const checkbox = document.getElementById(drink);
    if (currentQuantity > 0) {
        checkbox.checked = true;
    } else {
        checkbox.checked = false;
    }
}
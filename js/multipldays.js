
// Function to open the modal for "For Multiple Days" image click
function openChefModal() {

    // Ensure all other modals are hidden
    document.querySelectorAll('.modal').forEach(modal => {
        var modalInstance = bootstrap.Modal.getInstance(modal);
        if (modalInstance) {
            modalInstance.hide();
        }
    });

    var myModal = new bootstrap.Modal(document.getElementById('chefModal1'));
    myModal.show();
}

// Update total amount when number of days is changed
function updateAmount() {
    // Get input values
    var days = parseInt(document.getElementById('daysInput').value) || 0; // Default to 0 if input is empty
    var amountPerDay = parseInt(document.getElementById('amountInput').value) || 1000; // Default to 1000 if empty

    // Calculate total amount
    var totalAmount = days * amountPerDay;

    // Update the total amount field displayed in the span
    document.getElementById('dayTotalAmount').innerText = totalAmount.toString(); // Convert to string for display
}

// Handle form submission and send data to backend
document.getElementById('chefForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get input values
    var days = parseInt(document.getElementById('daysInput').value) || 0;
    var people = parseInt(document.getElementById('peopleInput').value) || 0;
    var totalAmount = parseInt(document.getElementById('dayTotalAmount').innerText) || 0;

    // Validate form data
    if (days < 1 || people < 1 || totalAmount <= 0) {
        alert('Please fill all fields with valid values.');
        return;
    }

    // Prepare data to send to the backend
    var data = {
        days: days,
        people: people,
        totalAmount: totalAmount
    };

    // Send data to the backend using Fetch API
    fetch('/save-order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())  // Assuming the backend returns a JSON response
        .then(data => {
            console.log('Success:', data);
            alert('Data saved successfully!');

            // Reset the form and the total amount
            document.getElementById('chefForm').reset();
            document.getElementById('dayTotalAmount').innerText = '0';

            // Close the modal after submission
            var myModal = bootstrap.Modal.getInstance(document.getElementById('chefModal1'));
            myModal.hide();
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Error saving data!');
        });
});

// Reset form and total amount when the modal is closed
document.getElementById('chefModal1').addEventListener('hidden.bs.modal', function () {
    document.getElementById('chefForm').reset(); // Reset the form
    document.getElementById('dayTotalAmount').innerText = '0'; // Reset total amount display
});

















 // Function to open the modal for "For Monthly Basis"
 function openMonthlyModal() {

 // Ensure all other modals are hidden
 document.querySelectorAll('.modal').forEach(modal => {
    var modalInstance = bootstrap.Modal.getInstance(modal);
    if (modalInstance) {
        modalInstance.hide();
    }
});

    var myModal = new bootstrap.Modal(document.getElementById('chefModal2')); // Ensure the modal ID matches
    myModal.show();
}

// Update total amount when the number of months is changed
function updateMonthlyAmount() {
    var months = parseInt(document.getElementById('monthsInput').value) || 0; 
    var amountPerMonth = parseInt(document.getElementById('monthlyAmountInput').value) || 30000; 

    var totalAmount = months * amountPerMonth;

    document.getElementById('monthlyTotalAmount').innerText = totalAmount.toString(); 
}

// Handle form submission
document.getElementById('monthlyForm').addEventListener('submit', function (event) {
    event.preventDefault();

    var months = parseInt(document.getElementById('monthsInput').value) || 0;
    var people = parseInt(document.getElementById('monthlyPeopleInput').value) || 0;
    var totalAmount = parseInt(document.getElementById('monthlyTotalAmount').innerText) || 0;

    if (months < 1 || people < 1 || totalAmount <= 0) {
        alert('Please fill all fields with valid values.');
        return;
    }

    var data = { months, people, totalAmount };

    fetch('/save-monthly-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
            alert('Monthly basis order saved successfully!');
            document.getElementById('monthlyForm').reset();
            document.getElementById('monthlyTotalAmount').innerText = '0';
            var myModal = bootstrap.Modal.getInstance(document.getElementById('chefModal2'));
            myModal.hide();
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Error saving monthly basis order!');
        });
});

// Reset form and total amount when the modal is closed
document.getElementById('chefModal2').addEventListener('hidden.bs.modal', function () {
    document.getElementById('monthlyForm').reset(); // Reset the form
    document.getElementById('monthlyTotalAmount').innerText = '0'; // Reset total amount display
});










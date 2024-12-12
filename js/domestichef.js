


document.addEventListener("DOMContentLoaded", function () {
    // Get modal elements
    const domesticCookModalElement = document.getElementById("domesticCookModal");
    const billModalElement = document.getElementById("billModal");
    const chefModalElement = document.getElementById("chefModal");

    // Open the Domestic Cook modal when the image is clicked
    const domesticCookImage = document.getElementById("domesticCookImage");
    domesticCookImage.addEventListener("click", function (event) {
        // Prevent default behavior (like opening the image in a new tab)
        event.preventDefault();

        // Close the "Choose Your Service" modal if it's open
        const chefModal = bootstrap.Modal.getInstance(chefModalElement);
        if (chefModal) {
            chefModal.hide(); // Hide the "Choose Your Service" modal
        }

        // Show the Domestic Cook modal
        const domesticCookModal = new bootstrap.Modal(domesticCookModalElement);
        domesticCookModal.show(); // Show the modal
    });

    // View Bill Button Logic
    document.getElementById("viewBillButton").addEventListener("click", function () {
        const cookDate = document.getElementById("billCookDate").value;
        const numPeople = parseInt(document.getElementById("billNumPeople").value, 10);
        const arrivingTime = document.getElementById("billArrivingTime").value;

        // Validate inputs
        if (!cookDate || isNaN(numPeople) || numPeople <= 0 || !arrivingTime) {
            alert("Please fill in all fields correctly.");
            return;
        }

        // Calculate the cost
        const domesticCookFee = 500; // Fixed fee
        const basePricePerPerson = 300; // Price per person
        const totalAmount = domesticCookFee + (basePricePerPerson * numPeople);

        // Update the bill modal
        document.getElementById("billCookDateDisplay").textContent = cookDate;
        document.getElementById("billNumPeopleDisplay").textContent = numPeople;
        document.getElementById("billArrivingTimeDisplay").textContent = arrivingTime;
        document.getElementById("billCookFee").textContent = domesticCookFee;
        document.getElementById("billPricePerPerson").textContent = basePricePerPerson;
        document.getElementById("billTotalAmount").textContent = totalAmount;

        // Show the bill modal
        const billModal = new bootstrap.Modal(billModalElement);
        billModal.show();

        // Close Domestic Cook modal
        const domesticCookModal = bootstrap.Modal.getInstance(domesticCookModalElement);
        if (domesticCookModal) {
            domesticCookModal.hide();
        }
    });

    // Prevent form reset behavior on modal close
    domesticCookModalElement.addEventListener('hidden.bs.modal', function () {
        // Prevent form reset (manually reset fields if necessary)
        const form = document.getElementById('domesticCookForm'); // Assuming this is your form ID
        if (form) {
            const elements = form.elements;
            for (let i = 0; i < elements.length; i++) {
                if (elements[i].type !== 'submit' && elements[i].type !== 'button') {
                    elements[i].value = elements[i].defaultValue; // Reset only non-submit button fields
                }
            }
        }
    });

    // Confirm Booking Logic
    document.getElementById("confirmBookingButton").addEventListener("click", function () {
        const cookDate = document.getElementById("billCookDateDisplay").textContent;
        const numPeople = document.getElementById("billNumPeopleDisplay").textContent;
        const arrivingTime = document.getElementById("billArrivingTimeDisplay").textContent;
        const totalAmount = document.getElementById("billTotalAmount").textContent;

        // Prepare booking data
        const bookingData = {
            cookDate,
            numPeople,
            arrivingTime,
            totalAmount,
        };

        console.log("Booking Data:", bookingData);

        // Example API call to save the booking
        fetch("https://your-api-endpoint.com/bookings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bookingData),
        })
            .then((response) => response.json())
            .then((data) => {
                alert("Booking confirmed!");
                const billModal = bootstrap.Modal.getInstance(billModalElement);
                if (billModal) {
                    billModal.hide(); // Close the modal
                }
            })
            .catch((error) => {
                console.error("Error confirming booking:", error);
                alert("Error confirming booking. Please try again.");
            });
    });
});









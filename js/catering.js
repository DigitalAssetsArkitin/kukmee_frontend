

document.getElementById('cateringBookingForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent default form submission behavior

    // Collect form data
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries()); // Convert FormData to JSON format

    try {
        // Send data to the backend
        const response = await fetch('/api/book-catering', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const result = await response.json();

            // Display confirmation message
            alert(`Booking Confirmed! Reference ID: ${result.bookingId}`);
            e.target.reset(); // Reset the form
        } else {
            // Handle server errors
            const errorText = await response.text();
            console.error('Server Error:', errorText);
            alert('Failed to book catering. Please try again.');
        }
    } catch (error) {
        // Handle network or other errors
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    }
});


function showToast(message, type = "success") {
    const toastContainer = document.getElementById("toast-container");
  
    // Create toast element
    const toast = document.createElement("div");
    toast.className = `toast align-items-center text-white bg-${type} border-0 show`;
    toast.role = "alert";
    toast.ariaLive = "assertive";
    toast.ariaAtomic = "true";
    toast.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">
          ${message}
        </div>
        <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    `;
  
    // Append to container
    toastContainer.appendChild(toast);
  
    // Bootstrap toast activation
    const bsToast = new bootstrap.Toast(toast, { delay: 6000 });
    bsToast.show();
  
    // Remove toast after 6 seconds
    setTimeout(() => {
      toast.remove();
    }, 6000);
  }


// Function to handle form submission for Kukmee
async function submitKukmeeForm() {
    var location = document.getElementById("kukmeeLocation").value;
    var fullName = document.getElementById("kukmeeFullName").value;
    var email = document.getElementById("kukmeeEmail").value;
    var phoneNumber = document.getElementById("kukmeePhoneNumber").value;

    // Prepare data to send
    const formData = {
        location: location,
        fullName: fullName,
        email: email,
        phoneNumber: phoneNumber
    };

    try {
        const response = await fetch(`${API_BASE_URL}/franchise/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            showToast("Kukmee inquiry sent successfully!");
            // Optionally, reset form
            document.getElementById("kukmeeFormElement").reset();
        } else {
            showToast("There was an issue sending your inquiry. Please try again.");
        }
    } catch (error) {
        console.error("Error sending data to backend: ", error);
        showToast("There was an error. Please try again later.");
    }
}



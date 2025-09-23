
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


// catering services
function checkOtherEvent() {
    const eventType = document.getElementById('eventType').value;
    const otherEventInput = document.getElementById('other-event-input');
    if (eventType === 'other') {
      otherEventInput.style.display = 'block';
    } else {
      otherEventInput.style.display = 'none';
    }
  }
  
  // Submit function (already provided in previous message)
  // function submitCateringForm(event) {
  //   event.preventDefault(); // Prevent form submission to handle it with JavaScript
  
  //   const fullName = document.querySelector('#fullName').value;
  //   const email = document.querySelector('#email').value;
  //   const phoneNumber = document.querySelector('#phone').value;
  //   const packageName = document.querySelector('#package').value;
  //   let eventType = document.querySelector('#eventType').value;
  //   const eventDate = document.querySelector('#eventDate').value;
  //   const eventLocation = document.querySelector('#eventLocation').value;
  //   const otherEvent = document.querySelector('#otherEvent').value; // For the "Other" event type
    
  //   // If "Other" event type is selected, use the custom event type
  //   if (eventType === 'other' && otherEvent.trim() !== '') {
  //     eventType = otherEvent;
  //   }
  
  //   // Validate fields
  //   if (!fullName || !email || !phoneNumber || !packageName || !eventType || !eventDate || !eventLocation) {
  //     alert("Please fill in all required fields.");
  //     return;
  //   }
  
  //   const cateringData = {
  //     fullName,
  //     email,
  //     phoneNumber,
  //     package,
  //     eventType,
  //     eventDate,
  //     eventLocation,
  //     otherEvent
  //   };
  
  //   const token = localStorage.getItem('jwt_token'); // Assuming the token is stored in localStorage
  
  //   // Sending data to backend via fetch API
  //   fetch('https://29ff-2405-201-e025-f030-b0a1-efa2-8465-9e34.ngrok-free.app/api/event/create', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${token}` // Include the token here
  //     },
  //     body: JSON.stringify(cateringData)
  //   })
  //   .then(response => response.json())
  //   .then(data => {
  //     alert('Catering booking created successfully!');
  //     console.log(data);
  //   })
  //   .catch(error => {
  //     console.error('Error creating catering booking:', error);
  //     alert('An error occurred while submitting the form. Please try again.');
  //   });
  // }
  
  
  
  
  
  function submitCateringForm(event) {
    event.preventDefault(); // Prevent form submission to handle it with JavaScript
  
    const fullName = document.querySelector('#fullName').value;
    const email = document.querySelector('#email').value;
    const phoneNumber = document.querySelector('#phone').value;
    const packageName = document.querySelector('#package').value;
    let eventType = document.querySelector('#eventType').value;
    const eventDate = document.querySelector('#eventDate').value;
    const eventLocation = document.querySelector('#eventLocation').value;
    const otherEvent = document.querySelector('#otherEvent').value; // For the "Other" event type
    
    // If "Other" event type is selected, use the custom event type
    if (eventType === 'other' && otherEvent.trim() !== '') {
      eventType = otherEvent;
    }
  
    // Validate fields
    if (!fullName || !email || !phoneNumber || !packageName || !eventType || !eventDate || !eventLocation) {
      showToast("Please fill in all required fields.");
      return;
    }
  
    // Map packages to prices
    const packagePrices = {
      basic: 4999,
      premium: 6999,
      deluxe: 8999,
      custom: null
    };
  
    // Normalize packageName to lowercase for lookup
    const normalizedPackageName = packageName.toLowerCase();
    const packagePrice = packagePrices[normalizedPackageName];
  
    if (packagePrice === undefined) {
      showToast("Invalid package selected.");
      return;
    }
  
    // Prepare the data to be sent
    const cateringData = {
      fullName,
      email,
      phoneNumber,
      packageName, // Keep the original value for reference
      packagePrice, // Include the package price here
      eventType,
      eventDate,
      eventLocation,
      otherEvent
    };
  
    // console.log(cateringData)
  
    const token = localStorage.getItem('jwt_token'); // Assuming the token is stored in localStorage
  
    // Sending data to backend via fetch API
    fetch(`${API_BASE_URL}/event/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Include the token here
      },
      body: JSON.stringify(cateringData)
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'SUCCESS' && data.sessionUrl) {
        // Redirect to the payment gateway
        window.location.href = data.sessionUrl;
      } else {
        showToast('Payment session creation failed. Please try again.');
      }
    })
    .catch(error => {
      console.error('Error creating catering booking:', error);
      showToast('An error occurred while submitting the form. Please try again.');
    });
  }
  
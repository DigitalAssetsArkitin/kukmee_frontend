// document.getElementById("chefButton").addEventListener("click", function () {
//   // Show Chef form and hide Cook form
//   document.getElementById("chefForm").style.display = "block";
//   document.getElementById("cookForm").style.display = "none";
//   document.getElementById("description").style.display = "none"; // Hide paragraph
// });

// document.getElementById("cookButton").addEventListener("click", function () {
//   // Show Cook form and hide Chef form
//   document.getElementById("cookForm").style.display = "block";
//   document.getElementById("chefForm").style.display = "none";
//   document.getElementById("description").style.display = "none"; // Hide paragraph
// });

// document.getElementById("chefType").addEventListener("change", function () {
//   const cuisineSelect = document.getElementById("cuisine");
//   cuisineSelect.innerHTML = ""; // Clear existing options
//   if (this.value === "international") {
//     cuisineSelect.innerHTML = `
//   <option value="italy">Italy</option>
//   <option value="japanese">Japanese</option>
//   <option value="chinese">Chinese</option>`;
//   } else if (this.value === "domestic") {
//     cuisineSelect.innerHTML = `
//   <option value="south-indian">South Indian</option>
//   <option value="north-indian">North Indian</option>
//   <option value="punjabi">Punjabi</option>`;
//   }
// });

document.addEventListener("DOMContentLoaded", function () {
  const chefDuration = document.getElementById("chefDuration");
  const chefDatesContainer = document.getElementById("chefDatesContainer");

  // Function to update the date fields based on the selected duration
  function updateDateFields() {
    // Check the current value of the chefDuration
    if (chefDuration.value === "1day") {
      chefDatesContainer.innerHTML = `
        <label for="startDate">Service Start Date</label>
        <input type="date" id="startDate" class="form-control" placeholder="Start Date">
    `;
    } else if (chefDuration.value === "multipledays") {
      chefDatesContainer.innerHTML = `
        <label for="startDate">Service Start Date</label>
        <input type="date" id="startDate" class="form-control" placeholder="Start Date">
        <label for="endDate" style="margin-top: 10px;">Service End Date</label>
        <input type="date" id="endDate" class="form-control" placeholder="End Date" style="margin-top: 5px;">
    `;
    }
  }

  // Initialize the date fields on page load (for default duration)
  updateDateFields();

  // Add an event listener to update the date fields when the duration changes
  chefDuration.addEventListener("change", updateDateFields);
});

// cook & chef

// function submitChefForm() {
//   // Validate all fields before submission
//   const chefType = document.getElementById("chefType").value;
//   const cuisine = document.getElementById("cuisine").value;
//   const duration = document.getElementById("chefDuration").value;
//   const serviceStartDate = document.getElementById("startDate")
//     ? document.getElementById("startDate").value
//     : null;
//   let serviceEndDate = document.getElementById("endDate")
//     ? document.getElementById("endDate").value
//     : null;

//   // If the duration is 1 day, set the endDate to null
//   if (duration === "1day") {
//     serviceEndDate = null;
//   }

//   const eventType = document.querySelector("#chefFormElement select").value;
//   const mealPreferences = Array.from(
//     document.querySelectorAll('#chefFormElement input[type="checkbox"]:checked')
//   ).map((el) => el.value);
//   const location = document.querySelector(
//     '#chefFormElement input[placeholder="Enter Location"]'
//   ).value;
//   const fullName = document.querySelector(
//     '#chefFormElement input[placeholder="Enter Full Name"]'
//   ).value;
//   const email = document.querySelector(
//     '#chefFormElement input[placeholder="Enter Email"]'
//   ).value;
//   const phoneNumber = document.querySelector(
//     '#chefFormElement input[placeholder="Enter Phone Number"]'
//   ).value;

//   // Basic validation for required fields
//   if (
//     !chefType ||
//     !cuisine ||
//     !duration ||
//     !serviceStartDate ||
//     !eventType ||
//     !location ||
//     !fullName ||
//     !email ||
//     !phoneNumber
//   ) {
//     alert("Please fill in all required fields!");
//     return;
//   }

//   // If duration is multiple days, ensure end date is selected
//   if (duration === "multipledays" && !serviceEndDate) {
//     alert("Service End Date is required for multiple-day bookings.");
//     return;
//   }

//   // Prepare the data to be sent to the backend
//   const chefData = {
//     chefType,
//     cuisine,
//     duration,
//     serviceStartDate,
//     serviceEndDate, // This will be null if "1day" is selected
//     eventType,
//     mealPreferences,
//     location,
//     fullName,
//     email,
//     phoneNumber,
//   };

//   // Get the Bearer token (ensure it's available in your application)
//   const token = localStorage.getItem("jwt_token"); // Or get it from any other source, e.g., sessionStorage or cookies

//   if (!token) {
//     alert("Authentication token not found. Please log in again.");
//     return;
//   }

//   // Send the data to the backend
//   fetch(
//     "https://65ee-2401-4900-1cc8-ee0c-1d87-d0be-cc2d-19f.ngrok-free.app/api/chefbookings/create",
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`, // Include the Bearer token in the request header
//       },
//       body: JSON.stringify(chefData),
//     }
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       if (data.success) {
//         alert("Chef details submitted successfully!");
//       } else {
//         alert("Error submitting chef details: " + data.message);
//       }
//     })
//     .catch((error) => {
//       console.error("Error submitting chef details:", error);
//       alert("An error occurred while submitting the chef details.");
//     });
// }

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

document.addEventListener("DOMContentLoaded", function () {
  // Set the minimum date for service start and end date fields
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("serviceStartDate").setAttribute("min", today);
  document.getElementById("serviceEndDate").setAttribute("min", today);

  // Populate cuisine dropdown based on chef type
  document.getElementById("chefType").addEventListener("change", function () {
    const chefType = this.value;
    const cuisineDropdown = document.getElementById("cuisine");
    cuisineDropdown.innerHTML = ""; // Clear existing options

    const cuisines =
      chefType === "domestic"
        ? ["Select your Cuisine", "Indian", "Chinese", "South Indian"]
        : chefType === "international"
        ? ["Select your Cuisine", "Italian", "Mexican", "Japanese"]
        : [];

    cuisines.forEach((cuisine) => {
      const option = document.createElement("option");
      option.value = cuisine;
      option.textContent = cuisine;
      cuisineDropdown.appendChild(option);
    });
  });

  // Show the modal with calculated details
  window.showChefModal = function () {
    // Retrieve inputs
    const chefType = document.getElementById("chefType").value;
    const cuisine = document.getElementById("cuisine").value;
    const serviceStartDate = document.getElementById("serviceStartDate").value;
    const serviceEndDate = document.getElementById("serviceEndDate").value;
    const numMembers = parseInt(document.getElementById("numMembers").value);
    const eventType = document.getElementById("eventType").value;
    const location = document.querySelector(
      '#commonFormElement input[placeholder="Enter Location"]'
    ).value;
    const fullName = document.querySelector(
      '#commonFormElement input[placeholder="Enter Full Name"]'
    ).value;
    const email = document.querySelector(
      '#commonFormElement input[placeholder="Enter Email"]'
    ).value;
    const phoneNumber = document.querySelector(
      '#commonFormElement input[placeholder="Enter Phone Number"]'
    ).value;
    const mealPreferences = Array.from(
      document.querySelectorAll('input[name="mealPreferences"]:checked')
    ).map((checkbox) => checkbox.value);

    // Validate inputs
    if (
      !chefType ||
      !cuisine ||
      !serviceStartDate ||
      !serviceEndDate ||
      isNaN(numMembers) ||
      numMembers <= 0 ||
      !eventType ||
      !location ||
      !fullName ||
      !email ||
      !phoneNumber ||
      mealPreferences.length === 0
    ) {
      showToast("Please fill in all required fields!");
      return;
    }

    // Calculate days between start and end date
    const startDate = new Date(serviceStartDate);
    const endDate = new Date(serviceEndDate);
    const days = Math.ceil((endDate - startDate) / (1000 * 3600 * 24)) + 1; // Include the start date

    // Calculate pricing
    const basePrice = chefType === "international" ? 300 : 200; // Base charge per day
    const memberPrice = numMembers * 50; // Price per member
    const mealPrice = mealPreferences.length * 100; // 100 per meal preference

    const dailyTotal = basePrice + mealPrice; // Daily cost
    const totalPrice = dailyTotal * days + memberPrice; // Total price for all days
    const gstPrice = totalPrice * 0.18; // 18% GST
    const grandTotal = totalPrice + gstPrice; // Final price including GST

    // Update modal with details
    document.getElementById("modalMembersCount").textContent = numMembers;
    document.getElementById("modalMembersPrice").textContent = memberPrice;
    document.getElementById("modalMealCount").textContent =
      mealPreferences.length;
    document.getElementById("mealPrice").textContent = mealPrice;
    document.getElementById("dailyBaseCharge").textContent = basePrice;
    document.getElementById("dailyTotal").textContent = dailyTotal;
    document.getElementById("cookDuration").textContent = days;
    document.getElementById("totalPrice").textContent = totalPrice.toFixed(2);
    document.getElementById("gstPrice").textContent = gstPrice.toFixed(2);
    document.getElementById("grandTotal").textContent = grandTotal.toFixed(2);

    // Save data for submission
    const chefData = {
      chefType,
      cuisine,
      serviceStartDate,
      serviceEndDate,
      numMembers,
      eventType,
      location,
      fullName,
      email,
      phoneNumber,
      mealPreferences: mealPreferences.join(", "),
      grandTotal,
    };

    localStorage.setItem("chefData", JSON.stringify(chefData));

    // Show the modal
    $("#priceModal").modal("show");
  };

  // Proceed to payment
  window.proceedToPay = function () {
    const chefData = JSON.parse(localStorage.getItem("chefData"));
    const token = localStorage.getItem("jwt_token");

    if (!token) {
      showToast("Authentication token not found. Please log in again.");
      return;
    }

    // Send the data to the backend
    fetch(`${API_BASE_URL}/chefbookings/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(chefData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "SUCCESS" && data.sessionUrl) {
          // Redirect to the payment URL
          window.location.href = data.sessionUrl;
        } else {
          throw new Error(
            data.message ||
              "Unexpected error occurred while creating the payment session."
          );
        }
      })
      .catch((error) => {
        console.error("Error during payment process:", error);
        showToast("Error: " + error.message);
      });
  };
});

// function submitCookForm() {
//   const cookDuration = document.querySelector("#cookFormElement select").value;
//   const members = document.querySelector(
//     '#cookFormElement input[placeholder="Enter Number of Members"]'
//   ).value;
//   const serviceStartDate = document.querySelector(
//     '#cookFormElement input[type="date"]'
//   ).value;
//   const mealPreferences = Array.from(
//     document.querySelectorAll('#cookFormElement input[type="checkbox"]:checked')
//   )
//     .map((el) => el.value)
//     .join(","); // Convert array to string
//   const location = document.querySelector(
//     '#cookFormElement input[placeholder="Enter Location"]'
//   ).value;
//   const fullName = document.querySelector(
//     '#cookFormElement input[placeholder="Enter Full Name"]'
//   ).value;
//   const email = document.querySelector(
//     '#cookFormElement input[placeholder="Enter Email"]'
//   ).value;
//   const phoneNumber = document.querySelector(
//     '#cookFormElement input[placeholder="Enter Phone Number"]'
//   ).value;

//   // Validation to ensure no empty fields
//   if (
//     !cookDuration ||
//     !members ||
//     !serviceStartDate ||
//     !location ||
//     !fullName ||
//     !email ||
//     !phoneNumber
//   ) {
//     alert("Please fill in all required fields.");
//     return;
//   }

//   const cookData = {
//     cookDuration,
//     members,
//     serviceStartDate,
//     mealPreferences,
//     location,
//     fullName,
//     email,
//     phoneNumber,
//   };

//   console.log(cookData);

//   const token = localStorage.getItem("jwt_token"); // Assuming the token is stored in localStorage

//   fetch(
//     "https://65ee-2401-4900-1cc8-ee0c-1d87-d0be-cc2d-19f.ngrok-free.app/api/cookbookings/create",
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`, // Include the token here
//       },
//       body: JSON.stringify(cookData),
//     }
//   )
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Failed to authenticate. Check your credentials.");
//       }
//       return response.json();
//     })
//     .then((data) => {
//       alert("Cook booking created successfully!");
//       console.log(data);
//     })
//     .catch((error) => {
//       console.error("Error creating cook booking:", error);
//     });
// }

function submitCookForm() {
  const cookDuration = parseInt(
    document.querySelector("#cookFormElement select").value
  );
  const members = parseInt(document.getElementById("cookMembers").value);
  console.log("Members:", members);

  const serviceStartDate = document.querySelector(
    '#cookFormElement input[type="date"]'
  ).value;
  const mealPreferences = Array.from(
    document.querySelectorAll('#cookFormElement input[type="checkbox"]:checked')
  ).map((el) => el.value);

  console.log("Meal Preferences:", mealPreferences);

  const location = document.querySelector(
    '#commonFormElement input[placeholder="Enter Location"]'
  ).value;
  const fullName = document.querySelector(
    '#commonFormElement input[placeholder="Enter Full Name"]'
  ).value;
  const email = document.querySelector(
    '#commonFormElement input[placeholder="Enter Email"]'
  ).value;
  const phoneNumber = document.querySelector(
    '#commonFormElement input[placeholder="Enter Phone Number"]'
  ).value;

  // Validate inputs
  if (
    isNaN(members) ||
    members <= 0 ||
    isNaN(cookDuration) ||
    !serviceStartDate ||
    !location ||
    !fullName ||
    !email ||
    !phoneNumber
  ) {
    showToast("Please fill in all required fields.");
    return;
  }

  // ---- Debug check (place here) ----
  [
    "modalMembersCount",
    "modalMembersPrice",
    "modalMealCount",
    "modalMealPrice",
    "modalMealList",
    "modalDailyBaseCharge",
    "modalDailyTotal",
    "modalCookDuration",
    "modalTotalPrice",
    "modalGstPrice",
    "modalGrandTotal",
  ].forEach((id) => {
    if (!document.getElementById(id)) {
      console.error("❌ Missing element in HTML:", id);
    }
  });

  // Pricing constants
  const pricePerMember = 50;
  const pricePerMealPreference = 100;
  const dailyBaseCharge = 300;

  // Calculations
  const membersPrice = members * pricePerMember;
  const mealPreferencesPrice = mealPreferences.length * pricePerMealPreference;
  const dailyTotal = membersPrice + mealPreferencesPrice + dailyBaseCharge;
  const totalPrice = dailyTotal * cookDuration;
  const gst = totalPrice * 0.18;
  const grandTotal = totalPrice + gst;

  // ✅ Update modal details
  document.getElementById("members").textContent = members;
  document.getElementById("membersPrice").textContent = membersPrice;
  document.getElementById("mealPreferences").textContent =
    mealPreferences.length;
  document.getElementById("modalMealPrice").textContent = mealPreferencesPrice;
  document.getElementById("modalMealList").textContent =
    mealPreferences.length > 0 ? mealPreferences.join(", ") : "None";
  document.getElementById("modalDailyBaseCharge").textContent = dailyBaseCharge;
  document.getElementById("modalDailyTotal").textContent = dailyTotal;
  document.getElementById("modalCookDuration").textContent = cookDuration;
  document.getElementById("modalTotalPrice").textContent =
    totalPrice.toFixed(2);
  document.getElementById("modalGstPrice").textContent = gst.toFixed(2);
  document.getElementById("modalGrandTotal").textContent =
    grandTotal.toFixed(2);

  // Save data
  const cookData = {
    cookDuration,
    members,
    serviceStartDate,
    mealPreferences: mealPreferences.join(", "),
    location,
    fullName,
    email,
    phoneNumber,
    grandTotal,
  };

  localStorage.setItem("cookData", JSON.stringify(cookData));

  // ✅ Show modal AFTER updating DOM
  const paymentModal = new bootstrap.Modal(
    document.getElementById("paymentModal")
  );
  paymentModal.show();

  console.log("Updating modal...");
  console.log(
    "modalMembersCount span:",
    document.getElementById("modalMembersCount")
  );
  console.log(
    "modalMealCount span:",
    document.getElementById("modalMealCount")
  );
}

// function submitCookForm() {
//   const cookDuration = parseInt(document.querySelector("#cookFormElement select").value);
//   const members = parseInt(document.querySelector('#cookFormElement input[placeholder="Enter Number of Members"]').value);
//   const serviceStartDate = document.querySelector('#cookFormElement input[type="date"]').value;
//   const mealPreferences = Array.from(
//       document.querySelectorAll('#cookFormElement input[type="checkbox"]:checked')
//   ).map((el) => el.value);
//   const location = document.querySelector('#commonFormElement input[placeholder="Enter Location"]').value;
//   const fullName = document.querySelector('#commonFormElement input[placeholder="Enter Full Name"]').value;
//   const email = document.querySelector('#commonFormElement input[placeholder="Enter Email"]').value;
//   const phoneNumber = document.querySelector('#commonFormElement input[placeholder="Enter Phone Number"]').value;

//   // Validate inputs
//   if (
//       isNaN(members) ||
//       members <= 0 ||
//       isNaN(cookDuration) ||
//       !serviceStartDate ||
//       !location ||
//       !fullName ||
//       !email ||
//       !phoneNumber
//   ) {
//     showToast("Please fill in all required fields.");
//       return;
//   }

//   // Calculation constants
//   const pricePerMember = 50;
//   const pricePerMealPreference = 100;
//   const dailyBaseCharge = 300;

//   // Price calculations
//   const membersPrice = members * pricePerMember;
//   const mealPreferencesPrice = mealPreferences.length * pricePerMealPreference;
//   const dailyTotal = membersPrice + mealPreferencesPrice + dailyBaseCharge;
//   const totalPrice = dailyTotal * cookDuration;
//   const gst = totalPrice * 0.18; // 18% GST
//   const grandTotal = totalPrice + gst;

//   // Update modal details
//   document.getElementById("membersCount").textContent = members;
//   document.getElementById("membersPrice").textContent = membersPrice;

//   document.getElementById("mealCount").textContent = mealPreferences.length;
//   document.getElementById("mealPrice").textContent = mealPreferencesPrice;

//   document.getElementById("dailyBaseCharge").textContent = dailyBaseCharge;
//   document.getElementById("dailyTotal").textContent = dailyTotal;

//   document.getElementById("totalPrice").textContent = totalPrice.toFixed(2);
//   document.getElementById("gstPrice").textContent = gst.toFixed(2);
//   document.getElementById("grandTotal").textContent = grandTotal.toFixed(2);

//   // Save data for submission
//   const cookData = {
//       cookDuration,
//       members,
//       serviceStartDate,
//       mealPreferences: mealPreferences.join(", "), // Convert array to string
//       location,
//       fullName,
//       email,
//       phoneNumber,
//       grandTotal,
//   };

//   localStorage.setItem("cookData", JSON.stringify(cookData));

//   // Display modal
//   const paymentModal = new bootstrap.Modal(document.getElementById('paymentModal'));
//   paymentModal.show();
// }

function proceedToPayCook() {
  const cookData = JSON.parse(localStorage.getItem("cookData")); // Retrieve saved data

  const token = localStorage.getItem("jwt_token"); // Assuming the token is stored in localStorage

  fetch(`${API_BASE_URL}/cookbookings/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Include the token here
    },
    body: JSON.stringify(cookData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          "Failed to process the payment request. Please try again."
        );
      }
      return response.json();
    })
    .then((data) => {
      if (data.status === "SUCCESS" && data.sessionUrl) {
        // Redirect the user to the payment URL
        window.location.href = data.sessionUrl;
      } else {
        throw new Error(
          data.message ||
            "Unexpected error occurred while creating the payment session."
        );
      }
    })
    .catch((error) => {
      console.error("Error during payment process:", error);
      showToast("Error: " + error.message);
    });
}

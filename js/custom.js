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




// login js code ============================================================================================================================================================================================================

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");
  updateUIBasedOnToken();

  if (window.location.pathname.includes("login.html")) {
    handleLoginPage();
  }
  // Check for multiple pages
  else if (
    [
      "index-food.html",
      "kukmart.html",
      "book-catering.html",
      "cook&chef.html",
      "franchise.html"
    ].some((page) => window.location.pathname.includes(page))
  ) {
    handleIndexPage(); // Handle multiple pages with the same function
  } else {
    handleOtherPages();
  }
});

// Login page logic - Login form submission and JWT storage
function handleLoginPage() {
  const form = document.getElementById("login-form");
  if (!form) {
    console.error("Login form not found");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
      showToast("Please enter both username and password");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/customersignin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed. Please check credentials.");
      }

      // Save token (using sessionStorage is safer)
      localStorage.setItem("jwt_token", data.token);
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      // Redirect after login
      window.location.href = "index-food.html";
    } catch (error) {
      console.error("Login error:", error);
      showToast(error.message);
    }
  });
}


// Page-specific logic for the index-food.html page
function handleIndexPage() {
  const logoutButton = document.getElementById("logout");
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      localStorage.removeItem("jwt_token"); // Remove the JWT token
      updateUIBasedOnToken(); // Update UI after logout
      window.location.href = "index-food.html"; // Redirect to index
    });
  }
}

// Update the profile section and login button globally based on the JWT token
function updateUIBasedOnToken() {
  const jwtToken = localStorage.getItem("jwt_token");
  const loginButton = document.querySelector(".btn-login");
  const profileSection = document.querySelector(".profile-section");

  if (jwtToken) {
    profileSection?.classList.remove("d-none"); // Show profile section
    loginButton?.classList.add("d-none"); // Hide login button
    fetchUserDetails(jwtToken); // Fetch and display user details

    // Ensure dropdowns work after showing the profile section
    setTimeout(() => {
      var dropdownElements = document.querySelectorAll(".dropdown-toggle");
      dropdownElements.forEach((dropdown) => {
        new bootstrap.Dropdown(dropdown);
      });
    }, 500);
  } else {
    profileSection?.classList.add("d-none"); // Hide profile section
    loginButton?.classList.remove("d-none"); // Show login button
  }
}


// Fetch user details and update the UI (used globally)
async function fetchUserDetails(token) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user details");
    }

    const user = await response.json();

    // Store user details in localStorage
    localStorage.setItem("userDetails", JSON.stringify(user));

    // Update the username display on the page
    const usernameDisplay = document.getElementById("username-display");
    if (usernameDisplay) {
      usernameDisplay.textContent = user.username; // Update username display
    }

    console.log("User details stored in localStorage:", user);
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
}

// forget password ======================================================================================================================================================================================================

document.addEventListener("DOMContentLoaded", () => {
  const passwordResetForm = document.getElementById("passwordResetForm");

  if (passwordResetForm) {
    passwordResetForm.addEventListener("submit", handlePasswordReset);
  } else {
    console.error("Password reset form not found in the DOM.");
  }
});

// Function to handle password reset
async function handlePasswordReset(event) {
  event.preventDefault(); // Prevent default form submission behavior

  const email = document.getElementById("email").value;

  if (!email) {
    showToast("Please enter a valid email address");
    return;
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/auth/forgot-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }), // Sending email in the request body
      }
    );

    if (response.ok) {
      const data = await response.json();
      showToast(
        data.message || "Password reset token has been sent to your email."
      );
    } else {
      const error = await response.json();
      showToast(error.message || "Failed to request password reset");
    }
  } catch (error) {
    console.error("Error during password reset request:", error);
    showToast("An error occurred. Please try again.");
  }
}

// rest-password js code ==============================================================================================================================================================================================

async function resetPassword() {
  // Extract token from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token"); // Ensure the token is passed in the query string
  const newPassword = document.getElementById("newPassword").value; // Get the new password input value
  const message = document.getElementById("message"); // Element to show messages
  message.innerHTML = ""; // Clear previous messages

  if (!newPassword) {
    message.innerHTML = '<span class="error">Password cannot be empty.</span>';
    return;
  }

  try {
    // Make API call to reset password
    const response = await fetch(
      `${API_BASE_URL}/auth/reset-password?token=${token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword }), // Send the new password in the request body
      }
    );

    if (response.ok) {
      // Success message
      message.innerHTML =
        '<span class="success">Password has been successfully reset!</span>';
    } else {
      const error = await response.text(); // Read error response
      message.innerHTML = `<span class="error">${error}</span>`;
    }
  } catch (error) {
    // Catch and handle unexpected errors
    console.error("Error:", error);
    message.innerHTML =
      '<span class="error">An error occurred. Please try again later.</span>';
  }
}

// login js code ============================================================================================================================================================================================================

document.addEventListener("DOMContentLoaded", () => {
    // Global token check for all pages
    updateUIBasedOnToken();
  
    if (window.location.pathname.includes("login.html")) {
      handleLoginPage(); // Login page specific logic
    } else if (window.location.pathname.includes("index-food.html")) {
      handleIndexPage(); // Index page specific logic
    }
  });
  
  // Login page logic - Login form submission and JWT storage
  function handleLoginPage() {
    const form = document.getElementById("login-form");
    form.addEventListener("submit", async (e) => {
      e.preventDefault(); // Prevent default form submission
  
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
  
      try {
        const response = await fetch(
          "https://f793-2401-4900-1cc9-ec27-8539-12b7-b3ad-69e1.ngrok-free.app/api/auth/customersignin",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
          }
        );
  
        if (!response.ok) {
          throw new Error("Login failed. Please check your credentials and try again.");
        }
  
        const data = await response.json();
        const token = data.token;
  
        localStorage.setItem("jwt_token", token); // Store the JWT token
  
        // Redirect to a post-login page (default to index-food.html)
        window.location.href = "index-food.html";
      } catch (error) {
        alert(error.message); // Show an alert if there's an error
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
    } else {
      profileSection?.classList.add("d-none"); // Hide profile section
      loginButton?.classList.remove("d-none"); // Show login button
    }
  }
  
  // Fetch user details and update the UI (used globally)
  async function fetchUserDetails(token) {
    try {
      const response = await fetch(
        "https://4424-2401-4900-1c29-15a9-7461-f54d-132d-ca03.ngrok-free.app/api/auth/me",
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }
  
      const user = await response.json();
      const usernameDisplay = document.getElementById("username-display");
      if (usernameDisplay) {
        usernameDisplay.textContent = user.username; // Update username display
      }
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
      alert("Please enter a valid email address");
      return;
    }
  
    try {
      const response = await fetch(
        "https://80b5-2401-4900-1c29-15a9-1c0a-c946-6344-e037.ngrok-free.app/api/auth/forgot-password",
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
        alert(
          data.message || "Password reset token has been sent to your email."
        );
      } else {
        const error = await response.json();
        alert(error.message || "Failed to request password reset");
      }
    } catch (error) {
      console.error("Error during password reset request:", error);
      alert("An error occurred. Please try again.");
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
        `https://80b5-2401-4900-1c29-15a9-1c0a-c946-6344-e037.ngrok-free.app/api/auth/reset-password?token=${token}`,
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
  


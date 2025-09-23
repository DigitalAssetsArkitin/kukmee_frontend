// Function to generate HTML for each food item
function generateFoodCard(item, isVeg) {
  const boxClass = isVeg ? "bg-green-soft-01" : "bg-black-soft-01";

  return `
        <div class="col-12 col-sm-6 col-lg-6 text-center mb-lg-3 p-3">
          <div class="Food-card">
            <div class="px-5">
              <img class="img-fluid rounded-circle zoom" src="${
                item.image
              }" alt="${item.name}">
            </div>
            <div class="${boxClass} food-box p-4 rounded mt-n5">
              <div class="food-description">
                <h5 class="mt-5 mt-lg-4">${item.name}</h5>
                <p>${item.description}</p>
              </div>
              <div class="bg-white py-2 d-flex justify-content-center">
                <ul class="d-flex  text-warning mb-0 rounded ms-3">
                  ${'<li><i class="fas fa-star"></i></li>'.repeat(item.rating)}
                </ul>
                <span class="nakki">(${item.reviews}k)</span>
              </div>
              <div class="mt-3 d-flex align-items-center justify-content-between">
                <div class="quantity-control d-inline-flex align-items-center border border-dark p-1">
                  <button class="btn btn-black py-0 px-1 minus">-</button>
                  <span class="quantity text-white mx-1" id="quantity-display1">0</span>
                  <button class="btn btn-black py-0 px-1 plus">+</button>
                </div>
                <button class="btn btn-black text-white py-1 px-3 rounded add-to-cart add-button" data-item="${
                  item.name
                }" data-price="${
    item.price
  }" data-bs-toggle="offcanvas">Add</button>
              </div>
            </div>
          </div>
        </div>
      `;
}

// Function to load data from the JSON file and render cards
async function loadFoodData() {
  try {
    // Fetch JSON data from the external file
    const response = await fetch("foodData.json");
    const data = await response.json();

    const vegSection = document.getElementById("veg-section");
    const nonVegSection = document.getElementById("non-veg-section");

    // Render veg cards
    data.veg.forEach((item) => {
      vegSection.innerHTML += generateFoodCard(item, true);
    });

    // Render non-veg cards
    data.nonVeg.forEach((item) => {
      nonVegSection.innerHTML += generateFoodCard(item, false);
    });
  } catch (error) {
    console.error("Error loading food data:", error);
  }
}

// Call the function when the page is loaded
window.onload = loadFoodData;

// cart code
let cart = {}; // To store cart items

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

// Function to handle adding items to the cart
function addToCart(item, quantityDisplay) {
  const { name, image, price } = item;
  const quantity = parseInt(quantityDisplay.textContent); // Get the current quantity displayed

  // If quantity is more than 0, add to the cart
  if (quantity > 0) {
    // If the item is already in the cart, add the new quantity to the existing quantity
    if (cart[name]) {
      cart[name].quantity = quantity; // Replace with the newly updated quantity
    } else {
      // Otherwise, add the item to the cart with the current quantity
      cart[name] = { ...item, quantity };
    }

    // Alert message with the quantity added
    showToast(`${quantity} x ${name} added to the cart!`);

    updateCartUI(); // Update the cart display
  } else {
    showToast("Please select a quantity greater than 0.");
  }
}

// Function to update the cart UI
function updateCartUI() {
  const cartItemsContainer = document.getElementById("cart-items");
  const grandTotalEl = document.getElementById("grand-total");
  const placeOrderBtn = document.getElementById("place-order-btn");
  const gstAmountEl = document.getElementById("gst-amount");

  // Clear existing items
  cartItemsContainer.innerHTML = "";

  let grandTotal = 0;

  // Populate cart items
  for (const itemName in cart) {
    const { image, price, quantity } = cart[itemName];
    grandTotal += price * quantity;

    cartItemsContainer.innerHTML += `
      <div class="d-flex align-items-center justify-content-between mb-2 border p-1 rounded">
      <div class="d-block">
      <img src="${image}" alt="${itemName}" class="img-fluid rounded-circle" style="width: 50px; height: 50px;">
        <div class="">
          <p class="mb-1"style="font-size: 11px;"><strong>${itemName}</strong></p>
          <p class="mb-0">₹${price}</p>
        </div>
      </div>
        
        <div class="align-items-center">
          <div class="quantity-control d-inline-flex align-items-center border border-dark p-1">
            <button class="btn btn-black py-0 px-2 minus-btn" data-item="${itemName}">-</button>
            <span class="quantity text-white mx-2" id="quantity-${itemName}">${quantity}</span>
            <button class="btn btn-black py-0 px-2 plus-btn" data-item="${itemName}">+</button>
          </div>
          <button class="btn  btn-outline-danger ms-3 remove-btn" data-item="${itemName}"><i class="bi bi-trash"></i></button>
        </div>
      </div>
    `;
  }

  // Calculate 18% GST
  const gstAmount = (18 / 100) * grandTotal;
  const totalWithGST = grandTotal + gstAmount;

  // Update grand total and GST in the cart
  grandTotalEl.textContent = `₹${grandTotal.toFixed(2)}`;
  gstAmountEl.textContent = `₹${gstAmount.toFixed(2)}`;
  document.getElementById("final-total").textContent = `₹${totalWithGST.toFixed(
    2
  )}`;

  // Show or hide "Place Order" button
  placeOrderBtn.style.display = grandTotal > 0 ? "block" : "none";
}

// Event listener for quantity buttons in cart
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("plus-btn")) {
    const itemName = event.target.dataset.item;
    cart[itemName].quantity += 1;
    updateCartUI();
  } else if (event.target.classList.contains("minus-btn")) {
    const itemName = event.target.dataset.item;
    if (cart[itemName].quantity > 1) {
      cart[itemName].quantity -= 1;
    } else {
      delete cart[itemName]; // Remove item if quantity becomes 0
    }
    updateCartUI();
  } else if (event.target.classList.contains("remove-btn")) {
    const itemName = event.target.dataset.item;
    delete cart[itemName]; // Remove item from cart
    updateCartUI();
  }
});

// Function to remove items from the cart
function removeFromCart(itemName) {
  delete cart[itemName];
  updateCartUI();
}

// Event listener for "Add to Cart" and quantity buttons
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("add-to-cart")) {
    const itemName = event.target.dataset.item;
    const itemPrice = parseFloat(event.target.dataset.price);
    const itemImage = event.target
      .closest(".Food-card")
      .querySelector("img").src;
    const quantityDisplay = event.target
      .closest(".food-box")
      .querySelector(".quantity");

    // Add to cart with the current quantity
    addToCart(
      { name: itemName, price: itemPrice, image: itemImage },
      quantityDisplay
    );
  } else if (event.target.classList.contains("plus")) {
    const quantityDisplay = event.target
      .closest(".quantity-control")
      .querySelector(".quantity");
    quantityDisplay.textContent = parseInt(quantityDisplay.textContent) + 1; // Increase quantity
  } else if (event.target.classList.contains("minus")) {
    const quantityDisplay = event.target
      .closest(".quantity-control")
      .querySelector(".quantity");
    const currentQuantity = parseInt(quantityDisplay.textContent);
    if (currentQuantity > 0) {
      quantityDisplay.textContent = currentQuantity - 1; // Decrease quantity
    }
  }
});

// Function to place order and send data to backend
// JavaScript to handle the location fetching and address saving
document
  .getElementById("add-address-btn")
  .addEventListener("click", function () {
    // Show the location modal to let the user add an address
    const locationModal = new bootstrap.Modal(
      document.getElementById("locationModal")
    );
    locationModal.show();
  });

// Function to fetch the user's current location (if not entered manually)
document
  .getElementById("getCurrentLocation")
  .addEventListener("click", function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          const address = data.display_name || "Unable to fetch address";
          document.getElementById("manualLocation").value = address;
        },
        () => {
          showToast("Unable to fetch your location. Please try again.");
        }
      );
    } else {
      showToast("Geolocation is not supported by this browser.");
    }
  });

// Save the location and update the button visibility
document.getElementById("saveLocation").addEventListener("click", function () {
  const location = document.getElementById("manualLocation").value;
  const locationType = document.getElementById("locationType").value;

  if (location) {
    // Save the address and hide the "Add Address" button, show the "Place Order" button
    localStorage.setItem("userAddress", location);

    // Hide "Add Address" button and show "Place Order"
    document.getElementById("add-address-btn").style.display = "none";
    document.getElementById("place-order-btn").style.display = "block";

    // Close the modal
    const locationModal = bootstrap.Modal.getInstance(
      document.getElementById("locationModal")
    );
    locationModal.hide();
  } else {
    showToast("Please enter or fetch a location before saving.");
  }
});

// Function to place the order, including the fetched address and other details
async function placeOrders() {
  // Check if the cart is empty
  if (Object.keys(cart).length === 0) {
    showToast(
      "Your cart is empty! Please add items to your cart before placing an order."
    );
    return;
  }

  // Get the delivery address from localStorage
  const deliveryAddress = localStorage.getItem("userAddress");

  if (!deliveryAddress) {
    showToast("Please add a valid address before placing the order.");
    return;
  }

  // Prepare the foodItems array with the required structure from the cart
  const foodItems = Object.entries(cart).map(
    ([foodname, { price, quantity }]) => ({
      foodname,
      quantity,
      foodprice: price,
    })
  );

  if (foodItems.length === 0) {
    showToast("Error: Cart is empty or invalid.");
    return;
  }

  // Prepare the order data
  const orderData = {
    foodItems: foodItems, // Array of food items
    deliveryAddress: deliveryAddress, // The fetched address
  };

  // Log order data for debugging
  console.log("Order Data:", JSON.stringify(orderData));

  // Get the JWT token from localStorage
  const token = localStorage.getItem("jwtToken");

  if (!token) {
    showToast("Authorization token missing. Please log in.");
    return;
  }

  // Extract customer ID
  const customerId = userDetails?.customerid;

  // Check if token and customerId are available
  if (!token || !customerId) {
    console.error("Token or Customer ID missing!");
    showToast("Authentication error. Please log in again.");
    return;
  }

  try {
    // Send the order data to the backend
    const response = await fetch(
      "https://192.168.29.101:8082/orders/create?customerid",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include JWT token in Authorization header
        },
        body: JSON.stringify(orderData), // Convert order data to JSON
      }
    );

    // Handle the response
    if (response.ok) {
      const result = await response.json();

      // Check if the order was successful and a session URL is provided
      if (result.status === "SUCCESS" && result.sessionUrl) {
        // Redirect the user to Stripe Checkout or success page
        window.location.href = result.sessionUrl;
      } else {
        showToast("Error: Payment session creation failed.");
      }
    } else if (response.status === 401) {
      showToast("Unauthorized access. Please log in again.");
      window.location.href = "login.html"; // Redirect to login page
    } else {
      const error = await response.json();
      showToast(`Error: ${error.message || "Failed to place the order"}`);
    }
  } catch (error) {
    console.error("Error placing order:", error);
    showToast(
      "An error occurred while placing your order. Please try again later."
    );
  }
}

// Event listener for "Place Order" button
document
  .getElementById("place-order-btn")
  .addEventListener("click", placeOrders);

// Fetch meal data and create meal cards
// fetch("food.json")
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data); // Log the loaded data
//     const mealCardsContainer = document.getElementById("meal-cards");
//     data.meals.forEach((meal, index) => {
//       const mealCard = document.createElement("div");
//       mealCard.classList.add("col-lg-6", "col-md-6", "mb-4");

//       let mealCardContent = `
//         <div class="d-flex border meal-border p-3">
//           <img src="${meal.food_plan.veg && meal.food_plan.veg[0] ? meal.food_plan.veg[0].meal_image : 'images/food/deit_meal/PCOS-Friendly'}" class="img-fluid me-3" alt="${meal.meal_name}">
//           <div>
//             <h5 class="mb-1">${meal.meal_name}</h5>
//             <p class="mb-1 text-muted">${meal.description}</p>
//             <p class="mt-2"><strong>Price: ₹${meal.price}</strong></p>
//             <div class="text-end">
//               <button class="btn-subscription btn btn-primary btn-details" data-index="${index}">Make Subscription</button>
//             </div>
//           </div>
//         </div>
//       `;

//       mealCard.innerHTML = mealCardContent;
//       mealCardsContainer.appendChild(mealCard);
//     });
//   })
//   .catch((error) => {
//     console.error("Error loading meal data:", error);
//   });

// // Function to open the meal details modal
// function openMealDetailsModal(meal) {
//   const modalContent = document.getElementById("meal-details-content");
//   const modalElement = document.getElementById("mealDetailsModal");
//   const subscriptionFormContent = document.getElementById(
//     "subscription-form-content"
//   );

//   let mealDetailsHtml = `
//     <h4>${meal.meal_name}</h4>
//     <p>${meal.description}</p>
//     <p><strong>Price: ₹${meal.price}</strong></p>
//     <h5>Meal Plan </h5>
//     <div class="row">
//   `;

//   meal.food_plan.forEach((day) => {
//     mealDetailsHtml += `
//       <div class="col-md-6">
//         <div class="offer-card">
//           <img src="${day.meal_image}" alt="${day.food_name}" class="img-fluid">
//           <div class="offer-details">
//             <h5>${day.day}</h5>
//             <p><strong>${day.food_name}</strong></p>
//             <p>${day.meal_description}</p>
//           </div>
//         </div>
//       </div>
//     `;
//   });

//   mealDetailsHtml += `</div>`;
//   modalContent.innerHTML = mealDetailsHtml;

//   const mealDetailsModal = new bootstrap.Modal(modalElement);
//   mealDetailsModal.show();

//   const orderNowBtn = document.getElementById("orderNowBtn");
//   orderNowBtn.addEventListener("click", function () {
//     openSubscriptionForm(meal);
//   });
// }

// // Function to open the subscription form
// function openSubscriptionForm(meal) {
//   const modalContent = document.getElementById("meal-details-content");
//   const subscriptionFormContent = document.getElementById(
//     "subscription-form-content"
//   );
//   const orderNowBtn = document.getElementById("orderNowBtn");
//   const placeOrderBtn = document.getElementById("placeOrderBtn");

//   modalContent.classList.remove("active");
//   subscriptionFormContent.classList.add("active");

//   let subscriptionFormHtml = `
//     <h4>${meal.meal_name}</h4>
//     <h5>Select Subscription Plan</h5>
//     <div class="row">
//       <div class="col-6 mb-1">
//         <label for="subscriptionPlan" class="form">Choose Subscription Plan</label>
//         <select class="form-select" id="subscriptionPlan">
//           <option value="7">7 Days</option>
//           <option value="14">14 Days</option>
//           <option value="21">21 Days</option>
//           <option value="28">28 Days</option>
//         </select>
//       </div>
//       <div class="col-6 mb-1">
//         <label for="startDate" class="form">Start Date</label>
//         <input type="date" class="form-control" id="startDate" required>
//       </div>
//       <div class="col-6 mb-1">
//         <label for="quantity" class="form">Quantity</label>
//         <input type="number" class="form-control" id="quantity" value="1" min="1" required>
//       </div>
//     </div>
//     <div class="mb-1">
//       <label for="mealPrice" class="form">Meal Price</label>
//       <div class="form-control" id="mealPrice">₹${meal.price}</div>
//     </div>
//     <div class="mb-1">
//       <label for="mealAmount" class="form">Meal Amount (Meal Price x Quantity x Days)</label>
//       <div class="form-control" id="mealAmount">₹0.00</div>
//     </div>
//     <div class="mb-1">
//       <label for="gstAmount" class="form">GST (18%)</label>
//       <div class="form-control" id="gstAmount">₹0.00</div>
//     </div>
//     <div class="mb-1">
//       <label for="totalAmount" class="form">Total Amount</label>
//       <div class="form-control" id="totalAmount">₹0.00</div>
//     </div>
//     <div class="mb-1">
//       <label for="address" class="form">Delivery Address</label>
//       <textarea class="form-control" id="address" rows="3" required></textarea>
//     </div>
//   `;

//   subscriptionFormContent.innerHTML = subscriptionFormHtml;

//   const subscriptionPlanSelect = document.getElementById("subscriptionPlan");
//   const quantityInput = document.getElementById("quantity");
//   const mealAmountElement = document.getElementById("mealAmount");
//   const gstAmountElement = document.getElementById("gstAmount");
//   const totalAmountElement = document.getElementById("totalAmount");

//   function calculateAmounts() {
//     const selectedPlan = parseInt(subscriptionPlanSelect.value);
//     const quantity = parseInt(quantityInput.value);
//     const baseAmount = meal.price * selectedPlan * quantity;
//     const gst = baseAmount * 0.18;
//     const totalAmount = baseAmount + gst;

//     mealAmountElement.innerText = `₹${baseAmount.toFixed(2)}`;
//     gstAmountElement.innerText = `₹${gst.toFixed(2)}`;
//     totalAmountElement.innerText = `₹${totalAmount.toFixed(2)}`;
//   }

//   subscriptionPlanSelect.addEventListener("change", calculateAmounts);
//   quantityInput.addEventListener("input", calculateAmounts);

//   orderNowBtn.style.display = "none";
//   placeOrderBtn.style.display = "inline-block";

//   placeOrderBtn.addEventListener("click", function () {
//     const subscriptionPlan = parseInt(subscriptionPlanSelect.value);
//     const startDate = document.getElementById("startDate").value;
//     const quantity = document.getElementById("quantity").value;
//     const totalAmount = totalAmountElement.innerText;
//     const address = document.getElementById("address").value;

//     const orderDetails = {
//       mealName: meal.meal_name,
//       subscriptionPlan: subscriptionPlan,
//       startDate: startDate,
//       quantity: quantity,
//       totalAmount: totalAmount.replace("₹", "").trim(), // Remove ₹ and extra spaces
//       address: address,
//     };

//     // Get user ID and token from localStorage
//     const userId = getUserIdFromLocalStorage();
//     const token = getTokenFromLocalStorage();
//     if (!userId || !token) {
//       alert("User not logged in or token missing. Please log in again.");
//       return;
//     }

//     // Send data to the backend with user ID in the URL and token in the header
//     fetch(`http://192.168.1.12:8082/api/subscription/create/${userId}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`, // Add token in header
//       },
//       body: JSON.stringify(orderDetails),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.status === "SUCCESS") {
//           console.log("Order response:", data);
//           alert("Order placed successfully!");

//           // Close the modal
//           const modalElement = document.getElementById("mealDetailsModal");
//           const modal = bootstrap.Modal.getInstance(modalElement);
//           modal.hide(); // Close modal using Bootstrap's modal instance

//           // Redirect to Stripe payment page
//           window.location.href = data.sessionUrl; // Redirect to Stripe payment page
//         } else {
//           alert("Failed to create payment session.");
//         }
//       })
//       .catch((error) => {
//         console.error("Error placing order:", error);
//         alert("Failed to place order.");
//       });
//   });

//   calculateAmounts();
// }

// Fetch meals data from the food.json file
fetch("foods.json")
  .then((response) => response.json())
  .then((data) => {
    console.log(data); // Log the loaded data
    const mealCardsContainer = document.getElementById("meal-cards");

    // Loop through meals data and generate meal cards
    data.meals.forEach((meal, index) => {
      const mealCard = document.createElement("div");
      mealCard.classList.add("col-lg-6", "col-md-6", "mb-4");

      let mealCardContent = `
        <div class="d-flex border meal-border p-3">
          <img src="${
            meal.food_plan.veg && meal.food_plan.veg[0]
              ? meal.food_plan.veg[0].meal_image
              : "images/food/deit_meal/PCOS-Friendly"
          }" class="img-fluid rounded me-3 diet-img " alt="${meal.meal_name}">
          <div>
            <h5 class="mb-1">${meal.meal_name}</h5>
            <p class="mb-1 text-muted">${meal.description}</p>
            <p class="mt-2"><strong>Price: ₹${meal.price}</strong></p>
            <div class="subscription">
              <button class="btn-subscription btn btn-primary btn-details " data-index="${index}">Make Subscription</button>
            </div>
          </div>
        </div>
      `;

      mealCard.innerHTML = mealCardContent;
      mealCardsContainer.appendChild(mealCard);
    });

    // Add event listener for "Make Subscription" button click
    const subscriptionButtons = document.querySelectorAll(".btn-details");
    subscriptionButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const index = event.target.dataset.index;
        const meal = data.meals[index];

        // Open the modal and fill it with meal details
        openMealDetailsModal(meal);
      });
    });
  })
  .catch((error) => {
    console.error("Error loading meal data:", error);
  });

function openMealDetailsModal(meal) {
  const modalContent = document.getElementById("meal-details-content");
  const modalElement = document.getElementById("mealDetailsModal");

  let mealDetailsHtml = `
    <h4>${meal.meal_name}</h4>
    <p>${meal.description}</p>
    <p><strong>Price: ₹${meal.price}</strong></p>
    <h5>Meal Plan</h5>

    <!-- Display Veg and Non-Veg Meals Side by Side -->
    <div class="row">
      <!-- Vegetarian Meals (Left Side) -->
      <div class="col-md-6">
        <h6 class="text-center">Vegetarian Meals</h6>
        <div class="row">
  `;

  // Loop through and display vegetarian meals
  meal.food_plan.veg.forEach((day) => {
    mealDetailsHtml += `
      <div class="col-lg-12 mb-3">
        <div class="diet-card bg-green-soft-01">
          <img src="${day.meal_image}" alt="${day.food_name}" class="img-fluid">
          <div class="diet-details">
            <h5>${day.day}</h5>
            <p><strong>${day.food_name}</strong></p>
            <p>${day.meal_description}</p>
          </div>
        </div>
      </div>
    `;
  });

  mealDetailsHtml += `</div></div>`; // Close veg section

  // Non-Vegetarian Meals (Right Side)
  mealDetailsHtml += `
      <div class="col-md-6">
        <h6 class="text-center">Non-Vegetarian Meals</h6>
        <div class="row">
  `;

  // Loop through and display non-vegetarian meals
  meal.food_plan.non_veg.forEach((day) => {
    mealDetailsHtml += `
      <div class="col-lg-12 mb-3">
        <div class="diet-card bg-black-soft-01">
          <img src="${day.meal_image}" alt="${day.food_name}" class="img-fluid">
          <div class="diet-details">
            <h5>${day.day}</h5>
            <p><strong>${day.food_name}</strong></p>
            <p>${day.meal_description}</p>
          </div>
        </div>
      </div>
    `;
  });

  mealDetailsHtml += `</div></div>`; // Close non-veg section
  mealDetailsHtml += `</div>`; // Close row

  modalContent.innerHTML = mealDetailsHtml;

  // Show the modal
  const mealDetailsModal = new bootstrap.Modal(modalElement);
  mealDetailsModal.show();

  // Toggle Switch Logic
  // const mealToggle = document.getElementById("mealToggle");
  // const toggleLabel = document.getElementById("toggleLabel");
  // const vegSection = document.getElementById("vegSection");
  // const nonVegSection = document.getElementById("nonVegSection");

  // mealToggle.addEventListener("change", function () {
  //   if (mealToggle.checked) {
  //     vegSection.classList.add("d-none");
  //     nonVegSection.classList.remove("d-none");
  //     toggleLabel.textContent = "Non-Vegetarian";
  //   } else {
  //     vegSection.classList.remove("d-none");
  //     nonVegSection.classList.add("d-none");
  //     toggleLabel.textContent = "Vegetarian";
  //   }
  // });

  // Handle Order Now Button
  const orderNowBtn = document.getElementById("orderNowBtn");
  orderNowBtn.addEventListener("click", function () {
    openSubscriptionForm(meal);
  });
}

// Function to open the subscription form inside the modal
function openSubscriptionForm(meal) {
  const modalContent = document.getElementById("meal-details-content");
  const subscriptionFormContent = document.getElementById(
    "subscription-form-content"
  );
  const orderNowBtn = document.getElementById("orderNowBtn");
  const placeOrderBtn = document.getElementById("placeOrderBtn");

  modalContent.classList.remove("active");
  subscriptionFormContent.classList.add("active");

  let subscriptionFormHtml = `
    <h4>${meal.meal_name}</h4>
    <h5>Select Subscription Plan</h5>
    <div class="row">
      <div class="col-6 mb-1">
        <label for="subscriptionPlan" class="form">Choose Subscription Plan</label>
        <select class="form-select" id="subscriptionPlan">
          <option value="7">7 Days</option>
          <option value="14">14 Days</option>
          <option value="21">21 Days</option>
          <option value="28">28 Days</option>
        </select>
      </div>
      <div class="col-6 mb-1">
        <label for="startDate" class="form">Start Date</label>
        <input type="date" class="form-control" id="startDate" required>
      </div>
      <div class="col-6 mb-1">
        <label for="mealType" class="form">Meal Type</label>
        <select class="form-select" id="mealType">
          <option value="veg">Veg</option>
          <option value="nonveg">Non-Veg (+₹100)</option>
        </select>
        
      </div>
      <div class="col-6 mb-1">
        <label for="quantity" class="form">Quantity</label>
        <input type="number" class="form-control" id="quantity" value="1" min="1" required>
        
      </div>
    </div>
    <div class="mb-1">
      <label for="mealPrice" class="form">Meal Price</label>
      <div class="form-control" id="mealPrice">₹${meal.price.toFixed(2)}</div>
      <span>Non-veg extra ₹100</span>
      </div>
    <div class="mb-1">
      <label for="mealAmount" class="form">Meal Amount (Meal Price x Quantity x Days)</label>
      <div class="form-control" id="mealAmount">₹0.00</div>
    </div>
    <div class="mb-1">
      <label for="gstAmount" class="form">GST (18%)</label>
      <div class="form-control" id="gstAmount">₹0.00</div>
    </div>
    <div class="mb-1">
      <label for="totalAmount" class="form">Total Amount</label>
      <div class="form-control" id="totalAmount">₹0.00</div>
    </div>
    <div class="mb-1">
      <label for="address" class="form">Delivery Address</label>
      <textarea class="form-control" id="address" rows="3" required></textarea>
    </div>
  `;

  subscriptionFormContent.innerHTML = subscriptionFormHtml;

  const subscriptionPlanSelect = document.getElementById("subscriptionPlan");
  const mealTypeSelect = document.getElementById("mealType");
  const quantityInput = document.getElementById("quantity");
  const mealAmountElement = document.getElementById("mealAmount");
  const gstAmountElement = document.getElementById("gstAmount");
  const totalAmountElement = document.getElementById("totalAmount");

  function calculateAmounts() {
    const selectedPlan = parseInt(subscriptionPlanSelect.value);
    const quantity = parseInt(quantityInput.value);
    const mealType = mealTypeSelect.value;

    let baseMealPrice = meal.price;

    if (mealType === "nonveg") {
      baseMealPrice += 100; // Add ₹100 for Non-Veg option
    }

    const baseAmount = baseMealPrice * selectedPlan * quantity;
    const gst = baseAmount * 0.18;
    const totalAmount = baseAmount + gst;

    mealAmountElement.innerText = `₹${baseAmount.toFixed(2)}`;
    gstAmountElement.innerText = `₹${gst.toFixed(2)}`;
    totalAmountElement.innerText = `₹${totalAmount.toFixed(2)}`;
  }

  subscriptionPlanSelect.addEventListener("change", calculateAmounts);
  mealTypeSelect.addEventListener("change", calculateAmounts);
  quantityInput.addEventListener("input", calculateAmounts);

  orderNowBtn.style.display = "none";
  placeOrderBtn.style.display = "inline-block";

  placeOrderBtn.addEventListener("click", function () {
    const subscriptionPlan = parseInt(subscriptionPlanSelect.value);
    const startDate = document.getElementById("startDate").value;
    const quantity = document.getElementById("quantity").value;
    const totalAmount = totalAmountElement.innerText;
    const address = document.getElementById("address").value;
    const mealType = mealTypeSelect.value;

    const orderDetails = {
      mealName: meal.meal_name,
      mealType: mealType,
      subscriptionPlan: subscriptionPlan,
      startDate: startDate,
      quantity: quantity,
      totalAmount: totalAmount.replace("₹", "").trim(), // Remove ₹ and extra spaces
      address: address,
    };

    const token = localStorage.getItem("jwt_token");
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));

    // Extract customer ID
    const customerId = userDetails?.customerid;

    // Check if token and customerId are available
    if (!token || !customerId) {
      console.error("Token or Customer ID missing!");
      showToast("Authentication error. Please log in again.");
      return;
    }

    // Construct the API URL with customerId in the path
    const apiUrl = `${API_BASE_URL}/subscription/create/${customerId}`;

    // API call to place order
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Send JWT token in headers
      },
      body: JSON.stringify(orderDetails), // Send order details in the body
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "SUCCESS" && data.sessionUrl) {
          showToast("Redirecting to payment...");
          window.location.href = data.sessionUrl; // Redirect to payment page
        } else {
          showToast("Failed to create payment session.");
        }
      })
      .catch((error) => {
        console.error("Error placing order:", error);
        showToast("Failed to place order.");
      });
  });

  calculateAmounts();
}

// Reset modal when closed
const modalElement = document.getElementById("mealDetailsModal");
modalElement.addEventListener("hidden.bs.modal", function () {
  const modalContent = document.getElementById("meal-details-content");
  const subscriptionFormContent = document.getElementById(
    "subscription-form-content"
  );
  const orderNowBtn = document.getElementById("orderNowBtn");
  const placeOrderBtn = document.getElementById("placeOrderBtn");

  modalContent.classList.add("active");
  subscriptionFormContent.classList.remove("active");

  orderNowBtn.style.display = "inline-block";
  placeOrderBtn.style.display = "none";

  subscriptionFormContent.innerHTML = "";
});

// vrat meal function


// vrat meal function
let selectedPlan = "";
let mealPrice = 0;

// Function to move from plan selection to order details
function proceedToDetails(plan, price) {
  selectedPlan = plan;
  mealPrice = price;

  // Switch content
  document.getElementById("plan-selection").style.display = "none";
  document.getElementById("order-details").style.display = "block";

  // Set meal price
  document.getElementById("meal-price").textContent = `₹${mealPrice.toFixed(2)}`;
  updateTotal();
}

// Function to update total amount
function updateTotal() {
  const quantity = parseInt(document.getElementById("quantity").value, 10) || 1;
  const gst = mealPrice * quantity * 0.18;
  const total = mealPrice * quantity + gst;

  document.getElementById("gst-amount").textContent = `₹${gst.toFixed(2)}`;
  document.getElementById("total-amount").textContent = `₹${total.toFixed(2)}`;
}

// Function to handle day selection logic
function toggleDaysSelection(type) {
  const allDays = document.getElementById("allDays");
  const dayOptions = document.querySelectorAll(".day-option");

  if (type === "all") {
    if (allDays.checked) {
      // If "All Days" is checked, disable all other options
      dayOptions.forEach(day => {
        day.checked = false;
        day.disabled = true;
      });
    } else {
      // If "All Days" is unchecked, enable all other options again
      dayOptions.forEach(day => {
        day.disabled = false;
      });
    }
  } else {
    let anyChecked = false;

    dayOptions.forEach(day => {
      if (day.checked) {
        anyChecked = true;
      }
    });

    // Disable "All Days" if any individual days are selected, otherwise enable it
    allDays.disabled = anyChecked;
  }
}

// Function to place the order
async function placeOrder() {
  const startDate = document.getElementById("startDate").value;
  const quantity = parseInt(document.getElementById("quantity").value, 10);
  const address = document.getElementById("deliveryAddress").value;

  if (!startDate || !quantity || !address) {
    showToast("Please fill out all details before placing the order.");
    return;
  }

  // Retrieve JWT token and customer ID from local storage
  const token = localStorage.getItem("jwt_token");
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const customerId = userDetails?.customerid;

  if (!token || !customerId) {
    showToast("Authentication error! Please log in again.");
    return;
  }

  // Prepare order data
  const orderData = {
    plan: selectedPlan,
    startDate,
    quantity,
    mealPrice,
    totalAmount: mealPrice * quantity + mealPrice * quantity * 0.18,
    address,
  };

  console.log("Order Data:", orderData);

  // Backend API URL with customer ID in the URL
  const url = `${API_BASE_URL}/vratsubscription/create/${customerId}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });

    if (response.ok) {
      const data = await response.json();
      showToast("Order placed successfully!");

      if (data.sessionUrl) {
        window.location.href = data.sessionUrl;
      } else {
        location.reload();
      }
    } else {
      const error = await response.json();
      showToast(`Failed to place order: ${error.message}`);
    }
  } catch (error) {
    console.error("Error placing order:", error);
    showToast("An error occurred. Please try again.");
  }
}

// Reset modal to its initial state when closed
document.getElementById("vratMealModal").addEventListener("hidden.bs.modal", () => {
  document.getElementById("plan-selection").style.display = "block";
  document.getElementById("order-details").style.display = "none";

  document.getElementById("startDate").value = "";
  document.getElementById("quantity").value = 1;
  document.getElementById("meal-price").textContent = "₹0.00";
  document.getElementById("gst-amount").textContent = "₹0.00";
  document.getElementById("total-amount").textContent = "₹0.00";
  document.getElementById("deliveryAddress").value = "";

  document.getElementById("allDays").checked = false;
  document.getElementById("allDays").disabled = false;

  document.querySelectorAll(".day-option").forEach(day => {
    day.checked = false;
    day.disabled = false;
  });
});





// let selectedPlan = "";
// let mealPrice = 0;

// // Function to move from plan selection to order details
// function proceedToDetails(plan, price) {
//   selectedPlan = plan;
//   mealPrice = price;

//   // Switch content
//   document.getElementById("plan-selection").style.display = "none";
//   document.getElementById("order-details").style.display = "block";

//   // Set meal price
//   document.getElementById("meal-price").textContent = `₹${mealPrice.toFixed(
//     2
//   )}`;
//   updateTotal();
// }

// // Function to update total amount
// function updateTotal() {
//   const quantity = parseInt(document.getElementById("quantity").value, 10) || 1;
//   const gst = mealPrice * quantity * 0.18;
//   const total = mealPrice * quantity + gst;

//   document.getElementById("gst-amount").textContent = `₹${gst.toFixed(2)}`;
//   document.getElementById("total-amount").textContent = `₹${total.toFixed(2)}`;
// }

// // Function to place the order
// // Function to place the order with JWT token and customer ID
// async function placeOrder() {
//   const startDate = document.getElementById("startDate").value;
//   const quantity = parseInt(document.getElementById("quantity").value, 10);
//   const address = document.getElementById("deliveryAddress").value;

//   if (!startDate || !quantity || !address) {
//     showToast("Please fill out all the details before placing the order.");
//     return;
//   }

//   // Retrieve JWT token and customer ID from local storage
//   const token = localStorage.getItem("jwt_token");
//   const userDetails = JSON.parse(localStorage.getItem("userDetails")); // Parse stored user details
//   const customerId = userDetails?.customerid; // Get customer ID

//   if (!token || !customerId) {
//     showToast("Authentication error! Please log in again.");
//     return;
//   }

//   // Prepare order data
//   const orderData = {
//     plan: selectedPlan,
//     startDate,
//     quantity,
//     mealPrice,
//     totalAmount: mealPrice * quantity + mealPrice * quantity * 0.18,
//     address,
//   };

//   console.log("Order Data:", orderData);

//   // Backend API URL with customer ID in the URL
//   const url = `http://192.168.29.101:8082/api/vratsubscription/create/${customerId}`;

//   try {
//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`, // Send JWT token in headers
//       },
//       body: JSON.stringify(orderData),
//     });

//     if (response.ok) {
//       const data = await response.json();
//       showToast("Order placed successfully!");

//       if (data.sessionUrl) {
//         // Redirect to payment page if session URL is returned
//         window.location.href = data.sessionUrl;
//       } else {
//         location.reload(); // Reload if no payment required
//       }
//     } else {
//       const error = await response.json();
//       showToast(`Failed to place order: ${error.message}`);
//     }
//   } catch (error) {
//     console.error("Error placing order:", error);
//     showToast("An error occurred. Please try again.");
//   }
// }

// // Reset modal to its initial state when closed
// document
//   .getElementById("vratMealModal")
//   .addEventListener("hidden.bs.modal", () => {
//     // Reset to "Plan Selection" step
//     document.getElementById("plan-selection").style.display = "block";
//     document.getElementById("order-details").style.display = "none";

//     // Reset form fields
//     document.getElementById("startDate").value = "";
//     document.getElementById("quantity").value = 1;
//     document.getElementById("meal-price").textContent = "₹0.00";
//     document.getElementById("gst-amount").textContent = "₹0.00";
//     document.getElementById("total-amount").textContent = "₹0.00";
//     document.getElementById("deliveryAddress").value = "";
//   });

// ======================================================================================================================================================================================

// Fetch the data from the food.json file
// fetch("food.json")
//   .then((response) => response.json())
//   .then((data) => {
//     const mealCardsContainer = document.getElementById("meal-cards");

//     // Loop through the meals data and create meal cards
//     data.meals.forEach((meal, index) => {
//       // Create the card for each meal
//       const mealCard = document.createElement("div");
//       mealCard.classList.add("col-lg-6", "col-md-6", "mb-4");
//       mealCard.innerHTML = `
//         <div class="d-flex border meal-border p-3">
//           <img src="${meal.food_plan[0].meal_image}" class="img-fluid me-3" alt="${meal.meal_name}">
//           <div>
//             <h5 class="mb-1">${meal.meal_name}</h5>
//             <p class="mb-1 text-muted">${meal.description}</p>
//             <p class="mt-2"><strong>Price: ₹${meal.price}</strong></p>
//             <div class="text-end">
//               <button class="btn-subscription btn btn-primary btn-details" data-index="${index}">Make Subscription</button>
//             </div>
//           </div>
//         </div>
//       `;
//       mealCardsContainer.appendChild(mealCard);
//     });

//     // Add event listeners for "See Details" buttons
//     document.querySelectorAll(".btn-details").forEach((button) => {
//       button.addEventListener("click", function () {
//         const mealIndex = button.getAttribute("data-index");
//         openMealDetailsModal(data.meals[mealIndex]);
//       });
//     });
//   })
//   .catch((error) => console.error("Error loading meal data:", error));

// // Function to open the meal details modal
// function openMealDetailsModal(meal) {
//   const modalContent = document.getElementById("meal-details-content");
//   const modalElement = document.getElementById("mealDetailsModal");
//   const subscriptionFormContent = document.getElementById(
//     "subscription-form-content"
//   );

//   // Generate the meal details content for the modal
//   let mealDetailsHtml = `
//     <h4>${meal.meal_name}</h4>
//     <p>${meal.description}</p>
//     <p><strong>Price: ₹${meal.price}</strong></p>
//     <h5>Meal Plan </h5>
//     <div class="row">
//   `;

//   meal.food_plan.forEach((day) => {
//     mealDetailsHtml += `
//       <div class="col-md-6">
//     <div class="offer-card">
//         <img src="${day.meal_image}" alt="${day.food_name}" class="img-fluid">
//         <div class="offer-details">
//             <h5>${day.day}</h5>
//             <p><strong>${day.food_name}</strong></p>
//             <p>${day.meal_description}</p>
//         </div>
//     </div>
// </div>
//     `;
//   });

//   mealDetailsHtml += `</div>`; // End the row

//   // Append the meal details into the modal body
//   modalContent.innerHTML = mealDetailsHtml;

//   // Show the meal details modal
//   const mealDetailsModal = new bootstrap.Modal(modalElement);
//   mealDetailsModal.show();

//   // Set up event listener for the "Order Now" button
//   const orderNowBtn = document.getElementById("orderNowBtn");
//   orderNowBtn.addEventListener("click", function () {
//     openSubscriptionForm(meal);
//   });
// }

// function openSubscriptionForm(meal) {
//   const modalContent = document.getElementById("meal-details-content");
//   const subscriptionFormContent = document.getElementById(
//     "subscription-form-content"
//   );
//   const orderNowBtn = document.getElementById("orderNowBtn");
//   const placeOrderBtn = document.getElementById("placeOrderBtn");

//   // Hide meal details and show the subscription form
//   modalContent.classList.remove("active");
//   subscriptionFormContent.classList.add("active");

//   // Generate the subscription form content
//   let subscriptionFormHtml = `
//     <h5>Select Subscription Plan</h5>
//     <div class="row">
//       <div class="col-6 mb-1">
//         <label for="subscriptionPlan" class="form">Choose Subscription Plan</label>
//         <select class="form-select" id="subscriptionPlan">
//           <option value="7">7 Days</option>
//           <option value="14">14 Days</option>
//           <option value="21">21 Days</option>
//           <option value="28">28 Days</option>
//         </select>
//       </div>
//       <div class="col-6 mb-1">
//         <label for="startDate" class="form">Start Date</label>
//         <input type="date" class="form-control" id="startDate" required>
//       </div>
//       <div class="col-6 mb-1">
//         <label for="quantity" class="form">Quantity</label>
//         <input type="number" class="form-control" id="quantity" value="1" min="1" required>
//       </div>
//     </div>

//     <div class="mb-1">
//       <label for="mealPrice" class="form">Meal Price</label>
//       <div class="form-control" id="mealPrice">₹${meal.price}</div>
//     </div>
//     <div class="mb-1">
//       <label for="mealAmount" class="form">Meal Amount (Meal Price x Quantity x Days)</label>
//       <div class="form-control" id="mealAmount">₹0.00</div>
//     </div>
//     <div class="mb-1">
//       <label for="gstAmount" class="form">GST (18%)</label>
//       <div class="form-control" id="gstAmount">₹0.00</div>
//     </div>
//     <div class="mb-1">
//       <label for="totalAmount" class="form">Total Amount</label>
//       <div class="form-control" id="totalAmount">₹0.00</div>
//     </div>
//     <div class="mb-1">
//       <label for="address" class="form">Delivery Address</label>
//       <textarea class="form-control" id="address" rows="3" required></textarea>
//     </div>
//   `;

//   subscriptionFormContent.innerHTML = subscriptionFormHtml;

//   // Get necessary elements for dynamic updates
//   const subscriptionPlanSelect = document.getElementById("subscriptionPlan");
//   const quantityInput = document.getElementById("quantity");
//   const mealAmountElement = document.getElementById("mealAmount");
//   const gstAmountElement = document.getElementById("gstAmount");
//   const totalAmountElement = document.getElementById("totalAmount");
//   const mealPriceElement = document.getElementById("mealPrice");

//   // Function to calculate and update the amounts
//   function calculateAmounts() {
//     const selectedPlan = parseInt(subscriptionPlanSelect.value);
//     const quantity = parseInt(quantityInput.value);
//     const baseAmount = meal.price * selectedPlan * quantity; // Meal Price * Days * Quantity
//     const gst = baseAmount * 0.18;
//     const totalAmount = baseAmount + gst;

//     // Update meal amount breakdown (Meal Price * Quantity * Days)
//     mealAmountElement.innerText = `₹${
//       meal.price
//     } * ${quantity} * ${selectedPlan} = ₹${baseAmount.toFixed(2)}`;

//     // Update GST and Total Amount
//     gstAmountElement.innerText = `₹${gst.toFixed(2)}`;
//     totalAmountElement.innerText = `₹${totalAmount.toFixed(2)}`;
//   }

//   // Event listeners to trigger the calculation when the plan or quantity changes
//   subscriptionPlanSelect.addEventListener("change", calculateAmounts);
//   quantityInput.addEventListener("input", calculateAmounts);

//   // Show the "Place Order" button and hide "Order Now"
//   orderNowBtn.style.display = "none";
//   placeOrderBtn.style.display = "inline-block";

//   // Handle the "Place Order" button click
//   placeOrderBtn.addEventListener("click", function () {
//     const subscriptionPlan = subscriptionPlanSelect.value;
//     const startDate = document.getElementById("startDate").value;
//     const address = document.getElementById("address").value;
//     const totalAmount = totalAmountElement.innerText;

//     // Send all the details to the backend for payment processing
//     const orderDetails = {
//       meal: meal.meal_name,
//       subscription_plan: subscriptionPlan,
//       start_date: startDate,
//       total_amount: totalAmount,
//       address: address,
//     };

//     console.log("Order Details:", orderDetails);
//     // Call your backend API here to send the order details and get the payment gateway link
//     // Example:
//     // fetch('/placeOrder', {
//     //   method: 'POST',
//     //   body: JSON.stringify(orderDetails),
//     //   headers: { 'Content-Type': 'application/json' }
//     // }).then(response => response.json())
//     //   .then(data => {
//     //     window.location.href = data.paymentGatewayLink;
//     //   });
//   });

//   // Initial calculation when form loads
//   calculateAmounts();
// }

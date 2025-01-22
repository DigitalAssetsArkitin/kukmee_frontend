// add to chart items

// Function to update the cart and total
// Function to update the cart and total
// function updateCart() {
//     let cartItems = [];
//     let totalPrice = 0;

//     // Loop through each food item and get the quantity, price, and image
//     document.querySelectorAll('.food-card').forEach((foodCard, index) => {
//       const quantity = parseInt(foodCard.querySelector('.quantity').textContent);
//       if (quantity > 0) {
//         const itemName = foodCard.querySelector('.food-description h5').textContent;
//         const itemPrice = parseFloat(foodCard.querySelector('.add-to-cart').getAttribute('data-price'));
//         const itemTotalPrice = itemPrice * quantity;
//         const itemImageSrc = foodCard.querySelector('img').getAttribute('src'); // Get the image src

//         cartItems.push({
//           name: itemName,
//           quantity: quantity,
//           price: itemPrice,
//           totalPrice: itemTotalPrice,
//           image: itemImageSrc // Store the image source
//         });
//         totalPrice += itemTotalPrice;
//       }
//     });

//     // Display the cart items in the offcanvas
//     const cartList = document.getElementById('offcanvas-cart-items');
//     cartList.innerHTML = ''; // Clear the cart list before adding new items
//     cartItems.forEach(item => {
//       const cartItemElement = document.createElement('li');
//       cartItemElement.classList.add('d-flex', 'align-items-center', 'mb-3');

//       // Create the image element
//       const itemImage = document.createElement('img');
//       itemImage.src = item.image;
//       itemImage.alt = item.name;
//       itemImage.classList.add('img-fluid', 'me-3');
//       itemImage.style.width = '50px'; // Set image width

//       // Create the text for the item (name, quantity, price)
//       const itemText = document.createElement('div');
//       itemText.innerHTML = `
//         <strong>${item.name}</strong><br>
//         ${item.quantity} x $${item.price.toFixed(2)} = $${item.totalPrice.toFixed(2)}
//       `;

//       // Append the image and text to the cart item
//       cartItemElement.appendChild(itemImage);
//       cartItemElement.appendChild(itemText);

//       cartList.appendChild(cartItemElement); // Add the item to the cart list
//     });

//     // Display the total price
//     document.getElementById('offcanvas-cart-total').textContent = `Total: $${totalPrice.toFixed(2)}`;
//   }

//   // Event listeners for the quantity control buttons
//   document.querySelectorAll('.minus').forEach((button, index) => {
//     button.addEventListener('click', () => {
//       const quantityDisplay = button.closest('.quantity-control').querySelector('.quantity');
//       let currentQuantity = parseInt(quantityDisplay.textContent);
//       if (currentQuantity > 0) {
//         quantityDisplay.textContent = currentQuantity - 1;
//       }
//       updateCart();
//     });
//   });

//   document.querySelectorAll('.plus').forEach((button, index) => {
//     button.addEventListener('click', () => {
//       const quantityDisplay = button.closest('.quantity-control').querySelector('.quantity');
//       let currentQuantity = parseInt(quantityDisplay.textContent);
//       quantityDisplay.textContent = currentQuantity + 1;
//       updateCart();
//     });
//   });

//   // Event listener for adding the food item to the cart
//   document.querySelectorAll('.add-to-cart').forEach((button, index) => {
//     button.addEventListener('click', () => {
//       updateCart();
//     });
//   });

//   dynamic food code

// Function to generate HTML for each food item
function generateFoodCard(item, isVeg) {
    const boxClass = isVeg ? "bg-green-soft-01" : "bg-black-soft-01";
  
    return `
        <div class="col-lg-6 col-sm-6 text-center mb-lg-0 mb-5 mt-5">
          <div class="Food-card">
            <div class="px-5">
              <img class="img-fluid rounded-circle zoom" src="${
                item.image
              }" alt="${item.name}">
            </div>
            <div class="${boxClass} food-box p-xl-5 p-4 rounded mt-n5">
              <div class="food-description">
                <h5 class="mt-5 mt-lg-4">${item.name}</h5>
                <p>${item.description}</p>
              </div>
              <div class="bg-white py-2 px-4 d-flex align-items-end justify-content-end">
                <ul class="d-flex text-warning mb-0 rounded ms-3">
                  ${'<li><i class="fas fa-star"></i></li>'.repeat(item.rating)}
                </ul>
                <span class="nakki">(${item.reviews}k)</span>
              </div>
              <div class="mt-3 d-flex justify-content-between">
                <div class="quantity-control d-inline-flex align-items-center border border-dark p-1">
                  <button class="btn btn-black py-0 px-1 minus">-</button>
                  <span class="quantity text-white mx-1" id="quantity-display1">0</span>
                  <button class="btn btn-black py-0 px-1 plus">+</button>
                </div>
                <button class="btn btn-black text-white py-1 px-3 add-to-cart add-button" data-item="${
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
  
  let cart = {}; // To store cart items
  
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
      alert(`${quantity} x ${name} added to the cart!`);
  
      updateCartUI(); // Update the cart display
    } else {
      alert("Please select a quantity greater than 0.");
    }
  }
  
  // Function to update the cart UI
  function updateCartUI() {
    const cartItemsContainer = document.getElementById("cart-items");
    const grandTotalEl = document.getElementById("grand-total");
    const placeOrderBtn = document.getElementById("place-order-btn");
    const gstAmountEl = document.getElementById("gst-amount"); // Add this element in HTML for GST
  
    // Clear existing items
    cartItemsContainer.innerHTML = "";
  
    let grandTotal = 0;
  
    // Populate cart items
    for (const itemName in cart) {
      const { image, price, quantity } = cart[itemName];
      grandTotal += price * quantity;
  
      cartItemsContainer.innerHTML += `
          <div class="d-flex align-items-center mb-3">
            <img src="${image}" alt="${itemName}" class="img-fluid rounded-circle" style="width: 50px; height: 50px;">
            <div class="ms-3">
              <h6>${itemName}</h6>
              <p class="mb-0">₹${price} x ${quantity}</p>
            </div>
            <div class="ms-auto">
              <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart('${itemName}')">Remove</button>
            </div>
          </div>
        `;
    }
  
    // Calculate 18% GST
    const gstAmount = (18 / 100) * grandTotal;
    const totalWithGST = grandTotal + gstAmount;
  
    // Update grand total and GST in the cart
    grandTotalEl.textContent = `₹${grandTotal.toFixed(2)}`; // Original total
    gstAmountEl.textContent = `₹${gstAmount.toFixed(2)}`; // Show GST amount
    document.getElementById("final-total").textContent = `₹${totalWithGST.toFixed(
      2
    )}`; // Final total with GST
  
    // Show or hide "Place Order" button
    placeOrderBtn.style.display = grandTotal > 0 ? "block" : "none";
  }
  
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
  async function placeOrder() {
    // Check if the cart is empty
    if (Object.keys(cart).length === 0) {
      alert(
        "Your cart is empty! Please add items to your cart before placing an order."
      );
      return;
    }
  
    // Get the delivery address from the form
    const deliveryAddress = {
      street: document.getElementById("street").value,
      city: document.getElementById("city").value,
      state: document.getElementById("state").value,
      zipCode: document.getElementById("zipCode").value,
    };
  
    // Validate address fields
    if (
      !deliveryAddress.street ||
      !deliveryAddress.city ||
      !deliveryAddress.state ||
      !deliveryAddress.zipCode
    ) {
      alert("Please fill in all the address fields.");
      return;
    }
  
    // Prepare the foodItems array with the required structure
    const foodItems = Object.entries(cart).map(
      ([foodname, { price, quantity }]) => ({
        foodname,
        quantity,
        foodprice: price,
      })
    );
  
    if (foodItems.length === 0) {
      alert("Error: Cart is empty or invalid.");
      return;
    }
  
    // Prepare the order data
    const orderData = {
      foodItems: foodItems, // Array of food items
      deliveryAddress: deliveryAddress, // Delivery address object
    };
  
    // Log order data for debugging
    console.log("Order Data:", JSON.stringify(orderData));
  
    // Get the JWT token from localStorage
    const token = localStorage.getItem("jwtToken");
  
    if (!token) {
      alert("Authorization token missing. Please log in.");
      return;
    }
  
    try {
      // Send the order data to the backend
      const response = await fetch(
        "https://0485-2401-4900-1cc9-f94f-988b-316e-669e-a724.ngrok-free.app/orders/create?customerid=2",
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
          // Redirect the user to Stripe Checkout
          window.location.href = result.sessionUrl;
        } else {
          alert("Error: Payment session creation failed.");
        }
      } else if (response.status === 401) {
        alert("Unauthorized access. Please log in again.");
        window.location.href = "login.html"; // Redirect to login page
      } else {
        const error = await response.json();
        alert(`Error: ${error.message || "Failed to place the order"}`);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert(
        "An error occurred while placing your order. Please try again later."
      );
    }
  }
  
  // Event listener for "Place Order" button
  document
    .getElementById("place-order-btn")
    .addEventListener("click", placeOrder);
  
  
  
  
  
  
    
  
  // Fetch the data from the food.json file
  fetch("food.json")
    .then((response) => response.json())
    .then((data) => {
      const mealCardsContainer = document.getElementById("meal-cards");
  
      // Loop through the meals data and create meal cards
      data.meals.forEach((meal, index) => {
        // Create the card for each meal
        const mealCard = document.createElement("div");
        mealCard.classList.add("col-lg-6", "col-md-6", "mb-4");
        mealCard.innerHTML = `
          <div class="d-flex border meal-border p-3">
            <img src="${meal.food_plan[0].meal_image}" class="img-fluid me-3" alt="${meal.meal_name}">
            <div>
              <h5 class="mb-1">${meal.meal_name}</h5>
              <p class="mb-1 text-muted">${meal.description}</p>
              <p class="mt-2"><strong>Price: ₹${meal.price}</strong></p>
              <div class="text-end">
                <button class="btn-subscription btn btn-primary btn-details" data-index="${index}">Make Subscription</button>
              </div>
            </div>
          </div>
        `;
        mealCardsContainer.appendChild(mealCard);
      });
  
      // Add event listeners for "See Details" buttons
      document.querySelectorAll(".btn-details").forEach((button) => {
        button.addEventListener("click", function () {
          const mealIndex = button.getAttribute("data-index");
          openMealDetailsModal(data.meals[mealIndex]);
        });
      });
    })
    .catch((error) => console.error("Error loading meal data:", error));
  
  // Function to open the meal details modal
  function openMealDetailsModal(meal) {
    const modalContent = document.getElementById("meal-details-content");
    const modalElement = document.getElementById("mealDetailsModal");
    const subscriptionFormContent = document.getElementById(
      "subscription-form-content"
    );
  
    // Generate the meal details content for the modal
    let mealDetailsHtml = `
      <h4>${meal.meal_name}</h4>
      <p>${meal.description}</p>
      <p><strong>Price: ₹${meal.price}</strong></p>
      <h5>Meal Plan </h5>
      <div class="row">
    `;
  
    meal.food_plan.forEach((day) => {
      mealDetailsHtml += `
        <div class="col-md-6">
      <div class="offer-card">
          <img src="${day.meal_image}" alt="${day.food_name}" class="img-fluid">
          <div class="offer-details">
              <h5>${day.day}</h5>
              <p><strong>${day.food_name}</strong></p>
              <p>${day.meal_description}</p>
          </div>
      </div>
  </div>
      `;
    });
  
    mealDetailsHtml += `</div>`; // End the row
  
    // Append the meal details into the modal body
    modalContent.innerHTML = mealDetailsHtml;
  
    // Show the meal details modal
    const mealDetailsModal = new bootstrap.Modal(modalElement);
    mealDetailsModal.show();
  
    // Set up event listener for the "Order Now" button
    const orderNowBtn = document.getElementById("orderNowBtn");
    orderNowBtn.addEventListener("click", function () {
      openSubscriptionForm(meal);
    });
  }
  
  function openSubscriptionForm(meal) {
    const modalContent = document.getElementById("meal-details-content");
    const subscriptionFormContent = document.getElementById(
      "subscription-form-content"
    );
    const orderNowBtn = document.getElementById("orderNowBtn");
    const placeOrderBtn = document.getElementById("placeOrderBtn");
  
    // Hide meal details and show the subscription form
    modalContent.classList.remove("active");
    subscriptionFormContent.classList.add("active");
  
    // Generate the subscription form content
    let subscriptionFormHtml = `
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
          <label for="quantity" class="form">Quantity</label>
          <input type="number" class="form-control" id="quantity" value="1" min="1" required>
        </div>
      </div>
      
      <div class="mb-1">
        <label for="mealPrice" class="form">Meal Price</label>
        <div class="form-control" id="mealPrice">₹${meal.price}</div>
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
  
    // Get necessary elements for dynamic updates
    const subscriptionPlanSelect = document.getElementById("subscriptionPlan");
    const quantityInput = document.getElementById("quantity");
    const mealAmountElement = document.getElementById("mealAmount");
    const gstAmountElement = document.getElementById("gstAmount");
    const totalAmountElement = document.getElementById("totalAmount");
    const mealPriceElement = document.getElementById("mealPrice");
  
    // Function to calculate and update the amounts
    function calculateAmounts() {
      const selectedPlan = parseInt(subscriptionPlanSelect.value);
      const quantity = parseInt(quantityInput.value);
      const baseAmount = meal.price * selectedPlan * quantity; // Meal Price * Days * Quantity
      const gst = baseAmount * 0.18;
      const totalAmount = baseAmount + gst;
  
      // Update meal amount breakdown (Meal Price * Quantity * Days)
      mealAmountElement.innerText = `₹${
        meal.price
      } * ${quantity} * ${selectedPlan} = ₹${baseAmount.toFixed(2)}`;
  
      // Update GST and Total Amount
      gstAmountElement.innerText = `₹${gst.toFixed(2)}`;
      totalAmountElement.innerText = `₹${totalAmount.toFixed(2)}`;
    }
  
    // Event listeners to trigger the calculation when the plan or quantity changes
    subscriptionPlanSelect.addEventListener("change", calculateAmounts);
    quantityInput.addEventListener("input", calculateAmounts);
  
    // Show the "Place Order" button and hide "Order Now"
    orderNowBtn.style.display = "none";
    placeOrderBtn.style.display = "inline-block";
  
    // Handle the "Place Order" button click
    placeOrderBtn.addEventListener("click", function () {
      const subscriptionPlan = subscriptionPlanSelect.value;
      const startDate = document.getElementById("startDate").value;
      const address = document.getElementById("address").value;
      const totalAmount = totalAmountElement.innerText;
  
      // Send all the details to the backend for payment processing
      const orderDetails = {
        meal: meal.meal_name,
        subscription_plan: subscriptionPlan,
        start_date: startDate,
        total_amount: totalAmount,
        address: address,
      };
  
      console.log("Order Details:", orderDetails);
      // Call your backend API here to send the order details and get the payment gateway link
      // Example:
      // fetch('/placeOrder', {
      //   method: 'POST',
      //   body: JSON.stringify(orderDetails),
      //   headers: { 'Content-Type': 'application/json' }
      // }).then(response => response.json())
      //   .then(data => {
      //     window.location.href = data.paymentGatewayLink;
      //   });
    });
  
    // Initial calculation when form loads
    calculateAmounts();
  }
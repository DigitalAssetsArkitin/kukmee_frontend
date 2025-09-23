// // kukmart js code

// let productsData = [];
// let currentPage = 1;
// let productsPerPage = 12;
// let searchQuery = "";

// // Fetch product data from products.json
// fetch("products.json")
//   .then((response) => response.json()) // Parse the JSON response
//   .then((data) => {
//     productsData = data.categories; // Store the products
//     renderProducts("All"); // Default render with "All" products

//     // Event listener for category selection
//     document.querySelectorAll(".widget-category a").forEach((item) => {
//       item.addEventListener("click", (e) => {
//         e.preventDefault();
//         const category = e.target.textContent;
//         renderProducts(category);
//       });
//     });

//     // Search functionality
//     document.getElementById("search-input").addEventListener("input", (e) => {
//       searchQuery = e.target.value.toLowerCase();
//       currentPage = 1; // Reset to first page when searching
//       renderProducts("All");
//     });
//   })
//   .catch((error) => {
//     console.error("Error fetching products:", error);
//   });

// // Function to render products based on category and search
// function renderProducts(category) {
//   const filteredProducts = getFilteredProducts(category);
//   const paginatedProducts = getPaginatedProducts(filteredProducts);

//   const productContainer = document.getElementById("product-list");
//   productContainer.innerHTML = ""; // Clear the product list

//   paginatedProducts.forEach((product, index) => {
//     let productHTML = `
// <div class="col-xl-4 col-sm-6 mb-4 mt-4">
// <div class="product-item-02 text-center h-100">
//   <div class="product-image">
//     <img class="img-fluid" src="${product.image}" alt="${product.name}">
//   </div>
//   <div class="product-info">
//     <div class="product-name">
//       <h5>${product.name}</h5>
//     </div>
//     <div class="product-price">
//       <del>₹${product.price.original}</del>
//       <span class="text-dark"> ₹${product.price.discounted}</span>
//     </div>
//     <div class="product-sizes">
//       <label>Select Size:</label>
//       <select class="form-control">
//         ${product.sizes
//           .map(
//             (size) => `
//           <option value="${size.size}">${size.size} - ₹${size.price}</option>
//         `
//           )
//           .join("")}
//       </select>
//     </div>

//     <!-- Quantity control and Add button -->
//     <div class="mt-3 d-flex justify-content-between">
//       <div class="quantity-control d-inline-flex align-items-center border border-dark p-1">
//         <button class="btn btn-black py-0 px-1 minus" data-product-index="${index}">-</button>
//         <span class="quantity text-white mx-1" id="quantity-display${index}">0</span>
//         <button class="btn btn-black py-0 px-1 plus" data-product-index="${index}">+</button>
//       </div>
//       <button class="btn btn-black text-white py-1 px-3 add-to-cart" data-item="${
//         product.name
//       }" data-price="${product.price.discounted}" data-image="${
//       product.image
//     }" data-bs-toggle="offcanvas" data-bs-target="#cartOffcanvas">Add</button>
//     </div>
//   </div>
// </div>
// </div>
// `;
//     productContainer.innerHTML += productHTML;
//   });

//   renderPagination(filteredProducts);
// }

// // Function to filter products based on search query
// function getFilteredProducts(category) {
//   const categoryList =
//     category === "All" ? Object.keys(productsData) : [category];
//   let filteredProducts = [];
//   categoryList.forEach((cat) => {
//     const products = productsData[cat];
//     products.forEach((product) => {
//       if (product.name.toLowerCase().includes(searchQuery)) {
//         filteredProducts.push(product);
//       }
//     });
//   });
//   return filteredProducts;
// }

// // Function to paginate the filtered products
// function getPaginatedProducts(products) {
//   const startIndex = (currentPage - 1) * productsPerPage;
//   return products.slice(startIndex, startIndex + productsPerPage);
// }

// // Function to render pagination
// function renderPagination(products) {
//   const totalPages = Math.ceil(products.length / productsPerPage);
//   const paginationContainer = document.getElementById("pagination");
//   paginationContainer.innerHTML = ""; // Clear previous pagination

//   // Previous page button
//   const prevPage =
//     currentPage > 1
//       ? `<li class="page-item"><a class="page-link" href="#" onclick="changePage(${
//           currentPage - 1
//         })">Previous</a></li>`
//       : `<li class="page-item disabled"><a class="page-link" href="#">Previous</a></li>`;
//   paginationContainer.innerHTML += prevPage;

//   // Page numbers
//   for (let i = 1; i <= totalPages; i++) {
//     const activeClass = i === currentPage ? "active" : "";
//     paginationContainer.innerHTML += `<li class="page-item ${activeClass}"><a class="page-link" href="#" onclick="changePage(${i})">${i}</a></li>`;
//   }

//   // Next page button
//   const nextPage =
//     currentPage < totalPages
//       ? `<li class="page-item"><a class="page-link" href="#" onclick="changePage(${
//           currentPage + 1
//         })">Next</a></li>`
//       : `<li class="page-item disabled"><a class="page-link" href="#">Next</a></li>`;
//   paginationContainer.innerHTML += nextPage;
// }

// // Function to change page
// function changePage(page) {
//   currentPage = page;
//   renderProducts("All");
// }

// // add to cart

// let productCart = []; // Store cart items for products

// // Function to render cart items in the offcanvas
// function renderCart() {
//   const cartItemsContainer = document.getElementById("cart-items");
//   cartItemsContainer.innerHTML = ""; // Clear cart items

//   let total = 0;
//   productCart.forEach((item, index) => {
//     total += item.price * item.quantity; // Calculate total amount

//     // Render each cart item
//     const cartItemHTML = `
//       <div class="cart-item d-flex justify-content-between align-items-center mb-3">
//         <div class="d-flex align-items-center">
//           <img src="${item.image}" alt="${item.name}" class="cart-item-image" />
//           <div class="cart-item-info ms-3">
//             <h6>${item.name}</h6>
//             <span>₹${item.price}</span>
//           </div>
//         </div>
//         <div class="d-flex align-items-center">
//           <div class="quantity-control d-inline-flex align-items-center border border-dark p-1">
//             <button class="btn btn-black py-0 px-1 minus" data-index="${index}">-</button>
//             <span class="quantity text-white mx-1">${item.quantity}</span>
//             <button class="btn btn-black py-0 px-1 plus" data-index="${index}">+</button>
//           </div>
//           <button class="btn btn-danger ms-3 remove-item" data-index="${index}">Remove</button>
//         </div>
//       </div>
//     `;
//     cartItemsContainer.innerHTML += cartItemHTML;
//   });

//   // Update the total amount
//   document.getElementById("total-amount").innerText = `₹${total}`;

//   // Add event listeners to quantity control and remove buttons
//   addEventListeners();
// }

// // Function to handle adding products to the cart
// function addToCart(product) {
//   const existingProductIndex = productCart.findIndex(
//     (item) => item.name === product.name
//   );

//   if (existingProductIndex === -1) {
//     productCart.push({
//       ...product,
//       quantity: 1,
//     });
//   } else {
//     productCart[existingProductIndex].quantity += 1;
//   }

//   renderCart(); // Re-render the cart
// }

// // Function to update quantity in the cart
// function updateQuantity(index, operation) {
//   if (operation === "increase") {
//     productCart[index].quantity += 1;
//   } else if (operation === "decrease" && productCart[index].quantity > 1) {
//     productCart[index].quantity -= 1;
//   }

//   renderCart(); // Re-render the cart
// }

// // Function to remove item from cart
// function removeItem(index) {
//   productCart.splice(index, 1);
//   renderCart(); // Re-render the cart
// }

// // Function to handle placing the order
// function placeOrder() {
//   const token = localStorage.getItem("jwt_token"); // Assuming the token is stored in localStorage

//   // Send cart data to backend (Example)
//   fetch("your_backend_url/api/place-order", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify({ cart: productCart }),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       // Redirect to the payment gateway
//       if (data.sessionUrl) {
//         window.location.href = data.sessionUrl; // Redirect to the payment page
//       } else {
//         alert("An error occurred, please try again.");
//       }
//     })
//     .catch((error) => {
//       console.error("Error placing order:", error);
//       alert("An error occurred, please try again.");
//     });
// }

// // Add event listeners for quantity and remove buttons
// function addEventListeners() {
//   // Handle quantity increase and decrease
//   document.querySelectorAll(".plus").forEach((button) => {
//     button.addEventListener("click", (e) => {
//       const index = e.target.dataset.index;
//       updateQuantity(index, "increase");
//     });
//   });

//   document.querySelectorAll(".minus").forEach((button) => {
//     button.addEventListener("click", (e) => {
//       const index = e.target.dataset.index;
//       updateQuantity(index, "decrease");
//     });
//   });

//   // Handle item removal
//   document.querySelectorAll(".remove-item").forEach((button) => {
//     button.addEventListener("click", (e) => {
//       const index = e.target.dataset.index;
//       removeItem(index);
//     });
//   });

//   // Handle place order button
//   document.getElementById("place-order").addEventListener("click", placeOrder);
// }

// // Example of adding an item to the cart when the "Add" button is clicked
// document.querySelectorAll(".add-to-cart").forEach((button) => {
//   button.addEventListener("click", (e) => {
//     const product = {
//       name: e.target.dataset.item,
//       price: parseFloat(e.target.dataset.price),
//       image: e.target.dataset.image, // Product image URL
//     };

//     addToCart(product); // Add to cart
//     $("#cartOffcanvas").offcanvas("show"); // Show the cart offcanvas
//   });
// });

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

// new work 23/01/2025
// =========================================================================================================================================================================================================================================

let productsData = [];
let currentPage = 1;
let productsPerPage = 12;
let searchQuery = "";
let cart = {}; // Store cart items

// Fetch product data from products.json
fetch("products.json")
  .then((response) => response.json())
  .then((data) => {
    productsData = data.categories; // Store the products
    renderProducts("All"); // Default render with "All" products

    // Event listener for category selection
    document.querySelectorAll(".widget-category a").forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const category = e.target.textContent;
        renderProducts(category);
      });
    });

    // Search functionality
    document.getElementById("search-input").addEventListener("input", (e) => {
      searchQuery = e.target.value.toLowerCase();
      currentPage = 1; // Reset to first page when searching
      renderProducts("All");
    });
  })
  .catch((error) => {
    console.error("Error fetching products:", error);
  });

// Function to render products based on category and search
function renderProducts(category) {
  const filteredProducts = getFilteredProducts(category);
  const paginatedProducts = getPaginatedProducts(filteredProducts);
  const productContainer = document.getElementById("product-list");
  productContainer.innerHTML = ""; // Clear the product list

  paginatedProducts.forEach((product, index) => {
    let productHTML = `
    <div class="col-xl-4 col-sm-6 mb-4 mt-4">
      <div class="product-item-02 text-center h-100">
        <div class="product-image">
          <img class="img-fluid products-images" src="${product.image}" alt="${
      product.name
    }">
        </div>
        <div class="product-info">
          <div class="product-name mt-3">
            <h5 class="mb-1">${product.name}</h5>
          </div>
          <div class="product-price">
            <del>₹${product.price.original}</del>
            <span class="text-dark"> ₹${product.price.discounted}</span>
          </div>
          <div class="product-sizes position-relative">
  <label>Select Size:</label>
  <div class="select-wrapper">
    <select class="form-control size-selector" data-product-index="${index}">
      ${product.sizes
        .map(
          (size, sizeIndex) => `
        <option value="${size.size}" data-size-price="${size.price}" ${sizeIndex === 0 ? "selected" : ""}>${size.size} - ₹${size.price}</option>`).join("")}</select>
    <i class="bi bi-chevron-down select-icon"></i>
  </div>
</div>

          <div class="mt-3 d-flex justify-content-between">
            <div class="quantity-control d-inline-flex align-items-center border border-dark p-1">
              <button class="btn btn-black py-0 px-1 minus" data-product-index="${index}">-</button>
              <span class="quantity text-white mx-1" id="quantity-display${index}">0</span>
              <button class="btn btn-black py-0 px-1 plus" data-product-index="${index}">+</button>
            </div>
            <button class="btn btn-black text-white rounded py-1 px-3 add-to-cart" 
                    data-item="${product.name}" 
                    data-price="${product.sizes[0].price}" 
                    data-size="${product.sizes[0].size}" 
                    data-image="${product.image}" 
                    data-product-index="${index}" 
                    data-bs-toggle="offcanvas" 
                    data-bs-target="#cartOffcanvas">Add</button>
          </div>
          <div class="mt-3">
            <button class="btn btn-outline-dark rounded w-100 add-to-wishlist" data-product='${JSON.stringify(product)}'>Add to Refill Basket</button>

          </div>
        </div>
      </div>
    </div>
  `;
    productContainer.innerHTML += productHTML;
  });

  renderPagination(filteredProducts);
  attachEventListeners(); // Attach event listeners after rendering products
}

// Function to filter products based on search query
function getFilteredProducts(category) {
  const categoryList =
    category === "All" ? Object.keys(productsData) : [category];
  let filteredProducts = [];
  categoryList.forEach((cat) => {
    const products = productsData[cat];
    products.forEach((product) => {
      if (product.name.toLowerCase().includes(searchQuery)) {
        filteredProducts.push(product);
      }
    });
  });
  return filteredProducts;
}

// Function to paginate the filtered products
function getPaginatedProducts(products) {
  const startIndex = (currentPage - 1) * productsPerPage;
  return products.slice(startIndex, startIndex + productsPerPage);
}

// Function to render pagination
function renderPagination(products) {
  const totalPages = Math.ceil(products.length / productsPerPage);
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = ""; // Clear previous pagination

  const prevPage =
    currentPage > 1
      ? `<li class="page-item"><a class="page-link" href="#" onclick="changePage(${
          currentPage - 1
        })">Previous</a></li>`
      : `<li class="page-item disabled"><a class="page-link" href="#">Previous</a></li>`;
  paginationContainer.innerHTML += prevPage;

  for (let i = 1; i <= totalPages; i++) {
    const activeClass = i === currentPage ? "active" : "";
    paginationContainer.innerHTML += `<li class="page-item ${activeClass}"><a class="page-link" href="#" onclick="changePage(${i})">${i}</a></li>`;
  }

  const nextPage =
    currentPage < totalPages
      ? `<li class="page-item"><a class="page-link" href="#" onclick="changePage(${
          currentPage + 1
        })">Next</a></li>`
      : `<li class="page-item disabled"><a class="page-link" href="#">Next</a></li>`;
  paginationContainer.innerHTML += nextPage;
}

// Function to change page
function changePage(page) {
  currentPage = page;
  renderProducts("All");
}

// Add to cart functionality
function addToCart(product, quantityDisplay) {
  const { name, image, price } = product;
  const quantity = parseInt(quantityDisplay.textContent);

  if (quantity > 0) {
    if (cart[name]) {
      cart[name].quantity = quantity;
    } else {
      cart[name] = { ...product, quantity };
    }
    updateCartUI();
  } else {
    showToast("Please select a quantity greater than 0.");
  }
}

// Update the cart UI
function updateCartUI() {
  const cartItemsContainer = document.getElementById("cart-items");
  const grandTotalEl = document.getElementById("grand-total");
  const gstAmountEl = document.getElementById("gst-amount");

  cartItemsContainer.innerHTML = "";
  let grandTotal = 0;

  for (const itemName in cart) {
    const { image, price, quantity } = cart[itemName];
    grandTotal += price * quantity;

    cartItemsContainer.innerHTML += `
      <div class="d-flex align-items-center mb-3">
        <img src="${image}" alt="${itemName}" class="img-fluid rounded-circle" style="width: 50px; height: 50px;">
        <div class="ms-3">
          <h6>${itemName}</h6>
          <p class="mb-0">₹${price} x <span id="cart-quantity-display-${itemName}">${quantity}</span></p>
        </div>
        <div class="quantity-control d-inline-flex align-items-center border border-dark p-1 mx-3">
          <button class="btn btn-black py-0 px-1 minus-cart" data-item-name="${itemName}">-</button>
          <span class="quantity text-white mx-1" id="cart-quantity-display${itemName}">${quantity}</span>
          <button class="btn btn-black py-0 px-1 plus-cart" data-item-name="${itemName}">+</button>
        </div>
        <div class="ms-auto">
          <button class="btn-outline-danger" onclick="removeFromCart('${itemName}')">Remove</button>
        </div>
      </div>
    `;
  }

  const gstAmount = (18 / 100) * grandTotal;
  const totalWithGST = grandTotal + gstAmount;

  grandTotalEl.textContent = `₹${grandTotal.toFixed(2)}`;
  gstAmountEl.textContent = `₹${gstAmount.toFixed(2)}`;
  document.getElementById("final-total").textContent = `₹${totalWithGST.toFixed(
    2
  )}`;

  attachCartEventListeners(); // Attach cart event listeners for quantity controls
}

// Attach cart quantity control event listeners
function attachCartEventListeners() {
  document.querySelectorAll(".plus-cart").forEach((button) => {
    button.addEventListener("click", (e) => {
      const itemName = e.target.dataset.itemName;
      if (cart[itemName]) {
        cart[itemName].quantity += 1;
        updateCartUI();
        syncProductQuantity(itemName, cart[itemName].quantity);
      }
    });
  });

  document.querySelectorAll(".minus-cart").forEach((button) => {
    button.addEventListener("click", (e) => {
      const itemName = e.target.dataset.itemName;
      if (cart[itemName] && cart[itemName].quantity > 1) {
        cart[itemName].quantity -= 1;
        updateCartUI();
        syncProductQuantity(itemName, cart[itemName].quantity);
      } else if (cart[itemName] && cart[itemName].quantity === 1) {
        removeFromCart(itemName);
      }
    });
  });
}

// Sync product quantity in the product list
function syncProductQuantity(productName, newQuantity) {
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    if (button.dataset.item === productName) {
      const index = button.dataset.productIndex;
      const quantityDisplay = document.getElementById(
        `quantity-display${index}`
      );
      if (quantityDisplay) {
        quantityDisplay.textContent = newQuantity;
      }
    }
  });
}

// Remove item from cart
function removeFromCart(itemName) {
  delete cart[itemName];
  updateCartUI();
}

// Attach event listeners for quantity and cart actions
function attachEventListeners() {
  document.querySelectorAll(".plus").forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = e.target.dataset.productIndex;
      const quantityDisplay = document.getElementById(
        `quantity-display${index}`
      );
      quantityDisplay.textContent = parseInt(quantityDisplay.textContent) + 1;
    });
  });

  document.querySelectorAll(".minus").forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = e.target.dataset.productIndex;
      const quantityDisplay = document.getElementById(
        `quantity-display${index}`
      );
      if (parseInt(quantityDisplay.textContent) > 0) {
        quantityDisplay.textContent = parseInt(quantityDisplay.textContent) - 1;
      }
    });
  });

  document.querySelectorAll(".size-selector").forEach((selector) => {
    selector.addEventListener("change", (e) => {
      const productIndex = e.target.dataset.productIndex;
      const selectedOption = e.target.options[e.target.selectedIndex];
      const selectedPrice = selectedOption.dataset.sizePrice;
      const addToCartButton = document.querySelector(
        `.add-to-cart[data-product-index="${productIndex}"]`
      );

      addToCartButton.dataset.price = selectedPrice; // Update the price in the button's data attribute
      addToCartButton.dataset.size = selectedOption.value; // Update the selected size
    });
  });

  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", (e) => {
      const product = {
        name: e.target.dataset.item,
        image: e.target.dataset.image,
        price: parseFloat(e.target.dataset.price),
        size: e.target.dataset.size,
      };
      const index = e.target.dataset.productIndex;
      const quantityDisplay = document.getElementById(
        `quantity-display${index}`
      );
      addToCart(product, quantityDisplay);
    });
  });

  document.querySelectorAll(".add-to-wishlist").forEach((button) => {
    button.addEventListener("click", (e) => {
      const productData = JSON.parse(e.target.dataset.product); // Parse the JSON string to get the product object
      addToWishlist(productData); // Pass the parsed product object to your addToWishlist function
    });
  });
}

// Function to handle adding a product to the wishlist
// Function to handle adding a product to the wishlist
function addToWishlist(productDetails) {
  const token = localStorage.getItem("jwt_token"); // Replace with your token key

  if (!token) {
    showToast("You need to be logged in to add items to the wishlist.");
    return;
  }

  console.log("Wishlist product details:", productDetails);

  fetch(`${API_BASE_URL}/products/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(productDetails),
  })
    .then((response) => {
      if (response.ok) {
        showToast(`${productDetails.name} has been added to your wishlist!`);
      } else {
        return response.json().then((data) => {
          const errorMessage =
            data.message || "Failed to add item to wishlist.";
          showToast(errorMessage);
        });
      }
    })
    .catch((error) => {
      console.error("Error adding to wishlist:", error);
    });
}

// Fetch the wishlist
function fetchWishlist() {
  const token = localStorage.getItem("jwt_token");

  if (!token) {
    showToast("You need to be logged in to view your wishlist.");
    return;
  }

  fetch(`${API_BASE_URL}/products/getAll`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch wishlist");
      }
      return response.json();
    })
    .then((wishlistItems) => {
      const wishlistContainer = document.getElementById("wishlist-items");
      wishlistContainer.innerHTML = ""; // Clear previous content

      if (wishlistItems.length === 0) {
        wishlistContainer.innerHTML = "<p>Your wishlist is empty.</p>";
        return;
      }

      let rowHTML = '<div class="row g-4">';
      wishlistItems.forEach((product, index) => {
        // Safe access to product price
        const originalPrice = product.price?.original || "N/A";
        const discountedPrice = product.price?.discounted || "N/A";

        // Safe access to sizes (check if sizes array exists and has items)
        const sizes =
          Array.isArray(product.sizes) && product.sizes.length > 0
            ? product.sizes
            : [];

        rowHTML += `
          <div class="col-lg-3 col-md-6 col-sm-12">
            <div class="product-item-02 text-center h-100">
              <div class="product-image">
                <img class="img-fluid" src="${product.image}" alt="${
          product.name
        }">
              </div>
              <div class="product-info">
                <div class="product-name mt-3">
                  <h5 class="mb-1">${product.name}</h5>
                </div>
                <div class="product-price">
                  <del>₹${originalPrice}</del>
                  <span class="text-dark"> ₹${discountedPrice}</span>
                </div>
                <div class="product-sizes">
                  <label>Select Size:</label>
                  <select class="form-control size-selector" data-product-index="${index}">
                    ${
                      sizes.length > 0
                        ? sizes
                            .map(
                              (size, sizeIndex) => `
                          <option value="${size.size}" data-size-price="${
                                size.price
                              }" ${sizeIndex === 0 ? "selected" : ""}>
                            ${size.size} - ₹${size.price}
                          </option>
                        `
                            )
                            .join("")
                        : "<option>No sizes available</option>"
                    }
                  </select>
                </div>
                <div class="quantity-control d-inline-flex align-items-center border border-dark p-1 mx-3 mt-3">
                  <button class="btn btn-black py-0 px-1 minus" data-product-index="${index}">-</button>
                  <span class="quantity text-white mx-1" id="wishlist-quantity-display${index}">0</span>
                  <button class="btn btn-black py-0 px-1 plus" data-product-index="${index}">+</button>
                </div>
                <div class="mt-3 d-flex justify-content-between">
                  <button class="btn btn-black text-white py-1 px-3 add-to-cart"
                          data-item="${product.name}" 
                          data-price="${discountedPrice}" 
                          data-size="${
                            sizes.length > 0 ? sizes[0].size : "N/A"
                          }"
                          data-image="${product.image}" 
                          data-product-index="${index}">Add</button>
                  <button class="btn btn-outline-danger remove-from-wishlist" data-product-id="${
                    product.id
                  }" data-product-index="${index}">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        `;
      });
      rowHTML += "</div>";
      wishlistContainer.innerHTML = rowHTML;

      // Attach event listeners to "Add to Cart" buttons
      document.querySelectorAll(".add-to-cart").forEach((button) => {
        button.addEventListener("click", (e) => {
          const product = {
            name: e.target.dataset.item,
            image: e.target.dataset.image,
            price: parseFloat(e.target.dataset.price),
            size: e.target.dataset.size,
          };
          const index = e.target.dataset.productIndex;
          const quantityDisplay = document.getElementById(
            `wishlist-quantity-display${index}`
          );
          const quantity = parseInt(quantityDisplay.textContent);
          addToCart(product, { textContent: quantity.toString() }); // Add selected quantity
        });
      });

      // Attach event listeners to quantity controls
      document.querySelectorAll(".plus").forEach((button) => {
        button.addEventListener("click", (e) => {
          const index = e.target.dataset.productIndex;
          const quantityDisplay = document.getElementById(
            `wishlist-quantity-display${index}`
          );
          quantityDisplay.textContent =
            parseInt(quantityDisplay.textContent) + 1;
        });
      });

      document.querySelectorAll(".minus").forEach((button) => {
        button.addEventListener("click", (e) => {
          const index = e.target.dataset.productIndex;
          const quantityDisplay = document.getElementById(
            `wishlist-quantity-display${index}`
          );
          if (parseInt(quantityDisplay.textContent) > 1) {
            quantityDisplay.textContent =
              parseInt(quantityDisplay.textContent) - 1;
          }
        });
      });

      // Attach event listeners to "Remove" buttons
      document.querySelectorAll(".remove-from-wishlist").forEach((button) => {
        button.addEventListener("click", (event) => {
          const productId = button.getAttribute("data-product-id");
          removeFromWishlist(productId, token);
        });
      });
    })
    .catch((error) => {
      console.error("Error fetching wishlist:", error);
      showToast("Failed to load wishlist. Please try again.");
    });
}

// Function to remove item from wishlist
function removeFromWishlist(productId, token) {
  fetch(`${API_BASE_URL}/products/delete/${productId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to remove item from wishlist");
      }
      showToast("Item removed from wishlist successfully!");
      fetchWishlist(); // Refresh the wishlist after removal
    })
    .catch((error) => {
      console.error("Error removing item from wishlist:", error);
      showToast("Failed to remove item. Please try again.");
    });
}

// Event listener to fetch and show the wishlist modal
document
  .getElementById("wishlistModal")
  .addEventListener("show.bs.modal", fetchWishlist);

// Call the render function when the page loads
window.onload = function () {
  renderProducts("All");
};

// Fetch and display the user's location
document.getElementById("getCurrentLocation").addEventListener("click", () => {
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

// Save the location and update the input box
document.getElementById("saveLocation").addEventListener("click", () => {
  const location = document.getElementById("manualLocation").value;
  const locationType = document.getElementById("locationType").value;
  if (location) {
    document.getElementById(
      "locationInput"
    ).value = `${location} (${locationType})`;

    // Show the "Place Order" button after saving the location
    document.getElementById("place-order-btn").classList.remove("d-none");

    // Hide the "Add Address to Proceed" button
    document.getElementById("add-address-btn").classList.add("d-none");

    const modal = bootstrap.Modal.getInstance(
      document.getElementById("locationModal")
    );
    modal.hide();
  } else {
    showToast("Please enter or fetch a location before saving.");
  }
});

// Handle the "Place Order" button click
document.getElementById("place-order-btn").addEventListener("click", () => {
  placeOrder();
});

// Function to place the order
function placeOrder() {
  const token = localStorage.getItem("jwt_token");

  if (!token) {
    showToast("You need to be logged in to place an order.");
    return;
  }

  // Extract customerId from localStorage userDetails
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const customerId = userDetails ? userDetails.customerid : null;

  if (!customerId) {
    showToast("Customer ID not found. Please log in again.");
    return;
  }

  // Check if cart is not empty
  if (Object.keys(cart).length === 0) {
    showToast("Your cart is empty. Please add items before placing the order.");
    return;
  }

  const orderItems = Object.keys(cart).map((itemName) => {
    const { price, quantity, size } = cart[itemName];
    return {
      name: itemName,
      price: price,
      quantity: quantity,
      size: size,
    };
  });

  // Get total amount from the page element
  const totalAmount = document
    .getElementById("final-total")
    .textContent.replace("₹", "")
    .trim();

  // Get delivery address from input
  const address =
    document.getElementById("locationInput").value || "No address provided";

  // Get delivery date from the input field
  const deliveryDate = document.getElementById("deliveryDateInput").value;

  if (!deliveryDate) {
    showToast("Please select a delivery date.");
    return;
  }

  const orderData = {
    items: orderItems,
    totalAmount: totalAmount,
    address: address,
    deliveryDate: deliveryDate, // Add delivery date to the order data
  };

  console.log("Order Data:", orderData);
  console.log("Customer ID:", customerId);

  // Correct URL format using template literals and include customerId in the request
  fetch(`${API_BASE_URL}/kukmartorders/create/${customerId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "SUCCESS" && data.sessionUrl) {
        // Redirect to payment gateway
        window.location.href = data.sessionUrl;
      } else {
        const errorMessage =
          data.message || "Failed to place order or create payment session.";
        showToast(errorMessage);
      }
    })
    .catch((error) => {
      console.error("Error placing order:", error);
      showToast("An error occurred while placing the order. Please try again.");
    });
}

document.addEventListener("DOMContentLoaded", () => {
  // Get the query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const sessionId = urlParams.get("session_id");

  // Check if session_id exists in the URL
  if (sessionId) {
    // Create a success message element
    const messageContainer = document.createElement("div");
    messageContainer.className = "alert alert-success"; // Add classes for styling
    messageContainer.textContent =
      "Payment was successful! Thank you for your order.";

    // Add the message to a specific section on the page
    const mainContainer = document.querySelector("#main-container"); // Replace with your container's ID or class
    if (mainContainer) {
      mainContainer.prepend(messageContainer);
    }

    // Optional: Remove the query parameter from the URL without reloading
    const newUrl = window.location.origin + window.location.pathname;
    window.history.replaceState({}, document.title, newUrl);
  }
});

// // Function to handle placing the order
// function placeOrder() {
//   // Collect cart items
//   const cartItems = []; // Assuming you already populate this dynamically
//   document.querySelectorAll('#cart-items .cart-item').forEach(item => {
//       cartItems.push({
//           id: item.dataset.id,
//           name: item.querySelector('.item-name').innerText,
//           quantity: item.querySelector('.item-quantity').innerText,
//           price: item.querySelector('.item-price').innerText
//       });
//   });

//   // Collect date and address
//   const deliveryDate = document.getElementById('delivery-date').value;
//   const deliveryAddress = document.getElementById('delivery-address').value;

//   // Validate inputs
//   if (!deliveryDate || !deliveryAddress) {
//       alert('Please fill in all fields before placing the order.');
//       return;
//   }

//   // Prepare data for the backend
//   const orderData = {
//       items: cartItems,
//       deliveryDate,
//       deliveryAddress
//   };

//   // Send data to the backend
//   fetch('/api/place-order', {
//       method: 'POST',
//       headers: {
//           'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(orderData)
//   })
//   .then(response => {
//       if (!response.ok) {
//           throw new Error('Failed to place the order.');
//       }
//       return response.json();
//   })
//   .then(data => {
//       alert('Order placed successfully!');
//       console.log('Order Details:', data);
//       // Optionally clear the cart
//       document.getElementById('cart-items').innerHTML = '';
//       document.getElementById('delivery-date').value = '';
//       document.getElementById('delivery-address').value = '';
//   })
//   .catch(error => {
//       console.error('Error:', error);
//       alert('Something went wrong. Please try again.');
//   });
// }

// yesterday work

//========================================================================================================================================================================================================

// let productsData = [];
// let currentPage = 1;
// let productsPerPage = 12;
// let searchQuery = "";
// let cart = {}; // Store cart items

// // Fetch product data from products.json
// fetch("products.json")
//   .then((response) => response.json()) // Parse the JSON response
//   .then((data) => {
//     productsData = data.categories; // Store the products
//     renderProducts("All"); // Default render with "All" products

//     // Event listener for category selection
//     document.querySelectorAll(".widget-category a").forEach((item) => {
//       item.addEventListener("click", (e) => {
//         e.preventDefault();
//         const category = e.target.textContent;
//         renderProducts(category);
//       });
//     });

//     // Search functionality
//     document.getElementById("search-input").addEventListener("input", (e) => {
//       searchQuery = e.target.value.toLowerCase();
//       currentPage = 1; // Reset to first page when searching
//       renderProducts("All");
//     });
//   })
//   .catch((error) => {
//     console.error("Error fetching products:", error);
//   });

// // Function to render products based on category and search
// function renderProducts(category) {
//   const filteredProducts = getFilteredProducts(category);
//   const paginatedProducts = getPaginatedProducts(filteredProducts);

//   const productContainer = document.getElementById("product-list");
//   productContainer.innerHTML = ""; // Clear the product list

//   paginatedProducts.forEach((product, index) => {
//     let productHTML = `
//       <div class="col-xl-4 col-sm-6 mb-4 mt-4">
//         <div class="product-item-02 text-center h-100">
//           <div class="product-image">
//             <img class="img-fluid" src="${product.image}" alt="${product.name}">
//           </div>
//           <div class="product-info">
//             <div class="product-name mt-3">
//               <h5 class="mb-1">${product.name}</h5>
//             </div>
//             <div class="product-price">
//               <del>₹${product.price.original}</del>
//               <span class="text-dark"> ₹${product.price.discounted}</span>
//             </div>
//             <div class="product-sizes">
//               <label>Select Size:</label>
//               <select class="form-control size-selector" data-product-index="${index}">
//                 ${product.sizes
//                   .map(
//                     (size, sizeIndex) => `
//                     <option value="${size.size}" data-size-price="${size.price}" ${
//                       sizeIndex === 0 ? "selected" : ""
//                     }>
//                       ${size.size} - ₹${size.price}
//                     </option>
//                   `
//                   )
//                   .join("")}
//               </select>
//             </div>
//             <div class="mt-3 d-flex justify-content-between">
//               <div class="quantity-control d-inline-flex align-items-center border border-dark p-1">
//                 <button class="btn btn-black py-0 px-1 minus" data-product-index="${index}">-</button>
//                 <span class="quantity text-white mx-1" id="quantity-display${index}">0</span>
//                 <button class="btn btn-black py-0 px-1 plus" data-product-index="${index}">+</button>
//               </div>
//               <button class="btn btn-black text-white py-1 px-3 add-to-cart"
//                       data-item="${product.name}"
//                       data-price="${product.sizes[0].price}"
//                       data-size="${product.sizes[0].size}"
//                       data-image="${product.image}"
//                       data-product-index="${index}"
//                       data-bs-toggle="offcanvas"
//                       data-bs-target="#cartOffcanvas">Add</button>
//             </div>
//             <div class="mt-3">
//               <button class="btn btn-outline-dark add-to-wishlist"
//         data-product-id="${product.id}"
//         data-product-index="${index}">
//     Add to Wishlist
// </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     `;
//     productContainer.innerHTML += productHTML;
//   });

//   renderPagination(filteredProducts);
//   attachEventListeners(); // Attach event listeners after rendering products
// }

// // Function to handle adding a product to the wishlist
// // Function to handle adding a product to the wishlist
// function addToWishlist(e) {
//   const productId = e.target.dataset.productId; // Get the product id
//   const productIndex = e.target.dataset.productIndex;

//   // Find the product object from the products data (assuming `productsData` holds all your products)
//   const product = productsData.Groceries.find(p => p.id === parseInt(productId));

//   // Retrieve the JWT token from localStorage or other storage
//   const token = localStorage.getItem("jwt_token"); // Replace with your token key

//   if (!token) {
//     alert("You need to be logged in to add items to the wishlist.");
//     return;
//   }

//   // If the product is found, build the object to send to the backend
//   if (product) {
//     const wishlistProduct = {
//       id: product.id,
//       name: product.name,
//       image: product.image,
//       price: product.price, // Including original and discounted price
//       sizes: product.sizes, // Full array of sizes and prices
//     };

//     console.log("Wishlist product details:", wishlistProduct);

//     // Send the product data to the backend via a POST request
//     fetch("http://192.168.29.101:8082/api/products/create", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${token}` // Include the Bearer token
//       },
//       body: JSON.stringify(wishlistProduct), // Send full product details
//     })
//       .then((response) => {
//         if (response.ok) {
//           alert(`${wishlistProduct.name} has been added to your wishlist!`);
//         } else {
//           return response.json().then((data) => {
//             const errorMessage = data.message || "Failed to add item to wishlist.";
//             alert(errorMessage);
//           });
//         }
//       })
//       .catch((error) => {
//         console.error("Error adding to wishlist:", error);
//       });
//   }
// }

// // Function to filter products based on search query
// function getFilteredProducts(category) {
//   const categoryList =
//     category === "All" ? Object.keys(productsData) : [category];
//   let filteredProducts = [];
//   categoryList.forEach((cat) => {
//     const products = productsData[cat];
//     products.forEach((product) => {
//       if (product.name.toLowerCase().includes(searchQuery)) {
//         filteredProducts.push(product);
//       }
//     });
//   });
//   return filteredProducts;
// }

// // Function to paginate the filtered products
// function getPaginatedProducts(products) {
//   const startIndex = (currentPage - 1) * productsPerPage;
//   return products.slice(startIndex, startIndex + productsPerPage);
// }

// // Function to render pagination
// function renderPagination(products) {
//   const totalPages = Math.ceil(products.length / productsPerPage);
//   const paginationContainer = document.getElementById("pagination");
//   paginationContainer.innerHTML = ""; // Clear previous pagination

//   const prevPage =
//     currentPage > 1
//       ? `<li class="page-item"><a class="page-link" href="#" onclick="changePage(${
//           currentPage - 1
//         })">Previous</a></li>`
//       : `<li class="page-item disabled"><a class="page-link" href="#">Previous</a></li>`;
//   paginationContainer.innerHTML += prevPage;

//   for (let i = 1; i <= totalPages; i++) {
//     const activeClass = i === currentPage ? "active" : "";
//     paginationContainer.innerHTML += `<li class="page-item ${activeClass}"><a class="page-link" href="#" onclick="changePage(${i})">${i}</a></li>`;
//   }

//   const nextPage =
//     currentPage < totalPages
//       ? `<li class="page-item"><a class="page-link" href="#" onclick="changePage(${
//           currentPage + 1
//         })">Next</a></li>`
//       : `<li class="page-item disabled"><a class="page-link" href="#">Next</a></li>`;
//   paginationContainer.innerHTML += nextPage;
// }

// // Function to change page
// function changePage(page) {
//   currentPage = page;
//   renderProducts("All");
// }

// // Add to cart functionality
// function addToCart(product, quantityDisplay) {
//   const { name, image, price } = product;
//   const quantity = parseInt(quantityDisplay.textContent);

//   if (quantity > 0) {
//     if (cart[name]) {
//       cart[name].quantity = quantity;
//     } else {
//       cart[name] = { ...product, quantity };
//     }
//     updateCartUI();
//   } else {
//     alert("Please select a quantity greater than 0.");
//   }
// }

// // Update the cart UI
// function updateCartUI() {
//   const cartItemsContainer = document.getElementById("cart-items");
//   const grandTotalEl = document.getElementById("grand-total");
//   const gstAmountEl = document.getElementById("gst-amount");

//   cartItemsContainer.innerHTML = "";
//   let grandTotal = 0;

//   for (const itemName in cart) {
//     const { image, price, quantity } = cart[itemName];
//     grandTotal += price * quantity;

//     cartItemsContainer.innerHTML += `
//       <div class="d-flex align-items-center mb-3">
//         <img src="${image}" alt="${itemName}" class="img-fluid rounded-circle" style="width: 50px; height: 50px;">
//         <div class="ms-3">
//           <h6>${itemName}</h6>
//           <p class="mb-0">₹${price} x <span id="cart-quantity-display-${itemName}">${quantity}</span></p>
//         </div>
//         <div class="quantity-control d-inline-flex align-items-center border border-dark p-1 mx-3">
//           <button class="btn btn-black py-0 px-1 minus-cart" data-item-name="${itemName}">-</button>
//           <span class="quantity text-white mx-1" id="cart-quantity-display${itemName}">${quantity}</span>
//           <button class="btn btn-black py-0 px-1 plus-cart" data-item-name="${itemName}">+</button>
//         </div>
//         <div class="ms-auto">
//           <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart('${itemName}')">Remove</button>
//         </div>
//       </div>
//     `;
//   }

//   const gstAmount = (18 / 100) * grandTotal;
//   const totalWithGST = grandTotal + gstAmount;

//   grandTotalEl.textContent = `₹${grandTotal.toFixed(2)}`;
//   gstAmountEl.textContent = `₹${gstAmount.toFixed(2)}`;
//   document.getElementById("final-total").textContent = `₹${totalWithGST.toFixed(
//     2
//   )}`;

//   attachCartEventListeners(); // Attach cart event listeners for quantity controls
// }

// // Attach cart quantity control event listeners
// function attachCartEventListeners() {
//   document.querySelectorAll(".plus-cart").forEach((button) => {
//     button.addEventListener("click", (e) => {
//       const itemName = e.target.dataset.itemName;
//       if (cart[itemName]) {
//         cart[itemName].quantity += 1;
//         updateCartUI();
//         syncProductQuantity(itemName, cart[itemName].quantity);
//       }
//     });
//   });

//   document.querySelectorAll(".minus-cart").forEach((button) => {
//     button.addEventListener("click", (e) => {
//       const itemName = e.target.dataset.itemName;
//       if (cart[itemName] && cart[itemName].quantity > 1) {
//         cart[itemName].quantity -= 1;
//         updateCartUI();
//         syncProductQuantity(itemName, cart[itemName].quantity);
//       } else if (cart[itemName] && cart[itemName].quantity === 1) {
//         removeFromCart(itemName);
//       }
//     });
//   });
// }

// // Sync product quantity in the product list
// function syncProductQuantity(productName, newQuantity) {
//   document.querySelectorAll(".add-to-cart").forEach((button) => {
//     if (button.dataset.item === productName) {
//       const index = button.dataset.productIndex;
//       const quantityDisplay = document.getElementById(`quantity-display${index}`);
//       if (quantityDisplay) {
//         quantityDisplay.textContent = newQuantity;
//       }
//     }
//   });
// }

// // Remove item from cart
// function removeFromCart(itemName) {
//   delete cart[itemName];
//   updateCartUI();
// }

// // Attach event listeners for quantity and cart actions
// function attachEventListeners() {
//   document.querySelectorAll(".plus").forEach((button) => {
//     button.addEventListener("click", (e) => {
//       const index = e.target.dataset.productIndex;
//       const quantityDisplay = document.getElementById(
//         `quantity-display${index}`
//       );
//       quantityDisplay.textContent = parseInt(quantityDisplay.textContent) + 1;
//     });
//   });

//   document.querySelectorAll(".minus").forEach((button) => {
//     button.addEventListener("click", (e) => {
//       const index = e.target.dataset.productIndex;
//       const quantityDisplay = document.getElementById(
//         `quantity-display${index}`
//       );
//       if (parseInt(quantityDisplay.textContent) > 0) {
//         quantityDisplay.textContent = parseInt(quantityDisplay.textContent) - 1;
//       }
//     });
//   });

//   document.querySelectorAll(".size-selector").forEach((selector) => {
//     selector.addEventListener("change", (e) => {
//       const productIndex = e.target.dataset.productIndex;
//       const selectedOption = e.target.options[e.target.selectedIndex];
//       const selectedPrice = selectedOption.dataset.sizePrice;
//       const addToCartButton = document.querySelector(
//         `.add-to-cart[data-product-index="${productIndex}"]`
//       );

//       addToCartButton.dataset.price = selectedPrice; // Update the price in the button's data attribute
//       addToCartButton.dataset.size = selectedOption.value; // Update the selected size
//     });
//   });

//   document.querySelectorAll(".add-to-cart").forEach((button) => {
//     button.addEventListener("click", (e) => {
//       const product = {
//         name: e.target.dataset.item,
//         image: e.target.dataset.image,
//         price: parseFloat(e.target.dataset.price),
//         size: e.target.dataset.size,
//       };
//       const index = e.target.dataset.productIndex;
//       const quantityDisplay = document.getElementById(`quantity-display${index}`);
//       addToCart(product, quantityDisplay);
//     });
//   });

//   // Attach wishlist event listener
//   document.querySelectorAll(".add-to-wishlist").forEach((button) => {
//     button.addEventListener("click", addToWishlist);
//   });
// }

// // Call the render function when the page loads
// window.onload = function () {
//   renderProducts("All");
// };

// // fetch the product

// function fetchWishlist() {
//   // Retrieve the JWT token from localStorage or other secure storage
//   const token = localStorage.getItem("jwt_token");

//   if (!token) {
//     alert("You need to be logged in to view your wishlist.");
//     return;
//   }

//   fetch("http://192.168.29.101:8082/api/products/getAll", {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${token}`,
//     },
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Failed to fetch wishlist");
//       }
//       return response.json();
//     })
//     .then((wishlistItems) => {
//       const wishlistContainer = document.getElementById("wishlist-items");
//       wishlistContainer.innerHTML = ""; // Clear previous content

//       if (wishlistItems.length === 0) {
//         wishlistContainer.innerHTML = "<p>Your wishlist is empty.</p>";
//         return;
//       }

//       // Generate a row layout for wishlist items
//       let rowHTML = '<div class="row g-4">';

//       wishlistItems.forEach((product, index) => {
//         rowHTML += `
//           <div class="col-lg-3 col-md-6 col-sm-12">
//             <div class="product-item-02 text-center h-100">
//               <div class="product-image">
//                 <img class="img-fluid" src="${product.image}" alt="${product.name}">
//               </div>
//               <div class="product-info">
//                 <div class="product-name mt-3">
//                   <h5 class="mb-1">${product.name}</h5>
//                 </div>
//                 <div class="product-price">
//                   <del>₹${product.price.original}</del>
//                   <span class="text-dark"> ₹${product.price.discounted}</span>
//                 </div>
//                 <div class="product-sizes">
//                   <label>Select Size:</label>
//                   <select class="form-control size-selector" data-product-index="${index}">
//                     ${product.sizes
//                       .map(
//                         (size, sizeIndex) => `
//                         <option value="${size.size}" data-size-price="${size.price}" ${
//                           sizeIndex === 0 ? "selected" : ""
//                         }>
//                           ${size.size} - ₹${size.price}
//                         </option>
//                       `
//                       )
//                       .join("")}
//                   </select>
//                 </div>
//                 <div class="mt-3 d-flex justify-content-between">
//                   <div class="quantity-control d-inline-flex align-items-center border border-dark p-1">
//                     <button class="btn btn-black py-0 px-1 minus" data-product-index="${index}">-</button>
//                     <span class="quantity text-white mx-1" id="quantity-display${index}">0</span>
//                     <button class="btn btn-black py-0 px-1 plus" data-product-index="${index}">+</button>
//                   </div>
//                   <button class="btn btn-black text-white py-1 px-3 add-to-cart"
//                           data-item="${product.name}"
//                           data-price="${product.sizes[0].price}"
//                           data-size="${product.sizes[0].size}"
//                           data-image="${product.image}"
//                           data-product-index="${index}"
//                           data-bs-toggle="offcanvas"
//                           data-bs-target="#cartOffcanvas">Add</button>
//                 </div>
//                 <div class="mt-3">
//                   <button class="btn btn-outline-danger remove-from-wishlist"
//                           data-product-id="${product.id}"
//                           data-product-index="${index}">
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         `;
//       });

//       rowHTML += "</div>";
//       wishlistContainer.innerHTML = rowHTML;

//       // Attach event listeners to "Remove" buttons
//       document.querySelectorAll(".remove-from-wishlist").forEach((button) => {
//         button.addEventListener("click", (event) => {
//           const productId = button.getAttribute("data-product-id");
//           removeFromWishlist(productId, token);
//         });
//       });
//     })
//     .catch((error) => {
//       console.error("Error fetching wishlist:", error);
//       alert("Failed to load wishlist. Please try again.");
//     });
// }

// // Function to remove item from wishlist
// function removeFromWishlist(productId, token) {
//   fetch(`http://192.168.29.101:8082/api/products/delete/${productId}`, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${token}`,
//     },
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Failed to remove item from wishlist");
//       }
//       alert("Item removed from wishlist successfully!");
//       fetchWishlist(); // Refresh the wishlist after removal
//     })
//     .catch((error) => {
//       console.error("Error removing item from wishlist:", error);
//       alert("Failed to remove item. Please try again.");
//     });
// }

// // Event listener to fetch and show the wishlist modal
// document.getElementById("wishlistModal").addEventListener("show.bs.modal", fetchWishlist);

// old work
// ==================================================================================================================================================================================================

// let productsData = [];
// let currentPage = 1;
// let productsPerPage = 12;
// let searchQuery = "";
// let cart = {}; // Store cart items

// // Fetch product data from products.json
// fetch("products.json")
//   .then((response) => response.json()) // Parse the JSON response
//   .then((data) => {
//     productsData = data.categories; // Store the products
//     renderProducts("All"); // Default render with "All" products

//     // Event listener for category selection
//     document.querySelectorAll(".widget-category a").forEach((item) => {
//       item.addEventListener("click", (e) => {
//         e.preventDefault();
//         const category = e.target.textContent;
//         renderProducts(category);
//       });
//     });

//     // Search functionality
//     document.getElementById("search-input").addEventListener("input", (e) => {
//       searchQuery = e.target.value.toLowerCase();
//       currentPage = 1; // Reset to first page when searching
//       renderProducts("All");
//     });
//   })
//   .catch((error) => {
//     console.error("Error fetching products:", error);
//   });

// // Function to render products based on category and search
// function renderProducts(category) {
//   const filteredProducts = getFilteredProducts(category);
//   const paginatedProducts = getPaginatedProducts(filteredProducts);

//   const productContainer = document.getElementById("product-list");
//   productContainer.innerHTML = ""; // Clear the product list

//   paginatedProducts.forEach((product, index) => {
//     let productHTML = `
//       <div class="col-xl-4 col-sm-6 mb-4 mt-4">
//         <div class="product-item-02 text-center h-100">
//           <div class="product-image">
//             <img class="img-fluid" src="${product.image}" alt="${product.name}">
//           </div>
//           <div class="product-info">
//             <div class="product-name mt-3">
//               <h5 class="mb-1">${product.name}</h5>
//             </div>
//             <div class="product-price">
//               <del>₹${product.price.original}</del>
//               <span class="text-dark"> ₹${product.price.discounted}</span>
//             </div>
//             <div class="product-sizes">
//               <label>Select Size:</label>
//               <select class="form-control size-selector" data-product-index="${index}">
//                 ${product.sizes
//                   .map(
//                     (size, sizeIndex) => `
//                     <option value="${size.size}" data-size-price="${size.price}" ${
//                       sizeIndex === 0 ? "selected" : ""
//                     }>
//                       ${size.size} - ₹${size.price}
//                     </option>
//                   `
//                   )
//                   .join("")}
//               </select>
//             </div>
//             <div class="mt-3 d-flex justify-content-between">
//               <div class="quantity-control d-inline-flex align-items-center border border-dark p-1">
//                 <button class="btn btn-black py-0 px-1 minus" data-product-index="${index}">-</button>
//                 <span class="quantity text-white mx-1" id="quantity-display${index}">0</span>
//                 <button class="btn btn-black py-0 px-1 plus" data-product-index="${index}">+</button>
//               </div>
//               <button class="btn btn-black text-white py-1 px-3 add-to-cart"
//                       data-item="${product.name}"
//                       data-price="${product.sizes[0].price}"
//                       data-size="${product.sizes[0].size}"
//                       data-image="${product.image}"
//                       data-product-index="${index}"
//                       data-bs-toggle="offcanvas"
//                       data-bs-target="#cartOffcanvas">Add</button>
//             </div>
//             <div class="mt-3">
//               <button class="btn btn-outline-dark add-to-wishlist"
//         data-item="${product.name}"
//         data-price="${product.sizes[0].price}"
//         data-image="${product.image}"
//         data-product-index="${index}">
//     Add to Wishlist
// </button>

//             </div>
//           </div>
//         </div>
//       </div>
//     `;
//     productContainer.innerHTML += productHTML;
//   });

//   renderPagination(filteredProducts);
//   attachEventListeners(); // Attach event listeners after rendering products
// }

// document.querySelectorAll(".add-to-wishlist").forEach((button) => {
//   button.addEventListener("click", (e) => {
//     console.log("Wishlist button clicked"); // Debugging line to see if the event fires

//     const productIndex = e.target.dataset.productIndex;
//     const selectedSize = document.querySelector(
//       `.size-selector[data-product-index="${productIndex}"]`
//     ).value;

//     // Get the full product details directly from the data attributes of the button
//     const product = {
//       name: e.target.dataset.item,
//       image: e.target.dataset.image,
//       price: parseFloat(e.target.dataset.price),
//       size: selectedSize,
//     };

//     // Log the product object to check if it works
//     console.log("Wishlist product:", product);

//     // Send data to the backend
//     fetch("/api/wishlist", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(product),
//     })
//       .then((response) => {
//         if (response.ok) {
//           alert(`${product.name} with size ${selectedSize} has been added to your wishlist!`);
//         } else {
//           alert("Failed to add item to wishlist.");
//         }
//       })
//       .catch((error) => {
//         console.error("Error adding to wishlist:", error);
//       });
//   });
// });

// // Function to filter products based on search query
// function getFilteredProducts(category) {
//   const categoryList =
//     category === "All" ? Object.keys(productsData) : [category];
//   let filteredProducts = [];
//   categoryList.forEach((cat) => {
//     const products = productsData[cat];
//     products.forEach((product) => {
//       if (product.name.toLowerCase().includes(searchQuery)) {
//         filteredProducts.push(product);
//       }
//     });
//   });
//   return filteredProducts;
// }

// // Function to paginate the filtered products
// function getPaginatedProducts(products) {
//   const startIndex = (currentPage - 1) * productsPerPage;
//   return products.slice(startIndex, startIndex + productsPerPage);
// }

// // Function to render pagination
// function renderPagination(products) {
//   const totalPages = Math.ceil(products.length / productsPerPage);
//   const paginationContainer = document.getElementById("pagination");
//   paginationContainer.innerHTML = ""; // Clear previous pagination

//   const prevPage =
//     currentPage > 1
//       ? `<li class="page-item"><a class="page-link" href="#" onclick="changePage(${
//           currentPage - 1
//         })">Previous</a></li>`
//       : `<li class="page-item disabled"><a class="page-link" href="#">Previous</a></li>`;
//   paginationContainer.innerHTML += prevPage;

//   for (let i = 1; i <= totalPages; i++) {
//     const activeClass = i === currentPage ? "active" : "";
//     paginationContainer.innerHTML += `<li class="page-item ${activeClass}"><a class="page-link" href="#" onclick="changePage(${i})">${i}</a></li>`;
//   }

//   const nextPage =
//     currentPage < totalPages
//       ? `<li class="page-item"><a class="page-link" href="#" onclick="changePage(${
//           currentPage + 1
//         })">Next</a></li>`
//       : `<li class="page-item disabled"><a class="page-link" href="#">Next</a></li>`;
//   paginationContainer.innerHTML += nextPage;
// }

// // Function to change page
// function changePage(page) {
//   currentPage = page;
//   renderProducts("All");
// }

// // Add to cart functionality
// function addToCart(product, quantityDisplay) {
//   const { name, image, price } = product;
//   const quantity = parseInt(quantityDisplay.textContent);

//   if (quantity > 0) {
//     if (cart[name]) {
//       cart[name].quantity = quantity;
//     } else {
//       cart[name] = { ...product, quantity };
//     }
//     updateCartUI();
//   } else {
//     alert("Please select a quantity greater than 0.");
//   }
// }

// // Update the cart UI
// function updateCartUI() {
//   const cartItemsContainer = document.getElementById("cart-items");
//   const grandTotalEl = document.getElementById("grand-total");
//   const gstAmountEl = document.getElementById("gst-amount");

//   cartItemsContainer.innerHTML = "";
//   let grandTotal = 0;

//   for (const itemName in cart) {
//     const { image, price, quantity } = cart[itemName];
//     grandTotal += price * quantity;

//     cartItemsContainer.innerHTML += `
//       <div class="d-flex align-items-center mb-3">
//         <img src="${image}" alt="${itemName}" class="img-fluid rounded-circle" style="width: 50px; height: 50px;">
//         <div class="ms-3">
//           <h6>${itemName}</h6>
//           <p class="mb-0">₹${price} x <span id="cart-quantity-display-${itemName}">${quantity}</span></p>
//         </div>
//         <div class="quantity-control d-inline-flex align-items-center border border-dark p-1 mx-3">
//           <button class="btn btn-black py-0 px-1 minus-cart" data-item-name="${itemName}">-</button>
//           <span class="quantity text-white mx-1" id="cart-quantity-display${itemName}">${quantity}</span>
//           <button class="btn btn-black py-0 px-1 plus-cart" data-item-name="${itemName}">+</button>
//         </div>
//         <div class="ms-auto">
//           <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart('${itemName}')">Remove</button>
//         </div>
//       </div>
//     `;
//   }

//   const gstAmount = (18 / 100) * grandTotal;
//   const totalWithGST = grandTotal + gstAmount;

//   grandTotalEl.textContent = `₹${grandTotal.toFixed(2)}`;
//   gstAmountEl.textContent = `₹${gstAmount.toFixed(2)}`;
//   document.getElementById("final-total").textContent = `₹${totalWithGST.toFixed(
//     2
//   )}`;

//   attachCartEventListeners(); // Attach cart event listeners for quantity controls
// }

// // Attach cart quantity control event listeners
// function attachCartEventListeners() {
//   document.querySelectorAll(".plus-cart").forEach((button) => {
//     button.addEventListener("click", (e) => {
//       const itemName = e.target.dataset.itemName;
//       if (cart[itemName]) {
//         cart[itemName].quantity += 1;
//         updateCartUI();
//         syncProductQuantity(itemName, cart[itemName].quantity);
//       }
//     });
//   });

//   document.querySelectorAll(".minus-cart").forEach((button) => {
//     button.addEventListener("click", (e) => {
//       const itemName = e.target.dataset.itemName;
//       if (cart[itemName] && cart[itemName].quantity > 1) {
//         cart[itemName].quantity -= 1;
//         updateCartUI();
//         syncProductQuantity(itemName, cart[itemName].quantity);
//       } else if (cart[itemName] && cart[itemName].quantity === 1) {
//         removeFromCart(itemName);
//       }
//     });
//   });
// }

// // Sync product quantity in the product list
// function syncProductQuantity(productName, newQuantity) {
//   document.querySelectorAll(".add-to-cart").forEach((button) => {
//     if (button.dataset.item === productName) {
//       const index = button.dataset.productIndex;
//       const quantityDisplay = document.getElementById(`quantity-display${index}`);
//       if (quantityDisplay) {
//         quantityDisplay.textContent = newQuantity;
//       }
//     }
//   });
// }

// // Remove item from cart
// function removeFromCart(itemName) {
//   delete cart[itemName];
//   updateCartUI();
// }

// // Attach event listeners for quantity and cart actions
// function attachEventListeners() {
//   document.querySelectorAll(".plus").forEach((button) => {
//     button.addEventListener("click", (e) => {
//       const index = e.target.dataset.productIndex;
//       const quantityDisplay = document.getElementById(
//         `quantity-display${index}`
//       );
//       quantityDisplay.textContent = parseInt(quantityDisplay.textContent) + 1;
//     });
//   });

//   document.querySelectorAll(".minus").forEach((button) => {
//     button.addEventListener("click", (e) => {
//       const index = e.target.dataset.productIndex;
//       const quantityDisplay = document.getElementById(
//         `quantity-display${index}`
//       );
//       if (parseInt(quantityDisplay.textContent) > 0) {
//         quantityDisplay.textContent = parseInt(quantityDisplay.textContent) - 1;
//       }
//     });
//   });

//   document.querySelectorAll(".size-selector").forEach((selector) => {
//     selector.addEventListener("change", (e) => {
//       const productIndex = e.target.dataset.productIndex;
//       const selectedOption = e.target.options[e.target.selectedIndex];
//       const selectedPrice = selectedOption.dataset.sizePrice;
//       const addToCartButton = document.querySelector(
//         `.add-to-cart[data-product-index="${productIndex}"]`
//       );

//       addToCartButton.dataset.price = selectedPrice; // Update the price in the button's data attribute
//       addToCartButton.dataset.size = selectedOption.value; // Update the selected size
//     });
//   });

//   document.querySelectorAll(".add-to-cart").forEach((button) => {
//     button.addEventListener("click", (e) => {
//       const product = {
//         name: e.target.dataset.item,
//         image: e.target.dataset.image,
//         price: parseFloat(e.target.dataset.price),
//         size: e.target.dataset.size,
//       };
//       const index = e.target.dataset.productIndex;
//       const quantityDisplay = document.getElementById(`quantity-display${index}`);
//       addToCart(product, quantityDisplay);
//     });
//   });
// }

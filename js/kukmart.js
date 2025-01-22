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




let productsData = [];
let currentPage = 1;
let productsPerPage = 12;
let searchQuery = "";
let cart = {}; // Store cart items

// Fetch product data from products.json
fetch("products.json")
  .then((response) => response.json()) // Parse the JSON response
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
            <img class="img-fluid" src="${product.image}" alt="${product.name}">
          </div>
          <div class="product-info">
            <div class="product-name mt-3">
              <h5 class="mb-1">${product.name}</h5>
            </div>
            <div class="product-price">
              <del>₹${product.price.original}</del>
              <span class="text-dark"> ₹${product.price.discounted}</span>
            </div>
            <div class="product-sizes">
              <label>Select Size:</label>
              <select class="form-control size-selector" data-product-index="${index}">
                ${product.sizes
                  .map(
                    (size, sizeIndex) => `
                    <option value="${size.size}" data-size-price="${size.price}" ${
                      sizeIndex === 0 ? "selected" : ""
                    }>
                      ${size.size} - ₹${size.price}
                    </option>
                  `
                  )
                  .join("")}
              </select>
            </div>
            <div class="mt-3 d-flex justify-content-between">
              <div class="quantity-control d-inline-flex align-items-center border border-dark p-1">
                <button class="btn btn-black py-0 px-1 minus" data-product-index="${index}">-</button>
                <span class="quantity text-white mx-1" id="quantity-display${index}">0</span>
                <button class="btn btn-black py-0 px-1 plus" data-product-index="${index}">+</button>
              </div>
              <button class="btn btn-black text-white py-1 px-3 add-to-cart" 
                      data-item="${product.name}" 
                      data-price="${product.sizes[0].price}" 
                      data-size="${product.sizes[0].size}"
                      data-image="${product.image}" 
                      data-product-index="${index}" 
                      data-bs-toggle="offcanvas" 
                      data-bs-target="#cartOffcanvas">Add</button>
            </div>
            <div class="mt-3">
              <button class="btn btn-outline-dark add-to-wishlist"
        data-product-id="${product.id}"
        data-product-index="${index}">
    Add to Wishlist
</button>
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

// Function to handle adding a product to the wishlist
// Function to handle adding a product to the wishlist
function addToWishlist(e) {
  const productId = e.target.dataset.productId; // Get the product id
  const productIndex = e.target.dataset.productIndex;

  // Find the product object from the products data (assuming `productsData` holds all your products)
  const product = productsData.Groceries.find(p => p.id === parseInt(productId));

  // If the product is found, build the object to send to the backend
  if (product) {
    const wishlistProduct = {
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price, // Including original and discounted price
      sizes: product.sizes, // Full array of sizes and prices
    };

    // Log the product details to check before sending
    console.log("Wishlist product details:", wishlistProduct);

    // Send the product data to the backend via a POST request
    fetch("https://f793-2401-4900-1cc9-ec27-8539-12b7-b3ad-69e1.ngrok-free.app/api/wishlist/product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(wishlistProduct), // Send full product details
    })
      .then((response) => {
        if (response.ok) {
          alert(`${wishlistProduct.name} has been added to your wishlist!`);
        } else {
          alert("Failed to add item to wishlist.");
        }
      })
      .catch((error) => {
        console.error("Error adding to wishlist:", error);
      });
  }
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
    alert("Please select a quantity greater than 0.");
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
          <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart('${itemName}')">Remove</button>
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
      const quantityDisplay = document.getElementById(`quantity-display${index}`);
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
      const quantityDisplay = document.getElementById(`quantity-display${index}`);
      addToCart(product, quantityDisplay);
    });
  });

  // Attach wishlist event listener
  document.querySelectorAll(".add-to-wishlist").forEach((button) => {
    button.addEventListener("click", addToWishlist);
  });
}

// Call the render function when the page loads
window.onload = function () {
  renderProducts("All");
};




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

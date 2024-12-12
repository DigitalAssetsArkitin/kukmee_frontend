document.getElementById('bookButton').addEventListener('click', function () {
    const modal = new bootstrap.Modal(document.getElementById('cardModal'));
    modal.show();
});

document.getElementById('bookButton1').addEventListener('click', function () {
    const modal = new bootstrap.Modal(document.getElementById('cardModal'));
    modal.show();
});


//Book button card for one meal and multiple days,monthly

const professionalChefCharge = 1000; // Professional Chef Charge


// Function to open a new modal and close the existing one
function openNewModal(openModalId, closeModalId) {
    // Close the currently open modal
    const currentModal = bootstrap.Modal.getInstance(document.getElementById(closeModalId));
    if (currentModal) {
        currentModal.hide(); // Close the cardModal
    }

    // Open the new modal (chefModal)
    const newModal = new bootstrap.Modal(document.getElementById(openModalId));
    newModal.show(); // Show the new modal
}



// Open the "Professional Chefs" and "Domestic Cooks" modal when clicking "For One Meal"
document.getElementById('mealImage').addEventListener('click', function () {
    openNewModal('chefModal', 'cardModal');
});
/*
// Open the "Professional Chefs" and "Domestic Cooks" modal when clicking "For Multiple Days"
document.getElementById('multipleDaysImage').addEventListener('click', function () {
    openNewModal('chefModal', 'cardModal');
});

// Open the "Professional Chefs" and "Domestic Cooks" modal when clicking "For Monthly Basis"
document.getElementById('For Monthly Basis').addEventListener('click', function () {
    openNewModal('chefModal', 'cardModal');
});

*/

//Professional chef

const PROFESSIONAL_CHEF_FEE = 1000;

document.getElementById("professionalChef").addEventListener("click", function () {
    // Close the current modal
    let chefModal = bootstrap.Modal.getInstance(document.getElementById("chefModal"));
    chefModal.hide();

    // Open the select menu modal
    let selectMenuModal = new bootstrap.Modal(document.getElementById("selectMenuModal"));
    selectMenuModal.show();
});




document.getElementById("processBtn").addEventListener("click", function () {
    const occasion = document.getElementById("occasion").value;
    const meals = document.getElementById("meals").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const numPeople = document.getElementById("numPeople").value;

    // Check if all fields including numPeople are filled
    if (occasion && meals && date && time && numPeople) {
        const dishes = {
            birthday: {
                breakfast: [
                    { name: "Pancakes", price: 5 },
                    { name: "Omelette", price: 7 },
                    { name: "Toast", price: 6 },
                    { name: "Avocado Toast", price: 8 },
                    { name: "Banana Toast", price: 8 },
                    { name: "Smoothie Bowl", price: 9 },
                    { name: "Bagels", price: 5 },
                    { name: "Waffles", price: 10 },
                    { name: "Scrambled Eggs", price: 6 },
                    { name: "French Toast", price: 7 }
                ],
                lunch: [
                    { name: "Burger", price: 10 },
                    { name: "Pizza", price: 12 },
                    { name: "Caesar Salad", price: 8 },
                    { name: "Grilled Sandwich", price: 9 },
                    { name: "Tacos", price: 11 },
                    { name: "Chicken Wrap", price: 10 },
                    { name: "Veggie Bowl", price: 9 },
                    { name: "Pasta Alfredo", price: 13 },
                    { name: "Sushi Rolls", price: 15 },
                    { name: "Chicken Nuggets", price: 8 }
                ],
                dinner: [
                    { name: "Steak", price: 20 },
                    { name: "Pasta", price: 15 },
                    { name: "Grilled Salmon", price: 18 },
                    { name: "Roast Chicken", price: 17 },
                    { name: "Lamb Chops", price: 22 },
                    { name: "Vegetable Stir Fry", price: 14 },
                    { name: "Shrimp Scampi", price: 19 },
                    { name: "Beef Stroganoff", price: 16 },
                    { name: "Mushroom Risotto", price: 14 },
                    { name: "Seafood Paella", price: 20 }
                ],
                sweets: {
                    lunch: [
                        { name: "Lemon Tart", price: 6 },
                        { name: "Fruit Salad", price: 5 }
                    ],
                    dinner: [
                        { name: "Chocolate Cake", price: 8 },
                        { name: "Ice Cream", price: 5 },
                        { name: "Cupcakes", price: 6 }
                    ]
                }
            },
            // Similar structure for "wedding" and "corporate" can be added
        };


        


        const selectedDishes = dishes[occasion]?.[meals] || [];

        // Include sweets specific to lunch or dinner only if not already included
        if (meals === "lunch") {
            selectedDishes.push(...(dishes[occasion]?.sweets?.lunch || []));
        }
        
        if (meals === "dinner") {
            selectedDishes.push(...(dishes[occasion]?.sweets?.dinner || []));
        }
        


        
        if (selectedDishes.length > 0) {
            let dishesHtml = "";
            selectedDishes.forEach((dish, index) => {
                dishesHtml += `
                    <div class="card col-md-3 mb-3">
                        <div class="card-body text-center">
                            <h5 class="card-title" style="font-size: 13px;">${dish.name}</h5>
                            <p class="card-text" style="font-size: 12px;">$${dish.price}</p>
                            <label>
                                <input type="checkbox" class="dish-checkbox" data-price="${dish.price}" data-index="${index}" />
                                Select
                            </label>
                           <div class="mt-3 d-flex justify-content-between px-3">
                                <!-- Small buttons for increasing and decreasing quantity -->
                                <div class="quantity-control d-inline-flex align-items-center border border-dark p-1">
                                <button class="btn btn-black py-0 px-1 minus" onclick="adjustQuantity(${index}, -1)" >-</button>
                                <span class="quantity text-white mx-1" id="quantity-${index}">0</span>
                               
                                <button type="button"  class="btn btn-black py-0 px-1 plus"  onclick="adjustQuantity(${index}, 1)">+</button>
                                

                                 </div>
                            </div>
                        </div>
                    </div>`;
         
            });

            // Populate and show the dishes section
            document.getElementById("dishesList").innerHTML = dishesHtml;
            document.getElementById("totalAmount").innerText = "0"; // Reset total
            document.getElementById("selectForm").classList.add("d-none");
            document.getElementById("dishesSection").classList.remove("d-none");
        } else {
            alert("No dishes available for the selected options.");
        }
    } else {
        alert("Please fill in all fields, including the number of people.");
    }
});







// Adjust dish quantity function
let selectedQuantities = {};

function adjustQuantity(index, delta) {
    const quantitySpan = document.getElementById(`quantity-${index}`);
    let currentQuantity = parseInt(quantitySpan.innerText);

    // Adjust the quantity based on the delta (either -1 or 1)
    currentQuantity = Math.max(0, currentQuantity + delta); // Prevent negative quantities

    // Update the displayed quantity
    quantitySpan.innerText = currentQuantity;

    // Store the updated quantity in the selectedQuantities object
    if (currentQuantity > 0) {
        selectedQuantities[index] = currentQuantity;
    } else {
        delete selectedQuantities[index];
    }

    // Recalculate the total amount
    updateTotalAmount();
}

// Update the total amount function
function updateTotalAmount() {
    const selectedDishes = document.querySelectorAll(".dish-checkbox:checked");
    let totalAmount = PROFESSIONAL_CHEF_FEE; // Start with chef fee
   
    selectedDishes.forEach((checkbox) => {
        const dishIndex = checkbox.dataset.index;
        const price = parseFloat(checkbox.dataset.price);
        const quantity = selectedQuantities[dishIndex] || 1;
        totalAmount += price * quantity;
    });
    document.getElementById("totalAmount").innerText = totalAmount;
}

// Go to Bill Button Logic (no changes needed here)
document.getElementById("billBtn").addEventListener("click", function () {
    const occasion = document.getElementById("occasion").value;
    const meals = document.getElementById("meals").value;
    const numPeople = document.getElementById("numPeople").value;
    const selectedDishes = document.querySelectorAll(".dish-checkbox:checked");

    let dishesListHtml = "";
    let totalAmount = PROFESSIONAL_CHEF_FEE;


    selectedDishes.forEach((checkbox) => {
        const dishName = checkbox.closest(".card-body").querySelector(".card-title").textContent;
        const dishPrice = checkbox.dataset.price;
        const dishIndex = checkbox.dataset.index;
        const quantity = selectedQuantities[dishIndex] || 1;

        dishesListHtml += `<li>${dishName} - $${dishPrice} x ${quantity}</li>`;
        totalAmount += parseFloat(dishPrice) * quantity;
    });

    dishesListHtml += `<li>Professional Chef Fee - $${PROFESSIONAL_CHEF_FEE}</li>`;




    document.getElementById("finalOccasion").textContent = occasion.charAt(0).toUpperCase() + occasion.slice(1);
    document.getElementById("finalMeals").textContent = meals.charAt(0).toUpperCase() + meals.slice(1);
    document.getElementById("finalNumPeople").textContent = numPeople;
    document.getElementById("selectedDishesList").innerHTML = dishesListHtml;
    document.getElementById("finalTotalAmount").textContent = totalAmount;

    const currentModal = bootstrap.Modal.getInstance(document.getElementById("selectMenuModal"));
    currentModal.hide();
    new bootstrap.Modal(document.getElementById("confirmBookingModal")).show();
});



// Confirm Button Logic (no changes needed here)
document.getElementById("confirmBtn").addEventListener("click", function () {
    const occasion = document.getElementById("occasion").value;
    const meals = document.getElementById("meals").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const numPeople = document.getElementById("numPeople").value;
   
    const selectedDishes = Object.keys(selectedQuantities).map((index) => {
        const dishName = document.querySelector(`[data-index="${index}"]`).closest(".card-body").querySelector(".card-title").textContent;
        const price = document.querySelector(`[data-index="${index}"]`).dataset.price;
        return {
            name: dishName,
            price: price,
            quantity: selectedQuantities[index],
        };
    });

    const totalAmount = document.getElementById("finalTotalAmount").textContent;

    const bookingData = {
        occasion,
        meals,
        date,
        time,
        numPeople,
        selectedDishes,
        totalAmount,
    };




    fetch("https://your-backend-api-url.com/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
    })
        .then((response) => response.json())
        .then((data) => {
            alert("Booking confirmed!");
            document.getElementById("closeModalBtn").click(); // Close modal
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("There was an error confirming your booking. Please try again.");
        });
});


// Reset Form and Modal Function
function resetFormAndModal() {
    // Reset the form fields
    document.getElementById("occasion").value = "";
    document.getElementById("meals").value = "";
    document.getElementById("date").value = "";
    document.getElementById("time").value = "";
    document.getElementById("numPeople").value = "";

    // Reset all selected checkboxes (dishes)
    const checkboxes = document.querySelectorAll(".dish-checkbox");
    checkboxes.forEach((checkbox) => {
        checkbox.checked = false; // Uncheck all checkboxes
    });

    // Reset all quantity displays to 0
    const quantitySpans = document.querySelectorAll(".quantity");
    quantitySpans.forEach((span) => {
        span.innerText = "0"; // Reset all quantities to 0
    });

    // Clear the selectedQuantities object
    selectedQuantities = {};

    // Reset the total amount
    document.getElementById("totalAmount").innerText = "0";
   

    // Hide the dishes section and show the select form again
    document.getElementById("dishesSection").classList.add("d-none");
    document.getElementById("selectForm").classList.remove("d-none");

    // Clear the dishes list
    document.getElementById("dishesList").innerHTML = "";
    

    // Optionally reset any error messages or alerts
    alert("Form reset successfully!");
}

// Close Button Logic
document.getElementById("closeModalBtn").addEventListener("click", function () {
    resetFormAndModal(); // Ensure all states are cleared on modal close
});

// Book Now Button Logic
document.getElementById("bookNowBtn").addEventListener("click", function () {
    resetFormAndModal(); // Clear all lingering states

    // Open the modal for a fresh start
    new bootstrap.Modal(document.getElementById("selectMenuModal")).show();
});

// Professional Image or External Trigger Logic
document.querySelectorAll(".professional-image").forEach((img) => {
    img.addEventListener("click", function () {
        resetFormAndModal(); // Ensure the modal starts fresh
        new bootstrap.Modal(document.getElementById("selectMenuModal")).show();
    });
});









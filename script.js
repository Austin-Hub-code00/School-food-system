let total = 0;

let cartItems = [];

function addToCart(foodName, price) {

    total += price;

    document.getElementById("total").innerText = total;

    cartItems.push({
        name: foodName,
        price: price
    });

    displayCart();
}

function displayCart() {

    let cartDiv =
        document.getElementById("cart-items");

    cartDiv.innerHTML = "";

    for (let i = 0; i < cartItems.length; i++) {

        cartDiv.innerHTML +=
        `
        <div class="cart-item">
            ${cartItems[i].name} - $${cartItems[i].price}

            <button onclick="removeItem(${i})">
                Remove
            </button>
        </div>
        `;
    }
}

function removeItem(index) {

    total -= cartItems[index].price;

    document.getElementById("total").innerText = total;

    cartItems.splice(index, 1);

    displayCart();
}

function placeOrder() {

    let customerName =
        document.getElementById("customerName").value;

    if (customerName === "") {

        alert("Please enter your name");

        return;
    }

    if (cartItems.length === 0) {

        alert("Your cart is empty");

        return;
    }

    alert(
        "Order Successful! Thank you, " +
        customerName +
        ". Your total is $" +
        total
    );
    let orderList =
    document.getElementById("admin-orders");

let foodNames = "";

for (let i = 0; i < cartItems.length; i++) {

    foodNames +=
        cartItems[i].name + " ";

}

orderList.innerHTML +=
`
<div class="admin-order">

    <h3>${customerName}</h3>

    <p>${foodNames}</p>

    <p>Total: $${total}</p>

    <button onclick="completeOrder(this)">
        Complete
    </button>

</div>
`;

    total = 0;

    cartItems = [];

    displayCart();

    document.getElementById("total").innerText = total;

    document.getElementById("customerName").value = "";

}
function completeOrder(button) {

    button.parentElement.remove();

}

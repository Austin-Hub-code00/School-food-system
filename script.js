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

async function placeOrder() {

    let customerName =
        document.getElementById("customerName").value;
        let subtotal = total;
        let serviceFee = subtotal * 0.005;
        let finalTotal = subtotal + serviceFee;

    if (customerName === "") {

        alert("Please enter your name");

        return;
    }

    if (cartItems.length === 0) {

        alert("Your cart is empty");

        return;
    }

   
let counterRef =
window.doc(window.db, "system", "counter");

let counterSnap =
await window.getDoc(counterRef);

let currentNumber = 1;

if (counterSnap.exists()) {

    currentNumber =
    counterSnap.data().current;

}    
let foodNames = "";

for (let i = 0; i < cartItems.length; i++) {

    foodNames +=
    cartItems[i].name + "<br>";

}

await window.addDoc(
window.collection(window.db, "orders"),
{
number: currentNumber,
customer: customerName,
foods: foodNames,
total: finalTotal,
subtotal: subtotal,
serviceFee: serviceFee
});
await window.setDoc(counterRef, {

    current: currentNumber + 1

});
 alert(
"Order Successful!\n\n" +

"Order Number: #" + currentNumber +

"\n\nCustomer: " + customerName +

"\n\nSubtotal: $" + subtotal.toFixed(2) +

"\nService Fee (1%): $" + serviceFee.toFixed(2) +

"\nTOTAL: $" + finalTotal.toFixed(2) +

"\n\nThank you for your order!"
);
    total = 0;

    cartItems = [];

    displayCart();

    document.getElementById("total").innerText = total;

    document.getElementById("customerName").value = "";

}
function completeOrder(button) {

    button.parentElement.remove();

}

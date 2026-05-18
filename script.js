let total = 0;


let cartItems = [];

function addToCart(foodName, price) {
    let restrictedFoods = [

"黑胡椒麵含荷包蛋",

"蘑菇麵含荷包蛋",

"黃金脆薯",

"甜不辣"

];

let currentHour = new Date().getHours();

if (

restrictedFoods.includes(foodName)

&& currentHour < 11

) {

alert(

foodName +

" is only available after 11:00 AM"

);

return;

}

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
    let now = new Date();

let currentMinutes =
now.getHours() * 60 +
now.getMinutes();

if (currentMinutes > 1110) {

    alert("Cafeteria is closed now.");

    return;

}
    let today = new Date().getDay();

if (today === 0 || today === 6) {

    alert("Cafeteria is closed on weekends.");

    return;

}

    let customerName =
        document.getElementById("customerName").value;
    let pickupTime =
        document.getElementById("pickupTime").value;
        let subtotal = total;
        let serviceFee = 1;
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
pickupTime: pickupTime,
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

"\nPick Up Time: " + pickupTime +

"\n\nSubtotal: NT$" + subtotal +

"\nService Fee: NT$" + serviceFee +

"\nTOTAL: NT$" + finalTotal +

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
let pickupSelect = document.getElementById("pickupTime");

let now = new Date();

let currentMinutes =
now.getHours() * 60 + now.getMinutes();

let firstAvailable = -1;

for (let i = 0; i < pickupSelect.options.length; i++) {

    let option = pickupSelect.options[i];

    let parts = option.value.split(":");

    let optionMinutes =
    parseInt(parts[0]) * 60 +
    parseInt(parts[1]);

    if (optionMinutes <= currentMinutes) {

        option.disabled = true;

    } else {

        if (firstAvailable === -1) {

            firstAvailable = i;

        }

    }

}

if (firstAvailable !== -1) {

    pickupSelect.selectedIndex = firstAvailable;

}
let currentTime = new Date();

let day = currentTime.getDay();

let hour = currentTime.getHours();

let minute = currentTime.getMinutes();

let currentClockMinutes =
hour * 60 + minute;

let isWeekend =
(day === 0 || day === 6);

let isClosed = false;

/* CLOSED CONDITIONS */

if (isWeekend) {

    isClosed = true;

}

/* before 07:00 */

if (currentClockMinutes < 420) {

    isClosed = true;

}

/* between 13:31 and 16:29 */

if (
currentClockMinutes > 810 &&
currentClockMinutes < 990
) {

    isClosed = true;

}

/* after 18:30 */

if (currentClockMinutes > 1110) {

    isClosed = true;

}

/* APPLY CLOSED MODE */

/*
if (isClosed) {

    document.body.style.opacity = "0.5";

    document.getElementById(
    "closed-message"
    ).style.display = "block";

    let buttons =
    document.querySelectorAll("button");

    buttons.forEach((button) => {

        button.disabled = true;

    });

}
*/

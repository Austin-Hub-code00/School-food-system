let adminDiv =
document.getElementById("admin-orders");

window.onSnapshot(
window.collection(window.db, "orders"),
(snapshot) => {

adminDiv.innerHTML = "";

snapshot.forEach((docItem) => {

let order = docItem.data();

adminDiv.innerHTML +=
`
<div class="admin-order">

<h3>Order #${order.number}</h3>

<h3>${order.customer}</h3>

<p>Pick Up Time: ${order.pickupTime}</p>

<p>${order.foods}</p>

<p>Subtotal: NT$${order.subtotal}</p>

<p>Service Fee: NT$${order.serviceFee}</p>

<p><b>Total: NT$${order.total}</b></p>

<button onclick="completeOrder('${docItem.id}')">
Complete
</button>

</div>
`;

});

});

window.completeOrder = async function(id) {

await window.deleteDoc(
window.doc(window.db, "orders", id)
);

}
window.resetCounter = async function() {
    await window.setDoc(
        window.doc(window.db, "system", "counter"),
        {
            current: 1
        }
    );

    alert("Order numbers reset to #1");
};

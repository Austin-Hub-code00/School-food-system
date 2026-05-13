let adminDiv =
document.getElementById("admin-orders");
onSnapshot(collection(db, "orders"), (snapshot) => {
adminDiv.innerHTML = "";
snapshot.forEach((docItem) => {
let order = docItem.data();
adminDiv.innerHTML +=
`
11
 <div class="admin-order">
 <h3>Order #${order.number}</h3>
 <h3>${order.customer}</h3>
 <p>${order.foods}</p>
 <p>Total: $${order.total}</p>
 <button onclick="completeOrder('${docItem.id}')">
 Complete
 </button>
 </div>
 `;
});
});
window.completeOrder = async function(id) {
await deleteDoc(doc(db, "orders", id));
}

let orders =
JSON.parse(localStorage.getItem("orders")) || [];

let adminDiv =
document.getElementById("admin-orders");

displayOrders();

function displayOrders() {

    adminDiv.innerHTML = "";

    for (let i = 0; i < orders.length; i++) {

        adminDiv.innerHTML +=
        `
        <div class="admin-order">

            <h3>
Order #${orders[i].number}
</h3>

<h3>${orders[i].customer}</h3>

            <p>${orders[i].foods}</p>

            <p>Total: $${orders[i].total}</p>

            <button onclick="completeOrder(${i})">
                Complete
            </button>

        </div>
        `;
    }
}

function completeOrder(index) {

    orders.splice(index, 1);

    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );

    displayOrders();

}
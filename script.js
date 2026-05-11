let total = 0;

function addToCart(price) {

    total = total + price;

    document.getElementById("total").innerText = total;

}
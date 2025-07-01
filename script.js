document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById('products')) {
        loadProducts();
    }
});

function loadProducts() {
    fetch('products.xml')
        .then(response => response.text())
        .then(data => {
            const xml = new DOMParser().parseFromString(data, "application/xml");
            const products = xml.getElementsByTagName("product");
            const productSection = document.getElementById("products");

            for (let product of products) {
                const id = product.getElementsByTagName("id")[0].textContent;
                const name = product.getElementsByTagName("name")[0].textContent;
                const price = product.getElementsByTagName("price")[0].textContent;
                const image = product.getElementsByTagName("image")[0].textContent;

                const div = document.createElement("div");
                div.className = "product";
                div.innerHTML = `
                    <img src="${image}" alt="${name}"><br>
                    <strong>${name}</strong><br>
                    Price: $${price}<br>
                    <button onclick="addToCart('${id}', '${name}', '${price}')">Add to Cart</button>
                `;
                productSection.appendChild(div);
            }
        });
}

function addToCart(id, name, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ id, name, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} added to cart!`);

}

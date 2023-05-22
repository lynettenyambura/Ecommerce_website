const apiUrl = 'https://fakestoreapi.com/';

// Fetch all products
fetch(apiUrl + 'products')
    .then(response => response.json())
    .then(data => {
        const productList = document.getElementById('product-list');
        data.forEach(product => {
            productList.appendChild(createProductCard(product));
        });
    });

// Function to create a product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>${product.price}$</p>
        <button onclick="showProductDetails(${product.id})">Details</button>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    return card;
}

// Function to show product details
function showProductDetails(productId) {
    fetch(apiUrl + 'products/' + productId)
        .then(response => response.json())
        .then(product => {
            const productDetails = document.getElementById('product-details');
            productDetails.innerHTML = `
                <div class="product-details-card">
                    <img src="${product.image}" alt="${product.title}">
                    <div class="details">
                        <h2>${product.title}</h2>
                        <p>${product.description}</p>
                        <p>${product.price}$</p>
                        <button onclick="addToCart(${product.id})">Add to Cart</button>
                    </div>
                </div>
            `;
            productDetails.style.display = 'block';
        });
}

// Function to add product to cart
function addToCart(productId) {
    fetch(apiUrl + 'products/' + productId)
        .then(response => response.json())
        .then(product => {
            const cartItems = document.getElementById('cart-items');
            const li = document.createElement('li');
            li.innerText = `${product.title} - ${product.price}$`;
            cartItems.appendChild(li);
        });
}

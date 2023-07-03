 // Products
 const products = [
    { id: 1, productCode: "Sunglass", pic: '<img src="./src/sunglass.jfif" width="200px", height="200px">', price: 100 },
    { id: 2, productCode: "Shoe", pic: '<img src="./src/shoe.jfif" width="200px", height="200px">', price: 2000 },
    { id: 3, productCode: "Watch", pic: '<img src="./src/watch.jfif" width="200px", height="200px">', price: 1500 },
    { id: 4, productCode: "Lipstick", pic: '<img src="./src/lipstick.jfif" width="200px", height="200px">', price: 500 },
    { id: 5, productCode: "Camera", pic: '<img src="./src/camera.jfif" width="200px", height="200px">', price: 5000 },
  ];

  // Generate Product List
function generateProductList() {
    const productListElement = document.getElementById('product-list');


    products.forEach(product => {
      const { id, productCode, pic, price } = product;

      const productElement = document.createElement('div');
      productElement.classList.add('product');

      productElement.innerHTML = `
        <span>${pic} ${productCode}<br>Price-${price.toFixed(2)}BDT</span><br>
        <button class="btn btn-sm btn-primary" onclick="addToCart(${id}, 1)">Add to Cart</button>
      `;

      productListElement.appendChild(productElement);
    });
  }

  // Attach Event Listeners
  document.getElementById('clear-cart').addEventListener('click', clearCart);

  // Initialize
  generateProductList();

  // Shopping Cart
  let cart = [];

  // Add to Cart
  function addToCart(productId, quantity = 1) {
    const product = products.find(item => item.id === productId);
    if (product) {
      const existingItem = cart.find(item => item.product.id === productId);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.push({ product, quantity });
      }
      displayCartItems();
    }
  }

  // Display Cart Items
  function displayCartItems() {
    const cartElement = document.getElementById('shopping-cart');
    cartElement.innerHTML = '';

    let totalAmount = 0;

    cart.forEach(item => {
      const { product, quantity } = item;
      const { id, productCode, price } = product;
      const amount = price * quantity;
      totalAmount += amount;

      const cartItemElement = document.createElement('div');
      cartItemElement.classList.add('cart-item');

      cartItemElement.innerHTML = `
        <span>${productCode} - ${quantity} x ${price.toFixed(2)}BDT = ${amount.toFixed(2)}BDT</span>
        <button class="btn btn-sm btn-danger" onclick="removeFromCart(${product.id})">Remove from Cart</button>
        <button class="btn btn-sm btn-secondary" onclick="decreaseQuantity(${product.id})">-</button>
        <button class="btn btn-sm btn-secondary" onclick="increaseQuantity(${product.id})">+</button>
      `;

      cartElement.appendChild(cartItemElement);
    });

    const totalElement = document.createElement('div');
    totalElement.classList.add('total');
    totalElement.textContent = `Total: ${totalAmount.toFixed(2)}BDT`;

    cartElement.appendChild(totalElement);
    applyDiscount(5);
  }

   // Decrease Quantity
   function decreaseQuantity(productId) {
    const item = cart.find(item => item.product.id === productId);
    if (item && item.quantity > 1) {
      item.quantity--;
      displayCartItems();
    }
  }

  // Increase Quantity
  function increaseQuantity(productId) {
    const item = cart.find(item => item.product.id === productId);
    if (item) {
      item.quantity++;
      displayCartItems();
    }
  }

  // Apply Discount
  function applyDiscount(percentage) {
    if (percentage > 0 && percentage <= 100) {
      const discount = percentage / 100;
      const discountedAmount = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0) * discount;
      const totalAmount = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0) - discountedAmount;

      const discountElement = document.createElement('div');
      discountElement.classList.add('total');
      discountElement.textContent = `Discount: ${percentage}% (${discountedAmount.toFixed(2)}BDT)`;

      const totalElement = document.querySelector('.total');
      totalElement.parentNode.insertBefore(discountElement, totalElement.nextSibling);

      totalElement.textContent = `Total (After Discount): ${totalAmount.toFixed(2)}BDT`;
    }
    
  }
 

  // Clear Cart
function clearCart() {
    cart = [];
    
    displayCartItems();
  }

  // Remove from Cart
  function removeFromCart(productId) {
    cart = cart.filter(item => item.product.id !== productId);
    displayCartItems();
  }
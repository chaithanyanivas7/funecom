document.addEventListener("DOMContentLoaded", () => {

  const products = [
    {id:1,name:"Luxury Watch",price:2500,image:"https://picsum.photos/200?1"},
    {id:2,name:"Sneakers",price:1800,image:"https://picsum.photos/200?2"},
    {id:3,name:"Headphones",price:2200,image:"https://picsum.photos/200?3"},
    {id:4,name:"Backpack",price:1500,image:"https://picsum.photos/200?4"},
    {id:5,name:"Sunglasses",price:900,image:"https://picsum.photos/200?5"},
    {id:6,name:"Perfume",price:3000,image:"https://picsum.photos/200?6"}
  ];

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // ✅ MAKE FUNCTION GLOBAL
  window.addToCart = function(id){
    const product = products.find(p => p.id === id);
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
  }

  function displayProducts(list, id){
    const container = document.getElementById(id);
    if(!container) return;

    container.innerHTML = list.map(p => `
      <div class="card">
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <button class="btn" onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    `).join('');
  }

  function updateCart(){
    const el = document.getElementById("cart-count");
    if(el) el.innerText = cart.length;
  }

  function displayCart(){
    const c = document.getElementById("cart-items");
    const totalEl = document.getElementById("total");
    if(!c) return;

    let total = 0;
    c.innerHTML = cart.map((item, i) => {
      total += item.price;
      return `<div>${item.name} - ₹${item.price}</div>`;
    }).join('');

    if(totalEl) totalEl.innerText = total;
  }

  function checkout(){
    const form = document.getElementById("checkout-form");
    if(!form) return;

    form.addEventListener("submit", e => {
      e.preventDefault();

      const orderId = "ORD" + Date.now();

      document.getElementById("order-success").innerHTML =
        `✅ Order placed successfully! <br> Order ID: ${orderId}`;

      localStorage.removeItem("cart");
    });
  }

  // ✅ RUN AFTER LOAD
  displayProducts(products, "featured-products");
  displayProducts(products, "product-list");
  updateCart();
  displayCart();
  checkout();
});

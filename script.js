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

  function displayProducts(list,id){
    const c=document.getElementById(id);
    if(!c) return;

    c.innerHTML=list.map(p=>`
      <div class="card">
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <button onclick="addToCart(${p.id})" class="btn">Add</button>
      </div>
    `).join('');
  }

  window.addToCart = function(id){
    cart.push(products.find(p=>p.id===id));
    localStorage.setItem("cart",JSON.stringify(cart));
    updateCart();
  }

  function updateCart(){
    let el=document.getElementById("cart-count");
    if(el) el.innerText=cart.length;
  }

  function displayCart(){
    let c=document.getElementById("cart-items"),t=0;
    if(!c) return;

    c.innerHTML=cart.map((i,idx)=>{
      t+=i.price;
      return `<div>${i.name} - ₹${i.price}</div>`;
    }).join('');

    let total=document.getElementById("total");
    if(total) total.innerText=t;
  }

  function checkout(){
    let form=document.getElementById("checkout-form");
    if(!form) return;

    form.addEventListener("submit",e=>{
      e.preventDefault();

      let orderId = "ORD" + Date.now();
      document.getElementById("order-success").innerHTML =
        `✅ Order Placed! ID: ${orderId}`;

      localStorage.removeItem("cart");
    });
  }

  // RUN AFTER PAGE LOAD
  updateCart();
  displayProducts(products,"product-list");
  displayProducts(products,"featured-products");
  displayCart();
  checkout();

});

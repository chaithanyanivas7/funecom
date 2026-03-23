const products = [
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
    </div>`).join('');
}

function addToCart(id){
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
    return `<div>${i.name} - ₹${i.price} <button onclick="remove(${idx})">X</button></div>`;
  }).join('');
  let total=document.getElementById("total");
  if(total) total.innerText=t;
}

function remove(i){
  cart.splice(i,1);
  localStorage.setItem("cart",JSON.stringify(cart));
  displayCart();updateCart();
}

function checkout(){
  let form=document.getElementById("checkout-form");
  if(!form) return;

  form.addEventListener("submit",e=>{
    e.preventDefault();
    let data=new FormData(form);
    let order={
      id:"ORD"+Date.now(),
      name:data.get("name"),
      email:data.get("email"),
      items:cart
    };

    localStorage.setItem("lastOrder",JSON.stringify(order));
    localStorage.removeItem("cart");

    document.getElementById("order-success").innerHTML =
      `✅ Order Placed! <br> ID: ${order.id}`;

    form.reset();
  });
}

updateCart();
displayProducts(products,"product-list");
displayProducts(products,"featured-products");
displayCart();
checkout();

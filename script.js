document.addEventListener("DOMContentLoaded",()=>{

const products = [
  {
    id:1,
    name:"Sony Headphones",
    price:3000,
    category:"premium",
    img:"https://m.media-amazon.com/images/I/61v1Y2F8VJL._SX522_.jpg"
  },
  {
    id:2,
    name:"Boat Headphones",
    price:1500,
    category:"budget",
    img:"https://m.media-amazon.com/images/I/61kWB+uzR2L._SX522_.jpg"
  },
  {
    id:3,
    name:"JBL Earbuds",
    price:2000,
    category:"budget",
    img:"https://m.media-amazon.com/images/I/61Q6R0N3QzL._SX522_.jpg"
  },
  {
    id:4,
    name:"Noise Cancelling Pro",
    price:5000,
    category:"premium",
    img:"https://m.media-amazon.com/images/I/71o8Q5XJS5L._SX522_.jpg"
  },
  {
    id:5,
    name:"Gaming Headset",
    price:2800,
    category:"premium",
    img:"https://m.media-amazon.com/images/I/71Y7tYV0s1L._SX522_.jpg"
  },
  {
    id:6,
    name:"Wireless Earphones",
    price:1200,
    category:"budget",
    img:"https://m.media-amazon.com/images/I/61CGHv6kmWL._SX522_.jpg"
  }
];

let cart=JSON.parse(localStorage.getItem("cart"))||[];

window.addToCart=id=>{
cart.push(products.find(p=>p.id===id));
localStorage.setItem("cart",JSON.stringify(cart));
updateCart();
}

window.filterProducts=type=>{
if(type==='all') display(products);
else display(products.filter(p=>p.cat===type));
}

function display(list){
let el=document.getElementById("product-list")||document.getElementById("featured-products");
if(!el) return;
el.innerHTML=list.map(p=>`
<div class="card">
<img src="${p.img}">
<h3>${p.name}</h3>
<p>₹${p.price}</p>
<button onclick="addToCart(${p.id})" class="btn">Add</button>
</div>`).join('');
}

function updateCart(){
let c=document.getElementById("cart-count");
if(c) c.innerText=cart.length;
}

function displayCart(){
let el=document.getElementById("cart-items"),t=0;
if(!el) return;
el.innerHTML=cart.map(i=>{t+=i.price;return `<p>${i.name} - ₹${i.price}</p>`}).join('');
document.getElementById("total").innerText=t;
}

function checkout(){
let f=document.getElementById("checkout-form");
if(!f) return;
f.addEventListener("submit",e=>{
e.preventDefault();
let id="ORD"+Date.now();
document.getElementById("order-success").innerHTML=`✅ Success! ID: ${id}`;
localStorage.removeItem("cart");
});
}

updateCart();
display(products);
displayCart();
checkout();

});

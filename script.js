document.addEventListener("DOMContentLoaded",()=>{

const products=[
{id:1,name:"Sony Headphones",price:3000,cat:"premium",img:"https://picsum.photos/200?1"},
{id:2,name:"Boat Headphones",price:1500,cat:"budget",img:"https://picsum.photos/200?2"},
{id:3,name:"JBL Earbuds",price:2000,cat:"budget",img:"https://picsum.photos/200?3"},
{id:4,name:"Noise Cancelling Pro",price:5000,cat:"premium",img:"https://picsum.photos/200?4"}
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

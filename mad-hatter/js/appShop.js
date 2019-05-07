// Declare variables
const cartBtn = document.querySelector(".cart-btn");
const closeCartBtn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const productsDOM = document.querySelector(".products-center");

// Cart array for local storage
let cart = [];
// Butttons array for manipulation with cart amount
let buttonsBag = [];

// Geting the products localy from json file
// (Requires Live Server for Google Chrome)
class Products {
  // New promise syntax
  async getProducts() {
    try {
      let response = await fetch('products.json');
      let data = await response.json();
      let products = data.items;
        return products;
      } catch (error) {
      console.log(error);
    }
  }
}

// Display products
class UI {
  // Dinamicaly show all products in browser
  displayProducts(products) {
    let result = "";
    products.forEach(product => {
      result+= `
      <article class="product">
        <div class="img-container">
          <img src=${product.image} alt="proizvod" class="product-img">
          <button class="bag-btn" data-id=${product.id}>
            <i class="fas fa-shopping-cart"></i>
            dodaj u korpu
          </button>
        </div>
        <h3>${product.title}</h3>
        <h4>${product.price} rsd</h4>
      </article>
      `;
    });
    productsDOM.innerHTML = result;
  }
  // Set id for each bag button and manipulate them
  getBagButtons() {
    const buttons = [...document.querySelectorAll(".bag-btn")];
    buttonsBag = buttons;
    buttons.forEach(button => { 
      let id = button.dataset.id;
      let inCart = cart.find(item => item.id === id);
      
      if (inCart) {
        button.innerText = "U Korpi";
        button.disabled = true;
      } 
          button.addEventListener('click', event => {
          event.target.innerText = "U Korpi";
          event.target.disabled = true;
          // Get product from products (in Storage)
          let cartItem = {...Storage.getProduct(id),amount:1}; 
          // Add product to the cart
          cart = [...cart,cartItem];
          // Save cart in local storage
          Storage.saveCart(cart);
          // Set cart values
          this.setCartValues(cart);
          // Display cart item (dinamicaly)
          this.addCartItem(cartItem);
          // Show the cart
          this.showCart();
      });
    });
  }
  // Display sum and item amount
  setCartValues(cart) {
    let sumTotal = 0; //cart total
    let itemsTotal = 0; //item amount
    cart.map(item => {
      sumTotal += item.price * item.amount;
      itemsTotal += item.amount;
    });
    cartTotal.innerText = parseFloat(sumTotal);
    cartItems.innerText = itemsTotal;
  }
  // Add item(s) to cart
  addCartItem(item) {
    const div = document.createElement('div');
    div.classList.add('cart-item');
    div.innerHTML = `
    <img src=${item.image} alt="proizvod">
    <div>
      <h4>${item.title}</h4>
      <h5>${item.price} rsd</h5>
      <span class="remove-item" data-id=${item.id}>obriši</span>
    </div>
    <div>
      <i class="fas fa-chevron-up" data-id=${item.id}></i>
      <p class="item-amount">${item.amount}</p>
      <i class="fas fa-chevron-down" data-id=${item.id}></i>
    </div>
    `;
    cartContent.appendChild(div);
  }
  // Show cart
  showCart() {
    cartOverlay.classList.add('transparentBcg');
    cartDOM.classList.add('showCart');
  }
  // Upon load get cart array (empty or not)
  setupCart() {
    cart = Storage.getCart(); 
    this.setCartValues(cart);
    this.fillCart(cart);
    cartBtn.addEventListener('click', this.showCart);
    closeCartBtn.addEventListener('click', this.hideCart);
  }
  // Write item(s) in cart
  fillCart(cart) {
    cart.forEach(item => this.addCartItem(item));
  }
  // Hide cart
  hideCart() {
    cartOverlay.classList.remove('transparentBcg');
    cartDOM.classList.remove('showCart');
  }
  // Manipulate card buttons
  manageCart() {
    // Event on clear-cart button
    clearCartBtn.addEventListener('click', () => {
      this.clearCart();
    });
    // Event on obriši(remove-item), up and down cart buttons
    // (event bubbling)
    cartContent.addEventListener("click", event => {
      if (event.target.classList.contains("remove-item")) {
        let removeItem = event.target;
        let id = removeItem.dataset.id;
        cartContent.removeChild(removeItem.parentElement.parentElement);
        this.removeItem(id);
      } else if (event.target.classList.contains("fa-chevron-up")) {
        let addAmount = event.target;
        let id = addAmount.dataset.id;
        let tempItem = cart.find(item => item.id === id);
        tempItem.amount = tempItem.amount + 1;
        Storage.saveCart(cart);
        this.setCartValues(cart);
        addAmount.nextElementSibling.innerText = tempItem.amount;
      } else if (event.target.classList.contains("fa-chevron-down")) {
        let lowerAmount = event.target;
        let id = lowerAmount.dataset.id;
        let tempItem = cart.find(item => item.id === id);
        tempItem.amount = tempItem.amount - 1;
        if (tempItem.amount > 0) {
          Storage.saveCart(cart);
          this.setCartValues(cart);
          lowerAmount.previousElementSibling.innerText = tempItem.amount;
        } else {
          cartContent.removeChild(lowerAmount.parentElement.parentElement);
          this.removeItem(id);
        }
      }
    });
  }
  // Remove all items from cart
  clearCart() {
    let cartItems = cart.map(item => item.id);
    cartItems.forEach(id => this.removeItem(id));
    console.log(cartContent.children);
    // Remove items from cart content div
    while (cartContent.children.length > 0) {
      cartContent.removeChild(cartContent.children[0]);
    }
    this.hideCart();
  }
  // Remove specific item from cart
  removeItem(id) {
    cart = cart.filter(item => item.id !==id); 
    this.setCartValues(cart); 
    Storage.saveCart(cart);
    let button = this.getSingleButton(id);
    button.disabled = false;
    button.innerHTML = `<i class="fas fa-shopping-cart"></i>dodaj u korpu`;
  }
  // Target specific button by its id
  getSingleButton(id) {
    return buttonsBag.find(button => button.dataset.id === id);
  }
}

// local Storage 
class Storage {
  // save products in local Storage
  static saveProducts(products) {
    localStorage.setItem("products",JSON.stringify(products)); 
  }
  // get products from local Storage
  static getProduct(id) {
    let products = JSON.parse(localStorage.getItem('products'));
    return products.find(product => product.id === id);
  }
  // save product in Cart in local Storage
  static saveCart(cart) {
    localStorage.setItem('cart',JSON.stringify(cart));
  }
  static getCart() {
    return localStorage.getItem('cart') ?  JSON.parse(localStorage.getItem('cart')) : [];
  }
}

//event listener
document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const products = new Products();
  // Setup Cart
  ui.setupCart();
  // Get all products
  products
    .getProducts()
    .then(products => {
      ui.displayProducts(products);
      Storage.saveProducts(products);
  })
  .then(() => {
    ui.getBagButtons();
    ui.manageCart(); 
  });
});
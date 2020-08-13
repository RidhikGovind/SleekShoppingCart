//tracking changes in the cart quantity
const quantityChange = document.getElementsByClassName("cart-quantity");
for (let i = 0; i < quantityChange.length; i++) {
    const quantity = quantityChange[i];
    quantity.addEventListener("change", quantityChanged);
}

//function to check whether the quantity input is 'NotANumber' or making sure at 1 is the default cart quantity
function quantityChanged(e) {
    const qtyInput = e.target.value;
    if (isNaN(qtyInput) || qtyInput <= 0) {
        qtyInput.value = 1;
    }
    updateNumber();
}

const nav = document.querySelector(".nav ");
const cartIcon = document.querySelector(".cart");
const slidingMenu = document.querySelector(".sliding-menu");
const closeBtn = document.querySelector(".close");

const cartPurchase = document.querySelector(".cart-purchase button");

//function to indicate successful purchase of cart items
function purchase() {
    const cartItemField = document.getElementsByClassName("cart-field")[0];

    if ((cartItemField.innerHTML = "")) {
        alert("Please add a product");
    } else {
        alert("You have successfully purchased your products. Thank you !");
        cartItemField.innerHTML = "";
    }

    updateNumber();
}

cartPurchase.addEventListener("click", purchase);

//Sliding menu-icon
cartIcon.addEventListener("click", () => {
    slidingMenu.style.transform = "translateX(0)";
    slidingMenu.style.overflow = "scroll";
    cartIcon.style.transform = "translateX(50px)";
});

//Sliding menu-close button
closeBtn.addEventListener("click", () => {
    slidingMenu.style.transform = "translateX(-100vw)";
    cartIcon.style.transform = "translateX(0px)";
    closeBtn.style.transform = "translateX(1200px)";
});

const addBtn = document.querySelectorAll(".add");

addBtn.forEach((btn) => btn.addEventListener("click", addToCart));

const cartField = document.getElementsByClassName("cart-field")[0];


//function to add the items to the cart
function addToCart(e) {
    const product = e.target.parentElement.parentElement;
    const title = product.querySelector(".product-details .name")
        .textContent;
    const price = product.querySelector(".product-details .price")
        .textContent;
    const src = product.querySelector(".product-image").src;
    const mainCart = document.createElement("div");

    const emptyCart = document.querySelector('.empty-cart')
    if (cartField.contains(emptyCart)) {
        emptyCart.remove();
    } else {
        console.log(title, price, src);

        mainCart.className = "main-cart";

        const cartContent = `
      <div class="cart-images">
          <img class="product-image" src="${src}" width="50px" height="50px">
      </div>
      <div class="cart-names">

          <a href='#' class="cart-item">${title}</a>
      </div>

      <div class="cart-quantities">
          <input class="cart-quantity" type="number" value="1" min="1" max="10" required>
      </div>

      <div class="cart-amounts">
          <a href="#" class="cart-price">${price}</a>

      </div>

      <div class="cart-remove">
          <button class="remove-btn">X</button>
      </div>
    `;
        mainCart.innerHTML = cartContent;

        cartField.append(mainCart);
        alert(`${title} has been added to the cart.`);

        const removeBtn = slidingMenu.querySelectorAll(".remove-btn");
        removeBtn.forEach((remove) => remove.addEventListener("click", removeItem));

        updateNumber();

        mainCart.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantityChanged);
    }
}

// cart item remove function
function removeItem(e) {
    const toberemoved = e.target.parentElement.parentElement;
    toberemoved.remove();
    updateNumber();
}

//function to update the cart total according to the cart quantity
function updateNumber() {
    total = 0;
    let cartRowContainer = document.getElementsByClassName("sliding-menu")[0];
    let cartRow = cartRowContainer.getElementsByClassName("main-cart");
    console.log(cartRow);
    for (let i = 0; i < cartRow.length; i++) {
        let Row = cartRow[i];
        let priceElement = Row.getElementsByClassName("cart-price")[0];
        let quantityElement = Row.getElementsByClassName("cart-quantity")[0];
        let itemPrice = parseFloat(priceElement.innerText.replace("$", " "));

        let itemQuantity = quantityElement.value;
        console.log(itemPrice);
        console.log(itemQuantity);
        total += itemPrice * itemQuantity;
    }
    let finalTotal = Math.round(total);
    let TotalElement = (document.querySelector(".cart-total .cart-total-amt").innerText = "$" + finalTotal);
    console.log(TotalElement);
}
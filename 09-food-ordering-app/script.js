import { menuArray } from "./data.js";

// render menu

const menuDiv = menuArray
  .map((item) => {
    return `
    <div class="menu-item">
        <div class="emoji">${item.emoji}</div>
        <div class="item-details">
            <h3 class="item-name">${item.name}</h3>
            <p class="item-ingredients">${item.ingredients.join(", ")}</p>
            <p class="item-price">$${item.price}</p>
        </div>
        <button class="add-btn" data-item-id="${item.id}">+</button>
    </div>
    `;
  })
  .join("");

document.getElementById("menu-section").innerHTML = menuDiv;

// render ordered items

let order = [];

function renderOrder() {
  const orderContent = document.getElementById("order-section");
  if (order.length === 0) {
    orderContent.innerHTML = `<h3 class="empty">Your order is empty</h3>`;
    return;
  }

  const orderedItems = order
    .map((item) => {
      return `
      <div class="order-item" data-item-id="${item.id}">
        <div class="order-name">${item.name} <span class="quantity"> x ${
        item.quantity
      }</span><span class="remove-btn" data-item-id="${
        item.id
      }">remove</span></div>
        <div class="order-price">$${item.price * item.quantity}</div>
      </div>
      `;
    })
    .join("");

  const total = order.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  orderContent.innerHTML = `
    <h3>Your order</h3>
    ${orderedItems}
    <div class="order-total">Total price: <span class="cost-total"> $${total}</span></div>

    <button class="purchase-btn">Complete order</button>
  `;
}

// event listener for add/remove/pay buttons

document.addEventListener("click", function (e) {
  if (e.target && e.target.classList.contains("add-btn")) {
    const itemId = e.target.getAttribute("data-item-id");
    const id = Number(itemId);
    const menuItem = menuArray.find((m) => m.id === id);
    if (!menuItem) return;
    const existing = order.find((o) => o.id === id);
    if (existing) {
      existing.quantity += 1;
    } else {
      order.push({ ...menuItem, quantity: 1 });
    }
    renderOrder();
  }

  if (e.target && e.target.classList.contains("remove-btn")) {
    const itemId = e.target.getAttribute("data-item-id");
    const id = Number(itemId);
    const existing = order.find((o) => o.id === id);
    if (existing) {
      existing.quantity -= 1;
      if (existing.quantity < 1) {
        order = order.filter((o) => o.id !== id);
      }
    }
    renderOrder();
  }

  if (e.target && e.target.classList.contains("purchase-btn")) {
    const modal = document.getElementById("modal");
    modal.style.display = "inline";
  }
});

renderOrder();

// event listener for payment form

const paymentForm = document.getElementById("payment-form");

paymentForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const name = formData.get("name");
  const modal = document.getElementById("modal");
  modal.style.display = "none";
  const orderSection = document.getElementById("order-section");
  orderSection.innerHTML = `<p class="thank-you">Thanks, ${name}! Your order is on its way!</p>`;
  order = [];
  paymentForm.reset();
});

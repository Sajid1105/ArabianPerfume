const cartItemsEl = document.getElementById('cart-items');
const totalEl = document.getElementById('cart-total');

function renderCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartItemsEl.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    const subtotal = item.price * item.qty;
    total += subtotal;

    cartItemsEl.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>${item.size || '-'}</td>
        <td>₹${item.price.toLocaleString()}</td>
        <td>${item.qty}</td>
        <td>₹${subtotal.toLocaleString()}</td>
        <td><button onclick="removeItem(${index})" class="btn">X</button></td>
      </tr>
    `;
  });

  totalEl.textContent = total.toLocaleString();
}

function removeItem(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function checkoutViaWhatsApp() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  let message = "*New Order from Arabian Perfumes*";

  cart.forEach(item => {
    message += ` ${item.name} (${item.size}) x${item.qty} - ₹${item.price * item.qty}`;
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  message += `*Total:* ₹${total}`;
  message += ` Please confirm your name and delivery details.`;

  const encodedMessage = encodeURIComponent(message);
  const phoneNumber = "917738110692";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  window.open(whatsappUrl, "_blank");
}

// Initialize cart
renderCart();

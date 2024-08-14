document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.querySelector('.cart-items');
    const subtotalElement = document.querySelector('.total-amount p');
    const summaryContainer = document.querySelector('.summary');
    const emptyCartMessage = document.querySelector('.empty-cart-message');
    const checkoutWord = document.querySelector('.checkout-word');

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.style.display = 'none';
        summaryContainer.style.display = 'none';
        if (emptyCartMessage) {
            emptyCartMessage.style.display = 'flex';
            checkoutWord.style.display = 'none';
        }
    } else {
        cart.forEach(item => {
            const itemHTML = `
                <div class="each-item">
                    <img class="item-img" src="${item.image}" alt="">
                    <div class="book-details">
                        <div class="title-price">
                            <h4>${item.title}</h4>
                            <p>$${item.price}</p>
                        </div>
                        <p class="item-author">${item.author}</p>
                        <div class="quantity-delete">
                            <p class="item-quantity">Quantity: ${item.quantity}</p>
                            <img class="delete-icon" src="../../public/assets/delete.svg" alt="" data-id="${item.id}">
                        </div>
                    </div>
                </div>
            `;
            cartItemsContainer.innerHTML += itemHTML;
            total += item.price * item.quantity;
        });

        subtotalElement.textContent = total.toFixed(2);
        summaryContainer.style.display = 'block';
    }

    cartItemsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-icon')) {
            const bookId = parseInt(event.target.getAttribute('data-id'));
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart = cart.filter(item => item.id !== bookId);
            localStorage.setItem('cart', JSON.stringify(cart));
            window.location.reload();
        }
    });

    document.querySelector('.clear-btn').addEventListener('click', () => {
        localStorage.removeItem('cart');
        window.location.reload();
    });

    document.querySelector('.checkout-btn').addEventListener('click', () => {
        localStorage.removeItem('cart');
        window.location.href = '../thankyou/thankyou.html';
    });
});
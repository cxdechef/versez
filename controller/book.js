document.addEventListener("DOMContentLoaded", () => {
    const queryParams = new URLSearchParams(window.location.search);
    const bookId = queryParams.get('id');
    
    if (!bookId) {
        console.error('No book ID found in the URL');
        return;
    }

    const booksData = JSON.parse(localStorage.getItem('booksData'));
    if (booksData) {
        const book = booksData.books.find(b => b.id == bookId);
        if (book) {
            document.querySelector('#book').innerHTML = `
                <div class="blur-main-img-container">
                    <div class="blur-card">
                        <img class="blur-img" src="${book.image}" alt="">
                        <div class="title-author-container">
                            <h3 class="book-title">${book.title}</h3>
                            <p class="author-title">by ${book.author}</p>
                        </div>
                    </div>
                    <p class="category-name">${book.category}</p>
                    <img class="main-img" src="${book.image}" alt="">
                </div>
                <div class="book-page-text-container">
                    <div class="plot-wishlist">
                        <h4>Story Plot</h4>
                        <div class="wishlist">
                            <img class="wishlist-icon" src="../../public/assets/saved.svg" alt="">
                            <p>Save To Wishlist</p>
                        </div>
                    </div>
                    <div class="description">
                        <p>${book.description}</p>
                    </div>
                    <div class="price-publisher-length">
                          <div class="price">
                            <p>Price</p>
                            <p>$${book.price}</p>
                        </div>
                        <div class="publisher">
                            <p>Publisher</p>
                            <p>${book.publisher}</p>
                        </div>
                        <div class="length">
                            <p>Length</p>
                            <p>${book.pages}</p>
                        </div>
                       
                    </div>
                    <div class="button-message">
                    <button class="buy-btn">Buy Now</button>
                    <p class="cart-message"></p>
                    </div>
                </div>
            `;

            document.querySelector('.buy-btn').addEventListener('click', () => {
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                const existingBookIndex = cart.findIndex(item => item.id === book.id);

                if (existingBookIndex > -1) {
                    cart[existingBookIndex].quantity += 1;
                } else {
                    cart.push({ ...book, quantity: 1 });
                }

                localStorage.setItem('cart', JSON.stringify(cart));
                
                const message = document.querySelector('.cart-message');
                message.innerHTML = 'Book Added To Cart <img class="check-mark" src="../../public/assets/check.svg" alt="">';                
                setTimeout(() => {
                    message.textContent = '';
                }, 4000);
                setTimeout(() => {
                    window.location.href = '../../view/checkout/checkout.html'; 
                }, 5000);
            });
        } else {
            console.error('Book not found');
        }
    } else {
        console.error('No books data found');
    }
});

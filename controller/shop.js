document.addEventListener("DOMContentLoaded", () => {
    const bookContainer = document.querySelector('.all-shop-books');

    function displayBooks(books) {
        bookContainer.innerHTML = '';

        books.forEach(book => {
            const bookHTML = `
                <div class="book" data-id="${book.id}">
                    <img class="shop-book-img" src="${book.image}" alt="">
                    <p class="view-book-details">Book Details</p>
                    <div class="stars">
                        ${'<img class="full-star" src="../../public/assets/full-star.svg" alt="">'.repeat(book.rate)}
                        ${'<img class="empty-star" src="../../public/assets/empty-star.svg" alt="">'.repeat(5 - book.rate)}
                    </div>
                    <div class="shop-book-info">
                        <p class="shop-book-author">${book.author}</p>
                        <h3>${book.title}</h3>
                        <p class="${book.stock === 0 ? 'shop-book-outstock' : 'shop-book-instock'}">${book.stock === 0 ? 'Out Of Stock' : 'In Stock'}</p>
                        <p class="book-price">$${book.price}</p>
                    </div>
                </div>
            `;

            bookContainer.innerHTML += bookHTML;
        });

        bookContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('view-book-details')) {
                const bookElement = event.target.closest('.book');
                const bookId = bookElement.getAttribute('data-id');
                window.location.href = `../books/book.html?id=${bookId}`;
            }
        });
    }

    const booksData = localStorage.getItem('booksData');

    if (booksData) {
        const parsedBooks = JSON.parse(booksData);
        displayBooks(parsedBooks.books);
    } else {
        fetch('../../model/book.json')
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('booksData', JSON.stringify(data));
                displayBooks(data.books);
            })
            .catch(error => console.error('Error fetching book data:', error));
    }
});
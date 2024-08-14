document.addEventListener('DOMContentLoaded', () => {
    const resultsContainer = document.getElementById('results-container');
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');

    const booksData = JSON.parse(localStorage.getItem('booksData')) || { books: [] };

    function displayBooks(books) {
        resultsContainer.innerHTML = '';
        if (books.length === 0) {
            resultsContainer.innerHTML = '<p>No results found.</p>';
            return;
        }

        books.forEach(book => {
            const bookHTML = `
                <div class="book" data-id="${book.id}">
                    <img class="book-img" src="${book.image}" alt="${book.title}">
                    <button class="view-details-btn">View Details</button>
                    <div class="book-info">
                    
                    
                       <div class="stars">
                        ${'<img class="full-star" src="../../public/assets/full-star.svg" alt="">'.repeat(book.rate)}
                        ${'<img class="empty-star" src="../../public/assets/empty-star.svg" alt="">'.repeat(5 - book.rate)}
                    </div>
                    <div class="result-book-text">
                    <p class="result-book-author">${book.author}</p>
                        <h3 >${book.title}</h3>
                        <p class="${book.stock === 0 ? 'result-book-outstock' : 'result-book-instock'}">${book.stock === 0 ? 'Out Of Stock' : 'In Stock'}</p>

                        <p class="book-price">$${book.price}</p>
                        </div>
                    </div>

                </div>
            `;
            resultsContainer.innerHTML += bookHTML;
        });

        resultsContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('view-details-btn')) {
                const bookElement = event.target.closest('.book');
                const bookId = bookElement.getAttribute('data-id');
                window.location.href = `../books/book.html?id=${bookId}`;
            }
        });
    }

    function handleSearch(query) {
        if (!query) {
            resultsContainer.innerHTML = '<p>Please enter a search term.</p>';
            return;
        }

        const isIdSearch = !isNaN(query);
        const books = booksData.books;

        if (isIdSearch) {
            const book = books.find(book => book.id === parseInt(query, 10));
            if (book) {
                window.location.href = `../books/book.html?id=${book.id}`;
            } else {
                resultsContainer.innerHTML = '<p>No book found with the given ID.</p>';
            }
        } else {
            const matchingBooks = books.filter(book => book.title.toLowerCase().includes(query.toLowerCase()));
            displayBooks(matchingBooks);
        }
    }

    handleSearch(query);
});

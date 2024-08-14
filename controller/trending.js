document.addEventListener("DOMContentLoaded", () => {
    const cardsContainer = document.querySelector('#cards');

    fetch('../../model/trending.json')
        .then(response => response.json())
        .then(data => {
            displayTrendingBooks(data.trending);
        })
        .catch(error => console.error('Error fetching trending books data:', error));

    function displayTrendingBooks(books) {
        cardsContainer.innerHTML = '';

        books.forEach((book, index) => {
            const cardHTML = `
                <div id="card-${index + 1}" class="full-book-card">
                    <div class="blur-card">
                        <img class="blur-img" src="${book.image}" alt="${book.title}">
                    </div>
                    <div class="trending-book-card">
                        <img class="main-book-img" src="${book.image}" alt="${book.title}">
                        <div class="book-text">
                            <h3 class="black-book-text">${book.title.replace(/<br>/g, '<br>')}</h3>
                            <p class="black-book-text">${book.pages} · ${book.chapters}</p>
                        </div>
                    </div>
                </div>
            `;

            cardsContainer.innerHTML += cardHTML;
        });
    }
});

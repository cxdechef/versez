document.addEventListener('DOMContentLoaded', function() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!loggedInUser || loggedInUser.role !== 'admin') {
        window.location.href = '../../view/home/index.html';
    }

    const form = document.getElementById('adminForm');
    const messageElement = document.getElementById('message');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const id = parseInt(document.getElementById('id').value, 10);
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const imageFile = document.getElementById('image').files[0];
        const category = document.getElementById('category').value;
        const description = document.getElementById('description').value;
        const publisher = document.getElementById('publisher').value;
        const pages = parseInt(document.getElementById('pages').value, 10);
        const price = parseFloat(document.getElementById('price').value);
        const rate = parseInt(document.getElementById('rate').value, 10);
        const stock = parseInt(document.getElementById('stock').value, 10);

        if (!imageFile) {
            messageElement.textContent = 'Please upload an image.';
            return;
        }

        const booksData = JSON.parse(localStorage.getItem('booksData')) || { books: [] };
        const existingBook = booksData.books.find(book => book.id === id);

        if (existingBook) {
            messageElement.textContent = 'A book with this ID already exists.';
            return;
        }

        const imageName = `b${Date.now()}${imageFile.name.slice(-4)}`;

        const reader = new FileReader();
        reader.onload = function(event) {
            const imageDataUrl = event.target.result;

            const newBook = {
                id,
                title,
                author,
                image: imageDataUrl,
                category,
                description,
                publisher,
                pages,
                price,
                rate,
                stock
            };

            booksData.books.push(newBook);
            localStorage.setItem('booksData', JSON.stringify(booksData));

            messageElement.innerHTML = 'Book Added Successfully! <img class="check-mark" src="../../public/assets/check.svg" alt="">';

            form.reset(); 

            setTimeout(() => {
                window.location.href = '../../view/shop/shop.html'; 
            }, 3000);
        };

        reader.readAsDataURL(imageFile); 
    });
});

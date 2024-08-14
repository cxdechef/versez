document.addEventListener("DOMContentLoaded", () => {
    const releasedBookContainer = document.querySelector('#all-released-books');
    const commentsContainer = document.querySelector('.three-comments');
    const displayAside = document.querySelector("#aside")
    const logoutButton = document.getElementById('logoutButton');






       const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

       if (loggedInUser) {
           displayAside.style.display = 'flex';
   
           const welcomeUserElement = document.getElementById('welcome-user');
           const adminBadge = document.getElementById('admin-badge');
           const adminDashboard = document.querySelector('.dashboard');
           
           if (welcomeUserElement) {
               welcomeUserElement.innerHTML = `Welcome Back,${loggedInUser.username}`;
           }
   
           if (loggedInUser.role === 'admin') {
               adminBadge.style.display = 'inline';
               adminDashboard.style.display = 'flex';
           } else {
               adminBadge.style.display = 'none';
               adminDashboard.style.display = 'none';
           }
       } else {
           displayAside.style.display = 'none';
       }


    logoutButton.addEventListener('click', function() {
        localStorage.clear();
        window.location.href = '../../view/home/index.html'; 

    });



    function displayReleasedBooks(books) {
        releasedBookContainer.innerHTML = '';

        books.forEach((book, index) => {
            const firstBookImgSrc = index === 0 ? '../../public/imgs/b2.jpg' : book.image;
            const firstBookTitle = index === 0 ? "The Sorcerer's Stone" : book.title;

            const bookHTML = `
                <div class="released-book">
                    <img class="released-img" src="${firstBookImgSrc}" alt="${book.title}">
                    <h3>${firstBookTitle}</h3>
                    <p>${book.author}</p>
                    <p class="released-category">${book.category}</p>
                </div>
            `;

            releasedBookContainer.innerHTML += bookHTML;
        });
    }

    function displayComments(comments) {
        commentsContainer.innerHTML = '';

        comments.forEach(comment => {
            const fullStars = '<img class="full-star" src="../../public/assets/full-star.svg" alt="star">'.repeat(comment.rate);
            const emptyStars = '<img class="empty-star" src="../../public/assets/empty-star.svg" alt="star">'.repeat(5 - comment.rate);

            const commentHTML = `
                <div class="comment">
                    <div class="star-quote">
                        <div class="stars">
                            ${fullStars}
                            ${emptyStars}
                        </div>
                        <img class="quote" src="../../public/assets/quote.svg" alt="quote">
                    </div>
                    <p class="comment-title">${comment.feedback}</p>
                    <p class="comment-text">${comment.comment}</p>
                    <div class="photo-user">
                        <img class="comment-photo" src="../../public/assets/user.svg" alt="user">
                        <p>${comment.user}</p>
                    </div>
                </div>
            `;

            commentsContainer.innerHTML += commentHTML;
        });
    }

    const booksData = localStorage.getItem('booksData');

    if (booksData) {
        const parsedBooks = JSON.parse(booksData);
        displayReleasedBooks(parsedBooks.books);
    } else {
        fetch('../../model/book.json')
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('booksData', JSON.stringify(data));
                displayReleasedBooks(data.books);
            })
            .catch(error => console.error('Error fetching book data:', error));
    }

    const commentsData = localStorage.getItem('commentsData');

    if (commentsData) {
        const parsedComments = JSON.parse(commentsData);
        displayComments(parsedComments.feedbacks);
    } else {
        fetch('../../model/feedback.json')
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('commentsData', JSON.stringify(data));
                displayComments(data.feedbacks);
            })
            .catch(error => console.error('Error fetching comments data:', error));
    }
});

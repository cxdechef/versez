document.addEventListener("DOMContentLoaded", () => {

const cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartNotifications = document.querySelector('.notifications');
const searchInput = document.querySelector('.search-input');
const searchIcon = document.querySelector('.search-icon');



cart.length === 0 ? cartNotifications.style.display = 'none' : 'block';


    const userIcon = document.querySelector('.user-icon');
    const dropdownMenu = document.querySelector('#dropdownMenu');
    const registerBtn = document.querySelector('#registerBtn');
    const loginBtn = document.querySelector('#loginBtn');



    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (loggedInUser) {
        userIcon.style.display = 'none';
    }





    userIcon.addEventListener('click', () => {
        const isMenuVisible = dropdownMenu.style.display === 'block';
        dropdownMenu.style.display = isMenuVisible ? 'none' : 'block';
    });

    document.addEventListener('click', (event) => {
        if (!userIcon.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.style.display = 'none';
        }
    });
    registerBtn.addEventListener('click', () => {
        window.location.href = '../../view/user/register.html';
    });

    loginBtn.addEventListener('click', () => {
        window.location.href = '../../view/user/login.html'; 
    });




    function handleSearch(query) {
        if (query) {
            window.location.href = `../../view/search/search.html?query=${encodeURIComponent(query)}`;
        } else {
            alert('Please enter a search term.');
        }
    }

    if (searchIcon) {
        searchIcon.addEventListener('click', () => {
            const query = searchInput.value.trim();
            handleSearch(query);
        });
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                const query = searchInput.value.trim();
                handleSearch(query);
            }
        });
    }




});





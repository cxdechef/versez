document.addEventListener("DOMContentLoaded", () => {


    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (loggedInUser) {
        window.location.href = '../../view/home/index.html';
    }

    const loginForm = document.getElementById('loginForm');
    const messageElement = document.getElementById('message');
    let usersData;

    function fetchUsersData() {
        if (!localStorage.getItem('usersData')) {
            fetch('../../model/user.json')
                .then(response => response.json())
                .then(data => {
                    localStorage.setItem('usersData', JSON.stringify(data));
                    usersData = data;
                })
                .catch(error => console.error('Error fetching user data:', error));
        } else {
            usersData = JSON.parse(localStorage.getItem('usersData'));
        }
    }

    fetchUsersData();

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); 

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (!usersData) {
            messageElement.textContent = 'User data is not available. Please try again later.';
            return;
        }

        const user = usersData.users.find(user => user.username === username && user.password === password);

        if (user) {
            localStorage.setItem('loggedInUser', JSON.stringify(user));

            messageElement.innerHTML = 'Login Successful! <img class="check-mark" src="../../public/assets/check.svg" alt="">';
            setTimeout(() => {
                window.location.href = '../../view/home/index.html'; 
            }, 2000);
        } else {
            messageElement.textContent = 'Invalid username or password.';
        }
    });
});

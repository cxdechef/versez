document.addEventListener("DOMContentLoaded", () => {

    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (loggedInUser) {
        window.location.href = '../../view/home/index.html';
    }



    const registerForm = document.getElementById('registerForm');
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

    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const role = document.querySelector('input[name="role"]:checked').value;

        if (!usersData) {
            messageElement.textContent = 'User data is not available.';
            return;
        }

        const userExists = usersData.users.some(user => user.username === username);

        if (userExists) {
            messageElement.textContent = 'Username already exists.';
            return;
        }

        usersData.users.push({ username, password, role });

        localStorage.setItem('usersData', JSON.stringify(usersData));

        messageElement.innerHTML = 'Account Has Been Created Successfully! <img class="check-mark" src="../../public/assets/check.svg" alt="">';
        setTimeout(() => {
            window.location.href = '../../view/user/login.html'; 
        }, 1000);
        registerForm.reset();
    });
});

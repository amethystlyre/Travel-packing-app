//Handles new user signing up form submission
const createListHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#signup-username').value.trim();
    const email = document.querySelector('#signup-email').value.trim();
    const password = document.querySelector('#signup-password').value.trim();
    console.log(name, email, password);

    if (name && email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to create new profile');
        }
    }
};

document
    .querySelector('.signup-form')
    .addEventListener('submit', createListHandler);

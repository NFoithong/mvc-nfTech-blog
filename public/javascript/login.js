async function loginFormHandler(event) {
    event.preventDefault();

    const password = document.querySelector('#password-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();

    if (password & email) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                password,
                email
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        // check response status
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler)
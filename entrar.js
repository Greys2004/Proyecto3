document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('.login-form');
    const signupForm = document.querySelector('.signup-form');
    const registerLink = document.querySelector('.span-register');

    registerLink.addEventListener('click', function(event) {
        event.preventDefault();
        
        // Oculta el formulario de inicio de sesión y muestra el formulario de registro
        loginForm.classList.add('rotate-out');
        signupForm.classList.remove('hidden');
        signupForm.classList.add('rotate-in');
    });
});
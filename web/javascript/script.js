document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;
    const errorBox = document.getElementById('error-box');

    
    if (email === "admin@easyauto.it" && password === "1234") {
        window.location.href = "confronto.html";
    } else {
       
        errorBox.style.display = "flex";
        
        
        const card = document.querySelector('.login-card');
        card.style.animation = "shake 0.4s";
        setTimeout(() => card.style.animation = "", 400);
    }
});
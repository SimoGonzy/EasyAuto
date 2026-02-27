document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;
    const errorBox = document.getElementById('error-box');

    // Credenziali di test
    if (email === "admin@easyauto.it" && password === "1234") {
        window.location.href = "confronto.html";
    } else {
        // Mostra il box d'errore
        errorBox.style.display = "flex";
        
        // Opzionale: scuote la card per attirare l'attenzione
        const card = document.querySelector('.login-card');
        card.style.animation = "shake 0.4s";
        setTimeout(() => card.style.animation = "", 400);
    }
});
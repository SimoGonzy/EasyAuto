document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
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
    }

    if (document.getElementById('car1-select')) {
        loadCars();
    }
});

let carsData = [];

async function loadCars() {
    try {
        const response = await fetch('cars.json');
        carsData = await response.json();
        
        const select1 = document.getElementById('car1-select');
        const select2 = document.getElementById('car2-select');
        
        // Mantieni solo l"opzione di default
        select1.innerHTML = '<option value="">Seleziona Modello</option>';
        select2.innerHTML = '<option value="">Seleziona Modello</option>';
        
        carsData.forEach(car => {
            const option1 = document.createElement('option');
            option1.value = car.id;
            option1.textContent = car.name;
            select1.appendChild(option1);
            
            const option2 = document.createElement('option');
            option2.value = car.id;
            option2.textContent = car.name;
            select2.appendChild(option2);
        });
    } catch (error) {
        console.error("Errore nel caricamento delle auto:", error);
    }
}

// Funzione globale che viene chiamata da onchange nell'HTML
window.updateCar = function(carNumber) {
    const select = document.getElementById(`car${carNumber}-select`);
    const carId = select.value;
    
    if (!carId) {
        // Reset
        document.getElementById(`car${carNumber}-name`).textContent = `Seleziona Auto ${carNumber === 1 ? 'A' : 'B'}`;
        document.getElementById(`car${carNumber}-img`).src = `https://via.placeholder.com/400x250?text=Auto+${carNumber}`;
        document.getElementById(`car${carNumber}-price`).textContent = '-';
        document.getElementById(`car${carNumber}-fuel`).textContent = '-';
        document.getElementById(`car${carNumber}-maint`).textContent = '-';
        return;
    }
    
    const car = carsData.find(c => c.id === carId);
    if (car) {
        document.getElementById(`car${carNumber}-name`).textContent = car.name;
        document.getElementById(`car${carNumber}-img`).src = car.image;
        document.getElementById(`car${carNumber}-price`).textContent = car.price;
        document.getElementById(`car${carNumber}-fuel`).textContent = car.fuel_consumption;
        document.getElementById(`car${carNumber}-maint`).textContent = car.maintenance;
    }
};
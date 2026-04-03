function setupSearch(searchBarId, resultsBoxId, carNumber) {
    const searchBar = document.getElementById(searchBarId);
    const resultsBox = document.getElementById(resultsBoxId);

    if (!searchBar || !resultsBox) return;

    function fetchResults(query) {
        fetch(`php/search.php?q=${encodeURIComponent(query)}`)
            .then(response => {
                if (!response.ok) throw new Error("File PHP non trovato");
                return response.json();
            })
            .then(data => {
                renderResults(data, searchBar, resultsBox, carNumber);
            })
            .catch(err => {
                console.error("Errore HTTP/Fetch:", err);
                resultsBox.style.display = 'block';
                resultsBox.innerHTML = '';
                let errDiv = document.createElement('div');
                errDiv.className = 'result-item';
                errDiv.style.color = 'red';
                errDiv.style.fontWeight = 'bold';
                errDiv.innerHTML = "Errore di connessione o del server.<br>Assicurati di usare un server web (es. XAMPP) e non aprire il file con doppio clic.";
                resultsBox.appendChild(errDiv);
            });
    }

    searchBar.addEventListener('input', function() {
        let query = this.value.trim();
        fetchResults(query);
    });

    searchBar.addEventListener('focus', function() {
        let query = this.value.trim();
        fetchResults(query);
    });

    document.addEventListener('click', function(e) {
        if (!searchBar.contains(e.target) && !resultsBox.contains(e.target)) {
            resultsBox.style.display = 'none';
        }
    });
}

function renderResults(data, searchBar, resultsBox, carNumber) {
    resultsBox.innerHTML = '';
    
    if (data && data.error) {
        console.error("Errore dal server:", data.error);
        resultsBox.style.display = 'block';
        let errDiv = document.createElement('div');
        errDiv.className = 'result-item';
        errDiv.style.color = 'red';
        errDiv.textContent = "Errore DB: " + data.error;
        resultsBox.appendChild(errDiv);
        return;
    }

    if (data && data.length > 0) {
        resultsBox.style.display = 'block';
        data.forEach(item => {
            let div = document.createElement('div');
            div.className = 'result-item';
            div.textContent = item.modello || item.name || 'Sconosciuto'; 
            
            div.onclick = () => {
                searchBar.value = item.modello || item.name || '';
                resultsBox.style.display = 'none';
                updateCarCard(carNumber, item);
            };
            resultsBox.appendChild(div);
        });
    } else {
        resultsBox.style.display = 'block';
        let div = document.createElement('div');
        div.className = 'result-item';
        div.textContent = 'Nessun risultato trovato';
        resultsBox.appendChild(div);
    }
}

function updateCarCard(carNumber, carData) {
    let name = carData.modello || carData.name || 'Modello sconosciuto';
    let image = carData.immagine || carData.image || `https://via.placeholder.com/400x250?text=${encodeURIComponent(name)}`;
    let price = carData.prezzo_listino || carData.prezzo || carData.price || "Dato non disponibile";
    let fuel = carData.consumo || carData.fuel_consumption || "Dato non disponibile";
    let maint = carData.manutenzione || carData.maintenance || "Dato non disponibile";

    let nameElement = document.getElementById(`car${carNumber}-name`);
    let imgElement = document.getElementById(`car${carNumber}-img`);
    let priceElement = document.getElementById(`car${carNumber}-price`);
    let fuelElement = document.getElementById(`car${carNumber}-fuel`);
    let maintElement = document.getElementById(`car${carNumber}-maint`);

    if(nameElement) nameElement.textContent = name;
    if(imgElement) imgElement.src = image;
    if(priceElement) priceElement.textContent = price;
    if(fuelElement) fuelElement.textContent = fuel;
    if(maintElement) maintElement.textContent = maint;
}

// Inizializza immediatamente se i DOM elements esistono, altrimenti attendi
function initSearch() {
    setupSearch('searchBar1', 'results1', 1);
    setupSearch('searchBar2', 'results2', 2);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSearch);
} else {
    initSearch();
}
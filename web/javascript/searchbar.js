const searchBar1 = document.getElementById('searchBar1');
const searchBar2 = document.getElementById('searchBar2');

// Passiamo direttamente l'elemento (this) invece dell'ID per comodità
searchBar1.addEventListener('input', function() { prova(this) });
searchBar2.addEventListener('input', function() { prova(this) });
searchBar1.addEventListener('focus', function() { prova(this) });
searchBar2.addEventListener('focus', function() { prova(this) });
searchBar1.addEventListener('click', function() { prova(this) });
searchBar2.addEventListener('click', function() { prova(this) });

// Nascondiamo i risultati se l'utente clicca fuori dalla search bar o dai risultati
document.addEventListener('click', function(event) {
    if (searchBar1 && searchBar1.nextElementSibling) {
        if (!searchBar1.contains(event.target) && !searchBar1.nextElementSibling.contains(event.target)) {
            searchBar1.nextElementSibling.style.display = 'none';
        }
    }
    if (searchBar2 && searchBar2.nextElementSibling) {
        if (!searchBar2.contains(event.target) && !searchBar2.nextElementSibling.contains(event.target)) {
            searchBar2.nextElementSibling.style.display = 'none';
        }
    }
});

function prova(searchb) {
    let resultsBox = searchb.nextElementSibling;
    let query = searchb.value;

    fetch(`php/search.php?q=${encodeURIComponent(query)}`)
        .then(response => {
            if (!response.ok) throw new Error("File PHP non trovato");
            return response.json();
        })
        .then(data => {
            // Controllo se il valore attuale combacia con un risultato (passaDati)
            data.forEach(item => {
                if (searchb.value === item.modello) {
                    passaDati(item, searchb);
                }
            });
            
            // Passiamo l'elemento searchb a renderResults per sapere quale input aggiornare
            renderResults(data, resultsBox, searchb);
        })
        .catch(err => console.error("Errore:", err));
}

function renderResults(data, resultsBox, targetInput) {
    resultsBox.innerHTML = '';
    
    if (data.length > 0 && !data.error) {
        resultsBox.style.display = 'block';
        data.forEach(item => {
            let div = document.createElement('div');
            div.className = 'result-item';
            div.textContent = item.modello; 
            
            div.onclick = () => {
                // Ora aggiorna l'input corretto (quello che ha scatenato la ricerca)
                targetInput.value = item.modello;
                passaDati(item, targetInput);
                resultsBox.style.display = 'none';
            };
            resultsBox.appendChild(div);
        });
    } else {
        resultsBox.style.display = 'none';
    }
}

function passaDati(item, targetInput) {
    let carNumber = targetInput.id === 'searchBar1' ? 1 : 2;
    
    let name = item.modello || 'Sconosciuto';
    // Se c'è l'immagine nel DB usala, altrimenti placeholder. Aggiungiamo un trucchetto (?t=...) per bucare la cache ostinata di Chrome!
    let imageRaw = item.immagine || item.image || `https://via.placeholder.com/400x250?text=${encodeURIComponent(name)}`;
    let image = imageRaw.includes('?') ? imageRaw : imageRaw + '?t=' + new Date().getTime();
    let price = item.prezzo_listino || item.prezzo || item.price || "N/A";
    let fuel = item.consumo || item.fuel_consumption || "N/A";
    let maint = item.manutenzione || item.maintenance || "N/A";

    let nameElement = document.getElementById(`car${carNumber}-name`);
    let imgElement = document.getElementById(`car${carNumber}-img`);
    let priceElement = document.getElementById(`car${carNumber}-price`);
    let fuelElement = document.getElementById(`car${carNumber}-fuel`);
    let maintElement = document.getElementById(`car${carNumber}-maint`);

    if(nameElement) nameElement.textContent = name;
    if(imgElement) imgElement.src = image; // L'immagine viene sostituita qui!
    if(priceElement) priceElement.textContent = price;
    if(fuelElement) fuelElement.textContent = fuel;
    if(maintElement) maintElement.textContent = maint;
}
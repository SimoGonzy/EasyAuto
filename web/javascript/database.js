const searchBar1 = document.getElementById('searchBar1');
const searchBar2 = document.getElementById('searchBar2');

// Passiamo direttamente l'elemento (this) invece dell'ID per comodità
searchBar1.addEventListener('input', function() { prova(this) });
searchBar2.addEventListener('input', function() { prova(this) });

function prova(searchb) {
    let resultsBox = searchb.nextElementSibling;
    let query = searchb.value;

    if (query.length > 0) {
        fetch(`php/search.php?q=${encodeURIComponent(query)}`)
            .then(response => {
                if (!response.ok) throw new Error("File PHP non trovato");
                return response.json();
            })
            .then(data => {
                // Controllo se il valore attuale combacia con un risultato (passaDati)
                data.forEach(item => {
                    if (searchb.value === item.modello) {
                        passaDati(item.modello);
                    }
                });
                
                // Passiamo l'elemento searchb a renderResults per sapere quale input aggiornare
                renderResults(data, resultsBox, searchb);
            })
            .catch(err => console.error("Errore:", err));
    } else {
        resultsBox.style.display = 'none';
    }
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
                passaDati(item.modello);
                resultsBox.style.display = 'none';
            };
            resultsBox.appendChild(div);
        });
    } else {
        resultsBox.style.display = 'none';
    }
}

function passaDati(modello) {
    console.log("Dato selezionato:", modello);
}
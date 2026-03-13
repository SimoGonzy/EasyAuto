const searchBar = document.getElementById('searchBar1');
const resultsBox = document.getElementById('results1');

searchBar.addEventListener('input', function() {
    let query = this.value.trim();

    if (query.length > 0) {
        // Percorso relativo corretto per la tua struttura
        fetch(`php/search.php?q=${encodeURIComponent(query)}`)
            .then(response => {
                if (!response.ok) throw new Error("File PHP non trovato");
                return response.json();
            })
            .then(data => {
                for(let i = 0; i < data.length; i++){
                    if(searchBar.value === data[i].modello){
                        prova(data[i].modello);
                    }
                }
                renderResults(data);
            })
            .catch(err => console.error("Errore:", err));
    } else {
        resultsBox.style.display = 'none';
    }
});

function renderResults(data) {
    resultsBox.innerHTML = '';
    
    if (data.length > 0 && !data.error) {
        resultsBox.style.display = 'block';
        data.forEach(item => {
            let div = document.createElement('div');
            div.className = 'result-item';
            
            // Usiamo solo item.modello come richiesto
            div.textContent = item.modello; 
            
            div.onclick = () => {
                searchBar.value = item.modello;
                prova(item.modello); // Passa solo il modello alla funzione prova
                resultsBox.style.display = 'none';
            };
            resultsBox.appendChild(div);
        });
    } else {
        resultsBox.style.display = 'none';
    }
}

function prova(a){
    console.log("Funzione prova chiamata con argomento:", a);
}
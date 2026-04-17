const APIKEY = "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";
const searchBar1 = document.getElementById('searchBar1');
const searchBar2 = document.getElementById('searchBar2');

// --- CONFIGURAZIONE PROMPT MODIFICABILE ---
const PROMPT_TEMPLATE = (modello, dati) => {
    return `Sei un esperto meccanico. Analizza questa ${modello} basandoti su questi dati: ${dati}. 
    Elenca in massimo 3 punti brevi e puntati: 
    1. Difetti comuni del modello. 
    2. Consigli di manutenzione preventiva.
    Sii molto sintetico e professionale. Non aggiungere introduzioni.`;
};

// Funzione per chiamare Groq e mostrare il testo
async function generaAnalisiIA(carData, id) {
    const textElement = document.getElementById("ai-text" + id);
    if (!textElement) return;

    textElement.innerHTML = "<em>L'IA sta analizzando il database...</em>";

    const promptCompleto = PROMPT_TEMPLATE(carData.modello, JSON.stringify(carData));

    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${APIKEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama-3.1-8b-instant", // Modello gratis e veloce su Groq
                messages: [
                    { role: "system", content: "Sei un assistente tecnico automobilistico." },
                    { role: "user", content: promptCompleto }
                ],
                temperature: 0.7
            })
        });

        const result = await response.json();
        const aiMessage = result.choices[0].message.content;

        // Effetto macchina da scrivere
        textElement.innerHTML = "";
        typeWriter(aiMessage, textElement);

    } catch (error) {
        // Sostituisci la parte del fetch con questa per vedere l'errore reale
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${APIKEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama-3.1-8b-instant",
                messages: [{ role: "user", content: "Test" }]
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Dettaglio Errore Groq:", errorData); // <--- LEGGI QUESTO NELLA CONSOLE
        }
    }
}

// Funzione di supporto per l'effetto scrittura
function typeWriter(text, element, i = 0) {
    if (i < text.length) {
        element.innerHTML += text.charAt(i);
        setTimeout(() => typeWriter(text, element, i + 1), 15);
    }
}

// Passiamo direttamente l'elemento (this) invece dell'ID per comodità
searchBar1.addEventListener('input', function() { barraRicerca(this) });
searchBar2.addEventListener('input', function() { barraRicerca(this) });

function barraRicerca(searchb) {

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
                        passaDati(item.modello,searchb.id[searchb.id.length-1]);    
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
                passaDati(item.modello,targetInput.id[targetInput.id.length-1]);
                resultsBox.style.display = 'none';
            };
            resultsBox.appendChild(div);
        });
    } else {
        resultsBox.style.display = 'none';
    }
}

function passaDati(modello,id) {
    let div_nome = document.getElementById("car" + id + "-name")
    let img = document.getElementById("car"+ id + "-img")
    let div_info = document.getElementById("car" + id + "-info")
    let div_pot = document.getElementById("car" + id + "-pot")
    let div_consumi = document.getElementById("car" + id + "-consumi")
    let div_euro = document.getElementById("car" + id + "-euro")
    let div_trasm = document.getElementById("car" + id + "-trasm")

    fetch(`php/getModelData.php?name=${encodeURIComponent(modello)}`)
    .then(response => {
        if (!response.ok) throw new Error("File PHP non trovato");
        return response.json();
    })
    .then(data => {
        // Se c'è un errore dal PHP o l'array è vuoto, fermati qui
        if (data.error || data.length === 0) {
            console.error("Dati non trovati o errore server:", data.error);
            return; 
        }

        const car = data[0];
        
        div_nome.innerHTML = "<p>" + (car.modello) + "</p>";
        
        // Gestione Immagine
        if (car.immagine && car.immagine !== "") {
            img.setAttribute("src", car.immagine);
        } else {
            img.setAttribute("src", "img/default-car.png");
        }

        div_info.innerHTML = "<p>" + car.Marca + " - " + car.anno_Di_Produzione + "</p>";
        div_pot.innerHTML = "<p>" + car.cilindrata_CC + "CC / " + car.cavalli + " CV</p>";
        div_consumi.innerHTML = "<p>" + (car.consumo || 'N/A') + " L/100km (" + (car.tipo || 'N/A') + ")</p>";
        div_euro.innerHTML = "<p>" + (car.standard_Ambientali || 'N/A') + "</p>";
        div_trasm.innerHTML = "<p>" + (car.cambio || 'N/A') + " / " + (car.trazione || 'N/A') + "</p>";

        generaAnalisiIA(car, id);
    })
    .catch(err => console.error("Errore:", err));
}
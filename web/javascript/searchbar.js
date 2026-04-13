/*
app.post('/chat', async (req, res) => {
    const { userQuery, carId } = req.body;

    // 1. Recupera i dati dal tuo DB esistente
    const carData = await myDatabase.getCarInfo(carId); 

    // 2. Prepara la chiamata all'IA
    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            { 
              role: "system", 
              content: `Sei un assistente tecnico. Dati auto: ${JSON.stringify(carData)}. Trova i principali difetti di costruzione e manutenzioni comuni da fare su quest'auto. Rispondi in modo conciso.` 
            },
            { role: "user", content: userQuery }
        ],
    });

    // 3. Invia solo la risposta dell'IA al browser
    res.json({ answer: response.choices[0].message.content });
});
*/

const searchBar1 = document.getElementById('searchBar1');
const searchBar2 = document.getElementById('searchBar2');

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

        generateAiSummary(car.id_Auto, car.modello);
    })
    .catch(err => console.error("Errore:", err));
}

async function generateAiSummary(id, name) {
    const displayBox = document.getElementById('ai-response-box1');
    displayBox.innerHTML = "<em>Analizzando i dati tecnici...</em>";

    try {
        const response = await fetch('/api/get-ai-report', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ carId: id, carName: name })
        });

        const data = await response.json();

        // 3. Mostra il risultato (magari con un piccolo effetto fade-in)
        displayBox.innerHTML = data.content; 
    } catch (error) {
        displayBox.innerHTML = "Manutenzione programmata non disponibile al momento.";
    }
}
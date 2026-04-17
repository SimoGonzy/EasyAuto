const APIKEY = "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";
const searchBar1 = document.getElementById("searchBar1");
const searchBar2 = document.getElementById("searchBar2");

//PROVIAMO A COMMENTARE BRUTTE TROIETTE

// --- CONFIGURAZIONE PROMPT MODIFICABILE ---
const PROMPT_TEMPLATE = (modello, dati) => {
  return `Agisci come un esperto meccanico professionista specializzato in affidabilità dei veicoli e manutenzione preventiva.

OBIETTIVO:
Analizzare il modello di auto fornito e generare una risposta sintetica, altamente strutturata e ottimizzata per essere renderizzata in una UI usando React Markdown.

INPUT:
- Modello auto: ${modello}
- Dati disponibili: ${dati}

REGOLE DI OUTPUT (OBBLIGATORIE):
- Usa SOLO Markdown standard (compatibile con react-markdown)
- NON usare HTML
- NON aggiungere introduzioni o testo fuori struttura
- Linguaggio tecnico, diretto e professionale
- Bullet points molto brevi (max 12–15 parole)
- Massimo 3 punti per sezione
- Output sempre identico nella struttura
- Non utilizzare simboli o emoji, solo testo
- Crea un elenco puntato con i dati ricavati dal search

---

STRUTTURA DELLA RISPOSTA (OBBLIGATORIA):

### Difetti comuni
- [GRAVE] 
- [MEDIO] 
- [LEGGERO] 

### Manutenzione preventiva
- 
- 
- 

---

REGOLE PER I TAG DIFETTI:
- Usa SEMPRE uno di questi tag:
  - [GRAVE] → problemi costosi o critici
  - [MEDIO] → problemi frequenti ma gestibili
  - [LEGGERO] → difetti minori o fastidi

- Ogni difetto deve:
  - essere specifico (no genericità)
  - iniziare con il tag
  - essere su una sola riga

---

REGOLE DI CONTENUTO:
- Se mancano dati, fai uno scan sul web per integrare informazioni affidabili (es. forum, recensioni, database guasti)
- Evita frasi vaghe tipo “problemi al motore”
- I consigli devono essere pratici e concreti
- Nessuna spiegazione, solo output strutturato
- Nessuna ripetizione tra difetti e manutenzione

---

ESEMPIO DI STILE (NON COPIARE):
- [GRAVE] Cedimento turbina su versioni diesel ad alto chilometraggio
- [MEDIO] Usura valvola EGR con utilizzo urbano frequente
- [LEGGERO] Scricchiolii interni su strade sconnesse`;
};

// Funzione per chiamare Groq e mostrare il testo
// Funzione di supporto per l'effetto scrittura che supporta il Markdown
function typeWriterMarkdown(text, element) {
    let i = 0;
    let currentText = "";
    
    // Puliamo l'elemento prima di iniziare
    element.innerHTML = "";

    function step() {
        if (i < text.length) {
            currentText += text.charAt(i);
            // Trasformiamo il Markdown accumulato finora in HTML
            element.innerHTML = marked.parse(currentText);
            i++;
            setTimeout(step, 10); // Velocità regolabile
        }
    }
    step();
}

async function generaAnalisiIA(carData, id) {
    const textElement = document.getElementById("ai-text" + id);
    if (!textElement) return;

    // Aggiungiamo una classe per lo styling
    textElement.classList.add("markdown-body");
    textElement.innerHTML = "<em>L'IA sta analizzando il database...</em>";

    const promptCompleto = PROMPT_TEMPLATE(carData.modello, JSON.stringify(carData));

    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${APIKEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "llama-3.1-8b-instant",
                messages: [
                    { role: "system", content: "Sei un assistente tecnico. Rispondi SEMPRE in Markdown." },
                    { role: "user", content: promptCompleto },
                ],
                temperature: 0.5, // Leggermente più basso per maggiore precisione strutturale
            }),
        });

        const result = await response.json();
        const aiMessage = result.choices[0].message.content;

        // Avviamo il render professionale
        typeWriterMarkdown(aiMessage, textElement);

    } catch (error) {
        console.error("Errore:", error);
        textElement.innerHTML = "Errore durante l'analisi.";
    }
}

// Passiamo direttamente l'elemento (this) invece dell'ID per comodità
searchBar1.addEventListener("input", function () {
  barraRicerca(this);
});
searchBar2.addEventListener("input", function () {
  barraRicerca(this);
});

function barraRicerca(searchb) {
  let resultsBox = searchb.nextElementSibling;
  let query = searchb.value;

  if (query.length > 0) {
    fetch(`php/search.php?q=${encodeURIComponent(query)}`)
      .then((response) => {
        if (!response.ok) throw new Error("File PHP non trovato");
        return response.json();
      })
      .then((data) => {
        // Controllo se il valore attuale combacia con un risultato (passaDati)
        data.forEach((item) => {
          if (searchb.value === item.modello) {
            passaDati(item.modello, searchb.id[searchb.id.length - 1]);
          }
        });

        // Passiamo l'elemento searchb a renderResults per sapere quale input aggiornare
        renderResults(data, resultsBox, searchb);
      })
      .catch((err) => console.error("Errore:", err));
  } else {
    resultsBox.style.display = "none";
  }
}

function renderResults(data, resultsBox, targetInput) {
  resultsBox.innerHTML = "";

  if (data.length > 0 && !data.error) {
    resultsBox.style.display = "block";
    data.forEach((item) => {
      let div = document.createElement("div");
      div.className = "result-item";
      div.textContent = item.modello;

      div.onclick = () => {
        // Ora aggiorna l'input corretto (quello che ha scatenato la ricerca)
        targetInput.value = item.modello;
        passaDati(item.modello, targetInput.id[targetInput.id.length - 1]);
        resultsBox.style.display = "none";
      };
      resultsBox.appendChild(div);
    });
  } else {
    resultsBox.style.display = "none";
  }
}

function passaDati(modello, id) {
  let div_nome = document.getElementById("car" + id + "-name");
  let img = document.getElementById("car" + id + "-img");
  let div_info = document.getElementById("car" + id + "-info");
  let div_pot = document.getElementById("car" + id + "-pot");
  let div_consumi = document.getElementById("car" + id + "-consumi");
  let div_euro = document.getElementById("car" + id + "-euro");
  let div_trasm = document.getElementById("car" + id + "-trasm");

  fetch(`php/getModelData.php?name=${encodeURIComponent(modello)}`)
    .then((response) => {
      if (!response.ok) throw new Error("File PHP non trovato");
      return response.json();
    })
    .then((data) => {
      // Se c'è un errore dal PHP o l'array è vuoto, fermati qui
      if (data.error || data.length === 0) {
        console.error("Dati non trovati o errore server:", data.error);
        return;
      }

      const car = data[0];

      div_nome.innerHTML = "<p>" + car.modello + "</p>";

      // Gestione Immagine
      if (car.immagine && car.immagine !== "") {
        img.setAttribute("src", car.immagine);
      } else {
        img.setAttribute("src", "img/default-car.png");
      }

      div_info.innerHTML =
        "<p>" + car.Marca + " - " + car.anno_Di_Produzione + "</p>";
      div_pot.innerHTML =
        "<p>" + car.cilindrata_CC + "CC / " + car.cavalli + " CV</p>";
      div_consumi.innerHTML =
        "<p>" +
        (car.consumo || "N/A") +
        " L/100km (" +
        (car.tipo || "N/A") +
        ")</p>";
      div_euro.innerHTML = "<p>" + (car.standard_Ambientali || "N/A") + "</p>";
      div_trasm.innerHTML =
        "<p>" +
        (car.cambio || "N/A") +
        " / " +
        (car.trazione || "N/A") +
        "</p>";

      generaAnalisiIA(car, id);
    })
    .catch((err) => console.error("Errore:", err));
}

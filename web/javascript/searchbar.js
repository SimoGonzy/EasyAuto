const APIKEY = "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";
const searchBar1 = document.getElementById("searchBar1");
const searchBar2 = document.getElementById("searchBar2");

//PROVIAMO A COMMENTARE BRUTTE TROIETTE

// --- CONFIGURAZIONE PROMPT MODIFICABILE ---
const PROMPT_TEMPLATE = (modello, dati) => {
  return `Agisci come un esperto meccanico professionista specializzato in affidabilità dei veicoli.

OBIETTIVO:
Generare una risposta estremamente strutturata, coerente e facilmente parsabile in Markdown.

INPUT:
- Modello auto: ${modello}
- Dati: ${dati}

REGOLE ASSOLUTE (NON VIOLARE):
- Usa SOLO Markdown puro
- NON usare HTML
- NON usare emoji o simboli decorativi
- NON aggiungere testo fuori struttura
- NON aggiungere introduzioni o conclusioni
- NON cambiare l’ordine delle sezioni
- NON aggiungere sezioni extra
- NON lasciare righe vuote extra
- Ogni bullet deve andare a capo
- NON scrivere tutto su una riga

FORMATO RIGIDO:

### Difetti comuni
- [GRAVE] descrizione breve senza punto finale
- [MEDIO] descrizione breve senza punto finale
- [LEGGERO] descrizione breve senza punto finale

### Manutenzione preventiva
- azione concreta breve senza punto finale
- azione concreta breve senza punto finale
- azione concreta breve senza punto finale

VINCOLI DI FORMATTAZIONE:
- Esattamente 3 bullet per sezione (né più né meno)
- Ogni bullet:
  - max 12 parole
  - nessun punto finale
  - nessuna virgola finale
- Dopo il tag usare UNO spazio: "[GRAVE] problema"
- NON usare ":" o "-" dopo il tag


VINCOLI CONTENUTO DIFETTI:
- Specifici e tecnici (no "problemi al motore")
- Basati su guasti reali o plausibili
- Diversi tra loro

VINCOLI MANUTENZIONE:
- Azioni pratiche (es: controllare, sostituire, pulire)
- Devono prevenire i difetti sopra
- Nessuna ripetizione

SE DATI INSUFFICIENTI:
- Usa problemi tipici del modello o categoria

`;
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

  const promptCompleto = PROMPT_TEMPLATE(
    carData.modello,
    JSON.stringify(carData),
  );

  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${APIKEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "system",
              content:
                "Sei un assistente tecnico. Rispondi SEMPRE in Markdown.",
            },
            { role: "user", content: promptCompleto },
          ],
          temperature: 0.5, // Leggermente più basso per maggiore precisione strutturale
        }),
      },
    );

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
      img.setAttribute("src", "img/cars/" + car.immagine);
      img.setAttribute("onError","this.src=\'img/default-car.png\'")
      // Gestione Immagine
      /*
      if (car.immagine && car.immagine !== "") {
        img.setAttribute("src", car.immagine);
      } else {
        img.setAttribute("src", "img/default-car.png");
      }
      */
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

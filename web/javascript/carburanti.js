// Dati estratti direttamente dal tuo CSV
let rawData = [];
const date = new Date();
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();
fetch("../web/php/alimentazione.php")
  .then((response) => {
    if (!response.ok) {
      throw new Error("File PHP non trovato");
    }
    return response.json();
  })
  .then((data) => {
    // salta intestazione e prima riga "Aggiornamento"
   data.forEach((item) => {
      const oggetto = {
        reg: item.Regione,
        tipo: "Benzina",
        prezzo: item.benzina,
      };
      const oggetto2 = {
        reg: item.Regione,
        tipo: "Diesel",
        prezzo: item.diesel,
        };
      const oggetto3 = {
        reg: item.Regione,
        tipo: "GPL",
        prezzo: item.gpl,
      };
      const oggetto4 = {
        reg: item.Regione,
        tipo: "Metano",
        prezzo: item.metano,
      };

      rawData.push(oggetto);
      rawData.push(oggetto2);
      rawData.push(oggetto3);
      rawData.push(oggetto4);
    });
    const Bolzano = rawData.filter(
    (d) => d.reg.toLowerCase() === "bolzano".toLowerCase()
    );
    const Trento = rawData.filter(
    (d) => d.reg.toLowerCase() === "trento".toLowerCase()
    );
    const oggetto = {
      reg: "Trentino - Alto Adige",
      tipo: "Benzina",
      prezzo: parseFloat(((Bolzano[0].prezzo + Trento[0].prezzo) / 2).toFixed(3)),
    };
    const oggetto2 = {
     reg: "Trentino - Alto Adige",
     tipo: "Diesel",
     prezzo: parseFloat(((Bolzano[1].prezzo + Trento[1].prezzo) / 2).toFixed(3)),
     };
    const oggetto3 = {
     reg: "Trentino - Alto Adige",
     tipo: "GPL",
     prezzo: parseFloat(((Bolzano[2].prezzo + Trento[2].prezzo) / 2).toFixed(3)),
    };
    const oggetto4 = {
      reg: "Trentino - Alto Adige",
      tipo: "Metano",
      prezzo: parseFloat(((Bolzano[3].prezzo + Trento[3].prezzo) / 2).toFixed(3)),
    };
    rawData.push(oggetto);
    rawData.push(oggetto2);
    rawData.push(oggetto3);
    rawData.push(oggetto4);
  })
  .catch((error) => {
    console.error("Errore nel caricamento:", error);
  });

// Gestione interazione
document.querySelectorAll("path").forEach((el) => {
  el.addEventListener("click", function () {
    // Rimuovi selezione precedente
    document
      .querySelectorAll("path")
      .forEach((p) => p.classList.remove("selected"));
    // Applica nuova selezione
    this.classList.add("selected");

    const nomeRegione = this.getAttribute("data-name");
    updateTable(nomeRegione);
  });
});

function updateTable(regione) {
  const title = document.getElementById("region-title");
  const content = document.getElementById("table-content");

  title.innerText = regione;

  // Filtra i dati
  const filtrati = rawData.filter(
    (d) => d.reg.toLowerCase() === regione.toLowerCase()
  );

  if (filtrati.length > 0) {
    let html = `<table>
            <thead>
                <tr>
                    <th>Carburante</th>
                    <th>Prezzo (€)</th>
                </tr>
            </thead>
            <tbody>`;

    filtrati.forEach((item) => {
      if (item.prezzo != 0) {
        html += `<tr>
                  <td>${item.tipo}</td>
                  <td class="price-cell">${item.prezzo}</td>
                </tr>`;
      }
    });

    html += `</tbody></table>`;
    content.innerHTML = html;
  } else {
    content.innerHTML = `<div class="empty-state">Nessun dato trovato per questa regione nel dataset del ${day}-${month}-${year}.</div>`;
  }
}

function data(title) {
  const div = document.getElementById(title);
  if (!div) return; // Controllo di sicurezza nel caso l'id non esista
  
  if (title == "data-label") {
    div.innerText = `Aggiornamento: ${day}-${month}-${year}`;
  } else if (title == "empty-state") {
    div.innerText = `Clicca su una regione per visualizzare i prezzi medi estrapolati dal dataset del ${day}-${month}-${year}.`;
  }
}

data("data-label");
data("empty-state");
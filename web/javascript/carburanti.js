// Dati estratti direttamente dal tuo CSV
let rawData = [];
const date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

fetch("../database/datasetCostiCarburante.csv")
  .then((response) => response.text())
  .then((text) => {
    const righe = text.split("\n");

    // salta intestazione e prima riga "Aggiornamento"
    for (let i = 2; i < righe.length; i++) {
      if (righe[i].trim() === "") continue;

      const colonne = righe[i].split(";");

      const oggetto = {
        reg: colonne[0].trim(),
        tipo: colonne[1].trim(),
        erog: colonne[2].trim(),
        prezzo: colonne[3].trim(),
      };

      rawData.push(oggetto);
    }

    console.log("Dati caricati:", rawData);
  })
  .catch((error) => {
    console.error("Errore nel caricamento CSV:", error);
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
                    <th>Erogazione</th>
                    <th>Prezzo (€)</th>
                </tr>
            </thead>
            <tbody>`;

    filtrati.forEach((item) => {
      html += `<tr>
                <td>${item.tipo}</td>
                <td>${item.erog}</td>
                <td class="price-cell">${item.prezzo}</td>
            </tr>`;
    });

    html += `</tbody></table>`;
    content.innerHTML = html;
  } else {
    content.innerHTML = `<div class="empty-state">Nessun dato trovato per questa regione nel dataset del  ${day}-${month}-${year}.</div>`;
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
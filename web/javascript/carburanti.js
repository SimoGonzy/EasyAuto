// Dati estratti direttamente dal tuo CSV
let rawData = [];

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
    content.innerHTML = `<div class="empty-state">Nessun dato trovato per questa regione nel dataset del 27-02-2026.</div>`;
  }
}

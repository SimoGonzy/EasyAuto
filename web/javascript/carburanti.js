// Dati estratti direttamente dal tuo CSV
const rawData = [
  {
    reg: "Abruzzo",
    tipo: "Gasolio",
    erog: "SELF",
    prezzo: "1.721",
  },
  {
    reg: "Abruzzo",
    tipo: "Benzina",
    erog: "SELF",
    prezzo: "1.665",
  },
  {
    reg: "Abruzzo",
    tipo: "GPL",
    erog: "SERVITO",
    prezzo: "0.697",
  },
  {
    reg: "Abruzzo",
    tipo: "Metano",
    erog: "SERVITO",
    prezzo: "1.407",
  },
  {
    reg: "Basilicata",
    tipo: "Gasolio",
    erog: "SELF",
    prezzo: "1.744",
  },
  {
    reg: "Basilicata",
    tipo: "Benzina",
    erog: "SELF",
    prezzo: "1.707",
  },
  {
    reg: "Basilicata",
    tipo: "GPL",
    erog: "SERVITO",
    prezzo: "0.679",
  },
  {
    reg: "Basilicata",
    tipo: "Metano",
    erog: "SERVITO",
    prezzo: "1.465",
  },
  {
    reg: "Bolzano",
    tipo: "Gasolio",
    erog: "SELF",
    prezzo: "1.794",
  },
  {
    reg: "Bolzano",
    tipo: "Benzina",
    erog: "SELF",
    prezzo: "1.724",
  },
  {
    reg: "Bolzano",
    tipo: "GPL",
    erog: "SERVITO",
    prezzo: "0.775",
  },
  {
    reg: "Bolzano",
    tipo: "Metano",
    erog: "SERVITO",
    prezzo: "1.588",
  },
  {
    reg: "Calabria",
    tipo: "Gasolio",
    erog: "SELF",
    prezzo: "1.750",
  },
  {
    reg: "Calabria",
    tipo: "Benzina",
    erog: "SELF",
    prezzo: "1.705",
  },
  {
    reg: "Calabria",
    tipo: "GPL",
    erog: "SERVITO",
    prezzo: "0.730",
  },
  {
    reg: "Calabria",
    tipo: "Metano",
    erog: "SERVITO",
    prezzo: "1.499",
  },
  {
    reg: "Campania",
    tipo: "Gasolio",
    erog: "SELF",
    prezzo: "1.699",
  },
  {
    reg: "Campania",
    tipo: "Benzina",
    erog: "SELF",
    prezzo: "1.663",
  },
  {
    reg: "Campania",
    tipo: "GPL",
    erog: "SERVITO",
    prezzo: "0.639",
  },
  {
    reg: "Campania",
    tipo: "Metano",
    erog: "SERVITO",
    prezzo: "1.386",
  },
  {
    reg: "Emilia Romagna",
    tipo: "Gasolio",
    erog: "SELF",
    prezzo: "1.723",
  },
  {
    reg: "Emilia Romagna",
    tipo: "Benzina",
    erog: "SELF",
    prezzo: "1.662",
  },
  {
    reg: "Emilia Romagna",
    tipo: "GPL",
    erog: "SERVITO",
    prezzo: "0.665",
  },
  {
    reg: "Emilia Romagna",
    tipo: "Metano",
    erog: "SERVITO",
    prezzo: "1.373",
  },
  {
    reg: "Friuli Venezia Giulia",
    tipo: "Gasolio",
    erog: "SELF",
    prezzo: "1.741",
  },
  {
    reg: "Friuli Venezia Giulia",
    tipo: "Benzina",
    erog: "SELF",
    prezzo: "1.673",
  },
  {
    reg: "Friuli Venezia Giulia",
    tipo: "GPL",
    erog: "SERVITO",
    prezzo: "0.676",
  },
  {
    reg: "Friuli Venezia Giulia",
    tipo: "Metano",
    erog: "SERVITO",
    prezzo: "1.386",
  },
  {
    reg: "Lazio",
    tipo: "Gasolio",
    erog: "SELF",
    prezzo: "1.710",
  },
  {
    reg: "Lazio",
    tipo: "Benzina",
    erog: "SELF",
    prezzo: "1.654",
  },
  { reg: "Lazio", tipo: "GPL", erog: "SERVITO", prezzo: "0.664" },
  {
    reg: "Lazio",
    tipo: "Metano",
    erog: "SERVITO",
    prezzo: "1.476",
  },
  {
    reg: "Liguria",
    tipo: "Gasolio",
    erog: "SELF",
    prezzo: "1.747",
  },
  {
    reg: "Liguria",
    tipo: "Benzina",
    erog: "SELF",
    prezzo: "1.689",
  },
  {
    reg: "Liguria",
    tipo: "GPL",
    erog: "SERVITO",
    prezzo: "0.773",
  },
  {
    reg: "Liguria",
    tipo: "Metano",
    erog: "SERVITO",
    prezzo: "1.438",
  },
  {
    reg: "Lombardia",
    tipo: "Gasolio",
    erog: "SELF",
    prezzo: "1.723",
  },
  {
    reg: "Lombardia",
    tipo: "Benzina",
    erog: "SELF",
    prezzo: "1.664",
  },
  {
    reg: "Lombardia",
    tipo: "GPL",
    erog: "SERVITO",
    prezzo: "0.669",
  },
  {
    reg: "Lombardia",
    tipo: "Metano",
    erog: "SERVITO",
    prezzo: "1.387",
  },
  {
    reg: "Marche",
    tipo: "Gasolio",
    erog: "SELF",
    prezzo: "1.706",
  },
  {
    reg: "Marche",
    tipo: "Benzina",
    erog: "SELF",
    prezzo: "1.650",
  },
  {
    reg: "Marche",
    tipo: "GPL",
    erog: "SERVITO",
    prezzo: "0.699",
  },
  {
    reg: "Marche",
    tipo: "Metano",
    erog: "SERVITO",
    prezzo: "1.312",
  },
  {
    reg: "Molise",
    tipo: "Gasolio",
    erog: "SELF",
    prezzo: "1.730",
  },
  {
    reg: "Molise",
    tipo: "Benzina",
    erog: "SELF",
    prezzo: "1.687",
  },
  {
    reg: "Molise",
    tipo: "GPL",
    erog: "SERVITO",
    prezzo: "0.698",
  },
  {
    reg: "Molise",
    tipo: "Metano",
    erog: "SERVITO",
    prezzo: "1.410",
  },
  {
    reg: "Piemonte",
    tipo: "Gasolio",
    erog: "SELF",
    prezzo: "1.723",
  },
  {
    reg: "Piemonte",
    tipo: "Benzina",
    erog: "SELF",
    prezzo: "1.662",
  },
  {
    reg: "Piemonte",
    tipo: "GPL",
    erog: "SERVITO",
    prezzo: "0.669",
  },
  {
    reg: "Piemonte",
    tipo: "Metano",
    erog: "SERVITO",
    prezzo: "1.422",
  },
  {
    reg: "Puglia",
    tipo: "Gasolio",
    erog: "SELF",
    prezzo: "1.715",
  },
  {
    reg: "Puglia",
    tipo: "Benzina",
    erog: "SELF",
    prezzo: "1.683",
  },
  {
    reg: "Puglia",
    tipo: "GPL",
    erog: "SERVITO",
    prezzo: "0.654",
  },
  {
    reg: "Puglia",
    tipo: "Metano",
    erog: "SERVITO",
    prezzo: "1.465",
  },
  {
    reg: "Sardegna",
    tipo: "Gasolio",
    erog: "SELF",
    prezzo: "1.753",
  },
  {
    reg: "Sardegna",
    tipo: "Benzina",
    erog: "SELF",
    prezzo: "1.695",
  },
  {
    reg: "Sardegna",
    tipo: "GPL",
    erog: "SERVITO",
    prezzo: "0.798",
  },
  {
    reg: "Sicilia",
    tipo: "Gasolio",
    erog: "SELF",
    prezzo: "1.715",
  },
  {
    reg: "Sicilia",
    tipo: "Benzina",
    erog: "SELF",
    prezzo: "1.685",
  },
  {
    reg: "Sicilia",
    tipo: "GPL",
    erog: "SERVITO",
    prezzo: "0.758",
  },
  {
    reg: "Sicilia",
    tipo: "Metano",
    erog: "SERVITO",
    prezzo: "1.734",
  },
  {
    reg: "Toscana",
    tipo: "Gasolio",
    erog: "SELF",
    prezzo: "1.721",
  },
  {
    reg: "Toscana",
    tipo: "Benzina",
    erog: "SELF",
    prezzo: "1.664",
  },
  {
    reg: "Toscana",
    tipo: "GPL",
    erog: "SERVITO",
    prezzo: "0.689",
  },
  {
    reg: "Toscana",
    tipo: "Metano",
    erog: "SERVITO",
    prezzo: "1.453",
  },
  {
    reg: "Trentino - Alto Adige",
    tipo: "Gasolio",
    erog: "SELF",
    prezzo: "1.756",
  },
  {
    reg: "Trentino - Alto Adige",
    tipo: "Benzina",
    erog: "SELF",
    prezzo: "1.699",
  },
  {
    reg: "Trentino - Alto Adige",
    tipo: "GPL",
    erog: "SERVITO",
    prezzo: "0.730",
  },
  {
    reg: "Trentino - Alto Adige",
    tipo: "Metano",
    erog: "SERVITO",
    prezzo: "1.323",
  },
  {
    reg: "Umbria",
    tipo: "Gasolio",
    erog: "SELF",
    prezzo: "1.721",
  },
  {
    reg: "Umbria",
    tipo: "Benzina",
    erog: "SELF",
    prezzo: "1.663",
  },
  {
    reg: "Umbria",
    tipo: "GPL",
    erog: "SERVITO",
    prezzo: "0.690",
  },
  {
    reg: "Umbria",
    tipo: "Metano",
    erog: "SERVITO",
    prezzo: "1.326",
  },
  {
    reg: "Valle d'Aosta",
    tipo: "Gasolio",
    erog: "SELF",
    prezzo: "1.772",
  },
  {
    reg: "Valle d'Aosta",
    tipo: "Benzina",
    erog: "SELF",
    prezzo: "1.710",
  },
  {
    reg: "Valle d'Aosta",
    tipo: "GPL",
    erog: "SERVITO",
    prezzo: "0.814",
  },
  {
    reg: "Veneto",
    tipo: "Gasolio",
    erog: "SELF",
    prezzo: "1.713",
  },
  {
    reg: "Veneto",
    tipo: "Benzina",
    erog: "SELF",
    prezzo: "1.656",
  },
  {
    reg: "Veneto",
    tipo: "GPL",
    erog: "SERVITO",
    prezzo: "0.677",
  },
  {
    reg: "Veneto",
    tipo: "Metano",
    erog: "SERVITO",
    prezzo: "1.327",
  },
];

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
    (d) => d.reg.toLowerCase() === regione.toLowerCase(),
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

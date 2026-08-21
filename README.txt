# EasyAuto

EasyAuto è una piattaforma web per confrontare automobili e stimare i principali costi di utilizzo, con particolare attenzione a carburante, manutenzione e dati economici regionali.

Il progetto nasce per aiutare l’utente a scegliere un veicolo in modo più consapevole, confrontando due modelli in modalità 1v1 e integrando dati aggiornabili da fonti pubbliche.

## Funzionalità

- Confronto diretto tra due autovetture
- Consultazione dei prezzi medi regionali dei carburanti
- Database con dati auto, costi di manutenzione e bollo regionale
- Aggiornamento dati carburante tramite fonte MIMIT
- Script Python per download CSV, logging e aggiornamento database
- Interfaccia web sviluppata con HTML, CSS e JavaScript

## Tecnologie utilizzate
- Frontend: HTML, CSS, JavaScript
- Backend/API: Python, FastAPI
- Database: MySQL / SQLite
- Automazione: APScheduler
- Web scraping / download dati: Requests, BeautifulSoup
- Open Data: dataset pubblici MIMIT sui prezzi carburante

## Dati carburante
EasyAuto integra dati sui prezzi medi regionali dei carburanti pubblicati dal Ministero delle Imprese e del Made in Italy.

Gli script Python permettono di:
- scaricare il file CSV dei prezzi carburante
- salvare il dataset nella cartella database/
- scrivere log giornalieri dell’operazione
- aggiornare il database tramite API FastAPI

Fonte dati: https://www.mimit.gov.it/it/prezzo-medio-carburanti/regioni

## Avvio del frontend

Per provare l’interfaccia web in locale, aprire il file:
  - index.html

Da lì è possibile accedere alle pagine di confronto auto e analisi carburanti.

## Avvio API Python

Installare le dipendenze principali:
  - pip install fastapi uvicorn requests beautifulsoup4 mysql-connector-python apscheduler

## Avviare l’API:
 
  - cd python_scripts
  - uvicorn main:app --reload

## Endpoint disponibile:
  
  - GET /api/aggiorna-ora

Questo endpoint forza l’aggiornamento dei prezzi carburante nel database.

## Aggiornamento CSV carburante

Per scaricare manualmente il CSV MIMIT:
  - python python_scripts/scarica_csv.py

Lo script salva il file aggiornato come:
  - database/datasetCostiCarburante.csv

## Stato del progetto

Il progetto è attualmente in concluso. Si tratta di un progetto scolastico, quindi esiste una struttura base che può essere modificata a proprio piacimento.  

## Obiettivo

EasyAuto vuole offrire uno strumento semplice per valutare un’automobile non solo dal punto di vista estetico o prestazionale, ma soprattutto in base a:
  - consumi
  - costo del carburante
  - manutenzione
  - bollo
  - convenienza economica nel tempo
  
## Autore

Sviluppato dal team EasyAuto:
  - Simone Gonzato
  - Gabriele Coni
  - Andrea Terzi
  - Andrea Contro
  - Luka Markovic
  - Anas El Badii

## Licenza

Distribuito sotto licenza MIT.

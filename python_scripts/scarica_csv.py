import requests
import os
from datetime import datetime

# URL del file governativo
url = "https://www.mimit.gov.it/images/stories/carburanti/MediaRegionaleStradale.csv"

# Percorso base progetto
base_path = os.path.join(
    os.path.expanduser("~"),
    "Documents",
    "EasyAuto",
    "EasyAuto"
)

# Cartelle principali
cartella_database = os.path.join(base_path, "database")
cartella_log = os.path.join(base_path, "log")

# Nome file CSV
nome_file_csv = "datasetCostiCarburante.csv"
percorso_csv = os.path.join(cartella_database, nome_file_csv)

# -----------------------------
# LOG GIORNALIERO
# -----------------------------

# Data di oggi (formato: 2026-02-13)
data_oggi = datetime.now().strftime("%Y-%m-%d")

# Nome file log giornaliero
nome_file_log = f"log_{data_oggi}.txt"

# Percorso completo log
percorso_log = os.path.join(cartella_log, nome_file_log)

# Creazione cartelle se non esistono
os.makedirs(cartella_database, exist_ok=True)
os.makedirs(cartella_log, exist_ok=True)

# Funzione scrittura log
def scrivi_log(messaggio):
    ora = datetime.now().strftime("%H:%M:%S")
    with open(percorso_log, "a", encoding="utf-8") as log_file:
        log_file.write(f"[{ora}] {messaggio}\n")


# -------------------------
# Download del file
# -------------------------
try:
    scrivi_log("Avvio download file CSV...")

    response = requests.get(url)
    response.raise_for_status()

    with open(percorso_csv, "wb") as f:
        f.write(response.content)

    scrivi_log("Download completato con successo!")
    scrivi_log(f"File salvato in: {percorso_csv}")
    scrivi_log("-" * 50)

    print("File scaricato correttamente!")

except Exception as e:
    scrivi_log("ERRORE durante il download!")
    scrivi_log(f"Dettaglio errore: {e}")
    scrivi_log("-" * 50)

    print("Errore durante il download:", e)
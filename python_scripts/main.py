from fastapi import FastAPI
import requests
from bs4 import BeautifulSoup
import io
import csv
import sqlite3
from apscheduler.schedulers.background import BackgroundScheduler
from contextlib import asynccontextmanager

MIMIT_URL = "https://www.mimit.gov.it/it/prezzo-medio-carburanti/regioni"
BASE_URL = "https://www.mimit.gov.it"
NOME_DATABASE = "C:\\xampp\\htdocs\\EasyAuto\\database\\dbautoprova.db"

def parse_prezzo(valore_str):
    """Converte le stringhe in float. Se trova 'n.d.' o vuoto, restituisce 0.0"""
    if not valore_str or "n.d." in valore_str.lower():
        return 0.0
    valore_pulito = valore_str.strip().replace(',', '.')
    try:
        return float(valore_pulito)
    except ValueError:
        return 0.0

def aggiorna_database_carburanti():
    print("Inizio aggiornamento automatico dei prezzi carburanti...")
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    }

    try:
        # 1. Trova e Scarica il CSV
        pagina = requests.get(MIMIT_URL, headers=headers)
        pagina.raise_for_status()
        soup = BeautifulSoup(pagina.text, 'html.parser')
        
        link_csv = None
        for a in soup.find_all('a', href=True):
            if 'csv' in a.text.lower() or '.csv' in a['href'].lower():
                link_csv = a['href']
                break

        if not link_csv:
            print("Errore: Link CSV non trovato sulla pagina.")
            return

        if link_csv.startswith('/'):
            link_csv = BASE_URL + link_csv

        risposta_csv = requests.get(link_csv, headers=headers)
        risposta_csv.raise_for_status()
        
        # 2. Leggi il CSV
        testo_csv = risposta_csv.content.decode('utf-8-sig') 
        reader = csv.reader(testo_csv.splitlines(), delimiter=';')
        
        # 3. Cerca la VERA intestazione (ignora eventuali date o titoli in cima)
        idx_regione, idx_tipo, idx_prezzo = 0, 1, 3
        for riga in reader:
            if not riga: continue
            riga_lower = [c.lower().strip() for c in riga]
            
            if 'regione' in riga_lower and 'tipologia' in riga_lower:
                idx_regione = riga_lower.index('regione')
                idx_tipo = riga_lower.index('tipologia')
                if 'prezzo medio' in riga_lower:
                    idx_prezzo = riga_lower.index('prezzo medio')
                elif 'prezzo' in riga_lower:
                    idx_prezzo = riga_lower.index('prezzo')
                break # Intestazione trovata, fermiamo la ricerca
        
        # 4. Raggruppa i dati verticali per Regione
        dati_regioni = {}
        for riga in reader:
            if len(riga) <= max(idx_regione, idx_tipo, idx_prezzo):
                continue
            
            regione = riga[idx_regione].strip()
            tipologia = riga[idx_tipo].strip().lower()
            prezzo = parse_prezzo(riga[idx_prezzo])
            
            # Se la regione non c'è ancora, la creiamo con valori a zero
            if regione not in dati_regioni:
                dati_regioni[regione] = {'benzina': 0.0, 'diesel': 0.0, 'gpl': 0.0, 'metano': 0.0}
                
            # Assegniamo il prezzo alla categoria corretta
            if 'benzina' in tipologia:
                dati_regioni[regione]['benzina'] = prezzo
            elif 'gasolio' in tipologia or 'diesel' in tipologia:
                dati_regioni[regione]['diesel'] = prezzo
            elif 'gpl' in tipologia:
                dati_regioni[regione]['gpl'] = prezzo
            elif 'metano' in tipologia:
                dati_regioni[regione]['metano'] = prezzo

        # 5. Salva nel Database SQLite
        with sqlite3.connect(NOME_DATABASE) as conn:
            cursor = conn.cursor()
            
            query_sql = """
            INSERT INTO Costi_Regione 
            (Regione, benzina, diesel, gpl, metano, euro0, euro1, euro2, euro3, euro4, euro5, euro6)
            VALUES (?, ?, ?, ?, ?, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)
            ON CONFLICT(Regione) DO UPDATE SET 
                benzina=excluded.benzina,
                diesel=excluded.diesel,
                gpl=excluded.gpl,
                metano=excluded.metano;
            """
            
            righe_aggiornate = 0
            for reg, prezzi in dati_regioni.items():
                cursor.execute(query_sql, (reg, prezzi['benzina'], prezzi['diesel'], prezzi['gpl'], prezzi['metano']))
                righe_aggiornate += 1
                
            conn.commit()
            print(f"Aggiornamento database completato! Aggiornate {righe_aggiornate} regioni.")

    except Exception as e:
        print(f"Errore durante l'aggiornamento: {e}")


# --- GESTIONE DELLO SCHEDULER E FASTAPI ---
@asynccontextmanager
async def lifespan(app: FastAPI):
    scheduler = BackgroundScheduler()
    scheduler.add_job(aggiorna_database_carburanti, 'cron', hour=9, minute=0)
    scheduler.start()
    print("Scheduler avviato. Task programmato ogni giorno alle 09:00.")
    yield 
    scheduler.shutdown()
    print("Scheduler fermato.")

app = FastAPI(title="API Prezzi Carburanti MIMIT", lifespan=lifespan)

@app.get("/api/aggiorna-ora")
def forza_aggiornamento():
    aggiorna_database_carburanti()
    return {"message": "Aggiornamento lanciato! Controlla il terminale per i dettagli."}
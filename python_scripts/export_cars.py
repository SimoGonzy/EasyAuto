import sqlite3
import json
import os

DB_PATH = os.path.join(os.path.dirname(__file__), '..', 'database', 'dbautoprova.db')
OUTPUT_PATH = os.path.join(os.path.dirname(__file__), '..', 'web', 'cars.json')

def export_cars():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    query = """
        SELECT 
            Auto.id_Auto as id,
            Marca.nome as marca,
            Auto.modello as modello,
            Consumi_100km.consumo as consumo,
            Consumi_100km.tipo as tipo_consumo,
            Auto.immagine as immagine,
            Motore.alimentazione as motore
        FROM Auto
        LEFT JOIN Marca ON Auto.id_marca = Marca.id_Marca
        LEFT JOIN Consumi_100km ON Auto.id_Auto = Consumi_100km.id_auto
        LEFT JOIN Motore ON Auto.id_motore = Motore.id_Motore
    """
    
    cars = []
    # To avoid duplicates if multiple consumptions exist, let's keep track of seen IDs
    seen_ids = set()
    
    for row in cursor.execute(query).fetchall():
        car_dict = dict(row)
        car_id = car_dict['id']
        
        if car_id in seen_ids:
            continue
        seen_ids.add(car_id)
        
        marca = car_dict.get('marca', '') or ''
        modello = car_dict.get('modello', '') or ''
        motore = car_dict.get('motore', '') or ''
        
        if marca.lower() not in modello.lower():
            display_name = f"{marca} {modello}".strip()
        else:
            display_name = modello.strip()
            
        # Append engine info to distinguish same models
        if motore:
            display_name += f" - {motore}"
            
        consumo = car_dict.get('consumo')
        tipo_consumo = car_dict.get('tipo_consumo')
        
        # Se c'è il consumo ma non il tipo, omette il tipo. Se c'è solo un numero, appende l/100km.
        if consumo is not None:
            if tipo_consumo:
                consumo_str = f"{consumo} l/100km ({tipo_consumo})"
            else:
                consumo_str = f"{consumo} l/100km"
        else:
            consumo_str = "Dato non disponibile"
            
        car = {
            "id": str(car_id),
            "name": display_name,
            "brand": marca,
            "model": modello,
            "price": "Dato non disponibile",
            "fuel_consumption": consumo_str,
            "maintenance": "Dato non disponibile",
            "image": car_dict.get('immagine') or f"https://via.placeholder.com/400x250?text={display_name.replace(' ', '+')}"
        }
        cars.append(car)
        
    # Sort cars alphabetically by brand and model
    cars.sort(key=lambda x: (x['brand'], x['model']))
        
    with open(OUTPUT_PATH, 'w', encoding='utf-8') as f:
        json.dump(cars, f, ensure_ascii=False, indent=4)
        
    print(f"Exported {len(cars)} cars to {OUTPUT_PATH}")

if __name__ == '__main__':
    export_cars()

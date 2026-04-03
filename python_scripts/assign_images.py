import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), '..', 'database', 'dbautoprova.db')

def update_images():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # 1. Add column if it doesn't exist
    try:
        cursor.execute("ALTER TABLE Auto ADD COLUMN immagine TEXT;")
        print("Column 'immagine' added successfully.")
    except sqlite3.OperationalError:
        print("Column 'immagine' already exists.")

    # 2. Define image mapping based on car model substrings
    # This maps a substring in the car's model to the filename in img/cars
    # E.g. anything containing "Panda Cross" will get "fiat_panda_cross.png"
    # Order matters: more specific substrings first.
    mapping = [
        ("Panda Cross", "fiat_panda_cross.png"),
        ("Panda", "fiat_panda.jpeg"),
        ("500", "fiat_panda.jpeg"), # The user didn't upload a 500 picture, fallback to panda or generic if no match
        ("Golf GTI", "volkswagen_golf_gti.png"),
        ("Golf", "vw_golf.png"),
        ("330i", "bmw_330i.png"),
        ("M340i", "bmw_330i.png"), # fallback for M340i to 330i picture
        ("318i", "bmw_318i.avif"),
        ("320d", "bmw_318i.avif"), # fallback
        ("A180", "mercedes_a.png"),
        ("A200", "mercedes_a.png"),
        ("A220", "mercedes_a.png"),
        ("A250", "mercedes_a.png"),
        ("S3", "audi_s3.png"),
        ("A3", "audi_a3.jpg"),
        ("Corolla", "toyota_corolla.png"),
        ("Focus", "ford_focus.jpg"),
        ("308 GT", "peugeout_308_gt.jpg"),
        ("308", "peugeout_308.jpg"),
        ("Clio RS Line", "reunault_clio_rsline.jpg"),
        ("Clio", "renault_clio.png"),
        ("i30", "hyundai_i30.png")
    ]

    # Fetch all cars
    cars = cursor.execute("SELECT id_Auto, modello FROM Auto").fetchall()
    
    update_count = 0
    for car_id, modello in cars:
        assigned_img = None
        for substring, img_file in mapping:
            if substring.lower() in modello.lower():
                assigned_img = f"img/cars/{img_file}"
                break
        
        if assigned_img:
            cursor.execute("UPDATE Auto SET immagine = ? WHERE id_Auto = ?", (assigned_img, car_id))
            update_count += 1
        else:
            print(f"Warning: No image mapping found for {modello}")
            
    conn.commit()
    print(f"Assigned images to {update_count} cars.")
    conn.close()

if __name__ == '__main__':
    update_images()

import shutil
import os

artifact_dir = r"C:\Users\Amministratore\.gemini\antigravity\brain\68f44a07-fff3-4769-aa74-89694fb883d9"
target_dir = r"C:\Users\Amministratore\Desktop\EasyAuto\web\img\cars"
audi_a3_source = os.path.join(target_dir, "audi_a3.jpg")

mapping = {
    "audi_s3.png": audi_a3_source,
    "bmw_318i.avif": "bmw_318i_1775223917404.png",
    "bmw_330i.png": "bmw_318i_1775223917404.png",
    "fiat_panda.jpeg": "fiat_panda_1775223936781.png",
    "fiat_panda_cross.png": "fiat_panda_cross_1775224007360.png",
    "ford_focus.png": "ford_focus_1775223953230.png",
    "hyundai_i30.png": "hyundai_i30_1775224021515.png",
    "mercedes_a.png": "mercedes_a_1775223970533.png",
    "peugeout_308.png": "peugeout_308_1775224041451.png",
    "peugeout_308_gt.jpg": "peugeout_308_1775224041451.png",
    "renault_clio.png": "renault_clio_1775224059377.png",
    "reunault_clio_rsline.jpg": "renault_clio_1775224059377.png",
    "toyota_corolla.png": "toyota_corolla_1775224082141.png",
    "vw_golf_gti.png": "vw_golf_gti_1775223985394.png",
    "vw_golf.png": "vw_golf_gti_1775223985394.png"
}

for dest_name, source_name in mapping.items():
    dest_path = os.path.join(target_dir, dest_name)
    # If source_name is an absolute path (audi_a3)
    if os.path.isabs(source_name):
        src_path = source_name
    else:
        src_path = os.path.join(artifact_dir, source_name)
        
    print(f"Copying {src_path} -> {dest_path}")
    
    if os.path.exists(src_path):
        try:
            shutil.copyfile(src_path, dest_path)
            print(f"Success: {dest_name}")
        except Exception as e:
            print(f"Failed to copy {dest_name}: {e}")
    else:
        print(f"Source file missing: {src_path}")

print("Replacement complete!")

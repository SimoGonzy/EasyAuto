<?php
header('Content-Type: application/json');
ini_set('display_errors', 0);

try {
    $db = new SQLite3("../../database/dbautoprova.db");

    $searchTerm = isset($_GET['name']) ? $_GET['name'] : '';
    $data = []; // Inizializziamo un array vuoto per i risultati

    if ($searchTerm !== '') {
        // CORREZIONE 1: Rimosse le virgolette attorno a :name
        $stmt = $db->prepare("SELECT Auto.modello, 
        Marca.nome as Marca,
        Auto.anno_Di_Produzione,
        Auto.immagine,
        Motore.cilindrata_CC,
        Motore.cavalli,
        Motore.alimentazione 
        FROM auto join Motore join Marca on Auto.id_marca = Marca.id_Marca and Auto.id_motore = Motore.id_Motore 
        WHERE Auto.modello = :name");
        
        if (!$stmt) {
            throw new Exception("Errore preparazione query: " . $db->lastErrorMsg());
        }

        $stmt->bindValue(':name', $searchTerm, SQLITE3_TEXT);
        $result = $stmt->execute();

        // CORREZIONE 2: Ciclo per estrarre le righe dal database
        while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
            $data[] = $row;
        }


    }

    // CORREZIONE 3: Codifichiamo l'array di dati, non l'oggetto result
    echo json_encode($data);
    
    $db->close();

} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
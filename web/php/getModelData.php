<?php
header('Content-Type: application/json');
ini_set('display_errors', 0);

try {
    $db = new SQLite3("../../database/dbautoprova.db");

    $searchTerm = isset($_GET['name']) ? $_GET['name'] : '';
    $data = []; // Inizializziamo un array vuoto per i risultati

    if ($searchTerm !== '') {
        // CORREZIONE 1: Rimosse le virgolette attorno a :name
        $stmt = $db->prepare("SELECT 
        Auto.modello,   
        Marca.nome as Marca,
        Auto.anno_Di_Produzione,
        Auto.immagine,
        Auto.standard_Ambientali,
        Motore.cilindrata_CC,
        Motore.cavalli,
        Motore.alimentazione,
        Motore.cambio,
        Motore.trazione,
        Consumi_100km.consumo,
        Consumi_100km.tipo
        FROM auto join Motore join Marca join Consumi_100km join Serie on Auto.id_marca = Marca.id_Marca and Auto.id_motore = Motore.id_Motore and Auto.id_Auto = Consumi_100km.id_auto and Auto.id_serie = Serie.id_Serie
        WHERE Auto.modello = :name");

        if (!$stmt) {
            throw new Exception("Errore SQL: " . $db->lastErrorMsg());
        }

        $stmt->bindValue(':name', $searchTerm, SQLITE3_TEXT);
        $result = $stmt->execute();

        while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
            $data[] = $row;
        }
    }

    echo json_encode($data);
    $db->close();

} catch (Exception $e) {
    // In caso di errore, restituiamo comunque un JSON valido
    echo json_encode(["error" => $e->getMessage()]);
}
?>
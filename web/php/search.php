<?php
header('Content-Type: application/json');
ini_set('display_errors', 0); // Evita che i messaggi di errore rompano il JSON

try {
    // Percorso per uscire da /php/ e /web/ ed entrare in /database/
    $db = new SQLite3("../../database/dbautoprova.db");

    $searchTerm = isset($_GET['q']) ? $_GET['q'] : '';
    $auto = array();

    if ($searchTerm !== '') {
        // Selezioniamo tutte le colonne necessarie
        $stmt = $db->prepare("SELECT * FROM auto WHERE modello LIKE :t LIMIT 10");
        
        if (!$stmt) {
            throw new Exception("Errore query: " . $db->lastErrorMsg());
        }

        $stmt->bindValue(':t', '%' . $searchTerm . '%', SQLITE3_TEXT);
        $result = $stmt->execute();

        while($row = $result->fetchArray(SQLITE3_ASSOC)){
            $auto[] = $row;
        }
    }

    echo json_encode($auto);
    $db->close();

} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
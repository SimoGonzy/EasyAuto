<?php
header('Content-Type: application/json');
ini_set('display_errors', 0); // Evita che i messaggi di errore rompano il JSON
try {
    // Percorso per uscire da /php/ e /web/ ed entrare in /database/
    $db = new SQLite3("../../database/dbautoprova.db");
    $auto = array();
    $query = "SELECT Regione,benzina,diesel,gpl,metano FROM Costi_Regione";
    // Selezioniamo tutte le colonne necessarie
    $result = $db->query($query);

    while($row = $result->fetchArray(SQLITE3_ASSOC)){
        $auto[] = $row;
    } 
    echo json_encode($auto);
    $db->close();

} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
    echo "Errore: " . $e->getMessage(); // Debug: mostra l'errore
}
?>
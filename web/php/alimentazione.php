<?php
    header('Content-Type: application/json');
    ini_set('display_errors', 0); // Evita che i messaggi di errore rompano il JSON
    $host = "localhost";
    $user = "root";
    $pwd = "";
    $db = "easyauto";
    try {
        // Percorso per uscire da /php/ e /web/ ed entrare in /database/
        $conn = new mysqli($host,$user,$pwd,$db);
        if ($conn->connect_error) {
            die(json_encode(["error" => "Connection failed"]));
        }
        $auto = array();
        $query = "SELECT Regione,benzina,diesel,gpl,metano FROM Costi_Regione";
        // Selezioniamo tutte le colonne necessarie
        $result = $conn->query($query);
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $auto[] = $row;
            } 
        }
        echo json_encode($auto);
        $conn->close();

    } catch (Exception $e) {
        echo json_encode(["error" => $e->getMessage()]);
        echo "Errore: " . $e->getMessage(); // Debug: mostra l'errore
    }
?>
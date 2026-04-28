<?php
header('Content-Type: application/json');
ini_set('display_errors', 0); // Evita che i messaggi di errore rompano il JSON
$host = "localhost";
$user = "root";
$pwd = "";
$db = "easyauto";
try {
    //Percorso per uscire da /php/ e /web/ ed entrare in /database/
    //$db = new SQLite3("../../database/dbautoprova.db");
    $conn = new mysqli($host,$user,$pwd,$db);
    if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed"]));
    }
    $searchTerm = isset($_GET['q']) ? $_GET['q'] : '';
    $auto = array();
    // Selezioniamo tutte le colonne necessarie
    $stmt = $conn->prepare("SELECT * FROM auto WHERE modello LIKE ?");
    
    if (!$stmt) {
        throw new Exception("Errore query");
    }
    $st = '%' . $searchTerm . '%';
    $stmt->bind_param('s',$st);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()){
            $auto[] = $row;
        }
    }
    echo json_encode($auto);
    $conn->close();

} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
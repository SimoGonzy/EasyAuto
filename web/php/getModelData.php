<?php
header('Content-Type: application/json');
ini_set('display_errors', 0);
$host = "localhost";
$user = "root";
$pwd = "";
$db = "easyauto";

try {
    $conn = new mysqli($host,$user,$pwd,$db);
    if ($conn->connect_error) {
        die(json_encode(["error" => "Connection failed"]));
    }
    $searchTerm = isset($_GET['name']) ? $_GET['name'] : '';
    $data = []; // Inizializziamo un array vuoto per i risultati

    if ($searchTerm !== '') {
        // CORREZIONE 1: Rimosse le virgolette attorno a :name
        $stmt = $conn->prepare("SELECT 
        auto.modello,   
        marca.nome as Marca,
        auto.anno_Di_Produzione,
        /*auto.immagine, TO DO*/
        auto.standard_Ambientali,
        motore.cilindrata_CC,
        motore.cavalli,
        motore.alimentazione,       
        motore.cambio,
        motore.trazione,
        consumi_100km.consumo,
        consumi_100km.tipo
        FROM auto INNER join motore on auto.id_motore = motore.id_Motore INNER join marca on auto.id_marca = marca.id_Marca INNER join consumi_100km on auto.id_Auto = consumi_100km.id_auto INNER join carrozzeria on auto.id_carrozzeria = carrozzeria.id_Carrozzeria
        WHERE auto.modello = ?");

        if (!$stmt) {
            throw new Exception("Errore SQL: ");
        }

        $stmt->bind_param('s', $searchTerm);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()){
                $data[] = $row;
            }
        }
    echo json_encode($data);
    $conn->close();
    }
}catch (Exception $e) {
    // In caso di errore, restituiamo comunque un JSON valido
    echo json_encode(["error" => $e->getMessage()]);
}
?>
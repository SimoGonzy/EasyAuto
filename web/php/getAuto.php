<?php

$db = new SQLite3("../../database/dbautoprova.db");

$sql = "SELECT * FROM auto LIMIT 10";
$result = $db->query($sql);

$auto = array();

while($row = $result->fetchArray(SQLITE3_ASSOC)){
    $auto[] = $row;
}

echo json_encode($auto);

$db->close();

?>
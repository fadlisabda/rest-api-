<?php

// $mahasiswa = [
//     [
//         "nama" => "fadli",
//         "nrp" => "043040023",
//         "email" => "fadli@gmail.com"
//     ],
//     [
//         "nama" => "fadli2",
//         "nrp" => "023040001",
//         "email" => "fadli2@gmail.com"
//     ]
// ];

$dbh = new PDO('mysql:host=localhost;dbname=phpjson', 'root', '');
$db = $dbh->prepare('SELECT * FROM datadiri');
$db->execute();
$datadiri = $db->fetchAll(PDO::FETCH_ASSOC);

$data = json_encode($datadiri);
echo $data;

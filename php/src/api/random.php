<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
include 'database.php';
$objDb = new database;
$conn = $objDb->connect();


$method = $_SERVER['REQUEST_METHOD'];
switch($method){

        case "GET":
            $path = explode('/', $_SERVER['REQUEST_URI']);
            $num = $path[4];
            $sql = "SELECT * FROM question WHERE Aid = :Aid ORDER BY RAND() LIMIT $num";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':Aid', $path[3]);
            $stmt->execute();
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($data);
            break;
}
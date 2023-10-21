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
        $sql = "SELECT * FROM subject";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if(isset($path[3]) && is_numeric($path[3])) {
            $sql .= " WHERE SJid = :SJid";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':SJid', $path[3]);
            $stmt->execute();
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        } else {
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        echo json_encode($data);
        break;

    case "POST":
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if(isset($path[3]) && $path[3]=="insertSubject") {
            $data = json_decode(file_get_contents('php://input'));
            $sql = "INSERT INTO subject(SJid,SJname) VALUES(:sjid,:name)";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':sjid',$data->sjid);
            $stmt->bindParam(':name',$data->name);
        }else if(isset($path[3]) && $path[3]=="setSubject"){
            $data = json_decode( file_get_contents('php://input') );
            $sql = "UPDATE subject SET SJid=:sjid, SJname=:name WHERE SJid = :Sid";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':sjid',$data->sjid);
            $stmt->bindParam(':Sid',$path[4]);
            $stmt->bindParam(':name',$data->name);
        }
        if ($stmt->execute()){
            $response = true;
        }else{
            $response = false;
        }
        echo json_encode($response);
        break;

        case "DELETE":
            $sql = "DELETE FROM subject WHERE SJid = :SJid";
            $path = explode('/', $_SERVER['REQUEST_URI']);
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':SJid', $path[3]);
            if($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to delete record.'];
            }
            echo json_encode($response);
            break;
}
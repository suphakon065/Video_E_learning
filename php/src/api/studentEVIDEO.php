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
        if(isset($path[3]) && is_numeric($path[3]) && isset($path[4]) && is_numeric($path[4])) {
            $sql = "SELECT * FROM student_evideo WHERE Vid = :Vid AND Sid = :Sid";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':Vid', $path[3]);
            $stmt->bindParam(':Sid', $path[4]);
            $stmt->execute();
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        } else if(isset($path[3]) && $path[3]=="getSTvideo") {
            $sql = "SELECT student_evideo.id,student_evideo.Sid,student_evideo.Vid,student_evideo.current,student_evideo.Status FROM student_evideo
            INNER JOIN evideo ON student_evideo.Vid = evideo.Vid
            INNER JOIN subject ON evideo.SJid = subject.SJid
            WHERE subject.SJid = :SJid AND student_evideo.Sid = :Sid";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':SJid', $path[4]);
            $stmt->bindParam(':Sid', $path[5]);
            $stmt->execute();
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        } else {
            $sql = "SELECT * FROM student_evideo";
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        echo json_encode($data);
        break;

    case "POST":
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $data = json_decode(file_get_contents('php://input'));
        if(isset($path[3]) && $path[3]=="postStatus"){
            $sql = "INSERT INTO student_evideo(id,Sid,Vid,Status) VALUES(null,:Sid,:Vid,:Status)";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':Sid',$data->Sid);
            $stmt->bindParam(':Vid',$data->Vid);
            $stmt->bindParam(':Status',$data->Status);
        } else if(isset($path[3]) && $path[3]=="updateCurrent"){
            $sql = "UPDATE student_evideo SET current=:current, Status=:Status WHERE Vid=:Vid AND Sid=:Sid ";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':Vid',$data->Vid);
            $stmt->bindParam(':Sid',$data->Sid);
            $stmt->bindParam(':current',$data->current);
            $stmt->bindParam(':Status',$data->Status);
        }
        if ($stmt->execute()){
            $response = ['status' => 1,'message' => 'successfully.'];
        }else{
            $response = ['status' => 0,'message' => 'something wrong.'];
        }
        echo json_encode($response);
        break;
        
        case "DELETE":
            $sql = "DELETE FROM student_evideo WHERE Vid=:Vid AND Sid=:Sid";
            $path = explode('/', $_SERVER['REQUEST_URI']);
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':Vid', $path[4]);
            $stmt->bindParam(':Sid', $path[5]);
            if($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to delete record.'];
            }
            echo json_encode($response);
            break;
}
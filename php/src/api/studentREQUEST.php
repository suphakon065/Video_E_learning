<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
include 'database.php';
$objDb = new database;
$conn = $objDb->connect();
$GetStudentSubject = $objDb->GetStudentSubject;
$GetStudentRequest = $objDb->GetStudentRequest;

$method = $_SERVER['REQUEST_METHOD'];
switch($method){

    case "GET":
        
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if(isset($path[3]) && $path[3]=="getAllRQ"){
            $sql = "SELECT student_request.SJid,subject.SJname FROM student_request
            INNER JOIN subject ON student_request.SJid = subject.SJid
            WHERE student_request.Sid = :Sid";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':Sid', $path[4]);
        }
        else if(isset($path[3]) && $path[3]=="getSTRQ"){
            $sql = "SELECT student_request.Sid,user.Sname,user.User_PIC  FROM student_request
            INNER JOIN user ON student_request.Sid = user.Uid
            WHERE student_request.SJid = :SJid";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':SJid', $path[4]);
        }
        else if(isset($path[3]) && $path[3]=="getStudentRQ"){
            $sql = "SELECT * FROM student_request
            WHERE student_request.Sid = :Sid AND student_request.SJid = :SJid";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':Sid', $path[4]);
            $stmt->bindParam(':SJid', $path[5]);
        }
        $stmt->execute();
        $response = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($response);
        break;

    case "POST":
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $data = json_decode(file_get_contents('php://input'));
        $condition01 = json_decode(file_get_contents($GetStudentSubject.$path[4].'/'.$path[5]));
        $condition02 = json_decode(file_get_contents($GetStudentRequest.$path[4].'/'.$path[5]));
        if(isset($path[3]) && $path[3] == "Request" && $condition01 == false && $condition02 == false){
            $sql = "INSERT INTO student_request(Rid,Sid,SJid) VALUES(null,:Sid,:SJid)";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':Sid',$path[4]);
            $stmt->bindParam(':SJid',$path[5]);
            if($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Post successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Post failed.'];
            }
        }
        else{
            $response = ['status' => 0, 'message' => 'Post failed.'];
        }

        echo json_encode($response);
        break;

    case "DELETE":
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $sql = "DELETE FROM student_request WHERE SJid=:SJid AND Sid=:Sid";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':Sid', $path[3]);
        $stmt->bindParam(':SJid', $path[4]);
        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to delete record.'];
        }
        echo json_encode($response);
        break;
}

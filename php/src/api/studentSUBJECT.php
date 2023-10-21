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

$method = $_SERVER['REQUEST_METHOD'];
switch($method){

    case "GET":
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if(isset($path[3]) && $path[3]=="getStudentSJ" && isset($path[5]) && is_numeric($path[5])){   
            $sql = "SELECT * FROM student_subject
            WHERE student_subject.Sid = :Sid AND student_subject.SJid = :SJid";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':Sid', $path[4]);
            $stmt->bindParam(':SJid', $path[5]);
        }
        else if(isset($path[3]) && $path[3]=="getStudentSJ" && isset($path[4]) && is_numeric($path[4])){
            $sql = "SELECT subject.SJid,subject.SJname FROM student_subject
            INNER JOIN subject ON student_subject.SJid = subject.SJid
            WHERE student_subject.Sid = :Sid";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':Sid', $path[4]);
        }
        $stmt->execute();
        $response = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($response);
        break;

    case "POST":
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $data = json_decode(file_get_contents('php://input'));
        $condition01 = json_decode(file_get_contents($GetStudentSubject.$data->Sid.'/'.$data->SJid));
        if(isset($path[3]) && $path[3]=="postSTsubject" && $condition01 == false){
            $sql = "INSERT INTO student_subject(id,SJid,Sid) VALUES(null,:SJid,:Sid)";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':Sid',$data->Sid);
            $stmt->bindParam(':SJid',$data->SJid);
        }
        else if (isset($path[3]) && $path[3]=="updateStatus"){
            $sql = "UPDATE student_subject SET Status=:Status WHERE SJid=:SJid AND Sid=:Sid";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':Status',$data->Status);
            $stmt->bindParam(':SJid',$data->SJid);
            $stmt->bindParam(':Sid',$data->Sid);
        }
        if ($stmt->execute()){
            $response = ['status' => 1,'message' => 'successfully.'];
        }else{
            $response = ['status' => 0,'message' => 'something wrong.'];
        }
        echo json_encode($response);
        break;

        case "DELETE":
            $path = explode('/', $_SERVER['REQUEST_URI']);
            $sql = "DELETE FROM student_subject WHERE SJid=:SJid AND Sid=:Sid";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':SJid', $path[3]);
            $stmt->bindParam(':Sid', $path[4]);
            if($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to delete record.'];
            }
            echo json_encode($response);
            break;
}
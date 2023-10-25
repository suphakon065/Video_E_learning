<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
include 'database.php';
$objDb = new database;
$conn = $objDb->connect();
$GetAllUser = $objDb->GetAllUser;

$method = $_SERVER['REQUEST_METHOD'];
switch($method){

    case "GET":
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if(isset($path[3]) && is_numeric($path[3])) {
            $sql = "SELECT * FROM user";
            $sql .= " WHERE Uid = :Uid";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':Uid', $path[3]);
            $stmt->execute();
            $data = $stmt->fetch(PDO::FETCH_ASSOC);
        } else if(isset($path[3]) && $path[3] == "all") {
            $zero = 0;
            $sql = "SELECT user.Uid,user.Sname FROM user
            WHERE role = ".$zero;
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
         else if(isset($path[3]) && $path[3] == "check") {
            $sql = "SELECT user.Uid,user.Sname,student_subject.Status FROM user";
            $sql .= " INNER JOIN student_subject ON user.Uid = student_subject.Sid
            WHERE SJid = :SJid";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':SJid', $path[4]);
            $stmt->execute();
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        } else {
            $sql = "SELECT * FROM user";
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        echo json_encode($data);
        break;

    case "POST":
        $Uid;
        $response = true;
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $data = json_decode(file_get_contents('php://input'));
        if(isset($path[3]) && $path[3]=="Login"){
            $Uid = $data->Uid;
            $verification = json_decode(file_get_contents($GetAllUser.$Uid));
                if($verification != false && $verification->Uid == $data-> Uid){
                $result = password_verify($data->password,$verification->Spassword);
                if($result== true ){
                    $response = $verification;
                }
                else{
                    $response = false;
                }
            }
            else{
                $response = false;
            }
        } else if(($path[3]) && $path[3]=="edituser"){
            $Uid = $data->Uid;
            $verification = json_decode(file_get_contents($GetAllUser.$Uid));
            $result = password_verify($data->Mypassword,$verification->Spassword);
            if($result == true){
                $sql = "UPDATE user SET Sname=:name, User_PIC=:User_PIC WHERE Uid = :Uid";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':Uid',$data->Uid);
                $stmt->bindParam(':name',$data->name);
                $stmt->bindParam(':User_PIC', $data->User_PIC);
                if ($stmt->execute()){
                    $response = ['status' => 1, 'message' => 'Record successfully.'];
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to record.'];
                }
            }else {
                $response = ['status' => 0, 'message' => 'your password incorrect.'];
            }

        } else if(($path[3]) && $path[3]=="editpassword"){
            $Uid = $data->Uid;
            $verification = json_decode(file_get_contents($GetAllUser.$Uid));
            $result = password_verify($data->Mypassword,$verification->Spassword);
            if($result == true){
                $sql = "UPDATE user SET Spassword=:password WHERE Uid = :Uid";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':Uid',$Uid);
                $hash = password_hash($data->password,PASSWORD_DEFAULT,['cost'=>12]);
                $stmt->bindParam(':password', $hash);
                if ($stmt->execute()){
                    $response = ['status' => 1, 'message' => 'Record successfully.'];
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to record.'];
                }
            }else {
                $response = ['status' => 0, 'message' => 'your password incorrect.'];
            }
            
        }else if(($path[3]) && $path[3]=="createUser"){
            $Uid = $data->Uid;
            $verification = json_decode(file_get_contents($GetAllUser.$Uid));
            if($verification == false){
                $sql = "INSERT INTO user (Uid,Sname,Spassword,User_PIC) VALUES(:Uid,:name,:password,:User_PIC)";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':Uid',$data->Uid);
                $stmt->bindParam(':name',$data->name);
                $hash = password_hash($data->password,PASSWORD_DEFAULT,['cost'=>12]);
                $stmt->bindParam(':password', $hash);
                $stmt->bindParam(':User_PIC', $data->User_PIC);
                $stmt->execute();
                $response = true;
            }
            else{
                $response = false;
            }
        }
        echo json_encode($response);
        break;

        case "DELETE":
            $sql = "DELETE FROM student WHERE Uid = :Uid";
            $path = explode('/', $_SERVER['REQUEST_URI']);
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':Uid', $path[3]);
            if($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to delete record.'];
            }
            echo json_encode($response);
            break;
}

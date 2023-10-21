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
        if(isset($path[3]) && $path[3]=="lastAid"){
            $lim = 1;
            $sql = "SELECT Aid FROM assignment ORDER BY Aid DESC LIMIT $lim";
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $data = $stmt->fetch(PDO::FETCH_ASSOC);
        }
        else if(isset($path[3]) && $path[3]=="getassignment"){
            $sql = "SELECT * FROM assignment WHERE Aid = :Aid";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':Aid', $path[4]);
            $stmt->execute();
            $data = $stmt->fetch(PDO::FETCH_ASSOC);
        }
        else if(isset($path[3]) && $path[3]=="getvideoassignment") {
            $sql = " SELECT * FROM assignment WHERE Vid = :Vid";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':Vid', $path[4]);
            $stmt->execute();
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        } else {
            $sql = "SELECT Aid FROM assignment";
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        echo json_encode($data);
        break;

    case "POST":
        $data = json_decode(file_get_contents('php://input'));
        $sql = "INSERT INTO assignment(Vid,NumQuests,startTime,endTime,countdown) VALUES(:Vid,:NumQuests,:StartTime,:endTime,:countdown)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':Vid',$data->Vid);
        $stmt->bindParam(':NumQuests',$data->NumQuests);
        $stmt->bindParam(':StartTime',$data->StartTime);
        $stmt->bindParam(':endTime',$data->endTime);
        $stmt->bindParam(':countdown',$data->countdown);

        if ($stmt->execute()){
            $response = ['status' => 1,'message' => 'successfully.'];
        }else{
            $response = ['status' => 0,'message' => 'something wrong.'];
        }
        echo json_encode($response);
        break;
    
     case "PUT":
        $data = json_decode( file_get_contents('php://input') );

        $path = explode('/', $_SERVER['REQUEST_URI']);
        $sql = "UPDATE assignment SET NumQuests=:NumQuests,startTime=:StartTime,endTime=:endTime,countdown=:countdown WHERE Aid = :Aid";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':Aid',$path[3]);
        $stmt->bindParam(':NumQuests',$data->NumQuests);
        $stmt->bindParam(':StartTime',$data->StartTime);
        $stmt->bindParam(':endTime',$data->endTime);
        $stmt->bindParam(':countdown',$data->countdown);
        if ($stmt->execute()){
            $response = ['status' => 1, 'message' => 'Record updated successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to update record.'];
        }
        echo json_encode($response);
        break;

        case "DELETE":
            $response = 0;
            $path = explode('/', $_SERVER['REQUEST_URI']);
            if($path[3]!=null){
                $sql = "DELETE FROM assignment WHERE Aid = :Aid";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':Aid', $path[3]);
                if($stmt->execute()) {
                    $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to delete record.'];
                }
            }
            echo json_encode($response);
            break;
}
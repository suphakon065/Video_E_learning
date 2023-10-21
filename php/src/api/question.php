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
            if(isset($path[3]) && $path[3]=="getquestForm") {
                $sql .= "SELECT * FROM question WHERE Aid = :Aid";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':Aid', $path[4]);
            } else {
                $sql = "SELECT * FROM question";
                $stmt = $conn->prepare($sql);
            }
            $stmt->execute();
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($data);
            break;
        
//         case "POST":
//             $data = json_decode(file_get_contents('php://input'));
//             $path = explode('/', $_SERVER['REQUEST_URI']);
//             $sql = "INSERT INTO question(Aid,Question,PIC,Qtype,A,B,C,D,Answer) VALUES( :Aid,:Question,:PIC,:Qtype,:A,:B,:C,:D,:Answer)";
//             $stmt = $conn->prepare($sql);
//             $stmt->bindParam(':Aid', $path[5]);
//             $stmt->bindParam(':Question',$data->Question);
//             $stmt->bindParam(':PIC',$data->PIC);
//             $stmt->bindParam(':Qtype',$data->Qtype);
//             $stmt->bindParam(':A',$data->A);
//             $stmt->bindParam(':B',$data->B);
//             $stmt->bindParam(':C',$data->C);
//             $stmt->bindParam(':D',$data->D);
//             $stmt->bindParam(':Answer',$data->Answer);
//             if ($stmt->execute()){
//                 $response = ['status' => 1,'message' => 'successfully.'];
//             }else{
//                 $response = ['status' => 0,'message' => 'something wrong.'];
//             }
//             echo json_encode($response);
//             break;
        
//         case "PUT":
//             $data = json_decode( file_get_contents('php://input') );
    
//             $path = explode('/', $_SERVER['REQUEST_URI']);
//             $sql = "UPDATE question SET Question=:Question,PIC=:PIC,Qtype=:Qtype,A=:A,B=:B,C=:C,D=:D,Answer=:Answer WHERE Qid = :Qid";
//             $stmt = $conn->prepare($sql);
//             $stmt->bindParam(':Qid', $path[5]);
//             $stmt->bindParam(':Question',$data->Question);
//             $stmt->bindParam(':PIC',$data->PIC);
//             $stmt->bindParam(':Qtype',$data->Qtype);
//             $stmt->bindParam(':A',$data->A);
//             $stmt->bindParam(':B',$data->B);
//             $stmt->bindParam(':C',$data->C);
//             $stmt->bindParam(':D',$data->D);
//             $stmt->bindParam(':Answer',$data->Answer);
//             if ($stmt->execute()){
//                 $response = ['status' => 1, 'message' => 'Record updated successfully.'];
//             } else {
//                 $response = ['status' => 0, 'message' => 'Failed to update record.'];
//             }
//             echo json_encode($response);
//             break;
    
            case "DELETE":
                $response = 0;
                $path = explode('/', $_SERVER['REQUEST_URI']);
                if($path[3] != null){
                    $sql = "DELETE FROM question WHERE Qid = :Qid";
                    $stmt = $conn->prepare($sql);
                    $stmt->bindParam(':Qid', $path[3]);
                    if($stmt->execute()) {
                        $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
                    } else {
                        $response = ['status' => 0, 'message' => 'Failed to delete record.'];
                    }
            }
                
                echo json_encode($response);
                break;
    }
?>
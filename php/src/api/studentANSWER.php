<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
include 'database.php';
$objDb = new database;
$conn = $objDb->connect();
$GetAssignment = $objDb->GetAssignment;
$GetAllVideoAssignment = $objDb->GetAllVideoAssignment;
$GetAllAnswerAssignment = $objDb->GetAllAnswerAssignment;
$Getrandom = $objDb->Getrandom;


$method = $_SERVER['REQUEST_METHOD'];
switch($method){

    case "GET":
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $sql = "SELECT assignment.Vid,assignment.Aid,question.Qid,assignment.NumQuests,question.PIC,question.Question,student_answer.id AS AWid,assignment.startTime,assignment.endTime,assignment.countdown,question.A,question.B,question.C,question.D,question.E,student_answer.Answer AS Myanswer,question.Answer,question.Qtype
                FROM  student_answer INNER JOIN question ON student_answer.Qid = question.Qid 
                INNER JOIN assignment ON assignment.Aid = question.Aid ";
        if(isset($path[3]) && $path[3]=="videoAssignment"){
            $sql .= " WHERE student_answer.Sid = :Sid AND assignment.Vid = :Vid";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':Vid', $path[4]);
            $stmt->bindParam(':Sid', $path[5]);
            $stmt->execute();
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        echo json_encode($data);
        break;

    case "POST":
        $data = json_decode(file_get_contents('php://input'));
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if(isset($path[3]) && $path[3]=="getForm"){
            $response;
            $Vid = $data->Vid;
            $Sid = $data->Sid;
            $answerinfo = json_decode(file_get_contents($GetAllAnswerAssignment.$Vid.'/'.$Sid));
            if($answerinfo == false){
                $Allassign = json_decode(file_get_contents($GetAllVideoAssignment.$Vid));
                foreach($Allassign as $assigns){
                    $Aid = $assigns->Aid;
                    $assignment = json_decode(file_get_contents($GetAssignment.$Aid));
                    $NumQ =$assignment->NumQuests;
                    $Questions = json_decode(file_get_contents($Getrandom.$Aid.'/'.$NumQ));
                    foreach($Questions as $Quz){
                        $sql = "INSERT INTO student_answer(id,Sid,Qid) VALUES(null,:Sid,:Qid)";
                        $stmt = $conn->prepare($sql);
                        $stmt->bindParam(':Sid',$Sid);
                        $stmt->bindParam(':Qid',$Quz->Qid);
                        $stmt->execute();
                    }
                }
            }
            $response = $answerinfo;
        }
        else if(isset($path[3])&& $path[3]=="updateAnswer"){
            $sql = "UPDATE student_answer SET Answer=:SAnswer WHERE id=:AWid";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':AWid',$data->AWid);
            $stmt->bindParam(':SAnswer',$data->SAnswer);
            if($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Record successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed .'];
            }
        }
        echo json_encode($response);

        break;

        case "DELETE":
            $sql = "DELETE FROM student_answer WHERE id = :id";
            $path = explode('/', $_SERVER['REQUEST_URI']);
    
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[3]);
    
            if($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to delete record.'];
            }
            echo json_encode($response);
            break;
}
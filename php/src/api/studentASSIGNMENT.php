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
        $sql = "";
        if(isset($path[3]) && $path[3]=="getAssignment"){
            $sql .= " SELECT subject.SJname,subject.SJid,evideo.Vname,assignment.Aid,user.Sname,user.Uid,assignment.Aname,assignment.NumQuests AS Fullscore,student_assignment.score
                      FROM subject 
                      INNER JOIN evideo ON subject.SJid = evideo.SJid 
                      INNER JOIN assignment on evideo.Vid = assignment.Vid
                      INNER JOIN student_assignment ON assignment.Aid = student_assignment.Aid 
                      INNER JOIN user ON student_assignment.Sid = user.Uid 
                      WHERE assignment.Vid=:Vid AND user.Uid=:Sid ";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':Vid', $path[4]);
            $stmt->bindParam(':Sid', $path[5]);
        }else if(isset($path[3]) && $path[3]=="getStudentAssigment"){
            $sql .= " SELECT subject.SJname,subject.SJid,evideo.Vname,assignment.Aid,user.Sname,user.Uid,assignment.Aname,assignment.NumQuests AS Fullscore,student_assignment.score
                      FROM subject 
                      INNER JOIN evideo ON subject.SJid = evideo.SJid 
                      INNER JOIN assignment on evideo.Vid = assignment.Vid
                      INNER JOIN student_assignment ON assignment.Aid = student_assignment.Aid 
                      INNER JOIN user ON student_assignment.Sid = user.Uid 
                      WHERE assignment.Aid=:Aid AND user.Uid=:Sid";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':Aid', $path[4]);
            $stmt->bindParam(':Sid', $path[5]);
        }else if(isset($path[3]) && $path[3]=="getAllStudentAssigment"){
            $sql .= " SELECT subject.SJname,subject.SJid,evideo.Vname,assignment.Aid,user.Sname,user.Uid,assignment.Aname,assignment.NumQuests AS Fullscore,student_assignment.score
                      FROM subject 
                      INNER JOIN evideo ON subject.SJid = evideo.SJid 
                      INNER JOIN assignment on evideo.Vid = assignment.Vid
                      INNER JOIN student_assignment ON assignment.Aid = student_assignment.Aid 
                      INNER JOIN user ON student_assignment.Sid = user.Uid 
                      WHERE assignment.Aid=:Aid";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':Aid', $path[4]);
        }else if(isset($path[3]) && $path[3]=="teacherGetAssignment"){
            $sql .= " SELECT subject.SJname,subject.SJid,evideo.Vname,assignment.Aid,user.Sname,user.Uid,assignment.Aname,assignment.NumQuests AS Fullscore,student_assignment.score
                      FROM subject 
                      INNER JOIN evideo ON subject.SJid = evideo.SJid 
                      INNER JOIN assignment on evideo.Vid = assignment.Vid
                      INNER JOIN student_assignment ON assignment.Aid = student_assignment.Aid 
                      INNER JOIN user ON student_assignment.Sid = user.Uid 
                      WHERE assignment.Vid=:Vid ";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':Vid', $path[4]);
        }else if(isset($path[3]) && $path[3]=="getQuestion"){
            $sql .= " SELECT assignment.Aid,assignment.Aname,assignment.NumQuests,assignment.startTime,assignment.endTime,assignment.countdown,
            user.Sname,question.Qid,question.Question,question.PIC,question.Qtype,question.A,question.B,question.C,question.D,question.E,question.Answer,student_answer.Answer AS Myanser
            FROM student_answer
            INNER JOIN user ON student_answer.Sid = user.Uid
            INNER JOIN question ON student_answer.Qid = question.Qid 
            INNER JOIN assignment ON question.Aid = assignment.Aid
            WHERE assignment.Aid = :Aid AND user.Uid = :Uid";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':Aid', $path[4]);
            $stmt->bindParam(':Uid', $path[5]);
        }
        $stmt->execute();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($data);
        break;

    case "POST":
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $data = json_decode(file_get_contents('php://input'));
        if(isset($path[3]) && $path[3] == "PostAssignment"){
            $sql = "INSERT INTO student_assignment(id,Sid,Aid,score) VALUES(null,:Sid,:Aid,:score)";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':Sid',$data->Sid);
            $stmt->bindParam(':Aid',$data->Aid);
            $stmt->bindParam(':score',$data->score);
        } 
        else if(isset($path[3]) && $path[3] == "setAnswer"){
            $data = json_decode(file_get_contents('php://input'));
            $sql = "UPDATE student_assignment SET score=:score WHERE Aid = :Aid AND Sid = :Sid";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':Sid',$data->Sid);
            $stmt->bindParam(':Aid',$data->Aid);
            $stmt->bindParam(':score',$data->score);
        }
        if ($stmt->execute()){
            $response = ($Sid.$Aid);
        }else{
            $response = ['status' => 0,'message' => 'something wrong.'];
        }
        echo json_encode($response);
        break;
     
}
?>
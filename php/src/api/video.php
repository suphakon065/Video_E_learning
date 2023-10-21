<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
include 'database.php';
$objDb = new database;
$conn = $objDb->connect();
$GetLastVideo = $objDb->GetLastVideo;
$GetLastAssignment = $objDb->GetLastAssignment;


$method = $_SERVER['REQUEST_METHOD'];
switch($method){

    case "GET":
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if(isset($path[3]) && $path[3]=="getVinfo"){
            $sql = "SELECT evideo.Vname,subject.SJname,evideo.Vinfo FROM evideo
            INNER JOIN subject ON evideo.SJid = subject.SJid
            WHERE Vid = :Vid";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':Vid', $path[4]);
            $stmt->execute();
            $videos = $stmt->fetch(PDO::FETCH_ASSOC);
        }
        else if(isset($path[3]) && $path[3]=="lastVid"){
            $lim = 1;
            $sql = "SELECT * FROM evideo ORDER BY Vid DESC LIMIT $lim";
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $videos = $stmt->fetch(PDO::FETCH_ASSOC);
        }
        else if(isset($path[3]) && $path[3]=="allcontent"){
            $sql = "SELECT evideo.Vid,evideo.SJid,evideo.Vname,evideo.Vlink,evideo.Enddate,evideo.Vinfo,evideo.Vtype,
            assignment.Aid,assignment.Aname,assignment.NumQuests,assignment.startTime,assignment.endTime,assignment.countdown,
            question.Qid,question.Question,question.PIC,question.Qtype,question.A,question.B,question.C,question.D,question.E,question.Answer 
            FROM question
            INNER JOIN assignment ON question.Aid = assignment.Aid
            INNER JOIN evideo ON assignment.Vid = evideo.Vid
            WHERE evideo.Vid = :Vid";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':Vid', $path[4]);
            $stmt->execute();
            $videos = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if($videos == null){
                $sql = "SELECT * FROM evideo WHERE Vid = :Vid";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':Vid', $path[4]);
                $stmt->execute();
                $videos = $stmt->fetch(PDO::FETCH_ASSOC);
            }

        }
        else if(isset($path[3]) && is_numeric($path[3])) {
            $sql = "SELECT * FROM evideo WHERE Vid = :Vid";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':Vid', $path[3]);
            $stmt->execute();
            $videos = $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            $sql = "SELECT * FROM evideo ";
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $videos = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        echo json_encode($videos);
        break;
        
    case "POST":
        $response;
        $data = json_decode(file_get_contents('php://input'));
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if(isset($path[3]) && $path[3]=="setType") {
            $sql = "UPDATE evideo SET Vtype = :Vtype WHERE Vid = :Vid";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':Vid', $path[4]);
            $stmt->bindParam(':Vtype',$data->Vtype);
            $stmt->execute();
        }else if(isset($path[3]) && $path[3]=="insertVideo") {
            $sql = "INSERT INTO evideo(Vid,SJid,Vname,Vlink,Enddate,Vinfo,Vtype) VALUES(null,:subject,:name,:link,:endate,:info,:type)";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':subject',$path[4]);
            $stmt->bindParam(':name',$data->Vname);
            $stmt->bindParam(':link',$data->Vlink);
            $stmt->bindParam(':endate',$data->Enddate);
            $stmt->bindParam(':info',$data->Vinfo);
            $stmt->bindParam(':type',$data->Vtype);
            if ($stmt->execute()){
                $video = json_decode(file_get_contents($GetLastVideo));
                foreach($data->Quiz as $Quiz){
                    $sql = "INSERT INTO assignment(Aid,Aname,Vid,NumQuests,startTime,endTime,countdown)VALUES(null,:Aname,:Vid,:NumQuests,:startTime,:endTime,:countdown)";
                    $stmt = $conn->prepare($sql);
                    $stmt->bindParam(':Aname',$Quiz->Aname);
                    $stmt->bindParam(':Vid',$video->Vid);
                    $stmt->bindParam(':NumQuests',$Quiz->NumQuests);
                    $stmt->bindParam(':startTime',$Quiz->startTime);
                    $stmt->bindParam(':endTime',$Quiz->endTime);
                    $stmt->bindParam(':countdown',$Quiz->countdown);
                    if ($stmt->execute()){
                        $assignment = json_decode(file_get_contents($GetLastAssignment));
                        foreach($Quiz->Question as $Question){
                            $sql = "INSERT INTO question(Qid,Aid,Question,PIC,Qtype,A,B,C,D,E,Answer) VALUES( null,:Aid,:Question,:PIC,:Qtype,:A,:B,:C,:D,:E,:Answer)";
                            $stmt = $conn->prepare($sql);
                            $stmt->bindParam(':Aid',$assignment->Aid);
                            $stmt->bindParam(':Question',$Question->Question);
                            $stmt->bindParam(':PIC',$Question->PIC);
                            $stmt->bindParam(':Qtype',$Question->Qtype);
                            $stmt->bindParam(':A',$Question->A);
                            $stmt->bindParam(':B',$Question->B);
                            $stmt->bindParam(':C',$Question->C);
                            $stmt->bindParam(':D',$Question->D);
                            $stmt->bindParam(':E',$Question->E);
                            $stmt->bindParam(':Answer',$Question->Answer);
                            if ($stmt->execute()){
                                $response = ['status' => 1,'message' => 'successfully.'];
                            }else{
                                $response = ['status' => 0,'message' => 'something wrong.'];
                            }
                        }
                    }
                }
            }
            echo json_encode($response);
        }else 
        if(isset($path[3]) && $path[3]=="updateVideo") {
            $response;
            $sql = "UPDATE evideo SET Vname=:name,Vlink=:link,Enddate=:endate,Vinfo=:info,Vtype=:type WHERE Vid = :Vid";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':Vid',$path[4]);
            $stmt->bindParam(':name',$data->Vname);
            $stmt->bindParam(':link',$data->Vlink);
            $stmt->bindParam(':endate',$data->Enddate);
            $stmt->bindParam(':info',$data->Vinfo);
            $stmt->bindParam(':type',$data->Vtype);
            if ($stmt->execute()){
                foreach($data->Quiz as $Quiz){
                    if($Quiz->Aid == null){
                        $sql = "INSERT INTO assignment(Aid,Aname,Vid,NumQuests,startTime,endTime,countdown)VALUES(null,:Aname,:Vid,:NumQuests,:startTime,:endTime,:countdown)";
                        $stmt = $conn->prepare($sql);
                        $stmt->bindParam(':Aname',$Quiz->Aname);
                        $stmt->bindParam(':Vid',$path[4]);
                        $stmt->bindParam(':NumQuests',$Quiz->NumQuests);
                        $stmt->bindParam(':startTime',$Quiz->startTime);
                        $stmt->bindParam(':endTime',$Quiz->endTime);
                        $stmt->bindParam(':countdown',$Quiz->countdown);
                        if ($stmt->execute()){
                            $assignment = json_decode(file_get_contents($GetLastAssignment));
                            foreach($Quiz->Question as $Question){
                                echo json_encode($assignment->Aid);
                                $sql = "INSERT INTO question(Qid,Aid,Question,PIC,Qtype,A,B,C,D,E,Answer) VALUES( null,:Aid,:Question,:PIC,:Qtype,:A,:B,:C,:D,:E,:Answer)";
                                $stmt = $conn->prepare($sql);
                                $stmt->bindParam(':Aid',$assignment->Aid);
                                $stmt->bindParam(':Question',$Question->Question);
                                $stmt->bindParam(':PIC',$Question->PIC);
                                $stmt->bindParam(':Qtype',$Question->Qtype);
                                $stmt->bindParam(':A',$Question->A);
                                $stmt->bindParam(':B',$Question->B);
                                $stmt->bindParam(':C',$Question->C);
                                $stmt->bindParam(':D',$Question->D);
                                $stmt->bindParam(':E',$Question->E);
                                $stmt->bindParam(':Answer',$Question->Answer);
                                if ($stmt->execute()){
                                    $response = ['status' => 1,'message' => 'successfully.'];
                                }else{
                                    $response = ['status' => 0,'message' => 'something wrong.'];
                                }
                            }
                        }
                        
                    }
                    else{
                        $sql = "UPDATE assignment SET Aname = :Aname,NumQuests=:NumQuests,startTime=:startTime,endTime=:endTime,countdown=:countdown WHERE Aid = :Aid";
                        $stmt = $conn->prepare($sql);
                        $stmt->bindParam(':Aid',$Quiz->Aid);
                        $stmt->bindParam(':Aname',$Quiz->Aname);
                        $stmt->bindParam(':NumQuests',$Quiz->NumQuests);
                        $stmt->bindParam(':startTime',$Quiz->startTime);
                        $stmt->bindParam(':endTime',$Quiz->endTime);
                        $stmt->bindParam(':countdown',$Quiz->countdown);
                        if ($stmt->execute()){
                            foreach($Quiz->Question as $Question){
                                if($Question->Qid == null){
                                    $sql = "INSERT INTO question(Qid,Aid,Question,PIC,Qtype,A,B,C,D,E,Answer) VALUES( null,:Aid,:Question,:PIC,:Qtype,:A,:B,:C,:D,:E,:Answer)";
                                    $stmt = $conn->prepare($sql);
                                    $stmt->bindParam(':Aid',$Quiz->Aid);
                                    $stmt->bindParam(':Question',$Question->Question);
                                    $stmt->bindParam(':PIC',$Question->PIC);
                                    $stmt->bindParam(':Qtype',$Question->Qtype);
                                    $stmt->bindParam(':A',$Question->A);
                                    $stmt->bindParam(':B',$Question->B);
                                    $stmt->bindParam(':C',$Question->C);
                                    $stmt->bindParam(':D',$Question->D);
                                    $stmt->bindParam(':E',$Question->E);
                                    $stmt->bindParam(':Answer',$Question->Answer);
                                }else{
                                    $sql = "UPDATE question SET Question=:Question,PIC=:PIC,Qtype=:Qtype,A=:A,B=:B,C=:C,D=:D,E=:E,Answer=:Answer WHERE Qid = :Qid";
                                    $stmt = $conn->prepare($sql);
                                    $stmt->bindParam(':Qid',$Question->Qid);
                                    $stmt->bindParam(':Question',$Question->Question);
                                    $stmt->bindParam(':PIC',$Question->PIC);
                                    $stmt->bindParam(':Qtype',$Question->Qtype);
                                    $stmt->bindParam(':A',$Question->A);
                                    $stmt->bindParam(':B',$Question->B);
                                    $stmt->bindParam(':C',$Question->C);
                                    $stmt->bindParam(':D',$Question->D);
                                    $stmt->bindParam(':E',$Question->E);
                                    $stmt->bindParam(':Answer',$Question->Answer);
                                }
                                if ($stmt->execute()){
                                    $response = ['status' => 1,'message' => 'successfully.'];
                                }else{
                                    $response = ['status' => 0,'message' => 'something wrong.'];
                                }
                            }
                        }
                    }
                }
            echo json_encode($Question);
        }
    }
        break;
        
        case "DELETE":
            $path = explode('/', $_SERVER['REQUEST_URI']);
            if($path[3]!=null){
                $sql = "DELETE FROM evideo WHERE Vid = :Vid";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':Vid', $path[3]);
                if($stmt->execute()) {
                    $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to delete record.'];
                }
            }
            echo json_encode($response);
            break;
}
import React from "react";
import { Button, Card, CardContent, Collapse, Grid, IconButton, OutlinedInput, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import DonutChart from "react-donut-chart";
import PropTypes from 'prop-types';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import TheatersIcon from '@mui/icons-material/Theaters';
import ClassIcon from '@mui/icons-material/Class';
import QuizIcon from '@mui/icons-material/Quiz';
import PersonIcon from '@mui/icons-material/Person';

import './Styles/ControlVideoStyle.css'
import HeaderBar from "./HeaderBarComponent";

import { Box } from "@mui/system";
import { Link, unstable_HistoryRouter, useLocation } from "react-router-dom";

import axios from "axios"
import { useState } from "react";
import { useEffect } from "react";
import { indigo } from "@mui/material/colors";
import { ScoreAllStyles, ScoreGridHeadStyles, ScoreGridStyles, ScoreGridTextFieldStyles, ScoreHeadeStyles, ScoreLineStyles, ScoreStyles, ScoreTableCellBlankStyles, ScoreTableCellINFOStyles, ScoreTableCellNameStyles, ScoreTableCellStyles, ScoreTheatersIconStyles, StudentScoreTitleStyles } from "./Styles/ScorepageStyles";
import { GetQuestions, getFullScore, getStudentScore, getSubject } from "../services/api";

function ScorePage(){
    const dataget =
    {
        Vid: 1,
        videoName: 'Video1',
        Subject: 'Data base',
        VideoTime: '1.56'
    }
    let datas = [
        {
            id:1,
            QuizID:1,
            StudentName:"Student 1",
            StudentID:"63011212031",
            QuizName:"ABC",
            Fullscore: 10,
            score: 5,
            status: 'ผ่าน',
        },
        {
            id:2,
            QuizID:1,
            StudentName:"Student 2",
            StudentID:"63011212056",
            QuizName:"CDE",
            Fullscore: 15,
            score: 5,
            status: 'ไม่ผ่าน',
        },
        {
            id:3,
            QuizID:1,
            StudentName:"Student 3",
            StudentID:"63011212032",
            QuizName:"Quiz 3",
            Fullscore: 20,
            score: 20,
            status: 'ผ่าน',
        },
        {
            id:4,
            QuizID:2,
            StudentName:"Student 4",
            StudentID:"63011212033",
            QuizName:"Quiz 4",
            Fullscore: 25,
            score: 20,
            status: 'ผ่าน',
        },
        {
            id:5,
            QuizID:2,
            StudentName:"Student 5",
            StudentID:"63011212034",
            QuizName:"Quiz 5",
            Fullscore: 30,
            score: 10,
            status: 'ไม่ผ่าน',
        },
    ]
    const location = useLocation();
    const prop = location.state
    // const Vid = prop.Vid;
    const VideoName = prop.VideoName;
    const subjectId = prop.SubjectId
    const [Vid, setVid] = useState(prop.Vid);
    const [subjectName, setSubjectName] = useState('');
    const [HisAss,setHisAss] = useState();
    const [search,setSearch] = useState("");
    const [fullscore,setFullscore] = useState(0);
    const [score, setScore] = useState(0);
    const [quizamount, setQuizamount] = useState(0);
    const [people,setPeople] = useState(0);
    useEffect(() => {
        console.log('ID:',prop);
        if(prop !== null && prop.D.length !==0){
            GetServices();
        }
        console.log('proppppp: ',prop);
    },[]);

    const getHistoryAssingment = async(Aidpass,Uidpass)=>{
        console.log("Aidpass: ",Aidpass," UidPass: ",Uidpass);
        const Questions = await GetQuestions(Aidpass, Uidpass);
        console.log('Questions: ', Questions);
        setHisAss(Questions);
        // await axios.get(`https://vel063.comsciproject.net/api/studentASSIGNMENT.php/getQuestion/${Aidpass}/${Uidpass}`).then(response => response.data)
        // .then((data)=>{
        //     console.log('HisAss: ',data);
        //     // if(data !== undefined){
        //     //     console.log('HisAss: ',data);
        //     //     setHisAss(data);
        //     // }
        // })
    }
    const GetServices = async()=>{
        const GetFullScore = await getFullScore(Vid);
        console.log('FullScoreAid: ',GetFullScore);
        
        const FullScore = GetFullScore.reduce((total,Score)=> total + Score.NumQuests, 0);
        console.log('FullScore: ', FullScore);
        setFullscore(FullScore);

        const SubjectName = await getSubject(subjectId);
        console.log('SubjectName: ',SubjectName[0].SJname);
        let SubjectNameStr = SubjectName[0].SJname;
        setSubjectName(SubjectNameStr);

        let TotalScore = 0;
        let UserAmount = 0
        for(const Assignment of GetFullScore){
            const GetAidScore = await getStudentScore(Assignment.Aid);
            const Scores = GetAidScore.reduce((total,Score)=> total + Score.score, 0);
            const ScoreAvg = Scores/GetAidScore.length;
            TotalScore += ScoreAvg;
            if(UserAmount < GetAidScore.length){
                UserAmount = GetAidScore.length;
            }
            console.log('AidScore: ',ScoreAvg);
        }
        // console.log('TotalScore: ',TotalScore/GetFullScore.length);
        setScore(parseInt(TotalScore/GetFullScore.length));
        setQuizamount(GetFullScore.length);
        setPeople(UserAmount);

    }

    return(
        <>
            <Grid container spacing={2} justifyContent={"center"} sx={ScoreGridStyles}>
                <Grid item xs={12} sm={12} md={12} lg={2}>
                    <Paper elevation={3}>
                        <Grid container align={'center'} sx={ScoreGridHeadStyles}>
                            <Grid item xs={6}>
                                <Typography variant="body1" sx={ScoreLineStyles}>คะแนนเฉลี่ย</Typography>
                                <Typography variant="h4" sx={{borderRight: 1,color: indigo[900],fontWeight:'bold'}}>{score}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1" sx={ScoreTheatersIconStyles}>คะแนนทั้งหมด</Typography>
                                <Typography variant="h4" sx={{color: indigo[900],fontWeight:'bold'}}>{fullscore}</Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={6}>
                    <Grid container spacing={2}>
                        <Grid item xs={6} sm={6} md={3} lg={3}>
                            <Card>
                                <CardContent 
                                    align={'center'}
                                    sx={{ 
                                        display: 'flex', 
                                        flexDirection: 'column', 
                                        justifyContent: 'center', 
                                        height: '90px'  
                                    }}
                                >
                                    <Typography variant="body1" sx={ScoreHeadeStyles}>ชื่อวิดีโอ</Typography>
                                    <Typography 
                                        variant="h6" 
                                        sx={{
                                            color:indigo[900],
                                            // overflow: 'hidden', 
                                            // whiteSpace: 'nowrap', 
                                            // textOverflow: 'ellipsis',
                                        }}
                                    >
                                        {VideoName}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={6} sm={6} md={3} lg={3}>
                            <Card>
                                <CardContent 
                                    align={'center'}
                                    sx={{ 
                                        display: 'flex', 
                                        flexDirection: 'column', 
                                        justifyContent: 'center', 
                                        height: '90px'  
                                    }}
                                >
                                    <Typography variant="body1" sx={ScoreHeadeStyles}>ชื่อวิชา</Typography>
                                    <Typography 
                                        variant="h6" 
                                        sx={{
                                            color:indigo[900],
                                            // overflow: 'hidden', 
                                            // whiteSpace: 'nowrap', 
                                            // textOverflow: 'ellipsis',
                                        }}
                                    >
                                        {subjectName}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={6} sm={6} md={3} lg={3}>
                            <Card>
                                <CardContent 
                                    align={'center'}
                                    sx={{ 
                                        display: 'flex', 
                                        flexDirection: 'column', 
                                        justifyContent: 'center', 
                                        height: '90px'  
                                    }}
                                >
                                    <Typography variant="body1" sx={ScoreHeadeStyles}>จำนวน Quiz</Typography>
                                    <Typography 
                                        variant="h6" 
                                        sx={{
                                            color:indigo[900],
                                            // overflow: 'hidden', 
                                            // whiteSpace: 'nowrap', 
                                            // textOverflow: 'ellipsis',
                                        }}
                                    >
                                        {quizamount} Quiz
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={6} sm={6} md={3} lg={3}>
                            <Card>
                                <CardContent 
                                    align={'center'}
                                    sx={{ 
                                        display: 'flex', 
                                        flexDirection: 'column', 
                                        justifyContent: 'center',
                                        alignContent: 'center',
                                        height: '90px'  
                                    }}
                                >
                                    <Typography variant="body1" sx={ScoreHeadeStyles}>จำนวนผู้ทำ</Typography>
                                    <Typography 
                                        variant="h6" 
                                        sx={{
                                            color:indigo[900],
                                            // overflow: 'hidden', 
                                            // whiteSpace: 'nowrap', 
                                            // textOverflow: 'ellipsis',
                                        }}
                                    >
                                        {people} คน
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container spacing={2} justifyContent={"center"} sx={{paddingBottom:10 }}>
                <Grid item xs={12} lg={8}>
                    <Paper elevation={3}>
                        <Grid container 
                            borderBottom={1} 
                            sx={{
                                display: 'flex', 
                                justifyContent: 'space-between',
                            }}
                        >
                            <Grid item>
                                <Typography variant="h6" sx={StudentScoreTitleStyles}>Student Score</Typography>
                            </Grid>
                            <Grid item sx={ScoreGridTextFieldStyles}>
                                <OutlinedInput
                                    name="searchName"
                                    placeholder="Search Quiz Name"
                                    value={search} 
                                    sx={{height:'40px',width:'300px'}}
                                    onChange={(e)=> setSearch(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Table aria-label='simple table'>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={ScoreTableCellStyles} align="left">Student</TableCell>
                                            <TableCell sx={ScoreTableCellStyles} align="center">Quiz Name</TableCell>
                                            <TableCell sx={ScoreTableCellStyles} align="center">Full score</TableCell>
                                            <TableCell sx={ScoreTableCellStyles} align="center">score</TableCell>
                                            <TableCell sx={ScoreTableCellStyles} align="center">Quiz History</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {prop.D.length!==0?
                                            prop.D.filter((item)=>{
                                                if(search.toLowerCase() === ''){
                                                    return item
                                                }else if(item.Aname.toLowerCase().search(search.toLowerCase()) >=0){
                                                    return item
                                                }
                                            }).map((data, i)=>{
                                                return(
                                                    <TableRow>
                                                        <TableCell align="left">
                                                            <Typography sx={ScoreTableCellNameStyles} variant="body1">{data.Sname}</Typography>
                                                            <Typography sx={ScoreTableCellNameStyles} variant="caption">{data.Uid}</Typography>
                                                        </TableCell>
                                                        <TableCell sx={ScoreTableCellNameStyles} align="center">{data.Aname}</TableCell>
                                                        <TableCell align="center">{data.Fullscore}</TableCell>
                                                        <TableCell align="center">{data.score}</TableCell>
                                                        <TableCell align="center">
                                                            <Button onClick={()=>{
                                                            }}>
                                                                <Link
                                                                    to="/QuizHistory" 
                                                                    style={{ textDecoration: 'none' }}
                                                                    state={data}
                                                                >
                                                                    <Typography sx={ScoreTableCellINFOStyles}>
                                                                        History
                                                                    </Typography>
                                                                </Link>
                                                            </Button></TableCell>{/*ต้องส่งข้อมูลเป็น Quiz id*/}
                                                    </TableRow>
                                                )
                                            }):<Typography variant="h6" sx={ScoreTableCellBlankStyles} align={"center"}>No Data</Typography>
                                        }
                                    </TableBody>
                                </Table>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}

export default ScorePage;

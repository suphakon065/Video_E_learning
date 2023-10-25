import React from "react";
import { Button, Collapse, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
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
import { Link, useLocation } from "react-router-dom";

import axios from "axios"
import { useState } from "react";
import { useEffect } from "react";
import { indigo } from "@mui/material/colors";
import { StudentScoreGridBorderStyles, StudentScoreGridHeadStyles, StudentScoreGridScoreStyles, StudentScoreGridStyles, StudentScoreGridTableStyles, StudentScoreHeadeStyles, StudentScoreLineStyles, StudentScoreScoreStyles, StudentScoreTableCellBlankStyles, StudentScoreTableCellButtonStyles, StudentScoreTableCellInfoStyles, StudentScoreTableCellNameStyles, StudentScoreTableCellStyles, StudentScoreTheatersIconStyles, StudentScoreTitleStyles } from "./Styles/StudentScorepageStyles";
import { GetQuestionsHistory } from "../services/api";

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
      const [ItemData,setItemData] = useState();
      const [infoQ,setinfoQ] = useState({
        subjectname: '-',
        videoname: '-',
      });
      const [HisAss,setHisAss] = useState();
      const [HissAssbool,setHisAssbool] = useState(true);
      const [search,setSearch] = useState("");
      const [fullscore,setFullscore] = useState(0);
      const [score, setScore] = useState(0);
      const [quizamount, setQuizamount] = useState(0);
      const [people,setPeople] = useState(0);
      useEffect(() => {
        // console.log('ID:',prop);
        if(prop !== null && prop.D.length !==0){
           handleFindScore(); 
        }
        console.log('proppppp:',prop);
      },[]);
      const getHistoryAssingment = async(Aidpass,Uidpass)=>{
        console.log("Aidpass: ",Aidpass," UidPass: ",Uidpass);
            // await axios.get(`https://vel063.comsciproject.net/api/studentASSIGNMENT.php/getQuestion/${Aidpass}/${Uidpass}`).then(response => response.data)
            // .then((data)=>{
            //     if(data !== undefined){
            //         console.log('HisAss:',data);
            //         setHisAss(data);
            //     }
            // })
        }
      const handleFindScore = ()=>{
        let stdscore = 0;
        let stdfullscore = 0;
        let stdquizamount = 0;
        if(prop.D !== undefined || prop.D.length !== 0){
            const infoItem = infoQ;
            infoItem.subjectname = prop.D[0].SJname;
            // infoItem.videoName = prop.D[1].Vname;
            let AnameChck = '';
            if(prop.D.length >0){
                
            }
            prop.D.map((data)=>{
                if(AnameChck === ''){
                    AnameChck = data.Aname;
                    stdquizamount++;
                }else if(AnameChck !== data.Aname){
                    AnameChck = data.Aname;
                    stdquizamount++;
                }
                stdscore += parseInt(data.score);
                stdfullscore += parseInt(data.Fullscore); 
            });
            const vnameItem =  prop.D[0].Vname;
            infoItem.videoname = prop.D[0].Vname;
            console.log('Score:',stdscore,' Full score:',stdfullscore,' Quiz amount: ',stdquizamount,' vid: ',dataget.Vid,' Videoname: ',vnameItem);
            setinfoQ(infoItem);
            setScore(stdscore);
            setFullscore(stdfullscore);
            setQuizamount(stdquizamount); 
            setPeople(prop.D.length);
        }
      }
        // const handleChange = async(e) =>{
        //     await setSearchvalue((prevState)=>({...prevState,[e.target.name] : e.target.value}));
        //     // console.log('input: ',input)
        // }
    return(
        <>
        {/* <HeaderBar/> */}
        <Grid container spacing={2} sx={StudentScoreGridStyles}>
            <Grid item xs={12} lg={2}>
                <Paper elevation={3}>
                    <Grid container align='center' sx={StudentScoreGridHeadStyles}>
                        <Grid item xs={6}>
                            <Typography variant="body1" sx={StudentScoreLineStyles}>คะแนนที่ได้</Typography>
                            <Typography variant="h3" sx={StudentScoreLineStyles}>{score}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" sx={StudentScoreLineStyles}>คะแนนทั้งหมด</Typography>
                            <Typography variant="h3" sx={StudentScoreLineStyles}>{fullscore}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}align={'center'}>
                        <Grid item xs={12}><Typography variant="body1" sx={StudentScoreLineStyles}>คะแนนรวมทั้งหมด</Typography></Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xs={12} lg={6}>
                <Paper elevation={3}>
                    <Grid container align={'center'} sx={StudentScoreGridTableStyles}>
                        <Grid item xs={3}>
                            <TheatersIcon color="primary" fontSize="large" sx={StudentScoreTheatersIconStyles}/>
                            <Typography variant="h6" sx={StudentScoreScoreStyles}>{infoQ.videoname}</Typography>
                            <Typography variant="body1" sx={StudentScoreHeadeStyles}>ชื่อวิดีโอ</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <ClassIcon color="primary" fontSize="large" sx={StudentScoreTheatersIconStyles}/>
                            <Typography variant="h6" sx={StudentScoreScoreStyles}>{infoQ.subjectname}</Typography>
                            <Typography variant="body1" sx={StudentScoreHeadeStyles}>ชื่อวิชา</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <QuizIcon color="primary" fontSize="large" sx={StudentScoreTheatersIconStyles}/>
                            <Typography variant="h6" sx={StudentScoreScoreStyles}>{quizamount}</Typography>
                            <Typography variant="body1" sx={StudentScoreHeadeStyles}>จำนวน Quiz</Typography>
                        </Grid>
                        {/* <Grid item xs={3}align={'center'}>
                            <QuizIcon color="primary" fontSize="large"/>
                            <Typography variant="h6" color='#1565c0' paddingBottom={1}>3</Typography>
                            <Typography variant="body1" color='#1565c0'>จำนวน Quiz</Typography>
                        </Grid> */}
                        <Grid item xs={3}>
                            <PersonIcon color="primary" fontSize="large" sx={StudentScoreTheatersIconStyles}/>
                            <Typography variant="h6" sx={StudentScoreScoreStyles}>{people}</Typography>
                            <Typography variant="body1" sx={StudentScoreHeadeStyles}>เสร็จไปแล้ว</Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
        <Grid container spacing={2} sx={StudentScoreGridScoreStyles}>
            <Grid item xs={12} lg={8}>
                <Paper elevation={3}>
                    <Grid container sx={StudentScoreGridBorderStyles}>
                        <Grid item xs={12} lg={9}>
                            <Typography variant="h4" sx={StudentScoreTitleStyles}>Student Score</Typography>
                        </Grid>
                        <Grid item xs={12} lg={3} sx={StudentScoreTitleStyles}>
                            <TextField 
                                fullWidth 
                                label="Search" 
                                id="fullWidth"
                                name="searchName"
                                value={search} 
                                onChange={(e)=> setSearch(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Table aria-label='simple table'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={StudentScoreTableCellStyles} align="left">Student</TableCell>
                                        <TableCell sx={StudentScoreTableCellStyles} align="center">Quiz Name</TableCell>
                                        <TableCell sx={StudentScoreTableCellStyles} align="center">Full score</TableCell>
                                        <TableCell sx={StudentScoreTableCellStyles} align="center">score</TableCell>
                                        <TableCell sx={StudentScoreTableCellStyles} align="center">info</TableCell>
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
                                        // return search.toLowerCase() === ''? item:item.QuizName.toLowerCase().includes(search);
                                    }).map((data, i)=>{
                                        // console.log('Hiss: ',HisAss)
                                        
                                        return(
                                            <TableRow>
                                                <TableCell align="left">
                                                    <Typography sx={StudentScoreTableCellNameStyles} variant="body1">{data.Sname}</Typography>
                                                    <Typography sx={StudentScoreTableCellNameStyles} variant="caption">{data.Uid}</Typography>
                                                    </TableCell>
                                                <TableCell sx={{ fontSize:{xs:8,lg:14} }} align="center">{data.Aname}</TableCell>
                                                <TableCell align="center">{data.Fullscore}</TableCell>
                                                <TableCell align="center">{data.score}</TableCell>
                                                <TableCell align="center">
                                                    <Button onClick={()=>{
                                                    }}>
                                                        <Link 
                                                        onClick={()=>{
                                                            if(HisAss === undefined){
                                                                getHistoryAssingment(data.Aid,data.Uid);
                                                            }
                                                        }}
                                                            to="/QuizHistory" 
                                                            style={StudentScoreTableCellButtonStyles}
                                                            state={data}
                                                        >
                                                            <Typography sx={StudentScoreTableCellInfoStyles}>info</Typography>
                                                        </Link>
                                                    </Button></TableCell>{/*ต้องส่งข้อมูลเป็น Quiz id*/}
                                            </TableRow>
                                        )
                                    }):<Typography variant="h6" sx={StudentScoreTableCellBlankStyles} align={"center"}>No Data</Typography>
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

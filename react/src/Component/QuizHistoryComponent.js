import { Box, FormControl, FormControlLabel, FormLabel, Paper, RadioGroup,Radio, Grid, TextField, Typography, Card, CardContent } from '@mui/material';
import * as React from 'react';
import CardQuestionMultiple from './CardQuestionMultipleComponent';
import CardQuestionShortAns from './MultipleRadioComponent';
import HeaderBar from './HeaderBarComponent';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

import QuizIcon from '@mui/icons-material/Quiz';
import TheatersIcon from '@mui/icons-material/Theaters';
import ClassIcon from '@mui/icons-material/Class';
import { indigo } from '@mui/material/colors';

import { QuizHistoryBoxStyles, QuizHistoryGridBodyStyles, QuizHistoryGridContentStyles, QuizHistoryGridHeadStyles, QuizHistoryGridTitleStyles, QuizHistoryPaperBodyStyles, QuizHistoryTheatersIconStyles, QuizHistoryTypographyHeadTitleStyles, QuizHistoryTypographyTitleStyles } from "./Styles/QuizHistoryPageStyles";
import { GetQuestions } from '../services/api';
import { ScoreHeadeStyles } from './Styles/ScorepageStyles';

function QuizHistory() {
  const location = useLocation();
  const data = location.state;
  const [questData,setQuestData] = useState();
  React.useEffect(()=>{

    if(questData === undefined){
      getHistoryAssingment(data.Aid,data.Uid);
    }
  },[]);
  const getHistoryAssingment = async(Aidpass,Uidpass)=>{
    const Questions = await GetQuestions(Aidpass, Uidpass);
    setQuestData(Questions);
    console.log('Questions: ',Questions);
  }
  return (
    <>
      {/* <HeaderBar/> */}
      <Grid container spacing={2} sx={QuizHistoryGridHeadStyles}>
        <Grid item xs={6} sm={6} md={6} lg={2}>
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
                {data.Vname}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={2}>
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
                {data.SJname}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{justifyContent: "center",marginBottom:3}}>
        <Grid item xs={12} sm={12} md={12} lg={4}>
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
              <Typography variant="body1" sx={ScoreHeadeStyles}>ชื่อแบบทดสอบ</Typography>
              <Typography 
                variant="h6" 
                sx={{
                  color:indigo[900],
                  // overflow: 'hidden', 
                  // whiteSpace: 'nowrap', 
                  // textOverflow: 'ellipsis',
                }}
              >
                {data.Aname}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={QuizHistoryGridBodyStyles}>
        <Grid item xs={12} lg={4}>
          <Paper elevation={3} sx={QuizHistoryPaperBodyStyles}>
            <Grid container sx={QuizHistoryGridContentStyles}>
              <Grid item xs={0} lg={2}></Grid>
              <Grid item xs={12} lg={6}>
                <FormControl FormControl>
                  {questData!==undefined?
                  questData.map((element)=>(
                    <CardQuestionMultiple {...element}/>
                  )):null}
                </FormControl>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default QuizHistory;
import { Box, Button, Checkbox, Fab, FormControl, Grid, IconButton, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SaveIcon from '@mui/icons-material/Save';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import {v4 as uuidv4} from 'uuid'

import CreateQuestion from './CreateQuestionComponent';
import HeaderBar from './HeaderBarComponent';
import axios from 'axios';
import * as XLSX from 'xlsx/xlsx.mjs';
import { indigo } from '@mui/material/colors';
import { CreeateQuizSubTitleStyles } from './Styles/CreateQuizPageStyles';

const boxDefault = {
  padding: 2,
  m: 1,
  display: "flex",
  marginBottom: -4
}


function CreateExelQuiz(props) {
  const [question,setQuestion]= useState([]);
  const [excelData,setExcelData] = useState();
  const [errorCheck ,setErrorCheck]= useState(false);
  const [startTime,setStartTime] = useState({
    h: 0,
    m: 0,
  });
  const [endTime,setEndTime] = useState({
    h: 0,
    m: 0,
  });
  const [coundown,setCoundown] = useState({
    h: 0,
    m: 0,
  });
  const [NumQuest,setNumQuest] = useState(0);
const [Quiz,setQuiz]=useState({
  Quizname: '',
  StartTime: {h: 0, m: 0},
  StopTime: {h: 0, m: 0},
  coundown: {h: 0, m: 0},
  NumQuest: 0,
  Question: question
});

const handleChangeQuiz = (e) => {
  const { name, value } = e.target;

  const timeFields = ['StartTime', 'StopTime', 'coundown'];
  const [parentName, childName] = name.split('.');
  if (timeFields.includes(parentName)) {
    setQuiz((prevQuiz) => ({
      ...prevQuiz,
      [parentName]: {
        ...prevQuiz[parentName],
        [childName]: parseInt(value, 10),
      },
    }));
  } else {
    setQuiz((prevQuiz) => ({
      ...prevQuiz,
      [name]: value,
    }));
  }
};

const handleSave=async()=>{
  let arrayQuest = [];
  if(excelData !== undefined){
    console.log('excelData: ',excelData);
    excelData.slice(1).map(async(col, i)=>{
      if(col.length !== 0){
        let itemType = false;

        let itemAnsA = false;
        let itemAnsB = false;
        let itemAnsC = false;
        let itemAnsD = false;
        let itemAnsE = false;

        switch(col[7]){
          case 'Mutiple':
            itemType = true
            break;
          case 'Short answer':
            itemType = false
            break;
          case undefined:
            console.log('undefined');
            break;
        }
        switch(col[6]){
          case col[1]:
            itemAnsA = true;
            itemAnsB = false;
            itemAnsC = false;
            itemAnsD = false;
            itemAnsE = false;
            break;
          case col[2]:
            itemAnsA = false;
            itemAnsB = true;
            itemAnsC = false;
            itemAnsD = false;
            itemAnsE = false;
            break;
          case col[3]:
            itemAnsA = false;
            itemAnsB = false;
            itemAnsC = true;
            itemAnsD = false;
            itemAnsE = false;
            break;
          case col[4]:
            itemAnsA = false;
            itemAnsB = false;
            itemAnsC = false;
            itemAnsD = true;
            itemAnsE = false;
            break;
          case col[5]:
            itemAnsA = false;
            itemAnsB = false;
            itemAnsC = false;
            itemAnsD = false;
            itemAnsE = true;
            break;
          case undefined:
            console.log('undefined Ans');
            break;
        };
        let Ans = '';
        for (let i = 1; i <= 5; i++){
          if(col[6]==col[i]){
            Ans = excelData[0][i];
          }
        }

        const QuestionData = {
          Question: col[0],
          Qtype:itemType,
          PIC: null,
          FileImg: null,
          image: null,
          A: col[1],
          B: col[2],
          C: col[3],
          D: col[4],
          E: col[5],
          Answer: Ans,
        }
        console.log('QuestionData: ', QuestionData );
        arrayQuest.push(QuestionData);
      }
    })
  }
  console.log('excelDataFinish: ',arrayQuest);
  await setQuiz((prevItem)=>({...prevItem,
    StartTime: Quiz.StartTime,
    StopTime: Quiz.StopTime,
    coundown: Quiz.coundown,
    NumQuest: Quiz.NumQuest,
    Question: arrayQuest,
  }));
  if(arrayQuest.length >= Quiz.NumQuest){
    console.log('excelDataFinish1: ',arrayQuest.length);
    setErrorCheck(false);
    props.onClick(Quiz,arrayQuest);
  }else{
    setErrorCheck(true);
  }
  
  
}

  return (
    <>
      {/* <HeaderBar/> */}
      <Box 
          alignItems="center" 
          justifyContent="center" 
          sx={boxDefault}
      >
        <Grid container spacing={3} justifyContent={'center'}>
          <Grid item xs={12} lg={8}>
            <Paper elevation={3} sx={{padding:5}}>
              <Grid container paddingBottom={3}>
                <Grid item xs={12}>
                    <TextField fullWidth
                      type={'text'}
                      size={"small"}
                      placeholder='Quiz name' 
                      value={Quiz.Quizname}
                      name='Quizname'
                      onChange={handleChangeQuiz}
                    />
                  </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6} lg={3}
                  sx={{borderRight:{
                    xs:0,
                    sm:1,
                    md:1,
                    lg:1,
                  }}}
                >
                  <Grid container sx={CreeateQuizSubTitleStyles}>
                    <Grid item>
                      <Typography fontWeight="bold" variant="subtitle2">Start time</Typography>
                    </Grid>
                    <Grid item xs={4}></Grid>
                  </Grid>
                  <Grid container spacing={1}>
                    <Grid item xs={5}>
                      <TextField 
                          className='TextfieldBorderRadius'
                          variant="standard"
                          type={'number'}
                          value = {Quiz.StartTime.h}
                          name='StartTime.h'
                          onChange={handleChangeQuiz}
                      />
                      <Typography variant="caption"textAlign="center">Hours</Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography variant="body2"textAlign="center" fontWeight={'bold'} >:</Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <TextField fullWidth
                        className='TextfieldBorderRadius'
                        variant="standard"
                        type={'number'}
                        value = {Quiz.StartTime.m}
                        name='StartTime.m'
                        onChange={handleChangeQuiz}
                      />
                        <Typography variant="caption"textAlign="center">Mins</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6} lg={3}
                  sx={{borderRight:{
                    xs:0,
                    sm:0,
                    md:0,
                    lg:1,
                  }}}
                >
                  <Grid container>
                    {/* <Grid item xs={2} lg={4}></Grid> */}
                    <Grid item>
                      <Typography fontWeight="bold" variant="subtitle2">End time</Typography>
                    </Grid>
                    <Grid item xs={4}></Grid>
                  </Grid>
                  <Grid container spacing={1}>
                    <Grid item xs={5}>
                      <TextField 
                        className='TextfieldBorderRadius'
                        variant="standard"
                        type={'number'}
                        value = {Quiz.StopTime.h}
                        name='StopTime.h'
                        onChange={handleChangeQuiz}
                      />
                      <Typography variant="caption"textAlign="center">Hours</Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography variant="body2"textAlign="center" fontWeight={'bold'} >:</Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <TextField fullWidth
                        className='TextfieldBorderRadius'
                        variant="standard"
                        type={'number'}
                        value = {Quiz.StopTime.m}
                        name='StopTime.m'
                        onChange={handleChangeQuiz}
                      />
                        <Typography variant="caption"textAlign="center">Mins</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6} lg={3}
                  sx={{borderRight:{
                    xs:0,
                    sm:1,
                    md:1,
                    lg:1,
                  }}}
                >
                  <Grid container>
                    {/* <Grid item xs={2} lg={4}></Grid> */}
                    <Grid item xs={6} lg={4}>
                      <Typography fontWeight="bold" variant="subtitle2">Coundown</Typography>
                    </Grid>
                    <Grid item xs={4}></Grid>
                  </Grid>
                  <Grid container spacing={1}>
                    <Grid item xs={5}>
                      <TextField 
                        className='TextfieldBorderRadius'
                        variant="standard"
                        type={'number'}
                        value = {Quiz.coundown.h}
                        name='coundown.h'
                        onChange={handleChangeQuiz}
                      />
                      <Typography variant="caption"textAlign="center">Hours</Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography variant="body2"textAlign="center" fontWeight={'bold'} >:</Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <TextField fullWidth
                        className='TextfieldBorderRadius'
                        variant="standard"
                        type={'number'}
                        value = {Quiz.coundown.m}
                        name='coundown.m'
                        onChange={handleChangeQuiz}
                      />
                        <Typography variant="caption"textAlign="center">Mins</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                  <Grid container sx={CreeateQuizSubTitleStyles}>
                    <Grid item >
                      <Typography fontWeight="bold" variant="subtitle2">จำนวนคำถามที่แสดง</Typography>
                    </Grid>
                    <Grid item xs={4}></Grid>
                  </Grid>
                  <Grid container spacing={1}>
                  <Grid item xs={6} sm={11}>
                    <TextField fullWidth
                      error={errorCheck}
                      className='TextfieldBorderRadius'
                      variant="standard"
                      type={'number'}
                      value = {Quiz.NumQuest}
                      name='NumQuest'
                      onChange={handleChangeQuiz}
                    />
                  </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} lg={8} justifyContent={'center'} paddingBottom={3}>
            <Paper elevation={3} sx={{padding:{xs:1,lg:8}}}>
              <Grid container style={{alignItems: 'center',marginBottom: 20}}>
                <Grid xs={12}>
                  <FormControl fullWidth>
                    <TextField
                      size={"small"}
                      id="outlined-basic" 
                      variant='outlined'
                      placeholder='Question'
                      type='file'
                      onChange={async(e)=>{
                        const file = e.target.files[0];
                        const data = await file.arrayBuffer();
                        const workbook = XLSX.read(data);
                        const wsname = workbook.SheetNames[0];
                        const ws = workbook.Sheets[wsname];
                        const dataParse = XLSX.utils.sheet_to_json(ws,{header:1});
                        setExcelData(dataParse);
                        console.log('Workbook:',dataParse);
                      }}
                    />
                    </FormControl>
                  </Grid>
                </Grid>
            </Paper>

            <Grid container paddingTop={3}>
              <Grid item xs={8} lg={10}></Grid>
              <Grid item xs={4} lg={2}>
                <Button fullWidth
                  sx={{borderRadius: '30px',bgcolor: indigo[900]}} 
                  variant="contained"
                  startIcon={<SaveIcon/>}
                  onClick={handleSave}
                  // startIcon={<SaveIcon/>}
                >
                  <Typography variant="caption" textAlign="left" padding={1}>Save</Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>  
  );
}

export default CreateExelQuiz;

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
import { useEffect } from 'react';
import config from '../Storage/config';
import { CreeateQuizBoxStyles, CreeateQuizFabPlusButtonStyles, CreeateQuizFormControllStyles, CreeateQuizGridBodyStyles, CreeateQuizGridCoiseStyles, CreeateQuizGridCrossStyles, CreeateQuizGridInputStyles, CreeateQuizGridPlusButtonStyles, CreeateQuizGridQuizTypeStyles, CreeateQuizGridStyles, CreeateQuizGridblankStyles, CreeateQuizPlusButtonStyles, CreeateQuizQuizNameStyles, CreeateQuizSaveButtonStyles, CreeateQuizSubTitleStyles, CreeateQuizTitleStyles, CreeateQuizTypographySaveButtonStyles, CreeateQuizTypographySubTitleStyles, CreeateQuizTypographyTitleStyles, CreeateQuizTypographycaptionStyles, CreeateQuizblankStyles, CreeateQuizpaperBodyStyles, CreeateQuizpaperStyles } from './Styles/CreateQuizPageStyles';


function CreateQuiz(props) {
  const questTypeMutiple = config.questTypeMutiple;
  const questTypeShortAns = config.questTypeShortAns;
  const [question,setQuestion]= useState([]);
  const [Quiz,setQuiz]=useState({
    Quizname: '',
    StartTime: {h: 0, m: 0},
    StopTime: {h: 0, m: 0},
    coundown: {h: 0, m: 0},
    NumQuest: 0,
    Question: question
  });
  const handleChangeQuest = (e,i) =>{
    if(question.length !== 0){
      const {name, value} = e.target;
      const quests = [...question];

      console.log('Name: ',name);
      console.log('Key: ',i);
      console.log('Value: ',value);
      console.log(' ');
      if(name === 'Question'){
        quests[i].Question = value
      }else if(name === 'A'){
        quests[i].A = value;
      }else if(name === 'B'){
        quests[i].B = value;
      }else if(name === 'C'){
        quests[i].C = value;
      }else if(name === 'D'){
        quests[i].D = value;
      }else if(name === 'E'){
        quests[i].E = value;
      }else if(name === 'Qtype'){
        quests[i].Qtype = value;
      }
      setQuestion(quests);
    }
  }
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

  const handleChangeCheckbox = (e,i) =>{
    if(question.length !== 0){
      const {name } = e.target;
      const quests = [...question];

      const checkboxMappings = {A:'A',B:'B',C:'C',D:'D',E:'E'};
      if(checkboxMappings.hasOwnProperty(name)){
        const checkboxName = checkboxMappings[name];
        quests[i].Answer = quests[i].Answer === checkboxName ? '' : checkboxName;
        setQuestion(quests);
      }
      console.log('Ans: ',quests[i].Answer)
    }
  }

  const handleChangeImg = (e,i) =>{
    if(question.length !== 0){
      const files = e.target.files
      const quests = [...question];

      const fileImg = Array.from(files).map((file)=>URL.createObjectURL(file));
      Array.from(files).map((file)=>URL.revokeObjectURL(file));

      let rand = Math.floor(Math.random()* 10000);
      const formData = new FormData();
      formData.append('avatar',files[0]);

      quests[i].PIC = rand.toString()+'-'+files[0].name;
      quests[i].FileImg = formData
      quests[i].image = fileImg;

      setQuestion(quests);
    }
    
  }
  const handleAddQuest = () =>{
    console.log('Q: ',Quiz);
    const questDataTest = {
      Question:'',
      Qtype: null,
      PIC: null,
      FileImg: null,
      image: null,
      A:'',
      B:'',
      C:'',
      D:'',
      E:'',
      Answer:'',
    }
    setQuestion((prevItem)=>{
      return [...prevItem,questDataTest]
    })
  }
  const handleSave=async()=>{
    console.log('Quiz: ',question);
    props.onClick(Quiz,question);
  }

  return (
    <>
      <Box sx={CreeateQuizBoxStyles}>
        <Grid container spacing={3} sx={CreeateQuizGridStyles}>
          <Grid item xs={12} lg={8}>
            <Paper elevation={3} sx={CreeateQuizpaperStyles}>
              <Grid container sx={CreeateQuizQuizNameStyles}>
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
                      <Typography sx={CreeateQuizTypographyTitleStyles} variant="subtitle2">Start time</Typography>
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
                      <Typography variant="caption" sx={CreeateQuizTypographycaptionStyles} >Hours</Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography variant="body2" sx={CreeateQuizTypographySubTitleStyles} >:</Typography>
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
                        <Typography variant="caption" sx={CreeateQuizTypographycaptionStyles}>Mins</Typography>
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
                  <Grid container sx={CreeateQuizSubTitleStyles}>
                    <Grid item >
                      <Typography sx={CreeateQuizTypographyTitleStyles} variant="subtitle2">End time</Typography>
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
                      <Typography variant="caption" sx={CreeateQuizTypographycaptionStyles}>Hours</Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography variant="body2" sx={CreeateQuizTypographySubTitleStyles} >:</Typography>
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
                        <Typography variant="caption" sx={CreeateQuizTypographycaptionStyles}>Mins</Typography>
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
                  <Grid container sx={CreeateQuizSubTitleStyles}>
                    <Grid item xs={6} lg={4}>
                      <Typography variant="subtitle2" sx={CreeateQuizTypographyTitleStyles}>Coundown</Typography>
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
                      <Typography variant="caption" sx={CreeateQuizTypographycaptionStyles}>Hours</Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography variant="body2" sx={CreeateQuizTypographySubTitleStyles} >:</Typography>
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
                      <Typography variant="caption" sx={CreeateQuizTypographycaptionStyles}>Mins</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                  <Grid container sx={CreeateQuizSubTitleStyles}>
                    <Grid item >
                      <Typography variant="subtitle2" sx={CreeateQuizTypographyTitleStyles}>จำนวนคำถามที่แสดง</Typography>
                    </Grid>
                    <Grid item xs={4}></Grid>
                  </Grid>
                  <Grid container spacing={1}>
                    <Grid item xs={11}>
                      <TextField fullWidth
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
          <Grid item xs={12} lg={8} sx={CreeateQuizGridBodyStyles}>
            <Paper elevation={3} sx={CreeateQuizpaperBodyStyles}>
              <Grid container spacing={3}>
                {question.map((element,i) =>{
                  const datas = {
                    element,
                    i,
                  }
                  return(
                    <>
                      <Grid item xs={8} lg={11} sx={CreeateQuizblankStyles}></Grid>
                      <Grid item xs={1} sx={CreeateQuizGridCrossStyles}>
                          <FormControl onClick={()=>{
                            const quest = [...question]
                            quest.splice(datas.i,1);
                            setQuestion(quest);
                          }}>
                              <IconButton aria-label="delete">
                                  <CloseIcon fontSize='small' />
                              </IconButton>
                          </FormControl>
                      </Grid>
                      {question[datas.i].image === null?
                        <Grid container style={CreeateQuizGridInputStyles}>
                          <Grid xs={12}>
                            <FormControl fullWidth>
                              <TextField
                                key={datas.i}
                                size={"small"}
                                id="outlined-basic" 
                                variant='outlined'
                                placeholder='Question'
                                type='file'
                                name='image'
                                onChange={(e)=>{
                                  handleChangeImg(e,datas.i);
                                }}
                              />
                            </FormControl>
                          </Grid>
                        </Grid>:
                        <Grid container style={{alignItems: 'center',marginBottom: 20}}>
                          <Grid xs={3}></Grid>
                          <Grid xs={6} align={'center'}>
                            <img 
                              src={question[datas.i].image}
                              width='50%'
                              height='50%'
                            />
                          </Grid>
                          <Grid xs={1}>
                            <FormControl 
                              onClick={()=>{
                                const quest = [...question];
                                quest[datas.i].image = null;
                                setQuestion(quest);
                              }}
                            >
                                <IconButton aria-label="delete">
                                    <CloseIcon fontSize='small' />
                                </IconButton>
                            </FormControl>
                          </Grid>
                          <Grid xs={2}></Grid>
                        </Grid>
                      }
                      <Grid container style={CreeateQuizGridQuizTypeStyles}>
                          {/* ----------------------------------------------------------------------------------- */}
                        <Grid item xs={0} lg={8} sx={CreeateQuizGridblankStyles}></Grid>
                        <Grid item xs={11} lg={4}>
                          <FormControl sx={CreeateQuizFormControllStyles} size='small' fullWidth>
                            <InputLabel id="demo-select-small-label">Type</InputLabel>
                              <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={question[datas.i].Qtype!==null?question[datas.i].Qtype:null}
                                name='Qtype'
                                onChange={(e)=>{
                                  handleChangeQuest(e,datas.i);
                                }}
                              >
                                <MenuItem value={questTypeMutiple}>Multiple </MenuItem>
                                <MenuItem value={questTypeShortAns}>Short Answer</MenuItem>
                              </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                      <Grid container spacing={3}  style={CreeateQuizGridCoiseStyles}>
                        <Grid item xs={12}>
                          <FormControl fullWidth>
                            <TextField
                              key={datas.i}
                              size={"small"}
                              id="outlined-basic" 
                              variant='outlined'
                              placeholder='Question'
                              name='Question'
                              value={question[datas.i].Question}
                              onChange={(e)=>{
                                handleChangeQuest(e,datas.i);
                              }}
                            />
                          </FormControl>
                        </Grid>
                          <Grid item xs={10} lg={11}>
                              <FormControl fullWidth>
                                  <TextField 
                                      key={datas.i}
                                      size={"small"}
                                      id="outlined-basic" 
                                      variant='outlined'
                                      placeholder='Choice1'
                                      name='A'
                                      value={question[datas.i].A}
                                      onChange={(e)=>{
                                        handleChangeQuest(e,datas.i);
                                      }}
                                  />
                              </FormControl>
                          </Grid>
                          <Grid item xs={1}>
                              <FormControl>
                                  <Checkbox 
                                    disabled={!question[datas.i].Qtype}
                                    checked={question[datas.i].Answer==='A'?true:false}
                                    color="success"
                                    name='A'
                                    onChange={(e)=>{
                                      handleChangeCheckbox(e,datas.i);
                                    }}
                                  />
                              </FormControl>
                          </Grid>
                          <Grid item xs={10} lg={11}>
                              <FormControl fullWidth>
                                  <TextField 
                                    key={datas.i}
                                    size={"small"}
                                    variant='outlined'
                                    placeholder='Choice2'
                                    name='B'
                                    value={question[datas.i].B}
                                    onChange={(e)=>{
                                      handleChangeQuest(e,datas.i);
                                    }}
                                  />
                              </FormControl>
                          </Grid>
                          <Grid item xs={1}>
                              <FormControl>
                                  <Checkbox 
                                    disabled={!question[datas.i].Qtype}
                                    checked={question[datas.i].Answer==='B'?true:false}
                                    color="success"
                                    name='B'
                                    onChange={(e)=>{
                                      handleChangeCheckbox(e,datas.i);
                                    }}
                                  />
                              </FormControl>
                          </Grid>
                          <Grid item xs={10} lg={11}>
                              <FormControl fullWidth>
                                  <TextField 
                                    key={datas.i}
                                    size={"small"}
                                    variant='outlined'
                                    placeholder='Choice3'
                                    name='C'
                                    value={question[datas.i].C}
                                    onChange={(e)=>{
                                      handleChangeQuest(e,datas.i);
                                    }}
                                  />
                              </FormControl>
                          </Grid>
                          <Grid item xs={1}>
                              <FormControl>
                                <Checkbox 
                                  disabled={!question[datas.i].Qtype}
                                  checked={question[datas.i].Answer==='C'?true:false}
                                  color="success" 
                                  name='C'
                                  onChange={(e)=>{
                                    handleChangeCheckbox(e,datas.i);
                                  }}
                                />
                              </FormControl>
                          </Grid>
                          <Grid item xs={10} lg={11}>
                              <FormControl fullWidth>
                                  <TextField 
                                    key={datas.i}
                                    size={"small"}
                                    variant='outlined'
                                    label="Choice4"
                                    placeholder='Choice4'
                                    name='D'
                                    value={question[datas.i].D}
                                    onChange={(e)=>{
                                      handleChangeQuest(e,datas.i);
                                    }}
                                  />
                              </FormControl>
                          </Grid>
                          <Grid item xs={1}>
                              <FormControl>
                                  <Checkbox 
                                    disabled={!question[datas.i].Qtype}
                                    checked={question[datas.i].Answer==='D'?true:false}
                                    color="success"
                                    name='D'
                                    onChange={(e)=>{
                                      handleChangeCheckbox(e,datas.i);
                                    }}
                                  />
                              </FormControl>
                          </Grid>
                          <Grid item xs={10} lg={11}>
                              <FormControl fullWidth>
                                  <TextField 
                                    key={datas.i}
                                    size={"small"}
                                    variant='outlined'
                                    label="Choice5"
                                    placeholder='Choice5'
                                    name='E'
                                    value={question[datas.i].E}
                                    onChange={(e)=>{
                                      handleChangeQuest(e,datas.i);
                                    }}
                                  />
                              </FormControl>
                          </Grid>
                          <Grid item xs={1}>
                              <FormControl>
                                  <Checkbox 
                                    disabled={!question[datas.i].Qtype}
                                    checked={question[datas.i].Answer==='E'?true:false}
                                    color="success" 
                                    name='E'
                                    onChange={(e)=>{
                                      handleChangeCheckbox(e,datas.i);
                                    }}
                                  />
                              </FormControl>
                          </Grid>
                      </Grid>
                    </>
                  )
                })}
                <Grid item xs={12} sx={CreeateQuizGridPlusButtonStyles}>
                  <Grid container sx={CreeateQuizGridPlusButtonStyles}>
                    <Fab 
                      sx={CreeateQuizFabPlusButtonStyles}
                      color="primary" 
                      aria-label="add"  
                      onClick = {handleAddQuest} 
                    >
                      <AddIcon />
                    </Fab>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
            <Grid container paddingTop={3}>
              <Grid item xs={8} lg={10}></Grid>
              <Grid item xs={4} lg={2}>
                <Button fullWidth
                  sx={CreeateQuizSaveButtonStyles} 
                  variant="contained"
                  startIcon={<SaveIcon/>}
                  onClick={handleSave}
                >
                  <Typography variant="caption" sx={CreeateQuizTypographySaveButtonStyles}>Save</Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>  
  );
}

export default CreateQuiz;

import { Button, CardMedia, Dialog, DialogContent, Grid, Icon, Switch, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';
import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import CreateQuiz from './CreateQuizComponent';
import EditQuiz from './EditQuizComponent';
import CreateExelQuiz from './CreateExcelQuizComponent';
import HeaderBar from "./HeaderBarComponent";


import UploadIcon from '@mui/icons-material/Upload';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import axios from 'axios';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { indigo } from '@mui/material/colors';
import config from '../Storage/config';
import { useEffect } from 'react';
import { CreateVideoQuizBottomStyles, CreateVideoQuizBoxStyles, CreateVideoQuizCardMediaVideoStyles, CreateVideoQuizCreateStyles, CreateVideoQuizGridCreateQuizStyles, CreateVideoQuizGridSaveQuizStyles, CreateVideoQuizGridTitleNameStyles, CreateVideoQuizGridURLStyles, CreateVideoQuizImportButtonStyles, CreateVideoQuizLinkStyles, CreateVideoQuizRadioButtonStyles, CreateVideoQuizSaveStyles, CreateVideoQuizTableBoxStyles, CreateVideoQuizTableHeadBoxStyles, CreateVideoQuizTextFileStyles, CreateVideoQuizTypographyTitleNameStyles, CreateVideoQuizVideoStatusStyles } from './Styles/CreateVideoQuizPageStyles';
import { DeleteQuiz, UploadQuestImg, postUpdateVideoQuiz } from '../services/api';
import EditQuizEditPage from './EditQuizEditPageComponent';

function EditVideo() {
  const VideoTypeData = config.VideoType;
  const location = useLocation();
  const SJId = location.state;
  const [aidValues,setAidValues] = useState();
  const [SJIDvalue,setSJIDvalue] = useState(null);
  const [Vidvalue,setVidvalue] = useState(null);
  const [dateValue, setDateValue] = useState(null);
  const [dialogstate,setDialogstate] = useState(false)
  const [exceldialogstate,setExceldialogstate] = useState(false)
  const [Editdialogstate,setEditDialogstate] = useState(false)
  const [videoImage,setVideoImage] = useState('');
  const [EditData,setEditData] = useState();
  const navigate = useNavigate();
  const [Data,setData] = useState({
    SjId: SJId,
    Vname:'',
    Vinfo:'',
    Vlink:'',
    Vtype:true,
    Quiz: [],
  });
  useEffect(()=>{
    console.log('Element:',SJId);
    if(SJIDvalue === null){
    };
    console.log('SJIDfirst: ',SJId);
    if(SJId.Vid !== undefined && Data.Vname===''){
      axios.get(`https://vel063.comsciproject.net/api/video.php/allcontent/${SJId.Vid}`).then(response => response.data)
      .then((data)=>{
        if(data.length !== 0){
          console.log('Data: ',data.length);
          if(data.length === undefined){
            setData({
              ...Data,
              Vname: data.Vname,
              Vinfo: data.Vinfo,
              Vlink: data.Vlink,
              Vtype: data.Vtype,
            });
            handleImportVideo(data.Vlink);
            setDateValue(new Date(data.Enddate));
          }else{
            const groupedData = {};
            data.map((quest)=>{
              const {Aid, ...rest} = quest;
              if(!groupedData[Aid]){
                groupedData[Aid] = [];
              }
              groupedData[Aid].push(rest);
            });
            console.log('groupedData0: ',groupedData);
            const QuestionGroup = Object.entries(groupedData).map(([key, group]) => ({
              id: key,
              data: group,
            }));
            console.log('groupedData: ',QuestionGroup);
            QuestionGroup.map((quiz)=>{
              console.log('QuestionGroup: ',quiz.id)
              const QuestsData = []
              quiz.data.map((quest)=>{
                const questionData ={
                  Qid: quest.Qid,
                  Question: quest.Question,
                  Qtype: quest.Qtype===1?config.questTypeMutiple:config.questTypeShortAns,
                  PIC: quest.PIC,
                  FIleImg: null,
                  A: quest.A,
                  B: quest.B,
                  C: quest.C,
                  D: quest.D,
                  E: quest.E,
                  Answer: quest.Answer,
                  image:null,
                }
                QuestsData.push(questionData);
              });
              const TimeCal = {
                StartTime:{
                  h:Math.floor(quiz.data[0].startTime /3600),
                  m:(quiz.data[0].startTime % 3600)/60,
                },
                StopTime:{
                  h:Math.floor(quiz.data[0].endTime /3600),
                  m:(quiz.data[0].endTime % 3600)/60,
                },
                coundown:{
                  h:Math.floor(quiz.data[0].countdown/3600),
                  m:(quiz.data[0].countdown % 3600)/60,
                },
              }
              const Time ={
                startTimeStr: (TimeCal.StartTime.h).toString()+ ' : '+ (TimeCal.StartTime.m).toString(),
                endTimeStr: (TimeCal.StopTime.h).toString()+ ' : '+ (TimeCal.StopTime.m).toString(),
                coundownStr: (TimeCal.coundown.h).toString()+ ' : '+ (TimeCal.coundown.m).toString()
              }
              const QuizData ={
                QuizId: quiz.id,
                Quizname: quiz.data[0].Aname,
                StartTime: TimeCal.StartTime,
                StopTime: TimeCal.StopTime,
                coundown: TimeCal.coundown,
                NumQuest: quiz.data[0].NumQuests,
                Question: QuestsData,
                TimeStr: Time,
              }
              const datas = Data.Quiz
              datas.push(QuizData);
              console.log('QuizData[]',QuizData);
              setData((prevState)=>({...prevState,Quiz:datas}));
            });

            setData({
              ...Data,
              Vname: data[0].Vname,
              Vinfo: data[0].Vinfo,
              Vlink: data[0].Vlink,
              Vtype: data[0].Vtype,
            });
            handleImportVideo(data[0].Vlink);
            setDateValue(new Date(data[0].Enddate));
          }
          
        }
      });
    }
  },[]);
  const navigateToContacts = ()=>{
    console.log('Data.SjId: ',Data.SjId);
    navigate('/videosTeacher',{state:Data.SjId.sjId});
  }
  const handleImportVideo = (Vlink)=>{
    const videoLink = Vlink;
    const videoIdMatch = videoLink.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?t=))(.*?)(?:\?|$|&|#)/);
    if(videoIdMatch && videoIdMatch[1]){
      console.log('videoIdMatch: ', videoIdMatch[1]);
      setVideoImage(videoIdMatch[1]);
    }else{
      setVideoImage(null);
    }
  }
  const handleChange = (e) =>{
    const {name, value} = e.target;
    setData({
        ...Data,
        [name]: value,
    });
  }
  const handleCreateQuiz = (quiz,questionData)=>{
    const Time ={
      startTimeStr: (quiz.StartTime.h).toString()+ ' : '+ (quiz.StartTime.m).toString(),
      endTimeStr: (quiz.StopTime.h).toString()+ ' : '+ (quiz.StopTime.m).toString(),
      coundownStr: (quiz.coundown.h).toString()+ ' : '+ (quiz.coundown.m).toString()
    }
    console.log('Quiz: ',quiz);
    console.log('Quest: ',questionData);
    const QuizData ={
      QuizId: null,
      Quizname: quiz.Quizname,
      StartTime: quiz.StartTime,
      StopTime: quiz.StopTime,
      coundown: quiz.coundown,
      NumQuest: quiz.NumQuest,
      Question: questionData,
      TimeStr: Time,
    }
    console.log('Quiz01: ',QuizData);
    
    const datas = Data.Quiz
    datas.push(QuizData);
    setData((prevState)=>({...prevState,Quiz:datas}));
    setDialogstate(false);
    setExceldialogstate(false);
  }
  const handleEditQuiz = (quiz,questionData)=>{
    console.log('quiz186: ',quiz);
    const datas = Data.Quiz
    datas.map((item)=>{
      if(item.QuizId === quiz.QuizId){
        const Time ={
          startTimeStr: (quiz.StartTime.h).toString()+ ' : '+ (quiz.StartTime.m).toString(),
          endTimeStr: (quiz.StopTime.h).toString()+ ' : '+ (quiz.StopTime.m).toString(),
          coundownStr: (quiz.coundown.h).toString()+ ' : '+ (quiz.coundown.m).toString()
        }
        item.QuizId = quiz.QuizId;
        item.Quizname = quiz.Quizname;
        item.StartTime = quiz.StartTime;
        item.StopTime = quiz.StopTime;
        item.coundown = quiz.coundown;
        item.NumQuest = quiz.NumQuest;
        item.Question = questionData;
        item.TimeStr = Time;

        console.log('Quiz01: ',Data);
        setData((prevState)=>({...prevState,Quiz:datas}));
        setEditDialogstate(false);
      }
    })
  }
  const handleUploadImage = async(ImgJsonData)=>{
    if(ImgJsonData.length !== 0){
      ImgJsonData.map(async(ImgItem)=>{
        const responseUploadImg = await UploadQuestImg(ImgItem.FileImg, ImgItem.ImgName);
        console.log('responseUploadImg',responseUploadImg);
      })
    }
  }
  const handleDelete = async(i)=>{
    console.log('QuizsDelete: ', Data.Quiz[i]);
    const DeleteQuizData = await DeleteQuiz(Data.Quiz[i].QuizId);
    console.log('DeleteQuiz: ',DeleteQuizData);
  }
  const handleSubmit = async()=>{
    const jsonData = {
      Vname:Data.Vname,
      Vinfo:Data.Vinfo,
      Vlink:Data.Vlink,
      Vtype:Data.Vtype ===VideoTypeData.CantFast?true:false,
      Enddate: dateValue,
      Quiz:[]
    }
    const UploadImgData = [];
    Data.Quiz.map((item)=>{
      console.log('Item220: ',item);
      const TimeStart = item.StartTime;
      const TimeEnd = item.StopTime;
      const TimeCoundown = item.coundown;
      const quiz ={
        Aid:item.QuizId,
        Aname:item.Quizname,
        NumQuests:parseInt(item.NumQuest),
        startTime: ((TimeStart.h*60)+TimeStart.m)*60,
        endTime: ((TimeEnd.h*60)+TimeEnd.m)*60,
        countdown: ((TimeCoundown.h*60)+TimeCoundown.m)*60,
        Question: []
      }
      item.Question.map((quest)=>{
        const questData ={
          Qid: quest.Qid,
          Question:quest.Question,
          PIC:quest.PIC,
          Qtype:quest.Qtype,
          A:quest.A,
          B:quest.B,
          C:quest.C,
          D:quest.D,
          E:quest.E,
          Answer:quest.Answer,
        }
        if(quest.FileImg){
          let ImgJson ={
            FileImg: quest.FileImg,
            ImgName: quest.PIC
          }
          UploadImgData.push(ImgJson);
        }
        quiz.Question.push(questData);
      });
      console.log('QuizJSON: ',quiz);
      jsonData.Quiz.push(quiz);
    });
    console.log('jsonData248: ',jsonData);
    if(jsonData.Quiz !== undefined){
      console.log("jsonData:",Data.SjId);
      try{
        const UpdateVideo = await postUpdateVideoQuiz(Data.SjId.Vid,jsonData).then(()=>{
          if(UploadImgData.length !== 0){
            console.log('FileImg: ',UploadImgData);
            handleUploadImage(UploadImgData);
          }
        })
        console.log("UpdateVideo:",UpdateVideo);
        navigateToContacts();
        // await axios.post(`https://vel063.comsciproject.net/api/video.php/updateVideo/${Data.SjId.Vid}`, jsonData)
        // .then(function (response) {
        //   console.log("res:",response);
        //   Navigate('/videosTeacher',{state:SJIDvalue});
        // }).catch(function (error) {
        //   console.error(error);
        // });
      }catch(error){
        console.error(error);
      }
    }
  }

  console.log('Data: ',Data);
  return (
    <div>
      <Box sx={CreateVideoQuizBoxStyles}>
        <Grid container paddingBottom={3}>
          <Grid item xs={12}>
            {videoImage !== ''?
              <CardMedia 
                component='iframe' 
                src={`https://www.youtube.com/embed/${videoImage}`}
                sx={CreateVideoQuizCardMediaVideoStyles}
              />
            :
              <CardMedia 
                component='iframe' 
                src={``}
                sx={CreateVideoQuizCardMediaVideoStyles}
              />
            }
          </Grid>
        </Grid>
        <Grid container spacing={1} sx={CreateVideoQuizGridURLStyles}>
          <Grid item xs={8} sm={10} lg={10}>
            <TextField fullWidth
              margin="normal"
              className='TextfieldBorderRadius' 
              placeholder='URL'
              name='Vlink'
              value={Data.Vlink} 
              type={'text'} 
              sx={CreateVideoQuizTextFileStyles}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4} sm={2} lg={2}>
            <Typography variant="body1" textAlign="left">&nbsp;</Typography>
            <Button fullWidth
              type='submit' 
              sx={CreateVideoQuizImportButtonStyles} 
              variant="contained"
              onClick={()=>handleImportVideo(Data.Vlink)}
            >
              <Typography variant="body1" textAlign="left">import</Typography>
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={CreateVideoQuizGridTitleNameStyles}>
          <Grid item xs={8}>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="body2" textAlign="left"sx={CreateVideoQuizTypographyTitleNameStyles}>Video Name</Typography>
              </Grid>
            </Grid>
            <Grid>
              <Grid item xs={12}>
                <TextField fullWidth
                  margin="normal"
                  className='TextfieldBorderRadius' 
                  placeholder='Name'
                  name='Vname'
                  type={'text'} 
                  value={Data.Vname}
                  sx={CreateVideoQuizTextFileStyles}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" textAlign="left">&nbsp;</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker 
                label="Select date"
                value={dateValue}
                onChange={(newValue)=>setDateValue(newValue)}
                renderInput={(props)=>
                  <TextField {...props} 
                    margin="normal"
                    className='TextfieldBorderRadius' 
                    fullWidth
                    sx={CreateVideoQuizTextFileStyles}
                  />}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="body2" textAlign="left"sx={CreateVideoQuizTypographyTitleNameStyles}>Info</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField fullWidth
              className='TextfieldBorderRadiusInfo' 
              placeholder='Info'
              name='Vinfo'
              multiline
              rows={4}
              value={Data.Vinfo} 
              type={'text'} 
              sx={CreateVideoQuizTextFileStyles}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <Box sx={CreateVideoQuizTableBoxStyles}>
              <Box sx={CreateVideoQuizTableHeadBoxStyles}>
                <Table aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell align='center'>Quiz&nbsp;Name</TableCell>
                      <TableCell align='center'>Start&nbsp;Time</TableCell>
                      <TableCell align='center'>Stop&nbsp;Time</TableCell>
                      <TableCell align='center'>CountDown</TableCell>
                      <TableCell align='center'>Edit</TableCell>
                      <TableCell align='center'>Delete</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Data.Quiz.map((item,i)=>{
                      return(
                        <TableRow>
                          <TableCell align='center'>{item.Quizname}</TableCell>
                          <TableCell align='center'>{item.TimeStr.startTimeStr}</TableCell>
                          <TableCell align='center'>{item.TimeStr.endTimeStr}</TableCell>
                          <TableCell align='center'>{item.TimeStr.coundownStr}</TableCell>
                          <TableCell align="center">
                            <Button
                              onClick={()=>{
                                console.log('SetEditData = ',Data.Quiz[i]);
                                setEditData(Data.Quiz[i]);
                                return setEditDialogstate(true)
                              }}
                            >
                              <Link style={CreateVideoQuizLinkStyles}>
                                Edit
                              </Link>
                            </Button>
                          </TableCell>
                          <TableCell align="center">
                            <Button
                              onClick={()=>{
                                handleDelete(i)
                                const Quizs = Data.Quiz 
                                Quizs.splice(i,1);
                                setData({...Data,Quiz:Quizs});
                              }}
                            >
                              <Link style={CreateVideoQuizLinkStyles}>
                                Delete
                              </Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="body1" textAlign="left">&nbsp;</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={1} sx={CreateVideoQuizBottomStyles}>
          <Grid item  xs={12} lg={6} sm={12}>
            <Grid container>
              <Grid item xs={6}>
                <Grid container direction="column">
                  <Grid item>
                    <Switch
                      sx={CreateVideoQuizRadioButtonStyles} 
                      checked={Data.Vtype}
                      onChange={()=>{
                          setData((prevState)=>({...prevState,Vtype: Data.Vtype===VideoTypeData.CantFast?0:1}));
                      }}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  </Grid>
                  <Grid item>
                    {Data.Vtype === VideoTypeData.CantFast?
                      <Typography variant="caption" textAlign="left" sx={CreateVideoQuizVideoStatusStyles}>Can't fast forward video</Typography>:
                      <Typography variant="caption" textAlign="left" sx={CreateVideoQuizVideoStatusStyles}>normal video</Typography>
                    }
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container paddingTop={3.5} paddingLeft={2} justifyContent={"flex-end"}>
                  <Grid item xs={7}>
                    <a href="https://drive.google.com/drive/folders/13pFP2Jc4itIa2oQlhDyQNXD_SU1yahcC?usp=share_link" target="_blank" rel="noreferrer"style={{ textDecoration: 'none',width: '100%' }}>
                      <Typography variant="caption" textAlign="left" padding={1}sx={CreateVideoQuizTypographyTitleNameStyles}>Template&nbsp;excel</Typography> 
                    </a>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={6} sm={12}>
            <Grid container spacing={1} sx={CreateVideoQuizGridCreateQuizStyles}>
              <Grid item xs={6} lg={6} sm={3}>
                <Button fullWidth
                  sx={{borderRadius: '30px',color: indigo[900]}} 
                  variant="outlined"
                  startIcon={<UploadIcon/>}
                  onClick={()=>{return setExceldialogstate(true)}}
                >
                  <Typography variant="caption" textAlign="left" padding={1}sx={CreateVideoQuizTypographyTitleNameStyles}>Upload&nbsp;Quiz</Typography>
                </Button>
              </Grid>
              <Grid item xs={6} lg={6} sm={3}>
                <Grid container sx={CreateVideoQuizGridCreateQuizStyles}>
                  <Button fullWidth
                    sx={CreateVideoQuizCreateStyles} 
                    variant="contained"
                    startIcon={<AddIcon/>}
                    onClick={()=>{
                      console.log('Type: ',Data.Vtype);
                      return setDialogstate(true)}}
                  >
                    <Typography variant="caption" textAlign="left" padding={1}>Create&nbsp;Quiz</Typography>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={1} sx={CreateVideoQuizGridSaveQuizStyles}>
          <Grid item>
            <Button fullWidth
                to='/videosTeacher'
                sx={CreateVideoQuizSaveStyles} 
                variant="contained"
                startIcon={<SaveIcon/>}
                onClick={handleSubmit}
              >
                <Typography variant="caption" textAlign="left" padding={1}>Save</Typography>
              </Button>
          </Grid>
        </Grid>
      </Box>

      <Dialog
        open={dialogstate}
        onClose={() => setDialogstate(false)}
        fullWidth
        maxWidth="xl"
      >
        <DialogContent>
          <CreateQuiz {...Data}
            onClick={handleCreateQuiz}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={Editdialogstate}
        onClose={() => setEditDialogstate(false)}
        fullWidth
        maxWidth="xl"
      >
        <DialogContent>
          <EditQuizEditPage {...EditData}
            onClick={handleEditQuiz}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={exceldialogstate}
        onClose={() => setExceldialogstate(false)}
        fullWidth
        maxWidth="xl"
      >
        <DialogContent>
          <CreateExelQuiz {...Data}
            onClick={handleCreateQuiz}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditVideo;

import { useTheme } from '@emotion/react';
import { Box, FormControl, FormControlLabel, FormLabel, Paper, RadioGroup,Radio, Grid, TextField, MobileStepper, Button, Typography, Dialog, DialogTitle, DialogContent } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import DialogQuestion from './DialogQuestionComponent';
import CardQuestionShortAns from './MultipleRadioComponent';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import axios from 'axios';
import { useEffect } from 'react';
import { getAssignmentStudent, postCreateStudentAssignment, postUpdateMyAnswerStudent, postUpdateStudentAssignment } from '../services/api';
import config from '../Storage/config';
import Servicesconfig from '../Storage/servicesConfig';

const boxDefault = {
  padding: 2,
  m: 1,
  display: "flex",
  marginBottom: -4,
}

function DialogQuiz(prop) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const GetQuestType = config.GetQuestType;
  const {
    QuizPass,
    Max,
    Sid,
    VStatus,
  } = prop
  const VideoStatus = config.StudentVideoStatus
  const [dataItem,setDataItem] = useState(QuizPass);
  const [maxStep, setMaxStep] = useState(Max);
  const [studentId,setStudentId] = useState(Sid);
  const [value,setValue] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [timeCountdown,setTimeCountdown] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  var timer;
  useEffect(()=>{
    let countdownTime = dataItem[0].countdown;
    setTimeCountdown({
        ...timeCountdown,
        hours: parseInt(countdownTime/3600),
        minutes: (countdownTime%3600)/60, 
      })
  },[]);
  useEffect(()=>{
    timer = setInterval(()=>{
      if(timeCountdown.hours===0 && timeCountdown.minutes===0 && timeCountdown.seconds===0){
        prop.onClick();
      }else{
        if(timeCountdown.seconds > 0){
          setTimeCountdown({...timeCountdown,seconds:timeCountdown.seconds -1});
        }else if(timeCountdown.minutes > 0){
          setTimeCountdown({...timeCountdown,
            minutes: timeCountdown.minutes - 1,
            seconds: 59,
          });
        }else{
          setTimeCountdown({...timeCountdown,
            hours:timeCountdown.hours-1,
            minutes: 59,
            seconds: 59,
          })
        }
      }
    },1000)

    return ()=> clearInterval(timer);
  },[timeCountdown])
  useEffect(()=>{
    setValue('');
  },[activeStep]);

  const handleNext = async() => {
    if(activeStep<maxStep){
      const updateMyAns = await postUpdateMyAnswerStudent(dataItem[activeStep].AWid,dataItem[activeStep].Myanswer);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setValue('');
    }
  };

  const handleBack = async() => {
    if(activeStep>0){
      const updateMyAns = await postUpdateMyAnswerStudent(dataItem[activeStep].AWid,dataItem[activeStep].Myanswer);
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
      setValue('');
    }
  };
  const handleSubmit =async()=>{
    //update MyAnswer
    const updateMyAns = await postUpdateMyAnswerStudent(dataItem[activeStep].AWid,dataItem[activeStep].Myanswer);

    //Calculate Score.
    let yourscore = 0;
    dataItem.map((item)=>{
      if(item.Qtype===1){
        // mutiple choice
        const answerMap = {
          'A': item.A,
          'B': item.B,
          'C': item.C,
          'D': item.D,
          'E': item.E,
        }
        if(answerMap[item.Answer] === item.Myanswer){
          yourscore++;
        }
      }else{
        // short answer
        if(item.Myanswer !== ''){
          if(item.A === item.Myanswer){
            yourscore++;
          }else if(item.B === item.Myanswer){
            yourscore++;
          }else if(item.C === item.Myanswer){
            yourscore++;
          }else if(item.D === item.Myanswer){
            yourscore++;
          }else if(item.E === item.Myanswer){
            yourscore++;
          }
        }
      }
    });
    try{
      const StdAid = getAssignmentStudent(dataItem[0].Aid,studentId);
      console.log('GetAssignment: ',StdAid);
      StdAid.then(AidData =>{
        if(AidData.length !== 0){
          const StdAssUpdate = postUpdateStudentAssignment(studentId,dataItem[0].Aid,yourscore);
          console.log('StdAssUpdate: ',StdAssUpdate);
          console.log('AidData.length: ',AidData);
        }else{
          const StdAssCreate = postCreateStudentAssignment(studentId,dataItem[0].Aid,yourscore);
          console.log('StdAssCreate: ',StdAssCreate);
          console.log('AidData.length0: ',AidData);
        }
      }).catch(error =>{
        console.error('AidData.length Error: ',error);
      })
    }catch(error){
      console.error('Error GetAssignment: ',error);
    }
    
    prop.onClick();
  }
  const handleMyAnswerChange = (event) => {
    setValue(event.target.value);
    const select = dataItem
    select[activeStep].Myanswer = event.target.value;
    setDataItem(select);
  };
  function PopupImage({ open, onClose, imageUrl }) {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="md">
        <DialogTitle>Image</DialogTitle>
        <DialogContent>
          <img src={imageUrl} alt="Large Image" style={{ width: '100%' }} />
        </DialogContent>
      </Dialog>
    );
  }
  const handleImageClick = (imageUrl,e) => {
    e.preventDefault();
    if(!isPopupOpen){
      console.log('In');
      setSelectedImage(imageUrl);
      setIsPopupOpen(true);
    }
  };
  const closePopup = () => {
    if(isPopupOpen){
      console.log('Out');
      setIsPopupOpen(false);
    }
    
  };
  return (
    <>
      <Box 
        alignItems="center" 
        justifyContent="center" 
        sx={boxDefault}
      >
        <Grid container paddingBottom={5} justifyContent="center">
          <Grid item xs={8}></Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle2"textAlign="center">
              {`${timeCountdown.hours.toString().padStart(2, '0')}:${timeCountdown.minutes.toString().padStart(2, '0')}:${timeCountdown.seconds.toString().padStart(2, '0')}`}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {dataItem[activeStep].PIC !== null?
              <Grid container style={{alignItems: 'center',marginBottom: 20}}>
                <Grid xs={3}></Grid>
                <Grid xs={6} align={'center'}>
                  <img 
                    src={Servicesconfig.getImageQuest+dataItem[activeStep].PIC.toLowerCase()}
                    width='100%'
                    height='50%'
                    onClick={(e) => setIsPopupOpen(true)}
                  />
                  <Dialog open={isPopupOpen} onClose={closePopup} maxWidth="md">
                    <DialogContent>
                      <img src={selectedImage} alt="Large Image" style={{ width: '100%' }} />
                    </DialogContent>
                  </Dialog>
                </Grid>
              </Grid>:null
            }
          </Grid>
          <Grid item xs={12}>
            <FormControl>
              {dataItem[activeStep].Qtype === GetQuestType.Mutiple?
                <>
                  <FormLabel>
                    {dataItem[activeStep].Question}
                  </FormLabel>
                  <RadioGroup 
                    name='job-experience-group' 
                    aria-labelledby='job-experience-group-label'
                    value={value===''?dataItem[activeStep].Myanswer:value}
                    onChange={handleMyAnswerChange}
                  >
                    {dataItem[activeStep].A!==''?<FormControlLabel control={<Radio/>} label={dataItem[activeStep].A} value={dataItem[activeStep].A}/>:null}
                    {dataItem[activeStep].B!==''?<FormControlLabel control={<Radio/>} label={dataItem[activeStep].B} value={dataItem[activeStep].B}/>:null}
                    {dataItem[activeStep].C!==''?<FormControlLabel control={<Radio/>} label={dataItem[activeStep].C} value={dataItem[activeStep].C}/>:null}
                    {dataItem[activeStep].D!==''?<FormControlLabel control={<Radio/>} label={dataItem[activeStep].D} value={dataItem[activeStep].D}/>:null}
                    {dataItem[activeStep].E!==''?<FormControlLabel control={<Radio/>} label={dataItem[activeStep].E} value={dataItem[activeStep].E}/>:null}
                  </RadioGroup>
                </>:
                <>
                  <FormLabel>
                    {dataItem[activeStep].Question}
                  </FormLabel>
                  <Grid container spacing={1} paddingTop={1}>
                    <Grid item xs={12}>
                      <TextField 
                        size='small'
                        variant='outlined'
                        value={dataItem[activeStep].Myanswer===null?value:dataItem[activeStep].Myanswer}
                        onChange={handleMyAnswerChange}
                      />
                    </Grid>
                  </Grid>
                </>
              }
            </FormControl>
          </Grid>
        </Grid>
      </Box>
      <MobileStepper
        variant="progress"
        steps={maxStep}
        position="static"
        activeStep={activeStep}
        sx={{ maxWidth: 500, flexGrow: 1 }}
        nextButton={maxStep-1!== activeStep?
          <Button size="small" onClick={handleNext} disabled={activeStep === maxStep-1}>
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>:
          <Button size="small" onClick={handleSubmit}>
            Submit
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </>
  );
}

export default DialogQuiz;
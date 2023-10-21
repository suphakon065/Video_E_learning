import * as React from 'react';
import { useState,useRef } from 'react';
import { useEffect } from 'react';
import { Typography, Dialog, DialogContent, Grid } from '@mui/material';
import { Container } from '@mui/system';

import ReactPlayer from 'react-player';
import screenfull from 'screenfull';
import './Styles/ControlVideoStyle.css'
import ClassIcon from '@mui/icons-material/Class';

import VideoControl from './VideoControlComponent';
import DialogQuiz from './DialogQuizComponent';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { grey, indigo } from '@mui/material/colors';
import config from '../Storage/config';
import { getAssigmentOnVideo, getVideoInfoData, postAssigmentStudentForm, postCreateVideoCurrentTime, postUpdateVideoCurrentTime } from '../services/api';

const DataEx = {
    Vid: 173,
    Sid: '63011212056',
    Vlink: 'https://youtu.be/ykRGStsDNgQ?si=ERWasbfWQsgeOgEe',
    Vcurrent: 0,
    Vstatus: 1,
    Vtype: 1,
}

const format = (seconds) => {
    if (isNaN(seconds)) {
      return `00:00`;
    }
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, "0");
    if (hh) {
      return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
    }
    return `${mm}:${ss}`;
  };
  let count = 0;

function VideoPlayer() {
    const location = useLocation();
    const DataSend = location.state;
    const VideoMode = config.VideoType;
    const VideoStatus = config.StudentVideoStatus;
    const datavideo = {
        Vid: DataSend.Vid,
        Sid: DataSend.Sid,
        Vlink: DataSend.Vlink,
        Vcurrent: DataSend.Vcurrent,
        Vstatus: parseInt(DataSend.Vstatus),
        Vtype: DataSend.Vtype,
    };
    const startCurrent = datavideo.Vstatus!==2?datavideo.Vcurrent:0;
    const status = datavideo.Vstatus;
    const [dialogstate, setDialogstate] = useState(false);
    const [timeRandom,setTimeRandom] = useState();
    const [quizBool,setQuizBool] = useState(true);
    const [quizItems,setQuizItem] = useState();
    const [assignmentId,setAssignmentId] = useState();
    const [volumeSliderHover ,setVolumeSliderHover] = useState(false);
    const [state, setState] = useState({
        playing: false,
        muted: true,
        volume: 0,
        played: 0,
        seeking: false,
        SeekStatus: true,
        videoheight: '700px',
        timeQuizCount: 0,
    });
    const {playing, muted, volume, seeking, played, SeekStatus, videoheight, timeQuizCount} = state;
    const [dataDialogpass, setDataDialogpass] = useState();
    const [dataInfo,setDataInfo] = useState();

    const playerRef = useRef(null);
    const playerContainerRef = useRef(null);
    const controlsRef = useRef(null);
    const LastTime = useRef(0);
    useEffect(()=>{
        console.log('datavideo: ',datavideo);
        if(status === VideoStatus.NotWatched && status !== undefined){
            CreateStatus();
        }
        getServiceVideoPageData(datavideo.Vid);
        getServices().then((data)=>{
            try{

                if(data.length === 0){
                    return CreateAssigmentForm().then(()=>{
                        return getServices();
                    })
                }
            }catch(error){
                if(data === undefined){
                    return CreateAssigmentForm().then(()=>{
                        return getServices();
                    })
                }
            }
            
        });
    },[]);
    useEffect(()=>{
        if(dataDialogpass !== undefined&& quizItems){
            setQuizBool(false);
            setDialogstate(true);
            handleDialog();
        }
    },[dataDialogpass]);

    const CreateAssigmentForm = async()=>{
        try{
            const response = await postAssigmentStudentForm(datavideo.Vid,datavideo.Sid);
            console.log('postAss: ',response);
        }catch(error){
            console.error('error : ',error);
        }
    }
    const getServiceVideoPageData = async(Vid)=>{
        try{
            const GetVideoInfo = await getVideoInfoData(Vid);
            console.log('GetVideoInfoData: ',GetVideoInfo);
            setDataInfo(GetVideoInfo);
        }catch(error){
            console.error('error : ',error);
        }
    }
    const getServices = async()=>{
        try{
            const AssigmentData = await getAssigmentOnVideo(datavideo.Vid,datavideo.Sid);
            let Aiditem = [];
            Aiditem.push(AssigmentData[0].Aid);
            AssigmentData.map((item)=>{
                if(!Aiditem.includes(item.Aid)){
                    Aiditem.push(item.Aid);
                }
            });
            setAssignmentId([...Aiditem]);
            setQuizItem(AssigmentData);

            if(timeRandom === undefined){
                const randomT = [];
                Aiditem.map((e)=>{
                    const randomitem = AssigmentData.find(item =>item.Aid === e);
                    let max = parseInt(randomitem.endTime);
                    let min = parseInt(randomitem.startTime);
                    const itemRand = Math.floor(Math.random()*(max-min)+min)
                    const Timeitem = {
                        randomTime: itemRand,
                        countdown: parseInt(randomitem.countdown),
                    }
                    randomT.push(Timeitem);
                });
                console.log('RandomTime: ',randomT)
                setTimeRandom([...randomT]);
            }
            
        }catch(error){
            console.error('error : ',error);
        }
    }
    const SetDataPassDialog = async()=>{
        const QuizPass = quizItems.filter(item => item.Aid === assignmentId[timeQuizCount])
        if(QuizPass !== undefined){
            setDataDialogpass({
                QuizPass,
                Max: QuizPass.length,
                Sid: datavideo.Sid,
                VStatus: status,
            });
        }
    }
    const handlePlayPause = () =>{
        if(playerRef.current.getCurrentTime()===0){
            playerRef.current.seekTo(startCurrent, "seconds");
        }
        setState({...state, playing: !playing});
    }
    const handleMute = () =>{
        setVolumeSliderHover(!volumeSliderHover);
        // setState({...state, 
        //     muted:!muted,
        //     volume: muted===true?1:0
        // });
    }
    const handleVolumeChange = (e,newValue) =>{
        setState({...state,
            volume: parseFloat(newValue/100),
            muted: newValue===0?true:false
        });
    }
    const handleVolumeSeekUp = (e,newValue) =>{
        setState({...state,
            volume: parseFloat(newValue/100),
            muted: newValue===0?true:false
        });
    }
    const handleShowVolumeSlider =()=>{
        setVolumeSliderHover(true);
    }
    const handleHiddenVolumeSlider =()=>{
        setVolumeSliderHover(false);
    }
    const toggleFullScreen = () =>{
        screenfull.toggle(playerContainerRef.current);
        if(videoheight == '700px'){
            setState({...state, videoheight: '100%'});
        }else{
            setState({...state, videoheight: '700px'});
        }
    }
    const handleProgress = (changeState) =>{
        console.log('changeState',changeState);
        console.log('RandomTime: ',timeRandom);
        if(Math.floor(changeState.playedSeconds)%3===0){
            ChangeStatus(status,changeState.playedSeconds);
        }
        if(Math.floor(changeState.playedSeconds)+3>playerRef.current.getDuration()){
            ChangeStatus(VideoStatus.Watched,changeState.playedSeconds);
        }
        if(count>1){
            controlsRef.current.style.visibility = "hidden"
            count = 0
        }
        if(controlsRef.current.style.visibility == 'visible'){
            count+=1
        }
        if(!seeking){
            setState({
                ...state,
                ...changeState
            });
        }
        if(datavideo.Sid !== null && datavideo.Vtype === VideoMode.CantFast){
            if(Math.floor(changeState.playedSeconds) === timeRandom[timeQuizCount].randomTime && quizBool === true){
                SetDataPassDialog();
            }
            if(Math.floor(changeState.playedSeconds) > timeRandom[timeQuizCount].randomTime+3){
                let countTimeQ = timeQuizCount;
                countTimeQ += 1;
                if(countTimeQ<timeRandom.length){
                    setQuizBool(true);
                    setState({...state, timeQuizCount: countTimeQ});
                }
            } 
        }
        
    }
    const ChangeStatus = async(Videostatus,CurrentTime)=>{
        if(Videostatus === VideoStatus.Watched){
            try{
                const StatusChanged = await postUpdateVideoCurrentTime(datavideo.Vid,datavideo.Sid,0,VideoStatus.Watched);
                console.log('StatusChanged: ',StatusChanged);
            }catch(error){
                console.error('error : ',error);
            }
        }else{
            try{
                const StatusChanged = await postUpdateVideoCurrentTime(
                    datavideo.Vid,
                    datavideo.Sid,
                    Math.floor(CurrentTime),
                    VideoStatus.Watching
                );
                console.log('StatusChanged: ',StatusChanged);
                console.log('studentId: ',datavideo.Sid);
            }catch(error){
                console.error('error: ',error);
            }
        }
    }
    const CreateStatus = async()=>{
        try{
            const StatusCreate = await postCreateVideoCurrentTime(datavideo.Vid,datavideo.Sid,VideoStatus.NotWatched);
            console.log('StatusCreate: ',StatusCreate);
        }catch(error){
            console.error('error : ',error);
        }
    }

    const handleSeekChange= (e,newValue) =>{
        if(LastTime.current === 0){
            LastTime.current = played;
        }else if(LastTime.current < state.played){
            LastTime.current = played;
        }
        const supportedTime = parseFloat(newValue / 100)-LastTime.current;
        if(datavideo.Vtype === VideoMode.CantFast){
            if(supportedTime > 0.01 && status !== VideoStatus.Watched){
                playerRef.current.seekTo(LastTime.current, "fraction");
                setState({...state, SeekStatus: false});
            }else{
                setState({...state, SeekStatus: true});
            }
        }else{
            setState({...state, SeekStatus: true});
        }
    }
    const handleSeekMouseUp=(e,newValue) =>{
        setState({...state, seeking: false});
        if(SeekStatus != false){
           playerRef.current.seekTo(newValue / 100, "fraction"); 
        }
    }

    const handleSeekMouseDown=(e) =>{
        setState({...state, seeking: true});
    }
    
    const handleMouseMove=()=>{
        controlsRef.current.style.visibility = "visible";
        count = 0;
    }

    const handleDialog = () =>{
        setState({...state, playing: false});
        setDialogstate(true)
    }
    const handleDialogSubmit = () =>{
        setDialogstate(false);
        setState({...state, playing: true});
    }
    const currentTime = playerRef.current 
    ? playerRef.current.getCurrentTime()
    : '00:00';
    const duration = playerRef.current
    ? playerRef.current.getDuration()
    : '00:00';

    const elapsedTime = format(currentTime);
    const totalDuration = format(duration);
  return (
    <>
        <Container maxWidth="lg">
            <div 
                ref={playerContainerRef} 
                className='playerWrapper'
                onMouseMove={handleMouseMove}
            >
                <ReactPlayer
                    ref={playerRef}
                    width={"100%"}
                    height={videoheight}
                    url={datavideo.Vlink}
                    muted={muted}
                    playing={playing}
                    volume={volume}
                    onProgress={handleProgress}
                />
                <VideoControl
                    ref={controlsRef}
                    onPlayPause={handlePlayPause} playing={playing}
                    muted={muted}
                    onMute={handleMute}
                    onVolumechange={handleVolumeChange}
                    onVolumeSeekUp={handleVolumeSeekUp}
                    volume={volume}
                    onToggleFullScreen ={toggleFullScreen}
                    played={played}
                    onSeek={handleSeekChange}
                    // onSeekMouseDown={handleSeekMouseDown}
                    onSeekMouseUp={handleSeekMouseUp}
                    elapsedTime={elapsedTime}
                    totalDuration={totalDuration}
                    Vname={dataInfo!==undefined?dataInfo.Vname:'Video name'}
                    volumeSliderHover={volumeSliderHover}
                />
                <Dialog 
                    open={dialogstate} 
                    onClose={() => setDialogstate(false)}
                    scroll='paper'
                >
                    <DialogContent
                        style={{ width:500,}}
                    >
                        {quizItems!==undefined?
                        <DialogQuiz {...dataDialogpass}
                            onClick={handleDialogSubmit}
                        />:null
                    }
                    </DialogContent>
                </Dialog>
            </div>
            <Grid container marginTop={5}marginBottom={10}>
                <Grid container direction={'column'}>
                    <Grid item marginBottom={3}>
                        <Typography variant="h4" textAlign="left" sx={{ fontWeight: 'bold' }}>{dataInfo!==undefined?dataInfo.Vname:'Video name'}</Typography>
                    </Grid>
                    <Grid item>
                        <Grid container spacing={1}>
                            <Grid item >
                                <Typography variant="subtitle1" textAlign="left" sx={{color: indigo[900],fontWeight:'bold'}}>Subject Name </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1" textAlign="left" sx={{color: grey[700]}}>{dataInfo!==undefined?dataInfo.SJname:'-'}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container marginTop={2}>
                <Grid item marginBottom={1}>
                    <Typography variant="subtitle1" textAlign="left" borderBottom={2} sx={{color: indigo[900],fontWeight:'bold'}}>Description</Typography>
                </Grid>
                    <Grid item xs={12}>
                        <Typography 
                            sx={{color: grey[700]}}
                            variant="body1" 
                            textAlign="left"
                        >
                            {dataInfo!==undefined?dataInfo.Vinfo:'-'}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
        
    </>
  );
}

export default VideoPlayer;


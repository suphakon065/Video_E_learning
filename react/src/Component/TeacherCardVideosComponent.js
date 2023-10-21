import * as React from 'react';
import { useState } from 'react';

import { CardMedia, Grid, IconButton, Paper, Switch } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import axios from "axios"
import { grey, indigo } from '@mui/material/colors';
import CardCover from '@mui/joy/CardCover';
import AspectRatio from '@mui/joy/AspectRatio';
import { useEffect } from 'react';
import { ChangeStatusVideo, DeleteVideo, getvideo } from '../services/api';
import config from '../Storage/config';
import { TeacherCardVideosCoverStyles, TeacherCardVideosDescriptionStyles, TeacherCardVideosLinkStyles, TeacherCardVideosRedioStyles, TeacherCardVideosStatusStyles, TeacherCardVideosStyles, TeacherCardVideosTextStyles, TeacherCardVideosTypographyTitleStyles } from './Styles/TeacherCardVideopageStyles';


import GradingIcon from '@mui/icons-material/Grading';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FastForwardIcon from '@mui/icons-material/FastForward';
import DoDisturbAltIcon from '@mui/icons-material/DoDisturbAlt';

function TeacherCardVideos(prop) {
  const video = prop;
  const sjId = prop.SJid;
  const videopass = {
    Vid: video.Vid,
    Vlink: video.Vlink,
    Sid:null
  };
  const Path = {
    TeacherScorePage: config.TeacherScorePage,
    EditVideoQuizPage: config.EditVideoQuizPage,
    videoplayerPage: config.videoplayerPage,
  }
  const VideoStatus = config.VideoType
  const [getDataBool,setGetDataBool] = useState(true);
  const [DatapassToScorePage,setDatapassToScorePage] = useState();
  const [TypeOption,setTypeOption] = useState(video.Vtype);
  const [videoImage,setVideoImage] = useState();

  useEffect(()=>{
    if(getDataBool){
      getData();
      setGetDataBool(false);
      handleImportVideo(video.Vlink);
    }
  },[]);

  const getData=async()=>{
    const videoData = await getvideo(video.Vid)
    const Data = {
      Vid: video.Vid,
      D: videoData,
      VideoName: video.Vname,
      SubjectId: sjId,
    }
    setDatapassToScorePage(Data);
  }
  const handleDelete = async()=>{
    const deleteVideo = await DeleteVideo(video.Vid);
    console.log('DeleteVideo Status: ',deleteVideo);
    prop.onClick(video.Vid);
  }
  const handleChangeStatusVideo = ()=>{
    const changeVideoType = ChangeStatusVideo(video.Vid, TypeOption);
    if(changeVideoType !== undefined){
      setTypeOption(TypeOption===VideoStatus.CantFast?
        VideoStatus.NormalVideo:
        VideoStatus.CantFast
      );
    }
  }
  const handleImportVideo = (videoLink)=>{
    const videoIdMatch = videoLink.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?t=))(.*?)(?:\?|$|&|#)/);
    if(videoIdMatch && videoIdMatch[1]){
      console.log('videoIdMatch: ', videoIdMatch[1]);
      setVideoImage(videoIdMatch[1]);
    }else{
      setVideoImage(null);
    }
  }

  return (
    <Grid item xs={2} sm={6} md={4} lg={3}>
      <Card 
        sx={TeacherCardVideosStyles}
      >
        <Link 
          to={Path.videoplayerPage} 
          style={{ textDecoration: 'none' }} 
          state={videopass}
        >
          <CardMedia
            component='iframe'
            height="175"
            title="Video Title"
            src={`https://www.youtube.com/embed/${videoImage}`}
            style={{ pointerEvents: "none" }}
          />
          <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '90px'  }}>
            <Grid container>
              <Typography 
              variant="h5" 
              sx={{
                fontWeight:'bold',
                color:indigo[900],
                overflow: 'hidden', 
                whiteSpace: 'nowrap', 
                textOverflow: 'ellipsis',
              }}
            >
              {video.Vname}
            </Typography>
            </Grid>
            <Paper 
              elevation={0} 
              style={TeacherCardVideosDescriptionStyles}
            >
              
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={TeacherCardVideosTextStyles}
              >
                {video.Vinfo}
                
              </Typography>                
            </Paper>
          </CardContent>
        </Link>
        <CardActions 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            backgroundColor:grey[300]
          }}
        >
          <div>
            <Link 
              to={Path.TeacherScorePage} 
              style={{ textDecoration: 'none' }}
              onClick={getData} 
              state={
                DatapassToScorePage!==undefined?DatapassToScorePage:null
              } 
            >
              <IconButton
                title="go to Score page"
                sx={TeacherCardVideosTypographyTitleStyles}
              >
                <GradingIcon fontSize='small'/>
              </IconButton>
            </Link>
            <Link 
              to={Path.EditVideoQuizPage} 
              style={TeacherCardVideosLinkStyles} 
              state={{Vid:video.Vid,sjId}} 
            >
              <IconButton
                title="Edit this video"
                sx={TeacherCardVideosTypographyTitleStyles}
              >
                <EditIcon fontSize='small'/>
              </IconButton>
            </Link>
            <IconButton
              title="Delete this video"
              sx={TeacherCardVideosTypographyTitleStyles}
              onClick={handleDelete}
            >
              <DeleteIcon fontSize='small'/>
            </IconButton>
          </div>
          <div>
            <Grid container spacing={1}>
              <Grid item>
              {TypeOption?
              <DoDisturbAltIcon fontSize='small'sx={TeacherCardVideosTypographyTitleStyles}/>:
              <FastForwardIcon fontSize='small'sx={TeacherCardVideosTypographyTitleStyles}/>
              }
              </Grid>
              <Grid item>
                <Switch 
                  size="small"
                  sx={{ 
                    color: '#1a237e',
                    '& .MuiSwitch-thumb': {
                      backgroundColor: '#1a237e',
                    } 
                  }}
                  checked={TypeOption}
                  onChange={handleChangeStatusVideo} 
                />
              </Grid>
            </Grid>
          </div>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default TeacherCardVideos;

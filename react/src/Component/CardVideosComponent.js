import * as React from 'react';
import { useState } from 'react';

import { Grid, Paper } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import axios from "axios"
import { green, grey, indigo, lightBlue } from '@mui/material/colors';
import CardCover from '@mui/joy/CardCover';
import AspectRatio from '@mui/joy/AspectRatio';

import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useEffect } from 'react';
import config from '../Storage/config';
import { CardVideosButtonStyles, CardVideosCardStyles, CardVideosCoverStyles, CardVideosLinkStyles, CardVideosPaperStyles, CardVideosStatusAlreadyStyles, CardVideosStatusDoneStyles, CardVideosStatusNotYetStyles, CardVideosStatusStyles, CardVideosTypographyButtonStyles, CardVideosTypographyGutterBottomStyles } from './Styles/CardVideosPageStyles';
import { GetAssignmentScore } from '../services/api';

function CardVideos(prop) {
    const [bool,setbool] = useState(true);
    const [Datapass,setDatapass] = useState();
    const {
        element,
        Uid,
    } = prop
    const [videopass, setVideopass] = useState({
        Vid: element.Data.Vid,
        Vlink: element.Data.Vlink,
        Sid: Uid,
        Vtype:element.Data.Vtype,
        Vcurrent:element.currentT,
        Vstatus:element.status,
    });
    const [videoImage,setVideoImage] = useState();
    const VideoPlayerPath = config.videoplayerPage;
    const studentScorePage = config.studentScorePage;

    useEffect(()=>{
        getData();
        handleImportVideo(element.Data.Vlink);
    },[])

    const getData=async()=>{
        const getAssignmentScore = await GetAssignmentScore(element.Data.Vid,Uid).then((data)=>{
            const Data = {
                V: element.Data.Vid,
                U: Uid,
                D: [...data],
            }
            console.log("Assignment: ",data);
            setDatapass(Data);
        });
        // axios.get(`https://vel063.comsciproject.net/api/studentASSIGNMENT.php/getAssignment/${element.Data.Vid}/${Uid}`).then(response => response.data)
        // .then((data)=>{ 
        //     const Data = {
        //         V: element.Data.Vid,
        //         U: Uid,
        //         D: [...data],
        //     }
        //     console.log("Assignment: ",data);
        //     setDatapass(Data);
        // });
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
    if(bool === true){
      getData();
      setbool(false);
    }
  return (
    <Grid item xs={2} sm={6} md={4}>
        <Card sx={CardVideosCardStyles}>
            <Link to={VideoPlayerPath} style={CardVideosLinkStyles} state={videopass}>
                <AspectRatio ratio="2">
                    <iframe 
                        src={`https://www.youtube.com/embed/${videoImage}`}
                        height="175"
                        title="green iguana"
                    />
                    <CardCover
                        className="gradient-cover"
                        sx={CardVideosCoverStyles}
                    >
                    </CardCover>  
                </AspectRatio>
                <CardContent >
                    <Typography gutterBottom variant="h5" component="div" sx={CardVideosTypographyGutterBottomStyles}>
                        {element.Data.Vname}
                    </Typography>
                    <Paper elevation={0} style={CardVideosPaperStyles}sx={{ height: '50px' }}>
                        <Typography variant="body2" color="text.secondary">
                            {element.Data.Vinfo}
                        </Typography>
                    </Paper>  
                </CardContent>
            </Link>
            <CardActions>
                <Link to={studentScorePage} style={CardVideosLinkStyles}onClick={getData} state={Datapass!==undefined?Datapass:null} >
                    <Button sx={CardVideosButtonStyles} size="small">
                        Score
                    </Button>
                </Link>
                {element.status==='0'?
                    <Grid container sx={CardVideosStatusStyles}>
                        <Grid item xs={3}>
                            <FiberManualRecordIcon color="disabled" fontSize="small" />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography gutterBottom variant="body2" sx={CardVideosStatusNotYetStyles}>ยังไม่ได้ดู</Typography>
                        </Grid>
                    </Grid>:null
                }
                {element.status==='1'?
                    <Grid container sx={CardVideosStatusStyles}>
                        <Grid item xs={3}>
                            <FiberManualRecordIcon sx={CardVideosStatusAlreadyStyles} fontSize="small" />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography gutterBottom variant="body2" sx={CardVideosStatusAlreadyStyles}>กำลังดู</Typography>
                        </Grid>
                    </Grid>:null
                }
                {element.status==='2'?
                    <Grid container sx={CardVideosStatusStyles}>
                        <Grid item xs={3}>
                            <FiberManualRecordIcon color="success" fontSize="small" />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography gutterBottom variant="body2" sx={CardVideosStatusDoneStyles}>ดูเสร็จ</Typography>
                        </Grid>
                    </Grid>:null
                }
            </CardActions>
        </Card>
    </Grid>
  );
}

export default CardVideos;

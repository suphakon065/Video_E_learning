// import * as React from 'react';
import './Styles/ControlVideoStyle.css'
import { useState } from "react";
import { useEffect } from "react";
import { Fab, Grid, IconButton, Paper, Switch } from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

import CardVideos from './CardVideosComponent';
import HeaderBar from "./HeaderBarComponent";
import TeacherCardVideos from "./TeacherCardVideosComponent";

import { Link, useLocation } from 'react-router-dom';
import { grey, indigo } from "@mui/material/colors";
import { getvideos } from "../services/api";
import config from "../Storage/config";
import { TeacherVideosAddIconStyles, TeacherVideosFabStyles } from "./Styles/TeacherVideosPageStyles";
import { CardCover } from "@mui/joy";
import { TeacherCardVideosCoverStyles, TeacherCardVideosDescriptionStyles, TeacherCardVideosStatusStyles, TeacherCardVideosTextStyles, TeacherCardVideosTypographyTitleStyles } from "./Styles/TeacherCardVideopageStyles";
import GradingIcon from '@mui/icons-material/Grading';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FastForwardIcon from '@mui/icons-material/FastForward';
import DoDisturbAltIcon from '@mui/icons-material/DoDisturbAlt';

function TeacherVideos() {
    const location = useLocation();
    const SJid = location.state;
    const createVideoQuizPath = config.createVideoQuizPage
    const [videosDatas,setVideosDatas] = useState([]);
    useEffect(()=>{
        getvideosData();
    },[]);

    const handleDelete = (Vid)=>{
        let Vdata = videosDatas;
        Vdata.map((item,i)=>{
            if(item.Vid === Vid){
                Vdata.splice(i,1);
                setVideosDatas(Vdata);
            }
        });
        window.location.reload(false);
    }
    const getvideosData = async()=>{
        const Videos = await getvideos();
        setVideosDatas([...Videos]);
    }
  return (
    <div className='StudentHomePage'>
        <Grid container spacing={{xs:3, md:3, lg:3}} columns={{xs:2, sm:12, md:8, lg: 12, xl: 12}}>
            {videosDatas.map((video)=>{
                if(video.SJid==SJid){
                    return <TeacherCardVideos 
                        {...video}
                        onClick={handleDelete}
                    />
                }
            })}
            <Fab 
                color="primary" 
                aria-label="add" 
                as={Link} 
                to={createVideoQuizPath}
                sx={TeacherVideosFabStyles} 
                state={SJid}
            >
                <AddIcon sx={TeacherVideosAddIconStyles}/>
            </Fab>
        </Grid>
    </div>
  );
}

export default TeacherVideos;
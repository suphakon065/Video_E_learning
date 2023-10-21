import { useState } from "react";
import { useEffect } from "react";
import { Grid } from '@mui/material';

import CardVideos from './CardVideosComponent';
import { useLocation } from 'react-router-dom';
import { getStudentvideos, getvideos } from "../services/api";

function StudentVideos() {
    const location = useLocation();
    const data = location.state;
    const [videosDatas,setVideosDatas] = useState([]); 
    useEffect(()=>{
        getVideos();
    },[]);

    const getVideos = async ()=>{
        const studentVideo = await getStudentvideos(data.SJID, data.UserID);
        const videos = await getvideos();
        let Datas = [];
        await videos.map((item)=>{
            let formData = {
                Data: item,
                status: '0',
                currentT: 0,
            }
            if(studentVideo.find(e=>e.Vid === item.Vid)!==undefined){
                let statusItem = studentVideo.find(e=>e.Vid === item.Vid);
                formData.status = statusItem.Status;
                formData.currentT = parseInt(statusItem.current);
            }
            Datas.push(formData);
        })
        setVideosDatas([...Datas]);
    }
  return (
    <div className='StudentHomePage'>
        <Grid container spacing={{xs:3, md:3}} columns={{xs:2, sm:12, md:8, lg: 12, xl: 12}}>
            {videosDatas.map((element)=>{
                if(element.Data.SJid==data.SJID){
                    const datapass ={
                        element: element,
                        Uid: data.UserID,
                    }
                    return <CardVideos {...datapass}/>
                }
            })}
        </Grid>
    </div>
  );
}

export default StudentVideos;
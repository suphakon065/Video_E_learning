import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom'

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { indigo, red } from '@mui/material/colors';
import { Box, Grid, Typography } from '@mui/material';

import './Styles/ControlVideoStyle.css'
import config from '../Storage/config';
import { useEffect } from 'react';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { CardSubjectAvatarStyles, CardSubjectBoldTextStyles, CardSubjectBoxStyles, CardSubjectGridSubjectNameStyles, CardSubjectGridSubjectTitleStyles, CardSubjectLinkSubjectStyles, CardSubjectTypographySubjectNameStyles } from './Styles/CardSubjectPageStyles';

function CardSubject(prop) {
    const {
        element,
        UID,
    } = prop
    const [SJidSubject,setSJidSubject] = useState({
        SJID: element.SJid,
        UserID: UID,
    });
    const videoPath = config.VideosPage;
    const labelvideos = "videos ";
    useEffect(()=>{
        console.log('P: ',element);
    },[])
  return (
        <Grid item xs={2} sm={6} md={4}>
            <Box sx={CardSubjectBoxStyles}>
                <Grid container>
                    <Grid item xs={12}>
                        <Link to={videoPath} style={CardSubjectLinkSubjectStyles} state={SJidSubject}>
                            <Grid container spacing={8}>
                                <Grid item xs={2}>
                                    <Avatar sx={CardSubjectAvatarStyles} aria-label="recipe">
                                        <MenuBookIcon/>
                                    </Avatar>
                                </Grid>
                                <Grid item xs={8}>
                                    <Grid container sx={CardSubjectGridSubjectTitleStyles}>
                                        <Grid item>
                                            <Typography variant="body1" textAlign="left" sx={CardSubjectBoldTextStyles}>{element.SJid}</Typography>
                                        </Grid>
                                        <Grid item sx={CardSubjectGridSubjectNameStyles}>
                                            <Typography variant="body1" sx={CardSubjectTypographySubjectNameStyles}>
                                                {element.SJname}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Grid>
  );
}

export default CardSubject

import * as React from 'react';

import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Fab, Grid, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CardSubject from './CardSubjectComponent';
import './Styles/ControlVideoStyle.css'
import HeaderBar from './HeaderBarComponent';

import axios from "axios"
import { useEffect,useState } from "react";
import { useLocation } from 'react-router-dom';
import { Context } from '../Context';
import { blueGrey, indigo } from '@mui/material/colors';
import CardRequestToJoinSubject from './CardRequestToJoinSubject';
import { getsubjects, getsubjectsStudent } from '../services/api';
import { StudentHomeAddIconeStyles, StudentHomeBoxStyles, StudentHomeTypographyRequestStyles } from './Styles/StudentHomepageStyles';

function StudentHomePage() {
  const [subjects,setSubjects] = useState([]); 
  const userID = localStorage.getItem('Name');
  const [dialogstate,setDialogstate] = useState(false)
    
  useEffect(()=>{
    getsubjectsData();
  },[]);

  const getsubjectsData =async () =>{
    const response = await getsubjectsStudent(userID);
    setSubjects([...response]);
  }
  const handleClose =()=>{
    setDialogstate(false);
  }
  return (
    <div className='StudentHomePage'>
      <Grid container
        spacing={{
          xs:3, 
          md:3
        }} 
        columns={{
          xs:2, 
          sm:12, 
          md:8, 
          lg: 12, 
          xl: 12
        }} 
      >
        {subjects.map((element)=>{
          const dataPass ={
            element,
            UID: userID
          }
          return <CardSubject {...dataPass}/>
        })}
        <Grid item xs={2} sm={6} md={4}>
          <Box sx={StudentHomeBoxStyles} onClick={()=>setDialogstate(true)}>
            <AddIcon sx={StudentHomeAddIconeStyles}/>
            <Typography variant="subtitle1" sx={StudentHomeTypographyRequestStyles} component="div">
              Request To join Class
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Dialog */}
      <Dialog 
        open={dialogstate} 
        onClose={() => setDialogstate(false)}
        scroll='paper'
      >
        <CardRequestToJoinSubject onClosed={handleClose}/>
      </Dialog>
    </div>
  );
}
export default StudentHomePage

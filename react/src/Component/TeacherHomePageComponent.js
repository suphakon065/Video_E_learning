import React, { useContext } from 'react';

import { Box, Button, Dialog, DialogActions, DialogContent, Fab, Grid, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CardSubjectTeacher from './CardSubjectTeacherComponent';
import './Styles/ControlVideoStyle.css'
import HeaderBar from './HeaderBarComponent';
import { v4 as uuidv4 } from 'uuid';

import axios from "axios"
import { useEffect,useState } from "react";
import { indigo, red } from '@mui/material/colors';
import { CreateSubject, getSubjects } from '../services/api';
import { TeacherHomeDialogSubjectStyles, TeacherHomeGridErrorStyles, TeacherHomeTextFieldIDStyles, TeacherHomeTypographyDialogSubjectStyles, TeacherHomeTypographyErrorStyles, TeacherHomeCancleStyles, TeacherHomeCreateStyles, TeacherHomeTextFieldNameStyles, TeacherHomeBoxStyles, TeacherHomeAddIconeStyles, TeacherHomeTypographyAddSubjectStyles } from './Styles/TeacherHomepageStyles';

function TeacherHomePage() {
  const [formSubjectData,setFormSubjectData] = useState({
    TFsubjectID: '',
    TFsubjectName: '',
  });
  const [subjects,setSubjects] = useState([]); 
  const [dialogstate,setDialogstate] = useState(false);
  const [textError,setTextError] = useState(false);

  useEffect(()=>{
    AllSubjects();
  },[]);

  const AllSubjects = async () =>{
    try{
      const response = await getSubjects();
      setSubjects(response);
      console.log(response);
    }catch(error){
      console.error('error getSubject request: ',error);
    }
  }
  const handleChange=(e)=>{
    const { name, value } = e.target;
    setFormSubjectData({
      ...formSubjectData,
      [name]: value,
    });
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('formSubjectData: ',formSubjectData);
    const response = await CreateSubject(formSubjectData);
    console.log("Response: ",response);
    if(response ==true){
      AllSubjects();
      handleColse();
    }else{
      setTextError(true);
    }
  }
  const handleColse = async(e) => {
    setDialogstate(false);
    setFormSubjectData({
      ...formSubjectData,
      TFsubjectID: '',
      TFsubjectName: '',
    });
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
          return <CardSubjectTeacher {...element}
            onClick={AllSubjects}
          />
        })}
        <Grid item xs={2} sm={6} md={4}>
          <Box sx={TeacherHomeBoxStyles}
            onClick={()=>setDialogstate(true)}
          >
            <AddIcon sx={TeacherHomeAddIconeStyles}/>
            <Typography variant="subtitle1" sx={TeacherHomeTypographyAddSubjectStyles} component="div">
              Add a New Subject
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Dialog 
        open={dialogstate} 
        onClose={() => setDialogstate(false)}
        scroll='paper'
      >
        <form onSubmit={handleSubmit}>
          <DialogContent sx={TeacherHomeDialogSubjectStyles}>
            <Typography variant="body1"sx={TeacherHomeTypographyDialogSubjectStyles}>
              Create Subject
            </Typography>

            <TextField fullWidth
              name='TFsubjectID'
              className='TextfieldBorderRadius' 
              placeholder='subject ID' 
              type={'text'}
              error={textError}
              value ={formSubjectData.TFsubjectID}
              sx={TeacherHomeTextFieldIDStyles}
              onChange={handleChange}
            />
            <TextField fullWidth
              name='TFsubjectName'
              className='TextfieldBorderRadius' 
              placeholder='subject Name' 
              type={'text'}
              error={textError}
              value ={formSubjectData.TFsubjectName}
              sx={TeacherHomeTextFieldNameStyles}
              onChange={handleChange}
            />
            {textError === true?
              <Grid container sx={TeacherHomeGridErrorStyles}>
                <Typography variant="caption" sx={TeacherHomeTypographyErrorStyles} >มีวิชานี้ในระบบอยู่แล้ว</Typography>
              </Grid>:null
            }
          </DialogContent>
          <DialogActions>
            <Button 
              style={TeacherHomeCancleStyles}
              onClick={handleColse}
            >
              Cancle
            </Button>
            <Button 
              type='submit'
              style={TeacherHomeCreateStyles}
            >
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
export default TeacherHomePage

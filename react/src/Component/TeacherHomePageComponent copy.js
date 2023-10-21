import React, { useContext } from 'react';

import { Button, Dialog, DialogActions, DialogContent, Fab, Grid, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CardSubjectTeacher from './CardSubjectTeacherComponent';
import './Styles/ControlVideoStyle.css'
import HeaderBar from './HeaderBarComponent';
import { v4 as uuidv4 } from 'uuid';

import axios from "axios"
import { useEffect,useState } from "react";
import { indigo } from '@mui/material/colors';
import useStyles from './Styles/StyleMui';

function TeacherHomePage() {
  const classes = useStyles();
  const [formSubjectData,setFormSubjectData] = useState({
    TFsubjectID: '',
    TFsubjectName: '',
  });
  const [subjects,setSubjects] = useState([]); 
  const [dialogstate,setDialogstate] = useState(false)
    
  useEffect(()=>{
    getsubjects();
  },[]);

  useEffect(()=>{
    getsubjects();
  },[subjects]);

  function getsubjects(){
    axios.get('https://vel063.comsciproject.net/api/subject.php/').then(response => response.data)
    .then((data)=>{
      setSubjects([...data])
    })
  }

  const handleChange=(e)=>{
    const { name, value } = e.target;
    setFormSubjectData({
      ...formSubjectData,
      [name]: value,
    });
  }

  const handleCreatesubject =async()=>{
    const subdata ={
      SJid: formSubjectData.TFsubjectID,
      SJname: formSubjectData.TFsubjectName,
    }
    const datas = subjects;
    datas.push(subdata);
    axios.post(`https://vel063.comsciproject.net/api/subject.php/insertSubject`,{
      sjid: formSubjectData.TFsubjectID,
      name: formSubjectData.TFsubjectName,
    }).then(function (response){
      console.log('res:  ',response);
    }).catch(function (error){
      console.log(error);
    });
    await setSubjects(datas);
    setFormSubjectData({
      ...formSubjectData,
      TFsubjectID: '',
      TFsubjectName: '',
    });
    setDialogstate(false);
    console.log('Createsubject 4: ',subjects);
  }
  return (
    <div className='StudentHomePage'>
      <Grid container className={classes.customSubjectBox} >
        {subjects.map((element)=>{
          return <CardSubjectTeacher {...element}/>
        })}
        <Fab 
          color="primary" 
          aria-label="add" 
          onClick={()=>{return setDialogstate(true)}}
          sx={{margin:5,bgcolor: indigo[900]}}
        >
            <AddIcon />
        </Fab>
      </Grid>

      <Dialog 
        open={dialogstate} 
        onClose={() => setDialogstate(false)}
        sx={{borderRadius:10}}
        scroll='paper'
      >
        <DialogContent 
          sx={{
            width:{
              xs:180, 
              sm:450, 
              md:450, 
              lg: 450, 
              xl: 450}
            }}
        >
          <Typography 
          variant="body1" 
            sx={{
              paddingBottom:3,
              paddingTop:3,
              paddingLeft:2
            }}
          >
            Create Subject
          </Typography>
          <TextField fullWidth
            name='TFsubjectID'
            className='TextfieldBorderRadius' 
            placeholder='subject ID' 
            type={'text'}
            value ={formSubjectData.TFsubjectID}
            sx={{borderRadius:10}}
            onChange={handleChange}
          />
          <TextField fullWidth
            name='TFsubjectName'
            className='TextfieldBorderRadius' 
            placeholder='subject Name' 
            type={'text'}
            value ={formSubjectData.TFsubjectName}
            sx={{paddingTop:2,borderRadius:10}}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button 
            style={{ color: 'red'}}
            onClick={()=>{setDialogstate(false)}}
          >
            Cancle
          </Button>
          <Button 
            style={{ color: 'green'}}
            onClick={()=>{handleCreatesubject();}}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default TeacherHomePage

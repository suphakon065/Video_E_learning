import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { Avatar, TextField, Typography } from '@mui/material';
import { indigo } from '@mui/material/colors';
import ExpandLess from '@mui/icons-material/ExpandLess';
import axios from 'axios';
import { useEffect } from 'react';
import { AddstudentInRequest, AddstudentSubject, DeletestudentInRequest, DeletestudentInSubject, getAllusers, getAllusersInClass, getStudentRequest } from '../services/api';
import { useState } from 'react';

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

export default function DialogInsetStudent(prop) {
  const [subjectId,setSubjectId] = useState(prop.SJidSubject);
  const [StdInClass,setStdInClass] = useState();
  const [StdRequest,setStdRequest] = useState();

  const [dataSetupBool, setDataSetupBool] = useState(false);
  const [disableBtn, setDisableBtn] = useState({
    AddBtn: false,
    RemoveBtn: false,
  });
  const [checked, setChecked] = useState([])
  const [search, setSearch] = useState({
    SearchStdInClass: '',
    SearchStdRequest: '',
  });
  const leftChecked = intersection(checked, StdRequest);
  const rightChecked = intersection(checked, StdInClass);

  useEffect(()=>{
    if(StdInClass === undefined){
      Allusers();
    }else if(StdRequest === undefined){
      AlluserRequest();
    }else if(!dataSetupBool){
      DataSetup();
    }
  },[StdInClass,StdRequest,dataSetupBool]);

  const StudentInClassSetUp = async(array1,array2)=>{
    const intersection = array1.filter(item1 =>
      array2.some(item2 => item1.Sid === item2.Sid)
    );
    return await array1.filter(item => !intersection.includes(item));

  }
  const Allusers = async () =>{
    try{
      const response = await getAllusersInClass(subjectId);
      const array1 = await response.map(item => ({
        Sid: item.Uid,
        Sname: item.Sname,
        User_PIC: item.User_PIC
      }));
      setStdInClass(array1);
      console.log('response: ',response);
    }catch(error){
      console.error('error getSubject request: ',error);
    }
  }
  const AlluserRequest = async () =>{
    try{
      const response = await getStudentRequest(subjectId);
      setStdRequest(response);
    }catch(error){
      console.error('error getSubject request: ',error);
    }
  }
  const DataSetup = async()=>{
    try{
      console.log('All: ',StdInClass);
      console.log('Request: ',StdRequest);
      if(StdInClass !== undefined && StdRequest !== undefined){
        const StudentInClass = await StudentInClassSetUp(StdInClass,StdRequest);
        console.log('Student In Class: ',StudentInClass);
        setDataSetupBool(true);
      }
    }catch(error){
      console.error('error SetUp Data:',error);
    }
  }
  const handleTextFieldSearchChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setSearch({
        ...search,
        [name]: value,
    });
  };
  const handleButtonStatusChange = (e) => {
    e.preventDefault();
    const { name } = e.target;
    setDisableBtn({
        ...disableBtn,
        [name]: true,
    });
  };

  const handleToggleAll = (items) => () => {
    console.log(checked);
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleAddInClass = () => {
    console.log('Right Concat: ',StdInClass.concat(leftChecked));
    console.log('Left Not: ',not(StdRequest, leftChecked));
    console.log('Checked Not: ',not(checked, leftChecked));
    setStdInClass(StdInClass.concat(leftChecked));
    setStdRequest(not(StdRequest, leftChecked));
    setChecked(not(checked, leftChecked));
    leftChecked.map((item)=>{
      console.log('Item: ',item);
      AddstudentSubject(item.Sid, subjectId)
      .then(result1 =>{
        console.log('result1: ',result1);
        return DeletestudentInRequest(item.Sid, subjectId);
      })
      .then(result2 =>{
        console.log('result2: ',result2);
      })
      .catch(error =>{
        console.error('Error: ', error);
      })
    });
  };
  const handleDeleteInClass = () => {
    console.log('Right : ',rightChecked);
    console.log('Right Concat: ',StdRequest.concat(rightChecked));
    console.log('Left Not: ',not(StdInClass, rightChecked));
    console.log('Checked Not: ',not(checked, rightChecked));

    setStdRequest(StdRequest.concat(rightChecked));
    setStdInClass(not(StdInClass, rightChecked));
    setChecked(not(checked, rightChecked));

    rightChecked.map((item)=>{
      console.log('Item: ',item);
      DeletestudentInSubject(item.Sid, subjectId)
      .then(result1 =>{
        console.log('result1: ',result1);
        console.log('Sid: ',item.Sid);
        console.log('SJid: ',subjectId);
        return AddstudentInRequest(item.Sid, subjectId);
      })
      .then(result2 =>{
        console.log('result2: ',result2);
      })
      .catch(error =>{
        console.error('Error: ', error);
      })
    });
  };

  const ListForm = (title, items) => (
    <Card>
      <CardHeader
        sx={{ px: 2, py: 1, width:400,  }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={
              numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              'aria-label': 'all items selected',
            }}
          />
        }
        action={
          <Grid container padding={1}>
            <Grid item xs={9}>
              <TextField fullWidth
                label="Search ID" 
                id="fullWidth"
                name={title==='StudentInClass'?'SearchStdInClass':'SearchStdRequest'}
                value={title==='StudentInClass'?search.SearchStdInClass:search.SearchStdRequest} 
                onChange={handleTextFieldSearchChange}
                size="small"
              />
            </Grid>
          </Grid>
        }
        title={title==='StudentInClass'?'นิสิตในรายวิชา':'คำร้องขอของนิสิต'}
        subheader={`${numberOfChecked(items)}/${items.length} เลือก`}
      />
      <Divider/>
      <List
        sx={{
          width:{lg:400, xs:280},  
          height: 230,
          bgcolor: 'background.paper',
          overflow: 'auto',
        }}
        dense
        component="div"
        role="list"
      >
        {items.filter((item)=>{
          if(title==='StudentInClass'){
            if(search.SearchStdInClass.toLowerCase() === ''){
              return item
            }else{
              if(item.Sid.toLowerCase().search(search.SearchStdInClass.toLowerCase()) >=0){
                return item
              }
            }
          }else if(title==='StudentRequest'){
            if(search.SearchStdRequest.toLowerCase() === ''){
              return item
            }else{
              if(item.Sid.toLowerCase().search(search.SearchStdRequest.toLowerCase()) >=0){
                return item
              }
            }
          }
          
        }).map((value)=>{
          const labelId = `transfer-list-all-item-${value}-label`;

          return(
            <ListItem
              key={value.Sid}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Avatar/>
              </ListItemIcon>
              <ListItemText id={labelId} primary={value.Sid} secondary={value.Sname}/>
              <Checkbox
                checked={checked.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{
                  'aria-labelledby': labelId,
                }}
              />
            </ListItem>
          )
        })
        }
      </List>
    </Card>
  )

  return (
    <Grid container spacing={1} justifyContent="center" alignItems="center">
      {StdRequest !== undefined?
        <Grid item xs={12} lg={4}>{ListForm('StudentRequest', StdRequest)}</Grid>:null
      }
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAddInClass}
            disabled={false}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleDeleteInClass}
            disabled={false}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      {StdInClass !== undefined?
        <Grid item xs={12} lg={4}>{ListForm('StudentInClass', StdInClass)}</Grid>:null
      }
    </Grid>
  );
}
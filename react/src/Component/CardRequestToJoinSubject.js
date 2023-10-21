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
import { Avatar, CardActions, DialogActions, DialogContent, TextField, Typography } from '@mui/material';
import { indigo } from '@mui/material/colors';
import ExpandLess from '@mui/icons-material/ExpandLess';
import axios from 'axios';
import { useState } from 'react';
import { AddstudentInRequest, DeletestudentInSubject, getAllsubjects, getAllusersInClass, getsubjects } from '../services/api';
import { useEffect } from 'react';

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

export default function CardRequestToJoinSubject({onClosed}) {
    const [sid, setSjId] = useState(localStorage.getItem('Name'));
    const [stdInClass, setStdInClass] = useState();
    const [checked, setChecked] = useState([]);
    const DeleteChk = intersection(checked, stdInClass);

    const [left, setLeft] = useState([]);
    const [right, setRight] = useState([]);
    const [search,setSearch] = useState('');
    const [search1,setSearch1] = useState("");
    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);
    const [userSubject,setUserSubject] = useState();
    const [user,setUser] = useState();
    const [userRequest,setUserRequest] = useState();

    useEffect(()=>{
        Allusers();
    },[]);

    const Allusers = async () =>{
        try{
            const response = await getsubjects(localStorage.getItem('Name'));
            setStdInClass(response);
            console.log('response: ',response);
        }catch(error){
            console.error('error getSubject request: ',error);
        }
    }
    const handleSave = async () => {
        console.log('chk: ', DeleteChk);
        for(const item of DeleteChk){
        try{
            console.log('Item: ',item.SJid);
            console.log('Sid: ',sid);
            const response = await AddstudentInRequest(sid, item.SJid)
            console.log('response: ',response);
        }catch(error){
            console.error('error getSubject request: ',error);
        }
        }
        onClosed();
    };
    const handleTextFieldSearchChange = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
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
        console.log(checked);
    };
    const numberOfChecked = (items) => intersection(checked, items).length;

    const ListForm = (items) => (
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
                        name={'SearchStdInClass'}
                        value={search} 
                        onChange={handleTextFieldSearchChange}
                        size="small"
                    />
                    </Grid>
                </Grid>
                }
                title={'Request Join Class'}
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
                    let SearchValue = search.toLowerCase();
                    console.log('Search: ',SearchValue);
                    if(SearchValue === ''){
                        return item
                    }else if(item.SJid.toLowerCase().search(SearchValue) >= 0){
                        return item
                    }
                    }).map((value)=>{
                        const labelId = `transfer-list-all-item-${value}-label`;

                        return(
                            <ListItem
                                key={value.SJid}
                                role="listitem"
                                button
                                onClick={handleToggle(value)}
                            >
                            <ListItemIcon>
                                <Avatar/>
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={value.SJid} secondary={value.SJname}/>
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
        <>
        <DialogContent>
            <Grid container spacing={1} justifyContent="center" alignItems="center">
            {stdInClass !== undefined?
                <Grid item xs={12}>{ListForm(stdInClass)}</Grid>:null
            }
            </Grid>
        </DialogContent>
        
        <DialogActions>
            <Button 
            style={{ color: 'red'}}
            onClick={()=>{onClosed();}}
            >
            Cancle
            </Button>
            <Button 
            style={{ color: 'green'}}
            onClick={handleSave}
            >
            save
            </Button>
        </DialogActions>
        </>
    );
}
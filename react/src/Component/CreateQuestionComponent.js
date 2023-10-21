import { Checkbox, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';

import * as React from 'react';

function CreateQuestion(prop) {
    const Data = prop;
    const [checkboxDis, setCheckboxDis] = React.useState(false)
    const [age, setAge] = React.useState('');
    const [input, setInput] = React.useState({
        question: "",
        A: "",
        B:"",
        C:"",
        D:"",
        E:"",
        Ans:"",
    });
    const handleChange = (event) => {
        setAge(event.target.value);
        console.log('value: ',event.target.value);
        if(event.target.value === 20){
            setCheckboxDis(true);
        }else{
            setCheckboxDis(false);
        }
    };
    const handleTextChange = async(e) =>{
        await setInput((prevState)=>({...prevState,[e.target.name] : e.target.value}));
        console.log(input);
        // Data.question.quest = input.question;
        prop.onChangeText(input,Data.i);
        // console.log('input: ',input)
    }
    const handleClose = (e) => {
        console.log(Data.i)
        prop.onClose(Data)
        // console.log('page: ',Data.element.id)
    }
    return (
        <>
            <Grid item xs={11} sx={{ display: 'flex'}}></Grid>
            <Grid item xs={1} sx={{display:'inline'}}>
                <FormControl onClick={handleClose}>
                    <IconButton aria-label="delete">
                        <CloseIcon fontSize='small' />
                    </IconButton>
                </FormControl>
                
            </Grid>
            <Grid container style={{alignItems: 'center',marginBottom: 20}}>
                <Grid item xs={2}>
                    <IconButton aria-label="delete">
                        <AddPhotoAlternateIcon />
                    </IconButton>
                </Grid>
                <Grid item xs={6} sx={{ display: 'flex'}}></Grid>
                <Grid item xs={4}>
                    <FormControl sx={{ m: 1, minWidth: 120,}} fullWidth>
                        <InputLabel id="demo-select-small">Type</InputLabel>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={age}
                            label="mutiple"
                            onChange={handleChange}
                        >
                            <MenuItem value={10}>Multiple </MenuItem>
                            <MenuItem value={20}>Short Answer</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                
            </Grid>
            <Grid container spacing={3}  style={{alignItems: 'center'}}>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <TextField
                            id="outlined-basic" 
                            variant='outlined'
                            placeholder='Question'
                            name='question'
                            value={prop.question}
                            onChange={handleTextChange}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={11}>
                    <FormControl fullWidth>
                        <TextField 
                            id="outlined-basic" 
                            variant='outlined'
                            placeholder='Choice1'
                            name='A'
                            value={prop.A}
                            onChange={handleTextChange}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={1}>
                    <FormControl>
                        <Checkbox disabled={checkboxDis} color="success" />
                    </FormControl>
                </Grid>
                <Grid item xs={11}>
                    <FormControl fullWidth>
                        <TextField 
                            variant='outlined'
                            placeholder='Choice2'
                            name='B'
                            value={input.B}
                            onChange={handleTextChange}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={1}>
                    <FormControl>
                        <Checkbox disabled={checkboxDis} color="success" />
                    </FormControl>
                </Grid>
                <Grid item xs={11}>
                    <FormControl fullWidth>
                        <TextField 
                            variant='outlined'
                            placeholder='Choice3'
                            name='C'
                            value={input.C}
                            onChange={handleTextChange}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={1}>
                    <FormControl>
                        <Checkbox disabled={checkboxDis} color="success" />
                    </FormControl>
                </Grid>
                <Grid item xs={11}>
                    <FormControl fullWidth>
                        <TextField 
                            variant='outlined'
                            label="Choice4"
                            placeholder='Choice4'
                            name='D'
                            value={input.D}
                            onChange={handleTextChange}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={1}>
                    <FormControl>
                        <Checkbox disabled={checkboxDis} color="success" />
                    </FormControl>
                </Grid>
                <Grid item xs={11}>
                    <FormControl fullWidth>
                        <TextField 
                            variant='outlined'
                            label="Choice5"
                            placeholder='Choice5'
                            name='E'
                            value={input.E}
                            onChange={handleTextChange}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={1}>
                    <FormControl>
                        <Checkbox disabled={checkboxDis} color="success" />
                    </FormControl>
                </Grid>
            </Grid>
        </>
    );
}

export default CreateQuestion;
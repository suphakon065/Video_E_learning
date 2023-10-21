import { FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { green, pink, red } from '@mui/material/colors';

function MultipleRadio(prop) {
    const {
        choice,
        choiceName,
        ans,
        select,
    } = prop
    console.log(choiceName," ss ",ans)
    if(ans === choiceName){
        return(
            <FormControlLabel control={<Radio color='success'/>} label={choice} value={choice} sx={{color: green[800],'&.Mui-checked': {color: green[600],},}}/>
        )
    }else if(choiceName === select){
        return(
            <FormControlLabel control={<Radio color='error'/>} label={choice} value={choice} sx={{color: red[800],'&.Mui-checked': {color: red[600],},}}/>
        )
    }else{
        return(
            <FormControlLabel control={<Radio color='error'/>} label={choice} value={choice}/>
        )
    }
}

export default MultipleRadio;
import { FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { green, pink } from '@mui/material/colors';

import MultipleRadio from './MultipleRadioComponent';

function DialogQuestion(prop) {
    const {
        id,
        QuizId,
        typeQ,
        question,
        choice1,
        choice2,
        choice3,
        choice4,
        choice5,
        answer,
        myselect,
        result,
    } = prop
    const choices = [
        {choice:choice1,ans:answer,select:myselect},
        {choice:choice2,ans:answer,select:myselect},
        {choice:choice3,ans:answer,select:myselect},
        {choice:choice4,ans:answer,select:myselect},
        {choice:choice5,ans:answer,select:myselect},
    ];
    console.log({typeQ})
    if(typeQ == 0){
            return (
                <>
                <FormLabel>
                    {question}
                </FormLabel>
                <RadioGroup name='job-experience-group' aria-labelledby='job-experience-group-label'>
                    {choices.map((element)=>{
                        return(
                            <FormControlLabel control={<Radio/>} label={element.choice} value={element.choice}/>
                            // <MultipleRadio {...element}/>
                        )
                    }
                        // <FormControlLabel control={<Radio color='success'/>} label={choice} value={choice} sx={{color: green[800],'&.Mui-checked': {color: green[600],},}}/>:
                        // <FormControlLabel control={<Radio color='error'/>} label={choice} value={choice}/>
                    )}
                    {/* <FormControlLabel control={<Radio/>} label={choice1} value={choice1}/>
                    <FormControlLabel control={<Radio color='success'/>} label={choice2} value={choice2} sx={{
                        color: green[800],
                        '&.Mui-checked': {
                            color: green[600],
                        },
                        }}
                    />
                    <FormControlLabel control={<Radio/>} label={choice3} value={choice3}/>
                    <FormControlLabel control={<Radio/>} label={choice4} value={choice4}/>
                    <FormControlLabel control={<Radio/>} label={choice5} value={choice5}/>  */}
                </RadioGroup>
                </>
            )
    }else{
        if(result == true){
            return(
                <>
                    <FormLabel>
                        {question}
                    </FormLabel>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <TextField variant='outlined'/>
                        </Grid>
                    </Grid>
                </>
            )
        }else{
            return(
                <>
                    <FormLabel>
                        {question}
                    </FormLabel>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                error
                                id="outlined-error"
                                value={myselect}
                            />
                        </Grid>
                    </Grid>
                </>
            )
        }
    }
}
export default DialogQuestion;

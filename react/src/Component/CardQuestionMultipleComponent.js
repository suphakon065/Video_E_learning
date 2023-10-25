import { FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { green, pink } from '@mui/material/colors';

import MultipleRadio from './MultipleRadioComponent';
import Servicesconfig from '../Storage/servicesConfig';

function CardQuestionMultiple(prop) {
    const {
        PIC,
        Qtype,
        Question,
        A,B,C,D,E,
        Answer,
        Myanser,
    } = prop
    const choices = [
        {choice:A,choiceName:'A',ans:Answer,select:Myanser},
        {choice:B,choiceName:'B',ans:Answer,select:Myanser},
        {choice:C,choiceName:'C',ans:Answer,select:Myanser},
        {choice:D,choiceName:'D',ans:Answer,select:Myanser},
        {choice:E,choiceName:'E',ans:Answer,select:Myanser},
    ];
    if(Qtype == 1){
        let Anschoice = null;
        if(Myanser === A){
            Anschoice = A
        }else if(Myanser === B){
            Anschoice = B
        }else if(Myanser === C){
            Anschoice = C
        }else if(Myanser === D){
            Anschoice = D
        }else if(Myanser === E){
            Anschoice = E
        }
            return (
                <Grid container paddingBottom={2}>
                    <Grid item xs={12}>
                        {PIC !== null?
                            <Grid container style={{alignItems: 'center',marginBottom: 20}}>
                            <Grid xs={3}></Grid>
                            <Grid xs={6} align={'center'}>
                                <img 
                                src={Servicesconfig.getImageQuest+PIC.toLowerCase()}
                                alt={Servicesconfig.getImageQuest+PIC.toLowerCase()}
                                width='100%'
                                height='50%'
                                />
                            </Grid>
                            </Grid>:null
                        }
                    </Grid>
                    <Grid item xs={12}>
                        <FormLabel>
                            {Question}
                        </FormLabel>
                    </Grid>
                    <Grid item xs={12}>
                        <RadioGroup name='job-experience-group' aria-labelledby='job-experience-group-label'value={Anschoice}>
                            {choices.filter((item)=>{
                                if(item.choice !== ''){
                                    return item
                                }
                            }).map((element)=>{
                                return(
                                    <MultipleRadio {...element}/>
                                )
                            }
                            )}
                        </RadioGroup> 
                    </Grid>
                    
                </Grid>
            )
    }else{
        let Anschoicebool = false;
        console.log('Myanser: ',Myanser);
        if(Myanser !== null){
            console.log('Myanser1: ',Myanser);
            if(Myanser === A){
                Anschoicebool = true
            }else if(Myanser === B){
                Anschoicebool = true
            }else if(Myanser === C){
                Anschoicebool = true
            }else if(Myanser === D){
                Anschoicebool = true
            }else if(Myanser === E){
                Anschoicebool = true
            }
        }
        if(Anschoicebool == true){
            return(
                <Grid container paddingBottom={3}>
                    <Grid item xs={12} paddingBottom={1}>
                        <FormLabel>
                            {Question}
                        </FormLabel> 
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <TextField value={Myanser} variant='outlined'/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            )
        }else{
            return(
                <Grid container paddingBottom={3}>
                    <Grid item xs={12}>
                        {PIC !== null?
                            <Grid container style={{alignItems: 'center',marginBottom: 20}}>
                            <Grid xs={3}></Grid>
                            <Grid xs={6} align={'center'}>
                                <img 
                                src={Servicesconfig.getImageQuest+PIC.toLowerCase()}
                                alt={Servicesconfig.getImageQuest+PIC.toLowerCase()}
                                width='100%'
                                height='50%'
                                />
                            </Grid>
                            </Grid>:null
                        }
                    </Grid>
                    <Grid item xs={12} paddingBottom={1}>
                        <FormLabel>
                            {Question}
                        </FormLabel> 
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <TextField
                                    error
                                    id="outlined-error"
                                    value={Myanser}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            )
        }
    }
}

export default CardQuestionMultiple;

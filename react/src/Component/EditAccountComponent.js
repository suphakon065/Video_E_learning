import React, { useEffect } from "react";
import { useState } from "react";
import Typography from '@mui/material/Typography'
import { Box } from "@mui/system";
import { Avatar, Button, FormControl, Grid, Icon, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";

import HeaderBar from "./HeaderBarComponent";

import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from "axios";
import { indigo } from "@mui/material/colors";
import config from "../Storage/config";
import Servicesconfig from "../Storage/servicesConfig";
import { EditUser, EditUserImg } from "../services/api";
import { EditAccountAvatarStyles, EditAccountBoxStyles, EditAccountButtonStyles, EditAccountFormControlPasswordStyles, EditAccountGridAllContentStyles, EditAccountGridButtonStyles, EditAccountGridHeadStyles, EditAccountGridIDStyles, EditAccountGridMidSpaceStyles, EditAccountGridNameStyles, EditAccountGridNewPasswordStyles, EditAccountGridPasswordStyles, EditAccountGridsubtltleStyles, EditAccountInputAdornmentStyles, EditAccountSaveIconStyles, EditAccountTypographyBlankStyles, EditAccountTypographySubtitleStyles, EditAccountTypographyTitleStyles } from "./Styles/EditAccountPageStyles";

const EditAccount = () =>{
    const location = useLocation();
    const UserData = location.state;
    const [showPassword, setShowPassword] = React.useState(false);
    const [shownewPassword, setShownewPassword] = React.useState(false);
    const [userForm, setUserForm] = useState({
        stdId: UserData!==undefined?UserData.Uid:'',
        stdName: UserData!==undefined?UserData.Sname:"",
        stdPassword: '',
        stdNewPassword: '',
        User_PIC: UserData!==undefined?UserData.User_PIC:'',
    });
    const [fileImg,setFileImg] = useState();
    const [Img,setImg] = useState();
    const navigate = useNavigate();
    const AccontPagePath = config.AccountPage;

    useEffect(()=>{
        setImg(handleChangeImage(userForm));
    },[]);

    const navigateToContacts = ()=>{
        navigate(AccontPagePath);
    }

    const handleClickShownewPassword = () => setShownewPassword((show) => !show);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setUserForm({
            ...userForm,
            [name]: value,
        });
    }

    const handleChangeImage =(index)=>{
        try{
            setFileImg(index.target.files);
            const Imgfile = Array.from(index.target.files).map((file)=>URL.createObjectURL(file));
            Array.from(index.target.files).map((file)=>URL.revokeObjectURL(file));
            return Imgfile
        }catch(err){
            return Servicesconfig.getImageProfile+index.User_PIC
        }
    }

    const handleSave = async()=>{
            try{
                let picName = '';
                if(fileImg!==undefined){
                    let rand = Math.floor(Math.random()* 10000);
                    const picLastName = userForm.stdId+ fileImg[0].name.substr(fileImg[0].name.length - 4);
                    picName = rand.toString()+'-'+picLastName.toLowerCase();
                }else{
                    picName=userForm.User_PIC
                }

                const response = await EditUser(UserData.Uid,userForm,picName);
                console.log('Response: ',response);
                console.log('userId ',UserData.Uid);
                console.log('userForm ',userForm);
                console.log('ImageName ', picName);
                localStorage.setItem('Name',userForm.stdId);
                navigateToContacts();
                
                if(fileImg!==undefined){
                    try{
                        const responseImgEdit = await EditUserImg(fileImg,picName);
                        console.log('responseEditImg: ',responseImgEdit);
                        navigateToContacts();
                    }catch(error){
                        console.error(error);
                    }
                }else{
                    navigateToContacts();
                }
            }catch(error){
                console.error(error);
            }
            
            
    }

    return(
        <div>
            <Box sx={EditAccountBoxStyles}>
                <Grid container sx={EditAccountGridAllContentStyles}>
                    <Grid container sx={EditAccountGridHeadStyles}>
                        <Grid xs={12}>
                            <Typography variant="h4" sx={EditAccountTypographyTitleStyles}
                            >
                                Edit Account
                            </Typography>
                        </Grid>
                        <Grid xs={4}>
                            <Avatar
                                alt="Remy Sharp"
                                src={Img}
                                sx={EditAccountAvatarStyles}
                            />
                        </Grid>
                        <Grid xs={7}>
                            <Grid container>
                                <Typography variant="subtitle1" sx={EditAccountTypographySubtitleStyles}>
                                    &nbsp;Image
                                </Typography>
                                <TextField
                                    className='TextfieldBorderRadius'
                                    name="User_PIC"
                                    id="outlined-basic" 
                                    variant='outlined'
                                    placeholder='Question'
                                    type='file'
                                    sx={EditAccountInputAdornmentStyles}
                                    size={"small"}
                                    onChange={(e)=>{ setImg(handleChangeImage(e));}}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    
                    <Grid container sx={EditAccountGridIDStyles}>
                        <Grid item xs={4}>
                            <Typography variant="subtitle2" sx={EditAccountTypographyBlankStyles}>
                                &nbsp;
                            </Typography>
                            <Typography variant="subtitle1" sx={EditAccountTypographySubtitleStyles}>
                                student ID
                            </Typography>
                        </Grid>
                        <Grid item xs={8} sx={EditAccountGridMidSpaceStyles}>
                            <TextField 
                                disabled
                                fullWidth
                                margin="normal"
                                name='stdId'
                                value={userForm.stdId}
                                className='TextfieldBorderRadius'
                                placeholder='Student ID' 
                                type={'text'} 
                                sx={EditAccountInputAdornmentStyles}
                                onChange={handleChange}
                                size={"small"}
                            />
                        </Grid>
                    </Grid>
                    <Grid container sx={EditAccountGridNameStyles}>
                        <Grid item xs={4} sx={EditAccountGridsubtltleStyles}>
                            <Typography variant="subtitle2" sx={EditAccountTypographySubtitleStyles}>
                                Name
                            </Typography>
                        </Grid>
                        <Grid item xs={8} sx={EditAccountGridMidSpaceStyles}>
                            <TextField
                                fullWidth
                                margin="normal"
                                name='stdName'
                                value={userForm.stdName}
                                className='TextfieldBorderRadius' 
                                placeholder='Student ID' 
                                type={'text'} 
                                sx={EditAccountInputAdornmentStyles}
                                onChange={handleChange}
                                size={"small"}
                            />
                        </Grid>
                    </Grid>
                    <Grid container sx={EditAccountGridPasswordStyles}>
                        <Grid item xs={4}>
                            <Typography variant="caption" textAlign="left">&nbsp;</Typography>
                            <Typography variant="subtitle1" sx={EditAccountTypographySubtitleStyles}>
                                Password
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <FormControl sx={EditAccountFormControlPasswordStyles} variant="outlined">
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    name='stdPassword'
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                            >
                                            {!showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                    sx={EditAccountInputAdornmentStyles}
                                    value = {userForm.stdPassword}
                                    onChange={handleChange}
                                    size={"small"}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container sx={EditAccountGridNewPasswordStyles}>
                        <Grid item xs={4}>
                            <Typography variant="caption" textAlign="left">&nbsp;</Typography>
                            <Typography variant="subtitle1" sx={EditAccountTypographySubtitleStyles}>
                                New Password
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <FormControl sx={EditAccountFormControlPasswordStyles} variant="outlined">
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    name='stdNewPassword'
                                    type={shownewPassword ? 'text' : 'password'}
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShownewPassword}
                                            edge="end"
                                            >
                                            {!shownewPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                    sx={EditAccountInputAdornmentStyles}
                                    value = {userForm.stdNewPassword}
                                    onChange={handleChange}
                                    size={"small"}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container sx={EditAccountGridButtonStyles}>
                        <Grid item>
                            <Button fullWidth
                                sx={EditAccountButtonStyles} 
                                variant="contained"
                                onClick={handleSave}
                            >
                                <Icon>
                                    <SaveIcon sx={EditAccountSaveIconStyles}/>
                                </Icon>
                                &nbsp;Save 
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

export default EditAccount
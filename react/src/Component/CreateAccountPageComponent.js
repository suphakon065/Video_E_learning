import './Styles/ControlVideoStyle.css'
import { useState } from "react";
import { useRef } from "react";
import Typography from '@mui/material/Typography'
import { Box } from "@mui/system";
import { Avatar, Button, FormControl, Grid, IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import { Link } from "react-router-dom";

import { indigo, red } from "@mui/material/colors";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import EditIcon from '@mui/icons-material/Edit';

import { CreateAccount } from "../services/api";
import config from "../Storage/config";
import { CreateAccountAddPhotoAlternateIconStyles, CreateAccountBoxStyles, CreateAccountDivStyles, CreateAccountEditIconStyles, CreateAccountGridOutlinedInputStyles, CreateAccountGridAvatarStyles, CreateAccountHeadTypographyStyles, CreateAccountIconButtonStyles, CreateAccountSignInStyles, CreateAccountFormControlOutlinedInputStyles, CreateAccountGridOutlinedNameInputStyles, CreateAccountOutlinedFirstNameInputStyles, CreateAccountOutlinedLastNameInputStyles, CreateAccountOutlinedInputStyles, CreateAccountInputAdornmentStyles, CreateAccountFormControlOutlinedNameInputStyles, CreateAccountErrorTypographyStyles, CreateAccountSIGN_UPButtonStyles, CreateAccountTypographySIGN_UPButtonStyles, CreateAccountAvatarStyles } from './Styles/CreateAccountPageStyles';

const CreateAccountPage = () =>{
    const LoginPage = config.loginPage;
    const [img,setImg] = useState();
    const fileInputRef = useRef(null);
    const [formData,setFormData] = useState({
        userID:'',
        Fname:'',
        Lname:'',
        password:'',
        confirmPW:'',
        Pic:undefined,
    });
    const [textError,setTextError] = useState({
        textF: false,
        paswordTF: false,
        confirmPwTF:false,
        CFPW: false,
        UserError: false,
    })
    const [iconPic, setIconPic] = useState(false);
    const [showPassword, setShowPassword] = useState({
        passwordSH: false,
        CFpasswordSH: false,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log('Form: ',formData);
        if(formData.userID !== ''){
            if(formData.Fname !== ''&&formData.Lname !== ''){
                if(formData.password === formData.confirmPW && formData.password!== ''){
                    setTextError({
                        ...textError,
                        textF: false,
                        paswordTF: false,
                        confirmPwTF: false,
                        CFPW: false,
                    });
                    const response = await CreateAccount(formData);
                    console.log('output: ',response.data)
                    if(response.data === true){
                        window.location.href = LoginPage
                    }else{
                        setTextError({
                            ...textError,
                            UserError: true,
                        });
                    }
                }else{
                    if(formData.password === formData.confirmPW){
                        if(formData.password === '' && formData.confirmPW === ''){
                            setTextError({
                                ...textError,
                                textF: true,
                                paswordTF: true,
                                confirmPwTF: true,
                            });
                            console.log('กรุณาใส่ password');//กรุณากรอกข้อมูลให้ครบถ้วน
                        }
                    }else{
                        setTextError({
                            ...textError,
                            paswordTF: true,
                            confirmPwTF: true,
                            CFPW: true,
                        });
                        console.log('Confirm password not correct');
                    }
                }
            }else{
                setTextError({
                    ...textError,
                    textF: true,
                    paswordTF: true,
                    confirmPwTF: true,
                });
                console.log('ไม่ได้ใส่ Fname or Lname');//กรุณากรอกข้อมูลให้ครบถ้วน
            }
        }else{
            setTextError({
                ...textError,
                textF: true,
                paswordTF: true,
                confirmPwTF: true,
            });
            console.log('ไม่ได้ใส่ userID');//กรุณากรอกข้อมูลให้ครบถ้วน
        }
    }

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if(selectedFile !== undefined){
            const fileImg = Array.from(e.target.files).map((file)=>URL.createObjectURL(file));
            setFormData({
                ...formData,
                Pic: e.target.files,
            });
            setImg(fileImg);
            setIconPic(true);
        }else{
            setFormData({
                ...formData,
                Pic: undefined,
            });
            setImg();
            setIconPic(false);
        }
    };
    return(
        <div>
            <Box sx={CreateAccountBoxStyles}>
                <Typography sx={CreateAccountHeadTypographyStyles}>
                        Sign up
                    </Typography>
                    <Typography sx={CreateAccountSignInStyles}>
                        Already have an account? &nbsp;
                        <Link to={LoginPage}>
                            Sign in
                        </Link>
                    </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container sx={CreateAccountGridAvatarStyles}>
                        <div style={CreateAccountDivStyles}>
                            <Avatar 
                                alt="Avatar" 
                                src={img}
                                style={CreateAccountAvatarStyles} 
                            />
                            <input
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                ref={fileInputRef}
                                onChange={handleFileChange}
                            />
                            <IconButton
                                style={CreateAccountIconButtonStyles}
                                onClick={()=>{fileInputRef.current.click()}}
                            >
                                {!iconPic ? 
                                    <AddPhotoAlternateIcon 
                                        style={CreateAccountAddPhotoAlternateIconStyles}/> :
                                    <EditIcon 
                                        style={CreateAccountEditIconStyles}/>
                            }
                            </IconButton>
                        </div>
                    </Grid>
                    <Grid container sx={CreateAccountGridOutlinedInputStyles}
                    >
                        <FormControl sx={CreateAccountFormControlOutlinedInputStyles}>
                            <OutlinedInput
                                id="outlined"
                                name='userID'
                                placeholder='Student ID' 
                                error={textError.textF}
                                sx={CreateAccountOutlinedInputStyles}
                                value = {formData.userID}
                                onChange={handleInputChange}
                            />
                        </FormControl> 
                    </Grid>
                    
                    <Grid container spacing={1} sx={CreateAccountGridOutlinedNameInputStyles}>
                        <Grid item xs={6}>
                            <FormControl sx={CreateAccountFormControlOutlinedNameInputStyles}>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    name='Fname'
                                    placeholder='First Name' 
                                    error={textError.textF}
                                    sx={CreateAccountOutlinedFirstNameInputStyles}
                                    value = {formData.Fname}
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl sx={CreateAccountFormControlOutlinedNameInputStyles}>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    name='Lname'
                                    placeholder='Last Name' 
                                    error={textError.textF}
                                    sx={CreateAccountOutlinedLastNameInputStyles}
                                    value = {formData.Lname}
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12}>
                            <FormControl sx={CreateAccountFormControlOutlinedInputStyles}>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    name='password'
                                    placeholder='Password' 
                                    error={textError.paswordTF}
                                    type={showPassword.passwordSH ? 'text' : 'password'}
                                    sx={CreateAccountOutlinedInputStyles}
                                    value = {formData.password}
                                    onChange={handleInputChange}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={()=>{
                                                    setShowPassword({
                                                        ...showPassword,
                                                        passwordSH: !showPassword.passwordSH,
                                                    });
                                                }}
                                                onMouseDown={(event)=>{event.preventDefault();}}
                                                edge="end"
                                            >
                                                {!showPassword.passwordSH ? <VisibilityOff/> : <Visibility/>}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl> 
                        </Grid>
                        
                    </Grid>
                    <Grid container>
                        <Grid item xs={12}>
                            <FormControl sx={CreateAccountFormControlOutlinedInputStyles}>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    name='confirmPW'
                                    placeholder='Confirm Password' 
                                    error={textError.confirmPwTF}
                                    type={showPassword.CFpasswordSH ? 'text' : 'password'}
                                    sx={CreateAccountOutlinedInputStyles}
                                    value = {formData.confirmPW}
                                    onChange={handleInputChange}
                                    endAdornment={
                                        <InputAdornment sx={CreateAccountInputAdornmentStyles}>
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={()=>{
                                                    setShowPassword({
                                                        ...showPassword,
                                                        CFpasswordSH: !showPassword.CFpasswordSH,
                                                    });
                                                }}
                                                onMouseDown={(event)=>{event.preventDefault();}}
                                                edge="end"
                                            >
                                                {!showPassword.CFpasswordSH ? <VisibilityOff/> : <Visibility/>}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl> 
                        </Grid>
                        
                    </Grid>
                    <Grid container justifyContent={"center"}>
                        {textError.textF && textError.paswordTF && textError.confirmPwTF?
                            <Grid item>
                                <Typography variant="caption" sx={CreateAccountErrorTypographyStyles} >กรุณากรอกข้อมูลให้ครบถ้วน</Typography>
                            </Grid>:null
                        }
                        {textError.CFPW ?
                            <Grid item>
                                <Typography variant="caption" sx={CreateAccountErrorTypographyStyles} >การยืนยันรหัสผ่านไม่ถูกต้อง</Typography>
                            </Grid>:null
                        }
                        {textError.UserError ?
                            <Grid item>
                                <Typography variant="caption" sx={CreateAccountErrorTypographyStyles} >มีผู้ใช้นี้อยู่ในระบบแล้ว</Typography>
                            </Grid>:null
                        }
                    </Grid>
                    <Grid container>
                        <Grid item xs={12}>
                            <Button fullWidth
                                type="submit"
                                sx={CreateAccountSIGN_UPButtonStyles} 
                            >
                                <Typography sx={CreateAccountTypographySIGN_UPButtonStyles}>Sign up</Typography>
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </div>
    )
}

export default CreateAccountPage
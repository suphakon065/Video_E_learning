import { useState } from "react";
import Typography from '@mui/material/Typography'
import { Box } from "@mui/system";
import { Button, FormControl, Grid, IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import { Link } from "react-router-dom";
import { indigo, red } from "@mui/material/colors";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { LoginCheck } from "../services/api";
import config from "../Storage/config";
import { loginBoxStyles, loginButtonSubmitStyles, loginErrorGrid, loginErrorTextGrid, loginErrorTextGridStyles, loginErrorTypography, loginErrorTypographyStyles, loginFormControl, loginFormControlStyles, loginHeadTypographyStyles, loginLinkCreateAccStyles, loginOutlinedInput, loginOutlinedInputStyles } from "./Styles/LoginPageStyles";

const LoginPage = () =>{
    const [formData,setFormData] = useState({
        userID:'',
        password:''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [textError, setTextError] = useState(false);
    const teacherRole = config.teacherRole;
    const studentRole = config.studentRole;
    const teacherHomepage = config.teacherHomepage;
    const studentHomepage = config.studentHomepage;
    const createAccount = config.createAccountPage;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleSubmit = async(e) => {
        console.log('FormData: ',formData);
        e.preventDefault();
        try {
            const response = await LoginCheck(formData);
            console.log('POST request successful!', response);
            if(response.role === teacherRole){
                setTextError(false);
                console.log('Correct TeacherPage');
                localStorage.setItem('Name',response.Uid);
                localStorage.setItem('Link',teacherHomepage);
                window.location.href = teacherHomepage;
            }else if(response.role === studentRole){
                setTextError(false);
                console.log('Correct StudentPage');
                localStorage.setItem('Name',response.Uid);
                localStorage.setItem('Link',studentHomepage);
                window.location.href = studentHomepage;
            }else{
                setTextError(true);
                console.log(' userID or password not correct');
            }
        } catch (error) {
            console.error('Error sending POST request:', error);
        }
        console.log(formData);
      };
    return(
        <div>
            <Box sx={loginBoxStyles}>
                <Typography sx={loginHeadTypographyStyles}>
                    Login
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container>
                        <FormControl sx={loginFormControlStyles}>
                            <OutlinedInput
                                id="outlined"
                                name='userID'
                                placeholder='Enter your Student ID' 
                                sx={loginOutlinedInputStyles}
                                error={textError}
                                value = {formData.userID}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid container>
                        <FormControl sx={loginFormControlStyles}>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                name='password'
                                placeholder='Enter your Password'
                                sx={loginOutlinedInputStyles} 
                                error={textError}
                                type={showPassword ? 'text' : 'password'}
                                value = {formData.password}
                                onChange={handleInputChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton edge="end"
                                            onClick={()=>{setShowPassword((show)=>!show);}}
                                            onMouseDown={(event)=>{event.preventDefault();}}
                                        >
                                            {!showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Grid>
                    {textError?
                        <Grid container sx={loginErrorTextGridStyles}>
                            <Grid item>
                                <Typography sx={loginErrorTypographyStyles} >Student ID หรือ Password ไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง</Typography>
                            </Grid>
                        </Grid>:null
                    }
                    <Grid container>
                        <Button fullWidth
                            type="submit"
                            sx={loginButtonSubmitStyles} 
                        >
                            <Typography sx={{color: indigo[50]}}>Log in</Typography>
                        </Button>
                    </Grid>
                    
                </form>
                <Grid container sx={loginLinkCreateAccStyles}>
                    <Grid item xs={6}>
                        <Link to={createAccount}>Create account</Link>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

export default LoginPage
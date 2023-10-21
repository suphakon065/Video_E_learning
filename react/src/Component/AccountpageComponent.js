import React, { useEffect } from "react";
import { useState } from "react";
import Typography from '@mui/material/Typography'
import { Box } from "@mui/system";
import { Avatar, Button,  Grid } from "@mui/material";
import { Link } from "react-router-dom";

import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";
import { indigo } from "@mui/material/colors";
import Servicesconfig from "../Storage/servicesConfig";
import { getUser } from "../services/api";
import config from "../Storage/config";
import { AccountAvatarStyles, AccountBoxStyles, AccountButtonStyles, AccountGridButtonStyles, AccountGridStyles, AccountTypographySubTitleStyles, AccountTypographyTextStyles, AccountTypographyTitleStyles } from "./Styles/AccountPageStyles";

const AccountPage = () =>{
    const [userData,setUserData] = useState();
    const UserId = JSON.parse(localStorage.getItem('Name'));
    const EditAccountPagePath = config.EditAccountPage;

    useEffect(()=>{
        if(UserId!==null){
            getUserData();
        }
    },[]);

    const handleChangeImage =(index)=>{
        try{
          const fileImg = Array.from(index.User_PIC).map((file)=>URL.createObjectURL(file));
          Array.from(index.User_PIC).map((file)=>URL.revokeObjectURL(file));
          return fileImg
        }catch(err){
          return Servicesconfig.getImageProfile+index.User_PIC
        }
    }
    const getUserData = async()=>{
        console.log('User: ',userData);
        const response = await getUser(UserId);
        setUserData(response);
    }

    return(
        <div>
            <Box sx={AccountBoxStyles}>
                <Grid container sx={AccountGridStyles}>
                    <Typography variant="h4" sx={AccountTypographyTitleStyles}>
                        Account
                    </Typography>
                    <Grid container flexDirection={'row'} >
                        <Grid item xs={5}>
                            <Avatar
                                alt="Remy Sharp"
                                src={userData!==undefined?Servicesconfig.getImageProfile+userData.User_PIC:null}
                                sx={AccountAvatarStyles}
                            />
                        </Grid>
                        <Grid item xs={7} 
                            paddingTop={2} 
                            sx={{ width: '100px' }}
                        >
                            <Grid container 
                                paddingleft={3} 
                                paddingBottom={2}
                            >
                                <Grid item xs={5}>
                                    <Typography 
                                        variant="subtitle1" 
                                        sx={AccountTypographySubTitleStyles}
                                    >
                                        User ID&nbsp;:
                                    </Typography>
                                </Grid>
                                <Grid item xs={7}>
                                    <Typography
                                        variant="subtitle1" 
                                        sx={AccountTypographyTextStyles}
                                    >
                                        {userData!==undefined?UserId:null}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container 
                                paddingleft={3} 
                                paddingBottom={2}
                            >
                                <Grid item xs={4}>
                                    <Typography 
                                        variant="subtitle1" 
                                        sx={AccountTypographySubTitleStyles}
                                    >
                                        Name&nbsp;:
                                    </Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography 
                                        variant="subtitle1" 
                                        sx={AccountTypographyTextStyles}
                                    >
                                        {userData!==undefined?userData.Sname:null}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container sx={AccountGridButtonStyles}
                    >
                        <Grid item>
                            <Button fullWidth
                                as={Link}
                                to={EditAccountPagePath}
                                state={userData}
                                onClick={(()=>{})}
                                sx={AccountButtonStyles}
                                variant="contained"
                                startIcon={<EditIcon/>}

                            >
                                Edit&nbsp;account
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

export default AccountPage
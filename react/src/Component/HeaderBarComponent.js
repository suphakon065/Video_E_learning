import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Menu, MenuItem, Box, IconButton, Tooltip, Grid, Divider, ListItemIcon} from '@mui/material';

import Logout from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';
import './Styles/ControlVideoStyle.css'
import { indigo, red } from '@mui/material/colors';
import { Context } from '../Context';
import axios from 'axios';
import { useEffect } from 'react';
import { ShowImageProfile, getUser } from '../services/api';
import Servicesconfig from '../Storage/servicesConfig';
import config from '../Storage/config';

function HeaderBar() {
    const Uid = localStorage.getItem('Name');
    const link = localStorage.getItem('Link');
    const LogoutPath = config.loginPage;
    const AccountPath = config.AccountPage
    const showImage = Servicesconfig.getImageProfile
    const [userData,setUserData] = useState();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    useEffect(()=>{
        if(JSON.parse(Uid)!==null){
            getUserData();
        }
    },[]);

    const getUserData = async () =>{
        const response = await getUser(JSON.parse(Uid));
        setUserData(response);
    }
  return (
    <div>
        <AppBar position='fixed'>
            <Toolbar className='HeaderBar'>
                <Typography
                    as={Link}
                    variant="h6"
                    noWrap
                    component="a"
                    to={`${link}`}
                    sx={{
                    mr: 2,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.1rem',
                        textDecoration: 'none',
                        color: indigo[900]
                    }}
                >
                    EduVid
                </Typography>

                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}></Box>

                <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
                    <Tooltip title="Open settings">
                        <IconButton 
                            sx={{ p: 0 }}
                            onClick={handleOpen}
                        >
                            <MenuIcon alt="Remy Sharp"sx={{ color: indigo[900] }}/>
                        </IconButton>
                    </Tooltip>
                </Box>
                <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex', paddingRight:20 } }}>
                    <Tooltip title="Open settings">
                        <IconButton 
                            sx={{ p: 0 }}
                            onClick={handleOpen}
                        >
                            <Avatar 
                                src={userData!==undefined?showImage+userData.User_PIC:null}
                                sx={{ 
                                    bgcolor: indigo[900],
                                }}
                            />
                        </IconButton>
                    </Tooltip>
                </Box>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                        },
                        '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                        },
                    },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem 
                        as={Link}
                        to={AccountPath}
                        sx={{
                            paddingRight:5,
                            color: indigo[900] 
                        }}
                    >
                        <Avatar 
                            src={userData!==undefined?showImage+userData.User_PIC:null}
                            sx={{ bgcolor: indigo[900] }}
                        /> 
                        &nbsp;Profile
                    </MenuItem>
                    <Divider />
                    <Link to={LogoutPath} style={{ textDecoration: 'none'}}
                        onClick={(()=>{
                            localStorage.setItem('Name',null);
                        })}
                    >
                        <MenuItem 
                            sx={{ color: indigo[900] }}
                        >
                            <ListItemIcon>
                                <Logout fontSize="small" sx={{ color: indigo[900] }}/>
                            </ListItemIcon>
                            &nbsp;Logout
                        </MenuItem>
                    </Link>
                </Menu>
            </Toolbar>
        </AppBar>
        <Toolbar/>
    </div>
  );
}

export default HeaderBar

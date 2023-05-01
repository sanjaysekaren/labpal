import { AppBar, Icon } from '@mui/material';
import React from 'react';
import logo from '../images/labpal-logo1.png';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PhoneIcon from '@mui/icons-material/Phone';

const HeaderComponent = () => {
    return (
        <div className='header'>
            <AppBar position="static" color="primary" className='header-content'>
                <span className='header-logo'>
                    <img src={logo} alt="logo" height={"50"} width={"50"}/>
                </span>
                <span className='header-left-container'>
                    <h1>laBPal</h1>
                </span>
                <span className='header-right-container'>
                    <div className='account-container'>
                        <AccountBoxIcon sx={{ color: "white", fontSize: 30 }} />
                        <span className='icon-text'>My Account</span>
                    </div>
                    <div className='account-container'>
                        <PhoneIcon sx={{ color: "white", fontSize: 30 }} />
                        <span className='icon-text'>Contact Us</span>
                    </div>
                </span>
            </AppBar>
        </div>
    )
}

export default HeaderComponent;
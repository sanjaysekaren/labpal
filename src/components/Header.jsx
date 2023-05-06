import { AppBar } from '@mui/material';
import React from 'react';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PhoneIcon from '@mui/icons-material/Phone';
import RutoHealthIcon from './RutoHealthIcon';

const HeaderComponent = () => {
    const handleLogout = () => {
        sessionStorage.setItem("token","");
        window.location.href = "/login"
    }
    return (
        <div className='header'>
            <AppBar position="static" color="primary" className='header-content'>
                <span className='header-left-container' onClick={() => window.location.href = "/"}>
                    <span className='header-logo'>
                        <RutoHealthIcon/>
                    </span>
                </span>
                <span className='header-right-container'>
                    <div className='account-container' onClick={handleLogout}>
                        <AccountBoxIcon sx={{ color: "white", fontSize: 30 }} />
                        <span className='icon-text'>Logout</span>
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
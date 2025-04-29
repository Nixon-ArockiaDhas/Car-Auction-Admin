import React from 'react';
import './navbar.css';
import { Grid2, Tooltip, Toolbar, Box, AppBar, useScrollTrigger, IconButton } from '../../MaterialComponents';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../slices/authSlice';
import { useDispatch } from 'react-redux';

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const trigger = useScrollTrigger();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };
  const profileNavigate = () => {
    navigate('/profile');
  }

  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="sticky" className='navbar' >
        <Toolbar >
          <Grid2 container className="navbarContainer" sx={{ width: '100%' }}>
            <Tooltip title="Profile">
              <IconButton onClick={profileNavigate} className='navbarButon'>
                <img src='/images/icons/profile.svg' alt='profile icon' />
              </IconButton>
            </Tooltip>

            <Tooltip title="Logout">
              <IconButton onClick={handleLogout} className='navbarButon'>
                <img src='/images/icons/logout.svg' alt='logout icon' />
              </IconButton>
            </Tooltip>
          </Grid2>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

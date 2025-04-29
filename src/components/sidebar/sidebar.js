import React, { useEffect } from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemButton, Tooltip, CircularProgress, Avatar } from '../../MaterialComponents';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSidebarItems } from '../../slices/sidebarSlice';
import './sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const drawerWidth = 240;
  const dispatch = useDispatch();
  const { items, loading, error, isFetched } = useSelector((state) => state.sidebar);
  let role = localStorage.getItem('role');
  const token = localStorage.getItem('token');
  const name = localStorage.getItem('userFullName');

  if (role) {
    if (role === 'mis') {
      role = 'MIS';
    } else {
      role = role === 'superadmin' ? 'Super Admin' : role.charAt(0).toUpperCase() + role.slice(1);
    }
  }

  useEffect(() => {
    if (!isFetched) {
      dispatch(fetchSidebarItems(token));
    }
  }, [dispatch, isFetched, token]);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Box className="sidebar">
        <div className='sidebarTitle'>
          <img className='sideBarLogo' alt='logo' src='/images/company-logo.svg' />
        </div>
        <div className='userinfo'>
          <Avatar className='userImage' alt='userAvatar'>{name.split(' ')[0][0]}{name.split(' ')[1][0]}</Avatar>
          {/* <img className='userImage' alt='userImage' src='/images/avatar.png' /> */}
          <div className='userDetails'>
            <p className='userName' >{name}</p>
            <p className='userRole'>{role}</p>
          </div>
        </div>
        <List className='sidebarList'>
          {loading ? (
            <CircularProgress className="circleProgress" />
          ) : error ? (
            <p><CircularProgress className="circleProgress" /></p>
          ) : (
            items.map((item, index) => (
              <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  component="a"
                  href={item.path}
                  className={location.pathname.startsWith(item.path) ? 'active-link' : 'sidebarLink'}
                >
                  <ListItemIcon className='sidebarIcon'>
                    <img src={location.pathname.startsWith(item.path) ? `/images/icons/${item.activeIcon}` : `/images/icons/${item.icon}`} alt={item.text} style={{ width: 24, height: 24 }} />
                  </ListItemIcon>
                  <Tooltip title={item.text} arrow>
                    <p className={location.pathname.startsWith(item.path) ? 'sidebarText active-text' : 'sidebarText'}>
                      {item.text}
                    </p>
                  </Tooltip>
                </ListItemButton>
              </ListItem>
            ))
          )}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;

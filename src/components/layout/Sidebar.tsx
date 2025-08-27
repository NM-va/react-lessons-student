import { Box, Drawer, List, ListItem } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <Box sx={{
      height: '100%',
      width: '300px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      overflow: 'auto',
      overflowX: 'hidden',
    }} component="nav">
      <List sx={{paddingTop: '64px'}}>
          <ListItem><NavLink to="/dashboard">Dashboard</NavLink></ListItem>
          <ListItem><NavLink to="/tasks">Tasks</NavLink></ListItem>
          <ListItem><NavLink to="/profile">Profile</NavLink></ListItem>
          <ListItem><NavLink to="/settings">Settings</NavLink></ListItem>
        </List>
    </Box>
  );
};

export default Sidebar;
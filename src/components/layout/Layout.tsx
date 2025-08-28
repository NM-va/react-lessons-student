import React from 'react';
import Sidebar from './Sidebar';
import { Header } from './Header';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

const layout: React.FC = () => {
  return (
    <Box sx={{
        position: 'relative',
        display: 'flex',
        overflow: 'hidden',
        height: '100%',
        width: '100%',
      }}>
        <Header/>
        <Sidebar/>
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            paddingTop: '84px'
            // overflow: 'auto',
          }}>
            <Outlet/>
        </Box>
    </Box>
  );
};

export default layout;
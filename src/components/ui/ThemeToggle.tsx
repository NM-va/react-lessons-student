import { Lightbulb } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react';
import { UseThemeColor } from '../../hooks/useThemeColor';

export const ThemeToggle: React.FC = () => {
  
    const {toggleTheme} = UseThemeColor();
    const toggleThemeHandle = () => {
        toggleTheme();
    }

    return (
        <div>
            <IconButton onClick={toggleThemeHandle}>
                <Lightbulb />
            </IconButton>
        </div>
    );
};
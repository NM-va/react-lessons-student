import { useContext } from 'react';
import { ThemeContext } from '../components/ThemeProvider';

export const UseThemeColor = () => {

    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useThemeColor должен использоваться внутри ThemeProvider');
    }
    
    return context;
};
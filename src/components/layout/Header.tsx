
import { Mail } from '@mui/icons-material';
import { AppBar, Avatar, Badge, Box, Container, Link, Menu, MenuItem, Stack, Toolbar } from '@mui/material';
import { useState } from 'react';
import SitemarkIcon from '../SitemarkIcon';
import { ThemeToggle } from '../ui/ThemeToggle';
import { NavLink } from 'react-router-dom';


export const Header: React.FC = () => {
  // TODO: Реализуйте компонент
    const [anchorEl, setAnchorEl] = useState<null|HTMLElement>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const onHandleClick = (e:React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget);
        setIsOpen(true);
    }

    const onCloseMenu = () => {
        setAnchorEl(null);
        setIsOpen(false);
    }

  return (
    <AppBar position="fixed">
        <Container maxWidth={'lg'}>
            <Toolbar>
                <Box sx={{display: 'flex', flexGrow: 1, alignItems: 'center'}}>
                    <Stack direction="row" spacing={1}>
                        <Link sx={{lineHeight: 0}}><SitemarkIcon/></Link>
                        <Link>Название</Link>
                    </Stack>
                    <div style={{ flexGrow: 1 }} />
                    <Stack direction="row" spacing={1}>
                        <ThemeToggle />
                        <Avatar  onClick={onHandleClick} sx={{cursor: 'pointer'}} />
                        <Menu
                            anchorEl={anchorEl}
                            open={isOpen}
                            onClick={onCloseMenu}
                            onClose={onCloseMenu}
                        >
                            <MenuItem>Пункт1</MenuItem>
                            <MenuItem>Пункт2</MenuItem>
                        </Menu>
                        <Box sx={{alignContent: 'center', paddingRight: '10px'}}>
                            <Badge badgeContent={4} color="primary">
                                <Mail/>
                            </Badge>
                        </Box>
                        
                    </Stack>

                    
                </Box>

                {/* Done: Логотип и название */}
                {/* TODO: Поиск (опционально) */}



                {/* Done: Уведомления */}
                {/* Done: Переключатель темы */}
                {/* Done: Аватар с меню */}
            </Toolbar>
      </Container>
    </AppBar>
  );
};
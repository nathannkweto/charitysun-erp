import React from 'react';
import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText, Tooltip } from '@mui/material';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import { useThemeMode } from '@/core/theme/ThemeContext';

export const ThemeToggle: React.FC = () => {
    const { mode, setMode } = useThemeMode();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleThemeChange = (newMode: 'light' | 'dark' | 'night') => {
        setMode(newMode);
        handleClose();
    };

    const getCurrentIcon = () => {
        switch (mode) {
            case 'light':
                return <Brightness7Icon />;
            case 'dark':
                return <NightsStayIcon />;
            case 'night':
                return <WbTwilightIcon />;
            default:
                return <Brightness7Icon />;
        }
    };

    const getCurrentLabel = () => {
        switch (mode) {
            case 'light':
                return 'Light Mode';
            case 'dark':
                return 'Dark Mode';
            case 'night':
                return 'Night Light';
            default:
                return 'Light Mode';
        }
    };

    return (
        <>
            <Tooltip title={`Theme: ${getCurrentLabel()}`}>
                <IconButton
                    onClick={handleClick}
                    color="inherit"
                    aria-label="theme selector"
                    aria-controls={open ? 'theme-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    {getCurrentIcon()}
                </IconButton>
            </Tooltip>
            <Menu
                id="theme-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem
                    onClick={() => handleThemeChange('light')}
                    selected={mode === 'light'}
                >
                    <ListItemIcon>
                        <Brightness7Icon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Light Mode</ListItemText>
                </MenuItem>
                <MenuItem
                    onClick={() => handleThemeChange('dark')}
                    selected={mode === 'dark'}
                >
                    <ListItemIcon>
                        <NightsStayIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Dark Mode</ListItemText>
                </MenuItem>
                <MenuItem
                    onClick={() => handleThemeChange('night')}
                    selected={mode === 'night'}
                >
                    <ListItemIcon>
                        <WbTwilightIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Night Light</ListItemText>
                </MenuItem>
            </Menu>
        </>
    );
};

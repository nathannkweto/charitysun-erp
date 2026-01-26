import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Avatar,
    Box,
    Menu,
    MenuItem,
    Tooltip
} from '@mui/material';
import { Logout, AccountCircle, Menu as MenuIcon } from '@mui/icons-material';
import { useAuth } from '../../core/auth/useAuth.ts';

interface TopbarProps {
    onDrawerToggle: () => void;
}

export const Topbar = ({ onDrawerToggle }: TopbarProps) => {
    const { user, logout } = useAuth();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const handleLogout = () => { handleClose(); logout(); };

    return (
        <AppBar
            position="fixed"
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,
                bgcolor: 'primary.main',
                boxShadow: 1
            }}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={onDrawerToggle}
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>

                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 'bold', letterSpacing: 1 }}>
                    CHARITYSUN ERP
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="body2" sx={{ display: { xs: 'none', md: 'block' } }}>
                        {user?.firstName} {user?.lastName}
                    </Typography>
                    <Tooltip title="Account settings">
                        <IconButton onClick={handleMenu} size="small" sx={{ ml: 2 }}>
                            <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                                {user?.firstName?.charAt(0)}
                            </Avatar>
                        </IconButton>
                    </Tooltip>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        onClick={handleClose}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem onClick={handleClose}><AccountCircle sx={{ mr: 1 }} /> Profile</MenuItem>
                        <MenuItem onClick={handleLogout}><Logout sx={{ mr: 1 }} /> Logout</MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};
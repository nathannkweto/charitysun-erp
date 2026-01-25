import React from 'react';
import {
    Box,
    AppBar,
    Toolbar,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Button,
    Avatar,
    IconButton,
    alpha
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { logout } from '@/store/authSlice';
import { ThemeToggle } from '@/shared/components/ThemeToggle';

const drawerWidth = 240;

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('token');
        navigate('/login');
    };

    const isActive = (path: string) => location.pathname === path;

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ fontWeight: 800, color: 'primary.main', display: 'flex', alignItems: 'center', gap: 1 }}
                    >
                        <Box sx={{ width: 32, height: 32, bgcolor: 'primary.main', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1rem' }}>
                            CE
                        </Box>
                        Charitysun ERP
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <ThemeToggle />
                        {isAuthenticated ? (
                            <>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <Box sx={{ textAlign: 'right', display: { xs: 'none', sm: 'block' } }}>
                                        <Typography variant="body2" fontWeight={700}>
                                            {user?.name}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {user?.roles?.[0] || 'Member'}
                                        </Typography>
                                    </Box>
                                    <Avatar sx={{ width: 36, height: 36, bgcolor: 'secondary.main' }}>
                                        {user?.name?.[0]}
                                    </Avatar>
                                </Box>
                                <IconButton color="inherit" onClick={handleLogout} size="small">
                                    <LogoutIcon fontSize="small" />
                                </IconButton>
                            </>
                        ) : (
                            <Button
                                variant="contained"
                                startIcon={<LoginIcon />}
                                onClick={() => navigate('/login')}
                                sx={{ borderRadius: 2 }}
                            >
                                Login
                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        borderRight: '1px solid',
                        borderColor: 'divider',
                        bgcolor: 'background.default'
                    },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto', mt: 2 }}>
                    <List sx={{ px: 2 }}>
                        <ListItem
                            button
                            onClick={() => navigate('/app/dashboard')}
                            sx={{
                                borderRadius: 2,
                                mb: 1,
                                bgcolor: isActive('/app/dashboard') ? alpha('#3B82F6', 0.1) : 'transparent',
                                color: isActive('/app/dashboard') ? 'secondary.main' : 'text.primary',
                                '&:hover': { bgcolor: alpha('#3B82F6', 0.05) }
                            }}
                        >
                            <ListItemIcon sx={{ color: isActive('/app/dashboard') ? 'secondary.main' : 'inherit', minWidth: 40 }}>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" primaryTypographyProps={{ fontWeight: isActive('/app/dashboard') ? 700 : 500 }} />
                        </ListItem>

                        <ListItem
                            button
                            onClick={() => navigate('/app/services')}
                            sx={{
                                borderRadius: 2,
                                mb: 1,
                                bgcolor: isActive('/app/services') ? alpha('#3B82F6', 0.1) : 'transparent',
                                color: isActive('/app/services') ? 'secondary.main' : 'text.primary',
                                '&:hover': { bgcolor: alpha('#3B82F6', 0.05) }
                            }}
                        >
                            <ListItemIcon sx={{ color: isActive('/app/services') ? 'secondary.main' : 'inherit', minWidth: 40 }}>
                                <InventoryIcon />
                            </ListItemIcon>
                            <ListItemText primary="Services" primaryTypographyProps={{ fontWeight: isActive('/app/services') ? 700 : 500 }} />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
                <Toolbar />
                <Box sx={{ p: 4 }}>
                    {children}
                </Box>
            </Box>
        </Box>
    );
};

export default MainLayout;


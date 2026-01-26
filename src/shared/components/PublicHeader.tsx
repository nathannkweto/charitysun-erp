import React, { type ReactElement, useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Stack,
    Link,
    Button,
    IconButton,
    useScrollTrigger,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Box,
    Divider
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const ElevationScroll = (props: { children: React.ReactElement }) => {
    const { children } = props;
    // Trigger is still used for the shadow (elevation) effect
    const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 0 });

    return React.cloneElement(children as ReactElement<any>, {
        // Only toggle shadow on scroll
        elevation: trigger ? 4 : 0,
        sx: {
            // Static styles (No longer dependent on 'trigger')
            bgcolor: '#FFFFFF',
            color: '#000000',
            borderBottom: '1px solid #E5E7EB',
            transition: 'box-shadow 0.3s ease', // Only animate the shadow
            py: 1.5,
        },
    });
};

export const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);

    const isActive = (path: string) => location.pathname === path;

    const navLinks = [
        { label: 'SERVICES', path: '/services' },
        { label: 'ABOUT', path: '/about' },
        { label: 'CONTACT', path: '/contact' },
    ];

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    // Mobile Drawer Content
    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
                <Typography variant="h6" fontWeight={900}>
                    CHARITYSUN
                </Typography>
                <IconButton onClick={handleDrawerToggle}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Divider />

            <List sx={{ flexGrow: 1, pt: 4 }}>
                {navLinks.map((item) => (
                    <ListItem key={item.label} disablePadding>
                        <ListItemButton
                            onClick={() => navigate(item.path)}
                            sx={{
                                textAlign: 'center',
                                bgcolor: isActive(item.path) ? 'action.hover' : 'transparent'
                            }}
                        >
                            <ListItemText
                                primary={item.label}
                                primaryTypographyProps={{
                                    fontWeight: isActive(item.path) ? 800 : 500
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            <Box sx={{ p: 2, pb: 4 }}>
                <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    size="large"
                    onClick={() => navigate('/login')}
                >
                    SIGN IN
                </Button>
            </Box>
        </Box>
    );

    return (
        <>
            <ElevationScroll>
                <AppBar position="fixed" sx={{ px: { md: 4 } }}>
                    <Toolbar sx={{ justifyContent: 'space-between' }}>
                        <Typography
                            variant="h4"
                            fontWeight={900}
                            letterSpacing="-0.05em"
                            sx={{ color: 'inherit', cursor: 'pointer' }}
                            onClick={() => navigate('/')}
                        >
                            CHARITYSUN
                        </Typography>

                        {/* DESKTOP MENU */}
                        <Stack direction="row" spacing={4} alignItems="center" sx={{ display: { xs: 'none', md: 'flex' } }}>
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    onClick={() => navigate(link.path)}
                                    color="inherit"
                                    underline="none"
                                    sx={{
                                        fontWeight: isActive(link.path) ? 700 : 600,
                                        fontSize: '0.9rem',
                                        cursor: 'pointer',
                                        opacity: isActive(link.path) ? 1 : 0.8,
                                        '&:hover': { opacity: 1 },
                                    }}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <Button
                                variant="outlined"
                                color="inherit"
                                sx={{ borderRadius: 0, px: 4, fontWeight: 700, borderWidth: 2 }}
                                onClick={() => navigate('/login')}
                            >
                                SIGN IN
                            </Button>
                        </Stack>

                        {/* MOBILE MENU TOGGLE */}
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ display: { md: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>

            {/* MOBILE DRAWER */}
            <Box component="nav">
                <Drawer
                    variant="temporary"
                    anchor="right"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280 },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </>
    );
};
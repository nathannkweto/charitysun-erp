import React from 'react';
import { AppBar, Toolbar, Typography, Stack, Link, Button, IconButton, useScrollTrigger } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const ElevationScroll = (props: { children: React.ReactElement }) => {
    const { children } = props;
    const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 50 });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
        sx: {
            bgcolor: trigger ? '#FFFFFF' : 'transparent',
            color: trigger ? '#000000' : '#FFFFFF',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            borderBottom: trigger ? '1px solid #E5E7EB' : 'none',
            py: trigger ? 0.5 : 2,
        },
    });
};

export const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    const navLinks = [
        { label: 'SERVICES', path: '/services' },
        { label: 'PROJECTS', path: '/projects' },
        { label: 'ABOUT', path: '/about' },
        { label: 'CONTACT', path: '/contact' },
    ];

    return (
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

                    <IconButton sx={{ display: { xs: 'block', md: 'none' }, color: 'inherit' }}>
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </ElevationScroll>
    );
};
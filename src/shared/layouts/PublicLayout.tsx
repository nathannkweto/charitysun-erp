import React from 'react';
import {
    Box,
    AppBar,
    Toolbar,
    Typography,
    Button,
    Container,
    Stack,
    Link,
    IconButton,
    useScrollTrigger,
    Divider,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeToggle } from '@/shared/components/ThemeToggle';

interface PublicLayoutProps {
    children: React.ReactNode;
}

const ElevationScroll = (props: { children: React.ReactElement }) => {
    const { children } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 50,
    });

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

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    const navLinks = [
        { label: 'VEHICLES', path: '/services' },
        { label: 'PROJECTS', path: '/projects' },
        { label: 'ABOUT', path: '/about' },
        { label: 'CONTACT', path: '/contact' },
    ];

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
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

                        {/* Desktop Navigation */}
                        <Stack
                            direction="row"
                            spacing={4}
                            alignItems="center"
                            sx={{ display: { xs: 'none', md: 'flex' } }}
                        >
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
                            <ThemeToggle />
                            <Button
                                variant="outlined"
                                color="inherit"
                                sx={{
                                    borderRadius: 0,
                                    px: 4,
                                    fontWeight: 700,
                                    borderWidth: 2,
                                    '&:hover': { borderWidth: 2 },
                                }}
                                onClick={() => navigate('/login')}
                            >
                                SIGN IN
                            </Button>
                        </Stack>

                        {/* Mobile Menu Icon */}
                        <IconButton
                            sx={{ display: { xs: 'block', md: 'none' }, color: 'inherit' }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>

            {/* Main Content */}
            <Box component="main" sx={{ flexGrow: 1 }}>
                {children}
            </Box>

            {/* Footer */}
            <Box sx={{ bgcolor: '#0F172A', color: '#FFFFFF', py: 10, mt: 'auto' }}>
                <Container maxWidth="lg">
                    <Stack spacing={8}>
                        <Stack direction={{ xs: 'column', md: 'row' }} spacing={8}>
                            <Box sx={{ flex: 1 }}>
                                <Typography
                                    variant="h5"
                                    fontWeight={900}
                                    sx={{ mb: 4, letterSpacing: '-0.05em' }}
                                >
                                    CHARITYSUN
                                </Typography>
                                <Typography variant="body2" sx={{ opacity: 0.7, maxWidth: 400 }}>
                                    Leading the way in precision mechanical engineering and innovative
                                    automobile solutions.
                                </Typography>
                            </Box>

                            <Stack direction="row" spacing={8}>
                                <Stack spacing={2}>
                                    <Typography variant="subtitle2" fontWeight={800} sx={{ mb: 1 }}>
                                        COMPANY
                                    </Typography>
                                    <Link
                                        onClick={() => navigate('/about')}
                                        color="inherit"
                                        sx={{
                                            opacity: 0.6,
                                            fontSize: '0.85rem',
                                            cursor: 'pointer',
                                            textDecoration: 'none',
                                            '&:hover': { opacity: 1 },
                                        }}
                                    >
                                        About Us
                                    </Link>
                                    <Link
                                        onClick={() => navigate('/projects')}
                                        color="inherit"
                                        sx={{
                                            opacity: 0.6,
                                            fontSize: '0.85rem',
                                            cursor: 'pointer',
                                            textDecoration: 'none',
                                            '&:hover': { opacity: 1 },
                                        }}
                                    >
                                        Projects
                                    </Link>
                                    <Link
                                        onClick={() => navigate('/contact')}
                                        color="inherit"
                                        sx={{
                                            opacity: 0.6,
                                            fontSize: '0.85rem',
                                            cursor: 'pointer',
                                            textDecoration: 'none',
                                            '&:hover': { opacity: 1 },
                                        }}
                                    >
                                        Contact
                                    </Link>
                                </Stack>

                                <Stack spacing={2}>
                                    <Typography variant="subtitle2" fontWeight={800} sx={{ mb: 1 }}>
                                        SERVICES
                                    </Typography>
                                    {['Mechanical', 'Automotive', 'Digital ERP'].map((item) => (
                                        <Typography
                                            key={item}
                                            variant="body2"
                                            sx={{ opacity: 0.6, fontSize: '0.85rem' }}
                                        >
                                            {item}
                                        </Typography>
                                    ))}
                                </Stack>
                            </Stack>
                        </Stack>

                        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

                        <Stack
                            direction={{ xs: 'column', md: 'row' }}
                            spacing={2}
                            justifyContent="space-between"
                            sx={{ opacity: 0.4 }}
                        >
                            <Typography variant="caption">
                                &copy; 2026 Charitysun Engineering. All rights reserved.
                            </Typography>
                            <Stack direction="row" spacing={4}>
                                <Link href="#" color="inherit" sx={{ fontSize: '0.75rem' }}>
                                    Privacy Policy
                                </Link>
                                <Link href="#" color="inherit" sx={{ fontSize: '0.75rem' }}>
                                    Terms of Use
                                </Link>
                            </Stack>
                        </Stack>
                    </Stack>
                </Container>
            </Box>
        </Box>
    );
};

export default PublicLayout;

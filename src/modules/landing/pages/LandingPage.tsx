import React from 'react';
import {
    Box,
    Typography,
    Button,
    Container,
    Stack,
    Grid,
    Paper,
    AppBar,
    Toolbar,
    useScrollTrigger,
    Link,
    IconButton,
    Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EngineeringIcon from '@mui/icons-material/Engineering';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import MenuIcon from '@mui/icons-material/Menu';
import heroBg from '@/assets/hero-bg.jpg';

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
        }
    });
};

const ServiceSection = ({
    title,
    subtitle,
    image,
    reverse,
    children,
}: {
    title: string;
    subtitle: string;
    image: string;
    reverse?: boolean;
    children?: React.ReactNode;
}) => (
    <Box sx={{ py: { xs: 8, md: 15 }, bgcolor: reverse ? '#F9FAFB' : '#FFFFFF' }}>
        <Container maxWidth="lg">
            <Grid
                container
                spacing={8}
                direction={reverse ? 'row-reverse' : 'row'}
                alignItems="center"
            >
                <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                            width: '100%',
                            height: { xs: '300px', md: '500px' },
                            borderRadius: '2px',
                            overflow: 'hidden',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
                        }}
                    >
                        <Box
                            component="img"
                            src={image}
                            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography
                        variant="overline"
                        color="secondary"
                        fontWeight={800}
                        letterSpacing={2}
                        sx={{ mb: 2, display: 'block' }}
                    >
                        {subtitle}
                    </Typography>
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 800,
                            mb: 4,
                            color: '#0F172A',
                            fontSize: { xs: '2.5rem', md: '3.5rem' },
                            lineHeight: 1.1,
                        }}
                    >
                        {title}
                    </Typography>
                    {children}
                    <Button
                        variant="text"
                        color="secondary"
                        endIcon={<ArrowForwardIosIcon sx={{ fontSize: '0.8rem !important' }} />}
                        sx={{
                            mt: 2,
                            p: 0,
                            fontWeight: 700,
                            '&:hover': { background: 'none', textDecoration: 'underline' },
                        }}
                    >
                        LEARN MORE
                    </Button>
                </Grid>
            </Grid>
        </Container>
    </Box>
);


const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ bgcolor: '#FFFFFF', minHeight: '100vh' }}>
            {/* Elegant Header */}
            <ElevationScroll>
                <AppBar position="fixed" sx={{ px: { md: 4 } }}>
                    <Toolbar sx={{ justifyContent: 'space-between' }}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography
                                variant="h4"
                                fontWeight={900}
                                letterSpacing="-0.05em"
                                sx={{ color: 'inherit', cursor: 'pointer' }}
                                onClick={() => navigate('/')}
                            >
                                CHARITYSUN
                            </Typography>
                        </Stack>

                        <Stack direction="row" spacing={4} alignItems="center" sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <Link href="#" color="inherit" underline="none" sx={{ fontWeight: 600, fontSize: '0.9rem' }}>VEHICLES</Link>
                            <Link href="#" color="inherit" underline="none" sx={{ fontWeight: 600, fontSize: '0.9rem' }}>SHOPPING</Link>
                            <Link href="#" color="inherit" underline="none" sx={{ fontWeight: 600, fontSize: '0.9rem' }}>OWNERS</Link>
                            <Button
                                variant="outlined"
                                color="inherit"
                                sx={{ borderRadius: 0, px: 4, fontWeight: 700, borderWidth: 2, '&:hover': { borderWidth: 2 } }}
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

            {/* Cinematic Hero */}
            <Box sx={{
                position: 'relative',
                height: '100vh',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                backgroundImage: `url(${heroBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
                {/* Visual Overlay */}
                <Box sx={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
                    zIndex: 1
                }} />

                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
                    <Box sx={{ maxWidth: 700 }}>
                        <Typography
                            variant="h1"
                            sx={{
                                fontSize: { xs: '3rem', md: '5rem', lg: '6rem' },
                                fontWeight: 900,
                                color: '#FFFFFF',
                                lineHeight: 0.9,
                                mb: 3,
                                letterSpacing: '-0.03em'
                            }}
                        >
                            PRECISION <br />
                            WITHOUT COMPROMISE.
                        </Typography>
                        <Typography variant="h5" sx={{ mb: 6, color: '#FFFFFF', opacity: 0.9, fontWeight: 400, fontSize: { xs: '1.2rem', md: '1.5rem' }, maxWidth: 500 }}>
                            Explore the next generation of Charitysun Engineering and Automobile solutions.
                        </Typography>
                        <Stack direction="row" spacing={2}>
                            <Button
                                variant="contained"
                                color="secondary"
                                size="large"
                                sx={{ borderRadius: 0, px: 6, py: 2, fontWeight: 800, fontSize: '1rem' }}
                                onClick={() => navigate('/login')}
                            >
                                ENTER PLATFORM
                            </Button>
                            <Button
                                variant="outlined"
                                size="large"
                                sx={{ borderRadius: 0, px: 6, py: 2, fontWeight: 800, fontSize: '1rem', color: '#FFFFFF', borderColor: '#FFFFFF', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)', borderColor: '#FFFFFF' } }}
                                onClick={() => navigate('/services')}
                            >
                                EXPLORE SERVICES
                            </Button>
                        </Stack>
                    </Box>
                </Container>
            </Box>

            {/* Editorial Service Sections */}
            <ServiceSection
                subtitle="MECHANICAL EXCELLENCE"
                title="Industrial Power for Tomorrow."
                image={heroBg}
            >
                <Typography variant="body1" sx={{ color: '#64748B', fontSize: '1.1rem', mb: 4, lineHeight: 1.8 }}>
                    Our mechanical engineering division provides world-class solutions for industrial automation, energy systems, and high-precision manufacturing. Built to endure, designed to perform.
                </Typography>
            </ServiceSection>

            <ServiceSection
                subtitle="AUTOMOTIVE INNOVATION"
                title="The Drive to Excel."
                image={heroBg}
                reverse
            >
                <Typography variant="body1" sx={{ color: '#64748B', fontSize: '1.1rem', mb: 4, lineHeight: 1.8 }}>
                    Charitysun's automotive technologies redefine maintenance and performance tracking. Experience a unified system designed for modern fleet management and high-performance vehicle engineering.
                </Typography>
            </ServiceSection>

            <ServiceSection
                subtitle="DIGITAL ECOSYSTEM"
                title="One Platform. Total Growth."
                image={heroBg}
            >
                <Typography variant="body1" sx={{ color: '#64748B', fontSize: '1.1rem', mb: 4, lineHeight: 1.8 }}>
                    Our proprietary ERP platform integrates real-time telemetry with administrative controls, providing engineers with the data they need to scale with confidence.
                </Typography>
            </ServiceSection>

            {/* Footer - Social style */}
            <Box sx={{ bgcolor: '#0F172A', color: '#FFFFFF', py: 10 }}>
                <Container maxWidth="lg">
                    <Grid container spacing={8}>
                        <Grid item xs={12} md={3}>
                            <Typography variant="h5" fontWeight={900} sx={{ mb: 4, letterSpacing: '-0.05em' }}>CHARITYSUN</Typography>
                        </Grid>
                        <Grid item xs={6} md={2}>
                            <Typography variant="subtitle2" fontWeight={800} sx={{ mb: 3 }}>VEHICLES</Typography>
                            <Stack spacing={2}>
                                {['Sedans', 'Trucks', 'SUVs', 'Performance'].map(item => (
                                    <Link key={item} href="#" color="inherit" sx={{ opacity: 0.6, fontSize: '0.85rem', textDecoration: 'none' }}>{item}</Link>
                                ))}
                            </Stack>
                        </Grid>
                        <Grid item xs={6} md={2}>
                            <Typography variant="subtitle2" fontWeight={800} sx={{ mb: 3 }}>ENGINEERING</Typography>
                            <Stack spacing={2}>
                                {['Systems', 'Manufacturing', 'Logistics', 'Robotics'].map(item => (
                                    <Link key={item} href="#" color="inherit" sx={{ opacity: 0.6, fontSize: '0.85rem', textDecoration: 'none' }}>{item}</Link>
                                ))}
                            </Stack>
                        </Grid>
                        <Grid item xs={6} md={2}>
                            <Typography variant="subtitle2" fontWeight={800} sx={{ mb: 3 }}>COMPANY</Typography>
                            <Stack spacing={2}>
                                {['About Us', 'Careers', 'Contact', 'News'].map(item => (
                                    <Link key={item} href="#" color="inherit" sx={{ opacity: 0.6, fontSize: '0.85rem', textDecoration: 'none' }}>{item}</Link>
                                ))}
                            </Stack>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <Typography variant="subtitle2" fontWeight={800} sx={{ mb: 3 }}>SUPPORT</Typography>
                            <Stack spacing={2}>
                                {['Owner Manuals', 'Recall Info', 'Warranty', 'Financial'].map(item => (
                                    <Link key={item} href="#" color="inherit" sx={{ opacity: 0.6, fontSize: '0.85rem', textDecoration: 'none' }}>{item}</Link>
                                ))}
                            </Stack>
                        </Grid>
                    </Grid>
                    <Divider sx={{ my: 8, borderColor: 'rgba(255,255,255,0.1)' }} />
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} justifyContent="space-between" sx={{ opacity: 0.4 }}>
                        <Typography variant="caption">&copy; 2026 Charitysun Engineering. All rights reserved.</Typography>
                        <Stack direction="row" spacing={4}>
                            <Link href="#" color="inherit" sx={{ fontSize: '0.75rem' }}>Privacy Policy</Link>
                            <Link href="#" color="inherit" sx={{ fontSize: '0.75rem' }}>Terms of Use</Link>
                            <Link href="#" color="inherit" sx={{ fontSize: '0.75rem' }}>Ad Choices</Link>
                        </Stack>
                    </Stack>
                </Container>
            </Box>
        </Box>
    );
};

export default LandingPage;

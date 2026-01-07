import { useState } from 'react';
import { Box, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Topbar } from './components/Topbar';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';

// Define widths
const DRAWER_WIDTH = 240;
const MINI_DRAWER_WIDTH = 65; // Width of the collapsed "icon-only" mode

export const MainLayout = () => {
    const theme = useTheme();
    // Check if screen is mobile (sm or smaller)
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [mobileOpen, setMobileOpen] = useState(false);
    const [isDesktopOpen, setIsDesktopOpen] = useState(true);

    const handleDrawerToggle = () => {
        if (isMobile) {
            setMobileOpen(!mobileOpen);
        } else {
            setIsDesktopOpen(!isDesktopOpen);
        }
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>

            <Topbar onDrawerToggle={handleDrawerToggle} />

            <Sidebar
                drawerWidth={DRAWER_WIDTH}
                miniDrawerWidth={MINI_DRAWER_WIDTH}
                mobileOpen={mobileOpen}
                isDesktopOpen={isDesktopOpen}
                onClose={() => setMobileOpen(false)}
            />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: 'background.default',
                    minHeight: '100vh',
                    width: '100%'
                }}
            >
                <Toolbar />

                <Box sx={{ p: { xs: 2, md: 3 }, flexGrow: 1, overflowX: 'auto' }}>
                    <Outlet />
                </Box>

                <Footer />
            </Box>
        </Box>
    );
};
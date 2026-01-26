import { Box, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/PublicHeader';
import { Footer } from '../components/PublicFooter';

export const PublicLayout = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

            <Header />

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
                {/* Matches MainLayout:
                   Offsets the fixed AppBar so content doesn't hide behind it
                */}
                <Toolbar />

                {/* Matches MainLayout:
                   Container for the actual page content.
                   flexGrow ensures Footer is pushed to bottom if content is short.
                */}
                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Outlet />
                </Box>

                <Footer />
            </Box>
        </Box>
    );
};

export default PublicLayout;
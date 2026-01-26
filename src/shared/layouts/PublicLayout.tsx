import { Box, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { Header } from '../components/PublicHeader';
import { Footer } from '../components/PublicFooter';

export const PublicLayout = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                overflowX: 'hidden'
            }}
        >
            <Header />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: 'background.default',
                    width: '100%',
                    position: 'relative'
                }}
            >
                {/* Spacer for Fixed AppBar:
                   MUI's <Toolbar /> automatically adjusts its height
                   (56px mobile, 64px desktop) to match the fixed Header.
                */}
                <Toolbar />

                {/* Page Content Wrapper:
                   flexGrow: 1 ensures this section expands to fill available space,
                   pushing the Footer to the bottom of the viewport on short pages.
                */}
                <Box
                    sx={{
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%'
                    }}
                >
                    <Outlet />
                </Box>

                <Footer />
            </Box>
        </Box>
    );
};

export default PublicLayout;
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
    Toolbar,
    useTheme,
    type CSSObject,
    type Theme
} from '@mui/material';
import {
    Dashboard,
    People,
    AccountBalance,
    Assignment,
    Settings,
    Inventory
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

interface SidebarProps {
    mobileOpen: boolean;
    isDesktopOpen: boolean;
    drawerWidth: number;
    miniDrawerWidth: number;
    onClose: () => void;
    window?: () => Window;
}

export const Sidebar = ({
                            mobileOpen,
                            isDesktopOpen,
                            drawerWidth,
                            miniDrawerWidth,
                            onClose,
                            window
                        }: SidebarProps) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { text: 'Dashboard', icon: <Dashboard />, path: '/erp' },
        { text: 'Human Resources', icon: <People />, path: '/erp/hr' },
        { text: 'Projects', icon: <Assignment />, path: '/erp/projects' },
        { text: 'Products', icon: <Inventory />, path: '/erp/products' },
        { text: 'Accounting', icon: <AccountBalance />, path: '/erp/accounting' },
    ];

    const secondaryItems = [
        { text: 'Settings', icon: <Settings />, path: '/erp/settings' },
    ];

    const handleNavigation = (path: string) => {
        navigate(path);
        onClose();
    };

    // Helper to generate the transitions for the Desktop Drawer
    const openedMixin = (theme: Theme): CSSObject => ({
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'hidden',
    });

    const closedMixin = (theme: Theme): CSSObject => ({
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: miniDrawerWidth,
    });

    const renderList = (items: typeof menuItems) => (
        <List>
            {items.map((item) => (
                <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                        selected={location.pathname === item.path}
                        onClick={() => handleNavigation(item.path)}
                        sx={{
                            minHeight: 48,
                            justifyContent: isDesktopOpen ? 'initial' : 'center',
                            px: 2.5,
                            borderRadius: isDesktopOpen ? 1 : 0,
                            mx: isDesktopOpen ? 1 : 0,
                            '&.Mui-selected': {
                                bgcolor: 'primary.light',
                                color: 'primary.dark',
                                '& .MuiListItemIcon-root': { color: 'primary.dark' },
                            },
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: isDesktopOpen ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText
                            primary={item.text}
                            sx={{ opacity: isDesktopOpen ? 1 : 0 }}
                        />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    );

    const drawerContent = (
        <div>
            <Toolbar />
            <Box sx={{ overflow: 'hidden', mt: 2 }}>
                {renderList(menuItems)}
                <Divider sx={{ my: 2, mx: 2 }} />
                {renderList(secondaryItems)}
            </Box>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box
            component="nav"
            sx={{
                width: { sm: isDesktopOpen ? drawerWidth : miniDrawerWidth },
                flexShrink: { sm: 0 },
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            }}
            aria-label="mailbox folders"
        >
            <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={onClose}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                <div>
                    <Toolbar />
                    <Box sx={{ overflow: 'auto', mt: 2 }}>
                        <List>
                            {menuItems.map((item) => (
                                <ListItem key={item.text} disablePadding>
                                    <ListItemButton onClick={() => handleNavigation(item.path)} selected={location.pathname === item.path}>
                                        <ListItemIcon>{item.icon}</ListItemIcon>
                                        <ListItemText primary={item.text} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                        <Divider />
                        <List>
                            {secondaryItems.map((item) => (
                                <ListItem key={item.text} disablePadding>
                                    <ListItemButton onClick={() => handleNavigation(item.path)}>
                                        <ListItemIcon>{item.icon}</ListItemIcon>
                                        <ListItemText primary={item.text} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </div>
            </Drawer>

            <Drawer
                variant="permanent"
                open={isDesktopOpen}
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        whiteSpace: 'nowrap',
                        ... (isDesktopOpen ? openedMixin(theme) : closedMixin(theme)),
                    },
                }}
            >
                {drawerContent}
            </Drawer>
        </Box>
    );
};
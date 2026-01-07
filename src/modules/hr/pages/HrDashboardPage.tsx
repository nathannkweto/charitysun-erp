import React, { useEffect } from 'react';
import {
    Box, Card, CardContent, Container, Grid, Typography,
    Button, Divider, Avatar, List, ListItem, ListItemAvatar,
    ListItemText, LinearProgress, useTheme, Chip
} from '@mui/material';
import {
    People, Work, Business,
    PersonAdd
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useEmployees } from '../hooks/useEmployees';
import { useOrganization } from '../hooks/useOrganization';

// --- Type Definitions ---
interface StatCardProps {
    title: string;
    value: number | string;
    icon: React.ReactNode;
    onClick: () => void;
    color: string;
}

// --- Sub-Component (Declared Outside) ---
const StatCard = ({ title, value, icon, onClick, color }: StatCardProps) => (
    <Card
        onClick={onClick}
        sx={{
            height: '100%',
            cursor: 'pointer',
            transition: 'transform 0.2s',
            '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 }
        }}
    >
        <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                    <Typography variant="body2" color="text.secondary" fontWeight="bold">
                        {title.toUpperCase()}
                    </Typography>
                    <Typography variant="h3" sx={{ mt: 1, fontWeight: 700, color: color }}>
                        {value}
                    </Typography>
                </Box>
                <Box sx={{ p: 1, borderRadius: 2, bgcolor: `${color}20`, color: color }}>
                    {icon}
                </Box>
            </Box>
            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                <Typography variant="caption">Manage {title.toLowerCase()} &rarr;</Typography>
            </Box>
        </CardContent>
    </Card>
);

export const HrDashboardPage = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const { employees, loading: empLoading, fetchEmployees } = useEmployees();
    const { jobPositions, departments, loading: orgLoading } = useOrganization();

    useEffect(() => {
        fetchEmployees();
    }, [fetchEmployees]);

    // Simple Derived Stats
    const totalEmployees = employees.length;
    const totalJobs = jobPositions.length;
    const totalDepts = departments.length;

    const recentHires = [...employees].slice(0, 5);

    if (empLoading || orgLoading) {
        return <LinearProgress />;
    }

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight="800" gutterBottom>
                    Overview
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Of Human Resource Department.
                </Typography>
            </Box>

            <Grid container spacing={3}>
                {/* Stats Row */}
                <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                    <StatCard
                        title="Employees"
                        value={totalEmployees}
                        icon={<People />}
                        color={theme.palette.primary.main}
                        onClick={() => navigate('/hr/employees')}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                    <StatCard
                        title="Job Positions"
                        value={totalJobs}
                        icon={<Work />}
                        color={theme.palette.secondary.main}
                        onClick={() => navigate('/hr/jobs')}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                    <StatCard
                        title="Departments"
                        value={totalDepts}
                        icon={<Business />}
                        color={theme.palette.success.main}
                        onClick={() => navigate('/hr/jobs')}
                    />
                </Grid>

                {/* Main Content Area: Recent Hires */}
                <Grid size={{ xs: 12, md: 8 }}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="h6" fontWeight="bold">Recent Hires</Typography>
                                <Button size="small" onClick={() => navigate('/hr/employees')}>View All</Button>
                            </Box>
                            <Divider />
                            <List>
                                {recentHires.map((emp) => (
                                    <ListItem key={emp.id} divider>
                                        <ListItemAvatar>
                                            <Avatar sx={{ bgcolor: theme.palette.primary.light }}>
                                                {emp.firstName?.charAt(0)}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={`${emp.firstName} ${emp.lastName}`}
                                            secondary={`${emp.jobTitle} • ${emp.departmentName}`}
                                        />
                                        <Chip label="New" size="small" color="success" variant="outlined" />
                                    </ListItem>
                                ))}
                                {recentHires.length === 0 && (
                                    <Box sx={{ p: 3, textAlign: 'center', color: 'text.secondary' }}>
                                        No employees found. Start onboarding!
                                    </Box>
                                )}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Quick Actions / Side Panel */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Card sx={{ mb: 3, bgcolor: 'primary.main', color: 'white' }}>
                        <CardContent>
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                Onboard Talent
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
                                Create a new employee profile and generate their unique system ID immediately.
                            </Typography>
                            <Button
                                variant="contained"
                                color="secondary"
                                startIcon={<PersonAdd />}
                                onClick={() => navigate('/hr/employees')}
                                fullWidth
                            >
                                Add Employee
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                System Health
                            </Typography>
                            <Box sx={{ mb: 2 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                    <Typography variant="caption">Department Capacity</Typography>
                                    <Typography variant="caption">85%</Typography>
                                </Box>
                                <LinearProgress variant="determinate" value={85} color="success" />
                            </Box>
                            <Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                    <Typography variant="caption">Pending Approvals</Typography>
                                    <Typography variant="caption">3</Typography>
                                </Box>
                                <LinearProgress variant="determinate" value={30} color="warning" />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};
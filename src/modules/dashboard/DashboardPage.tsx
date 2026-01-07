import { Grid, Typography, Box, Alert, CircularProgress } from '@mui/material';
import { useAuth } from '../../core/auth/useAuth';
import { usePermission } from '../../core/rbac/usePermission';
import { useDashboardStats } from './hooks/useDashboard';

// Widgets
import { AccountingSummary } from '../accounting/components/AccountingSummary';
import { ProjectOverview } from '../pm/components/ProjectOverview';
import { ProductStats } from '../products/components/ProductStats';

export const DashboardPage = () => {
    const { user } = useAuth();
    const { can } = usePermission();

    // 1. Fetch Data
    const { stats, loading, error } = useDashboardStats();

    // 2. Permission Checks
    const SHOW_ACCOUNTING = can('pm.project.read') || can('ROLE_ADMIN');
    const SHOW_PROJECTS = can('pm.project.read') || can('ROLE_ADMIN');
    const SHOW_ENGINEERING = can('product.bom.read') || can('ROLE_ADMIN');

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error || !stats) {
        return (
            <Box sx={{ p: 3 }}>
                <Alert severity="error">{error || 'No data available.'}</Alert>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Hello, {user?.firstName}
                </Typography>
            </Box>

            <Grid container spacing={3}>
                {/* 1. Accounting Section - Passes Financial DTO or null */}
                {SHOW_ACCOUNTING && (
                    <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                        <AccountingSummary data={stats.financialSummary} />
                    </Grid>
                )}

                {/* 2. Projects & HR Section - Passes counts */}
                {SHOW_PROJECTS && (
                    <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                        <ProjectOverview
                            activeProjects={stats.activeProjectCount || 0}
                            totalEmployees={stats.employeeCount || 0}
                        />
                    </Grid>
                )}

                {/* 3. Engineering Section - Passes product count */}
                {SHOW_ENGINEERING && (
                    <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                        <ProductStats
                            productCount={stats.productCount || 0}
                        />
                    </Grid>
                )}

                {/* Fallback */}
                {!SHOW_ACCOUNTING && !SHOW_PROJECTS && !SHOW_ENGINEERING && (
                    <Grid size={{ xs: 12 }}>
                        <Alert severity="info">
                            Your account permissions do not allow viewing any dashboard widgets.
                        </Alert>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
};
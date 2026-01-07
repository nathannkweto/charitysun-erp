import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './auth/useAuth';
import { MainLayout } from '../shared/layouts/MainLayout';
import { LoginPage } from '../modules/auth/pages/LoginPage';
import { Box, CircularProgress } from '@mui/material';
import type { JSX } from "react";

import { DashboardPage } from "../modules/dashboard/DashboardPage.tsx";
import { HrDashboardPage } from "../modules/hr/pages/HrDashboardPage.tsx";
import { ProjectDashboard } from "../modules/pm/pages/ProjectsDashboard.tsx";
import { ProductDashboard } from "../modules/products/pages/ProductsDashboard.tsx";
import { EmployeeDirectory } from "../modules/hr/pages/EmployeeDirectory.tsx";
import { JobPositionsPage } from "../modules/hr/pages/JobPositionsPage.tsx";
import { ProjectDetails } from "../modules/pm/pages/ProjectDetails.tsx";
import { AccountingDashboard } from "../modules/accounting/pages/AccountingDashboard.tsx";
import ChartOfAccounts from "../modules/accounting/pages/ChartOfAccounts.tsx";
import GeneralLedger from "../modules/accounting/pages/GeneralLedger.tsx";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<LoginPage />} />

                {/* Protected Routes (Wrapped in MainLayout) */}
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <MainLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<DashboardPage />} />

                    {/* HR Module */}
                    <Route path="hr">
                        <Route index element={<HrDashboardPage />} />
                        <Route path="employees" element={<EmployeeDirectory />} />
                        <Route path="jobs" element={<JobPositionsPage />} />
                    </Route>

                    {/* Accounting Module */}
                    <Route path="accounting">
                        <Route index element={<AccountingDashboard />} />
                        <Route path="chart-of-accounts" element={<ChartOfAccounts />} />
                        <Route path="ledger" element={<GeneralLedger />} />
                    </Route>

                    {/* Projects Module */}
                    <Route path="projects">
                        <Route index element={<ProjectDashboard />} />
                        <Route path=":id" element={<ProjectDetails />} />
                    </Route>

                    {/* Products Module */}
                    <Route path="products" element={<ProductDashboard />} />
                </Route>

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

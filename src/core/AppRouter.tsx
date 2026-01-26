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
import LandingPage from "../modules/public/pages/LandingPage.tsx";
import PublicLayout from "../shared/layouts/PublicLayout.tsx";
import ServicesPage from "../modules/public/pages/ServicesPage.tsx";
import AboutPage from "../modules/public/pages/AboutPage.tsx";
import ContactPage from "../modules/public/pages/ContactPage.tsx";

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
        return <Navigate to="/" replace />;
    }

    return children;
};

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<LoginPage />} />

                {/* Protected Routes (Wrapped in PublicLayout) */}
                <Route
                    path="/"
                    element={<PublicLayout />}
                >
                    <Route index element={<LandingPage />} />

                    {/* Home Page */}
                    <Route path="home">
                        <Route index element={<HrDashboardPage />} />
                        <Route path="employees" element={<EmployeeDirectory />} />
                        <Route path="jobs" element={<JobPositionsPage />} />
                    </Route>

                    {/* Services Page */}
                    <Route path="services">
                        <Route index element={<ServicesPage />} />
                    </Route>

                    {/* About Page */}
                    <Route path="about">
                        <Route index element={<AboutPage />} />
                    </Route>

                    {/* Contact Page */}
                    <Route path="contact">
                        <Route index element={<ContactPage />} />
                    </Route>
                </Route>

                {/* Protected Routes (Wrapped in MainLayout) */}
                <Route
                    path="/erp"
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

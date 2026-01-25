import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import PublicLayout from '@/shared/layouts/PublicLayout';
import MainLayout from '@/shared/layouts/MainLayout';
import { RequireAuth } from '@/core/auth/AuthContext';

// Public Pages
const HomePage = lazy(() => import('@/modules/public/pages/HomePage'));
const ServicesPage = lazy(() => import('@/modules/public/pages/ServicesPage'));
const ProjectsPage = lazy(() => import('@/modules/public/pages/ProjectsPage'));
const AboutPage = lazy(() => import('@/modules/public/pages/AboutPage'));
const ContactPage = lazy(() => import('@/modules/public/pages/ContactPage'));
const LoginPage = lazy(() => import('@/modules/auth/pages/LoginPage'));

// ERP Pages (Protected)
const DashboardPage = lazy(() => import('@/modules/dashboard/pages/DashboardPage'));
const ProductsPage = lazy(() => import('@/modules/products/pages/ProductsPage'));

const AppRouter = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                {/* Public Routes - No Authentication Required */}
                <Route
                    path="/*"
                    element={
                        <PublicLayout>
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/services" element={<ServicesPage />} />
                                <Route path="/projects" element={<ProjectsPage />} />
                                <Route path="/about" element={<AboutPage />} />
                                <Route path="/contact" element={<ContactPage />} />
                            </Routes>
                        </PublicLayout>
                    }
                />

                {/* Standalone Login Page */}
                <Route path="/login" element={<LoginPage />} />

                {/* Protected ERP Routes - Authentication Required */}
                <Route
                    path="/app/*"
                    element={
                        <RequireAuth>
                            <MainLayout>
                                <Routes>
                                    <Route path="/dashboard" element={<DashboardPage />} />
                                    <Route path="/services" element={<ProductsPage />} />
                                    <Route path="*" element={<div>404 - Page Not Found</div>} />
                                </Routes>
                            </MainLayout>
                        </RequireAuth>
                    }
                />
            </Routes>
        </Suspense>
    );
};

export default AppRouter;

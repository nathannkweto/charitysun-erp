import React, { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import MainLayout from '@/shared/layouts/MainLayout'

const DashboardPage = lazy(() => import('@/modules/dashboard/pages/DashboardPage'))
const ProductsPage = lazy(() => import('@/modules/products/pages/ProductsPage'))
// Placeholder for other modules

const AppRouter = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <MainLayout>
                <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    {/* Add more routes as needed */}
                    <Route path="*" element={<div>404 - Not Found</div>} />
                </Routes>
            </MainLayout>
        </Suspense>
    )
}

export default AppRouter

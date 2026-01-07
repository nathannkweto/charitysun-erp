import { useState, useEffect } from 'react';
import { DashboardControllerService, type DashboardStatsDTO } from '../../../client';

export const useDashboardStats = () => {
    const [stats, setStats] = useState<DashboardStatsDTO | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                const data = await DashboardControllerService.getDashboardStats();
                setStats(data);
            } catch (err) {
                console.error('Failed to fetch dashboard stats:', err);
                setError('Could not load dashboard statistics.');
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return { stats, loading, error };
};
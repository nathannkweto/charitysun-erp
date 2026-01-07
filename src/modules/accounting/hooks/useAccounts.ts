import { useState, useEffect, useCallback } from 'react';
import { AccountControllerService, type AccountDTO } from '../../../client';

export const useAccounts = () => {
    const [accounts, setAccounts] = useState<AccountDTO[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchAccounts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await AccountControllerService.listAccounts();
            setAccounts(data);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch accounts');
            console.error('Account Fetch Error:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAccounts();
    }, [fetchAccounts]);

    return { accounts, loading, error, refresh: fetchAccounts };
};
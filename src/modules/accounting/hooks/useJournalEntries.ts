import { useState, useEffect, useCallback } from 'react';
import { JournalEntryControllerService, type JournalEntryDTO } from '../../../client';

export const useJournalEntries = () => {
    const [entries, setEntries] = useState<JournalEntryDTO[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchEntries = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await JournalEntryControllerService.listJournalEntries1();
            setEntries(data);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch journal entries');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchEntries();
    }, [fetchEntries]);

    return { entries, loading, error, refresh: fetchEntries };
};
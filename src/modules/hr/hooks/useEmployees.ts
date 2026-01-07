import { useState, useCallback } from 'react';
import {
    EmployeeControllerService,
    type EmployeeDTO,
    type EmployeeCreateRequest,
    type EmployeeUpdateRequest,
    ApiError
} from '../../../client';

export const useEmployees = () => {
    const [employees, setEmployees] = useState<EmployeeDTO[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getErrorMessage = (err: unknown): string => {
        if (err instanceof ApiError) {
            return err.body?.message || err.message || 'An API error occurred';
        }
        if (err instanceof Error) {
            return err.message;
        }
        return 'An unknown error occurred';
    };

    const fetchEmployees = useCallback(async (deptId?: string) => {
        setLoading(true);
        setError(null);
        try {
            const data = await EmployeeControllerService.listEmployees(deptId);
            setEmployees(data);
        } catch (err: unknown) {
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    }, []);

    const createEmployee = async (data: EmployeeCreateRequest) => {
        try {
            const result = await EmployeeControllerService.createEmployee(data);
            await fetchEmployees();
            return result;
        } catch (err: unknown) {
            throw new Error(getErrorMessage(err));
        }
    };

    const updateEmployee = async (id: string, data: EmployeeUpdateRequest) => {
        try {
            const result = await EmployeeControllerService.updateEmployee(id, data);
            await fetchEmployees();
            return result;
        } catch (err: unknown) {
            throw new Error(getErrorMessage(err));
        }
    };

    return {
        employees,
        loading,
        error,
        fetchEmployees,
        createEmployee,
        updateEmployee
    };
};
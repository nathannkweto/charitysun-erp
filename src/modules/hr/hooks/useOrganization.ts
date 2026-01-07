import { useState, useEffect, useCallback } from 'react';
import {
    OrganizationControllerService,
    type DepartmentDTO,
    type DepartmentCreateRequest, // Ensure this is imported
    type JobPositionDTO,
    type JobPositionCreateRequest,
    type JobPositionUpdateRequest,
    ApiError
} from '../../../client';

export const useOrganization = () => {
    const [departments, setDepartments] = useState<DepartmentDTO[]>([]);
    const [jobPositions, setJobPositions] = useState<JobPositionDTO[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchMasterData = useCallback(async () => {
        setLoading(true);
        try {
            const [deptData, jobData] = await Promise.all([
                OrganizationControllerService.listDepartments(),
                OrganizationControllerService.listJobPositions()
            ]);
            setDepartments(deptData);
            setJobPositions(jobData);
        } catch (err: unknown) {
            console.error('Failed to load HR Master Data', err);
            setError('Failed to load organization data');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMasterData();
    }, [fetchMasterData]);

    const createDepartment = async (data: DepartmentCreateRequest) => {
        try {
            await OrganizationControllerService.createDepartment(data);
            await fetchMasterData();
        } catch (err: unknown) {
            const msg = err instanceof ApiError ? err.body?.message : 'Failed to create department';
            throw new Error(msg);
        }
    };

    const createJobPosition = async (data: JobPositionCreateRequest) => {
        try {
            await OrganizationControllerService.createJobPosition(data);
            await fetchMasterData();
        } catch (err: unknown) {
            const msg = err instanceof ApiError ? err.body?.message : 'Failed to create job';
            throw new Error(msg);
        }
    };

    const updateJobPosition = async (id: string, data: JobPositionUpdateRequest) => {
        try {
            await OrganizationControllerService.updateJobPosition(id, data);
            await fetchMasterData();
        } catch (err: unknown) {
            const msg = err instanceof ApiError ? err.body?.message : 'Failed to update job';
            throw new Error(msg);
        }
    };

    return {
        departments,
        jobPositions,
        loading,
        error,
        refresh: fetchMasterData,
        createDepartment,
        createJobPosition,
        updateJobPosition
    };
};
import {useState, useCallback, useEffect} from 'react';
import {
    ProjectControllerService,
    type ProjectDTO,
    type DepartmentDTO,
    type ProjectCreateRequest,
    type PhaseCreateRequest,
    type TaskCreateRequest,
    type TaskUpdateRequest,
    type ProjectDTO as ProjectDTOModel, OrganizationControllerService, EmployeeControllerService, type EmployeeDTO,
} from '../../../client';

type ProjectStatus = ProjectDTOModel["status"];

export const useProjects = () => {
    const [projects, setProjects] = useState<ProjectDTO[]>([]);
    const [departments, setDepartments] = useState<DepartmentDTO[]>([]);
    const [employees, setEmployees] = useState<EmployeeDTO[]>([]);
    const [currentProject, setCurrentProject] = useState<ProjectDTO | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchProjects = useCallback(async (status?: ProjectStatus, departmentId?: string) => {
        setLoading(true);
        try {
            const [projectData, departmentData, employeeData] = await Promise.all([
                ProjectControllerService.listProjects(status, departmentId),
                OrganizationControllerService.listDepartments(),
                EmployeeControllerService.listEmployees()
            ]);
            setProjects(projectData);
            setDepartments(departmentData);
            setEmployees(employeeData);
        } catch (error) {
            console.error('Failed to fetch data', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    const fetchProjectDetails = useCallback(async (id: string) => {
        setLoading(true);
        try {
            const data = await ProjectControllerService.getProject(id);
            setCurrentProject(data);
        } catch (error) {
            console.error('Failed to fetch project details', error);
        } finally {
            setLoading(false);
        }
    }, []);

    const createProject = async (request: ProjectCreateRequest) => {
        try {
            await ProjectControllerService.createProject(request);
            await fetchProjects();
        } catch (error) {
            console.error('Failed to create project', error);
            throw error;
        }
    };

    const createPhase = async (projectId: string, request: PhaseCreateRequest) => {
        try {
            await ProjectControllerService.createProjectPhase(projectId, request);
            await fetchProjectDetails(projectId);
        } catch (error) {
            console.error('Failed to create phase', error);
            throw error;
        }
    };

    const createTask = async (phaseId: string, request: TaskCreateRequest) => {
        try {
            await ProjectControllerService.createTask(phaseId, request);
            if (currentProject?.id) {
                await fetchProjectDetails(currentProject.id);
            }
        } catch (error) {
            console.error('Failed to create task', error);
            throw error;
        }
    };

    const updateTask = async (taskId: string, request: TaskUpdateRequest) => {
        try {
            await ProjectControllerService.updateTask(taskId, request);
            if (currentProject?.id) {
                await fetchProjectDetails(currentProject.id);
            }
        } catch (error) {
            console.error('Failed to update task', error);
            throw error;
        }
    };

    return {
        projects,
        employees,
        departments,
        currentProject,
        loading,
        fetchProjects,
        fetchProjectDetails,
        createProject,
        createPhase,
        createTask,
        updateTask
    };
};
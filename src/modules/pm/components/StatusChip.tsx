import React from 'react';
import { Chip } from '@mui/material';
import { type ProjectDTO, type TaskDTO } from '../../../client';

type ProjectStatus = ProjectDTO['status'];
type TaskStatus = (TaskDTO)['status'];

const getProjectStatusColor = (status: ProjectStatus) => {
    switch (status) {
        case 'ACTIVE': return 'success';
        case 'PLANNED': return 'info';
        case 'ON_HOLD': return 'warning';
        case 'COMPLETED': return 'primary';
        case 'CANCELLED': return 'error';
        default: return 'default';
    }
};

const getTaskStatusColor = (status: TaskStatus) => {
    switch (status) {
        case 'DONE': return 'success';
        case 'IN_PROGRESS': return 'warning';
        case 'REVIEW': return 'info';
        case 'TODO': return 'default';
        default: return 'default';
    }
};

interface StatusChipProps {
    status: ProjectStatus | TaskStatus;
    type: 'PROJECT' | 'TASK';
}

export const StatusChip: React.FC<StatusChipProps> = ({ status, type }) => {
    if (!status) {
        return <Chip label="N/A" size="small" variant="outlined" />;
    }
    const color = type === 'PROJECT'
        ? getProjectStatusColor(status as ProjectStatus)
        : getTaskStatusColor(status as TaskStatus);

    return (
        <Chip
            label={status.replace('_', ' ')}
            color={color}
            size="small"
            variant="outlined"
            sx={{ fontWeight: 'bold' }}
        />
    );
};
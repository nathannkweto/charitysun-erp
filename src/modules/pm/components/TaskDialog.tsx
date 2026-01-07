import React, { useState  } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button, Grid, MenuItem
} from '@mui/material';
import { type TaskDTO, type EmployeeDTO, type TaskCreateRequest, type TaskUpdateRequest } from '../../../client';

const TASK_STATUS_OPTIONS: TaskDTO['status'][] = ['TODO', 'IN_PROGRESS', 'REVIEW', 'DONE'];

interface TaskFormState {
    name: string;
    description: string;
    assigneeId: string;
    estimatedHours: number;
    status: TaskDTO['status'];
}

const initialFormState: TaskFormState = {
    name: '',
    description: '',
    assigneeId: '',
    estimatedHours: 0,
    status: 'TODO'
};

interface Props {
    open: boolean;
    mode: 'CREATE' | 'EDIT';
    initialData?: TaskDTO;
    onClose: () => void;
    onSubmit: (data: TaskCreateRequest | TaskUpdateRequest) => Promise<void>;
    employees: EmployeeDTO[];
}

export const TaskDialog: React.FC<Props> = ({
                                                open,
                                                mode,
                                                initialData,
                                                onClose,
                                                onSubmit,
                                                employees = []
                                            }) => {
    const [formData, setFormData] = useState<TaskFormState>({
        name: initialData?.name || '',
        description: initialData?.description || '',
        assigneeId: initialData?.assigneeId || '',
        estimatedHours: initialData?.estimatedHours || 0,
        status: initialData?.status || 'TODO'
    });

    const handleSubmit = async () => {
        await onSubmit(formData);
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="xs"
            TransitionProps={{ onExited: () => setFormData(initialFormState) }}
        >
            <DialogTitle>{mode === 'CREATE' ? 'Add Task' : 'Update Task'}</DialogTitle>
            <DialogContent>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            label="Task Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <TextField
                            select
                            fullWidth
                            label="Assignee"
                            value={formData.assigneeId}
                            onChange={(e) => setFormData({ ...formData, assigneeId: e.target.value })}
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            {employees.map((emp) => (
                                <MenuItem key={emp.id} value={emp.id}>
                                    {emp.firstName} {emp.lastName}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            multiline
                            rows={2}
                            label="Description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </Grid>

                    <Grid size={{ xs: 6 }}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Est. Hours"
                            value={formData.estimatedHours}
                            onChange={(e) => setFormData({ ...formData, estimatedHours: Number(e.target.value) })}
                        />
                    </Grid>

                    {mode === 'EDIT' && (
                        <Grid size={{ xs: 6 }}>
                            <TextField
                                select
                                fullWidth
                                label="Status"
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value as TaskDTO['status'] })}
                            >
                                {TASK_STATUS_OPTIONS.map((option) => (
                                    <MenuItem key={option} value={option}>{option}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    )}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">Save</Button>
            </DialogActions>
        </Dialog>
    );
};
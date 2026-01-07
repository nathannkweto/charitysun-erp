import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, MenuItem } from '@mui/material';
import { type JobPositionCreateRequest, type DepartmentDTO } from '../../../client';

interface JobDialogProps {
    open: boolean;
    onClose: () => void;
    departments: DepartmentDTO[];
    onSubmit: (data: JobPositionCreateRequest) => Promise<void>;
}

export const JobDialog = ({ open, onClose, departments, onSubmit }: JobDialogProps) => {
    const [title, setTitle] = useState('');
    const [deptId, setDeptId] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await onSubmit({ title, departmentId: deptId });
            onClose();
            setTitle('');
            setDeptId('');
        } catch (e) {
            console.error(e);
            alert("Failed to create job position");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create Job Position</DialogTitle>
            <DialogContent sx={{ minWidth: 300 }}>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Job Title"
                    fullWidth
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    select
                    margin="dense"
                    label="Department"
                    fullWidth
                    value={deptId}
                    onChange={(e) => setDeptId(e.target.value)}
                >
                    {departments.map((d) => (
                        <MenuItem key={d.id} value={d.id}>{d.name}</MenuItem>
                    ))}
                </TextField>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained" disabled={loading}>Create</Button>
            </DialogActions>
        </Dialog>
    );
};
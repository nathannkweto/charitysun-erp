import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button, Grid, MenuItem, useMediaQuery, useTheme,
    CircularProgress, Typography
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { type EmployeeDTO, type DepartmentDTO, type JobPositionDTO } from '../../../client';

export interface EmployeeFormInputs {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    departmentId: string;
    jobPositionId: string;
    dateOfJoining: Dayjs | null;
}

interface Props {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: EmployeeFormInputs) => Promise<void>;
    initialData?: EmployeeDTO | null;
    departments: DepartmentDTO[];
    jobPositions: JobPositionDTO[];
    loading?: boolean;
}

export const EmployeeDialog: React.FC<Props> = ({
                                                    open, onClose, onSubmit, initialData, departments, jobPositions, loading
                                                }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const { control, handleSubmit, reset, watch } = useForm<EmployeeFormInputs>({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            departmentId: '',
            jobPositionId: '',
            dateOfJoining: null
        }
    });

    useEffect(() => {
        if (initialData) {
            reset({
                firstName: initialData.firstName || '',
                lastName: initialData.lastName || '',
                email: initialData.email || '',
                phone: initialData.phone || '',
                departmentId: departments.find(d => d.name === initialData.departmentName)?.id || '',
                jobPositionId: jobPositions.find(j => j.title === initialData.jobTitle)?.id || '',
                dateOfJoining: initialData.dateOfJoining ? dayjs(initialData.dateOfJoining) : null
            });
        } else {
            reset({
                firstName: '', lastName: '', email: '', phone: '',
                departmentId: '', jobPositionId: '', dateOfJoining: dayjs()
            });
        }
    }, [initialData, open, departments, jobPositions, reset]);

    const handleFormSubmit = (data: EmployeeFormInputs) => {
        onSubmit(data);
    };

    const selectedDeptId = watch('departmentId');
    const filteredJobs = jobPositions.filter(j => j.departmentId === selectedDeptId);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
            fullScreen={isMobile}
        >
            <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white' }}>
                {initialData ? 'Edit Employee Profile' : 'Onboard New Employee'}
            </DialogTitle>

            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <DialogContent dividers>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12 }}>
                            <Typography variant="subtitle2" color="primary">Personal Information</Typography>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Controller name="firstName" control={control} rules={{ required: true }}
                                        render={({ field }) => <TextField {...field} label="First Name" fullWidth required />}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Controller name="lastName" control={control} rules={{ required: true }}
                                        render={({ field }) => <TextField {...field} label="Last Name" fullWidth required />}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Controller name="email" control={control} rules={{ required: true }}
                                        render={({ field }) => <TextField {...field} label="Email Address" type="email" fullWidth required />}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Controller name="phone" control={control}
                                        render={({ field }) => <TextField {...field} label="Phone Number" fullWidth />}
                            />
                        </Grid>

                        <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
                            <Typography variant="subtitle2" color="primary">Role & Position</Typography>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Controller name="departmentId" control={control} rules={{ required: true }}
                                        render={({ field }) => (
                                            <TextField {...field} select label="Department" fullWidth required>
                                                {departments.map(dept => (
                                                    <MenuItem key={dept.id} value={dept.id}>{dept.name} ({dept.code})</MenuItem>
                                                ))}
                                            </TextField>
                                        )}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Controller name="jobPositionId" control={control} rules={{ required: true }}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                select
                                                label="Job Title"
                                                fullWidth
                                                required
                                                disabled={!selectedDeptId}
                                            >
                                                {filteredJobs.map(job => (
                                                    <MenuItem key={job.id} value={job.id}>{job.title}</MenuItem>
                                                ))}
                                            </TextField>
                                        )}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Controller name="dateOfJoining" control={control} rules={{ required: true }}
                                        render={({ field }) => (
                                            <DatePicker
                                                label="Date of Joining"
                                                value={field.value}
                                                onChange={(val) => field.onChange(val)}
                                                slotProps={{ textField: { fullWidth: true, required: true } }}
                                            />
                                        )}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={onClose} color="inherit">Cancel</Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        startIcon={loading ? <CircularProgress size={20} /> : null}
                    >
                        {initialData ? 'Update Profile' : 'Complete Onboarding'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};
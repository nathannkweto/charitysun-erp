import { useState } from 'react';
import {
    Box, Button, Container, Fab, Typography, useMediaQuery, useTheme, Alert, Stack
} from '@mui/material';
import { Add, AccountBalance } from '@mui/icons-material';
import { useOrganization } from '../hooks/useOrganization';
import { type JobPositionDTO, type DepartmentCreateRequest } from '../../../client';
import { DepartmentDialog } from '../components/DepartmentDialog';
import {JobDialog} from "../components/JobDialog.tsx"; // Path to your new dialog

export const JobPositionsPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const {
        departments,
        createJobPosition,
        updateJobPosition,
        createDepartment
    } = useOrganization();

    const [jobDialogOpen, setJobDialogOpen] = useState(false);
    const [deptDialogOpen, setDeptDialogOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState<JobPositionDTO | null>(null);
    const [msg, setMsg] = useState<{ text: string, type: 'success' | 'info' } | null>(null);

    const handleCreateJob = () => { setSelectedJob(null); setJobDialogOpen(true); };

    const handleJobSubmit = async (data: any) => {
        if (selectedJob?.id) {
            await updateJobPosition(selectedJob.id, data);
            setMsg({ text: 'Job Position Updated', type: 'success' });
        } else {
            await createJobPosition(data);
            setMsg({ text: 'Job Position Created', type: 'success' });
        }
        setTimeout(() => setMsg(null), 4000);
    };

    const handleDeptSubmit = async (data: DepartmentCreateRequest) => {
        await createDepartment(data);
        setMsg({ text: `Department ${data.code} created successfully`, type: 'success' });
        setTimeout(() => setMsg(null), 4000);
    };

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" fontWeight="800">Organization Setup</Typography>

                <Stack direction="row" spacing={2}>
                    <Button
                        variant="outlined"
                        color="secondary"
                        startIcon={<AccountBalance />}
                        onClick={() => setDeptDialogOpen(true)}
                    >
                        New Department
                    </Button>
                    {!isMobile && (
                        <Button
                            variant="contained"
                            startIcon={<Add />}
                            onClick={handleCreateJob}
                        >
                            New Position
                        </Button>
                    )}
                </Stack>
            </Box>

            {msg && <Alert severity={msg.type} sx={{ mb: 2 }}>{msg.text}</Alert>}

            <JobDialog
                open={jobDialogOpen}
                onClose={() => setJobDialogOpen(false)}
                onSubmit={handleJobSubmit}
                departments={departments}
            />

            <DepartmentDialog
                open={deptDialogOpen}
                onClose={() => setDeptDialogOpen(false)}
                onSubmit={handleDeptSubmit}
            />

            {isMobile && (
                <Fab color="primary" sx={{ position: 'fixed', bottom: 16, right: 16 }} onClick={handleCreateJob}>
                    <Add />
                </Fab>
            )}
        </Container>
    );
};
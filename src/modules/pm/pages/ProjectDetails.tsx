import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box, Typography, Button, Paper, Grid, Divider, Accordion,
    AccordionSummary, AccordionDetails, Card, CardContent,
    LinearProgress, IconButton, Tooltip
} from '@mui/material';
import {
    ExpandMore, Add as AddIcon, ArrowBack, Edit as EditIcon,
    AccessTime, Person
} from '@mui/icons-material';
import { useProjects } from '../hooks/useProjects';
import { StatusChip } from '../components/StatusChip';
import { CreatePhaseDialog } from '../components/CreatePhaseDialog';
import { TaskDialog } from '../components/TaskDialog';
import { type TaskCreateRequest, type TaskDTO, type TaskUpdateRequest } from '../../../client';

export const ProjectDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const {
        currentProject,
        employees,
        loading,
        fetchProjectDetails,
        createPhase,
        createTask,
        updateTask
    } = useProjects();

    const [phaseModalOpen, setPhaseModalOpen] = useState(false);
    const [taskModalOpen, setTaskModalOpen] = useState(false);
    const [activePhaseId, setActivePhaseId] = useState<string | null>(null);
    const [editingTask, setEditingTask] = useState<TaskDTO | null>(null);

    type TaskSubmitData = TaskCreateRequest | TaskUpdateRequest;

    useEffect(() => {
        if (id) fetchProjectDetails(id);
    }, [id, fetchProjectDetails]);

    const getAssigneeName = (assigneeId?: string) => {
        if (!assigneeId) return 'Unassigned';
        const emp = employees.find(e => e.id === assigneeId);
        return emp ? `${emp.firstName} ${emp.lastName}` : 'Unknown User';
    };

    if (loading || !currentProject) return <LinearProgress />;

    const handleAddTaskClick = (phaseId: string) => {
        setActivePhaseId(phaseId);
        setEditingTask(null);
        setTaskModalOpen(true);
    };

    const handleEditTaskClick = (task: TaskDTO) => {
        setEditingTask(task);
        setTaskModalOpen(true);
    };

    const handleTaskSubmit = async (data: TaskSubmitData) => {
        if (editingTask && editingTask.id) {
            await updateTask(editingTask.id, data as TaskUpdateRequest);
        } else if (activePhaseId) {
            await createTask(activePhaseId, data as TaskCreateRequest);
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Button startIcon={<ArrowBack />} onClick={() => navigate('/projects')} sx={{ mb: 2 }}>
                Back to Dashboard
            </Button>

            <Paper sx={{ p: 3, mb: 4 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Typography variant="h4">{currentProject.name} <small>({currentProject.code})</small></Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                            {currentProject.description}
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }} sx={{ textAlign: 'right' }}>
                        <StatusChip status={currentProject.status!} type="PROJECT" />
                        <Typography variant="h6" sx={{ mt: 1 }}>
                            Budget: ${currentProject.budgetAmount?.toLocaleString()}
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h5">Project Roadmap</Typography>
                <Button variant="outlined" startIcon={<AddIcon />} onClick={() => setPhaseModalOpen(true)}>
                    Add Phase
                </Button>
            </Box>

            {currentProject.phases?.map((phase) => (
                <Accordion key={phase.id} defaultExpanded>
                    <AccordionSummary expandIcon={<ExpandMore />} sx={{ bgcolor: 'rgba(0, 0, 0, 0.03)' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between', pr: 2 }}>
                            <Typography variant="h6">{phase.name}</Typography>
                            <Button
                                size="small"
                                startIcon={<AddIcon />}
                                onClick={(e) => { e.stopPropagation(); handleAddTaskClick(phase.id!); }}
                            >
                                Add Task
                            </Button>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails sx={{ bgcolor: '#f9f9f9' }}>
                        {(!phase.tasks || phase.tasks.length === 0) && (
                            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', py: 2 }}>
                                No tasks in this phase yet.
                            </Typography>
                        )}
                        <Grid container spacing={2}>
                            {phase.tasks?.map((task) => (
                                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={task.id}>
                                    <Card variant="outlined">
                                        <CardContent>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                                <Typography variant="subtitle1" fontWeight="bold">{task.name}</Typography>
                                                <StatusChip status={task.status!} type="TASK" />
                                            </Box>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: '40px' }}>
                                                {task.description || "No description provided."}
                                            </Typography>
                                            <Divider sx={{ my: 1 }} />
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Box sx={{ display: 'flex', gap: 1 }}>
                                                    <Tooltip title="Estimated Hours">
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                            <AccessTime fontSize="small" color="action" />
                                                            <Typography variant="caption">{task.estimatedHours}h</Typography>
                                                        </Box>
                                                    </Tooltip>
                                                    <Tooltip title="Assignee">
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                            <Person fontSize="small" color="action" />
                                                            <Typography variant="caption">
                                                                {getAssigneeName(task.assigneeId)}
                                                            </Typography>
                                                        </Box>
                                                    </Tooltip>
                                                </Box>
                                                <IconButton size="small" onClick={() => handleEditTaskClick(task)}>
                                                    <EditIcon fontSize="small" />
                                                </IconButton>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            ))}

            <CreatePhaseDialog
                open={phaseModalOpen}
                onClose={() => setPhaseModalOpen(false)}
                onSubmit={async (data) => createPhase(currentProject.id!, data)}
            />

            <TaskDialog
                key={editingTask?.id || activePhaseId || 'task-dialog'}
                open={taskModalOpen}
                mode={editingTask ? 'EDIT' : 'CREATE'}
                initialData={editingTask || undefined}
                onClose={() => setTaskModalOpen(false)}
                onSubmit={handleTaskSubmit}
                employees={employees}
            />
        </Box>
    );
};
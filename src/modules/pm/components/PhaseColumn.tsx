import { useState } from 'react';
import { Plus } from 'lucide-react';
import { type ProjectPhaseDTO, type TaskDTO } from '../../../client';
import { TaskCard } from './TaskCard';

interface PhaseColumnProps {
    phase: ProjectPhaseDTO;
    onAddTask: (phaseId: string, taskName: string) => Promise<void>;
    onStatusToggle: (task: TaskDTO) => void;
}

export const PhaseColumn = ({ phase, onAddTask, onStatusToggle }: PhaseColumnProps) => {
    const [isAdding, setIsAdding] = useState(false);
    const [newTaskName, setNewTaskName] = useState('');

    const handleAddTask = async () => {
        if (!newTaskName.trim() || !phase.id) return;
        await onAddTask(phase.id, newTaskName);
        setNewTaskName('');
        setIsAdding(false);
    };

    return (
        <div className="w-80 bg-gray-50 rounded-lg border border-gray-200 flex flex-col h-full max-h-full">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 bg-white rounded-t-lg sticky top-0 z-10">
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-800">{phase.name}</h3>
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                        {phase.tasks?.length || 0}
                    </span>
                </div>
            </div>

            {/* Task List Area */}
            <div className="p-3 space-y-3 overflow-y-auto flex-1 custom-scrollbar">
                {phase.tasks?.map((task) => (
                    <TaskCard key={task.id} task={task} onStatusToggle={onStatusToggle} />
                ))}

                {/* Inline Add Task Form */}
                {isAdding ? (
                    <div className="bg-white p-2 rounded border border-blue-300 shadow-sm">
                        <textarea
                            autoFocus
                            className="w-full text-sm outline-none resize-none"
                            placeholder="Task description..."
                            rows={2}
                            value={newTaskName}
                            onChange={(e) => setNewTaskName(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleAddTask();
                                }
                            }}
                        />
                        <div className="flex gap-2 mt-2">
                            <button
                                onClick={handleAddTask}
                                className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                            >
                                Add
                            </button>
                            <button
                                onClick={() => setIsAdding(false)}
                                className="text-xs text-gray-500 px-2 py-1 hover:bg-gray-100 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={() => setIsAdding(true)}
                        className="w-full py-2 text-sm text-gray-500 hover:bg-gray-200 rounded dashed border border-gray-300 flex items-center justify-center gap-1 transition-colors"
                    >
                        <Plus className="w-4 h-4" /> Add Task
                    </button>
                )}
            </div>
        </div>
    );
};
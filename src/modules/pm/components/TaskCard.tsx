import { Clock, CheckCircle, Circle } from 'lucide-react';
import { type TaskDTO } from '../../../client';

interface TaskCardProps {
    task: TaskDTO;
    onStatusToggle: (task: TaskDTO) => void;
}

export const TaskCard = ({ task, onStatusToggle }: TaskCardProps) => {
    const isDone = task.status === 'DONE';

    return (
        <div className="bg-white p-3 rounded shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
            <div className="flex justify-between items-start gap-2">
                <p className={`text-sm font-medium ${isDone ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                    { task.name}
                </p>
                <button
                    onClick={() => onStatusToggle(task)}
                    className={`shrink-0 transition-colors ${isDone ? 'text-green-600' : 'text-gray-300 hover:text-green-600'}`}
                    aria-label={isDone ? "Mark as incomplete" : "Mark as complete"}
                >
                    {isDone ? <CheckCircle className="w-4 h-4"/> : <Circle className="w-4 h-4"/>}
                </button>
            </div>

            <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
                <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{task.estimatedHours ?? 0}h</span>
                </div>

                {task.assigneeId && (
                    <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold uppercase">
                        {task.assigneeId.substring(0, 2)}
                    </div>
                )}
            </div>
        </div>
    );
};
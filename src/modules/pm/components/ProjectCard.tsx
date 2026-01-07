import { Link } from 'react-router-dom';
import { Folder, Calendar, DollarSign, ArrowRight } from 'lucide-react';
import { type ProjectDTO } from '../../../client';

interface ProjectCardProps {
    project: ProjectDTO;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
    const getStatusColor = (status?: string) => {
        switch (status) {
            case 'IN_PROGRESS': return 'bg-indigo-50 text-indigo-700 ring-indigo-600/20';
            case 'DONE': return 'bg-green-50 text-green-700 ring-green-600/20';
            default: return 'bg-slate-50 text-slate-600 ring-slate-500/10';
        }
    };

    return (
        <div className="group relative flex flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200 transition-all hover:shadow-md hover:ring-indigo-500/50">
            <div className="p-6">
                <div className="flex items-center justify-between gap-x-4">
                    <div className="rounded-lg bg-indigo-50 p-2 ring-1 ring-inset ring-indigo-100">
                        <Folder className="h-6 w-6 text-indigo-600" />
                    </div>
                    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${getStatusColor(project.status)}`}>
                        {project.status?.replace('_', ' ')}
                    </span>
                </div>

                <div className="mt-4">
                    <h3 className="text-lg font-semibold leading-6 text-slate-900">
                        <Link to={`/projects/${project.id}`}>
                            <span className="absolute inset-0" />
                            {project.name}
                        </Link>
                    </h3>
                    <p className="mt-1 text-sm leading-5 text-slate-500 line-clamp-2">
                        {project.code}
                    </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-sm text-slate-500">
                    <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-slate-400" />
                        <span className="font-medium text-slate-700">{project.budgetAmount?.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-slate-400" />
                        <span>{project.phases?.length || 0} Phases</span>
                    </div>
                </div>
            </div>
            <div className="bg-slate-50 px-6 py-3 transition-colors group-hover:bg-indigo-50/50">
                <div className="flex items-center justify-between text-xs font-medium text-indigo-600">
                    <span>View Board</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
            </div>
        </div>
    );
};
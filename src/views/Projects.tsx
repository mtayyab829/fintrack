import { api } from '../api';
import { useEffect, useState } from 'react';
import { Plus, Search, Users, Clock, ChevronRight, MoreVertical } from 'lucide-react';

interface ProjectsProps {
  onOpenCreate: () => void;
  searchQuery?: string;
  onProjectClick?: (project: {id: string, name: string}) => void;
}

const Projects = ({ onOpenCreate, searchQuery = '', onProjectClick }: ProjectsProps) => {
  const [activeTab, setActiveTab] = useState('all');
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await api.getProjects();
        setProjects(data);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (activeTab === 'all' || p.status.toLowerCase() === activeTab.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Projects</h1>
        <button 
          onClick={onOpenCreate}
          className="bg-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-emerald-500/20"
        >
          <Plus size={18} />
          Create Project
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex gap-4 border-b border-white/5 w-full sm:w-auto">
          {['all', 'in progress', 'completed', 'on hold'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 px-2 text-sm font-medium capitalize transition-all relative ${
                activeTab === tab ? 'text-emerald-500' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div key={project._id || project.id} className="bg-[#151619] border border-white/5 rounded-3xl p-6 hover:border-emerald-500/30 transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className={`w-12 h-12 rounded-2xl ${project.color || 'bg-emerald-500'} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                {project.name.charAt(0)}
              </div>
              <button className="p-2 text-gray-500 hover:text-white transition-colors">
                <MoreVertical size={18} />
              </button>
            </div>

            <h3 
              className="text-lg font-bold text-white mb-2 group-hover:text-emerald-500 transition-colors cursor-pointer"
              onClick={() => onProjectClick?.({ id: (project._id || project.id).toString(), name: project.name })}
            >
              {project.name}
            </h3>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                <Users size={14} />
                {project.members} Members
              </div>
              <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                <Clock size={14} />
                {project.hours}h Tracked
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-500">Progress</span>
                <span className="text-white font-medium">{project.progress}%</span>
              </div>
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                <div 
                  className={`${project.color || 'bg-emerald-500'} h-full transition-all duration-1000`} 
                  style={{ width: `${project.progress || 0}%` }} 
                />
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
              <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-lg ${
                project.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500' :
                project.status === 'On Hold' ? 'bg-amber-500/10 text-amber-500' :
                'bg-blue-500/10 text-blue-500'
              }`}>
                {project.status}
              </span>
              <button className="text-emerald-500 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                View Details
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;

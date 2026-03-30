import { Project } from '@/types';

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group border border-zhusha/5 p-8 bg-white/30 backdrop-blur-sm hover:border-zhusha/30 transition-all duration-500">
      <div className="flex justify-between items-start mb-6">
        <div>
          <span className="text-[10px] text-zhusha font-bold tracking-[0.3em] uppercase opacity-50 block mb-2">
            Entry #{project.id.toString().padStart(2, '0')}
          </span>
          <h3 className="text-2xl font-serif text-xuanblack group-hover:tracking-wider transition-all duration-500">
            {project.title}
          </h3>
        </div>
        <span className={`text-[8px] px-2 py-1 tracking-widest uppercase border ${
          project.status === 'Completed' ? 'border-dai/30 text-dai' : 'border-zhusha/30 text-zhusha'
        }`}>
          {project.status}
        </span>
      </div>

      <p className="text-xs leading-relaxed opacity-60 mb-6 font-sans">
        {project.summary}
      </p>

      <div className="space-y-3 mb-8">
        {project.highlights.map((point, index) => (
          <p key={index} className="text-[10px] opacity-80 flex items-start">
            <span className="text-zhusha mr-2">✦</span> {point}
          </p>
        ))}
      </div>

      <div className="flex justify-between items-center border-t border-zhusha/5 pt-6">
        <div className="flex gap-4">
          {project.tech.map(t => (
            <span key={t} className="text-[9px] opacity-40 font-mono tracking-tighter">#{t}</span>
          ))}
        </div>
        {project.link !== "/" && (
          <a href={project.link} target="_blank" className="text-[10px] uppercase tracking-[0.2em] text-zhusha hover:underline">
            View Source ↗
          </a>
        )}
      </div>
    </div>
  );
}
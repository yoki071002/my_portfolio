import { projects } from '@/data/projects';
import ProjectCard from '@/components/ProjectCard';

export default function ArchivePage() {
  const displayProjects = projects;

  return (
    <div className="max-w-6xl mx-auto px-8 py-20">
      <header className="mb-20 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-serif italic text-xuanblack mb-4">Project Archive</h1>
          <p className="text-[10px] tracking-[0.3em] uppercase opacity-40">
            A Collection of Technical Artifacts & Creative Studies
          </p>
        </div>
        <div className="text-[9px] text-right opacity-30 tracking-widest hidden md:block">
          TOTAL ENTRIES: {projects.length} <br />
          LOCATION: LONDON / BOSTON / BEIJING
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zhusha/5 border border-zhusha/5">
        {displayProjects.map((project) => (
          <div key={project.id} className="bg-xuan">
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </div>
  );
}
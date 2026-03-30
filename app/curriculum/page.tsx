import { experiences } from '@/data/experience';
import ExperienceCard from '@/components/ExperienceCard';

export default function CurriculumPage() {
  const sortedExperiences = [...experiences].sort((a, b) => b.id - a.id);

  return (
    <div className="max-w-4xl mx-auto px-8 py-20">
      <header className="mb-20">
        <h1 className="text-4xl font-serif italic text-zhusha mb-4">Curriculum Vitae</h1>
        <p className="text-[10px] tracking-[0.3em] uppercase opacity-40">
          Internships & Academic Research / 2023 — Present
        </p>
      </header>

      <div className="space-y-4">
        {sortedExperiences.map((exp) => (
          <ExperienceCard key={exp.id} exp={exp} />
        ))}
      </div>
    </div>
  );
}
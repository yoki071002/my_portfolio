import { Experience } from '@/types';

export default function ExperienceCard({ exp }: { exp: Experience }) {
  return (
    <div className="group py-8 border-b border-zhusha/10 last:border-0 hover:bg-zhusha/1 transition-colors">
      <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 px-4">
        {/* TImeline */}
        <span className="text-[10px] tracking-[0.2em] font-sans opacity-40 uppercase shrink-0 w-32">
          {exp.period}
        </span>

        {/* Core Content */}
        <div className="grow space-y-4">
          <div>
            <h3 className="text-xl font-serif text-xuanblack group-hover:text-zhusha transition-colors">
              {exp.company}
            </h3>
            <div className="flex justify-between items-baseline mt-1">
              <span className="text-xs italic opacity-60 font-serif">{exp.role}</span>
              <span className="text-[9px] uppercase tracking-widest opacity-40">{exp.location}</span>
            </div>
          </div>

          <ul className="space-y-2 max-w-2xl">
            {exp.desc.map((item, index) => (
              <li key={index} className="text-[11px] leading-relaxed opacity-70 list-none pl-0">
                — {item}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3 pt-2">
            {exp.tags.map(tag => (
              <span key={tag} className="text-[9px] uppercase tracking-tighter px-2 py-0.5 border border-zhusha/20 text-zhusha/60 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
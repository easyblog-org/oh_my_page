import { ProjectCard } from '@/components/ProjectCard';
import type { Project } from '@/types/types';

interface FeaturedProjectsProps {
  projects: Project[];
  visible?: boolean;
}

function getDesktopGridClass(count: number): string {
  switch (count) {
    case 1:
      return 'lg:grid-cols-1';
    case 2:
      return 'lg:grid-cols-2';
    case 3:
      return 'lg:grid-cols-3';
    case 4:
      return 'lg:grid-cols-2';
    case 5:
      return 'lg:grid-cols-3';
    case 6:
      return 'lg:grid-cols-3';
    default:
      return 'lg:grid-cols-3';
  }
}

export default function FeaturedProjects({ projects, visible = true }: FeaturedProjectsProps) {
  const count = projects.length;

  if (count === 0) return null;

  if (count === 1) {
    return (
      <div className="flex justify-center">
        <div className="w-full max-w-[600px] lg:max-w-[780px]">
          <ProjectCard project={projects[0]} index={0} visible={visible} />
        </div>
      </div>
    );
  }

  if (count === 5) {
    const firstRow = projects.slice(0, 3);
    const secondRow = projects.slice(3, 5);

    return (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {firstRow.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} visible={visible} />
          ))}
        </div>
        <div className="flex justify-center flex-wrap gap-6 mt-6">
          {secondRow.map((project, index) => (
            <div
              key={project.id}
              className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] lg:max-w-[360px]"
            >
              <ProjectCard project={project} index={3 + index} visible={visible} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const gridClass = getDesktopGridClass(count);

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 ${gridClass} gap-6 items-stretch`}>
      {projects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} visible={visible} />
      ))}
    </div>
  );
}

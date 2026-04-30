import { Link } from "react-router-dom";
import type { Project } from "@/types/types";

interface ProjectCardProps {
  project: Project;
  index?: number;
  visible?: boolean;
}

export function ProjectCard({ project, index = 0, visible = true }: ProjectCardProps) {
  const year = project.createdAt.slice(0, 4);

  return (
    <Link
      to={`/projects/${project.id}`}
      className={`group block transition-all duration-500 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${(index + 1) * 0.1}s` }}
    >
      <div className="bg-[rgba(15,23,42,0.6)] backdrop-blur-[4px] border border-[rgba(59,130,246,0.2)] rounded-2xl overflow-hidden transition-all duration-300 ease-out hover:border-[#3b82f6] hover:shadow-[0_20px_25px_-12px_rgba(0,0,0,0.5)]">
        <div className="aspect-video overflow-hidden relative">
          {project.coverImage ? (
            <img
              src={project.coverImage}
              alt={project.title}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#1e293b] to-[#0f172a] flex items-center justify-center">
              <span className="text-4xl text-[#334155]">📦</span>
            </div>
          )}
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="absolute top-3 right-3 text-xs text-[#f0f0f0] bg-[rgba(15,23,42,0.8)] px-2 py-1 rounded">
            {year}
          </span>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#3b82f6] transition-colors duration-200">
            {project.title}
          </h3>

          <p className="text-sm text-[#cbd5e1] leading-[1.5] mb-4 line-clamp-2">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {(project.tags ?? []).map((tag) => (
              <span
                key={tag}
                className="bg-[#1e293b] text-[#60a5fa] px-3 py-1 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <span className="text-sm text-[#3b82f6] group-hover:underline">
            查看详情 →
          </span>
        </div>
      </div>
    </Link>
  );
}

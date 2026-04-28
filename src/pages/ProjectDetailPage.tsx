import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { projects } from "../data/projects";

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);
  const [visible, setVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setVisible(true);
    setCurrentImageIndex(0);
    window.scrollTo(0, 0);
  }, [id]);

  const images = project
    ? (project.coverImages ?? [project.coverImage]).filter(Boolean)
    : [];
  const totalImages = images.length;

  useEffect(() => {
    if (totalImages <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % totalImages);
    }, 5000);
    return () => clearInterval(interval);
  }, [totalImages]);

  if (!project) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center"
        style={{
          background: "radial-gradient(circle at 10% 20%, #0a0f1c, #030614)",
        }}
      >
        <h1 className="text-3xl font-bold text-white mb-4">项目不存在</h1>
        <p className="text-[#94a3b8] mb-8">找不到您要查看的项目</p>
        <Link
          to="/projects"
          className="text-[#3b82f6] hover:underline text-base"
        >
          ← 返回项目列表
        </Link>
      </div>
    );
  }

  const year = project.createdAt.slice(0, 4);

  return (
    <div
      className="min-h-screen"
      style={{
        background: "radial-gradient(circle at 10% 20%, #0a0f1c, #030614)",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-5 pt-24 pb-20">
        <Link
          to="/projects"
          className={`inline-flex items-center text-sm text-[#94a3b8] hover:text-[#3b82f6] transition-all duration-300 mb-8 group ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
        >
          <svg
            className="mr-2 w-4 h-4 transition-transform group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          返回项目列表
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div
            className={`lg:col-span-8 flex flex-col gap-8 transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            {images.length > 0 && (
              <div className="relative aspect-video overflow-hidden rounded-2xl border border-[rgba(59,130,246,0.2)]">
                {images.map((image, idx) => (
                  <img
                    key={idx}
                    src={image}
                    alt={`${project.title} - 图片 ${idx + 1}`}
                    className={`w-full h-full object-cover absolute inset-0 transition-all duration-500 ease-in-out ${idx === currentImageIndex
                        ? "opacity-100 translate-x-0 z-10"
                        : idx < currentImageIndex
                          ? "opacity-0 -translate-x-full z-0"
                          : "opacity-0 translate-x-full z-0"
                      }`}
                  />
                ))}
                {totalImages > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 border-none cursor-pointer ${idx === currentImageIndex
                            ? "bg-[#3b82f6] scale-125"
                            : "bg-[#475569] hover:bg-[#64748b]"
                          }`}
                        onClick={() => setCurrentImageIndex(idx)}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
                项目详情
              </h2>
              <p className="text-base text-[#cbd5e1] leading-[1.8]">
                {project.longDescription}
              </p>
            </div>
          </div>

          <aside
            className={`lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-24 self-start transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            style={{ transitionDelay: "0.15s" }}
          >
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-3">
                {project.title}
              </h1>
              <p className="text-base text-[#94a3b8] leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="h-px bg-[#1e293b]" />

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#94a3b8]">类别</span>
                <span className="text-sm text-[#60a5fa] bg-[#1e293b] px-3 py-1 rounded-full">
                  {project.category}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-[#94a3b8]">年份</span>
                <span className="text-sm text-white">{year}</span>
              </div>

              {project.tech && (
                <div className="flex items-start justify-between gap-4">
                  <span className="text-sm text-[#94a3b8] shrink-0">技术栈</span>
                  <span className="text-sm text-[#cbd5e1] text-right">
                    {project.tech}
                  </span>
                </div>
              )}
            </div>

            {(project.tags ?? []).length > 0 && (
              <>
                <div className="h-px bg-[#1e293b]" />
                <div className="flex flex-wrap gap-2">
                  {project.tags!.map((tag) => (
                    <span
                      key={tag}
                      className="bg-[#1e293b] text-[#60a5fa] px-3 py-1 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </>
            )}

            <div className="h-px bg-[#1e293b]" />

            <div className="flex flex-col gap-3">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#3b82f6] text-white px-6 py-3 rounded-lg text-center text-sm font-medium hover:bg-[#2563eb] transition-colors duration-200 no-underline"
                >
                  访问线上地址 →
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-transparent border border-[#3b82f6] text-[#3b82f6] px-6 py-3 rounded-lg text-center text-sm font-medium hover:bg-[rgba(59,130,246,0.1)] transition-colors duration-200 no-underline"
                >
                  GitHub 仓库
                </a>
              )}
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                }}
                className="w-full bg-transparent border border-[#334155] text-[#94a3b8] px-6 py-3 rounded-lg text-sm hover:text-white hover:border-[#475569] transition-colors duration-200 cursor-pointer"
              >
                复制链接
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

import { useState, useMemo, useEffect, useRef } from "react";
import { projects } from "../data/projects";
import { ProjectCard } from "../components/ProjectCard";

const categories = ["全部", ...Array.from(new Set(projects.map((p) => p.category)))];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("全部");
  const [visible, setVisible] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisible(true);
  }, []);

  const handleCategoryChange = (category: string) => {
    if (activeCategory !== category) {
      setVisible(false);
      setAnimationKey((prev) => prev + 1);
      setActiveCategory(category);
      setTimeout(() => setVisible(true), 50);
    }
  };

  const filteredProjects = useMemo(() => {
    if (activeCategory === "全部") return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div
      ref={pageRef}
      className="min-h-screen"
      style={{
        background: "radial-gradient(circle at 10% 20%, #0a0f1c, #030614)",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-5 pt-24 pb-20">
        <div
          className={`mb-12 transition-all duration-600 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            全部项目
          </h1>
          <div className="w-[60px] h-[2px] bg-[#3b82f6]" />
        </div>

        <div
          className={`flex flex-wrap gap-3 mb-10 transition-all duration-600 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "0.1s" }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 text-sm rounded-full transition-all duration-200 border-none cursor-pointer ${
                activeCategory === category
                  ? "bg-[#3b82f6] text-white"
                  : "bg-[#1e293b] text-[#94a3b8] hover:text-white hover:bg-[#334155]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {filteredProjects.length > 0 ? (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            key={animationKey}
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                visible={visible}
              />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <p className="text-xl text-[#64748b]">暂无相关项目</p>
          </div>
        )}
      </div>
    </div>
  );
}

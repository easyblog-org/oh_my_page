import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { projects } from "../data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const categories = ["全部", ...Array.from(new Set(projects.map((p) => p.category)))];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("全部");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "全部") return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="container mx-auto px-6 md:px-12 py-12 md:py-24">
      <header className="mb-12 md:mb-24">
        <h1 className="text-3xl md:text-6xl font-bold tracking-tighter mb-8 text-center md:text-left">所有作品</h1>
        
        {/* Filter */}
        <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-4 border-b border-border pb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "text-xs md:text-sm font-bold tracking-widest uppercase transition-all duration-300 relative pb-2",
                activeCategory === category 
                  ? "text-primary after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-[2px] after:bg-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </header>

      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
          {filteredProjects.map((project) => (
            <Link key={project.id} to={`/projects/${project.id}`} className="group">
              <Card className="gallery-card overflow-hidden bg-transparent border-0 shadow-none">
                <div className="aspect-[3/4] overflow-hidden relative">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <CardContent className="pt-6 md:pt-8 px-0 pb-0">
                  <div className="flex justify-between items-start mb-3">
                    <Badge variant="secondary" className="text-[10px] font-bold tracking-widest uppercase px-2 py-0">
                      {project.category}
                    </Badge>
                    <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">
                      {project.createdAt}
                    </span>
                  </div>
                  <h4 className="text-xl md:text-2xl font-bold tracking-tight group-hover:text-primary transition-colors leading-tight mb-3">
                    {project.title}
                  </h4>
                  <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="py-24 text-center">
          <p className="text-xl text-muted-foreground">暂无作品，敬请期待</p>
        </div>
      )}
    </div>
  );
}

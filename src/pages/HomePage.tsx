import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { creatorInfo, projects } from "../data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  const featuredProjects = projects.slice(0, 6);

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="container mx-auto px-6 md:px-12 py-20 md:py-40 flex flex-col items-start">
        <h2 className="text-lg md:text-xl font-medium tracking-widest uppercase text-primary mb-6 animate-fade-in">
          {creatorInfo.nickname}
        </h2>
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight max-w-4xl mb-12 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          {creatorInfo.bio}
        </h1>
        <Button asChild size="lg" className="px-10 py-8 text-lg font-bold group animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <Link to="/projects">
            查看作品
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </section>

      {/* Featured Projects */}
      <section className="bg-muted/30 py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-muted-foreground mb-4">精选作品 / FEATURED</h2>
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight">近期创作精选</h3>
            </div>
            <Link to="/projects" className="hidden md:flex items-center text-sm font-bold tracking-widest uppercase hover:text-primary transition-colors group">
              全部作品
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {featuredProjects.map((project, index) => (
              <Link key={project.id} to={`/projects/${project.id}`} className="group">
                <Card className="gallery-card overflow-hidden bg-transparent">
                  <div className="aspect-[4/5] overflow-hidden relative">
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <CardContent className="pt-6 px-0 pb-0">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline" className="text-[10px] font-bold tracking-widest uppercase px-2 py-0 border-primary/20 text-primary">
                        {project.category}
                      </Badge>
                      <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">
                        {project.createdAt.split('-')[0]}
                      </span>
                    </div>
                    <h4 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors leading-tight">
                      {project.title}
                    </h4>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-16 text-center md:hidden">
            <Button asChild variant="outline" size="lg" className="w-full">
              <Link to="/projects">查看全部作品</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-6 md:px-12 py-24 md:py-40 text-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">
          对合作感兴趣？
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
          我始终对具有挑战性的项目与有趣的创意充满期待。如果您有任何想法或合作意向，欢迎随时联系我。
        </p>
        <Button asChild size="lg" variant="secondary" className="px-10 py-8 text-lg font-bold">
          <Link to="/contact">开启对话</Link>
        </Button>
      </section>
    </div>
  );
}

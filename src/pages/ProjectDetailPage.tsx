import { useParams, Link } from "react-router-dom";
import { projects } from "../data/mockData";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Tag, ChevronRight, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="container mx-auto px-6 py-40 text-center">
        <h1 className="text-4xl font-bold mb-8">作品不存在</h1>
        <Button asChild>
          <Link to="/projects">返回作品列表</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 md:px-12 py-12 md:py-24">
      <Link to="/projects" className="inline-flex items-center text-xs md:text-sm font-bold tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors group mb-8 md:mb-12">
        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
        返回作品列表
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
        <div className="md:col-span-8 flex flex-col gap-8 md:gap-12">
          {/* Main Content Area */}
          <div className="overflow-hidden bg-muted/20 border border-border">
             <img
              src={project.coverImage}
              alt={project.title}
              className="w-full h-auto object-cover"
            />
          </div>
          
          <div className="prose prose-sm md:prose-lg dark:prose-invert max-w-none">
            <h3 className="text-xl md:text-2xl font-bold mb-6">项目背景与挑战</h3>
            <p className="text-sm md:text-lg text-muted-foreground leading-relaxed mb-8">
              {project.longDescription}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-12">
                <div className="p-6 md:p-8 bg-muted/20 border border-border">
                    <h4 className="font-bold mb-4 uppercase tracking-widest text-[10px] md:text-xs">项目目标 / GOAL</h4>
                    <p className="text-xs md:text-sm text-muted-foreground">通过创新的视觉语言与技术手段，为用户提供超出预期的价值体验，并在同类产品中脱颖而出。</p>
                </div>
                <div className="p-6 md:p-8 bg-muted/20 border border-border">
                    <h4 className="font-bold mb-4 uppercase tracking-widest text-[10px] md:text-xs">最终成果 / OUTCOME</h4>
                    <p className="text-xs md:text-sm text-muted-foreground">项目最终获得了客户的高度认可，并在相关领域引发了积极的反响，成功达成了预设的所有关键指标。</p>
                </div>
            </div>
          </div>
        </div>

        <aside className="md:col-span-4 flex flex-col gap-8 md:sticky md:top-32 self-start">
          <div className="flex flex-col gap-6">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tighter leading-tight">{project.title}</h1>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{project.description}</p>
          </div>

          <Separator />

          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-xs md:text-sm text-muted-foreground">
                <Tag className="mr-2 h-4 w-4" />
                <span>类别</span>
              </div>
              <Badge variant="outline" className="text-[10px] font-bold tracking-widest uppercase">
                {project.category}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center text-xs md:text-sm text-muted-foreground">
                <Calendar className="mr-2 h-4 w-4" />
                <span>创作日期</span>
              </div>
              <span className="text-xs md:text-sm font-medium">{project.createdAt}</span>
            </div>
          </div>

          <Separator />

          <div className="flex flex-col gap-4">
             <Button className="w-full py-6 text-sm md:text-base font-bold tracking-widest uppercase group" onClick={() => toast.info("该项目演示地址暂未公开")}>
               访问线上地址
               <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
             </Button>
             <Button variant="outline" className="w-full py-6 text-sm md:text-base font-bold tracking-widest uppercase" onClick={() => toast.success("作品链接已复制到剪贴板")}>
               <Share2 className="mr-2 h-4 w-4" />
               分享该作品
             </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}

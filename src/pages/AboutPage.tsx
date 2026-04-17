import { creatorInfo } from "../data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-6 md:px-12 py-12 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
        {/* Left Column - Image */}
        <div className="md:col-span-5 flex flex-col gap-8">
          <div className="aspect-[3/4] overflow-hidden bg-muted border border-border">
            <img
              src={creatorInfo.avatar}
              alt={creatorInfo.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex flex-col gap-4">
            <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground">联系方式 / CONTACT</h2>
            <div className="flex flex-col gap-3">
              <a href={`mailto:${creatorInfo.contact.email}`} className="text-foreground hover:text-primary transition-colors font-medium break-all">
                {creatorInfo.contact.email}
              </a>
              <div className="flex flex-wrap gap-4 mt-2">
                {creatorInfo.contact.socialLinks.map((link) => (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
                  >
                    {link.platform}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Content */}
        <div className="md:col-span-7 flex flex-col gap-10 md:gap-16">
          <div>
            <h1 className="text-4xl md:text-7xl font-bold tracking-tighter mb-6">{creatorInfo.name}</h1>
            <p className="text-lg md:text-2xl text-muted-foreground font-medium tracking-tight">
              {creatorInfo.bio}
            </p>
          </div>

          <Separator />

          <div>
            <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground mb-6 md:mb-8">关于我 / ABOUT</h2>
            <p className="text-base md:text-lg leading-relaxed text-foreground/90">
              {creatorInfo.detailedBio}
            </p>
          </div>

          <Separator />

          <div>
            <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground mb-6 md:mb-8">专业技能 / SKILLS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {creatorInfo.skills.map((skill, index) => (
                <Card key={index} className="border-border bg-transparent">
                  <CardContent className="p-4 md:p-6 flex items-center">
                    <Badge variant="outline" className="mr-4 text-primary border-primary/30 font-bold">
                      {String(index + 1).padStart(2, '0')}
                    </Badge>
                    <span className="font-medium text-foreground text-sm md:text-base">{skill}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground mb-6 md:mb-8">兴趣爱好 / HOBBIES</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {creatorInfo.hobbies?.map((hobby, index) => (
                <div key={index} className="flex flex-col gap-4">
                  <div className="aspect-video overflow-hidden border border-border">
                    <img src={hobby.image} alt={hobby.title} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">{hobby.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{hobby.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div className="bg-muted/30 p-6 md:p-12 border border-border">
            <h3 className="text-xl md:text-2xl font-bold mb-4">技术哲学</h3>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              我始终认为，代码不仅是逻辑的堆砌，更是解决现实问题的艺术。在 Java 开发的五年里，我坚持编写“会说话的代码”，追求极致的性能与系统的健壮性。同时，生活中的美食探索与 DIY 创作，让我学会在严谨与感性之间寻找平衡，这种平衡也反哺了我的技术直觉。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import { creatorInfo } from "../data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-6 md:px-12 py-12 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left Column - Image */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <div className="aspect-[3/4] overflow-hidden bg-muted border border-border">
            <img
              src={creatorInfo.avatar}
              alt={creatorInfo.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex flex-col gap-4">
            <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-muted-foreground">联系方式 / CONTACT</h2>
            <div className="flex flex-col gap-3">
              <a href={`mailto:${creatorInfo.contact.email}`} className="text-foreground hover:text-primary transition-colors font-medium">
                {creatorInfo.contact.email}
              </a>
              <div className="flex gap-4 mt-2">
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
        <div className="lg:col-span-7 flex flex-col gap-12">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">{creatorInfo.name}</h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-medium tracking-tight">
              {creatorInfo.bio}
            </p>
          </div>

          <Separator />

          <div>
            <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-muted-foreground mb-8">关于我 / ABOUT</h2>
            <p className="text-lg leading-relaxed text-foreground/90">
              {creatorInfo.detailedBio}
            </p>
          </div>

          <Separator />

          <div>
            <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-muted-foreground mb-8">专业技能 / SKILLS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {creatorInfo.skills.map((skill, index) => (
                <Card key={index} className="border-border bg-transparent">
                  <CardContent className="p-6 flex items-center">
                    <Badge variant="outline" className="mr-4 text-primary border-primary/30 font-bold">
                      {String(index + 1).padStart(2, '0')}
                    </Badge>
                    <span className="font-medium text-foreground">{skill}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Separator />

          <div className="bg-muted/30 p-8 md:p-12 border border-border">
            <h3 className="text-2xl font-bold mb-4">合作理念</h3>
            <p className="text-muted-foreground leading-relaxed">
              我相信优秀的作品源于深度的沟通与信任。在每一次合作中，我都会全身心投入，从理解需求到最终交付，确保每一个细节都符合预期。如果您正在寻找一位能够将想法转化为现实的创作者，我期待与您携手共创。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

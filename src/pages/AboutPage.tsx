import { creatorInfo } from "../data/my_info";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect, useRef } from "react";

function useScrollAnimation(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return { ref, isVisible };
}

export default function AboutPage() {
  const titleAnimation = useScrollAnimation(0.1);
  const avatarAnimation = useScrollAnimation(0.1);
  const aboutAnimation = useScrollAnimation(0.1);
  const skillsAnimation = useScrollAnimation(0.1);
  const interestsAnimation = useScrollAnimation(0.1);
  const achievementsAnimation = useScrollAnimation(0.1);

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-12 pt-[72px] pb-20 md:pb-20 max-w-6xl">
      {/* 页面标题 - 桌面端显示 */}
      <div
        ref={titleAnimation.ref}
        className={`mb-8 md:mb-12 hidden sm:block transition-all duration-700 ease-out ${titleAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
      >
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tighter text-center">关于我</h1>
        {/* <Separator className="mt-4 md:mt-6" /> */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16">
        {/* Left Column - Avatar */}
        <div className="lg:col-span-4 flex flex-col items-center lg:items-start gap-6 lg:gap-8 self-start">
          <div
            ref={avatarAnimation.ref}
            className={`w-28 h-28 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg transition-all duration-700 ease-out ${avatarAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            style={{ transitionDelay: '100ms' }}
          >
            <img
              src={creatorInfo.avatar}
              alt={creatorInfo.name}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>

          <div className="text-center lg:text-left">
            <h2 className="text-lg font-bold mb-1">{creatorInfo.name}</h2>
            <p className="text-sm text-muted-foreground mb-4">{creatorInfo.nickname}</p>

            {/* 联系方式 - 桌面端气泡显示 */}
            <div className="hidden lg:flex flex-col gap-3 w-full">
              <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground">联系方式 / CONTACT</h3>
              <div className="flex flex-col gap-2">
                <a href={`mailto:${creatorInfo.contact.email}`} className="text-sm text-primary hover:text-primary transition-colors font-medium px-4 py-2 bg-primary/10 rounded-full hover:bg-primary/20 w-fit">
                  {creatorInfo.contact.email}
                </a>
                <div className="flex flex-wrap gap-2 mt-2 justify-start">
                  {creatorInfo.contact.socialLinks.map((link) => (
                    <a
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:text-primary transition-colors font-medium px-4 py-2 bg-primary/10 rounded-full hover:bg-primary/20"
                    >
                      {link.platform}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* 手机端联系方式 - 气泡形式 */}
            <div className="flex lg:hidden flex-wrap gap-2 justify-center">
              <a href={`mailto:${creatorInfo.contact.email}`} className="text-xs text-primary hover:text-primary transition-colors font-medium px-4 py-2 bg-primary/10 rounded-full hover:bg-primary/20">
                邮箱
              </a>
              {creatorInfo.contact.socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:text-primary transition-colors font-medium px-4 py-2 bg-primary/10 rounded-full hover:bg-primary/20"
                >
                  {link.platform}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Content */}
        <div className="lg:col-span-8 flex flex-col gap-8 md:gap-12">
          {/* 关于我 */}
          <div
            ref={aboutAnimation.ref}
            className={`transition-all duration-700 ease-out ${aboutAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            style={{ transitionDelay: '200ms' }}
          >
            <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground mb-3 md:mb-4">关于我 / ABOUT</h2>
            <p className="text-sm sm:text-base md:text-lg leading-relaxed text-foreground/90">
              {creatorInfo.detailedBio}
            </p>
          </div>

          {/* 专业技能 */}
          <div
            ref={skillsAnimation.ref}
            className={`transition-all duration-700 ease-out ${skillsAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            style={{ transitionDelay: '300ms' }}
          >
            <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground mb-4 md:mb-6">专业技能 / SKILLS</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {creatorInfo.skills.map((skill, index) => (
                <div
                  key={index}
                  className="p-3 sm:p-4 bg-muted/20 border border-border rounded-lg hover:bg-muted/40 hover:border-primary/30 transition-all duration-300 cursor-pointer group"
                >
                  <span className="text-xs sm:text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 爱好/日常 */}
          <div
            ref={interestsAnimation.ref}
            className={`transition-all duration-700 ease-out ${interestsAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            style={{ transitionDelay: '400ms' }}
          >
            <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground mb-4 md:mb-6">爱好与日常 / INTERESTS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="p-4 sm:p-6 bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-lg">
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <span className="text-xl sm:text-2xl">🎨</span>
                  <h3 className="font-bold text-base sm:text-lg">AIGC 创作</h3>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  最近在用 Stable Diffusion 生成概念设计，探索AI艺术创作的无限可能。
                </p>
              </div>

              <div className="p-4 sm:p-6 bg-gradient-to-br from-orange-500/5 to-orange-500/10 border border-orange-500/20 rounded-lg">
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <span className="text-xl sm:text-2xl">🍜</span>
                  <h3 className="font-bold text-base sm:text-lg">美食探索</h3>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  周末尝试了新的红烧肉配方，追求代码与美食的完美平衡。
                </p>
              </div>
            </div>
          </div>

          {/* 成就摘要 */}
          <div
            ref={achievementsAnimation.ref}
            className={`transition-all duration-700 ease-out ${achievementsAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            style={{ transitionDelay: '500ms' }}
          >
            <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground mb-4 md:mb-6">成就摘要 / ACHIEVEMENTS</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="p-4 sm:p-6 text-center bg-muted/20 border border-border rounded-lg">
                <div className="text-xl sm:text-2xl font-bold text-primary mb-1 sm:mb-2">5+</div>
                <div className="text-xs text-muted-foreground">年开发经验</div>
              </div>
              <div className="p-4 sm:p-6 text-center bg-muted/20 border border-border rounded-lg">
                <div className="text-xl sm:text-2xl font-bold text-primary mb-1 sm:mb-2">10+</div>
                <div className="text-xs text-muted-foreground">项目交付</div>
              </div>
              {/* <div className="p-4 sm:p-6 text-center bg-muted/20 border border-border rounded-lg">
                <a  href="https://blog.xinxinnote.tech" 
                    target="_blank"
                    rel="noopener noreferrer">
                  <div className="text-xl sm:text-2xl font-bold text-primary mb-1 sm:mb-2">100+</div>
                  <div className="text-xs text-muted-foreground">原创技术文章</div>
                </a>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

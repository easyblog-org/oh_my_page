import { ArrowRight, ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { creatorInfo, projects } from "../data/my_info";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect, useRef } from "react";

export default function HomePage() {
  const featuredProjects = projects.slice(0, 6);
  const [displayedText, setDisplayedText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [showIntro, setShowIntro] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [showProjects, setShowProjects] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);

  const texts = [
    `你好，我是 ${creatorInfo.nickname}`,
    '专业全栈开发',
    "能够帮您把想法变成可靠系统",
    "欢迎沟通！"
  ];

  useEffect(() => {
    const currentFull = texts[currentTextIndex];
    let startTime: number;
    const duration = 1500; // 每个句子打字总耗时(ms)，可调节

    const animate = (now: number) => {
      if (!startTime) startTime = now;
      const elapsed = now - startTime;
      let progress = Math.min(1, elapsed / duration);
      // 缓动函数: easeInCubic (开始慢 → 后面快)
      const eased = progress ** 3;
      const charCount = Math.floor(eased * currentFull.length);
      const newDisplay = currentFull.slice(0, charCount);
      setDisplayedText(newDisplay);

      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        // 打字完成，等待1.5秒后切换下一句
        setTimeout(() => {
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
          setDisplayedText(''); // 清空，下一句重新开始
        }, 1500);
      }
    };

    // 延迟300ms开始（可调整）
    const timer = setTimeout(() => {
      animRef.current = requestAnimationFrame(animate);
    }, 300);

    return () => {
      clearTimeout(timer);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [currentTextIndex]);

  useEffect(() => {
    setShowIntro(true);
    setShowButtons(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShowProjects(true);
        }
      },
      { threshold: 0.1 }
    );

    if (projectsRef.current) {
      observer.observe(projectsRef.current);
    }

    return () => {
      if (projectsRef.current) {
        observer.unobserve(projectsRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShowContact(true);
        }
      },
      { threshold: 0.1 }
    );

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => {
      if (contactRef.current) {
        observer.unobserve(contactRef.current);
      }
    };
  }, []);

  // 打字机渲染函数
  const renderTypedText = () => {
    if (currentTextIndex === 0) {
      const prefix = '你好，我是';
      if (displayedText.startsWith(prefix)) {
        const namePart = displayedText.slice(prefix.length);
        return (
          <>
            <span className="text-black">{prefix}</span>
            <span className="text-primary">{namePart}</span>
          </>
        );
      } else {
        return <span className="text-black">{displayedText}</span>;
      }
    } else {
      return <span className="text-black">{displayedText}</span>;
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="container mx-auto px-6 md:px-12 pt-0 pb-0 md:py-8 flex flex-col items-center text-center relative">
        {/* 代码装饰背景 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.15]">
          <pre className="text-[100px] md:text-[160px] font-mono leading-none absolute left-0 top-0 select-none text-violet-500">
            {'{ }'}
          </pre>
          <code className="text-[30px] md:text-[50px] font-mono absolute left-[20%] top-[10%] select-none text-indigo-400">
            class
          </code>
          <code className="text-[25px] md:text-[40px] font-mono absolute left-[8%] top-[35%] select-none text-purple-400">
            interface
          </code>
          <code className="text-[40px] md:text-[70px] font-mono absolute right-[5%] top-[5%] select-none text-emerald-400">
            @Autowired
          </code>
          <code className="text-[20px] md:text-[35px] font-mono absolute right-[15%] top-[25%] select-none text-green-400">
            import
          </code>
          <code className="text-[22px] md:text-[38px] font-mono absolute right-[8%] top-[40%] select-none text-teal-400">
            return
          </code>
          <code className="text-[35px] md:text-[55px] font-mono absolute left-[5%] bottom-[30%] select-none text-orange-400">
            void main()
          </code>
          <code className="text-[18px] md:text-[32px] font-mono absolute left-[15%] bottom-[15%] select-none text-amber-500">
            throws
          </code>
          <pre className="text-[80px] md:text-[130px] font-mono leading-none absolute right-0 bottom-[10%] select-none text-cyan-400">
            {'</>'}
          </pre>
          <code className="text-[45px] md:text-[75px] font-mono absolute right-[20%] bottom-[25%] select-none text-sky-400">
            =&gt;
          </code>
          <code className="text-[28px] md:text-[48px] font-mono absolute right-[5%] bottom-[40%] select-none text-cyan-500">
            extends
          </code>
          <code className="text-[50px] md:text-[85px] font-mono absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-yellow-400">
            []
          </code>
          <code className="text-[16px] md:text-[28px] font-mono absolute left-[45%] top-[70%] select-none text-orange-300">
            package
          </code>
          <code className="text-[24px] md:text-[42px] font-mono absolute left-[55%] bottom-[45%] select-none text-yellow-300">
            public
          </code>
          <code className="text-[20px] md:text-[35px] font-mono absolute left-[70%] bottom-[20%] select-none text-amber-400">
            private
          </code>
          <code className="text-[22px] md:text-[38px] font-mono absolute left-[35%] top-[20%] select-none text-lime-400">
            final
          </code>
          <code className="text-[18px] md:text-[32px] font-mono absolute left-[75%] top-[60%] select-none text-green-300">
            static
          </code>
        </div>

        {/* 头像 - 从上方划入 */}
        <div className="w-32 md:w-48 mb-8 relative z-10 animate-slide-down">
          <div className="relative">
            <div className="absolute -inset-4 bg-primary/10 rounded-full blur-xl" />
            <img
              src={creatorInfo.avatar}
              alt={creatorInfo.name}
              className="relative z-10 w-full h-auto rounded-full border-4 border-white shadow-lg"
              loading="lazy"
              decoding="async"
              width="128"
              height="128"
            />
          </div>
        </div>

        {/* 自我介绍信息 */}
        <div className="max-w-2xl relative z-10 mb-6">
          <h1 className="text-3xl md:text-6xl font-bold tracking-tighter leading-[1.2] mb-6 whitespace-nowrap w-[320px] md:w-[560px] text-center font-mono h-14 md:h-20 flex items-center justify-center">
            {renderTypedText()}
          </h1>

          {/* 个人介绍 - 从下方划入 */}
          <h2 className={`text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-loose mb-12 md:mb-12 transition-all duration-500 ease-out ${showIntro ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            深耕全栈架构与系统设计 5 年，同时热衷探索 AI 提效与变现。相信好的代码和好的生成结果一样，细节决定质感。追求逻辑的严谨与技术的温度，平衡代码的确定性与 AI 的可能性，在技术浪潮里走自己的路。
          </h2>

          {/* 按钮组 - 从下方划入 */}
          <div className={`flex flex-row gap-3 justify-center w-full transition-all duration-500 ease-out ${showButtons ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <Button size="sm" variant="outline" className="w-1/2 px-4 py-6 text-sm font-medium group" onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}>
              联系我
            </Button>
            <Button size="sm" className="w-1/2 px-4 py-6 text-sm font-medium group" onClick={() => {
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}>
              查看作品
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* 滚动提示 - 底部半隐藏式 */}
      {showScrollIndicator && (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 translate-y-[-50%] flex flex-col items-center pointer-events-none">
          <p className="text-xs text-muted-foreground mb-1 hidden md:block text-center">滑动</p>
          <div className="animate-bounce">
            <ArrowDown className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>
      )}

      {/* Featured Projects */}
      <section id="projects" className="bg-muted/30 py-20 md:py-16">
        <div className="container mx-auto px-6 md:px-12" ref={projectsRef}>
          <div className={`flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6 transition-all duration-500 ease-out ${showProjects ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-50'}`}>
            <div>
              <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-muted-foreground mb-4">作品锦集 / FEATURED</h2>
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight">作品展示</h3>
            </div>
            <Link to="/projects" className="hidden md:flex items-center text-sm font-bold tracking-widest uppercase hover:text-primary transition-colors group">
              全部作品
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
            {featuredProjects.map((project, index) => (
              <Link key={project.id} to={`/projects/${project.id}`} className={`group transition-all duration-700 ease-out ${showProjects ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${index * 0.1}s` }}>
                <Card className="gallery-card overflow-hidden bg-transparent">
                  <div className="aspect-[4/5] overflow-hidden relative">
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <CardContent className="pt-6 px-3 pb-4">
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

          <div className={`mt-12 text-center md:hidden transition-all duration-700 ease-out ${showProjects ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Button asChild variant="outline" size="lg" className="w-full">
              <Link to="/projects">查看全部作品</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section id="contact" className="container mx-auto px-8 md:px-14 py-20 md:py-20 text-center">
        <div ref={contactRef}>
          <h2 className={`text-3xl md:text-4xl font-bold tracking-tight mb-6 transition-all duration-700 ease-out ${showContact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-0'}`}>联系我</h2>
          <p className={`text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-16 leading-relaxed transition-all duration-500 ease-out ${showContact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-50'}`} style={{ transitionDelay: '0.1s' }}>
            我始终对具有挑战性的项目与有趣的创意充满期待。如果您有任何想法或合作意向，欢迎随时联系我。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* 邮箱联系 */}
            <div className={`bg-white rounded-lg p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 hover:cursor-pointer transition-cursor duration-300 transition-all duration-700 ease-out ${showContact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.2s' }}>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">邮箱联系</h3>
              <p className="text-muted-foreground">{creatorInfo.contact.email}</p>
            </div>

            {/* 微信咨询 */}
            <div className={`bg-white rounded-lg p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 hover:cursor-pointer transition-cursor duration-300 transition-all duration-700 ease-out ${showContact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.3s' }}>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="22353" width="24" height="24"><path d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z" fill="#28C445" p-id="22354"></path><path d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z" fill="#28C445" p-id="22355"></path></svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">微信咨询</h3>
              <p className="text-muted-foreground">WeChat: {creatorInfo.contact.wechat}</p>
            </div>

            {/* 电话咨询 */}
            <div className={`bg-white rounded-lg p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 hover:cursor-pointer transition-cursor duration-300 transition-all duration-700 ease-out ${showContact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.4s' }}>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">电话咨询</h3>
              <p className="text-muted-foreground">{creatorInfo.contact.phone}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
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
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showIntro, setShowIntro] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const texts = [
    `你好，我是${creatorInfo.name}`,
    '一名经验丰富的独立开发者'
  ];

  useEffect(() => {
    const typeText = () => {
      const currentText = texts[currentTextIndex];

      if (currentCharIndex <= currentText.length) {
        setDisplayedText(currentText.slice(0, currentCharIndex));
        setCurrentCharIndex(prev => prev + 1);
        const randomSpeed = Math.random() * 30 + 10;
        timeoutRef.current = setTimeout(typeText, randomSpeed);
      } else {
        timeoutRef.current = setTimeout(() => {
          setCurrentTextIndex(prev => (prev + 1) % texts.length);
          setCurrentCharIndex(0);
        }, 1000);
      }
    };

    const timer = setTimeout(() => {
      typeText();
    }, 300);

    return () => {
      clearTimeout(timer);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentTextIndex, currentCharIndex]);

  useEffect(() => {
    setShowIntro(true);
    setShowButtons(true);
  }, []);

  const renderTypedText = () => {
    const currentText = texts[currentTextIndex];
    const prefix = '你好，我是';
    const name = creatorInfo.name;

    if (currentTextIndex === 0) {
      if (currentCharIndex <= prefix.length) {
        return <span className="text-black">{prefix.slice(0, currentCharIndex)}</span>;
      } else {
        const nameCharsTyped = currentCharIndex - prefix.length;
        const typedName = name.slice(0, Math.max(0, nameCharsTyped));
        return (
          <>
            <span className="text-black">{prefix}</span>
            <span className="text-primary">{typedName}</span>
          </>
        );
      }
    } else {
      return <span className="text-black">{displayedText}</span>;
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="container mx-auto px-6 md:px-12 py-4 md:py-4 flex flex-col items-center text-center relative">
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
            />
          </div>
        </div>

        {/* 自我介绍信息 */}
        <div className="max-w-2xl relative z-10 mb-10">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[1.2] mb-6 whitespace-nowrap w-[320px] md:w-[560px] text-center font-mono h-14 md:h-20 flex items-center justify-center">
            {renderTypedText()}
          </h1>

          {/* 个人介绍 - 从下方划入 */}
          <h2 className={`text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-loose mb-20 transition-all duration-500 ease-out ${showIntro ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            深耕后端架构与系统设计 5 年，同时热衷探索 AI 提效与变现。相信好的代码和好的生成结果一样，细节决定质感。追求逻辑的严谨与技术的温度，平衡代码的严谨与 AI 的创造力，在技术浪潮里走自己的路。
          </h2>

          {/* 按钮组 - 从下方划入 */}
          <div className={`flex flex-col sm:flex-row gap-5 justify-center w-full transition-all duration-500 ease-out ${showButtons ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto px-10 py-6 text-lg font-medium group">
              <Link to="/contact">
                联系我
              </Link>
            </Button>
            <Button size="lg" className="w-full sm:w-auto px-10 py-6 text-lg font-medium group" onClick={() => {
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}>
              查看作品
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* 滚动提示 - 底部半隐藏式 */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 translate-y-[-50%] flex flex-col items-center pointer-events-none">
        <p className="text-xs text-muted-foreground mb-1">Scroll</p>
        <div className="animate-bounce">
          <ArrowDown className="w-5 h-5 text-muted-foreground" />
        </div>
      </div>

      {/* Featured Projects */}
      <section id="projects" className="bg-muted/30 py-20 md:py-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-muted-foreground mb-4">精选作品 / FEATURED</h2>
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight">近期创作精选</h3>
            </div>
            <Link to="/projects" className="hidden md:flex items-center text-sm font-bold tracking-widest uppercase hover:text-primary transition-colors group">
              全部作品
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
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
      <section className="container mx-auto px-6 md:px-12 py-20 md:py-40 text-center">
        <h2 className="text-2xl md:text-5xl font-bold tracking-tight mb-8">
          对合作感兴趣？
        </h2>
        <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
          我始终对具有挑战性的项目与有趣的创意充满期待。如果您有任何想法或合作意向，欢迎随时联系我。
        </p>
        <Button asChild size="lg" variant="secondary" className="w-full md:w-auto px-10 py-8 text-lg font-bold">
          <Link to="/contact">开启对话</Link>
        </Button>
      </section>
    </div>
  );
}
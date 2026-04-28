import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { creatorInfo } from "@/data/my_info";
import { heroTexts, codeKeywords, featuredProjects } from "@/data/home";
import { HeroAnimationSlot, getHeroAnimation } from "@/components/hero-animation";
import { TypingText } from "@/components/TypingText";
import { ProjectCard } from "@/components/ProjectCard";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      className="ml-2 text-xs text-[#60a5fa] hover:text-[#3b82f6] transition-colors duration-200 bg-transparent border-none cursor-pointer"
    >
      {copied ? "已复制" : "复制"}
    </button>
  );
}

export default function HomePage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const [heroVisible, setHeroVisible] = useState(false);
  const [projectsVisible, setProjectsVisible] = useState(false);
  const [aboutVisible, setAboutVisible] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const projectsRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHeroVisible(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollIndicator(window.scrollY <= 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const heroEl = heroRef.current;
    if (!heroEl) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = heroEl.getBoundingClientRect();
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    heroEl.addEventListener("mousemove", handleMouseMove);
    return () => heroEl.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const refs = [
      { ref: projectsRef, setter: setProjectsVisible },
      { ref: aboutRef, setter: setAboutVisible },
      { ref: contactRef, setter: setContactVisible },
    ];

    refs.forEach(({ ref, setter }) => {
      if (ref.current) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setter(true);
            }
          },
          { threshold: 0.1 }
        );
        observer.observe(ref.current);
        observers.push(observer);
      }
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section
        id="home"
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ scrollMarginTop: "72px" }}
      >
        {/* Background: code keywords */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
          {codeKeywords.map((keyword, i) => (
            <span
              key={i}
              className="absolute font-mono text-xs text-[#1e293b]"
              style={{
                opacity: 0.15,
                left: `${(i * 17 + 5) % 90}%`,
                top: `${(i * 23 + 10) % 85}%`,
                fontSize: "12px",
              }}
            >
              {keyword}
            </span>
          ))}
        </div>

        {/* Background: grid lines */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(59,130,246,0.05) 0px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, rgba(59,130,246,0.05) 0px, transparent 1px, transparent 60px)",
          }}
        />

        {/* Background: glow effects */}
        <div className="absolute pointer-events-none" style={{ left: "-5%", top: "10%", width: 300, height: 300, background: "radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)", borderRadius: "50%" }} />
        <div className="absolute pointer-events-none" style={{ right: "-5%", bottom: "10%", width: 300, height: 300, background: "radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)", borderRadius: "50%" }} />

        {/* Cursor follow glow (desktop only) */}
        <div
          className="hidden md:block absolute pointer-events-none"
          style={{
            left: mousePos.x - 80,
            top: mousePos.y - 80,
            width: 160,
            height: 160,
            background: "radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)",
            borderRadius: "50%",
            transition: "left 0.1s ease-out, top 0.1s ease-out",
          }}
        />

        {/* Hero Content */}
        <div className="relative z-10 max-w-[1200px] mx-auto px-5 w-full pt-[72px]">
          <div className="flex flex-col md:flex-row items-center md:items-center gap-12 md:gap-0">
            {/* Left Content */}
            <div className="md:w-1/2 flex flex-col items-start">
              <span
                className={`font-mono text-sm text-[#60a5fa] tracking-[2px] mb-4 transition-all duration-600 ease-out ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              >
                @Autowired
              </span>

              <TypingText
                texts={heroTexts}
                nickname={creatorInfo.nickname}
                highlightNickname={true}
                repeatCount={2}
                resetOnHover={true}
                hoverContainerRef={heroRef}
                className={`text-[36px] md:text-[56px] lg:text-[72px] font-bold text-white leading-[1.2] mb-6 transition-all duration-600 ease-out ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              />

              <p
                className={`text-base md:text-lg text-[#cbd5e1] leading-[1.6] max-w-[560px] mb-8 transition-all duration-600 ease-out ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: "0.2s" }}
              >
                深耕全栈架构与系统设计5年，同时热衷探索AI提效与变现。相信好的代码和好的生成结果一样，细节决定质感。追求逻辑的严谨与技术的温度，平衡代码的确定性与AI的可能性，在技术浪潮里走自己的路。
              </p>

              <div
                className={`flex flex-col md:flex-row gap-5 w-full md:w-auto transition-all duration-600 ease-out ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: "0.3s" }}
              >
                <button
                  onClick={scrollToContact}
                  className="bg-[#3b82f6] text-white px-8 py-3 rounded-lg hover:bg-[#2563eb] transition-all duration-200 ease-out hover:scale-[1.02] border-none cursor-pointer text-base"
                >
                  联系我
                </button>
                <button
                  onClick={scrollToProjects}
                  className="bg-transparent border-2 border-[#3b82f6] text-[#3b82f6] px-8 py-3 rounded-lg hover:bg-[rgba(59,130,246,0.1)] transition-all duration-200 ease-out cursor-pointer text-base"
                >
                  查看作品
                </button>
              </div>
            </div>

            {/* Right: Hero Animation */}
            <div className="md:w-1/2 flex justify-center items-center">
              <HeroAnimationSlot
                animation={getHeroAnimation("torus-knot")!.component}
                width={400}
                height={400}
              />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        {showScrollIndicator && (
          <button
            onClick={scrollToProjects}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-[#94a3b8] bg-transparent border-none cursor-pointer animate-bounce"
            aria-label="滚动到作品区块"
          >
            <span className="text-sm mb-1">↓</span>
          </button>
        )}
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        ref={projectsRef}
        className="py-20 md:py-28"
        style={{ scrollMarginTop: "72px" }}
      >
        <div className="max-w-[1200px] mx-auto px-5">
          <div
            className={`text-center mb-12 transition-all duration-600 ease-out ${projectsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-3">精选项目</h2>
            <div className="w-[60px] h-[2px] bg-[#3b82f6] mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                visible={projectsVisible}
              />
            ))}
          </div>

          <div className="flex justify-end mt-8">
            <Link
              to="/projects"
              className="text-sm text-[#3b82f6] hover:underline"
            >
              查看全部 →
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        ref={aboutRef}
        className="py-20 md:py-28"
        style={{ scrollMarginTop: "72px" }}
      >
        <div className="max-w-[1200px] mx-auto px-5">
          <div
            className={`text-center mb-12 transition-all duration-600 ease-out ${aboutVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-3">关于我</h2>
            <div className="w-[60px] h-[2px] bg-[#3b82f6] mx-auto" />
          </div>

          <div
            className={`max-w-[800px] mx-auto transition-all duration-600 ease-out ${aboutVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "0.1s" }}
          >
            <div className="bg-[rgba(15,23,42,0.6)] backdrop-blur-[4px] border border-[rgba(59,130,246,0.2)] rounded-2xl p-8 md:p-10">
              <p className="text-base md:text-lg text-[#cbd5e1] leading-[1.8] mb-6">
                {creatorInfo.detailedBio}
              </p>

              <div className="flex flex-wrap gap-3 mb-6">
                {creatorInfo.skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-[#1e293b] text-[#60a5fa] px-3 py-1.5 text-sm rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <p className="text-sm text-[#94a3b8] italic">
                热爱技术，也热爱生活。追求代码的整洁与生活的质感，相信平衡的艺术能激发无限的想象力。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        ref={contactRef}
        className="py-20 md:py-28"
        style={{ scrollMarginTop: "72px" }}
      >
        <div className="max-w-[1200px] mx-auto px-5">
          <div
            className={`text-center mb-12 transition-all duration-600 ease-out ${contactVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-3">联系我</h2>
            <div className="w-[60px] h-[2px] bg-[#3b82f6] mx-auto" />
          </div>

          <div
            className={`flex flex-col md:flex-row gap-12 md:gap-16 max-w-[1000px] mx-auto transition-all duration-600 ease-out ${contactVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "0.1s" }}
          >
            {/* Left: Contact Info */}
            <div className="md:w-[45%]">
              <p className="text-base md:text-lg text-[#cbd5e1] leading-[1.6] mb-8">
                我始终对具有挑战性的项目与有趣的创意充满期待。如果您有任何想法或合作意向，欢迎随时联系我。
              </p>

              <div className="flex flex-col gap-6 mb-8">
                <div className="flex items-center">
                  <span className="text-xl mr-3">📧</span>
                  <span className="text-[#cbd5e1]">{creatorInfo.contact.email}</span>
                  <CopyButton text={creatorInfo.contact.email} />
                </div>

                <div>
                  <div className="flex items-center">
                    <span className="text-xl mr-3">💬</span>
                    <span className="text-[#cbd5e1]">{creatorInfo.contact.wechat}</span>
                  </div>
                  <p className="text-xs text-[#64748b] ml-9 mt-1">添加好友请备注"合作"</p>
                </div>

                <div className="flex items-center">
                  <span className="text-xl mr-3">📞</span>
                  <span className="text-[#cbd5e1]">{creatorInfo.contact.phone}</span>
                </div>
              </div>

              <div className="flex gap-4">
                {creatorInfo.contact.socialLinks.map((link) => {
                  let label = link.platform;
                  return (
                    <a
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#94a3b8] hover:text-[#3b82f6] transition-colors duration-200"
                    >
                      {label}
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="md:w-[45%]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("演示模式：您的消息已发送，我会尽快回复。");
                }}
                className="flex flex-col gap-5"
              >
                <div>
                  <input
                    type="text"
                    placeholder="你的姓名"
                    className="w-full bg-[#1e293b] border border-[#334155] rounded-lg px-4 py-3 text-white placeholder-[#64748b] focus:border-[#3b82f6] focus:outline-none transition-colors duration-200"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    className="w-full bg-[#1e293b] border border-[#334155] rounded-lg px-4 py-3 text-white placeholder-[#64748b] focus:border-[#3b82f6] focus:outline-none transition-colors duration-200"
                  />
                </div>

                <div>
                  <textarea
                    required
                    rows={4}
                    placeholder="请详细描述您的需求..."
                    className="w-full bg-[#1e293b] border border-[#334155] rounded-lg px-4 py-3 text-white placeholder-[#64748b] focus:border-[#3b82f6] focus:outline-none transition-colors duration-200 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#3b82f6] text-white px-6 py-3 rounded-lg hover:bg-[#2563eb] transition-colors duration-200 border-none cursor-pointer text-base"
                >
                  发送消息
                </button>

                <p className="text-xs text-[#64748b]">我会在 24 小时内回复。</p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

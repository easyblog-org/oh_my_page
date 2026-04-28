import { useState, useEffect, useCallback } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { creatorInfo } from "@/data/my_info";
import { navItems } from "@/data/navigation";

function SocialIcons({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <>
      {creatorInfo.contact.socialLinks.map((link) => {
        let IconComponent: React.ReactNode;
        switch (link.platform.toLowerCase()) {
          case "github":
            IconComponent = (
              <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
                <path
                  d="M512 42.666667A464.64 464.64 0 0 0 42.666667 502.186667 460.373333 460.373333 0 0 0 363.52 938.666667c23.466667 4.266667 32-9.813333 32-22.186667v-78.08c-130.56 27.733333-158.293333-61.44-158.293333-61.44a122.026667 122.026667 0 0 0-52.053334-67.413333c-42.666667-28.16 3.413333-27.733333 3.413334-27.733334a98.56 98.56 0 0 1 71.68 47.36 101.12 101.12 0 0 0 136.533333 37.973334 99.413333 99.413333 0 0 1 29.866667-61.44c-104.106667-11.52-213.333333-50.773333-213.333334-226.986667a177.066667 177.066667 0 0 1 47.36-124.16 161.28 161.28 0 0 1 4.693334-121.173333s39.68-12.373333 128 46.933333a455.68 455.68 0 0 1 234.666666 0c89.6-59.306667 128-46.933333 128-46.933333a161.28 161.28 0 0 1 4.693334 121.173333A177.066667 177.066667 0 0 1 810.666667 477.866667c0 176.64-110.08 215.466667-213.333334 226.986666a106.666667 106.666667 0 0 1 32 85.333334v125.866666c0 14.933333 8.533333 26.88 32 22.186667A460.8 460.8 0 0 0 981.333333 502.186667 464.64 464.64 0 0 0 512 42.666667"
                  fill="currentColor"
                />
              </svg>
            );
            break;
          case "头条号":
            IconComponent = (
              <svg viewBox="0 0 1049 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6318" width={size} height={size}>
                <path 
                 d="M1024 468.48c0-5.12 0-10.24-2.56-15.36 0-10.24-2.56-20.48-5.12-30.72 0-7.68-2.56-12.8-5.12-17.92-2.56-7.68-2.56-15.36-5.12-23.04-2.56-7.68-5.12-15.36-7.68-25.6 0-2.56 0-2.56-2.56-5.12-25.6-74.24-66.56-138.24-117.76-192C785.92 69.12 660.48 12.8 522.24 12.8S261.12 71.68 168.96 161.28C138.24 194.56 110.08 230.4 87.04 271.36c0 2.56-2.56 2.56-2.56 5.12s-2.56 2.56-2.56 5.12C51.2 335.36 33.28 396.8 25.6 463.36v7.68c-2.56 15.36-2.56 30.72-2.56 46.08 0 15.36 0 30.72 2.56 48.64 0 5.12 0 10.24 2.56 15.36 0 10.24 2.56 20.48 5.12 30.72 0 7.68 2.56 12.8 5.12 17.92 2.56 7.68 2.56 15.36 5.12 23.04 2.56 7.68 5.12 15.36 7.68 25.6 0 2.56 0 2.56 2.56 5.12 25.6 74.24 66.56 138.24 117.76 192 92.16 89.6 215.04 145.92 355.84 145.92s266.24-56.32 355.84-145.92c30.72-33.28 58.88-69.12 81.92-110.08 0-2.56 2.56-2.56 2.56-5.12s2.56-2.56 2.56-5.12c30.72-53.76 48.64-115.2 56.32-181.76v-7.68c2.56-15.36 2.56-30.72 2.56-46.08-2.56-17.92-2.56-33.28-5.12-51.2zM181.76 174.08c89.6-87.04 207.36-140.8 343.04-140.8s256 53.76 343.04 140.8c12.8 15.36 25.6 28.16 38.4 46.08l-796.16 51.2C130.56 235.52 153.6 202.24 181.76 174.08z m445.44 419.84h-7.68c-12.8 0-25.6 0-40.96 2.56-12.8 0-25.6 2.56-38.4 2.56h-5.12v-40.96c5.12 0 10.24-2.56 17.92-2.56 20.48 0 43.52-2.56 64-2.56 15.36 0 33.28-2.56 51.2-2.56v-20.48c23.04-2.56 43.52-2.56 66.56-5.12v20.48c10.24 0 17.92 0 25.6-2.56h7.68c20.48 0 40.96-2.56 64-2.56 12.8 0 23.04-2.56 35.84-2.56v43.52h-12.8c-20.48 0-43.52 2.56-64 2.56-15.36 0-30.72 2.56-46.08 2.56-5.12 0-10.24 0-15.36 2.56v92.16l-64 2.56v-92.16c-12.8 0-25.6 2.56-38.4 2.56z m174.08-120.32c10.24 2.56 20.48 7.68 30.72 10.24 5.12 2.56 12.8 0 17.92 0s10.24 0 15.36-2.56v43.52c-5.12 0-10.24 0-17.92 2.56-5.12 0-10.24 0-15.36 2.56-15.36 2.56-25.6-5.12-38.4-10.24-25.6-7.68-51.2-17.92-74.24-28.16-12.8-5.12-23.04-2.56-33.28 2.56-30.72 15.36-64 30.72-97.28 48.64-2.56 2.56-5.12 2.56-7.68 2.56h-38.4v-40.96h23.04c2.56 0 7.68 0 10.24-2.56 23.04-12.8 46.08-23.04 71.68-35.84-15.36-5.12-28.16-10.24-43.52-15.36l15.36-23.04c0-2.56 2.56-2.56 2.56-5.12 7.68-12.8 7.68-12.8 23.04-7.68 17.92 7.68 35.84 15.36 56.32 20.48h7.68c28.16-12.8 56.32-28.16 84.48-40.96 5.12-2.56 7.68-5.12 5.12-12.8-10.24 0-20.48 0-33.28 2.56h-7.68c-20.48 0-40.96 2.56-61.44 2.56-15.36 0-30.72 2.56-46.08 2.56-7.68 0-15.36 0-23.04 2.56-2.56 0-2.56 2.56-5.12 2.56-10.24 15.36-17.92 28.16-28.16 43.52-2.56 5.12-5.12 7.68-12.8 5.12-12.8-5.12-28.16-10.24-43.52-15.36-5.12-2.56-7.68-2.56-5.12-7.68 20.48-30.72 40.96-64 61.44-94.72 0-2.56 2.56-2.56 2.56-2.56 15.36 7.68 33.28 15.36 48.64 23.04 2.56 2.56 7.68 0 10.24 0h7.68c20.48 0 43.52-2.56 64-2.56 15.36 0 28.16-2.56 43.52-2.56 25.6-2.56 48.64-2.56 74.24-5.12 5.12 0 10.24 0 15.36-2.56v64c0 7.68-2.56 12.8-10.24 15.36-23.04 12.8-48.64 23.04-71.68 35.84-7.68 2.56-12.8 5.12-20.48 10.24 15.36 5.12 28.16 10.24 43.52 15.36z m-158.72 128c-5.12 10.24-7.68 15.36-10.24 23.04-10.24 20.48-20.48 38.4-30.72 58.88-2.56 5.12-5.12 5.12-7.68 5.12-17.92 0-33.28 2.56-51.2 2.56h-7.68c10.24-17.92 17.92-35.84 28.16-56.32 2.56-7.68 7.68-12.8 10.24-20.48 2.56-7.68 7.68-7.68 12.8-7.68 12.8 0 25.6 0 38.4-2.56 5.12 0 10.24 0 17.92-2.56z m135.68-7.68c15.36 0 30.72-2.56 48.64-2.56 5.12 0 7.68 2.56 7.68 5.12 15.36 23.04 28.16 46.08 43.52 71.68-5.12 2.56-5.12 2.56-5.12 5.12-7.68 0-12.8 2.56-17.92 2.56h-40.96c-2.56 0-5.12-2.56-5.12-5.12-15.36-23.04-28.16-48.64-43.52-74.24 5.12 0 7.68 0 12.8-2.56z m-616.96 10.24v-43.52c15.36-5.12 23.04-5.12 30.72-7.68 12.8 0 25.6 0 38.4-2.56 25.6 0 48.64-2.56 74.24-5.12 15.36 0 33.28-2.56 48.64-2.56V358.4l64-2.56v184.32c12.8 0 23.04-2.56 33.28-2.56 12.8 0 28.16-2.56 40.96-2.56l2.56 2.56v35.84c0 2.56-2.56 5.12-5.12 5.12-10.24 0-20.48 0-30.72 2.56-25.6 2.56-48.64 2.56-74.24 5.12-10.24 0-12.8 7.68-17.92 15.36-17.92 23.04-38.4 48.64-56.32 74.24l-23.04 30.72c0 2.56-2.56 2.56-5.12 2.56-12.8 0-23.04 0-35.84 2.56-25.6 2.56-51.2 2.56-76.8 5.12-2.56 0-5.12-2.56-5.12-5.12v-38.4c7.68 0 15.36-2.56 23.04-2.56 10.24 0 20.48-2.56 30.72 0 10.24 0 17.92-5.12 25.6-12.8l46.08-61.44-128 7.68zM209.92 460.8c12.8 0 28.16 0 40.96-2.56 10.24-2.56 17.92 2.56 23.04 12.8 15.36 17.92 28.16 35.84 43.52 53.76-2.56 0-5.12 2.56-7.68 2.56-17.92 0-33.28 0-51.2 2.56-10.24 0-15.36-2.56-23.04-10.24-12.8-17.92-28.16-35.84-40.96-53.76v-2.56c5.12 0 10.24 0 15.36-2.56z m-15.36-76.8c7.68 0 15.36-2.56 23.04-2.56 10.24 0 23.04 0 33.28-2.56 12.8-2.56 20.48 5.12 28.16 15.36 10.24 15.36 23.04 28.16 33.28 43.52 2.56 2.56 2.56 5.12 5.12 7.68-10.24 0-17.92 2.56-25.6 2.56-12.8 0-28.16 2.56-40.96 2.56-2.56 0-5.12 0-5.12-2.56-17.92-20.48-33.28-40.96-51.2-64z m186.88 212.48h35.84c7.68 0 15.36 0 25.6-2.56 7.68 0 12.8 2.56 15.36 10.24 15.36 28.16 30.72 58.88 46.08 89.6l-71.68 5.12-51.2-99.84v-2.56z m486.4 263.68c-89.6 87.04-207.36 140.8-343.04 140.8s-256-53.76-343.04-140.8c-12.8-12.8-25.6-28.16-38.4-46.08l798.72-51.2c-20.48 35.84-46.08 69.12-74.24 97.28z" 
                 fill="currentColor" p-id="6319"/>
              </svg>
            );
            break;
          case "公众号":
            IconComponent = (
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
                <path
                  d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-7.062-6.122zM14.033 13.33c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982z"
                  fill="currentColor"
                />
              </svg>
            );
            break;
          default:
            IconComponent = <span className="text-sm">{link.platform}</span>;
        }
        return (
          <a
            key={link.platform}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "text-[#94a3b8] hover:text-[#3b82f6] transition-colors duration-200",
              className
            )}
            aria-label={link.platform}
          >
            {IconComponent}
          </a>
        );
      })}
    </>
  );
}

export function MainLayout() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > 300);

      if (isHomePage) {
        const sections = ["contact", "about", "projects", "home"];
        for (const id of sections) {
          const el = document.getElementById(id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 120) {
              setActiveSection(id);
              break;
            }
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleNavClick = useCallback(
    (anchor: string) => {
      setMobileMenuOpen(false);
      if (isHomePage) {
        const el = document.getElementById(anchor);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else {
        navigate(`/#${anchor}`);
      }
    },
    [isHomePage, navigate]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (isHomePage && location.hash) {
      const anchor = location.hash.replace("#", "");
      setTimeout(() => {
        const el = document.getElementById(anchor);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, [location, isHomePage]);

  return (
    <div className="min-h-screen text-white flex flex-col">
      <header
        className={cn(
          "fixed top-0 left-0 w-full z-[1000] transition-all duration-200 ease-out",
          isScrolled
            ? "bg-[rgba(3,6,20,0.8)] backdrop-blur-[12px]"
            : "bg-transparent"
        )}
        style={{ height: "72px" }}
      >
        <div className="max-w-[1200px] mx-auto h-full flex justify-between items-center px-5">
          <button
            onClick={() => handleNavClick("home")}
            className="font-mono text-xl font-medium text-[#60a5fa] hover:text-[#3b82f6] transition-colors duration-200 no-underline"
          >
            &lt;DEV/&gt;
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.anchor}
                onClick={() => handleNavClick(item.anchor)}
                className={cn(
                  "relative text-base transition-colors duration-200 bg-transparent border-none cursor-pointer",
                  activeSection === item.anchor && isHomePage
                    ? "text-white font-semibold"
                    : "text-[#e2e8f0] hover:text-[#3b82f6]"
                )}
              >
                {item.name}
                {activeSection === item.anchor && isHomePage && (
                  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#3b82f6]" />
                )}
              </button>
            ))}
          </nav>

          <button
            className="md:hidden text-[#e2e8f0] text-2xl bg-transparent border-none cursor-pointer p-1"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="打开菜单"
          >
            ☰
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-[999] bg-black/50 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <div
        className={cn(
          "fixed top-0 left-0 h-full z-[1001] md:hidden transition-transform duration-300 ease-out",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
        style={{ width: "70%" }}
      >
        <div className="h-full bg-[rgba(10,15,28,0.95)] backdrop-blur-[16px] p-6 flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <span className="font-mono text-lg font-medium text-[#60a5fa]">
              &lt;DEV/&gt;
            </span>
            <button
              className="text-[#e2e8f0] text-2xl bg-transparent border-none cursor-pointer"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="关闭菜单"
            >
              ✕
            </button>
          </div>

          <nav className="flex flex-col gap-6">
            {navItems.map((item) => (
              <button
                key={item.anchor}
                onClick={() => handleNavClick(item.anchor)}
                className={cn(
                  "text-lg text-left bg-transparent border-none cursor-pointer transition-colors duration-200",
                  activeSection === item.anchor && isHomePage
                    ? "text-white font-semibold"
                    : "text-[#e2e8f0] hover:text-[#3b82f6]"
                )}
              >
                {item.name}
              </button>
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t border-[#1e293b]">
            <div className="flex gap-4">
              <SocialIcons size={20} />
            </div>
          </div>
        </div>
      </div>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-[#0a0f1c] border-t border-[#1e293b] px-5 py-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <nav className="flex gap-6">
              {navItems.map((item) => (
                <button
                  key={item.anchor}
                  onClick={() => handleNavClick(item.anchor)}
                  className="text-sm text-[#94a3b8] hover:text-[#3b82f6] transition-colors duration-200 bg-transparent border-none cursor-pointer"
                >
                  {item.name}
                </button>
              ))}
            </nav>
            <div className="flex gap-4">
              <SocialIcons size={18} />
            </div>
          </div>
          <p className="text-xs text-[#64748b] text-center">
            © 2026 {creatorInfo.name} ({creatorInfo.nickname}). Built with React + TypeScript + Vite
          </p>
        </div>
      </footer>

      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 w-10 h-10 rounded-full bg-[#3b82f6] text-white flex items-center justify-center shadow-lg hover:bg-[#2563eb] transition-all duration-200 z-50 border-none cursor-pointer"
          aria-label="回到顶部"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m18 15-6-6-6 6" />
          </svg>
        </button>
      )}
    </div>
  );
}

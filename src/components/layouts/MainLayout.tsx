import { NavLink, Outlet, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { creatorInfo } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";

const navItems = [
  { name: "首页", path: "/" },
  { name: "作品", path: "/projects" },
  { name: "关于我", path: "/about" },
  { name: "联系", path: "/contact" },
];

export function MainLayout() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 每次路由变化滚动到顶部
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
          isScrolled ? "bg-background/80 backdrop-blur-md border-border py-4" : "bg-transparent py-6"
        )}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <NavLink to="/" className="text-xl font-bold tracking-tighter hover:text-primary transition-colors">
            HUANG XIN.
          </NavLink>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-12 items-center">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "text-sm font-medium tracking-widest uppercase transition-colors hover:text-primary",
                    isActive ? "text-primary border-b-2 border-primary pb-1" : "text-foreground/60"
                  )
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Nav */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-transparent">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85%] max-w-[400px]">
                <SheetHeader>
                   <SheetTitle className="text-left font-bold tracking-tighter">HUANG XIN.</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col space-y-8 mt-16">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) =>
                        cn(
                          "text-2xl font-bold tracking-tight transition-colors",
                          isActive ? "text-primary" : "text-foreground/60"
                        )
                      }
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-grow pt-24">
        <Outlet />
      </main>

      <footer className="py-12 border-t border-border mt-24">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-muted-foreground">
            © 2026 {creatorInfo.name} 的个人作品集 - {creatorInfo.nickname}.
          </p>
          <div className="flex space-x-6">
            {creatorInfo.contact.socialLinks.map((link) => (
              <a 
                key={link.platform} 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link.platform}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

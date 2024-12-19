import { Button } from "@/components/ui/button";
import { MessageSquare, Moon, Settings, Sun, User, Upload } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full h-14 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container h-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-6 w-6 text-primary" />
          <span className="text-lg font-semibold">문서 기반 채팅</span>
        </div>

        <div className="flex items-center gap-4">
          <nav className="flex items-center gap-2 mr-4">
            <Link to="/">
              <Button
                variant={location.pathname === "/" ? "secondary" : "ghost"}
                className="text-sm"
              >
                채팅
              </Button>
            </Link>
            <Link to="/upload">
              <Button
                variant={
                  location.pathname === "/upload" ? "secondary" : "ghost"
                }
                className="text-sm"
              >
                <Upload className="h-4 w-4 mr-2" />
                문서 업로드
              </Button>
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

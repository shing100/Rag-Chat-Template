import { Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full h-14 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container h-full flex items-center justify-between text-sm text-muted-foreground">
        <div>© 2024 문서 기반 채팅. All rights reserved.</div>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-foreground transition-colors"
        >
          <Github className="h-4 w-4" />
          <span>소스코드</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;

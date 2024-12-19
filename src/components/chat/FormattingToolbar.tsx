import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Bold, Code, Italic, List } from "lucide-react";

interface FormattingToolbarProps {
  onBoldClick?: () => void;
  onItalicClick?: () => void;
  onCodeClick?: () => void;
  onListClick?: () => void;
  disabled?: boolean;
}

const FormattingToolbar = ({
  onBoldClick = () => {},
  onItalicClick = () => {},
  onCodeClick = () => {},
  onListClick = () => {},
  disabled = false,
}: FormattingToolbarProps) => {
  return (
    <TooltipProvider>
      <div className="flex items-center gap-0.5 h-10 px-2 bg-background border-b">
        <Tooltip delayDuration={200}>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-sm hover:bg-primary/10 hover:text-primary transition-colors duration-200"
              onClick={onBoldClick}
              disabled={disabled}
            >
              <Bold className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            className="animate-in fade-in-0 zoom-in-95"
          >
            <p>굵게 (Ctrl+B)</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip delayDuration={200}>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-sm hover:bg-primary/10 hover:text-primary transition-colors duration-200"
              onClick={onItalicClick}
              disabled={disabled}
            >
              <Italic className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            className="animate-in fade-in-0 zoom-in-95"
          >
            <p>기울임 (Ctrl+I)</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip delayDuration={200}>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-sm hover:bg-primary/10 hover:text-primary transition-colors duration-200"
              onClick={onCodeClick}
              disabled={disabled}
            >
              <Code className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            className="animate-in fade-in-0 zoom-in-95"
          >
            <p>코드 (Ctrl+E)</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip delayDuration={200}>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-sm hover:bg-primary/10 hover:text-primary transition-colors duration-200"
              onClick={onListClick}
              disabled={disabled}
            >
              <List className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            className="animate-in fade-in-0 zoom-in-95"
          >
            <p>목록 (Ctrl+L)</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

export default FormattingToolbar;

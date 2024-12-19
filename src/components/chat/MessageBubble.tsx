import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";

interface MessageBubbleProps {
  message?: string;
  timestamp?: Date;
  isUser?: boolean;
  avatarUrl?: string;
  userName?: string;
}

const MessageBubble = ({
  message = "Hello! This is a sample message.",
  timestamp = new Date(),
  isUser = false,
  avatarUrl = "https://dummyimage.com/40/4F46E5/ffffff&text=U",
  userName = "User",
}: MessageBubbleProps) => {
  return (
    <div
      className={cn(
        "flex gap-3 max-w-[600px] w-full mb-4 group animate-in slide-in-from-bottom-2 duration-300",
        isUser ? "ml-auto flex-row-reverse" : "mr-auto",
      )}
    >
      <Avatar className="h-8 w-8 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <AvatarImage src={avatarUrl} alt={userName} />
        <AvatarFallback>{userName[0]}</AvatarFallback>
      </Avatar>

      <div
        className={cn("flex flex-col", isUser ? "items-end" : "items-start")}
      >
        <div
          className={cn(
            "rounded-2xl px-4 py-2 max-w-[520px] shadow-sm transition-colors duration-200",
            isUser
              ? "bg-primary text-primary-foreground rounded-br-sm hover:bg-primary/90"
              : "bg-muted rounded-bl-sm hover:bg-muted/80",
          )}
        >
          <ReactMarkdown
            className="whitespace-pre-wrap break-words prose dark:prose-invert max-w-none prose-sm"
            components={{
              p: ({ children }) => <p className="m-0">{children}</p>,
              code: ({ children }) => (
                <code className="bg-muted-foreground/20 rounded px-1 py-0.5 transition-colors duration-200">
                  {children}
                </code>
              ),
            }}
          >
            {message}
          </ReactMarkdown>
        </div>
        <span className="text-xs text-muted-foreground mt-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
          {format(timestamp, "h:mm a")}
        </span>
      </div>
    </div>
  );
};

export default MessageBubble;

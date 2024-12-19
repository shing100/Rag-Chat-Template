import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { useChat } from "@/lib/chat-context";
import { cn } from "@/lib/utils";

interface ChatAreaProps {
  onAttachFile?: (file: File) => void;
  disabled?: boolean;
  className?: string;
}

const ChatArea = ({
  onAttachFile = () => {},
  disabled = false,
  className,
}: ChatAreaProps) => {
  const { messages, currentDocument } = useChat();

  return (
    <div className={cn("flex flex-col h-full bg-background", className)}>
      <div className="py-4 px-4 border-b">
        <h2 className="font-semibold">현재 문서: {currentDocument?.title}</h2>
      </div>
      <MessageList messages={messages} />
      <MessageInput onAttach={onAttachFile} disabled={disabled} />
    </div>
  );
};

export default ChatArea;

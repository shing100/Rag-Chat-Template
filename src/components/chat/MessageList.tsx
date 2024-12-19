import { ScrollArea } from "@/components/ui/scroll-area";
import MessageBubble from "./MessageBubble";

interface Message {
  id: string;
  message: string;
  timestamp: Date;
  isUser: boolean;
  avatarUrl?: string;
  userName?: string;
}

interface MessageListProps {
  messages?: Message[];
}

const MessageList = ({ messages = defaultMessages }: MessageListProps) => {
  return (
    <ScrollArea className="flex-1 bg-background px-4">
      <div className="flex flex-col py-4 max-w-4xl mx-auto">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message.message}
            timestamp={message.timestamp}
            isUser={message.isUser}
            avatarUrl={message.avatarUrl}
            userName={message.userName}
          />
        ))}
      </div>
    </ScrollArea>
  );
};

// Default messages for demonstration
const defaultMessages: Message[] = [
  {
    id: "1",
    message: "Hello! How can I help you today?",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    isUser: false,
    avatarUrl: "https://dummyimage.com/40/4F46E5/ffffff&text=A",
    userName: "AI Assistant",
  },
  {
    id: "2",
    message: "I have a question about implementing a new feature.",
    timestamp: new Date(Date.now() - 1000 * 60 * 4),
    isUser: true,
    avatarUrl: "https://dummyimage.com/40/22C55E/ffffff&text=U",
    userName: "User",
  },
  {
    id: "3",
    message:
      "Of course! Please provide more details about the feature you'd like to implement.",
    timestamp: new Date(Date.now() - 1000 * 60 * 3),
    isUser: false,
    avatarUrl: "https://dummyimage.com/40/4F46E5/ffffff&text=A",
    userName: "AI Assistant",
  },
  {
    id: "4",
    message:
      "I want to add real-time chat functionality with document context awareness.",
    timestamp: new Date(Date.now() - 1000 * 60 * 2),
    isUser: true,
    avatarUrl: "https://dummyimage.com/40/22C55E/ffffff&text=U",
    userName: "User",
  },
  {
    id: "5",
    message:
      "That's a great idea! Let me help you break down the implementation steps...",
    timestamp: new Date(Date.now() - 1000 * 60),
    isUser: false,
    avatarUrl: "https://dummyimage.com/40/4F46E5/ffffff&text=A",
    userName: "AI Assistant",
  },
];

export default MessageList;

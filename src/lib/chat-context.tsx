import { createContext, useContext, useState, ReactNode } from "react";
import { Document } from "@/types/documents";

interface Message {
  id: string;
  message: string;
  timestamp: Date;
  isUser: boolean;
  avatarUrl?: string;
  userName?: string;
}

interface ChatContextType {
  messages: Message[];
  sendMessage: (message: string) => void;
  isLoading: boolean;
  error: string | null;
  currentDocument: Document | null;
  setCurrentDocument: (document: Document) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentDocument, setCurrentDocument] = useState<Document | null>(
    () => {
      const savedDocument = localStorage.getItem("currentDocument");
      return savedDocument ? JSON.parse(savedDocument) : null;
    },
  );

  const handleSetCurrentDocument = (document: Document) => {
    setCurrentDocument(document);
    localStorage.setItem("currentDocument", JSON.stringify(document));
    setMessages([]);
  };

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    try {
      const userMessage: Message = {
        id: Date.now().toString(),
        message,
        timestamp: new Date(),
        isUser: true,
        avatarUrl: "https://dummyimage.com/40/22C55E/ffffff&text=U",
        userName: "User",
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);
      setError(null);

      // Simulate AI response with potential error
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.9) {
            // 10% chance of error
            reject(new Error("응답 생성 중 오류가 발생했습니다."));
            return;
          }

          const aiMessage: Message = {
            id: (Date.now() + 1).toString(),
            message: `선택하신 문서 '${currentDocument?.title}'에 대한 답변입니다: \n\n이것은 시뮬레이션된 AI 응답입니다.`,
            timestamp: new Date(),
            isUser: false,
            avatarUrl: "https://dummyimage.com/40/4F46E5/ffffff&text=A",
            userName: "AI Assistant",
          };
          setMessages((prev) => [...prev, aiMessage]);
          resolve(null);
        }, 1000);
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.",
      );
      console.error("Error sending message:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        sendMessage,
        isLoading,
        error,
        currentDocument,
        setCurrentDocument: handleSetCurrentDocument,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}

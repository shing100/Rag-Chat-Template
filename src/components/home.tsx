import ChatArea from "./chat/ChatArea";
import { ChatProvider, useChat } from "@/lib/chat-context";
import { AlertCircle, File, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "./ui/scroll-area";
import { getDocuments } from "@/lib/documents";
import { useEffect, useState } from "react";
import { Document } from "@/types/documents";

const DocumentList = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const { currentDocument, setCurrentDocument } = useChat();

  useEffect(() => {
    const loadDocs = async () => {
      const docs = await getDocuments();
      setDocuments(docs);
    };
    loadDocs();
  }, []);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="w-80 h-full border-l bg-muted/10">
      <div className="p-4 border-b">
        <h2 className="font-semibold">문서 목록</h2>
      </div>
      <ScrollArea className="h-[calc(100%-57px)]">
        <div className="p-4 space-y-2">
          {documents.map((doc) => (
            <button
              key={doc.id}
              onClick={() => setCurrentDocument(doc)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors hover:bg-muted/50 ${currentDocument?.id === doc.id ? "bg-muted" : ""}`}
            >
              <File className="h-4 w-4 text-primary shrink-0" />
              <div className="min-w-0 flex-1">
                <div
                  className="font-medium text-sm truncate max-w-[200px]"
                  title={doc.title}
                >
                  {doc.title}
                </div>
                <div className="text-xs text-muted-foreground">
                  {formatFileSize(doc.file_size)}
                </div>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

const HomeContent = () => {
  const { currentDocument } = useChat();
  const navigate = useNavigate();

  if (!currentDocument) {
    navigate("/upload");
    return null;
  }

  return (
    <div className="h-[calc(100vh-7rem)] bg-background relative overflow-hidden">
      <div className="flex h-full">
        <div className="flex-1">
          <ChatArea />
        </div>
        <DocumentList />
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <ChatProvider>
      <HomeContent />
    </ChatProvider>
  );
};

export default Home;

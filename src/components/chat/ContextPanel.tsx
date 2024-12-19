import { ScrollArea } from "@/components/ui/scroll-area";
import DocumentSnippet from "./DocumentSnippet";
import ProcessingIndicator from "./ProcessingIndicator";

interface Document {
  id: string;
  title: string;
  content: string;
  relevanceScore: number;
  documentUrl: string;
}

interface ContextPanelProps {
  documents?: Document[];
  isProcessing?: boolean;
  processingProgress?: number;
  onDocumentClick?: (documentId: string) => void;
}

const ContextPanel = ({
  documents = defaultDocuments,
  isProcessing = false,
  processingProgress = 0,
  onDocumentClick = () => {},
}: ContextPanelProps) => {
  return (
    <div className="flex flex-col h-full bg-background">
      <ProcessingIndicator
        isProcessing={isProcessing}
        progress={processingProgress}
      />
      <ScrollArea className="flex-1 p-4">
        <div className="max-w-2xl mx-auto">
          {documents.map((doc) => (
            <DocumentSnippet
              key={doc.id}
              title={doc.title}
              content={doc.content}
              relevanceScore={doc.relevanceScore}
              documentUrl={doc.documentUrl}
              onClick={() => onDocumentClick(doc.id)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

// Default documents for demonstration
const defaultDocuments: Document[] = [
  {
    id: "1",
    title: "Chat Implementation Guide",
    content:
      "This document outlines the best practices for implementing real-time chat functionality in React applications. It covers WebSocket integration, message handling, and UI components.",
    relevanceScore: 95,
    documentUrl: "#",
  },
  {
    id: "2",
    title: "Document Context Integration",
    content:
      "Learn how to integrate document context awareness into your chat application. This guide explains RAG systems, relevance scoring, and context management.",
    relevanceScore: 88,
    documentUrl: "#",
  },
  {
    id: "3",
    title: "UI/UX Design Patterns",
    content:
      "Explore common UI/UX design patterns for chat interfaces. This document covers layout considerations, message bubbles, input areas, and context panels.",
    relevanceScore: 82,
    documentUrl: "#",
  },
];

export default ContextPanel;

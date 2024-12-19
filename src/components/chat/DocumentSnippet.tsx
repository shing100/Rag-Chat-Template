import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FileText } from "lucide-react";

interface DocumentSnippetProps {
  title?: string;
  content?: string;
  relevanceScore?: number;
  documentUrl?: string;
  onClick?: () => void;
}

const DocumentSnippet = ({
  title = "Sample Document Title",
  content = "This is a sample document snippet that shows how the content would be displayed in the context panel. It includes relevant information from the document that matches the current conversation context.",
  relevanceScore = 85,
  documentUrl = "#",
  onClick = () => {},
}: DocumentSnippetProps) => {
  return (
    <Card
      className="w-full p-4 mb-4 hover:bg-accent cursor-pointer bg-background transition-all duration-200 hover:shadow-md animate-in slide-in-from-right-5"
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <div className="shrink-0 p-2 bg-primary/10 rounded-md group-hover:bg-primary/20 transition-colors duration-200">
          <FileText className="h-4 w-4 text-primary" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-2">
            <h4 className="font-medium text-sm truncate">{title}</h4>
            <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full transition-colors duration-200 hover:bg-primary/20">
              {relevanceScore}% match
            </span>
          </div>

          <Progress
            value={relevanceScore}
            className="h-1 mb-3 transition-all duration-500"
          />

          <p className="text-sm text-muted-foreground line-clamp-2 transition-colors duration-200">
            {content}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default DocumentSnippet;

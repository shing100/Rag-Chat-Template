import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Loader2, Paperclip, Send } from "lucide-react";
import FormattingToolbar from "./FormattingToolbar";
import { useRef, useState } from "react";
import { useChat } from "@/lib/chat-context";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface MessageInputProps {
  onAttach?: (file: File) => void;
  disabled?: boolean;
}

const MessageInput = ({
  onAttach = () => {},
  disabled = false,
}: MessageInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { sendMessage, isLoading, error } = useChat();

  const handleSend = () => {
    if (inputValue.trim()) {
      sendMessage(inputValue);
      setInputValue("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleAttachClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        onAttach(file);
      }
    };
    input.click();
  };

  const insertFormatting = (prefix: string, suffix: string = prefix) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = inputValue;
    const before = text.substring(0, start);
    const selection = text.substring(start, end);
    const after = text.substring(end);

    const newText = before + prefix + selection + suffix + after;
    setInputValue(newText);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, end + prefix.length);
    }, 0);
  };

  const handleFormat = {
    bold: () => insertFormatting("**"),
    italic: () => insertFormatting("_"),
    code: () => insertFormatting("`"),
    list: () => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const text = inputValue;
      const before = text.substring(0, start);
      const after = text.substring(start);

      const prefix = before.endsWith("\n") || before === "" ? "- " : "\n- ";
      setInputValue(before + prefix + after);

      setTimeout(() => {
        textarea.focus();
        const newPosition = start + prefix.length;
        textarea.setSelectionRange(newPosition, newPosition);
      }, 0);
    },
  };

  return (
    <div className="w-full bg-background border-t">
      {error && (
        <Alert variant="destructive" className="m-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <FormattingToolbar
        disabled={disabled || isLoading}
        onBoldClick={handleFormat.bold}
        onItalicClick={handleFormat.italic}
        onCodeClick={handleFormat.code}
        onListClick={handleFormat.list}
      />
      <div className="flex items-end gap-2 p-3">
        <Textarea
          ref={textareaRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={
            isLoading ? "응답을 기다리는 중..." : "메시지를 입력하세요..."
          }
          className="min-h-[40px] max-h-[200px] resize-none font-mono bg-background/50 focus-visible:ring-1"
          disabled={disabled || isLoading}
        />
        <div className="flex gap-2 pb-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-primary/10 hover:text-primary"
            onClick={handleAttachClick}
            disabled={disabled || isLoading}
          >
            <Paperclip className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            className="h-8 w-8"
            onClick={handleSend}
            disabled={disabled || isLoading || !inputValue.trim()}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;

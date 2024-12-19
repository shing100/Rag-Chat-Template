import { Progress } from "@/components/ui/progress";

interface ProcessingIndicatorProps {
  progress?: number;
  isProcessing?: boolean;
}

const ProcessingIndicator = ({
  progress = 0,
  isProcessing = false,
}: ProcessingIndicatorProps) => {
  return (
    <div className="w-full h-1 bg-background transition-all duration-300">
      {isProcessing && (
        <Progress
          value={progress}
          className={
            progress === 0
              ? "h-full animate-pulse"
              : "h-full transition-all duration-300"
          }
        />
      )}
    </div>
  );
};

export default ProcessingIndicator;

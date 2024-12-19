import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Upload, File, X, Loader2, MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { Document, UploadedFile } from "@/types/documents";
import { uploadDocument, getDocuments } from "@/lib/documents";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";

const DocumentUpload = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    const docs = await getDocuments();
    setDocuments(docs);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (!fileList) return;

    const newFiles = Array.from(fileList).map((file) => ({
      id: Math.random().toString(36).substring(7),
      name: file.name,
      size: file.size,
      file,
    }));

    // Validate file size
    const invalidFiles = newFiles.filter(
      (file) => file.size > 10 * 1024 * 1024,
    );
    if (invalidFiles.length > 0) {
      toast({
        title: "파일 크기 초과",
        description: "10MB 이상의 파일은 업로드할 수 없습니다.",
        variant: "destructive",
      });
      return;
    }

    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const totalFiles = files.length;
      let completedFiles = 0;

      for (const file of files) {
        await uploadDocument(file.file);
        completedFiles++;
        setUploadProgress((completedFiles / totalFiles) * 100);
      }

      toast({
        title: "업로드 완료",
        description: `${files.length}개의 파일이 성공적으로 업로드되었습니다.`,
      });

      setFiles([]);
      loadDocuments(); // Reload the documents list
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "업로드 실패",
        description: "파일 업로드 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const droppedFiles = Array.from(e.dataTransfer.files).map((file) => ({
      id: Math.random().toString(36).substring(7),
      name: file.name,
      size: file.size,
      file,
    }));

    setFiles((prev) => [...prev, ...droppedFiles]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const startChat = (document: Document) => {
    localStorage.setItem("currentDocument", JSON.stringify(document));
    navigate("/");
  };

  return (
    <div className="container max-w-4xl py-8">
      <h1 className="text-2xl font-bold mb-6">문서 업로드</h1>

      <Card className="p-6 mb-6">
        <div
          className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-8 mb-6 bg-muted/50 transition-colors duration-200 hover:bg-muted/70"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground mb-2">
            파일을 드래그하여 업로드하거나
          </p>
          <label htmlFor="file-upload">
            <Input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileUpload}
              multiple
              accept=".pdf,.doc,.docx,.txt"
              disabled={isUploading}
            />
            <Button variant="secondary" className="mt-2" disabled={isUploading}>
              파일 선택
            </Button>
          </label>
          <p className="text-xs text-muted-foreground mt-2">
            PDF, Word, Text 파일 지원 (최대 10MB)
          </p>
        </div>

        {files.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-medium mb-2">업로드할 파일</h3>
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-3 bg-muted rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <File className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">{file.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatFileSize(file.size)}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:text-destructive"
                  onClick={() => removeFile(file.id)}
                  disabled={isUploading}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            {isUploading && (
              <div className="mt-4">
                <Progress value={uploadProgress} className="h-2" />
                <p className="text-sm text-muted-foreground mt-2 text-center">
                  {Math.round(uploadProgress)}% 업로드 중...
                </p>
              </div>
            )}
            <div className="flex justify-end mt-4">
              <Button
                onClick={handleUpload}
                disabled={isUploading || files.length === 0}
              >
                {isUploading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isUploading ? "업로드 중..." : "업로드 시작"}
              </Button>
            </div>
          </div>
        )}
      </Card>

      {documents.length > 0 && (
        <Card className="p-6">
          <h3 className="font-medium mb-4">업로드된 문서</h3>
          <div className="space-y-2">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <File className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">{doc.title}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatFileSize(doc.file_size)}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 hover:bg-primary/10 hover:text-primary"
                  onClick={() => startChat(doc)}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  채팅 시작
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default DocumentUpload;

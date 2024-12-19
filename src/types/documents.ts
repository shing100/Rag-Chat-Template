export interface Document {
  id: string;
  title: string;
  content: string;
  file_path: string;
  file_type: string;
  file_size: number;
  created_at: string;
  updated_at: string;
}

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  file: File;
}

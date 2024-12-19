import { Document, UploadedFile } from "@/types/documents";

const STORAGE_KEY = "uploaded_documents";

// Cache for documents
let documentsCache: Document[] | null = null;

export async function uploadDocument(file: File) {
  try {
    // Simulate file upload delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Create document metadata
    const document: Document = {
      id: Math.random().toString(36).substring(7),
      title: file.name,
      content: "", // This would normally be extracted from the file
      file_path: URL.createObjectURL(file),
      file_type: file.type,
      file_size: file.size,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Get existing documents
    const existingDocs = await getDocuments();

    // Add new document
    const updatedDocs = [...existingDocs, document];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedDocs));
    documentsCache = updatedDocs;

    return document;
  } catch (error) {
    console.error("Error uploading document:", error);
    throw error;
  }
}

export async function getDocuments(): Promise<Document[]> {
  if (documentsCache) {
    return documentsCache;
  }
  const docs = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  documentsCache = docs;
  return docs;
}

export async function deleteDocument(id: string) {
  try {
    const documents = await getDocuments();
    const updatedDocs = documents.filter((doc) => doc.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedDocs));
    documentsCache = updatedDocs;
  } catch (error) {
    console.error("Error deleting document:", error);
    throw error;
  }
}

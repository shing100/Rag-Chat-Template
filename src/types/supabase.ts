export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

interface Database {
  public: {
    Tables: {
      documents: {
        Row: {
          id: string;
          title: string;
          content: string;
          file_path: string;
          file_type: string;
          file_size: number;
          embedding: number[] | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          content?: string;
          file_path: string;
          file_type: string;
          file_size: number;
          embedding?: number[] | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          content?: string;
          file_path?: string;
          file_type?: string;
          file_size?: number;
          embedding?: number[] | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      messages: {
        Row: {
          id: string;
          content: string;
          role: "user" | "assistant";
          chat_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          content: string;
          role: "user" | "assistant";
          chat_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          content?: string;
          role?: "user" | "assistant";
          chat_id?: string;
          created_at?: string;
        };
      };
      chats: {
        Row: {
          id: string;
          title: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      message_documents: {
        Row: {
          id: string;
          message_id: string;
          document_id: string;
          relevance_score: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          message_id: string;
          document_id: string;
          relevance_score: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          message_id?: string;
          document_id?: string;
          relevance_score?: number;
          created_at?: string;
        };
      };
    };
  };
}

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type Inserts<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];
export type Updates<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];

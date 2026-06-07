export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      lions: {
        Row: {
          id: string;
          name: string;
          track: string;
          role: string;
          email: string | null;
          github: string | null;
          skills: string[];
          motto: string;
          status: string;
          created_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          track: string;
          role: string;
          email?: string | null;
          github?: string | null;
          skills?: string[];
          motto: string;
          status?: string;
          created_by?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          track?: string;
          role?: string;
          email?: string | null;
          github?: string | null;
          skills?: string[];
          motto?: string;
          status?: string;
          created_by?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

export type LionRow = Database["public"]["Tables"]["lions"]["Row"];
export type LionInsert = Database["public"]["Tables"]["lions"]["Insert"];

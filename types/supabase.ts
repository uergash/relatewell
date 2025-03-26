export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      contacts: {
        Row: {
          id: string
          name: string
          email: string | null
          phone: string | null
          relationship_type: string | null
          birthday: string | null
          profile_picture: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email?: string | null
          phone?: string | null
          relationship_type?: string | null
          birthday?: string | null
          profile_picture?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string | null
          phone?: string | null
          relationship_type?: string | null
          birthday?: string | null
          profile_picture?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      interactions: {
        Row: {
          id: string
          type: string
          date: string
          notes: string | null
          location: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          type: string
          date: string
          notes?: string | null
          location?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          type?: string
          date?: string
          notes?: string | null
          location?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      interaction_contacts: {
        Row: {
          interaction_id: string
          contact_id: string
          created_at: string
        }
        Insert: {
          interaction_id: string
          contact_id: string
          created_at?: string
        }
        Update: {
          interaction_id?: string
          contact_id?: string
          created_at?: string
        }
      }
      topics: {
        Row: {
          id: string
          name: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          created_at?: string
          updated_at?: string
        }
      }
      contact_topics: {
        Row: {
          contact_id: string
          topic_id: string
          created_at: string
        }
        Insert: {
          contact_id: string
          topic_id: string
          created_at?: string
        }
        Update: {
          contact_id?: string
          topic_id?: string
          created_at?: string
        }
      }
      reminders: {
        Row: {
          id: string
          title: string
          description: string | null
          type: string
          date: string
          time: string | null
          contact_id: string
          status: string
          recurrence: string | null
          interaction_id: string | null
          snoozed_until: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          type: string
          date: string
          time?: string | null
          contact_id: string
          status?: string
          recurrence?: string | null
          interaction_id?: string | null
          snoozed_until?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          type?: string
          date?: string
          time?: string | null
          contact_id?: string
          status?: string
          recurrence?: string | null
          interaction_id?: string | null
          snoozed_until?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 
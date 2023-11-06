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
      dishes: {
        Row: {
          date: string | null
          group_id: number | null
          id: string
          image_url: string | null
          meal: string | null
          name: string | null
        }
        Insert: {
          date?: string | null
          group_id?: number | null
          id?: string
          image_url?: string | null
          meal?: string | null
          name?: string | null
        }
        Update: {
          date?: string | null
          group_id?: number | null
          id?: string
          image_url?: string | null
          meal?: string | null
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dishes_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          }
        ]
      }
      groups: {
        Row: {
          created_at: string
          id: number
          name: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "groups_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          id: number
          name: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: number
          name?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: number
          name?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles_groups: {
        Row: {
          created_at: string
          group_id: number
          profile_id: number
        }
        Insert: {
          created_at?: string
          group_id: number
          profile_id: number
        }
        Update: {
          created_at?: string
          group_id?: number
          profile_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "profiles_groups_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_groups_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      recipes: {
        Row: {
          content: string | null
          created_at: string
          group_id: number | null
          id: number
          image_url: string | null
          name: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string
          group_id?: number | null
          id?: number
          image_url?: string | null
          name?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string
          group_id?: number | null
          id?: number
          image_url?: string | null
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "recipes_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          }
        ]
      }
      storages: {
        Row: {
          amount: string | null
          created_at: string
          expire_date: string | null
          group_id: number | null
          id: number
          name: string | null
          stored_in: string | null
        }
        Insert: {
          amount?: string | null
          created_at?: string
          expire_date?: string | null
          group_id?: number | null
          id?: number
          name?: string | null
          stored_in?: string | null
        }
        Update: {
          amount?: string | null
          created_at?: string
          expire_date?: string | null
          group_id?: number | null
          id?: number
          name?: string | null
          stored_in?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "storages_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          }
        ]
      }
      todos: {
        Row: {
          amount: string | null
          checked: boolean
          created_at: string
          date: string | null
          group_id: number | null
          id: number
          name: string | null
        }
        Insert: {
          amount?: string | null
          checked?: boolean
          created_at?: string
          date?: string | null
          group_id?: number | null
          id?: number
          name?: string | null
        }
        Update: {
          amount?: string | null
          checked?: boolean
          created_at?: string
          date?: string | null
          group_id?: number | null
          id?: number
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "todos_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          }
        ]
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

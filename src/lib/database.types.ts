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
      categories: {
        Row: {
          created_at: string
          id: number
          name: string | null
          unit: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
          unit?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
          unit?: string | null
        }
        Relationships: []
      }
      dishes: {
        Row: {
          date: string | null
          id: string
          image_url: string | null
          meal: string | null
          name: string | null
          user_id: string | null
        }
        Insert: {
          date?: string | null
          id?: string
          image_url?: string | null
          meal?: string | null
          name?: string | null
          user_id?: string | null
        }
        Update: {
          date?: string | null
          id?: string
          image_url?: string | null
          meal?: string | null
          name?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dishes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      groups: {
        Row: {
          created_at: string
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      profiles: {
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
            foreignKeyName: "profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      recipes: {
        Row: {
          content: string | null
          created_at: string
          id: number
          image_url: string | null
          name: string | null
          user_id: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: number
          image_url?: string | null
          name?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: number
          image_url?: string | null
          name?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "recipes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      storages: {
        Row: {
          amount: number | null
          created_at: string
          expire_date: string | null
          id: number
          name: string | null
          stored_in: string | null
          user_id: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string
          expire_date?: string | null
          id?: number
          name?: string | null
          stored_in?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string
          expire_date?: string | null
          id?: number
          name?: string | null
          stored_in?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "storages_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
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
          id: number
          name: string | null
          user_id: string | null
        }
        Insert: {
          amount?: string | null
          checked?: boolean
          created_at?: string
          date?: string | null
          id?: number
          name?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: string | null
          checked?: boolean
          created_at?: string
          date?: string | null
          id?: number
          name?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "todos_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_group: {
        Row: {
          created_at: string
          group: number | null
          id: number
          is_admin: boolean | null
          status: string | null
          user: string | null
        }
        Insert: {
          created_at?: string
          group?: number | null
          id?: number
          is_admin?: boolean | null
          status?: string | null
          user?: string | null
        }
        Update: {
          created_at?: string
          group?: number | null
          id?: number
          is_admin?: boolean | null
          status?: string | null
          user?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_group_group_fkey"
            columns: ["group"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_group_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "users"
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

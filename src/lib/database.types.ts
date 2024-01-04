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
      accounts: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          id: number
          name: string | null
          user_id: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          id?: number
          name?: string | null
          user_id?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          id?: number
          name?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "accounts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
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
          image_url: string | null
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          image_url?: string | null
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          image_url?: string | null
          name?: string | null
        }
        Relationships: []
      }
      members: {
        Row: {
          account_id: number
          created_at: string
          group_id: number
          is_admin: boolean | null
          status: string | null
        }
        Insert: {
          account_id: number
          created_at?: string
          group_id: number
          is_admin?: boolean | null
          status?: string | null
        }
        Update: {
          account_id?: number
          created_at?: string
          group_id?: number
          is_admin?: boolean | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "members_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "members_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          }
        ]
      }
      notifications: {
        Row: {
          created_at: string
          id: number
          storage_id: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          storage_id?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          storage_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_storage_id_fkey"
            columns: ["storage_id"]
            isOneToOne: false
            referencedRelation: "storages"
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
          creator_id: number | null
          expire_date: string | null
          group_id: number | null
          id: number
          name: string | null
          stored_in: string | null
        }
        Insert: {
          amount?: string | null
          created_at?: string
          creator_id?: number | null
          expire_date?: string | null
          group_id?: number | null
          id?: number
          name?: string | null
          stored_in?: string | null
        }
        Update: {
          amount?: string | null
          created_at?: string
          creator_id?: number | null
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never

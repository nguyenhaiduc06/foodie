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
          },
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
      users: {
        Row: {
          aud: string | null
          banned_until: string | null
          confirmation_sent_at: string | null
          confirmation_token: string | null
          confirmed_at: string | null
          created_at: string | null
          deleted_at: string | null
          email: string | null
          email_change: string | null
          email_change_confirm_status: number | null
          email_change_sent_at: string | null
          email_change_token_current: string | null
          email_change_token_new: string | null
          email_confirmed_at: string | null
          encrypted_password: string | null
          id: string | null
          instance_id: string | null
          invited_at: string | null
          is_sso_user: boolean | null
          is_super_admin: boolean | null
          last_sign_in_at: string | null
          phone: string | null
          phone_change: string | null
          phone_change_sent_at: string | null
          phone_change_token: string | null
          phone_confirmed_at: string | null
          raw_app_meta_data: Json | null
          raw_user_meta_data: Json | null
          reauthentication_sent_at: string | null
          reauthentication_token: string | null
          recovery_sent_at: string | null
          recovery_token: string | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          aud?: string | null
          banned_until?: string | null
          confirmation_sent_at?: string | null
          confirmation_token?: string | null
          confirmed_at?: string | null
          created_at?: string | null
          deleted_at?: string | null
          email?: string | null
          email_change?: string | null
          email_change_confirm_status?: number | null
          email_change_sent_at?: string | null
          email_change_token_current?: string | null
          email_change_token_new?: string | null
          email_confirmed_at?: string | null
          encrypted_password?: string | null
          id?: string | null
          instance_id?: string | null
          invited_at?: string | null
          is_sso_user?: boolean | null
          is_super_admin?: boolean | null
          last_sign_in_at?: string | null
          phone?: string | null
          phone_change?: string | null
          phone_change_sent_at?: string | null
          phone_change_token?: string | null
          phone_confirmed_at?: string | null
          raw_app_meta_data?: Json | null
          raw_user_meta_data?: Json | null
          reauthentication_sent_at?: string | null
          reauthentication_token?: string | null
          recovery_sent_at?: string | null
          recovery_token?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          aud?: string | null
          banned_until?: string | null
          confirmation_sent_at?: string | null
          confirmation_token?: string | null
          confirmed_at?: string | null
          created_at?: string | null
          deleted_at?: string | null
          email?: string | null
          email_change?: string | null
          email_change_confirm_status?: number | null
          email_change_sent_at?: string | null
          email_change_token_current?: string | null
          email_change_token_new?: string | null
          email_confirmed_at?: string | null
          encrypted_password?: string | null
          id?: string | null
          instance_id?: string | null
          invited_at?: string | null
          is_sso_user?: boolean | null
          is_super_admin?: boolean | null
          last_sign_in_at?: string | null
          phone?: string | null
          phone_change?: string | null
          phone_change_sent_at?: string | null
          phone_change_token?: string | null
          phone_confirmed_at?: string | null
          raw_app_meta_data?: Json | null
          raw_user_meta_data?: Json | null
          reauthentication_sent_at?: string | null
          reauthentication_token?: string | null
          recovery_sent_at?: string | null
          recovery_token?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
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

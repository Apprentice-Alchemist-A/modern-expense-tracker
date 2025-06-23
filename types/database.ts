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
          id: string
          name: string
          icon: string
          color: string
          display_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          icon?: string
          color?: string
          display_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          icon?: string
          color?: string
          display_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      payment_methods: {
        Row: {
          id: string
          name: string
          icon: string
          display_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          icon?: string
          display_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          icon?: string
          display_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      stores: {
        Row: {
          id: string
          user_id: string
          name: string
          category_id: string | null
          address: string | null
          phone: string | null
          website_url: string | null
          notes: string | null
          visit_count: number
          last_visited_at: string | null
          is_favorite: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          category_id?: string | null
          address?: string | null
          phone?: string | null
          website_url?: string | null
          notes?: string | null
          visit_count?: number
          last_visited_at?: string | null
          is_favorite?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          category_id?: string | null
          address?: string | null
          phone?: string | null
          website_url?: string | null
          notes?: string | null
          visit_count?: number
          last_visited_at?: string | null
          is_favorite?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      tags: {
        Row: {
          id: string
          user_id: string
          name: string
          color: string
          usage_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          color?: string
          usage_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          color?: string
          usage_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      templates: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          category_id: string | null
          payment_method_id: string | null
          store_id: string | null
          default_amount: number | null
          usage_count: number
          is_favorite: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description?: string | null
          category_id?: string | null
          payment_method_id?: string | null
          store_id?: string | null
          default_amount?: number | null
          usage_count?: number
          is_favorite?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string | null
          category_id?: string | null
          payment_method_id?: string | null
          store_id?: string | null
          default_amount?: number | null
          usage_count?: number
          is_favorite?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      expense_groups: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          category_id: string
          payment_method_id: string
          store_id: string | null
          template_id: string | null
          expense_date: string
          total_amount: number
          notes: string | null
          receipt_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          category_id: string
          payment_method_id: string
          store_id?: string | null
          template_id?: string | null
          expense_date: string
          total_amount?: number
          notes?: string | null
          receipt_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          category_id?: string
          payment_method_id?: string
          store_id?: string | null
          template_id?: string | null
          expense_date?: string
          total_amount?: number
          notes?: string | null
          receipt_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      expense_items: {
        Row: {
          id: string
          expense_group_id: string
          name: string
          amount: number
          quantity: number
          unit_price: number
          notes: string | null
          display_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          expense_group_id: string
          name: string
          amount: number
          quantity?: number
          unit_price: number
          notes?: string | null
          display_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          expense_group_id?: string
          name?: string
          amount?: number
          quantity?: number
          unit_price?: number
          notes?: string | null
          display_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      expense_tags: {
        Row: {
          id: string
          expense_group_id: string
          tag_id: string
          created_at: string
        }
        Insert: {
          id?: string
          expense_group_id: string
          tag_id: string
          created_at?: string
        }
        Update: {
          id?: string
          expense_group_id?: string
          tag_id?: string
          created_at?: string
        }
      }
      template_tags: {
        Row: {
          id: string
          template_id: string
          tag_id: string
          created_at: string
        }
        Insert: {
          id?: string
          template_id: string
          tag_id: string
          created_at?: string
        }
        Update: {
          id?: string
          template_id?: string
          tag_id?: string
          created_at?: string
        }
      }
    }
    Views: {
      expense_summary: {
        Row: {
          id: string
          title: string
          expense_date: string
          total_amount: number
          category_name: string | null
          category_icon: string | null
          category_color: string | null
          payment_method_name: string | null
          payment_method_icon: string | null
          store_name: string | null
          user_id: string
          tags: string[] | null
        }
      }
      monthly_expense_summary: {
        Row: {
          user_id: string
          month: string
          category_name: string | null
          category_color: string | null
          transaction_count: number
          total_amount: number
          avg_amount: number
        }
      }
      popular_stores: {
        Row: {
          user_id: string
          store_id: string
          store_name: string
          category_name: string | null
          usage_count: number
          total_spent: number
          avg_amount: number
          last_visit_date: string | null
        }
      }
    }
    Functions: {
      create_expense_with_items: {
        Args: {
          p_expense_group: Json
          p_expense_items: Json[]
        }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
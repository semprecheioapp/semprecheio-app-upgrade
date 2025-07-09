export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      appointments: {
        Row: {
          appointment_time: string | null
          availability_id: string | null
          client_id: string | null
          created_at: string | null
          customer_id: string | null
          customer_name: string | null
          customer_phone: string | null
          duration: number
          end_time: string | null
          id: string
          notes: string | null
          professional_id: string | null
          scheduled_at: string | null
          service_id: string | null
          start_time: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          appointment_time?: string | null
          availability_id?: string | null
          client_id?: string | null
          created_at?: string | null
          customer_id?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          duration?: number
          end_time?: string | null
          id?: string
          notes?: string | null
          professional_id?: string | null
          scheduled_at?: string | null
          service_id?: string | null
          start_time?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          appointment_time?: string | null
          availability_id?: string | null
          client_id?: string | null
          created_at?: string | null
          customer_id?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          duration?: number
          end_time?: string | null
          id?: string
          notes?: string | null
          professional_id?: string | null
          scheduled_at?: string | null
          service_id?: string | null
          start_time?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "appointments_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "professionals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      bd_ativo: {
        Row: {
          client_id: string | null
          id: string
          is_active: boolean | null
          last_check: string | null
          table_name: string
        }
        Insert: {
          client_id?: string | null
          id?: string
          is_active?: boolean | null
          last_check?: string | null
          table_name: string
        }
        Update: {
          client_id?: string | null
          id?: string
          is_active?: boolean | null
          last_check?: string | null
          table_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "bd_ativo_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          agent_name: string | null
          assistant_id: string | null
          created_at: string | null
          email: string
          id: string
          is_active: boolean | null
          name: string
          password: string | null
          phone: string | null
          prompt_ia: string | null
          service_type: string | null
          settings: Json | null
          whatsapp_instance_url: string | null
        }
        Insert: {
          agent_name?: string | null
          assistant_id?: string | null
          created_at?: string | null
          email: string
          id?: string
          is_active?: boolean | null
          name: string
          password?: string | null
          phone?: string | null
          prompt_ia?: string | null
          service_type?: string | null
          settings?: Json | null
          whatsapp_instance_url?: string | null
        }
        Update: {
          agent_name?: string | null
          assistant_id?: string | null
          created_at?: string | null
          email?: string
          id?: string
          is_active?: boolean | null
          name?: string
          password?: string | null
          phone?: string | null
          prompt_ia?: string | null
          service_type?: string | null
          settings?: Json | null
          whatsapp_instance_url?: string | null
        }
        Relationships: []
      }
      connections: {
        Row: {
          client_id: string | null
          created_at: string | null
          host: string
          id: number
          instance: string
          instance_name: string | null
          is_active: boolean | null
          last_sync: string | null
          status: string | null
          sync_status: string | null
          token: string
          updated_at: string | null
        }
        Insert: {
          client_id?: string | null
          created_at?: string | null
          host: string
          id?: number
          instance: string
          instance_name?: string | null
          is_active?: boolean | null
          last_sync?: string | null
          status?: string | null
          sync_status?: string | null
          token: string
          updated_at?: string | null
        }
        Update: {
          client_id?: string | null
          created_at?: string | null
          host?: string
          id?: number
          instance?: string
          instance_name?: string | null
          is_active?: boolean | null
          last_sync?: string | null
          status?: string | null
          sync_status?: string | null
          token?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "connections_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          client_id: string | null
          cpf_cnpj: string | null
          created_at: string | null
          email: string | null
          etapa: string | null
          id: string
          name: string
          notes: string | null
          phone: string | null
          thread: string | null
          timeout: string | null
        }
        Insert: {
          client_id?: string | null
          cpf_cnpj?: string | null
          created_at?: string | null
          email?: string | null
          etapa?: string | null
          id?: string
          name: string
          notes?: string | null
          phone?: string | null
          thread?: string | null
          timeout?: string | null
        }
        Update: {
          client_id?: string | null
          cpf_cnpj?: string | null
          created_at?: string | null
          email?: string | null
          etapa?: string | null
          id?: string
          name?: string
          notes?: string | null
          phone?: string | null
          thread?: string | null
          timeout?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customers_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      memoria: {
        Row: {
          data_atual: string | null
          id: number
          message: Json
          session_id: string
        }
        Insert: {
          data_atual?: string | null
          id?: number
          message: Json
          session_id: string
        }
        Update: {
          data_atual?: string | null
          id?: number
          message?: Json
          session_id?: string
        }
        Relationships: []
      }
      message_buffer: {
        Row: {
          chatid: string | null
          content: string | null
          created_at: string | null
          id: number
          idmessage: string | null
          timestamp: number | null
        }
        Insert: {
          chatid?: string | null
          content?: string | null
          created_at?: string | null
          id?: number
          idmessage?: string | null
          timestamp?: number | null
        }
        Update: {
          chatid?: string | null
          content?: string | null
          created_at?: string | null
          id?: number
          idmessage?: string | null
          timestamp?: number | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          client_id: string | null
          created_at: string | null
          id: string
          is_read: boolean | null
          message: string | null
          title: string
          type: string | null
        }
        Insert: {
          client_id?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string | null
          title: string
          type?: string | null
        }
        Update: {
          client_id?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string | null
          title?: string
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      professional_availability: {
        Row: {
          created_at: string | null
          custom_duration: number | null
          custom_price: number | null
          date: string
          day_of_week: number | null
          end_time: string
          id: string
          is_active: boolean | null
          professional_id: string
          service_id: string | null
          start_time: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          custom_duration?: number | null
          custom_price?: number | null
          date: string
          day_of_week?: number | null
          end_time: string
          id?: string
          is_active?: boolean | null
          professional_id: string
          service_id?: string | null
          start_time: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          custom_duration?: number | null
          custom_price?: number | null
          date?: string
          day_of_week?: number | null
          end_time?: string
          id?: string
          is_active?: boolean | null
          professional_id?: string
          service_id?: string | null
          start_time?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "professional_availability_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "professionals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "professional_availability_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      professionals: {
        Row: {
          client_id: string | null
          created_at: string | null
          email: string
          id: string
          is_active: boolean | null
          name: string
          phone: string | null
          specialty_id: string | null
        }
        Insert: {
          client_id?: string | null
          created_at?: string | null
          email: string
          id?: string
          is_active?: boolean | null
          name: string
          phone?: string | null
          specialty_id?: string | null
        }
        Update: {
          client_id?: string | null
          created_at?: string | null
          email?: string
          id?: string
          is_active?: boolean | null
          name?: string
          phone?: string | null
          specialty_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "professionals_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "professionals_specialty_id_fkey"
            columns: ["specialty_id"]
            isOneToOne: false
            referencedRelation: "specialties"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          category: string | null
          client_id: string | null
          created_at: string | null
          description: string | null
          duration: number
          id: string
          is_active: boolean | null
          name: string
          price: number | null
          specialty_id: string | null
        }
        Insert: {
          category?: string | null
          client_id?: string | null
          created_at?: string | null
          description?: string | null
          duration?: number
          id?: string
          is_active?: boolean | null
          name: string
          price?: number | null
          specialty_id?: string | null
        }
        Update: {
          category?: string | null
          client_id?: string | null
          created_at?: string | null
          description?: string | null
          duration?: number
          id?: string
          is_active?: boolean | null
          name?: string
          price?: number | null
          specialty_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "services_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "services_specialty_id_fkey"
            columns: ["specialty_id"]
            isOneToOne: false
            referencedRelation: "specialties"
            referencedColumns: ["id"]
          },
        ]
      }
      sessions: {
        Row: {
          created_at: string | null
          expires_at: string
          id: string
          user_id: number
        }
        Insert: {
          created_at?: string | null
          expires_at: string
          id: string
          user_id: number
        }
        Update: {
          created_at?: string | null
          expires_at?: string
          id?: string
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      specialties: {
        Row: {
          client_id: string | null
          color: string | null
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          service_id: string | null
        }
        Insert: {
          client_id?: string | null
          color?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          service_id?: string | null
        }
        Update: {
          client_id?: string | null
          color?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          service_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "specialties_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      token_accounting: {
        Row: {
          client_id: string | null
          cost: number | null
          id: string
          model: string | null
          operation: string
          timestamp: string | null
          tokens_used: number | null
        }
        Insert: {
          client_id?: string | null
          cost?: number | null
          id?: string
          model?: string | null
          operation: string
          timestamp?: string | null
          tokens_used?: number | null
        }
        Update: {
          client_id?: string | null
          cost?: number | null
          id?: string
          model?: string | null
          operation?: string
          timestamp?: string | null
          tokens_used?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "token_accounting_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          id: number
          name: string
          password: string
          role: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: number
          name: string
          password: string
          role?: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: number
          name?: string
          password?: string
          role?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_client_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      is_super_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
